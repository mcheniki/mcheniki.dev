import { experimental_AstroContainer } from 'astro/container';
import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

import { Resend } from 'resend';

import EmailTemplate from '@components/EmailTemplate.astro';

const resend = new Resend(import.meta.env.SECRET_RESEND_API_KEY!);
const secretKey = import.meta.env.SECRET_TURNSTILE_KEY!;

export const server = {
	sendForm: defineAction({
		accept: 'form',
		input: z.object({
			name: z.string().min(1),
			email: z.string().email(),
			message: z.string().min(10).max(1000),
			turnstileToken: z.string(),
		}),
		handler: async ({ name, email, message, turnstileToken }) => {
			try {
				const response = await fetch(
					'https://challenges.cloudflare.com/turnstile/v0/siteverify',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							secret: secretKey,
							response: turnstileToken,
						}),
					},
				);

				const dataVerify = await response.json();

				if (!dataVerify.success) {
					return JSON.stringify({ error: dataVerify, success: false });
				}

				const container = await experimental_AstroContainer.create();
				const templateEmailString = await container.renderToString(EmailTemplate, {
					props: { name, email, message },
				});
				const data = await resend.emails.send({
					from: 'Portfolio <noreply@mcheniki.dev>',
					to: ['contact@mcheniki.dev'],
					subject: 'Contact Form Portfolio',
					html: templateEmailString,
				});

				return JSON.stringify({
					success: true,
					name: name,
					email: email,
					message: message,
					data,
				});
			} catch (error) {
				return JSON.stringify({ error, success: false });
			}
		},
	}),
};

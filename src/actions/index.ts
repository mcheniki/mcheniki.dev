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
			email: z.email(),
			message: z.string().min(10).max(1000),
			turnstileToken: z.string(),
			locale: z.enum(['fr', 'en']),
		}),
		handler: async ({ name, email, message, turnstileToken, locale }) => {
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

				const dataVerify: { success?: boolean } = await response.json();

				if (!dataVerify.success) {
					return { status: 'turnstile-error' as const };
				}

				const container = await experimental_AstroContainer.create();
				const templateEmailString = await container.renderToString(EmailTemplate, {
					props: { name, email, message, locale },
				});
				const { error } = await resend.emails.send({
					from: 'Portfolio <noreply@mcheniki.dev>',
					to: ['contact@mcheniki.dev'],
					subject: `[${locale.toUpperCase()}] Contact Form Portfolio`,
					html: templateEmailString,
				});

				if (error) {
					return { status: 'send-error' as const };
				}

				return { status: 'success' as const };
			} catch {
				return { status: 'send-error' as const };
			}
		},
	}),
};

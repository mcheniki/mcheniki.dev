import { actions } from 'astro:actions';

import { useRef, useState, type FormHTMLAttributes, type SyntheticEvent } from 'react';

import TurnstileModule, { type BoundTurnstileObject } from 'react-turnstile';
import { z } from 'zod';

import { CtaReact } from './CtaReact';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { Textarea } from './Textarea';

import IconRocket from '@svgs/rocket.svg?react';
import type { Locale } from '../../i18n/config';
import type { FormMessages } from '../../i18n/ui';
import { createFormSchema, type FormErrors } from './validation';

const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY!;

const Turnstile =
	typeof TurnstileModule === 'function'
		? TurnstileModule
		: (TurnstileModule as unknown as { default: typeof TurnstileModule }).default;

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
	locale: Locale;
	messages: FormMessages;
};

export function Form({ locale, messages, ...rest }: FormProps) {
	const [sending, setSending] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<FormErrors>();
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const turnstileRef = useRef<BoundTurnstileObject | null>(null);

	const onVerify = (token: string, boundTurnstile: BoundTurnstileObject) => {
		turnstileRef.current = boundTurnstile;
		setTurnstileToken(token);
	};

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!turnstileToken) {
			setError(messages.turnstileError);
			return;
		}

		const target = event.currentTarget;
		await send(target);
	};

	const send = async (target: HTMLFormElement) => {
		setSending(true);
		setError(null);
		setFieldErrors(undefined);

		const formData = new FormData(target);
		formData.append('turnstileToken', turnstileToken!);

		const formValues = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
		};
		const validate = createFormSchema(messages).safeParse(formValues);

		if (validate.success) {
			try {
				const sendResponse = await actions.sendForm(formData);

				if (sendResponse.error || !sendResponse.data) {
					setError(messages.genericError);
				} else if (sendResponse.data.status === 'success') {
					setSuccess(true);
				} else if (sendResponse.data.status === 'turnstile-error') {
					setError(messages.turnstileError);
				} else {
					setError(messages.sendError);
				}
			} catch {
				setError(messages.genericError);
			}
		} else {
			setFieldErrors(z.flattenError(validate.error).fieldErrors);
		}

		setSending(false);
		setTurnstileToken(null);
		turnstileRef.current?.reset();
	};

	return (
		<>
			{success ? (
				<p className="flex-1 self-center text-center font-jetbrains">
					<span className="text-36 font-bold text-primary-500">
						{messages.successTitle}
					</span>
					<br />
					<span className="text-25 font-semibold">
						{messages.successDescription} <br />
					</span>
					<span aria-hidden="true" className="text-48">
						&#9749;
					</span>
				</p>
			) : (
				<form {...rest} method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
					<input type="hidden" name="locale" value={locale} />
					<div className="flex items-center gap-24 max-md:flex-col md:gap-12">
						<FormGroup label={messages.name} controlId="name" className="w-full flex-1">
							<Input type="text" id="name" name="name" required="required" />
							{fieldErrors && (
								<span className="absolute top-full left-0 text-12 font-bold text-error-500">
									{fieldErrors.name?.[0]}
								</span>
							)}
						</FormGroup>
						<FormGroup
							label={messages.email}
							controlId="email"
							className="w-full flex-1"
						>
							<Input type="email" id="email" name="email" required="required" />
							{fieldErrors && (
								<span className="absolute top-full left-0 text-12 font-bold text-error-500">
									{fieldErrors.email?.[0]}
								</span>
							)}
						</FormGroup>
					</div>
					<FormGroup label={messages.message} controlId="message" className="mt-24">
						<Textarea id="message" required="required" />
						{fieldErrors && (
							<span className="absolute top-full left-0 text-12 font-bold text-error-500">
								{fieldErrors.message?.[0]}
							</span>
						)}
					</FormGroup>
					<Turnstile
						sitekey={siteKey}
						onVerify={onVerify}
						language={locale}
						theme="dark"
						className="mt-24 text-left"
					/>

					{error && <p className="mt-24 text-14 font-bold text-error-500">{error}</p>}

					<div className="mt-24 flex">
						<CtaReact disabled={sending || turnstileToken === null}>
							<IconRocket
								className={`fill-current ${sending ? 'animate-shake' : ''}`}
							/>
							{sending ? messages.sending : messages.send}
						</CtaReact>
					</div>
				</form>
			)}
		</>
	);
}

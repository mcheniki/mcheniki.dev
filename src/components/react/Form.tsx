import { actions } from 'astro:actions';

import { useRef, useState, type FormEvent } from 'react';

import TurnstileModule, { type BoundTurnstileObject } from 'react-turnstile';
import { z } from 'zod';

import { CtaReact } from './CtaReact';
import { FormGroup } from './FormGroup';
import { Input } from './Input';
import { Textarea } from './Textarea';

import IconRocket from '@svgs/rocket.svg?react';
import { formSchema, type FormErrors } from './validation';

const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY!;

const Turnstile =
	typeof TurnstileModule === 'function'
		? TurnstileModule
		: (TurnstileModule as unknown as { default: typeof TurnstileModule }).default;

export function Form({ ...rest }) {
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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!turnstileToken) {
			console.log('Turnstile verification not completed yet');
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
		const validate = formSchema.safeParse(formValues);

		if (validate.success) {
			try {
				const sendResponse = await actions.sendForm(formData);

				if (sendResponse.error || !sendResponse.data) {
					setError('Une erreur est survenue, veuillez réessayer.');
				} else if (sendResponse.data.status === 'success') {
					setSuccess(true);
				} else if (sendResponse.data.status === 'turnstile-error') {
					setError('La vérification anti-robot a échoué, veuillez réessayer.');
				} else {
					setError("L'envoi du message a échoué, veuillez réessayer.");
				}
			} catch {
				setError('Une erreur est survenue, veuillez réessayer.');
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
						Merci pour ton message!
					</span>
					<br />
					<span className="text-25 font-semibold">
						Je reviens vers toi dès que j'ai fini mon café! <br />
					</span>
					<span aria-hidden="true" className="text-48">
						&#9749;
					</span>
				</p>
			) : (
				<form {...rest} method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
					<div className="flex items-center gap-24 max-md:flex-col md:gap-12">
						<FormGroup name="nom" className="w-full flex-1">
							<Input type="text" id="name" name="name" required="required" />
							{fieldErrors && (
								<span className="absolute top-full left-0 text-12 font-bold text-error-500">
									{fieldErrors.name?.[0]}
								</span>
							)}
						</FormGroup>
						<FormGroup name="e-mail" className="w-full flex-1">
							<Input type="email" id="email" name="email" required="required" />
							{fieldErrors && (
								<span className="absolute top-full left-0 text-12 font-bold text-error-500">
									{fieldErrors.email?.[0]}
								</span>
							)}
						</FormGroup>
					</div>
					<FormGroup name="message" className="mt-24">
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
						theme="dark"
						className="mt-24 text-left"
					/>

					{error && <p className="mt-24 text-14 font-bold text-error-500">{error}</p>}

					<div className="mt-24 flex">
						<CtaReact disabled={sending || turnstileToken === null}>
							<IconRocket
								className={`fill-current ${sending ? 'animate-shake' : ''}`}
							/>
							Envoyer
						</CtaReact>
					</div>
				</form>
			)}
		</>
	);
}

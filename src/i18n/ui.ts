import type { Locale } from './config';

const fr = {
	'meta.jobTitle': 'Développeur Web Senior',
	'meta.ogImageAlt': 'Portfolio de Mehdi Cheniki avec son avatar astronaute',
	'header.avatarAlt': "Tête de l'avatar de Mehdi Cheniki",
	'header.contact': 'Me contacter',
	'header.resume': 'Mon parcours',
	'header.languagePicker': 'Choix de la langue',
	'header.menu': 'Menu principal',
	'header.openMenu': 'Ouvrir le menu',
	'header.closeMenu': 'Fermer le menu',
	'header.showFrench': 'Afficher le site en français',
	'header.showEnglish': 'Afficher le site en anglais',
	'projects.viewDetails': 'Voir les détails du projet {title}',
	'projects.caseStudy': 'Voir la fiche complète',
	'projects.openApplication': 'Ouvrir l’application',
	'projects.screenshot': 'Capture du projet {title}',
	'projects.close': 'Fermer',
	'projects.stack': 'Stack',
	'projects.description': 'Description',
	'projects.viewProject': 'Voir le projet',
	'form.name': 'Nom',
	'form.email': 'E-mail',
	'form.message': 'Message',
	'form.send': 'Envoyer',
	'form.sending': 'Envoi en cours…',
	'form.successTitle': 'Merci pour ton message !',
	'form.successDescription': "Je reviens vers toi dès que j'ai fini mon café !",
	'footer.avatarAlt': 'Avatar de Mehdi Cheniki',
	'footer.email': 'Envoyer un e-mail',
	'footer.linkedin': 'Aller sur LinkedIn',
	'footer.github': 'Aller sur GitHub',
	'footer.copyright': 'Copyright © 2026 - Tous droits réservés',
	'footer.developedBy': 'Développé par',
	'footer.designedBy': 'Designé par',
	'a11y.externalLink': 'Ouvre dans un nouvel onglet',
	'a11y.skipToContent': 'Aller au contenu principal',
	'a11y.mehdinautAlt': 'mehdinaut',
	'errors.emailRequired': "L'e-mail est requis",
	'errors.emailInvalid': 'E-mail invalide',
	'errors.nameRequired': 'Le nom est requis',
	'errors.messageMin': 'Le message doit contenir au moins 10 caractères',
	'errors.messageMax': 'Le message est trop long (max. 1 000 caractères)',
	'errors.generic': 'Une erreur est survenue, veuillez réessayer.',
	'errors.turnstile': 'La vérification anti-robot a échoué, veuillez réessayer.',
	'errors.send': "L'envoi du message a échoué, veuillez réessayer.",
	'errors.formUnavailable': 'Le formulaire est temporairement indisponible.',
	'errors.formUnavailableDescription': 'Veuillez réessayer plus tard ou me contacter par e-mail.',
	'errors.sceneUnavailable': 'La scène 3D n’est pas disponible sur cet appareil.',
} as const;

type TranslationCatalog = { [Key in keyof typeof fr]: string };

const en = {
	'meta.jobTitle': 'Senior Web Developer',
	'meta.ogImageAlt': "Mehdi Cheniki's portfolio with his astronaut avatar",
	'header.avatarAlt': "Mehdi Cheniki's avatar head",
	'header.contact': 'Get in touch',
	'header.resume': 'My resume',
	'header.languagePicker': 'Language selector',
	'header.menu': 'Main menu',
	'header.openMenu': 'Open menu',
	'header.closeMenu': 'Close menu',
	'header.showFrench': 'View the website in French',
	'header.showEnglish': 'View the website in English',
	'projects.viewDetails': 'View details for {title}',
	'projects.caseStudy': 'View case study',
	'projects.openApplication': 'Open application',
	'projects.screenshot': 'Screenshot of {title}',
	'projects.close': 'Close',
	'projects.stack': 'Stack',
	'projects.description': 'Description',
	'projects.viewProject': 'View project',
	'form.name': 'Name',
	'form.email': 'Email',
	'form.message': 'Message',
	'form.send': 'Send',
	'form.sending': 'Sending…',
	'form.successTitle': 'Thanks for your message!',
	'form.successDescription': "I'll get back to you once I have finished my coffee!",
	'footer.avatarAlt': "Mehdi Cheniki's avatar",
	'footer.email': 'Send an email',
	'footer.linkedin': 'Visit LinkedIn',
	'footer.github': 'Visit GitHub',
	'footer.copyright': 'Copyright © 2026 - All rights reserved',
	'footer.developedBy': 'Developed by',
	'footer.designedBy': 'Designed by',
	'a11y.externalLink': 'Opens in a new tab',
	'a11y.skipToContent': 'Skip to main content',
	'a11y.mehdinautAlt': 'mehdinaut',
	'errors.emailRequired': 'Email is required',
	'errors.emailInvalid': 'Invalid email address',
	'errors.nameRequired': 'Name is required',
	'errors.messageMin': 'The message must contain at least 10 characters',
	'errors.messageMax': 'The message is too long (max. 1,000 characters)',
	'errors.generic': 'An error occurred. Please try again.',
	'errors.turnstile': 'The anti-bot verification failed. Please try again.',
	'errors.send': 'The message could not be sent. Please try again.',
	'errors.formUnavailable': 'The form is temporarily unavailable.',
	'errors.formUnavailableDescription': 'Please try again later or contact me by email.',
	'errors.sceneUnavailable': 'The 3D scene is not available on this device.',
} satisfies TranslationCatalog;

const ui = { fr, en } satisfies Record<Locale, TranslationCatalog>;

/** Returns the keys that are missing from one of the translation catalogues. */
export function getTranslationParityErrors() {
	const referenceKeys = Object.keys(ui.fr);
	const englishKeys = new Set(Object.keys(ui.en));
	const errors = referenceKeys
		.filter((key) => !englishKeys.has(key))
		.map((key) => `Missing English translation key: ${key}`);

	for (const key of englishKeys) {
		if (!(key in ui.fr)) {
			errors.push(`Missing French translation key: ${key}`);
		}
	}

	return errors;
}

export type FormMessages = {
	name: string;
	email: string;
	message: string;
	send: string;
	sending: string;
	successTitle: string;
	successDescription: string;
	emailRequired: string;
	emailInvalid: string;
	nameRequired: string;
	messageMin: string;
	messageMax: string;
	genericError: string;
	turnstileError: string;
	sendError: string;
};

export const formMessages = {
	fr: {
		name: fr['form.name'],
		email: fr['form.email'],
		message: fr['form.message'],
		send: fr['form.send'],
		sending: fr['form.sending'],
		successTitle: fr['form.successTitle'],
		successDescription: fr['form.successDescription'],
		emailRequired: fr['errors.emailRequired'],
		emailInvalid: fr['errors.emailInvalid'],
		nameRequired: fr['errors.nameRequired'],
		messageMin: fr['errors.messageMin'],
		messageMax: fr['errors.messageMax'],
		genericError: fr['errors.generic'],
		turnstileError: fr['errors.turnstile'],
		sendError: fr['errors.send'],
	},
	en: {
		name: en['form.name'],
		email: en['form.email'],
		message: en['form.message'],
		send: en['form.send'],
		sending: en['form.sending'],
		successTitle: en['form.successTitle'],
		successDescription: en['form.successDescription'],
		emailRequired: en['errors.emailRequired'],
		emailInvalid: en['errors.emailInvalid'],
		nameRequired: en['errors.nameRequired'],
		messageMin: en['errors.messageMin'],
		messageMax: en['errors.messageMax'],
		genericError: en['errors.generic'],
		turnstileError: en['errors.turnstile'],
		sendError: en['errors.send'],
	},
} as const satisfies Record<Locale, FormMessages>;

export type ErrorBoundaryMessages = {
	title: string;
	description: string;
};

export const errorBoundaryMessages = {
	fr: {
		title: fr['errors.formUnavailable'],
		description: fr['errors.formUnavailableDescription'],
	},
	en: {
		title: en['errors.formUnavailable'],
		description: en['errors.formUnavailableDescription'],
	},
} as const satisfies Record<Locale, ErrorBoundaryMessages>;

export type SceneMessages = {
	unavailable: string;
};

export const sceneMessages = {
	fr: { unavailable: fr['errors.sceneUnavailable'] },
	en: { unavailable: en['errors.sceneUnavailable'] },
} as const satisfies Record<Locale, SceneMessages>;

type TranslationKey = keyof typeof fr;

type TranslationValues = {
	'projects.viewDetails': { title: string };
	'projects.screenshot': { title: string };
};

export function useTranslations(locale: Locale) {
	const messages = ui[locale];

	return function t<Key extends TranslationKey>(
		key: Key,
		...args: Key extends keyof TranslationValues ? [TranslationValues[Key]] : []
	): string {
		const values = args[0] as Record<string, string> | undefined;

		if (!values) return messages[key];

		return messages[key].replace(/\{(\w+)\}/g, (_, placeholder: string) => {
			return values[placeholder] ?? `{${placeholder}}`;
		});
	};
}

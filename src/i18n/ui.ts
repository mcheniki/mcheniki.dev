import type { Locale } from './config';

const fr = {
	'meta.title': 'Mehdi Cheniki | Développeur web freelance | WordPress & React',
	'meta.description':
		"Mehdi Cheniki — développeur web freelance, 10 ans d'expérience. Sites WordPress sur mesure (thèmes, plugins, Gutenberg) et applications React.",
	'meta.jobTitle': 'Développeur web freelance',
	'header.avatarAlt': "Tête de l'avatar de Mehdi Cheniki",
	'header.contact': 'Me contacter',
	'header.languagePicker': 'Choix de la langue',
	'header.menu': 'Menu principal',
	'header.openMenu': 'Ouvrir le menu',
	'header.closeMenu': 'Fermer le menu',
	'header.showFrench': 'Afficher le site en français',
	'header.showEnglish': 'Afficher le site en anglais',
	'hero.job': 'Développeur web',
	'hero.jobPrimary': 'Développeur',
	'hero.jobEmphasis': 'web',
	'hero.specialties': 'WordPress full-stack • React • TypeScript',
	'hero.description': 'Thèmes custom, blocs Gutenberg, plugins, applications React.',
	'about.eyebrow': 'À propos',
	'about.years': '10 ans',
	'about.title': "d'expertise web",
	'about.paragraph1':
		"J'ai commencé par travailler en agence, pour ensuite encadrer une équipe de devs en tant que tech lead, et aujourd'hui je suis freelance. Je fais du WordPress full-stack (thèmes custom, plugins, blocs Gutenberg). Ma pratique de React, c'est aussi ce qui me rend à l'aise dans Gutenberg.",
	'about.paragraph2':
		"Ma nature curieuse m'aide à rester à jour dans ce monde qui évolue chaque jour.",
	'about.paragraph3':
		'Mon parcours m’a amené à travailler dans des contextes variés : grands groupes, agences, et structures plus petites.',
	'stack.eyebrow': 'Technique',
	'stack.title': 'Deux expertises, un objectif : du sur mesure',
	'stack.description':
		"WordPress pour les sites qui ont besoin d'un back-office solide. Thèmes custom, plugins, blocs Gutenberg développés avec React pour une expérience d'édition moderne. React pour les applications interactives qui vont au-delà d'un site classique.",
	'stack.hoverPrompt': 'Survole une des icônes',
	'stack.reactDescription':
		"Le framework JavaScript que j'ai choisi pour réaliser des interfaces utilisateur de qualité et performantes.",
	'stack.javascriptDescription':
		"Le langage que j'utilise pour améliorer l'expérience utilisateur au travers d'interactions et d'animations.",
	'stack.wordpressDescription':
		"Avec 10 ans d'expérience sur WordPress, c'est le CMS que je propose à mes clients pour la gestion de leur contenu.",
	'stack.phpDescription':
		'Je développe des fonctionnalités WordPress sur mesure en PHP pour créer des expériences uniques et personnalisées.',
	'projects.eyebrow': 'Réalisations',
	'projects.title': 'Projets',
	'projects.viewDetails': 'Voir les détails du projet {title}',
	'projects.screenshot': 'Capture du projet {title}',
	'projects.close': 'Fermer',
	'projects.stack': 'Stack',
	'projects.description': 'Description',
	'projects.viewProject': 'Voir le projet',
	'contact.eyebrow': 'Contact',
	'contact.title': 'On discute ?',
	'contact.description':
		'Un projet, une question, ou juste un bonjour, le formulaire est là pour ça.',
	'contact.details': 'Informations de contact',
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
	'meta.title': 'Mehdi Cheniki | Freelance Web Developer | WordPress & React',
	'meta.description':
		'Mehdi Cheniki — freelance web developer with 10 years of experience. Custom WordPress websites (themes, plugins, Gutenberg) and React applications.',
	'meta.jobTitle': 'Freelance web developer',
	'header.avatarAlt': "Mehdi Cheniki's avatar head",
	'header.contact': 'Get in touch',
	'header.languagePicker': 'Language selector',
	'header.menu': 'Main menu',
	'header.openMenu': 'Open menu',
	'header.closeMenu': 'Close menu',
	'header.showFrench': 'View the website in French',
	'header.showEnglish': 'View the website in English',
	'hero.job': 'Web developer',
	'hero.jobPrimary': 'Web',
	'hero.jobEmphasis': 'developer',
	'hero.specialties': 'Full-stack WordPress • React • TypeScript',
	'hero.description': 'Custom themes, Gutenberg blocks, plugins, React applications.',
	'about.eyebrow': 'About',
	'about.years': '10 years',
	'about.title': 'of web expertise',
	'about.paragraph1':
		'I started out in an agency, then led a team of developers as a tech lead, and I am now a freelancer. I build full-stack WordPress solutions (custom themes, plugins, Gutenberg blocks). My React practice also makes me comfortable working with Gutenberg.',
	'about.paragraph2':
		'My curious nature helps me stay current in a world that evolves every day.',
	'about.paragraph3':
		'My career has led me to work in varied settings: large companies, agencies, and smaller organisations.',
	'stack.eyebrow': 'Technical expertise',
	'stack.title': 'Two areas of expertise, one goal: tailor-made solutions',
	'stack.description':
		'WordPress for websites that need a solid back office. Custom themes, plugins, and Gutenberg blocks built with React for a modern editing experience. React for interactive applications that go beyond a conventional website.',
	'stack.hoverPrompt': 'Hover over an icon',
	'stack.reactDescription':
		'The JavaScript framework I chose to build polished, high-performance user interfaces.',
	'stack.javascriptDescription':
		'The language I use to enhance the user experience through interactions and animations.',
	'stack.wordpressDescription':
		'With 10 years of WordPress experience, it is the CMS I recommend to my clients to manage their content.',
	'stack.phpDescription':
		'I build custom WordPress features in PHP to create unique, tailored experiences.',
	'projects.eyebrow': 'Selected work',
	'projects.title': 'Projects',
	'projects.viewDetails': 'View details for {title}',
	'projects.screenshot': 'Screenshot of {title}',
	'projects.close': 'Close',
	'projects.stack': 'Stack',
	'projects.description': 'Description',
	'projects.viewProject': 'View project',
	'contact.eyebrow': 'Contact',
	'contact.title': 'Shall we talk?',
	'contact.description': 'A project, a question, or just a hello: the form is here for that.',
	'contact.details': 'Contact details',
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

export const ui = { fr, en } satisfies Record<Locale, TranslationCatalog>;

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

export type StackDescriptions = {
	hoverPrompt: string;
	react: string;
	javascript: string;
	wordpress: string;
	php: string;
};

export const stackDescriptions = {
	fr: {
		hoverPrompt: fr['stack.hoverPrompt'],
		react: fr['stack.reactDescription'],
		javascript: fr['stack.javascriptDescription'],
		wordpress: fr['stack.wordpressDescription'],
		php: fr['stack.phpDescription'],
	},
	en: {
		hoverPrompt: en['stack.hoverPrompt'],
		react: en['stack.reactDescription'],
		javascript: en['stack.javascriptDescription'],
		wordpress: en['stack.wordpressDescription'],
		php: en['stack.phpDescription'],
	},
} as const satisfies Record<Locale, StackDescriptions>;

export type TranslationKey = keyof typeof fr;

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

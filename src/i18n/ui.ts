import type { Locale } from './config';

const fr = {
	'meta.title': 'Mehdi Cheniki | Développeur web senior | Front-End & WordPress',
	'meta.description':
		"Mehdi Cheniki — développeur web senior avec près de 10 ans d'expérience. Front-end React et JavaScript, expertise WordPress full-stack.",
	'meta.jobTitle': 'Développeur web senior / Front-End',
	'header.avatarAlt': "Tête de l'avatar de Mehdi Cheniki",
	'header.contact': 'Me contacter',
	'header.languagePicker': 'Choix de la langue',
	'header.menu': 'Menu principal',
	'header.openMenu': 'Ouvrir le menu',
	'header.closeMenu': 'Fermer le menu',
	'header.showFrench': 'Afficher le site en français',
	'header.showEnglish': 'Afficher le site en anglais',
	'hero.job': 'Développeur web senior',
	'hero.jobPrimary': 'Développeur web',
	'hero.jobEmphasis': 'senior',
	'hero.specialties': 'Front-End • React • WordPress Full-Stack',
	'hero.description': 'Interfaces modernes, applications web et solutions WordPress sur mesure.',
	'about.eyebrow': 'À propos',
	'about.years': '10 ans',
	'about.title': "d'expertise web",
	'about.paragraph1':
		"Développeur web depuis près de 10 ans, j'ai construit une solide expérience front-end. J'utilise React et JavaScript pour concevoir des interfaces interactives, maintenables et performantes, dans WordPress comme dans des applications web indépendantes.",
	'about.paragraph2':
		"Après plusieurs années en agence, j'ai encadré une équipe de développeurs en tant que Tech Lead. Ce parcours m'a appris à faire des choix techniques, structurer les projets, accompagner une équipe et avancer en autonomie.",
	'about.paragraph3':
		"WordPress reste une expertise forte de mon profil : thèmes et plugins sur mesure, blocs Gutenberg, intégrations API et logique métier en PHP. J'interviens ainsi sur le front-end comme sur l'ensemble d'un projet WordPress.",
	'stack.eyebrow': 'Technique',
	'stack.title': 'Front-end moderne et WordPress sur mesure',
	'stack.description':
		'React et JavaScript pour construire des interfaces interactives, maintenables et performantes. WordPress pour des projets full-stack sur mesure : thèmes, plugins, Gutenberg, intégrations API et logique métier en PHP.',
	'stack.hoverPrompt': 'Survole une des icônes',
	'stack.reactDescription':
		"Le framework JavaScript que j'ai choisi pour réaliser des interfaces utilisateur de qualité et performantes.",
	'stack.javascriptDescription':
		"Le langage que j'utilise pour améliorer l'expérience utilisateur au travers d'interactions et d'animations.",
	'stack.wordpressDescription':
		'Une expertise full-stack construite au fil de près de 10 ans : thèmes, plugins, Gutenberg et intégrations sur mesure.',
	'stack.phpDescription':
		"Le langage back-end que j'utilise dans WordPress pour développer des plugins, des intégrations API et de la logique métier.",
	'projects.eyebrow': 'Réalisations',
	'projects.title': 'Projets',
	'projects.professionalTitle': 'Réalisations professionnelles',
	'projects.professionalDescription':
		'Des produits et expériences conçus avec des équipes, pour des organisations et leurs utilisateurs.',
	'projects.personalTitle': 'Projets personnels',
	'projects.personalDescription':
		"Des produits que j'imagine, conçois et fais évoluer jusqu'à leur mise en production.",
	'projects.viewDetails': 'Voir les détails du projet {title}',
	'projects.caseStudy': 'Voir la fiche complète',
	'projects.openApplication': 'Ouvrir l’application',
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
	'meta.title': 'Mehdi Cheniki | Senior Web Developer | Front-End & WordPress',
	'meta.description':
		'Mehdi Cheniki — senior web developer with nearly 10 years of experience. React and JavaScript front-end development, with full-stack WordPress expertise.',
	'meta.jobTitle': 'Senior Web / Front-End Developer',
	'header.avatarAlt': "Mehdi Cheniki's avatar head",
	'header.contact': 'Get in touch',
	'header.languagePicker': 'Language selector',
	'header.menu': 'Main menu',
	'header.openMenu': 'Open menu',
	'header.closeMenu': 'Close menu',
	'header.showFrench': 'View the website in French',
	'header.showEnglish': 'View the website in English',
	'hero.job': 'Senior web developer',
	'hero.jobPrimary': 'Web developer',
	'hero.jobEmphasis': 'senior',
	'hero.specialties': 'Front-End • React • Full-Stack WordPress',
	'hero.description': 'Modern interfaces, web applications and custom WordPress solutions.',
	'about.eyebrow': 'About',
	'about.years': '10 years',
	'about.title': 'of web expertise',
	'about.paragraph1':
		'With nearly 10 years in web development, I have built strong front-end expertise. I use React and JavaScript to create interactive, maintainable and high-performance interfaces, both within WordPress and in standalone web applications.',
	'about.paragraph2':
		'After several years working in agencies, I led a development team as Tech Lead. That experience taught me to make sound technical decisions, structure projects, support a team and work autonomously.',
	'about.paragraph3':
		'WordPress remains a core area of expertise: custom themes and plugins, Gutenberg blocks, API integrations and business logic in PHP. I can contribute to the front end as well as across an entire WordPress project.',
	'stack.eyebrow': 'Technical expertise',
	'stack.title': 'Modern front-end and custom WordPress',
	'stack.description':
		'React and JavaScript for interactive, maintainable and high-performance interfaces. WordPress for custom full-stack projects: themes, plugins, Gutenberg, API integrations and business logic in PHP.',
	'stack.hoverPrompt': 'Hover over an icon',
	'stack.reactDescription':
		'The JavaScript framework I chose to build polished, high-performance user interfaces.',
	'stack.javascriptDescription':
		'The language I use to enhance the user experience through interactions and animations.',
	'stack.wordpressDescription':
		'Full-stack expertise built over nearly 10 years: custom themes, plugins, Gutenberg and integrations.',
	'stack.phpDescription':
		'The back-end language I use within WordPress for plugins, API integrations and business logic.',
	'projects.eyebrow': 'Selected work',
	'projects.title': 'Projects',
	'projects.professionalTitle': 'Professional work',
	'projects.professionalDescription':
		'Products and experiences created with teams, for organisations and their users.',
	'projects.personalTitle': 'Independent projects',
	'projects.personalDescription':
		'Products I imagine, design, build and evolve through to production.',
	'projects.viewDetails': 'View details for {title}',
	'projects.caseStudy': 'View case study',
	'projects.openApplication': 'Open application',
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

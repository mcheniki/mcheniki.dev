import heroImage from '../../content/projects/restmoney/restmoney.webp';
import dashboardImage from '../../content/projects/restmoney/restmoney-dashboard.webp';
import incomeImage from '../../content/projects/restmoney/restmoney-income.webp';
import type { CaseStudy } from './types';

export const restMoneyCaseStudy = {
	route: 'restmoney',
	applicationUrl: 'https://restmoney.mcheniki.dev/',
	applicationCategory: 'FinanceApplication',
	softwareId: 'https://restmoney.mcheniki.dev/#software',
	stack: ['react', 'typescript', 'tanstack', 'tailwindcss', 'sqlite'],
	hero: { image: heroImage, width: 1280, height: 853 },
	gallery: [
		{
			image: dashboardImage,
			alt: {
				fr: 'Synthèse annuelle des revenus et provisions dans le tableau de bord RestMoney',
				en: 'Annual overview of income and provisions on the RestMoney dashboard',
			},
			caption: {
				fr: 'Le tableau de bord rapproche le chiffre d’affaires encaissé, les sommes à mettre de côté et le montant restant.',
				en: 'The dashboard brings together collected revenue, the amounts to set aside and what remains.',
			},
			widths: [640, 1280, 2560],
			sizes: '(min-width: 1280px) 1230px, calc(100vw - 48px)',
			quality: 100,
		},
		{
			image: incomeImage,
			alt: {
				fr: 'Liste et historique des revenus enregistrés dans RestMoney',
				en: 'List and history of income entries recorded in RestMoney',
			},
			caption: {
				fr: 'Les revenus peuvent être recherchés, triés et consultés pour comprendre leur effet sur le montant restant.',
				en: 'Income can be searched, sorted and inspected to understand its effect on what remains.',
			},
			widths: [640, 1280, 2560],
			sizes: '(min-width: 1280px) 1230px, calc(100vw - 48px)',
			quality: 100,
		},
	],
	content: {
		fr: {
			metaTitle: 'RestMoney | Projet full-stack de Mehdi Cheniki',
			metaDescription:
				'Une application personnelle pour suivre ses revenus d’auto-entrepreneur et voir ce qu’il reste après les cotisations et les impôts.',
			back: 'Retour aux projets',
			label: 'Projet personnel',
			role: 'Développement full-stack',
			year: '2026',
			title: 'RestMoney',
			intro: 'Un outil personnel pour suivre mes encaissements et estimer ce qu’il me reste après les cotisations et les impôts, au fil de l’année.',
			open: "Ouvrir l'application",
			heroAlt: 'Montage de présentation de RestMoney montrant un aperçu du tableau de bord',
			heroCaption: 'Montage de présentation réalisé à partir de l’interface de RestMoney.',
			problemEyebrow: 'Le point de départ',
			problemTitle: 'Savoir ce qu’il me reste, au fil de l’année',
			problem:
				'En tant qu’auto-entrepreneur, je voulais savoir, à chaque encaissement, ce que je pouvais vraiment considérer comme disponible. Le chiffre d’affaires seul ne suffit pas : RestMoney affiche les montants à mettre de côté pour les cotisations et les impôts, puis estime ce qu’il me reste. C’est un repère pour suivre mon année, pas un outil de conseil comptable.',
			challengesTitle: 'Les enjeux de conception',
			challenges: [
				'Faire évoluer le taux de cotisation sans modifier les calculs des revenus déjà enregistrés.',
				'Montrer l’impact d’un encaissement sur l’estimation annuelle, y compris lorsqu’il est modifié ou déplacé sur une autre année.',
				'Permettre de manipuler et de réinitialiser la démo sans toucher à mes données personnelles.',
			],
			decisionsEyebrow: 'Les choix d’architecture',
			decisionsTitle: 'Des choix techniques adaptés à un outil personnel',
			decisions: [
				{
					title: 'Un taux conservé avec chaque revenu',
					text: 'Le taux de cotisation est enregistré avec chaque encaissement. Les calculs réutilisent cette valeur plutôt que le réglage courant, pour éviter qu’un changement de taux ne modifie les montants déjà suivis.',
				},
				{
					title: 'Une logique de calcul partagée et testée',
					text: 'Les calculs sont regroupés dans des fonctions utilisées par le tableau de bord et les formulaires. L’impact d’un revenu est estimé à partir du cumul de l’année concernée ; des tests couvrent le franchissement d’un seuil et le changement d’année lors d’une modification.',
				},
				{
					title: 'Une démo isolée et réinitialisable',
					text: 'La démo utilise un fichier SQLite distinct de mes données personnelles. Sa réinitialisation remplace les revenus et les réglages de démonstration dans une même transaction, pour retrouver un état cohérent.',
				},
			],
			imagesEyebrow: 'En images',
			stackEyebrow: 'Technologies',
			stackTitle: 'Une base full-stack pensée pour rester simple',
			stackDetails:
				'TanStack Start · Better Auth · Drizzle ORM · Bun · Zod · Recharts · Vite',
			finalEyebrow: "Essayer l'application",
			finalTitle: 'Découvrir RestMoney',
			finalText:
				'L’application est disponible en démo avec des données fictives. Les montants affichés sont des estimations et ne remplacent pas un conseil fiscal ou comptable.',
		},
		en: {
			metaTitle: 'RestMoney | Full-stack project by Mehdi Cheniki',
			metaDescription:
				'A personal application for tracking freelance income and seeing what remains after contributions and taxes are set aside.',
			back: 'Back to projects',
			label: 'Personal project',
			role: 'Full-stack development',
			year: '2026',
			title: 'RestMoney',
			intro: 'A personal tool for tracking my income and estimating what remains after contributions and taxes throughout the year.',
			open: 'Open the application',
			heroAlt: 'RestMoney presentation montage showing an overview of the dashboard',
			heroCaption: 'Presentation montage created from the RestMoney interface.',
			problemEyebrow: 'Starting point',
			problemTitle: 'Knowing what remains throughout the year',
			problem:
				'As a self-employed professional, I wanted to know, with each payment, what I could actually treat as available. Revenue alone does not answer that: RestMoney shows the amounts to set aside for contributions and taxes, then estimates what remains. It is a practical way to follow my year, not accounting advice.',
			challengesTitle: 'Design challenges',
			challenges: [
				'Updating the contribution rate without changing calculations for income that has already been recorded.',
				'Showing how an income entry affects the annual estimate, including when it is edited or moved to another year.',
				'Letting people use and reset the demo without affecting my personal data.',
			],
			decisionsEyebrow: 'Architecture choices',
			decisionsTitle: 'Technical choices suited to a personal tool',
			decisions: [
				{
					title: 'A rate stored with each income entry',
					text: 'The contribution rate is stored with each payment. Calculations reuse that value instead of the current setting, so a rate change does not alter amounts that have already been tracked.',
				},
				{
					title: 'Shared, tested calculation logic',
					text: 'Calculations are grouped into functions used by the dashboard and forms. An income entry’s impact is estimated from the total for its year; tests cover crossing a threshold and changing the year when editing an entry.',
				},
				{
					title: 'An isolated, resettable demo',
					text: 'The demo uses a SQLite file separate from my personal data. Resetting it replaces its sample income and settings in one transaction, restoring a consistent state.',
				},
			],
			imagesEyebrow: 'In pictures',
			stackEyebrow: 'Technologies',
			stackTitle: 'A full-stack foundation designed to stay simple',
			stackDetails:
				'TanStack Start · Better Auth · Drizzle ORM · Bun · Zod · Recharts · Vite',
			finalEyebrow: 'Try the application',
			finalTitle: 'Explore RestMoney',
			finalText:
				'The application is available as a demo with fictional data. Displayed amounts are estimates and do not replace tax or accounting advice.',
		},
	},
} satisfies CaseStudy;

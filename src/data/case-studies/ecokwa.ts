import heroImage from '../../content/projects/ecokwa/ecokwa.webp';
import indicatorImage from '../../content/projects/ecokwa/ecokwa-indicator.webp';
import type { CaseStudy } from './types';

export const ecoKwaCaseStudy = {
	route: 'ecokwa',
	applicationUrl: 'https://ecokwa.mcheniki.dev',
	applicationCategory: 'Data visualisation',
	softwareId: 'https://ecokwa.mcheniki.dev/#software',
	stack: ['laravel', 'react', 'typescript', 'postgresql', 'docker'],
	hero: { image: heroImage, width: 1280, height: 720 },
	gallery: [
		{
			image: indicatorImage,
			alt: {
				fr: "Graphique de l'évolution de l'inflation dans une fiche EcoKwa",
				en: 'Inflation evolution chart on an EcoKwa indicator page',
			},
			caption: {
				fr: 'Une fiche rassemble valeur actuelle, évolution, provenance et accès à la source officielle.',
				en: 'An indicator page brings together its latest value, evolution, origin and official source.',
			},
			width: 1280,
			height: 720,
		},
	],
	content: {
		fr: {
			metaTitle: 'EcoKwa | Projet full-stack de Mehdi Cheniki',
			metaDescription:
				'Conception et développement d’une application Laravel et React pour rechercher et visualiser des données publiques françaises.',
			back: 'Retour aux projets',
			label: 'Projet personnel',
			role: 'Développement full-stack',
			year: '2026',
			title: 'EcoKwa',
			intro: 'Une application pour rechercher et visualiser simplement des données publiques françaises provenant de plusieurs organismes officiels.',
			open: "Ouvrir l'application",
			heroAlt: "Page d'accueil d'EcoKwa avec recherche et indicateur d'inflation",
			problemEyebrow: 'Le point de départ',
			problemTitle: 'Rendre les données publiques plus faciles à consulter',
			problem:
				'Les données publiques françaises sont nombreuses et fiables, mais dispersées entre différents organismes, formats et vocabulaires. EcoKwa propose un point d’entrée plus simple pour retrouver un indicateur, comprendre ce qu’il représente et suivre son évolution.',
			challengesTitle: 'Les enjeux de conception',
			challenges: [
				'Réunir des sources aux formats différents dans un modèle commun, tout en conservant leur provenance et leur méthodologie.',
				'Maintenir les données à jour malgré les incidents d’import, sans créer de doublons lors des relances.',
				'Rendre les données lisibles sans perdre leur contexte : source, méthodologie, statuts provisoires ou révisés et distinction entre une valeur absente et un zéro.',
			],
			decisionsEyebrow: 'Les choix d’architecture',
			decisionsTitle: 'Unifier les sources, fiabiliser les imports, préserver le contexte',
			decisions: [
				{
					title: 'Des importeurs spécialisés',
					text: 'Les données arrivent par API JSON paginée et par fichiers Excel. Des importeurs dédiés valident les réponses, normalisent les périodes et mettent à jour les observations existantes.',
				},
				{
					title: 'Des traitements repris après incident',
					text: 'Les imports s’exécutent en arrière-plan, distinguent les erreurs temporaires des erreurs définitives et réessaient progressivement. Des verrous et un historique d’exécution complètent le dispositif.',
				},
				{
					title: 'Un contexte préservé',
					text: 'La source, la méthodologie et les statuts restent visibles. Une valeur absente n’est jamais remplacée par zéro, et les graphiques disposent d’une alternative tabulaire.',
				},
			],
			imagesEyebrow: 'En images',
			stackEyebrow: 'Technologies',
			stackTitle: 'Le socle technique',
			stackDetails:
				'Inertia.js · Tailwind CSS · Laravel Queues & Scheduler · Pest · Vitest · Inertia SSR · GitLab CI/CD · Coolify',
			finalEyebrow: "Essayer l'application",
			finalTitle: 'Explorer les données dans EcoKwa',
			finalText:
				"L'application est en ligne : recherchez un indicateur et consultez sa méthodologie.",
		},
		en: {
			metaTitle: 'EcoKwa | Full-stack project by Mehdi Cheniki',
			metaDescription:
				'A Laravel and React application for searching and visualising French public data.',
			back: 'Back to projects',
			label: 'Independent project',
			role: 'Full-stack development',
			year: '2026',
			title: 'EcoKwa',
			intro: 'An application for easily searching and visualising French public data from several official organisations.',
			open: 'Open the application',
			heroAlt: 'EcoKwa home page with search and an inflation indicator',
			problemEyebrow: 'Starting point',
			problemTitle: 'Making public data easier to consult',
			problem:
				'French public data is plentiful and reliable, but spread across different organisations, formats and specialist terminology. EcoKwa provides a simpler entry point for finding an indicator, understanding what it represents and following its evolution.',
			challengesTitle: 'Design challenges',
			challenges: [
				'Bringing sources with different formats into a common model while retaining their origin and methodology.',
				'Keeping data up to date despite import failures, without creating duplicates on reruns.',
				'Making data readable without losing its context: source, methodology, provisional or revised statuses, and the difference between a missing value and zero.',
			],
			decisionsEyebrow: 'Architecture choices',
			decisionsTitle: 'Unifying sources, making imports dependable, preserving context',
			decisions: [
				{
					title: 'Dedicated importers',
					text: 'Data arrives through paginated JSON APIs and Excel files. Dedicated importers validate responses, normalise periods and update existing observations.',
				},
				{
					title: 'Background processing with recovery',
					text: 'Imports run in the background, distinguish temporary from permanent failures and retry progressively. Locks and an execution history complete the process.',
				},
				{
					title: 'Context preserved',
					text: 'The source, methodology and statuses remain visible. A missing value is never replaced with zero, and charts have a tabular alternative.',
				},
			],
			imagesEyebrow: 'In pictures',
			stackEyebrow: 'Technologies',
			stackTitle: 'Technical foundation',
			stackDetails:
				'Inertia.js · Tailwind CSS · Laravel Queues & Scheduler · Pest · Vitest · Inertia SSR · GitLab CI/CD · Coolify',
			finalEyebrow: 'Try the application',
			finalTitle: 'Explore the data in EcoKwa',
			finalText: 'The application is live: search for an indicator and read its methodology.',
		},
	},
} satisfies CaseStudy;

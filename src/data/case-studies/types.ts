import type { ImageMetadata } from 'astro';

import type { Locale } from '../../i18n/config';
import type { CaseStudyRouteId } from '../../i18n/routes';

type Copy = {
	metaTitle: string;
	metaDescription: string;
	back: string;
	label: string;
	role: string;
	year: string;
	title: string;
	intro: string;
	open: string;
	heroAlt: string;
	heroCaption?: string;
	problemEyebrow: string;
	problemTitle: string;
	problem: string;
	challengesTitle: string;
	challenges: string[];
	decisionsEyebrow: string;
	decisionsTitle: string;
	decisions: Array<{ title: string; text: string }>;
	imagesEyebrow: string;
	stackEyebrow: string;
	stackTitle: string;
	stackDetails: string;
	finalEyebrow: string;
	finalTitle: string;
	finalText: string;
};

export type GalleryImage = {
	image: ImageMetadata;
	alt: Record<Locale, string>;
	caption: Record<Locale, string>;
	width?: number;
	height?: number;
	widths?: number[];
	sizes?: string;
	quality?: number;
};

export type CaseStudy = {
	route: CaseStudyRouteId;
	applicationUrl: string;
	applicationCategory: string;
	softwareId: string;
	stack: string[];
	hero: {
		image: ImageMetadata;
		width: number;
		height: number;
	};
	gallery: GalleryImage[];
	content: Record<Locale, Copy>;
};

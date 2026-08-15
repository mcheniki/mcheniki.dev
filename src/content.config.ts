import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { locales } from './i18n/config';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects/' }),
	schema: ({ image }) =>
		z.object({
			translationKey: z.string().min(1),
			locale: z.enum(locales),
			title: z.string(),
			stack: z.array(z.string()),
			image: image(),
			url: z.url().optional(),
			order: z.number().optional(),
			projectType: z.enum(['professional', 'personal']).default('professional'),
			role: z.string().optional(),
			mission: z.string().optional(),
		}),
});

const experienceSchema = z.object({
	period: z.string(),
	role: z.string(),
	company: z.string(),
	location: z.string(),
	summary: z.string(),
	highlights: z.array(z.string()),
	stack: z.array(z.string()),
});

const resume = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/resume/' }),
	schema: z.object({
		locale: z.enum(locales),
		identity: z.object({
			name: z.string(),
			jobTitle: z.string(),
			email: z.email(),
			downloadUrl: z.string(),
		}),
		meta: z.object({ title: z.string(), description: z.string() }),
		eyebrow: z.string(),
		title: z.string(),
		download: z.string(),
		contact: z.string(),
		navigationLabel: z.string(),
		navigation: z.object({
			experience: z.string(),
			skills: z.string(),
			education: z.string(),
		}),
		experienceEyebrow: z.string(),
		experienceTitle: z.string(),
		experiences: z.array(experienceSchema),
		skillsEyebrow: z.string(),
		skillsTitle: z.string(),
		skillsIntro: z.string(),
		skills: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
		projectProof: z.object({
			eyebrow: z.string(),
			title: z.string(),
			text: z.string(),
			cta: z.string(),
			stack: z.array(z.string()),
			url: z.string(),
		}),
		educationEyebrow: z.string(),
		educationTitle: z.string(),
		education: z.object({ school: z.string(), period: z.string(), detail: z.string() }),
		languagesTitle: z.string(),
		languages: z.array(z.string()),
		closingTitle: z.string(),
		closingText: z.string(),
		stackLabel: z.string(),
		progressLabel: z.string(),
	}),
});

export const collections = { projects, resume };

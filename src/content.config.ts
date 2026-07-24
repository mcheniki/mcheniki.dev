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
			role: z.string().optional(),
			mission: z.string().optional(),
		}),
});

export const collections = { projects };

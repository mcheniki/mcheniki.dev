import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { ecoKwaCaseStudy } from '../data/case-studies/ecokwa';
import { restMoneyCaseStudy } from '../data/case-studies/restmoney';
import type { Locale } from '../i18n/config';

/** Case studies with a page of their own; their `route` is the project slug. */
export const caseStudies = [ecoKwaCaseStudy, restMoneyCaseStudy];

export interface PublishedDocument {
	/** Project slug, or the page name for home and resume. */
	name: string;
	content: string;
}

/** The published portfolio content in one locale, as plain text for the prompt. */
export interface PublishedContent {
	home: string;
	resume: string;
	projects: PublishedDocument[];
	caseStudies: PublishedDocument[];
}

function contentPath(contentDir?: string) {
	return contentDir ?? resolve(process.cwd(), 'src/content');
}

/** Project slugs: one folder per project in `src/content/projects/`. */
export function listProjectSlugs(contentDir?: string): string[] {
	return readdirSync(join(contentPath(contentDir), 'projects'), { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();
}

/**
 * Reads the published content in the page locale only. The Markdown files are sent as written
 * (frontmatter included): `astro:content` is unavailable outside Astro.
 */
export function loadPublishedContent(locale: Locale, contentDir?: string): PublishedContent {
	const root = contentPath(contentDir);
	const read = (...segments: string[]) => readFileSync(join(root, ...segments), 'utf8').trim();

	return {
		home: read('home', `${locale}.md`),
		resume: read('resume', `${locale}.md`),
		projects: listProjectSlugs(root).map((slug) => ({
			name: slug,
			content: read('projects', slug, `${locale}.md`),
		})),
		caseStudies: caseStudies.map((caseStudy) => ({
			name: caseStudy.route,
			content: JSON.stringify(
				{
					applicationUrl: caseStudy.applicationUrl,
					stack: caseStudy.stack,
					...caseStudy.content[locale],
				},
				null,
				2,
			),
		})),
	};
}

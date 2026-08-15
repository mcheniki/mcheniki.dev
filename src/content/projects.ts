import type { CollectionEntry } from 'astro:content';
import { locales, type Locale } from '../i18n/config';

type ProjectEntry = CollectionEntry<'projects'>;

const requiredLocales = locales;

function haveSameStack(first: string[], second: string[]) {
	return (
		first.length === second.length &&
		first.every((technology, index) => technology === second[index])
	);
}

/**
 * Ensures every project has exactly one French and English entry and that the
 * shared metadata stays identical across both translations.
 */
export function validateProjectTranslations(projects: readonly ProjectEntry[]) {
	const projectsByTranslationKey = new Map<string, Map<Locale, ProjectEntry>>();
	const errors: string[] = [];

	for (const project of projects) {
		const { translationKey, locale } = project.data;
		const translations =
			projectsByTranslationKey.get(translationKey) ?? new Map<Locale, ProjectEntry>();

		if (translations.has(locale)) {
			errors.push(`Duplicate ${locale} translation for project "${translationKey}".`);
		}

		translations.set(locale, project);
		projectsByTranslationKey.set(translationKey, translations);
	}

	for (const [translationKey, translations] of projectsByTranslationKey) {
		for (const locale of requiredLocales) {
			if (!translations.has(locale)) {
				errors.push(`Missing ${locale} translation for project "${translationKey}".`);
			}
		}

		const frenchProject = translations.get('fr');
		const englishProject = translations.get('en');

		if (!frenchProject || !englishProject) continue;

		const french = frenchProject.data;
		const english = englishProject.data;
		const divergentFields = [
			...(french.order !== english.order ? ['order'] : []),
			...(french.url !== english.url ? ['url'] : []),
			...(french.projectType !== english.projectType ? ['projectType'] : []),
			...(french.image.src !== english.image.src ? ['image'] : []),
			...(!haveSameStack(french.stack, english.stack) ? ['stack'] : []),
		];

		if (divergentFields.length > 0) {
			errors.push(
				`Translations for project "${translationKey}" diverge on: ${divergentFields.join(', ')}.`,
			);
		}
	}

	if (errors.length > 0) {
		throw new Error(`Invalid project translations:\n- ${errors.join('\n- ')}`);
	}
}

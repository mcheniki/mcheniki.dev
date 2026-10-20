import type { Locale } from '../i18n/config';
import { routePaths } from '../i18n/routes';
import { caseStudies } from './content';
import type { Proof } from './schema';

/**
 * Builds the Proof URL of each cited project in the page locale: the case study page when one
 * exists, otherwise the project drawer on the home page. Unknown slugs are dropped.
 */
export function buildProofs(
	slugs: readonly string[],
	locale: Locale,
	projectSlugs: readonly string[],
): Proof[] {
	const known = [...new Set(slugs)].filter((slug) => projectSlugs.includes(slug));

	return known.map((slug) => {
		const caseStudy = caseStudies.find(({ route }) => route === slug);
		const url = caseStudy
			? routePaths[locale][caseStudy.route]
			: `${routePaths[locale].home}#${slug}`;
		return { slug, url };
	});
}

import type { Locale } from './config';

/**
 * Projects with a case study page. A case study route id is the project slug (its
 * `translationKey`); every other case study list derives from this one.
 */
export const caseStudyRouteIds = ['ecokwa', 'restmoney'] as const;
export const routeIds = ['home', 'resume', ...caseStudyRouteIds] as const;

export type RouteId = (typeof routeIds)[number];
export type CaseStudyRouteId = (typeof caseStudyRouteIds)[number];

export function isCaseStudyRouteId(slug: string): slug is CaseStudyRouteId {
	return (caseStudyRouteIds as readonly string[]).includes(slug);
}

function caseStudyPaths(prefix: string) {
	return Object.fromEntries(caseStudyRouteIds.map((id) => [id, `${prefix}${id}/`])) as Record<
		CaseStudyRouteId,
		string
	>;
}

export const routePaths = {
	fr: { home: '/', resume: '/parcours/', ...caseStudyPaths('/projets/') },
	en: { home: '/en/', resume: '/en/resume/', ...caseStudyPaths('/en/projects/') },
} as const satisfies Record<Locale, Record<RouteId, string>>;

export function getRoutePath(locale: Locale, route: RouteId) {
	return routePaths[locale][route];
}

export function getAlternateRoutePath(locale: Locale, route: RouteId) {
	const alternateLocale = locale === 'fr' ? 'en' : 'fr';
	return getRoutePath(alternateLocale, route);
}

export function getRouteIdFromPath(pathname: string): RouteId | undefined {
	const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;

	for (const locale of ['fr', 'en'] as const) {
		for (const route of routeIds) {
			if (getRoutePath(locale, route) === normalizedPath) return route;
		}
	}
}

const legacyRoutePaths = {
	'/resume/': getRoutePath('fr', 'resume'),
	'/projects/ecokwa/': getRoutePath('fr', 'ecokwa'),
	'/projects/restmoney/': getRoutePath('fr', 'restmoney'),
} as const;

export function getLegacyRoutePath(pathname: string) {
	const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
	return legacyRoutePaths[normalizedPath as keyof typeof legacyRoutePaths];
}

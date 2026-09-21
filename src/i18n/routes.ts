import type { Locale } from './config';

export const routeIds = ['home', 'resume', 'ecokwa', 'restmoney'] as const;
export const caseStudyRouteIds = ['ecokwa', 'restmoney'] as const;

export type RouteId = (typeof routeIds)[number];
export type CaseStudyRouteId = (typeof caseStudyRouteIds)[number];

export const routePaths = {
	fr: {
		home: '/',
		resume: '/parcours/',
		ecokwa: '/projets/ecokwa/',
		restmoney: '/projets/restmoney/',
	},
	en: {
		home: '/en/',
		resume: '/en/resume/',
		ecokwa: '/en/projects/ecokwa/',
		restmoney: '/en/projects/restmoney/',
	},
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

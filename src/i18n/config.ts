export const locales = ['fr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeMetadata: Record<
	Locale,
	{
		label: string;
		html: Locale;
		hreflang: Locale;
		openGraph: string;
	}
> = {
	fr: {
		label: 'Français',
		html: 'fr',
		hreflang: 'fr',
		openGraph: 'fr_FR',
	},
	en: {
		label: 'English',
		html: 'en',
		hreflang: 'en',
		openGraph: 'en_US',
	},
};

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getLocale(value: unknown): Locale {
	return isLocale(value) ? value : defaultLocale;
}

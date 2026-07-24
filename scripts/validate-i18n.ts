import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { getTranslationParityErrors } from '../src/i18n/ui';

const clientDirectory = path.resolve('dist/client');
const projectDirectory = path.resolve('src/content/projects');
const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];
type ProjectMetadata = Record<
	'translationKey' | 'locale' | 'image' | 'url' | 'order' | 'stack',
	string
>;

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) throw new Error(message);
}

async function getProjectFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const entryPath = path.join(directory, entry.name);
			return entry.isDirectory()
				? getProjectFiles(entryPath)
				: entry.isFile() && entry.name.endsWith('.md')
					? [entryPath]
					: [];
		}),
	);

	return files.flat();
}

function readFrontmatterValue(frontmatter: string, field: keyof ProjectMetadata) {
	const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
	assert(match, `Missing ${field} in project frontmatter.`);
	return match[1].trim().replace(/^['"]|['"]$/g, '');
}

async function validateProjectParity() {
	const projectsByKey = new Map<string, Map<Locale, ProjectMetadata>>();
	const projectFiles = await getProjectFiles(projectDirectory);

	for (const projectFile of projectFiles) {
		const source = await readFile(projectFile, 'utf8');
		const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
		assert(frontmatter, `Missing frontmatter in ${projectFile}.`);

		const project = Object.fromEntries(
			(['translationKey', 'locale', 'image', 'url', 'order', 'stack'] as const).map(
				(field) => [field, readFrontmatterValue(frontmatter[1], field)],
			),
		) as ProjectMetadata;
		assert(locales.includes(project.locale as Locale), `Invalid locale in ${projectFile}.`);

		const translations =
			projectsByKey.get(project.translationKey) ?? new Map<Locale, ProjectMetadata>();
		assert(
			!translations.has(project.locale as Locale),
			`Duplicate ${project.locale} translation for ${project.translationKey}.`,
		);
		translations.set(project.locale as Locale, project);
		projectsByKey.set(project.translationKey, translations);
	}

	assert(
		projectsByKey.size === 4,
		`Expected four project translation groups, found ${projectsByKey.size}.`,
	);

	for (const [translationKey, translations] of projectsByKey) {
		for (const locale of locales) {
			assert(
				translations.has(locale),
				`Missing ${locale} translation for ${translationKey}.`,
			);
		}

		const [french, english] = [translations.get('fr')!, translations.get('en')!];
		for (const field of ['image', 'url', 'order', 'stack'] as const) {
			assert(
				french[field] === english[field],
				`Project translations for ${translationKey} diverge on ${field}.`,
			);
		}
	}
}

function getAttribute(tag: string, attribute: string) {
	return tag.match(new RegExp(`\\b${attribute}="([^"]+)"`))?.[1];
}

function validateProductionPage(html: string, locale: Locale, expectedPath: string) {
	assert(
		getAttribute(html.match(/<html\b[^>]*>/)?.[0] ?? '', 'lang') === locale,
		`Incorrect lang for ${expectedPath}.`,
	);

	const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/)?.[0];
	const canonical = getAttribute(canonicalTag ?? '', 'href');
	assert(
		canonical && new URL(canonical).pathname === expectedPath,
		`Incorrect canonical for ${expectedPath}.`,
	);
	const contactLink = `<a href="${expectedPath}#contact"`;
	assert(html.includes(contactLink), `Incorrect contact CTA for ${expectedPath}.`);

	const openGraphLocale = locale === 'fr' ? 'fr_FR' : 'en_US';
	assert(
		html.includes(`<meta property="og:locale" content="${openGraphLocale}">`),
		`Incorrect Open Graph locale for ${expectedPath}.`,
	);
	assert(
		html.includes(`locale&quot;:[0,&quot;${locale}&quot;]`),
		`The Turnstile locale is not serialized for ${expectedPath}.`,
	);

	const alternateTags = html.match(/<link\b[^>]*\brel="alternate"[^>]*>/g) ?? [];
	assert(
		!html.includes('hreflang="x-default"'),
		`Unexpected x-default alternate for ${expectedPath}.`,
	);
	for (const targetLocale of locales) {
		const alternate = alternateTags.find(
			(tag) => getAttribute(tag, 'hreflang') === targetLocale,
		);
		const expectedAlternatePath = targetLocale === 'fr' ? '/' : '/en/';
		assert(
			alternate &&
				new URL(getAttribute(alternate, 'href')!).pathname === expectedAlternatePath,
			`Missing reciprocal ${targetLocale} alternate for ${expectedPath}.`,
		);
	}

	const projectCards = html.match(/class="[^"]*\bproject-card\b[^"]*"/g) ?? [];
	assert(
		projectCards.length === 4,
		`Expected four project cards for ${expectedPath}, found ${projectCards.length}.`,
	);
}

async function main() {
	const [frenchPage, englishPage, sitemap] = await Promise.all([
		readFile(path.join(clientDirectory, 'index.html'), 'utf8'),
		readFile(path.join(clientDirectory, 'en/index.html'), 'utf8'),
		readFile(path.join(clientDirectory, 'sitemap-0.xml'), 'utf8'),
	]);

	validateProductionPage(frenchPage, 'fr', '/');
	validateProductionPage(englishPage, 'en', '/en/');
	assert(!sitemap.includes('/fr/'), 'The sitemap must not contain /fr/.');
	assert(
		sitemap.includes('https://mcheniki.dev/') && sitemap.includes('https://mcheniki.dev/en/'),
		'The sitemap is missing a localized home URL.',
	);

	const translationErrors = getTranslationParityErrors();
	assert(translationErrors.length === 0, translationErrors.join('\n'));
	await validateProjectParity();

	console.log('i18n validation passed.');
}

await main();

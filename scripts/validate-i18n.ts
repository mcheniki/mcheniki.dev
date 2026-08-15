import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { getTranslationParityErrors } from '../src/i18n/ui';

const clientDirectory = path.resolve('dist/client');
const projectDirectory = path.resolve('src/content/projects');
const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];
type ProjectMetadata = Record<'translationKey' | 'locale' | 'image' | 'order' | 'stack', string> &
	Partial<Record<'url' | 'projectType', string>>;

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

function readOptionalFrontmatterValue(frontmatter: string, field: keyof ProjectMetadata) {
	const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
	return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

async function validateProjectParity() {
	const projectsByKey = new Map<string, Map<Locale, ProjectMetadata>>();
	const projectFiles = await getProjectFiles(projectDirectory);

	for (const projectFile of projectFiles) {
		const source = await readFile(projectFile, 'utf8');
		const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
		assert(frontmatter, `Missing frontmatter in ${projectFile}.`);

		const project = {
			...Object.fromEntries(
				(['translationKey', 'locale', 'image', 'order', 'stack'] as const).map((field) => [
					field,
					readFrontmatterValue(frontmatter[1], field),
				]),
			),
			url: readOptionalFrontmatterValue(frontmatter[1], 'url'),
			projectType:
				readOptionalFrontmatterValue(frontmatter[1], 'projectType') ?? 'professional',
		} as ProjectMetadata;
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
		projectsByKey.size === 7,
		`Expected seven project translation groups, found ${projectsByKey.size}.`,
	);

	for (const [translationKey, translations] of projectsByKey) {
		for (const locale of locales) {
			assert(
				translations.has(locale),
				`Missing ${locale} translation for ${translationKey}.`,
			);
		}

		const [french, english] = [translations.get('fr')!, translations.get('en')!];
		for (const field of ['image', 'url', 'order', 'stack', 'projectType'] as const) {
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
		projectCards.length === 7,
		`Expected seven project cards for ${expectedPath}, found ${projectCards.length}.`,
	);
	const personalGroupStart = html.indexOf('data-project-group="personal"');
	const personalGroupEnd = html.indexOf('</section>', personalGroupStart);
	const personalGroup = html.slice(personalGroupStart, personalGroupEnd);
	assert(
		personalGroupStart >= 0 && personalGroup.includes('data-project-id="ecokwa"'),
		`The EcoKwa card is missing from the personal project group for ${expectedPath}.`,
	);
	const ecokwaTemplateStart = html.indexOf('<template data-project-id="ecokwa">');
	const ecokwaTemplateEnd = html.indexOf('</template>', ecokwaTemplateStart);
	const ecokwaTemplate = html.slice(ecokwaTemplateStart, ecokwaTemplateEnd);
	assert(
		ecokwaTemplate.includes('href="https://ecokwa.mcheniki.dev"') &&
			ecokwaTemplate.includes(
				`href="${locale === 'fr' ? '/projects/ecokwa/' : '/en/projects/ecokwa/'}"`,
			),
		`The EcoKwa drawer CTAs are incomplete for ${expectedPath}.`,
	);
	const expectedCaseStudyLabel = locale === 'fr' ? 'Voir la fiche complète' : 'View case study';
	const expectedApplicationLabel = locale === 'fr' ? 'Ouvrir l’application' : 'Open application';
	assert(
		ecokwaTemplate.includes(expectedCaseStudyLabel) &&
			ecokwaTemplate.includes(expectedApplicationLabel),
		`The EcoKwa drawer CTA labels are ambiguous for ${expectedPath}.`,
	);
}

function validateCaseStudy(html: string, locale: Locale, expectedPath: string) {
	assert(
		getAttribute(html.match(/<html\b[^>]*>/)?.[0] ?? '', 'lang') === locale,
		`Incorrect case study lang for ${expectedPath}.`,
	);

	const canonicalTag = html.match(/<link\b[^>]*\brel="canonical"[^>]*>/)?.[0];
	const canonical = getAttribute(canonicalTag ?? '', 'href');
	assert(
		canonical && new URL(canonical).pathname === expectedPath,
		`Incorrect case study canonical for ${expectedPath}.`,
	);
	assert(
		html.includes('href="https://ecokwa.mcheniki.dev"') &&
			html.includes('ecokwa-indicator') &&
			html.includes('ecokwa-comparison'),
		`The EcoKwa case study is missing its application CTA or supporting captures for ${expectedPath}.`,
	);
}

async function main() {
	const [frenchPage, englishPage, frenchCaseStudy, englishCaseStudy, sitemap] = await Promise.all(
		[
			readFile(path.join(clientDirectory, 'index.html'), 'utf8'),
			readFile(path.join(clientDirectory, 'en/index.html'), 'utf8'),
			readFile(path.join(clientDirectory, 'projects/ecokwa/index.html'), 'utf8'),
			readFile(path.join(clientDirectory, 'en/projects/ecokwa/index.html'), 'utf8'),
			readFile(path.join(clientDirectory, 'sitemap-0.xml'), 'utf8'),
		],
	);

	validateProductionPage(frenchPage, 'fr', '/');
	validateProductionPage(englishPage, 'en', '/en/');
	validateCaseStudy(frenchCaseStudy, 'fr', '/projects/ecokwa/');
	validateCaseStudy(englishCaseStudy, 'en', '/en/projects/ecokwa/');
	assert(!sitemap.includes('/fr/'), 'The sitemap must not contain /fr/.');
	assert(
		sitemap.includes('https://mcheniki.dev/') &&
			sitemap.includes('https://mcheniki.dev/en/') &&
			sitemap.includes('https://mcheniki.dev/projects/ecokwa/') &&
			sitemap.includes('https://mcheniki.dev/en/projects/ecokwa/'),
		'The sitemap is missing a localized home or EcoKwa URL.',
	);

	const translationErrors = getTranslationParityErrors();
	assert(translationErrors.length === 0, translationErrors.join('\n'));
	await validateProjectParity();

	console.log('i18n validation passed.');
}

await main();

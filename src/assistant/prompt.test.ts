import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { ecoKwaCaseStudy } from '../data/case-studies/ecokwa';
import type { Locale } from '../i18n/config';
import { listProjectSlugs, loadPublishedContent } from './content';
import { buildPrompt } from './prompt';
import { createAskInputSchema } from './schema';

let contentDir: string;

beforeAll(() => {
	contentDir = mkdtempSync(join(tmpdir(), 'assistant-content-'));
	const write = (path: string, text: string) => {
		mkdirSync(join(contentDir, path, '..'), { recursive: true });
		writeFileSync(join(contentDir, path), text);
	};
	for (const locale of ['fr', 'en'] as const) {
		write(`home/${locale}.md`, `home page in ${locale}`);
		write(`resume/${locale}.md`, `resume page in ${locale}`);
		write(`projects/redbox/${locale}.md`, `Redbox project in ${locale}`);
		write(`projects/azoria/${locale}.md`, `Azoria project in ${locale}`);
	}
});

afterAll(() => rmSync(contentDir, { recursive: true, force: true }));

const knowledge = {
	reportedFacts: [{ file: 'projects/redbox.md', content: 'Il encadrait deux développeurs.' }],
	guidanceNotes: 'Never call him a CTO.',
};

function promptFor(
	input: Record<string, unknown>,
	{ locale = 'en' as Locale, availability = '' } = {},
) {
	const projectSlugs = listProjectSlugs(contentDir);
	return buildPrompt({
		input: createAskInputSchema(projectSlugs).parse({ locale, ...input }),
		published: loadPublishedContent(locale, contentDir),
		knowledge,
		projectSlugs,
		availability,
	});
}

const systemText = (prompt: ReturnType<typeof promptFor>) =>
	prompt.system.map((block) => block.text).join('\n');

describe('buildPrompt', () => {
	test('sends the published content in the page locale only', () => {
		const english = systemText(promptFor({ question: 'Quels projets ?' }, { locale: 'en' }));

		expect(english).toContain('home page in en');
		expect(english).toContain('resume page in en');
		expect(english).toContain('Redbox project in en');
		expect(english).toContain(ecoKwaCaseStudy.content.en.intro);
		expect(english).not.toContain('home page in fr');
		expect(english).not.toContain('Redbox project in fr');
		expect(english).not.toContain(ecoKwaCaseStudy.content.fr.intro);

		const french = systemText(promptFor({ question: 'Which projects?' }, { locale: 'fr' }));
		expect(french).toContain('Redbox project in fr');
		expect(french).not.toContain('Redbox project in en');
	});

	test('includes the Reported facts and the Guidance notes', () => {
		const text = systemText(promptFor({ question: 'Has he led a team?' }));

		expect(text).toContain('Il encadrait deux développeurs.');
		expect(text).toContain('projects/redbox.md');
		expect(text).toContain('Never call him a CTO.');
	});

	test('includes the declared availability, or says it is not declared', () => {
		const declared = systemText(
			promptFor({ question: 'Is he available?' }, { availability: 'From January 2027' }),
		);
		expect(declared).toContain('From January 2027');

		const undeclared = systemText(promptFor({ question: 'Is he available?' }));
		expect(undeclared).not.toContain('From January 2027');
		expect(undeclared).toContain('has not declared his availability');
	});

	test('lists the published project slugs the model may cite', () => {
		expect(systemText(promptFor({ question: 'Hello?' }))).toContain(
			'Allowed slugs: azoria, redbox.',
		);
	});

	test('keeps the stable system prompt cacheable and the question out of it', () => {
		const prompt = promptFor({ question: 'Has he led a team?', focus: 'redbox' });

		expect(prompt.system.at(-1)?.cache_control).toEqual({ type: 'ephemeral' });
		expect(systemText(prompt)).not.toContain('Has he led a team?');
		expect(systemText(prompt)).not.toContain('<focus');
	});

	test('adds the Focus hint to the question only when a Focus is given', () => {
		const focused = promptFor({ question: 'Has he led a team?', focus: 'redbox' });
		expect(focused.messages).toEqual([
			{
				role: 'user',
				content: '<focus project="redbox" />\n<question>\nHas he led a team?\n</question>',
			},
		]);

		const general = promptFor({ question: 'Has he led a team?' });
		expect(general.messages).toEqual([
			{ role: 'user', content: '<question>\nHas he led a team?\n</question>' },
		]);
	});

	test('replays prior turns before the new question', () => {
		const prompt = promptFor({
			question: 'And in a team?',
			focus: 'redbox',
			history: [{ question: 'What did he build?', answer: 'A starter theme.' }],
		});

		expect(prompt.messages.map(({ role }) => role)).toEqual(['user', 'assistant', 'user']);
		expect(prompt.messages[0].content).toContain('What did he build?');
		expect(prompt.messages[0].content).not.toContain('<focus');
		expect(prompt.messages[1].content).toBe('A starter theme.');
		expect(prompt.messages[2].content).toContain('And in a team?');
	});
});

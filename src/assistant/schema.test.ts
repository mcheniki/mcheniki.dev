import { describe, expect, test } from 'bun:test';

import { createAskInputSchema } from './schema';

const schema = createAskInputSchema(['ecokwa', 'redbox']);

function errorPaths(input: unknown) {
	const result = schema.safeParse(input);
	return result.success ? [] : result.error.issues.map((issue) => issue.path.join('.'));
}

describe('ask input', () => {
	test('accepts a question with a known Focus and a prior turn', () => {
		const result = schema.parse({
			question: '  And in a team?  ',
			locale: 'en',
			focus: 'ecokwa',
			history: [{ question: 'What is EcoKwa?', answer: 'A public data application.' }],
		});

		expect(result.question).toBe('And in a team?');
		expect(result.focus).toBe('ecokwa');
		expect(result.history).toHaveLength(1);
	});

	test('rejects an empty or blank question', () => {
		expect(errorPaths({ question: '', locale: 'fr' })).toEqual(['question']);
		expect(errorPaths({ question: '   \n', locale: 'fr' })).toEqual(['question']);
	});

	test('rejects an unsupported or missing locale', () => {
		expect(errorPaths({ question: 'Hello?', locale: 'de' })).toEqual(['locale']);
		expect(errorPaths({ question: 'Hello?' })).toEqual(['locale']);
	});

	test('rejects a Focus that is not a published project', () => {
		expect(errorPaths({ question: 'Hello?', locale: 'fr', focus: 'unknown' })).toEqual([
			'focus',
		]);
	});
});

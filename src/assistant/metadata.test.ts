import { describe, expect, test } from 'bun:test';

import { METADATA_DELIMITER, createAnswerSplitter, parseAnswerMetadata } from './metadata';
import type { AnswerMetadata } from './schema';

const metadata: AnswerMetadata = {
	coverage: 'complete',
	projects: ['redbox'],
	loggedQuestion: 'Has Mehdi led a team?',
	followUps: ['What did he build at Redbox Media?', 'Which stacks does he use?'],
};

function split(chunks: string[]) {
	const splitter = createAnswerSplitter();
	const streamed = chunks.map((chunk) => splitter.push(chunk)).join('');
	return { streamed, ...splitter.finish() };
}

describe('createAnswerSplitter', () => {
	test('streams only the text before a delimiter split across chunks', () => {
		const json = JSON.stringify(metadata);
		const {
			streamed,
			answer,
			metadata: raw,
		} = split([
			'He led a ',
			'team.\n<<<META',
			'DA',
			'TA>>>\n',
			json.slice(0, 10),
			json.slice(10),
		]);

		expect(streamed).toBe('He led a team.\n');
		expect(answer).toBe('He led a team.');
		expect(parseAnswerMetadata(raw!)).toEqual(metadata);
	});

	test('releases held text that turns out not to be the delimiter', () => {
		const { streamed, answer } = split([
			'Compare a <<<',
			'b and ',
			`c.\n${METADATA_DELIMITER}{}`,
		]);

		expect(streamed).toBe('Compare a <<<b and c.\n');
		expect(answer).toBe('Compare a <<<b and c.');
	});

	test('reports a missing metadata block and keeps the whole text', () => {
		const { streamed, answer, metadata: raw } = split(['No metadata <<<', 'META']);

		expect(streamed).toBe('No metadata ');
		expect(answer).toBe('No metadata <<<META');
		expect(raw).toBeUndefined();
	});
});

describe('parseAnswerMetadata', () => {
	test('accepts JSON wrapped in a Markdown code fence', () => {
		const raw = `\n\`\`\`json\n${JSON.stringify(metadata)}\n\`\`\`\n`;

		expect(parseAnswerMetadata(raw)).toEqual(metadata);
	});

	test('rejects an unknown Coverage', () => {
		expect(() =>
			parseAnswerMetadata(JSON.stringify({ ...metadata, coverage: 'maybe' })),
		).toThrow(/coverage/);
	});

	test('rejects fewer than two suggested follow-ups', () => {
		expect(() =>
			parseAnswerMetadata(JSON.stringify({ ...metadata, followUps: ['Only one?'] })),
		).toThrow(/followUps/);
	});
});

/**
 * Asks the Assistant a question from the terminal and streams the answer.
 *
 * bun run assistant:ask "<question>" --locale fr|en [--focus <project-slug>]
 *     [--history <file.json>] [--model <id>] [--effort low|medium|high|xhigh|max]
 *
 * The history file holds the earlier turns: [{ "question": "...", "answer": "..." }].
 */
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

import {
	AssistantResponseError,
	DEFAULT_EFFORT,
	DEFAULT_MODEL,
	askAssistant,
	type Effort,
} from '../src/assistant/ask';
import { listProjectSlugs } from '../src/assistant/content';
import { createAskInputSchema, type AnswerResult } from '../src/assistant/schema';

const efforts = ['low', 'medium', 'high', 'xhigh', 'max'] as const satisfies Effort[];

class UsageError extends Error {}

function readHistory(path: string | undefined): unknown {
	if (!path) return undefined;
	try {
		return JSON.parse(readFileSync(path, 'utf8'));
	} catch (error) {
		throw new UsageError(`Cannot read the history file ${path}: ${(error as Error).message}`);
	}
}

function parseCommandLine() {
	let parsed;
	try {
		parsed = parseArgs({
			allowPositionals: true,
			options: {
				locale: { type: 'string' },
				focus: { type: 'string' },
				history: { type: 'string' },
				model: { type: 'string' },
				effort: { type: 'string' },
			},
		});
	} catch (error) {
		throw new UsageError((error as Error).message);
	}
	const { values, positionals } = parsed;

	const inputResult = createAskInputSchema(listProjectSlugs()).safeParse({
		question: positionals.join(' '),
		locale: values.locale,
		focus: values.focus,
		history: readHistory(values.history),
	});
	if (!inputResult.success) throw new UsageError(z.prettifyError(inputResult.error));

	const effort = values.effort || process.env.ASSISTANT_EFFORT || DEFAULT_EFFORT;
	if (!(efforts as readonly string[]).includes(effort)) {
		throw new UsageError(`Unsupported effort. Expected one of: ${efforts.join(', ')}.`);
	}

	return {
		input: inputResult.data,
		model: values.model || process.env.ASSISTANT_MODEL || DEFAULT_MODEL,
		effort: effort as Effort,
	};
}

function printMetadata(result: AnswerResult) {
	const lines = [
		'',
		'---',
		`Coverage: ${result.coverage}`,
		`Projects: ${result.projects.join(', ') || '(none)'}`,
		'Proofs:',
		...(result.proofs.length
			? result.proofs.map(({ slug, url }) => `  - ${slug}: ${url}`)
			: ['  (none)']),
		`Logged question: ${result.loggedQuestion}`,
		'Follow-ups:',
		...result.followUps.map((question) => `  - ${question}`),
	];
	console.log(lines.join('\n'));
}

async function main() {
	const { input, model, effort } = parseCommandLine();

	const apiKey = process.env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		throw new UsageError('ANTHROPIC_API_KEY is not set. Add it to .env.local.');
	}

	console.error(`Model: ${model}, effort: ${effort}\n`);
	const result = await askAssistant(input, {
		client: new Anthropic({ apiKey }),
		model,
		effort,
		availability: process.env.ASSISTANT_AVAILABILITY ?? '',
		onText: (text) => process.stdout.write(text),
	});
	printMetadata(result);
}

main().catch((error: unknown) => {
	if (error instanceof UsageError || error instanceof AssistantResponseError) {
		console.error(`\nError: ${error.message}`);
	} else if (error instanceof Anthropic.AuthenticationError) {
		console.error('\nError: the API key was rejected (401). Check ANTHROPIC_API_KEY.');
	} else if (error instanceof Anthropic.RateLimitError) {
		console.error('\nError: rate limited by the API (429). Try again later.');
	} else if (error instanceof Anthropic.APIError) {
		console.error(`\nError: API error ${error.status ?? ''}: ${error.message}`);
	} else if (error instanceof z.ZodError) {
		console.error(`\nError: invalid metadata from the model:\n${z.prettifyError(error)}`);
	} else {
		console.error(error);
	}
	process.exit(1);
});

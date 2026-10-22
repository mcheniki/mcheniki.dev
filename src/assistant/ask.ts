import type Anthropic from '@anthropic-ai/sdk';

import { loadKnowledge } from '../knowledge/load';
import { listProjectSlugs, loadPublishedContent } from './content';
import { createAnswerSplitter, parseAnswerMetadata } from './metadata';
import { buildPrompt } from './prompt';
import { buildProofs } from './proofs';
import { answerResultSchema, type AnswerResult, type AskInput } from './schema';

export type Effort = NonNullable<Anthropic.OutputConfig['effort']>;

export const DEFAULT_MODEL = 'claude-haiku-5-5';
export const DEFAULT_EFFORT: Effort = 'low';

/** The model stopped or answered in a way the Assistant cannot use. */
export class AssistantResponseError extends Error {}

export interface AskOptions {
	client: Anthropic;
	model: string;
	effort: Effort;
	availability: string;
	/** Receives the answer text as it streams, without the metadata. */
	onText: (text: string) => void;
}

/** Server-only: answers a validated question, streaming its text, then returns its metadata. */
export async function askAssistant(input: AskInput, options: AskOptions): Promise<AnswerResult> {
	const projectSlugs = listProjectSlugs();
	const prompt = buildPrompt({
		input,
		published: loadPublishedContent(input.locale),
		knowledge: loadKnowledge(),
		projectSlugs,
		availability: options.availability,
	});

	const stream = options.client.messages.stream({
		model: options.model,
		max_tokens: 8000,
		output_config: { effort: options.effort },
		system: prompt.system,
		messages: prompt.messages,
	});

	const splitter = createAnswerSplitter();
	for await (const event of stream) {
		if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
			const text = splitter.push(event.delta.text);
			if (text) options.onText(text);
		}
	}

	const message = await stream.finalMessage();
	if (message.stop_reason !== 'end_turn') {
		throw new AssistantResponseError(`The model stopped early (${message.stop_reason}).`);
	}

	const { answer, metadata } = splitter.finish();
	if (metadata === undefined) {
		throw new AssistantResponseError('The model did not write the metadata block.');
	}

	const parsed = parseAnswerMetadata(metadata);
	const proofs = buildProofs(parsed.projects, input.locale, projectSlugs);
	return answerResultSchema.parse({
		...parsed,
		projects: proofs.map(({ slug }) => slug),
		answer,
		proofs,
	});
}

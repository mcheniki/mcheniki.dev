import { answerMetadataSchema, type AnswerMetadata } from './schema';

/** The line the model writes between the answer text and the JSON metadata object. */
export const METADATA_DELIMITER = '<<<METADATA>>>';

/**
 * Separates the streamed answer text from the metadata that follows the delimiter. `push`
 * returns the text that can be shown now; it holds back a chunk tail that could be the start of
 * a delimiter split across chunks.
 */
export function createAnswerSplitter(delimiter = METADATA_DELIMITER) {
	let pending = '';
	let answer = '';
	let metadata: string | undefined;

	function emit(text: string) {
		answer += text;
		return text;
	}

	return {
		push(chunk: string): string {
			if (metadata !== undefined) {
				metadata += chunk;
				return '';
			}

			pending += chunk;
			const index = pending.indexOf(delimiter);
			if (index !== -1) {
				metadata = pending.slice(index + delimiter.length);
				const text = pending.slice(0, index);
				pending = '';
				return emit(text);
			}

			let held = Math.min(pending.length, delimiter.length - 1);
			while (held > 0 && !pending.endsWith(delimiter.slice(0, held))) held--;
			const text = pending.slice(0, pending.length - held);
			pending = pending.slice(pending.length - held);
			return emit(text);
		},

		/** The full answer text, and the raw metadata (`undefined` when no delimiter came). */
		finish(): { answer: string; metadata: string | undefined } {
			if (metadata === undefined) emit(pending);
			pending = '';
			return { answer: answer.trim(), metadata };
		},
	};
}

/** Parses and validates the metadata JSON, tolerating a Markdown code fence around it. */
export function parseAnswerMetadata(raw: string): AnswerMetadata {
	const json = raw
		.trim()
		.replace(/^```(?:json)?\s*/, '')
		.replace(/\s*```$/, '');
	return answerMetadataSchema.parse(JSON.parse(json));
}

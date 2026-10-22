import { z } from 'zod';

import { locales } from '../i18n/config';

export const coverageValues = ['complete', 'partial', 'none', 'reserved', 'declined'] as const;

export type Coverage = (typeof coverageValues)[number];

/** One earlier exchange of the conversation, as sent back by the client. */
export const turnSchema = z.object({
	question: z.string().trim().min(1),
	answer: z.string().trim().min(1),
});

/** A Visitor's question. `projectSlugs` lists the projects a Focus may name. */
export function createAskInputSchema(projectSlugs: readonly string[]) {
	return z.object({
		question: z.string().trim().min(1, { message: 'The question is empty.' }),
		locale: z.enum(locales, {
			message: `Unsupported locale. Expected one of: ${locales.join(', ')}.`,
		}),
		focus: z
			.string()
			.refine((slug) => projectSlugs.includes(slug), {
				message: `Unknown Focus project. Expected one of: ${projectSlugs.join(', ')}.`,
			})
			.optional(),
		history: z.array(turnSchema).default([]),
	});
}

export type AskInput = z.output<ReturnType<typeof createAskInputSchema>>;

/** The metadata block the model writes after the answer text. */
export const answerMetadataSchema = z.object({
	coverage: z.enum(coverageValues),
	projects: z.array(z.string()),
	loggedQuestion: z.string().trim().min(1),
	followUps: z.array(z.string().trim().min(1)).min(2).max(3),
});

export type AnswerMetadata = z.output<typeof answerMetadataSchema>;

export const proofSchema = z.object({
	slug: z.string(),
	url: z.string(),
});

export type Proof = z.output<typeof proofSchema>;

/** What the Assistant returns once the answer text has been streamed. */
export const answerResultSchema = answerMetadataSchema.extend({
	answer: z.string(),
	proofs: z.array(proofSchema),
});

export type AnswerResult = z.output<typeof answerResultSchema>;

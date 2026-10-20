import type { AstroIntegration } from 'astro';
import { loadKnowledge } from './load';

/** Fails `astro build` when the knowledge base cannot be loaded. `astro dev` is unaffected. */
export function knowledgeCheck(): AstroIntegration {
	return {
		name: 'knowledge-check',
		hooks: {
			'astro:build:start': ({ logger }) => {
				const { path, reportedFacts } = loadKnowledge();
				logger.info(`Loaded ${reportedFacts.length} Reported fact files from ${path}`);
			},
		},
	};
}

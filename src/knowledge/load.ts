import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const REPORTED_FACT_FOLDERS = ['projects', 'background'];
const GUIDANCE_NOTES_FILE = 'guidance-notes.md';

export interface ReportedFact {
	/** Path relative to the knowledge folder, e.g. `projects/ecokwa.md`. */
	file: string;
	content: string;
}

export interface Knowledge {
	path: string;
	reportedFacts: ReportedFact[];
	guidanceNotes: string;
}

/** Absolute path of the knowledge folder: `KNOWLEDGE_PATH`, or `../knowledge` by default. */
export function resolveKnowledgePath(): string {
	return resolve(process.cwd(), process.env.KNOWLEDGE_PATH || '../knowledge');
}

function fail(path: string, problem: string): never {
	throw new Error(
		`Knowledge base: ${problem} in ${path}. ` +
			'Set KNOWLEDGE_PATH to the folder holding the private knowledge repository ' +
			'(default: ../knowledge relative to the site root).',
	);
}

/** Server-only: reads the Reported facts and Guidance notes from the knowledge folder. */
export function loadKnowledge(): Knowledge {
	const path = resolveKnowledgePath();
	if (!existsSync(path)) fail(path, 'folder not found');

	const reportedFacts = REPORTED_FACT_FOLDERS.flatMap((folder) => {
		const dir = join(path, folder);
		if (!existsSync(dir)) return [];
		return readdirSync(dir)
			.filter((name) => name.endsWith('.md'))
			.sort()
			.map((name) => ({
				file: `${folder}/${name}`,
				content: readFileSync(join(dir, name), 'utf8'),
			}));
	});
	if (reportedFacts.length === 0) {
		fail(path, `no Reported facts (.md files in ${REPORTED_FACT_FOLDERS.join('/ or ')}/)`);
	}

	const guidanceNotesPath = join(path, GUIDANCE_NOTES_FILE);
	const guidanceNotes = existsSync(guidanceNotesPath)
		? readFileSync(guidanceNotesPath, 'utf8')
		: '';
	if (!guidanceNotes.trim()) fail(path, `${GUIDANCE_NOTES_FILE} missing or empty`);

	return { path, reportedFacts, guidanceNotes };
}

import { expect, test } from 'bun:test';

import { directNeighbors, orbitTrack, technologies } from './stackCatalog';

test('gives every technology a unique id', () => {
	const ids = technologies.map(({ id }) => id);
	expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
});

test('sets orbit tracks only on connected technologies', () => {
	const unconnectedTracks = technologies.flatMap(({ id }) =>
		technologies
			.filter(
				(neighbor) =>
					orbitTrack(id, neighbor.id) !== undefined &&
					!directNeighbors(id).includes(neighbor.id),
			)
			.map((neighbor) => `${id} -> ${neighbor.id}`),
	);
	expect(unconnectedTracks).toEqual([]);
});

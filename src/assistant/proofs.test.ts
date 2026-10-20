import { describe, expect, test } from 'bun:test';

import { buildProofs } from './proofs';

const projectSlugs = ['ecokwa', 'redbox', 'restmoney'];

describe('buildProofs', () => {
	test('points a project with a case study to its case study page in the page locale', () => {
		expect(buildProofs(['ecokwa', 'restmoney'], 'fr', projectSlugs)).toEqual([
			{ slug: 'ecokwa', url: '/projets/ecokwa/' },
			{ slug: 'restmoney', url: '/projets/restmoney/' },
		]);
		expect(buildProofs(['ecokwa'], 'en', projectSlugs)).toEqual([
			{ slug: 'ecokwa', url: '/en/projects/ecokwa/' },
		]);
	});

	test('points a project without a case study to its home page drawer', () => {
		expect(buildProofs(['redbox'], 'fr', projectSlugs)).toEqual([
			{ slug: 'redbox', url: '/#redbox' },
		]);
		expect(buildProofs(['redbox'], 'en', projectSlugs)).toEqual([
			{ slug: 'redbox', url: '/en/#redbox' },
		]);
	});

	test('drops unknown and repeated slugs, keeping the model order', () => {
		expect(
			buildProofs(['redbox', 'kubernetes', 'ecokwa', 'redbox'], 'en', projectSlugs),
		).toEqual([
			{ slug: 'redbox', url: '/en/#redbox' },
			{ slug: 'ecokwa', url: '/en/projects/ecokwa/' },
		]);
	});
});

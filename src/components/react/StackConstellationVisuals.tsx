import type { ReactNode } from 'react';
import IconJS from '@svgs/js.svg?react';
import IconNext from '@svgs/next.svg?react';
import IconPHP from '@svgs/php.svg?react';
import IconReact from '@svgs/react.svg?react';
import IconWordPress from '@svgs/wp.svg?react';
import acfLogoUrl from '@svgs/acf.svg?url';
import IconGutenberg from '@svgs/gutenberg.svg?react';
import {
	siBitbucket,
	siAstro,
	siClaude,
	siCraftcms,
	siDocker,
	siGit,
	siGoogleanalytics,
	siHtml5,
	siInertia,
	siJest,
	siLaravel,
	siMysql,
	siPostcss,
	siPostgresql,
	siSqlite,
	siSass,
	siTailwindcss,
	siTanstack,
	siThreedotjs,
	siTypescript,
	siVite,
	siVitest,
	siWebpack,
	siWoocommerce,
} from 'simple-icons';
import type { StackCatalog } from '../../content/stack';

type TechnologyId = string;
type MasteryLevel = 'expertise' | 'comfortable' | 'focused';

type Technology = StackCatalog['technologies'][number] & {
	icon: ReactNode;
	position: [number, number];
};

type EntryGalaxy = {
	id: TechnologyId;
	position: [number, number];
	mobilePosition: [number, number];
	rotation: number;
	scale: number;
	drift: [number, number];
	driftDuration: number;
	driftDelay: number;
	cloudSway: number;
	cloudSwayDuration: number;
	cloudSwayDelay: number;
};

export const masteryOrbit: Record<MasteryLevel, number> = {
	expertise: 0,
	comfortable: 1,
	focused: 2,
};

function SimpleIcon({ path }: { path: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d={path} />
		</svg>
	);
}

function CapabilityIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M12 2 22 12 12 22 2 12 12 2Zm0 4.2L6.2 12l5.8 5.8 5.8-5.8L12 6.2Z" />
		</svg>
	);
}

const technologyVisuals: Record<TechnologyId, Pick<Technology, 'icon' | 'position'>> = {
	php: { icon: <IconPHP />, position: [21, 47] },
	wordpress: { icon: <IconWordPress />, position: [38, 31] },
	javascript: {
		icon: (
			<span className="constellation__combined-icon">
				<IconJS />
				<SimpleIcon path={siTypescript.path} />
			</span>
		),
		position: [64, 58],
	},
	react: { icon: <IconReact />, position: [60, 27] },
	astro: { icon: <SimpleIcon path={siAstro.path} />, position: [70, 36] },
	threejs: { icon: <SimpleIcon path={siThreedotjs.path} />, position: [82, 70] },
	vitest: { icon: <SimpleIcon path={siVitest.path} />, position: [88, 78] },
	gutenberg: { icon: <IconGutenberg />, position: [49, 16] },
	scss: { icon: <SimpleIcon path={siSass.path} />, position: [28, 62] },
	tailwind: { icon: <SimpleIcon path={siTailwindcss.path} />, position: [43, 64] },
	'tanstack-start': { icon: <SimpleIcon path={siTanstack.path} />, position: [74, 19] },
	nextjs: { icon: <IconNext />, position: [87, 60] },
	html: { icon: <SimpleIcon path={siHtml5.path} />, position: [85, 77] },
	twig: { icon: <CapabilityIcon />, position: [10, 72] },
	'acf-pro': { icon: <img src={acfLogoUrl} alt="" />, position: [30, 16] },
	'wp-cli': { icon: <CapabilityIcon />, position: [22, 18] },
	woocommerce: { icon: <SimpleIcon path={siWoocommerce.path} />, position: [13, 27] },
	'google-analytics': { icon: <SimpleIcon path={siGoogleanalytics.path} />, position: [60, 5] },
	'rest-apis': { icon: <CapabilityIcon />, position: [26, 36] },
	mysql: { icon: <SimpleIcon path={siMysql.path} />, position: [12, 43] },
	laravel: { icon: <SimpleIcon path={siLaravel.path} />, position: [8, 55] },
	'craft-cms': { icon: <SimpleIcon path={siCraftcms.path} />, position: [5, 63] },
	postcss: { icon: <SimpleIcon path={siPostcss.path} />, position: [36, 78] },
	vite: { icon: <SimpleIcon path={siVite.path} />, position: [72, 82] },
	webpack: { icon: <SimpleIcon path={siWebpack.path} />, position: [94, 82] },
	jest: { icon: <SimpleIcon path={siJest.path} />, position: [93, 69] },
	salesforce: { icon: <CapabilityIcon />, position: [50, 39] },
	'ab-testing': { icon: <CapabilityIcon />, position: [60, 88] },
	postgresql: { icon: <SimpleIcon path={siPostgresql.path} />, position: [5, 86] },
	sqlite: { icon: <SimpleIcon path={siSqlite.path} />, position: [18, 90] },
	inertia: { icon: <SimpleIcon path={siInertia.path} />, position: [32, 91] },
	docker: { icon: <SimpleIcon path={siDocker.path} />, position: [46, 91] },
	git: { icon: <SimpleIcon path={siGit.path} />, position: [58, 94] },
	'gitlab-ci': { icon: <CapabilityIcon />, position: [70, 94] },
	'bitbucket-pipelines': { icon: <SimpleIcon path={siBitbucket.path} />, position: [83, 94] },
	codex: { icon: <CapabilityIcon />, position: [92, 30] },
	'claude-code': { icon: <SimpleIcon path={siClaude.path} />, position: [83, 20] },
};

export function getTechnologies(catalog: StackCatalog): Technology[] {
	return catalog.technologies.map((technology) => ({
		...technology,
		...technologyVisuals[technology.id],
	}));
}

export function validateStackConstellationCatalog(catalog: StackCatalog) {
	const missingVisuals = catalog.technologies
		.filter((technology) => !technologyVisuals[technology.id])
		.map((technology) => technology.id);
	if (missingVisuals.length) {
		throw new Error(`Missing constellation visual for: ${missingVisuals.join(', ')}`);
	}

	const primaryIds = catalog.technologies
		.filter((technology) => technology.primary)
		.map(({ id }) => id);
	const entryIds = entryGalaxies.map(({ id }) => id);
	if (primaryIds.length !== entryIds.length || primaryIds.some((id) => !entryIds.includes(id))) {
		throw new Error('Constellation primary technologies must match the entry galaxies.');
	}
}

export const entryGalaxies: EntryGalaxy[] = [
	{
		id: 'wordpress',
		position: [27, 28],
		mobilePosition: [25, 26],
		rotation: -8,
		scale: 1.08,
		drift: [20, -14],
		driftDuration: 20,
		driftDelay: -6,
		cloudSway: 9,
		cloudSwayDuration: 32,
		cloudSwayDelay: -12,
	},
	{
		id: 'react',
		position: [73, 28],
		mobilePosition: [75, 26],
		rotation: 9,
		scale: 0.98,
		drift: [-18, 16],
		driftDuration: 22,
		driftDelay: -16,
		cloudSway: 10,
		cloudSwayDuration: 36,
		cloudSwayDelay: -24,
	},
	{
		id: 'php',
		position: [27, 69],
		mobilePosition: [25, 70],
		rotation: 5,
		scale: 0.96,
		drift: [22, 12],
		driftDuration: 16,
		driftDelay: -10,
		cloudSway: 8,
		cloudSwayDuration: 28,
		cloudSwayDelay: -18,
	},
	{
		id: 'javascript',
		position: [73, 69],
		mobilePosition: [75, 70],
		rotation: -11,
		scale: 1.05,
		drift: [-20, -18],
		driftDuration: 24,
		driftDelay: -20,
		cloudSway: 10,
		cloudSwayDuration: 34,
		cloudSwayDelay: -28,
	},
];

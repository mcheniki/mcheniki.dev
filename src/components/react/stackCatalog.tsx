import type { ReactNode } from 'react';
import IconJS from '@svgs/js.svg?react';
import IconNext from '@svgs/next.svg?react';
import IconPHP from '@svgs/php.svg?react';
import IconReact from '@svgs/react.svg?react';
import IconWordPress from '@svgs/wp.svg?react';
import acfLogoUrl from '@svgs/acf.svg?url';
import IconGutenberg from '@svgs/gutenberg.svg?react';
import {
	siAstro,
	siBitbucket,
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
	siSass,
	siSqlite,
	siTailwindcss,
	siTanstack,
	siThreedotjs,
	siTypescript,
	siVite,
	siVitest,
	siWebpack,
	siWoocommerce,
} from 'simple-icons';

type Galaxy = {
	order: number;
	position: readonly [number, number];
	mobilePosition: readonly [number, number];
	rotation: number;
	scale: number;
	drift: readonly [number, number];
	driftDuration: number;
	driftDelay: number;
	cloudSway: number;
	cloudSwayDuration: number;
	cloudSwayDelay: number;
};

export type StackTechnology = {
	id: string;
	label: string;
	position: readonly [number, number];
	icon: ReactNode;
	galaxy?: Galaxy;
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

export const technologies = [
	{
		id: 'php',
		label: 'PHP',
		position: [21, 47],
		icon: <IconPHP />,
		galaxy: {
			order: 3,
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
	},
	{
		id: 'wordpress',
		label: 'WordPress',
		position: [38, 31],
		icon: <IconWordPress />,
		galaxy: {
			order: 1,
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
	},
	{
		id: 'javascript',
		label: 'JavaScript / TypeScript',
		position: [64, 58],
		icon: (
			<span className="constellation__combined-icon">
				<IconJS />
				<SimpleIcon path={siTypescript.path} />
			</span>
		),
		galaxy: {
			order: 4,
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
	},
	{
		id: 'react',
		label: 'React',
		position: [60, 27],
		icon: <IconReact />,
		galaxy: {
			order: 2,
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
	},
	{
		id: 'astro',
		label: 'Astro',
		position: [70, 36],
		icon: <SimpleIcon path={siAstro.path} />,
	},
	{
		id: 'threejs',
		label: 'Three.js',
		position: [82, 70],
		icon: <SimpleIcon path={siThreedotjs.path} />,
	},
	{
		id: 'vitest',
		label: 'Vitest',
		position: [88, 78],
		icon: <SimpleIcon path={siVitest.path} />,
	},
	{
		id: 'gutenberg',
		label: 'Gutenberg',
		position: [49, 16],
		icon: <IconGutenberg />,
	},
	{
		id: 'scss',
		label: 'SCSS',
		position: [28, 62],
		icon: <SimpleIcon path={siSass.path} />,
	},
	{
		id: 'tailwind',
		label: 'Tailwind',
		position: [43, 64],
		icon: <SimpleIcon path={siTailwindcss.path} />,
	},
	{
		id: 'tanstack-start',
		label: 'TanStack Start',
		position: [74, 19],
		icon: <SimpleIcon path={siTanstack.path} />,
	},
	{
		id: 'nextjs',
		label: 'Next.js',
		position: [87, 60],
		icon: <IconNext />,
	},
	{
		id: 'html',
		label: 'HTML',
		position: [85, 77],
		icon: <SimpleIcon path={siHtml5.path} />,
	},
	{
		id: 'twig',
		label: 'Twig',
		position: [10, 72],
		icon: <CapabilityIcon />,
	},
	{
		id: 'acf-pro',
		label: 'ACF Pro',
		position: [30, 16],
		icon: <img src={acfLogoUrl} alt="" />,
	},
	{
		id: 'wp-cli',
		label: 'WP-CLI',
		position: [22, 18],
		icon: <CapabilityIcon />,
	},
	{
		id: 'woocommerce',
		label: 'WooCommerce',
		position: [13, 27],
		icon: <SimpleIcon path={siWoocommerce.path} />,
	},
	{
		id: 'google-analytics',
		label: 'Google Analytics',
		position: [60, 5],
		icon: <SimpleIcon path={siGoogleanalytics.path} />,
	},
	{
		id: 'mysql',
		label: 'MySQL',
		position: [12, 43],
		icon: <SimpleIcon path={siMysql.path} />,
	},
	{
		id: 'laravel',
		label: 'Laravel',
		position: [8, 55],
		icon: <SimpleIcon path={siLaravel.path} />,
	},
	{
		id: 'craft-cms',
		label: 'Craft CMS',
		position: [5, 63],
		icon: <SimpleIcon path={siCraftcms.path} />,
	},
	{
		id: 'postcss',
		label: 'PostCSS',
		position: [36, 78],
		icon: <SimpleIcon path={siPostcss.path} />,
	},
	{
		id: 'vite',
		label: 'Vite',
		position: [72, 82],
		icon: <SimpleIcon path={siVite.path} />,
	},
	{
		id: 'webpack',
		label: 'Webpack',
		position: [94, 82],
		icon: <SimpleIcon path={siWebpack.path} />,
	},
	{
		id: 'jest',
		label: 'Jest',
		position: [93, 69],
		icon: <SimpleIcon path={siJest.path} />,
	},
	{
		id: 'postgresql',
		label: 'PostgreSQL',
		position: [5, 86],
		icon: <SimpleIcon path={siPostgresql.path} />,
	},
	{
		id: 'sqlite',
		label: 'SQLite',
		position: [18, 90],
		icon: <SimpleIcon path={siSqlite.path} />,
	},
	{
		id: 'inertia',
		label: 'Inertia',
		position: [32, 91],
		icon: <SimpleIcon path={siInertia.path} />,
	},
	{
		id: 'docker',
		label: 'Docker',
		position: [46, 91],
		icon: <SimpleIcon path={siDocker.path} />,
	},
	{
		id: 'git',
		label: 'Git',
		position: [58, 94],
		icon: <SimpleIcon path={siGit.path} />,
	},
	{
		id: 'gitlab-ci',
		label: 'GitLab CI',
		position: [70, 94],
		icon: <CapabilityIcon />,
	},
	{
		id: 'bitbucket-pipelines',
		label: 'Bitbucket Pipelines',
		position: [83, 94],
		icon: <SimpleIcon path={siBitbucket.path} />,
	},
	{
		id: 'codex',
		label: 'Codex',
		position: [92, 30],
		icon: <CapabilityIcon />,
	},
	{
		id: 'claude-code',
		label: 'Claude Code',
		position: [83, 20],
		icon: <SimpleIcon path={siClaude.path} />,
	},
] as const satisfies readonly StackTechnology[];

export type TechnologyId = (typeof technologies)[number]['id'];
export type CatalogTechnology = (typeof technologies)[number];
export type EntryGalaxy = Extract<(typeof technologies)[number], { galaxy: Galaxy }>;

export const connections = [
	['php', 'wordpress'],
	['wordpress', 'gutenberg'],
	['wordpress', 'scss'],
	['wordpress', 'tailwind'],
	['wordpress', 'wp-cli'],
	['wordpress', 'acf-pro'],
	['gutenberg', 'acf-pro'],
	['gutenberg', 'react'],
	['react', 'javascript'],
	['react', 'tailwind'],
	['react', 'tanstack-start'],
	['react', 'nextjs'],
	['react', 'astro'],
	['javascript', 'astro'],
	['wordpress', 'woocommerce'],
	['wordpress', 'google-analytics'],
	['php', 'mysql'],
	['php', 'laravel'],
	['php', 'craft-cms'],
	['php', 'twig'],
	['laravel', 'inertia'],
	['laravel', 'postgresql'],
	['laravel', 'sqlite'],
	['laravel', 'docker'],
	['inertia', 'react'],
	['scss', 'postcss'],
	['scss', 'html'],
	['scss', 'twig'],
	['javascript', 'vite'],
	['javascript', 'webpack'],
	['javascript', 'jest'],
	['javascript', 'threejs'],
	['javascript', 'vitest'],
	['docker', 'git'],
	['docker', 'gitlab-ci'],
	['git', 'bitbucket-pipelines'],
	['git', 'codex'],
	['git', 'claude-code'],
] as const satisfies readonly (readonly [TechnologyId, TechnologyId])[];

export const mobileRootIds = [
	'wordpress',
	'php',
	'react',
	'javascript',
] as const satisfies readonly TechnologyId[];

export function directNeighbors(id: TechnologyId) {
	return [
		...new Set(
			connections.flatMap(([from, to]) => (from === id ? [to] : to === id ? [from] : [])),
		),
	];
}

export const mobileDisclosureGroups = mobileRootIds.map((id) => ({
	root: technologies.find((technology) => technology.id === id)!,
	neighbors: directNeighbors(id).map((neighborId) =>
		technologies.find((technology) => technology.id === neighborId)!,
	),
}));

const mobileCoveredIds = new Set(
	mobileDisclosureGroups.flatMap(({ root, neighbors }) => [
		root.id,
		...neighbors.map(({ id }) => id),
	]),
);

export const mobileOtherTechnologies = technologies.filter(({ id }) => !mobileCoveredIds.has(id));

export const entryGalaxies = technologies
	.filter((technology): technology is EntryGalaxy => 'galaxy' in technology)
	.toSorted((first, second) => first.galaxy.order - second.galaxy.order);

function validateStackCatalog() {
	const technologyIds = new Set<string>();
	const galaxyOrders = new Set<number>();
	for (const technology of technologies) {
		if (technologyIds.has(technology.id))
			throw new Error(`Duplicate technology id: ${technology.id}`);
		technologyIds.add(technology.id);
		if ('galaxy' in technology) {
			if (galaxyOrders.has(technology.galaxy.order))
				throw new Error(`Duplicate galaxy order: ${technology.galaxy.order}`);
			galaxyOrders.add(technology.galaxy.order);
		}
	}
	for (const [from, to] of connections) {
		if (!technologyIds.has(from) || !technologyIds.has(to)) {
			throw new Error(`Unknown technology in connection: ${from}, ${to}`);
		}
	}
	const mobileIds = new Set([
		...mobileDisclosureGroups.flatMap(({ root, neighbors }) => [
			root.id,
			...neighbors.map(({ id }) => id),
		]),
		...mobileOtherTechnologies.map(({ id }) => id),
	]);
	if (mobileIds.size !== technologies.length) {
		throw new Error(
			'Mobile disclosures must cover every technology exactly once or as a direct neighbor.',
		);
	}
}

validateStackCatalog();

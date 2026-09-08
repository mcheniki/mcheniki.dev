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
	siBetterauth,
	siBitbucket,
	siClaude,
	siCraftcms,
	siDocker,
	siFigma,
	siGit,
	siGoogleanalytics,
	siHtml5,
	siInertia,
	siJavascript,
	siJest,
	siLaravel,
	siMysql,
	siPostcss,
	siPostgresql,
	siPhp,
	siReact,
	siSass,
	siShopify,
	siSqlite,
	siTailwindcss,
	siTanstack,
	siThreedotjs,
	siTypescript,
	siVite,
	siVitest,
	siWebpack,
	siWoocommerce,
	siWordpress,
	siZod,
} from 'simple-icons';

type Galaxy = {
	order: number;
	position: readonly [number, number];
	mobilePosition: readonly [number, number];
	scale: number;
	drift: readonly [number, number];
	driftDuration: number;
	driftDelay: number;
};

export type StackTechnology = {
	id: string;
	label: string;
	kind?: 'group';
	position: readonly [number, number];
	icon: ReactNode;
	mark?: ReactNode;
	markSize?: 'pair';
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

export function ToolboxIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M4 8h16v11H4V8Zm5-3h6l1 3H8l1-3Zm-3 7h12v2H6v-2Z" />
		</svg>
	);
}

export const technologies = [
	{
		id: 'php',
		label: 'PHP',
		position: [21, 47],
		icon: <IconPHP />,
		mark: (
			<span className="constellation__galaxy-mark">
				<SimpleIcon path={siPhp.path} />
			</span>
		),
		galaxy: {
			order: 3,
			position: [33, 70],
			mobilePosition: [25, 70],
			scale: 0.96,
			drift: [22, 12],
			driftDuration: 16,
			driftDelay: -10,
		},
	},
	{
		id: 'wordpress',
		label: 'WordPress',
		position: [38, 31],
		icon: <IconWordPress />,
		mark: (
			<span className="constellation__galaxy-mark">
				<SimpleIcon path={siWordpress.path} />
			</span>
		),
		galaxy: {
			order: 1,
			position: [18, 25],
			mobilePosition: [25, 26],
			scale: 1.08,
			drift: [20, -14],
			driftDuration: 20,
			driftDelay: -6,
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
		mark: (
			<span className="constellation__galaxy-mark constellation__galaxy-mark--pair">
				<SimpleIcon path={siJavascript.path} />
				<SimpleIcon path={siTypescript.path} />
			</span>
		),
		markSize: 'pair',
		galaxy: {
			order: 4,
			position: [67, 70],
			mobilePosition: [75, 70],
			scale: 1.05,
			drift: [-20, -18],
			driftDuration: 24,
			driftDelay: -20,
		},
	},
	{
		id: 'react',
		label: 'React',
		position: [60, 27],
		icon: <IconReact />,
		mark: (
			<span className="constellation__galaxy-mark">
				<SimpleIcon path={siReact.path} />
			</span>
		),
		galaxy: {
			order: 2,
			position: [50, 20],
			mobilePosition: [75, 26],
			scale: 0.98,
			drift: [-18, 16],
			driftDuration: 22,
			driftDelay: -16,
		},
	},
	{
		id: 'other-tools',
		label: 'Other tools',
		kind: 'group',
		position: [82, 25],
		icon: <ToolboxIcon />,
		mark: (
			<span className="constellation__galaxy-mark">
				<ToolboxIcon />
			</span>
		),
		galaxy: {
			order: 5,
			position: [82, 25],
			mobilePosition: [50, 88],
			scale: 0.94,
			drift: [14, -10],
			driftDuration: 18,
			driftDelay: -8,
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
		id: 'tanstack-query',
		label: 'TanStack Query',
		position: [78, 23],
		icon: <SimpleIcon path={siTanstack.path} />,
	},
	{
		id: 'zod',
		label: 'Zod',
		position: [66, 10],
		icon: <SimpleIcon path={siZod.path} />,
	},
	{
		id: 'better-auth',
		label: 'Better Auth',
		position: [72, 12],
		icon: <SimpleIcon path={siBetterauth.path} />,
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
	{
		id: 'shopify',
		label: 'Shopify',
		position: [90, 52],
		icon: <SimpleIcon path={siShopify.path} />,
	},
	{
		id: 'figma',
		label: 'Figma',
		position: [88, 46],
		icon: <SimpleIcon path={siFigma.path} />,
	},
	{
		id: 'gravity-forms',
		label: 'Gravity Forms',
		position: [42, 22],
		icon: <CapabilityIcon />,
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
	['react', 'javascript'],
	['react', 'tailwind'],
	['react', 'tanstack-start'],
	['react', 'tanstack-query'],
	['react', 'zod'],
	['react', 'better-auth'],
	['react', 'nextjs'],
	['react', 'astro'],
	['javascript', 'astro'],
	['wordpress', 'woocommerce'],
	['php', 'mysql'],
	['php', 'laravel'],
	['php', 'craft-cms'],
	['php', 'twig'],
	['laravel', 'inertia'],
	['laravel', 'postgresql'],
	['laravel', 'sqlite'],
	['inertia', 'react'],
	['scss', 'postcss'],
	['scss', 'html'],
	['scss', 'twig'],
	['javascript', 'vite'],
	['javascript', 'webpack'],
	['javascript', 'jest'],
	['javascript', 'threejs'],
	['javascript', 'vitest'],
	['other-tools', 'git'],
	['other-tools', 'docker'],
	['other-tools', 'bitbucket-pipelines'],
	['other-tools', 'gitlab-ci'],
	['other-tools', 'codex'],
	['other-tools', 'claude-code'],
	['other-tools', 'google-analytics'],
	['other-tools', 'shopify'],
	['other-tools', 'figma'],
	['wordpress', 'gravity-forms'],
	['php', 'postgresql'],
	['react', 'sqlite'],
] as const satisfies readonly (readonly [TechnologyId, TechnologyId])[];

export const mobileRootIds = [
	'wordpress',
	'php',
	'react',
	'javascript',
] as const satisfies readonly TechnologyId[];

const mobileToolboxOrder = [
	'git',
	'docker',
	'gitlab-ci',
	'bitbucket-pipelines',
	'codex',
	'claude-code',
	'google-analytics',
	'shopify',
	'figma',
] as const satisfies readonly TechnologyId[];
const mobileToolboxOrderSet = new Set<TechnologyId>(mobileToolboxOrder);

// These orders retain the established orbit sequence without duplicating any graph edges.
const orbitNeighborOrder: Partial<Record<TechnologyId, readonly TechnologyId[]>> = {
	react: [
		'tailwind',
		'inertia',
		'tanstack-query',
		'tanstack-start',
		'nextjs',
		'astro',
		'javascript',
		'zod',
		'better-auth',
		'sqlite',
	],
};

const orbitTrackByConnection: Partial<Record<TechnologyId, Partial<Record<TechnologyId, number>>>> =
	{
		'other-tools': { 'claude-code': 1, figma: 1 },
		react: { inertia: 1, 'tanstack-query': 1, zod: 2, 'better-auth': 1, sqlite: 1 },
		php: { postgresql: 1, laravel: 1, 'craft-cms': 2 },
		wordpress: { 'acf-pro': 0, scss: 0, woocommerce: 1, 'wp-cli': 2, 'gravity-forms': 1 },
		javascript: { astro: 2, vite: 0, webpack: 1, vitest: 1 },
	};

export function directNeighbors(id: TechnologyId) {
	return [
		...new Set(
			connections.flatMap(([from, to]) => (from === id ? [to] : to === id ? [from] : [])),
		),
	];
}

export function orderedOrbitNeighbors(id: TechnologyId) {
	const neighbors = directNeighbors(id);
	const orderedNeighbors = orbitNeighborOrder[id];
	if (!orderedNeighbors) return neighbors;
	return [
		...orderedNeighbors.filter((neighborId) => neighbors.includes(neighborId)),
		...neighbors.filter((neighborId) => !orderedNeighbors.includes(neighborId)),
	];
}

export function orbitTrack(id: TechnologyId, neighborId: TechnologyId) {
	return orbitTrackByConnection[id]?.[neighborId];
}

export const mobileDisclosureGroups = mobileRootIds.map((id) => ({
	root: technologies.find((technology) => technology.id === id)!,
	neighbors: directNeighbors(id).map((neighborId) =>
		technologies.find((technology) => technology.id === neighborId)!,
	),
}));

export const mobileToolboxTechnologies = [
	...mobileToolboxOrder.filter((id) => directNeighbors('other-tools').includes(id)),
	...directNeighbors('other-tools').filter((id) => !mobileToolboxOrderSet.has(id)),
].map((id) => technologies.find((technology) => technology.id === id)!);

export const mobileOtherTechnologies = mobileToolboxTechnologies;

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
	for (const { root, neighbors } of mobileDisclosureGroups) {
		const expectedNeighbors = new Set(directNeighbors(root.id));
		if (
			neighbors.length !== expectedNeighbors.size ||
			neighbors.some(({ id }) => !expectedNeighbors.has(id))
		) {
			throw new Error('Mobile galaxy disclosures must match their desktop direct neighbors.');
		}
	}
	for (const [id, orderedNeighbors] of Object.entries(orbitNeighborOrder)) {
		const directNeighborIds = new Set(
			connections.flatMap(([from, to]) => (from === id ? [to] : to === id ? [from] : [])),
		);
		if (
			new Set(orderedNeighbors).size !== orderedNeighbors.length ||
			orderedNeighbors.some((neighborId) => !directNeighborIds.has(neighborId))
		) {
			throw new Error(`Orbit order must match direct neighbors for ${id}.`);
		}
	}
	const toolboxNeighborIds = new Set(directNeighbors('other-tools'));
	if (
		mobileToolboxTechnologies.length !== toolboxNeighborIds.size ||
		mobileToolboxTechnologies.some(({ id }) => !toolboxNeighborIds.has(id))
	) {
		throw new Error('Toolbox technologies must match their direct connections.');
	}
}

validateStackCatalog();

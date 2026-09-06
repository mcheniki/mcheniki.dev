import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import IconJS from '@svgs/js.svg?react';
import IconNext from '@svgs/next.svg?react';
import IconPHP from '@svgs/php.svg?react';
import IconReact from '@svgs/react.svg?react';
import IconWordPress from '@svgs/wp.svg?react';
import {
	siBitbucket,
	siClaude,
	siCraftcms,
	siDocker,
	siGit,
	siGoogleanalytics,
	siGutenberg,
	siHtml5,
	siInertia,
	siJest,
	siLaravel,
	siMysql,
	siPostcss,
	siPostgresql,
	siShopify,
	siSqlite,
	siSass,
	siTailwindcss,
	siTanstack,
	siTypescript,
	siVite,
	siWebpack,
	siWoocommerce,
} from 'simple-icons';

import '../../styles/stack-constellation.css';

type TechnologyId =
	| 'php'
	| 'wordpress'
	| 'gutenberg'
	| 'scss'
	| 'tailwind'
	| 'react'
	| 'typescript'
	| 'javascript'
	| 'tanstack-start'
	| 'nextjs'
	| 'html'
	| 'twig'
	| 'acf-pro'
	| 'wp-cli'
	| 'woocommerce'
	| 'google-analytics'
	| 'rest-apis'
	| 'mysql'
	| 'laravel'
	| 'craft-cms'
	| 'postcss'
	| 'vite'
	| 'webpack'
	| 'jest'
	| 'shopify'
	| 'salesforce'
	| 'ab-testing'
	| 'postgresql'
	| 'sqlite'
	| 'inertia'
	| 'docker'
	| 'git'
	| 'gitlab-ci'
	| 'bitbucket-pipelines'
	| 'codex'
	| 'claude-code';

type Technology = {
	id: TechnologyId;
	label: string;
	icon: ReactNode;
	position: [number, number];
	primary?: boolean;
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

const technologies: Technology[] = [
	{
		id: 'php',
		label: 'PHP',
		icon: <IconPHP />,
		position: [21, 47],
		primary: true,
	},
	{
		id: 'wordpress',
		label: 'WordPress',
		icon: <IconWordPress />,
		position: [38, 31],
		primary: true,
	},
	{
		id: 'javascript',
		label: 'JavaScript',
		icon: <IconJS />,
		position: [64, 58],
		primary: true,
	},
	{
		id: 'typescript',
		label: 'TypeScript',
		icon: <SimpleIcon path={siTypescript.path} />,
		position: [78, 46],
		primary: true,
	},
	{
		id: 'react',
		label: 'React',
		icon: <IconReact />,
		position: [60, 27],
		primary: true,
	},
	{
		id: 'gutenberg',
		label: 'Gutenberg',
		icon: <SimpleIcon path={siGutenberg.path} />,
		position: [49, 16],
	},
	{
		id: 'scss',
		label: 'SCSS',
		icon: <SimpleIcon path={siSass.path} />,
		position: [28, 62],
	},
	{
		id: 'tailwind',
		label: 'Tailwind',
		icon: <SimpleIcon path={siTailwindcss.path} />,
		position: [43, 64],
	},
	{
		id: 'tanstack-start',
		label: 'TanStack Start',
		icon: <SimpleIcon path={siTanstack.path} />,
		position: [74, 19],
	},
	{
		id: 'nextjs',
		label: 'Next.js',
		icon: <IconNext />,
		position: [87, 60],
	},
	{ id: 'html', label: 'HTML', icon: <SimpleIcon path={siHtml5.path} />, position: [85, 77] },
	{ id: 'twig', label: 'Twig', icon: <CapabilityIcon />, position: [10, 72] },
	{ id: 'acf-pro', label: 'ACF Pro', icon: <CapabilityIcon />, position: [30, 16] },
	{ id: 'wp-cli', label: 'WP-CLI', icon: <CapabilityIcon />, position: [22, 18] },
	{
		id: 'woocommerce',
		label: 'WooCommerce',
		icon: <SimpleIcon path={siWoocommerce.path} />,
		position: [13, 27],
	},
	{
		id: 'google-analytics',
		label: 'Google Analytics',
		icon: <SimpleIcon path={siGoogleanalytics.path} />,
		position: [60, 5],
	},
	{ id: 'rest-apis', label: 'REST APIs', icon: <CapabilityIcon />, position: [26, 36] },
	{ id: 'mysql', label: 'MySQL', icon: <SimpleIcon path={siMysql.path} />, position: [12, 43] },
	{
		id: 'laravel',
		label: 'Laravel',
		icon: <SimpleIcon path={siLaravel.path} />,
		position: [8, 55],
	},
	{
		id: 'craft-cms',
		label: 'Craft CMS',
		icon: <SimpleIcon path={siCraftcms.path} />,
		position: [5, 63],
	},
	{
		id: 'postcss',
		label: 'PostCSS',
		icon: <SimpleIcon path={siPostcss.path} />,
		position: [36, 78],
	},
	{ id: 'vite', label: 'Vite', icon: <SimpleIcon path={siVite.path} />, position: [72, 82] },
	{
		id: 'webpack',
		label: 'Webpack',
		icon: <SimpleIcon path={siWebpack.path} />,
		position: [94, 82],
	},
	{ id: 'jest', label: 'Jest', icon: <SimpleIcon path={siJest.path} />, position: [93, 69] },
	{
		id: 'shopify',
		label: 'Shopify',
		icon: <SimpleIcon path={siShopify.path} />,
		position: [96, 50],
	},
	{ id: 'salesforce', label: 'Salesforce', icon: <CapabilityIcon />, position: [50, 39] },
	{ id: 'ab-testing', label: 'A/B testing', icon: <CapabilityIcon />, position: [60, 88] },
	{
		id: 'postgresql',
		label: 'PostgreSQL',
		icon: <SimpleIcon path={siPostgresql.path} />,
		position: [5, 86],
	},
	{
		id: 'sqlite',
		label: 'SQLite',
		icon: <SimpleIcon path={siSqlite.path} />,
		position: [18, 90],
	},
	{
		id: 'inertia',
		label: 'Inertia',
		icon: <SimpleIcon path={siInertia.path} />,
		position: [32, 91],
	},
	{
		id: 'docker',
		label: 'Docker',
		icon: <SimpleIcon path={siDocker.path} />,
		position: [46, 91],
	},
	{ id: 'git', label: 'Git', icon: <SimpleIcon path={siGit.path} />, position: [58, 94] },
	{ id: 'gitlab-ci', label: 'GitLab CI', icon: <CapabilityIcon />, position: [70, 94] },
	{
		id: 'bitbucket-pipelines',
		label: 'Bitbucket Pipelines',
		icon: <SimpleIcon path={siBitbucket.path} />,
		position: [83, 94],
	},
	{ id: 'codex', label: 'Codex', icon: <CapabilityIcon />, position: [92, 30] },
	{
		id: 'claude-code',
		label: 'Claude Code',
		icon: <SimpleIcon path={siClaude.path} />,
		position: [83, 20],
	},
];

const connections: [TechnologyId, TechnologyId][] = [
	['php', 'wordpress'],
	['wordpress', 'gutenberg'],
	['wordpress', 'scss'],
	['wordpress', 'tailwind'],
	['gutenberg', 'react'],
	['react', 'typescript'],
	['react', 'javascript'],
	['react', 'tanstack-start'],
	['react', 'nextjs'],
	['javascript', 'typescript'],
	['wordpress', 'woocommerce'],
	['wordpress', 'google-analytics'],
	['gutenberg', 'acf-pro'],
	['php', 'wp-cli'],
	['php', 'mysql'],
	['woocommerce', 'rest-apis'],
	['google-analytics', 'ab-testing'],
	['rest-apis', 'salesforce'],
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
	['javascript', 'html'],
	['javascript', 'shopify'],
	['docker', 'git'],
	['docker', 'gitlab-ci'],
	['git', 'bitbucket-pipelines'],
	['git', 'codex'],
	['git', 'claude-code'],
];

const byId = new Map(technologies.map((technology) => [technology.id, technology]));
const defaultPositions = Object.fromEntries(
	technologies.map((technology) => [technology.id, technology.position]),
) as Record<TechnologyId, [number, number]>;
const floatProfiles: Partial<Record<TechnologyId, [number, number, number, number]>> = {
	php: [6, 8, 13_000, 0.2],
	wordpress: [9, 5, 16_000, 1.7],
	javascript: [5, 10, 14_500, 2.8],
	typescript: [8, 6, 17_500, 4.1],
	react: [7, 9, 12_000, 5.3],
	gutenberg: [5, 7, 15_500, 0.9],
	scss: [10, 4, 18_000, 3.6],
	tailwind: [6, 8, 13_800, 4.8],
	'tanstack-start': [8, 5, 16_500, 2.1],
	nextjs: [4, 9, 11_800, 5.9],
};

function getFloatProfile(id: TechnologyId, index: number): [number, number, number, number] {
	const profile = floatProfiles[id];
	if (profile) return profile;
	const hash = [...id].reduce(
		(value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
		index + 1,
	);
	return [
		4 + (hash % 6),
		4 + ((hash >>> 3) % 6),
		11_000 + ((hash >>> 6) % 7_000),
		((hash >>> 13) % 628) / 100,
	];
}

export default function StackConstellation() {
	const [selectedId, setSelectedId] = useState<TechnologyId | null>(null);
	const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
	const viewportRef = useRef<HTMLDivElement>(null);
	const viewportSizeRef = useRef(viewportSize);
	const nodeMotionRefs = useRef(new Map<TechnologyId, HTMLSpanElement>());
	const lineRefs = useRef(new Map<string, SVGLineElement>());
	const floatingIdsRef = useRef(new Set<TechnologyId>());
	const selected = selectedId ? byId.get(selectedId) : undefined;
	const selectedAndNeighbors = useMemo(() => {
		if (!selectedId) return [];
		return [
			selectedId,
			...connections.flatMap(([from, to]) => {
				if (from === selectedId) return [to];
				if (to === selectedId) return [from];
				return [];
			}),
		];
	}, [selectedId]);
	const cameraStyle = useMemo(() => {
		if (!selectedId) return undefined;
		const positions = selectedAndNeighbors.map((id) => defaultPositions[id]);
		const minX = Math.min(...positions.map(([x]) => x));
		const maxX = Math.max(...positions.map(([x]) => x));
		const minY = Math.min(...positions.map(([, y]) => y));
		const maxY = Math.max(...positions.map(([, y]) => y));
		const centerX = (minX + maxX) / 2;
		const centerY = (minY + maxY) / 2;
		const margin = viewportSize.width && viewportSize.width < 640 ? 22 : 13;
		const maxZoom = viewportSize.width && viewportSize.width < 640 ? 1.3 : 1.65;
		const scaleX = (50 - margin) / Math.max(centerX - minX, maxX - centerX, 1);
		const scaleY = (50 - margin) / Math.max(centerY - minY, maxY - centerY, 1);
		const scale = Math.min(maxZoom, scaleX, scaleY);

		return {
			'--camera-scale': scale,
			'--camera-x': `${(50 - centerX) * scale}%`,
			'--camera-y': `${(50 - centerY) * scale}%`,
		} as CSSProperties;
	}, [selectedAndNeighbors, selectedId, viewportSize.width]);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const observer = new ResizeObserver(([entry]) => {
			const size = { width: entry.contentRect.width, height: entry.contentRect.height };
			viewportSizeRef.current = size;
			setViewportSize(size);
		});
		observer.observe(viewport);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let isIntersecting = false;
		let frameId = 0;
		let elapsed = 0;
		let previousFrameAt = 0;
		let lastRenderedAt = 0;
		let previouslyFloatingIds = new Set<TechnologyId>();

		const setNodeOffsets = (offsets: Record<TechnologyId, [number, number]>) => {
			const viewport = viewportSizeRef.current;
			if (!viewport.width || !viewport.height) return;
			const floatingIds = floatingIdsRef.current;

			previouslyFloatingIds.forEach((id) => {
				if (!floatingIds.has(id)) {
					nodeMotionRefs.current.get(id)?.style.removeProperty('transform');
				}
			});
			previouslyFloatingIds = new Set(floatingIds);

			technologies.forEach((technology) => {
				if (!floatingIds.has(technology.id)) return;
				const [offsetX, offsetY] = offsets[technology.id];
				nodeMotionRefs.current
					.get(technology.id)
					?.style.setProperty('transform', `translate3d(${offsetX}px, ${offsetY}px, 0)`);
			});

			connections.forEach(([fromId, toId]) => {
				const line = lineRefs.current.get(`${fromId}-${toId}`);
				if (!line || line.dataset.visible !== 'true') return;
				const [fromOffsetX, fromOffsetY] = offsets[fromId];
				const [toOffsetX, toOffsetY] = offsets[toId];
				const fromPosition = defaultPositions[fromId];
				const toPosition = defaultPositions[toId];

				line.setAttribute(
					'x1',
					`${fromPosition[0] + (fromOffsetX / viewport.width) * 100}%`,
				);
				line.setAttribute(
					'y1',
					`${fromPosition[1] + (fromOffsetY / viewport.height) * 100}%`,
				);
				line.setAttribute('x2', `${toPosition[0] + (toOffsetX / viewport.width) * 100}%`);
				line.setAttribute('y2', `${toPosition[1] + (toOffsetY / viewport.height) * 100}%`);
			});
		};

		const resetOffsets = () => {
			const noOffset = Object.fromEntries(
				technologies.map((technology) => [technology.id, [0, 0]]),
			) as Record<TechnologyId, [number, number]>;
			setNodeOffsets(noOffset);
		};

		const tick = (now: number) => {
			elapsed += now - previousFrameAt;
			previousFrameAt = now;
			if (now - lastRenderedAt < 33) {
				frameId = requestAnimationFrame(tick);
				return;
			}
			lastRenderedAt = now;
			const offsets = Object.fromEntries(
				technologies.map((technology, index) => {
					const [amplitudeX, amplitudeY, period, phase] = getFloatProfile(
						technology.id,
						index,
					);
					const angle = (elapsed / period) * Math.PI * 2 + phase;
					return [
						technology.id,
						[Math.sin(angle) * amplitudeX, Math.cos(angle * 0.85) * amplitudeY],
					];
				}),
			) as Record<TechnologyId, [number, number]>;

			setNodeOffsets(offsets);
			frameId = requestAnimationFrame(tick);
		};

		const stop = () => {
			if (!frameId) return;
			cancelAnimationFrame(frameId);
			frameId = 0;
			previousFrameAt = 0;
		};
		const sync = () => {
			const shouldAnimate =
				isIntersecting && document.visibilityState === 'visible' && !reducedMotion.matches;
			if (!shouldAnimate) return stop();
			if (!frameId) {
				previousFrameAt = performance.now();
				lastRenderedAt = 0;
				frameId = requestAnimationFrame(tick);
			}
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				isIntersecting = entry.isIntersecting;
				sync();
			},
			{ threshold: 0.1 },
		);
		const onReducedMotionChange = () => {
			if (reducedMotion.matches) resetOffsets();
			sync();
		};

		if (viewportRef.current) observer.observe(viewportRef.current);
		document.addEventListener('visibilitychange', sync);
		reducedMotion.addEventListener('change', onReducedMotionChange);

		return () => {
			stop();
			observer.disconnect();
			document.removeEventListener('visibilitychange', sync);
			reducedMotion.removeEventListener('change', onReducedMotionChange);
		};
	}, []);
	const visibleIds = new Set<TechnologyId>(
		selectedId
			? selectedAndNeighbors
			: technologies
					.filter((technology) => technology.primary)
					.map((technology) => technology.id),
	);
	floatingIdsRef.current = new Set(
		selectedId
			? selectedAndNeighbors
			: technologies
					.filter((technology) => technology.primary)
					.map((technology) => technology.id),
	);

	return (
		<div className="constellation" data-selected={Boolean(selectedId)}>
			<div className="constellation__toolbar">
				<p aria-live="polite" className="constellation__status">
					{selected ? `Exploration : ${selected.label}` : 'Vue d’ensemble'}
				</p>
				{selectedId && (
					<button
						className="constellation__reset"
						type="button"
						onClick={() => setSelectedId(null)}
					>
						Vue d’ensemble
					</button>
				)}
			</div>

			<div className="constellation__viewport" ref={viewportRef}>
				<div className="constellation__world" style={cameraStyle}>
					<div
						aria-hidden="true"
						className="constellation__stars constellation__stars--far"
					/>
					<div
						aria-hidden="true"
						className="constellation__stars constellation__stars--mid"
					/>
					<div
						aria-hidden="true"
						className="constellation__stars constellation__stars--near"
					/>
					<svg
						className="constellation__connections"
						aria-hidden="true"
						preserveAspectRatio="none"
					>
						{connections.map(([fromId, toId]) => {
							const from = byId.get(fromId)!;
							const to = byId.get(toId)!;
							const fromPosition = defaultPositions[fromId];
							const toPosition = defaultPositions[toId];
							const isVisible = selectedId
								? fromId === selectedId || toId === selectedId
								: Boolean(from.primary && to.primary);

							return (
								<line
									key={`${fromId}-${toId}`}
									ref={(line) => {
										const key = `${fromId}-${toId}`;
										if (line) lineRefs.current.set(key, line);
										else lineRefs.current.delete(key);
									}}
									x1={`${fromPosition[0]}%`}
									y1={`${fromPosition[1]}%`}
									x2={`${toPosition[0]}%`}
									y2={`${toPosition[1]}%`}
									data-visible={isVisible}
								/>
							);
						})}
					</svg>

					{technologies.map((technology) => {
						const position = defaultPositions[technology.id];
						const visible = visibleIds.has(technology.id);
						const preview = !selectedId && !technology.primary;
						const dimmed = Boolean(selectedId && !visible);
						const isSelected = selectedId === technology.id;

						return (
							<button
								className="constellation__node"
								data-visible={visible}
								data-preview={preview}
								data-secondary={!technology.primary}
								data-dimmed={dimmed}
								data-selected={isSelected}
								aria-hidden={!visible}
								key={technology.id}
								onClick={() => setSelectedId(technology.id)}
								style={
									{
										'--node-x': `${position[0]}%`,
										'--node-y': `${position[1]}%`,
									} as CSSProperties
								}
								tabIndex={visible ? 0 : -1}
								type="button"
							>
								<span
									className="constellation__node-motion"
									ref={(node) => {
										if (node) nodeMotionRefs.current.set(technology.id, node);
										else nodeMotionRefs.current.delete(technology.id);
									}}
								>
									<span className="constellation__icon">{technology.icon}</span>
									<span className="constellation__label">{technology.label}</span>
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

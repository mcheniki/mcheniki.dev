import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import IconJS from '@svgs/js.svg?react';
import IconNext from '@svgs/next.svg?react';
import IconPHP from '@svgs/php.svg?react';
import IconReact from '@svgs/react.svg?react';
import IconWordPress from '@svgs/wp.svg?react';
import acfLogoUrl from '@svgs/acf.svg?url';
import {
	siBitbucket,
	siAstro,
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
	| 'astro'
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

type MasteryLevel = 0 | 1 | 2;

type EntryGalaxy = {
	id: TechnologyId;
	position: [number, number];
	mobilePosition: [number, number];
	rotation: number;
	scale: number;
};

const masteryLabels: Record<MasteryLevel, string> = {
	0: 'Expertise',
	1: 'À l’aise',
	2: 'Pratique ciblée',
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
		label: 'JavaScript / TypeScript',
		icon: (
			<span className="constellation__combined-icon">
				<IconJS />
				<SimpleIcon path={siTypescript.path} />
			</span>
		),
		position: [64, 58],
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
		id: 'astro',
		label: 'Astro',
		icon: <SimpleIcon path={siAstro.path} />,
		position: [70, 36],
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
	{
		id: 'acf-pro',
		label: 'ACF Pro',
		icon: <img src={acfLogoUrl} alt="" />,
		position: [30, 16],
	},
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

const entryGalaxies: EntryGalaxy[] = [
	{ id: 'wordpress', position: [27, 28], mobilePosition: [25, 26], rotation: -8, scale: 1.08 },
	{ id: 'react', position: [73, 28], mobilePosition: [75, 26], rotation: 9, scale: 0.98 },
	{ id: 'php', position: [27, 69], mobilePosition: [25, 70], rotation: 5, scale: 0.96 },
	{ id: 'javascript', position: [73, 69], mobilePosition: [75, 70], rotation: -11, scale: 1.05 },
];

const connections: [TechnologyId, TechnologyId][] = [
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
const masteryLevels: Record<TechnologyId, MasteryLevel> = {
	php: 0,
	wordpress: 0,
	gutenberg: 0,
	scss: 0,
	html: 0,
	'acf-pro': 0,
	javascript: 0,
	react: 1,
	tailwind: 1,
	twig: 1,
	'rest-apis': 1,
	mysql: 1,
	laravel: 1,
	'craft-cms': 1,
	shopify: 1,
	vite: 1,
	webpack: 1,
	postcss: 1,
	jest: 1,
	docker: 1,
	git: 1,
	'gitlab-ci': 1,
	woocommerce: 1,
	'wp-cli': 1,
	nextjs: 1,
	inertia: 1,
	postgresql: 1,
	'ab-testing': 1,
	astro: 2,
	'tanstack-start': 0,
	sqlite: 2,
	'bitbucket-pipelines': 2,
	codex: 2,
	'claude-code': 2,
	'google-analytics': 2,
	salesforce: 2,
};
export default function StackConstellation() {
	const [selectedId, setSelectedId] = useState<TechnologyId | null>(null);
	const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
	const [reducedMotion, setReducedMotion] = useState(false);
	const [focusWithin, setFocusWithin] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);
	const viewportSizeRef = useRef(viewportSize);
	const nodeMotionRefs = useRef(new Map<TechnologyId, HTMLSpanElement>());
	const nodeButtonRefs = useRef(new Map<TechnologyId, HTMLButtonElement>());
	const entryButtonRefs = useRef(new Map<TechnologyId, HTMLButtonElement>());
	const lastEntryIdRef = useRef<TechnologyId | null>(null);
	const lineRefs = useRef(new Map<string, SVGLineElement>());
	const elapsedRef = useRef(0);
	const lastFrameAtRef = useRef<number | null>(null);
	const motionKeyRef = useRef<string | null>(null);
	const keyboardInputRef = useRef(false);
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
	const orbitTracks = useMemo(() => {
		if (!selectedId) return [];
		const nodeClearance = viewportSize.width < 640 ? 52 : 64;
		const maxRadiusX = Math.min(
			viewportSize.width * 0.43,
			viewportSize.width / 2 - nodeClearance,
		);
		const maxRadiusY = Math.min(viewportSize.height * 0.4, viewportSize.height / 2 - 72);
		return Array.from({ length: 3 }, (_, index) => ({
			radiusX: maxRadiusX * (0.67 + index * 0.165),
			radiusY: maxRadiusY * (0.67 + index * 0.165),
		}));
	}, [selectedId, viewportSize.height, viewportSize.width]);

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
		if (selectedId) {
			nodeButtonRefs.current.get(selectedId)?.focus();
			return;
		}
		if (lastEntryIdRef.current) entryButtonRefs.current.get(lastEntryIdRef.current)?.focus();
	}, [selectedId]);

	useEffect(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const onChange = () => setReducedMotion(reducedMotion.matches);
		onChange();
		reducedMotion.addEventListener('change', onChange);
		return () => reducedMotion.removeEventListener('change', onChange);
	}, []);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport || !viewportSize.width || !viewportSize.height) return;
		let isIntersecting = false;
		let frameId = 0;
		const paused = focusWithin;
		const motionKey = selectedId ?? 'overview';
		if (motionKeyRef.current !== motionKey) {
			motionKeyRef.current = motionKey;
			elapsedRef.current = 0;
		}

		const setNodeOffsets = (
			offsets: Partial<Record<TechnologyId, [number, number]>>,
			floatingIds: Set<TechnologyId>,
		) => {
			technologies.forEach((technology) => {
				if (!floatingIds.has(technology.id)) {
					nodeMotionRefs.current.get(technology.id)?.style.removeProperty('transform');
					return;
				}
				const [offsetX, offsetY] = offsets[technology.id] ?? [0, 0];
				nodeMotionRefs.current
					.get(technology.id)
					?.style.setProperty('transform', `translate3d(${offsetX}px, ${offsetY}px, 0)`);
			});
		};

		const render = () => {
			const size = viewportSizeRef.current;
			const offsets: Partial<Record<TechnologyId, [number, number]>> = {};
			const movingIds = new Set<TechnologyId>();
			if (selectedId && orbitTracks.length) {
				const centerX = size.width / 2;
				const centerY = size.height / 2;
				const selectedPosition = defaultPositions[selectedId];
				movingIds.add(selectedId);
				offsets[selectedId] = [
					centerX - (selectedPosition[0] / 100) * size.width,
					centerY - (selectedPosition[1] / 100) * size.height,
				];
				const neighbors = selectedAndNeighbors.slice(1);
				neighbors.forEach((id, index) => {
					const ring = masteryLevels[id];
					const phase = (index / neighbors.length) * Math.PI * 2 - 0.4;
					const angle =
						phase + (reducedMotion ? 0 : elapsedRef.current / 180_000) * Math.PI * 2;
					const track = orbitTracks[ring];
					const position = defaultPositions[id];
					movingIds.add(id);
					offsets[id] = [
						centerX +
							Math.cos(angle) * track.radiusX -
							(position[0] / 100) * size.width,
						centerY +
							Math.sin(angle) * track.radiusY -
							(position[1] / 100) * size.height,
					];
				});
			}
			setNodeOffsets(offsets, movingIds);
		};

		const stop = () => {
			if (!frameId) return;
			cancelAnimationFrame(frameId);
			frameId = 0;
			lastFrameAtRef.current = null;
		};
		const sync = () => {
			const shouldAnimate =
				Boolean(selectedId) &&
				isIntersecting &&
				document.visibilityState === 'visible' &&
				!reducedMotion &&
				!paused;
			if (!shouldAnimate) return stop();
			if (!frameId) {
				const tick = (now: number) => {
					if (lastFrameAtRef.current !== null)
						elapsedRef.current += now - lastFrameAtRef.current;
					lastFrameAtRef.current = now;
					render();
					frameId = requestAnimationFrame(tick);
				};
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
		observer.observe(viewport);
		render();
		document.addEventListener('visibilitychange', sync);
		sync();

		return () => {
			stop();
			observer.disconnect();
			document.removeEventListener('visibilitychange', sync);
		};
	}, [focusWithin, orbitTracks, reducedMotion, selectedAndNeighbors, selectedId, viewportSize]);
	const visibleIds = new Set<TechnologyId>(selectedId ? selectedAndNeighbors : []);

	return (
		<div className="constellation" data-selected={Boolean(selectedId)}>
			<div className="constellation__toolbar">
				<p aria-live="polite" className="constellation__status">
					{selected
						? `Exploration : ${selected.label} · ${masteryLabels[masteryLevels[selected.id]]}`
						: 'Choisissez une galaxie à explorer'}
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
			{selectedId && (
				<p className="constellation__legend">
					De l’orbite intérieure à l’extérieure : Expertise · À l’aise · Pratique ciblée
				</p>
			)}

			<div
				className="constellation__viewport"
				ref={viewportRef}
				onPointerDownCapture={() => {
					keyboardInputRef.current = false;
					setFocusWithin(false);
				}}
				onKeyDownCapture={() => {
					keyboardInputRef.current = true;
					setFocusWithin(true);
				}}
				onFocusCapture={(event) => {
					if (
						keyboardInputRef.current ||
						(event.target instanceof HTMLElement &&
							event.target.matches(':focus-visible'))
					) {
						setFocusWithin(true);
					}
				}}
				onBlurCapture={(event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
				}}
			>
				<div className="constellation__world">
					<div className="constellation__entry-galaxies">
						{entryGalaxies.map((galaxy) => {
							const technology = byId.get(galaxy.id)!;
							const entryPosition =
								viewportSize.width < 672 ? galaxy.mobilePosition : galaxy.position;
							return (
								<button
									className="constellation__galaxy"
									data-chosen={selectedId === galaxy.id}
									aria-hidden={Boolean(selectedId)}
									key={galaxy.id}
									onClick={() => {
										lastEntryIdRef.current = galaxy.id;
										setSelectedId(galaxy.id);
									}}
									ref={(node) => {
										if (node) entryButtonRefs.current.set(galaxy.id, node);
										else entryButtonRefs.current.delete(galaxy.id);
									}}
									style={
										{
											'--galaxy-x': `${galaxy.position[0]}%`,
											'--galaxy-y': `${galaxy.position[1]}%`,
											'--galaxy-mobile-x': `${galaxy.mobilePosition[0]}%`,
											'--galaxy-mobile-y': `${galaxy.mobilePosition[1]}%`,
											'--galaxy-center-x': `${
												((50 - entryPosition[0]) / 100) * viewportSize.width
											}px`,
											'--galaxy-center-y': `${
												((50 - entryPosition[1]) / 100) *
												viewportSize.height
											}px`,
											'--galaxy-rotation': `${galaxy.rotation}deg`,
											'--galaxy-scale': galaxy.scale,
										} as CSSProperties
									}
									tabIndex={selectedId ? -1 : 0}
									type="button"
								>
									<span
										aria-hidden="true"
										className="constellation__galaxy-cloud"
									/>
									<span className="constellation__galaxy-nucleus">
										<span className="constellation__icon">
											{technology.icon}
										</span>
									</span>
									<span className="constellation__galaxy-label">
										{technology.label}
									</span>
									<span className="constellation__galaxy-cue">Explorer</span>
								</button>
							);
						})}
					</div>
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
						{orbitTracks.map((track, index) => (
							<ellipse
								key={`orbit-${index}`}
								className="constellation__orbit"
								cx="50%"
								cy="50%"
								rx={track.radiusX}
								ry={track.radiusY}
							/>
						))}
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
						const preview = false;
						const dimmed = Boolean(selectedId && !visible);
						const isSelected = selectedId === technology.id;
						const masteryLabel = masteryLabels[masteryLevels[technology.id]];

						return (
							<button
								className="constellation__node"
								data-visible={visible}
								data-preview={preview}
								data-secondary={!technology.primary}
								data-dimmed={dimmed}
								data-selected={isSelected}
								aria-hidden={!visible}
								aria-label={`${technology.label} — ${masteryLabel}`}
								key={technology.id}
								ref={(node) => {
									if (node) nodeButtonRefs.current.set(technology.id, node);
									else nodeButtonRefs.current.delete(technology.id);
								}}
								onClick={() => setSelectedId(technology.id)}
								style={
									{
										'--node-x': `${position[0]}%`,
										'--node-y': `${position[1]}%`,
									} as CSSProperties
								}
								tabIndex={visible ? 0 : -1}
								title={`${technology.label} — ${masteryLabel}`}
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
									{isSelected && (
										<span className="constellation__mastery">
											{masteryLabel}
										</span>
									)}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

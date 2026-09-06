import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { StackCatalog, StackConstellationText } from '../../content/stack';
import { entryGalaxies, getTechnologies, masteryOrbit } from './StackConstellationVisuals';

import '../../styles/stack-constellation.css';

type TechnologyId = string;

export default function StackConstellation({
	catalog,
	text,
}: {
	catalog: StackCatalog;
	text: StackConstellationText;
}) {
	const technologies = useMemo(() => getTechnologies(catalog), [catalog]);
	const byId = useMemo(
		() => new Map(technologies.map((technology) => [technology.id, technology])),
		[technologies],
	);
	const defaultPositions = useMemo(
		() =>
			Object.fromEntries(
				technologies.map((technology) => [technology.id, technology.position]),
			),
		[technologies],
	);
	const connections = catalog.connections;
	const [selectedId, setSelectedId] = useState<TechnologyId | null>(null);
	const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
	const [reducedMotion, setReducedMotion] = useState(false);
	const [focusWithin, setFocusWithin] = useState(false);
	const [entryMotionEnabled, setEntryMotionEnabled] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);
	const viewportSizeRef = useRef(viewportSize);
	const nodeMotionRefs = useRef(new Map<TechnologyId, HTMLSpanElement>());
	const nodeButtonRefs = useRef(new Map<TechnologyId, HTMLElement>());
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
	}, [connections, selectedId]);
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
					const ring = masteryOrbit[byId.get(id)!.mastery];
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
			setEntryMotionEnabled(
				!selectedId &&
					isIntersecting &&
					document.visibilityState === 'visible' &&
					!reducedMotion &&
					!paused,
			);
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
	}, [
		byId,
		defaultPositions,
		focusWithin,
		orbitTracks,
		reducedMotion,
		selectedAndNeighbors,
		selectedId,
		technologies,
		viewportSize,
	]);
	const visibleIds = new Set<TechnologyId>(selectedId ? selectedAndNeighbors : []);

	return (
		<div
			className="constellation"
			data-entry-motion={entryMotionEnabled}
			data-selected={Boolean(selectedId)}
		>
			<div className="constellation__toolbar">
				<p aria-live="polite" className="constellation__status">
					{selected
						? `${text.exploration} : ${selected.label} · ${text.mastery[selected.mastery]}`
						: text.chooseGalaxy}
				</p>
				{selectedId && (
					<button
						className="constellation__reset"
						type="button"
						onClick={() => setSelectedId(null)}
					>
						{text.reset}
					</button>
				)}
			</div>
			{selectedId && (
				<p className="constellation__legend">
					{text.orbitLegend} : {text.mastery.expertise} · {text.mastery.comfortable} ·{' '}
					{text.mastery.focused}
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
											'--galaxy-drift-x': `${galaxy.drift[0]}px`,
											'--galaxy-drift-y': `${galaxy.drift[1]}px`,
											'--galaxy-drift-duration': `${galaxy.driftDuration}s`,
											'--galaxy-drift-delay': `${galaxy.driftDelay}s`,
											'--galaxy-cloud-sway': `${galaxy.cloudSway}deg`,
											'--galaxy-cloud-sway-duration': `${galaxy.cloudSwayDuration}s`,
											'--galaxy-cloud-sway-delay': `${galaxy.cloudSwayDelay}s`,
										} as CSSProperties
									}
									tabIndex={selectedId ? -1 : 0}
									type="button"
								>
									<span className="constellation__galaxy-drift">
										<span
											aria-hidden="true"
											className="constellation__galaxy-cloud-spin"
										>
											<span className="constellation__galaxy-cloud" />
										</span>
										<span className="constellation__galaxy-nucleus">
											<span className="constellation__icon">
												{technology.icon}
											</span>
										</span>
										<span className="constellation__galaxy-label">
											{technology.label}
										</span>
										<span className="constellation__galaxy-cue">
											{text.explore}
										</span>
									</span>
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
						const masteryLabel = text.mastery[technology.mastery];
						const neighbors = [
							...new Set(
								connections.flatMap(([from, to]) => {
									if (from === technology.id) return [to];
									if (to === technology.id) return [from];
									return [];
								}),
							),
						];
						const canExplore =
							visible &&
							!isSelected &&
							neighbors.length >= 3 &&
							neighbors.some((id) => !visibleIds.has(id));
						const Node = canExplore ? 'button' : 'span';

						return (
							<Node
								className="constellation__node"
								data-visible={visible}
								data-preview={preview}
								data-secondary={!technology.primary}
								data-dimmed={dimmed}
								data-selected={isSelected}
								data-interactive={canExplore}
								aria-hidden={!visible}
								aria-label={`${technology.label} — ${masteryLabel}${
									canExplore ? ` — ${text.explore}` : ''
								}`}
								key={technology.id}
								ref={(node) => {
									if (node) nodeButtonRefs.current.set(technology.id, node);
									else nodeButtonRefs.current.delete(technology.id);
								}}
								{...(canExplore
									? {
											onClick: () => setSelectedId(technology.id),
											type: 'button',
										}
									: {})}
								style={
									{
										'--node-x': `${position[0]}%`,
										'--node-y': `${position[1]}%`,
									} as CSSProperties
								}
								tabIndex={canExplore ? 0 : isSelected ? -1 : undefined}
								title={`${technology.label} — ${masteryLabel}`}
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
							</Node>
						);
					})}
				</div>
			</div>
		</div>
	);
}

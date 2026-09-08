import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { StackContent } from '../../content/home';
import { directNeighbors, entryGalaxies, technologies, type TechnologyId } from './stackCatalog';
import { useStackConstellationMotion } from './useStackConstellationMotion';

import '../../styles/stack-constellation.css';

type StackConstellationText = StackContent['constellation'];
function displayLabel(technology: (typeof technologies)[number], text: StackConstellationText) {
	return technology.id === 'other-tools' ? text.otherTools : technology.label;
}

function GalaxyEntrance({ technology }: { technology: (typeof entryGalaxies)[number] }) {
	return (
		<span
			className={`constellation__galaxy-entrance ${
				'markSize' in technology && technology.markSize === 'pair'
					? 'constellation__galaxy-entrance--pair'
					: ''
			}`}
		>
			<span className="constellation__galaxy-rings">
				<span className="constellation__galaxy-ring constellation__galaxy-ring--back" />
				<span className="constellation__galaxy-ring constellation__galaxy-ring--middle" />
				<span className="constellation__galaxy-ring constellation__galaxy-ring--front" />
			</span>
			<span aria-hidden="true" className="constellation__galaxy-icon">
				{technology.mark}
			</span>
		</span>
	);
}

export default function StackConstellation({ text }: { text: StackConstellationText }) {
	const byId = useMemo(
		() => new Map(technologies.map((technology) => [technology.id, technology])),
		[technologies],
	);
	const [selectedId, setSelectedId] = useState<TechnologyId | null>(null);
	const [handoffId, setHandoffId] = useState<TechnologyId | null>(null);
	const [handoffReady, setHandoffReady] = useState(false);
	const [handoffComplete, setHandoffComplete] = useState(false);
	const [focusWithin, setFocusWithin] = useState(false);
	const nodeButtonRefs = useRef(new Map<TechnologyId, HTMLElement>());
	const entryButtonRefs = useRef(new Map<TechnologyId, HTMLButtonElement>());
	const lastEntryIdRef = useRef<TechnologyId | null>(null);
	const keyboardInputRef = useRef(false);
	const handoffViewportRef = useRef<string | null>(null);
	const selected = selectedId ? byId.get(selectedId) : undefined;
	const selectedAndNeighbors = useMemo(() => {
		if (!selectedId) return [];
		return [selectedId, ...directNeighbors(selectedId)];
	}, [selectedId]);
	const {
		entryMotionEnabled,
		nodeMotionRefs,
		orbitTracks,
		reducedMotion,
		viewportRef,
		viewportSize,
	} = useStackConstellationMotion({
		technologies,
		selectedId,
		paused: focusWithin,
	});
	const visibleIds = new Set<TechnologyId>(selectedId ? selectedAndNeighbors : []);
	const freezeGalaxyDrift = (id: TechnologyId) => {
		const button = entryButtonRefs.current.get(id);
		const drift = button?.querySelector<HTMLElement>('.constellation__galaxy-drift');
		const planet = button?.querySelector<HTMLElement>('.constellation__galaxy-entrance');
		const viewport = viewportRef.current;
		if (!button || !drift || !planet || !viewport) return;

		const transform = window.getComputedStyle(drift).transform;
		if (transform !== 'none') drift.style.transform = transform;
		const planetRect = planet.getBoundingClientRect();
		const viewportRect = viewport.getBoundingClientRect();
		button.style.setProperty(
			'--handoff-x',
			`${viewportRect.left + viewportRect.width / 2 - (planetRect.left + planetRect.width / 2)}px`,
		);
		button.style.setProperty(
			'--handoff-y',
			`${viewportRect.top + viewportRect.height / 2 - (planetRect.top + planetRect.height / 2)}px`,
		);
		setHandoffId(id);
		setHandoffReady(false);
		setHandoffComplete(false);
	};
	const resetSelection = () => {
		entryButtonRefs.current.forEach((button) => {
			const drift = button.querySelector<HTMLElement>('.constellation__galaxy-drift');
			drift?.style.removeProperty('transform');
			button.style.removeProperty('--handoff-x');
			button.style.removeProperty('--handoff-y');
			button.style.removeProperty('--handoff-scale');
		});
		setHandoffId(null);
		setHandoffReady(false);
		setHandoffComplete(false);
		setSelectedId(null);
	};

	useLayoutEffect(() => {
		if (!selectedId || handoffId !== selectedId || handoffReady) return;
		const button = entryButtonRefs.current.get(selectedId);
		const planet = button?.querySelector<HTMLElement>('.constellation__galaxy-entrance');
		const targetMotion = nodeMotionRefs.current.get(selectedId);
		const targetIcon = nodeButtonRefs.current
			.get(selectedId)
			?.querySelector<HTMLElement>('.constellation__icon');
		const viewport = viewportRef.current;
		if (!button || !planet || !targetMotion || !targetIcon || !viewport) return;

		const planetRect = planet.getBoundingClientRect();
		const iconRect = targetIcon.getBoundingClientRect();
		const motionRect = targetMotion.getBoundingClientRect();
		const viewportRect = viewport.getBoundingClientRect();
		const targetX =
			viewportRect.left +
			viewportRect.width / 2 +
			(iconRect.left + iconRect.width / 2 - (motionRect.left + motionRect.width / 2));
		const targetY =
			viewportRect.top +
			viewportRect.height / 2 +
			(iconRect.top + iconRect.height / 2 - (motionRect.top + motionRect.height / 2));
		button.style.setProperty(
			'--handoff-x',
			`${targetX - (planetRect.left + planetRect.width / 2)}px`,
		);
		button.style.setProperty(
			'--handoff-y',
			`${targetY - (planetRect.top + planetRect.height / 2)}px`,
		);
		button.style.setProperty('--handoff-scale', String(iconRect.width / planetRect.width));
		handoffViewportRef.current = `${viewportSize.width}:${viewportSize.height}`;
		setHandoffReady(true);
		setHandoffComplete(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
	}, [handoffId, handoffReady, selectedId, viewportSize, viewportRef, nodeMotionRefs]);

	useEffect(() => {
		if (!handoffReady) return;
		const viewportKey = `${viewportSize.width}:${viewportSize.height}`;
		if (handoffViewportRef.current === viewportKey) return;
		setHandoffId(null);
		setHandoffReady(false);
		setHandoffComplete(false);
	}, [handoffReady, viewportSize]);

	useEffect(() => {
		if (!handoffReady || reducedMotion) return;
		const timeout = window.setTimeout(() => setHandoffComplete(true), 580);
		return () => window.clearTimeout(timeout);
	}, [handoffReady, reducedMotion]);

	useEffect(() => {
		if (selectedId) {
			nodeButtonRefs.current.get(selectedId)?.focus({ preventScroll: true });
			return;
		}
		if (lastEntryIdRef.current) entryButtonRefs.current.get(lastEntryIdRef.current)?.focus();
	}, [selectedId]);

	return (
		<div
			className="constellation"
			data-entry-motion={entryMotionEnabled}
			data-handoff-complete={handoffComplete}
			data-handoff-persistent={
				handoffId === selectedId && selected ? 'mark' in selected : false
			}
			data-handoff-ready={handoffReady}
			data-selected={Boolean(selectedId)}
			data-selected-id={selectedId ?? undefined}
		>
			<div className="constellation__toolbar">
				<p aria-live="polite" className="constellation__status">
					{selected
						? `${text.exploration} : ${displayLabel(selected, text)}`
						: text.chooseGalaxy}
				</p>
				{selectedId && (
					<button className="constellation__reset" type="button" onClick={resetSelection}>
						{text.reset}
					</button>
				)}
			</div>
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
							const { galaxy: galaxyMotion } = galaxy;
							const isChosen = handoffId === galaxy.id && selectedId === handoffId;
							return (
								<button
									className="constellation__galaxy"
									data-chosen={isChosen}
									aria-hidden={Boolean(selectedId)}
									key={galaxy.id}
									onClick={() => {
										lastEntryIdRef.current = galaxy.id;
										freezeGalaxyDrift(galaxy.id);
										setSelectedId(galaxy.id);
									}}
									ref={(node) => {
										if (node) entryButtonRefs.current.set(galaxy.id, node);
										else entryButtonRefs.current.delete(galaxy.id);
									}}
									style={
										{
											'--galaxy-x': `${galaxyMotion.position[0]}%`,
											'--galaxy-y': `${galaxyMotion.position[1]}%`,
											'--galaxy-mobile-x': `${galaxyMotion.mobilePosition[0]}%`,
											'--galaxy-mobile-y': `${galaxyMotion.mobilePosition[1]}%`,
											'--galaxy-scale': galaxyMotion.scale,
											'--galaxy-drift-x': `${galaxyMotion.drift[0]}px`,
											'--galaxy-drift-y': `${galaxyMotion.drift[1]}px`,
											'--galaxy-drift-duration': `${galaxyMotion.driftDuration}s`,
											'--galaxy-drift-delay': `${galaxyMotion.driftDelay}s`,
										} as CSSProperties
									}
									tabIndex={selectedId ? -1 : 0}
									type="button"
								>
									<span className="constellation__galaxy-drift">
										<GalaxyEntrance technology={galaxy} />
										<span className="constellation__galaxy-label">
											{displayLabel(galaxy, text)}
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
					<div aria-hidden="true" className="constellation__accent-stars">
						<span />
						<span />
						<span />
						<span />
						<span />
					</div>
					<svg
						className="constellation__orbits"
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
					</svg>

					{technologies.map((technology) => {
						const position = technology.position;
						const visible = visibleIds.has(technology.id);
						const isSelected = selectedId === technology.id;
						const neighbors = directNeighbors(technology.id);
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
								data-secondary={!('galaxy' in technology)}
								data-selected={isSelected}
								data-interactive={canExplore}
								aria-hidden={!visible}
								aria-label={`${displayLabel(technology, text)}${canExplore ? ` — ${text.explore}` : ''}`}
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
								title={displayLabel(technology, text)}
							>
								<span
									className="constellation__node-motion"
									ref={(node) => {
										if (node) nodeMotionRefs.current.set(technology.id, node);
										else nodeMotionRefs.current.delete(technology.id);
									}}
								>
									<span className="constellation__icon">
										{isSelected && 'mark' in technology
											? technology.mark
											: technology.icon}
									</span>
									<span className="constellation__label">
										{displayLabel(technology, text)}
									</span>
								</span>
							</Node>
						);
					})}
				</div>
			</div>
		</div>
	);
}

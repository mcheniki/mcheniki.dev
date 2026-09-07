import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { StackContent } from '../../content/home';
import { siJavascript, siPhp, siReact, siTypescript, siWordpress } from 'simple-icons';
import { connections, entryGalaxies, technologies, type TechnologyId } from './stackCatalog';
import { useStackConstellationMotion } from './useStackConstellationMotion';

import '../../styles/stack-constellation.css';

type StackConstellationText = StackContent['constellation'];
type StackConstellationVariant =
	'portal' | 'realistic' | 'outline' | 'gyroscope' | 'crescent' | 'gyroscope-portal';

function isPortalVariant(variant: StackConstellationVariant) {
	return (
		variant === 'portal' ||
		variant === 'outline' ||
		variant === 'gyroscope' ||
		variant === 'crescent' ||
		variant === 'gyroscope-portal'
	);
}

function hasPortalBrand(id: TechnologyId) {
	return id === 'php' || id === 'wordpress' || id === 'javascript' || id === 'react';
}

function PortalBrandMark({ id }: { id: TechnologyId }) {
	if (id === 'javascript') {
		return (
			<span className="constellation__portal-brand constellation__portal-brand--pair">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d={siJavascript.path} />
				</svg>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d={siTypescript.path} />
				</svg>
			</span>
		);
	}

	const brands = { php: siPhp, wordpress: siWordpress, react: siReact };
	const brand = brands[id as keyof typeof brands];

	if (!brand) return null;

	return (
		<svg className="constellation__portal-brand" viewBox="0 0 24 24" aria-hidden="true">
			<path d={brand.path} />
		</svg>
	);
}

function PortalEntrance({ id, variant }: { id: TechnologyId; variant: StackConstellationVariant }) {
	return (
		<span
			className={[
				'constellation__portal-planet',
				`constellation__portal-planet--${variant}`,
				id === 'javascript' && variant !== 'portal'
					? 'constellation__portal-planet--pair'
					: '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			{variant === 'portal' && (
				<span className="constellation__portal-plane">
					<span className="constellation__portal-disc constellation__portal-disc--outer" />
					<span className="constellation__portal-disc constellation__portal-disc--middle" />
					<span className="constellation__portal-disc constellation__portal-disc--inner" />
				</span>
			)}
			{variant === 'outline' && (
				<span className="constellation__portal-plane constellation__portal-plane--outline">
					<span className="constellation__portal-ring constellation__portal-ring--outer" />
					<span className="constellation__portal-ring constellation__portal-ring--middle" />
					<span className="constellation__portal-ring constellation__portal-ring--inner" />
				</span>
			)}
			{(variant === 'gyroscope' || variant === 'gyroscope-portal') && (
				<span
					className={[
						'constellation__portal-plane',
						'constellation__portal-plane--gyroscope',
						variant === 'gyroscope-portal'
							? 'constellation__portal-plane--gyroscope-portal'
							: '',
					]
						.filter(Boolean)
						.join(' ')}
				>
					{variant === 'gyroscope-portal' && (
						<span className="constellation__portal-banded-annulus">
							<span className="constellation__portal-band constellation__portal-band--outer" />
							<span className="constellation__portal-band constellation__portal-band--middle" />
							<span className="constellation__portal-band constellation__portal-band--inner" />
						</span>
					)}
					<span className="constellation__portal-gyro-ring constellation__portal-gyro-ring--back" />
					<span className="constellation__portal-gyro-ring constellation__portal-gyro-ring--middle" />
					<span className="constellation__portal-gyro-ring constellation__portal-gyro-ring--front" />
				</span>
			)}
			{variant === 'crescent' && (
				<span className="constellation__portal-plane constellation__portal-plane--crescent">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<defs>
							<mask id={`constellation-crescent-${id}`}>
								<rect width="100" height="100" fill="white" />
								<circle cx="57" cy="44" r="33" fill="black" />
							</mask>
						</defs>
						<circle
							cx="50"
							cy="50"
							r="43"
							mask={`url(#constellation-crescent-${id})`}
						/>
					</svg>
					<span className="constellation__portal-crescent-orbit" />
				</span>
			)}
			<span aria-hidden="true" className="constellation__portal-icon">
				<PortalBrandMark id={id} />
			</span>
		</span>
	);
}

export default function StackConstellation({
	text,
	variant = 'realistic',
}: {
	text: StackConstellationText;
	variant?: StackConstellationVariant;
}) {
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
		return [
			selectedId,
			...connections.flatMap(([from, to]) => {
				if (from === selectedId) return [to];
				if (to === selectedId) return [from];
				return [];
			}),
		];
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
		selectedAndNeighbors,
		paused: focusWithin,
	});
	const visibleIds = new Set<TechnologyId>(selectedId ? selectedAndNeighbors : []);
	const freezePortalDrift = (id: TechnologyId) => {
		if (!isPortalVariant(variant)) return;
		const button = entryButtonRefs.current.get(id);
		const drift = button?.querySelector<HTMLElement>('.constellation__galaxy-drift');
		const planet = button?.querySelector<HTMLElement>('.constellation__portal-planet');
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
		if (!isPortalVariant(variant) || !selectedId || handoffId !== selectedId || handoffReady)
			return;
		const button = entryButtonRefs.current.get(selectedId);
		const planet = button?.querySelector<HTMLElement>('.constellation__portal-planet');
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
	}, [handoffId, handoffReady, selectedId, variant, viewportSize, viewportRef, nodeMotionRefs]);

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
				isPortalVariant(variant) && handoffId === selectedId && selectedId
					? hasPortalBrand(selectedId)
					: false
			}
			data-handoff-ready={handoffReady}
			data-selected={Boolean(selectedId)}
			data-selected-id={selectedId ?? undefined}
			data-study-variant={variant}
			data-variant={variant === 'gyroscope-portal' ? 'gyroscope' : variant}
		>
			<div className="constellation__toolbar">
				<p aria-live="polite" className="constellation__status">
					{selected
						? `${text.exploration} : ${selected.label} · ${text.mastery[selected.mastery]}`
						: text.chooseGalaxy}
				</p>
				{selectedId && (
					<button className="constellation__reset" type="button" onClick={resetSelection}>
						{text.reset}
					</button>
				)}
			</div>
			{isPortalVariant(variant) ? (
				<p
					aria-hidden={!selectedId}
					className="constellation__legend"
					data-visible={Boolean(selectedId)}
				>
					{text.orbitLegend} : {text.mastery.expertise} · {text.mastery.comfortable} ·{' '}
					{text.mastery.focused}
				</p>
			) : (
				selectedId && (
					<p className="constellation__legend">
						{text.orbitLegend} : {text.mastery.expertise} · {text.mastery.comfortable} ·{' '}
						{text.mastery.focused}
					</p>
				)
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
							const { galaxy: galaxyMotion } = galaxy;
							const isChosen = isPortalVariant(variant)
								? handoffId === galaxy.id && selectedId === handoffId
								: selectedId === galaxy.id;
							const entryPosition =
								viewportSize.width < 672
									? galaxyMotion.mobilePosition
									: galaxyMotion.position;
							return (
								<button
									className="constellation__galaxy"
									data-chosen={isChosen}
									aria-hidden={Boolean(selectedId)}
									key={galaxy.id}
									onClick={() => {
										lastEntryIdRef.current = galaxy.id;
										freezePortalDrift(galaxy.id);
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
											'--galaxy-center-x': `${
												((50 - entryPosition[0]) / 100) * viewportSize.width
											}px`,
											'--galaxy-center-y': `${
												((50 - entryPosition[1]) / 100) *
												viewportSize.height
											}px`,
											'--galaxy-rotation': `${galaxyMotion.rotation}deg`,
											'--galaxy-scale': galaxyMotion.scale,
											'--galaxy-drift-x': `${galaxyMotion.drift[0]}px`,
											'--galaxy-drift-y': `${galaxyMotion.drift[1]}px`,
											'--galaxy-drift-duration': `${galaxyMotion.driftDuration}s`,
											'--galaxy-drift-delay': `${galaxyMotion.driftDelay}s`,
											'--galaxy-cloud-sway': `${galaxyMotion.cloudSway}deg`,
											'--galaxy-cloud-sway-duration': `${galaxyMotion.cloudSwayDuration}s`,
											'--galaxy-cloud-sway-delay': `${galaxyMotion.cloudSwayDelay}s`,
										} as CSSProperties
									}
									tabIndex={selectedId ? -1 : 0}
									type="button"
								>
									<span className="constellation__galaxy-drift">
										{isPortalVariant(variant) ? (
											<PortalEntrance id={galaxy.id} variant={variant} />
										) : (
											<span
												aria-hidden="true"
												className="constellation__galaxy-cloud-spin"
											>
												<span className="constellation__galaxy-cloud" />
											</span>
										)}
										{variant === 'realistic' && (
											<span className="constellation__galaxy-nucleus">
												<span className="constellation__icon">
													{galaxy.icon}
												</span>
											</span>
										)}
										<span className="constellation__galaxy-label">
											{galaxy.label}
										</span>
										{variant === 'realistic' && (
											<span className="constellation__galaxy-cue">
												{text.explore}
											</span>
										)}
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
					{isPortalVariant(variant) && (
						<div aria-hidden="true" className="constellation__portal-stars">
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
					)}
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
								data-secondary={!('galaxy' in technology)}
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
									<span className="constellation__icon">
										{isPortalVariant(variant) &&
										isSelected &&
										hasPortalBrand(technology.id) ? (
											<PortalBrandMark id={technology.id} />
										) : (
											technology.icon
										)}
									</span>
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

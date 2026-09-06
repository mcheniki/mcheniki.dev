import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { StackContent } from '../../content/home';
import { connections, entryGalaxies, technologies, type TechnologyId } from './stackCatalog';
import { useStackConstellationMotion } from './useStackConstellationMotion';

import '../../styles/stack-constellation.css';

type StackConstellationText = StackContent['constellation'];

export default function StackConstellation({ text }: { text: StackConstellationText }) {
	const byId = useMemo(
		() => new Map(technologies.map((technology) => [technology.id, technology])),
		[technologies],
	);
	const [selectedId, setSelectedId] = useState<TechnologyId | null>(null);
	const [focusWithin, setFocusWithin] = useState(false);
	const nodeButtonRefs = useRef(new Map<TechnologyId, HTMLElement>());
	const entryButtonRefs = useRef(new Map<TechnologyId, HTMLButtonElement>());
	const lastEntryIdRef = useRef<TechnologyId | null>(null);
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
	const { entryMotionEnabled, nodeMotionRefs, orbitTracks, viewportRef, viewportSize } =
		useStackConstellationMotion({
			technologies,
			selectedId,
			selectedAndNeighbors,
			paused: focusWithin,
		});
	const visibleIds = new Set<TechnologyId>(selectedId ? selectedAndNeighbors : []);

	useEffect(() => {
		if (selectedId) {
			nodeButtonRefs.current.get(selectedId)?.focus();
			return;
		}
		if (lastEntryIdRef.current) entryButtonRefs.current.get(lastEntryIdRef.current)?.focus();
	}, [selectedId]);

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
							const { galaxy: galaxyMotion } = galaxy;
							const entryPosition =
								viewportSize.width < 672
									? galaxyMotion.mobilePosition
									: galaxyMotion.position;
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
										<span
											aria-hidden="true"
											className="constellation__galaxy-cloud-spin"
										>
											<span className="constellation__galaxy-cloud" />
										</span>
										<span className="constellation__galaxy-nucleus">
											<span className="constellation__icon">
												{galaxy.icon}
											</span>
										</span>
										<span className="constellation__galaxy-label">
											{galaxy.label}
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

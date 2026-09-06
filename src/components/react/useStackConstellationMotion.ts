import { useEffect, useMemo, useRef, useState } from 'react';
import { masteryOrbit, type Technology, type TechnologyId } from './StackConstellationVisuals';

type OrbitTrack = {
	radiusX: number;
	radiusY: number;
};

type MotionOptions = {
	technologies: Technology[];
	selectedId: TechnologyId | null;
	selectedAndNeighbors: TechnologyId[];
	paused: boolean;
};

export function useStackConstellationMotion({
	technologies,
	selectedId,
	selectedAndNeighbors,
	paused,
}: MotionOptions) {
	const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
	const [reducedMotion, setReducedMotion] = useState(false);
	const [entryMotionEnabled, setEntryMotionEnabled] = useState(false);
	const viewportRef = useRef<HTMLDivElement>(null);
	const viewportSizeRef = useRef(viewportSize);
	const nodeMotionRefs = useRef(new Map<TechnologyId, HTMLSpanElement>());
	const elapsedRef = useRef(0);
	const lastFrameAtRef = useRef<number | null>(null);
	const motionKeyRef = useRef<TechnologyId | 'overview' | null>(null);
	const byId = useMemo(
		() => new Map(technologies.map((technology) => [technology.id, technology])),
		[technologies],
	);
	const orbitTracks = useMemo<OrbitTrack[]>(() => {
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
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncReducedMotion = () => setReducedMotion(mediaQuery.matches);
		syncReducedMotion();
		mediaQuery.addEventListener('change', syncReducedMotion);
		return () => mediaQuery.removeEventListener('change', syncReducedMotion);
	}, []);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport || !viewportSize.width || !viewportSize.height) return;

		let isIntersecting = false;
		let frameId = 0;
		const motionKey = selectedId ?? 'overview';
		if (motionKeyRef.current !== motionKey) {
			motionKeyRef.current = motionKey;
			elapsedRef.current = 0;
		}

		const render = () => {
			const size = viewportSizeRef.current;
			const offsets: Partial<Record<TechnologyId, [number, number]>> = {};
			const movingIds = new Set<TechnologyId>();
			if (selectedId && orbitTracks.length) {
				const centerX = size.width / 2;
				const centerY = size.height / 2;
				const selectedPosition = byId.get(selectedId)!.position;
				movingIds.add(selectedId);
				offsets[selectedId] = [
					centerX - (selectedPosition[0] / 100) * size.width,
					centerY - (selectedPosition[1] / 100) * size.height,
				];
				selectedAndNeighbors.slice(1).forEach((id, index, neighbors) => {
					const technology = byId.get(id)!;
					const track = orbitTracks[masteryOrbit[technology.mastery]];
					const phase = (index / neighbors.length) * Math.PI * 2 - 0.4;
					const angle =
						phase + (reducedMotion ? 0 : elapsedRef.current / 180_000) * Math.PI * 2;
					const position = technology.position;
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

			technologies.forEach((technology) => {
				const node = nodeMotionRefs.current.get(technology.id);
				if (!node) return;
				if (!movingIds.has(technology.id)) {
					node.style.removeProperty('transform');
					return;
				}
				const [offsetX, offsetY] = offsets[technology.id] ?? [0, 0];
				node.style.setProperty('transform', `translate3d(${offsetX}px, ${offsetY}px, 0)`);
			});
		};

		const stop = () => {
			if (!frameId) return;
			cancelAnimationFrame(frameId);
			frameId = 0;
			lastFrameAtRef.current = null;
		};
		const sync = () => {
			const canMove =
				isIntersecting &&
				document.visibilityState === 'visible' &&
				!reducedMotion &&
				!paused;
			setEntryMotionEnabled(!selectedId && canMove);
			if (!selectedId || !canMove) return stop();
			if (frameId) return;
			const tick = (now: number) => {
				if (lastFrameAtRef.current !== null)
					elapsedRef.current += now - lastFrameAtRef.current;
				lastFrameAtRef.current = now;
				render();
				frameId = requestAnimationFrame(tick);
			};
			frameId = requestAnimationFrame(tick);
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
		orbitTracks,
		paused,
		reducedMotion,
		selectedAndNeighbors,
		selectedId,
		technologies,
		viewportSize,
	]);

	return {
		entryMotionEnabled,
		nodeMotionRefs,
		orbitTracks,
		viewportRef,
		viewportSize,
	};
}

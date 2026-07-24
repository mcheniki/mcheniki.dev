import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import IconReact from '@svgs/react.svg?react';
import IconJS from '@svgs/js.svg?react';
import IconWP from '@svgs/wp.svg?react';
import IconPHP from '@svgs/php.svg?react';
import CardStack from './CardStack';
import type { StackDescriptions } from '../../../i18n/ui';

export type SVGComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Types pour les animations
type AnimationConfig = {
	y: {
		duration: number;
		repeat: number;
		repeatType: 'reverse' | 'loop' | 'mirror';
		ease: string;
		delay: number;
		amount: number;
	};
	hover: {
		transition: {
			type: 'spring';
			stiffness: number;
			damping: number;
		};
	};
};

// Type pour une technologie
type Technology = {
	id: number;
	name: string;
	Icon: SVGComponent;
	description: string;
	connections: number[];
	animation: AnimationConfig;
};

// Type pour les positions
type Position = {
	x: number;
	y: number;
};

type Dimensions = {
	width: number;
	height: number;
};

// Type pour les animations des technologies
type TechAnimations = Record<number, number>;

// Types pour les props des composants
type ConstellationProps = {
	positions: Record<number, Position>;
	technologies: Technology[];
	hoveredTech: Technology | null;
	techAnimations: TechAnimations;
};

type TechBubbleProps = {
	tech: Technology;
	position: Position;
	isHovered: boolean;
	onHover: () => void;
	onLeave: () => void;
	onAnimationUpdate: (value: number) => void;
	techAnimations: TechAnimations;
};

type InfoCardProps = {
	tech: Technology;
};

function createTechnologies(descriptions: StackDescriptions): Technology[] {
	return [
		{
			id: 1,
			name: 'React',
			Icon: IconReact as SVGComponent,
			description: descriptions.react,
			connections: [2, 3],
			animation: {
				y: {
					duration: 3,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 0,
					amount: 10,
				},
				hover: {
					transition: {
						type: 'spring',
						stiffness: 300,
						damping: 10,
					},
				},
			},
		},
		{
			id: 2,
			name: 'JavaScript',
			Icon: IconJS as SVGComponent,
			description: descriptions.javascript,
			connections: [1],
			animation: {
				y: {
					duration: 4,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 0.5,
					amount: 15,
				},
				hover: {
					transition: {
						type: 'spring',
						stiffness: 400,
						damping: 8,
					},
				},
			},
		},
		{
			id: 3,
			name: 'WordPress',
			Icon: IconWP as SVGComponent,
			description: descriptions.wordpress,
			connections: [2, 4],
			animation: {
				y: {
					duration: 3.5,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 1,
					amount: 12,
				},
				hover: {
					transition: {
						type: 'spring',
						stiffness: 350,
						damping: 12,
					},
				},
			},
		},
		{
			id: 4,
			name: 'PHP',
			Icon: IconPHP as SVGComponent,
			description: descriptions.php,
			connections: [3],
			animation: {
				y: {
					duration: 3.2,
					repeat: Infinity,
					repeatType: 'reverse',
					ease: 'easeInOut',
					delay: 1.5,
					amount: 8,
				},
				hover: {
					transition: {
						type: 'spring',
						stiffness: 450,
						damping: 15,
					},
				},
			},
		},
	];
}
const random = Math.floor(Math.random() * (10 - 1) + 1);

const coeffRandom = random % 4 === 0 ? random + 1 : random;

type TechConstellationProps = {
	messages: StackDescriptions;
};

const TechConstellation: React.FC<TechConstellationProps> = ({ messages }) => {
	const technologies = createTechnologies(messages);
	const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: 0,
		height: 0,
	});
	const [techAnimations, setTechAnimations] = useState<TechAnimations>({});

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setDimensions({ width: rect.width, height: rect.height });
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	const updateTechAnimation = (techId: number, value: number) => {
		setTechAnimations((prev) => ({
			...prev,
			[techId]: value,
		}));
	};

	const positions = technologies.reduce<Record<number, Position>>((acc, tech, index) => {
		const radius = Math.min(dimensions.width, dimensions.height) * 0.3;
		const centerX = dimensions.width / 2;
		const centerY = dimensions.height / 2;

		const angle = (index / technologies.length) * coeffRandom * Math.PI;

		acc[tech.id] = {
			x: centerX + Math.cos(angle) * radius,
			y: centerY + Math.sin(angle) * radius,
		};
		return acc;
	}, {});

	return (
		<div className="constellation-container relative h-full w-full">
			<div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
				<div className="top-1/2 left-[10%] z-10 flex h-full max-h-[556px] flex-1 justify-center py-32">
					<div className="bg-stack-frame relative aspect-[447/556] h-full bg-cover bg-no-repeat p-12">
						<div className="relative flex h-full items-center justify-center">
							{hoveredTech ? (
								<InfoCard tech={hoveredTech} />
							) : (
								<p className="text-center text-[0.875rem] font-bold tracking-[1.3px] text-primary-500">
									{messages.hoverPrompt}
								</p>
							)}
						</div>
					</div>
				</div>
				<div ref={containerRef} className="relative h-full flex-1">
					<Constellation
						positions={positions}
						technologies={technologies}
						hoveredTech={hoveredTech}
						techAnimations={techAnimations}
					/>
					{technologies.map((tech) => (
						<TechBubble
							key={tech.id}
							tech={tech}
							position={positions[tech.id]}
							isHovered={hoveredTech?.id === tech.id}
							onHover={() => setHoveredTech(tech)}
							onLeave={() => setHoveredTech(null)}
							onAnimationUpdate={(value) => updateTechAnimation(tech.id, value)}
							techAnimations={techAnimations}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const Constellation: React.FC<ConstellationProps> = ({
	positions,
	technologies,
	techAnimations,
}) => {
	return (
		<motion.svg
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 1,
				pointerEvents: 'none',
			}}
		>
			{technologies.map((tech) =>
				tech.connections.map((connectedTechId) => {
					const startPos = positions[tech.id];
					const endPos = positions[connectedTechId];

					if (startPos && endPos) {
						const startOffset = techAnimations[tech.id] || 0;
						const endOffset = techAnimations[connectedTechId] || 0;

						return (
							<motion.line
								key={`${tech.id}-${connectedTechId}`}
								x1={startPos.x}
								y1={startPos.y + startOffset}
								x2={endPos.x}
								y2={endPos.y + endOffset}
								stroke="hsl(20 100% 51%)"
							/>
						);
					}
					return null;
				}),
			)}
		</motion.svg>
	);
};

const TechBubble: React.FC<TechBubbleProps> = ({
	tech,
	position,
	onHover,
	onLeave,
	onAnimationUpdate,
	techAnimations,
}) => {
	useEffect(() => {
		let rafId: number;

		const animate = () => {
			const time = (Date.now() + tech.animation.y.delay * 1000) / 1000;
			const yPos =
				Math.sin((time * Math.PI) / tech.animation.y.duration) * tech.animation.y.amount;
			onAnimationUpdate(yPos);
			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(rafId);
	}, [tech.animation.y, onAnimationUpdate]);

	return (
		<motion.div
			style={{
				left: position.x - 30,
				top: position.y - 30,
			}}
			className="absolute z-[2] h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-base-800"
			animate={{
				y: techAnimations[tech.id] || 0,
			}}
			whileHover={tech.animation.hover}
			onHoverStart={onHover}
			onHoverEnd={onLeave}
		>
			<tech.Icon width="60" height="60" className="fill-primary-500 hover:fill-base-0" />
		</motion.div>
	);
};

const InfoCard: React.FC<InfoCardProps> = ({ tech }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				<CardStack title={tech.name} description={tech.description} Icon={tech.Icon} />
			</motion.div>
		</AnimatePresence>
	);
};

export default TechConstellation;

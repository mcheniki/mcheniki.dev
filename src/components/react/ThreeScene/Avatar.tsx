import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useFrame, useLoader, useThree } from '@react-three/fiber';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { clamp } from './utils';
import { Group as TweenGroup, Tween, Easing } from '@tweenjs/tween.js';

type AvatarProps = {
	mode?: 'DESKTOP' | 'MOBILE';
	state?: string;
};

export function Avatar({ mode = 'DESKTOP', state = 'DEFAULT' }: AvatarProps) {
	const { scene, animations } = useLoader(GLTFLoader, './avatar/mehdinaut.gltf');

	const mixerRef = useRef<THREE.AnimationMixer | null>(null);
	const tweenGroupRef = useRef(new TweenGroup());
	const { viewport } = useThree();

	useEffect(() => {
		mixerRef.current = new THREE.AnimationMixer(scene);
		const floatingAnim = animations.find(
			(item: THREE.AnimationClip) => item.name === 'Baked-floating',
		);
		if (floatingAnim) {
			mixerRef.current.clipAction(floatingAnim).play();
		}

		return () => {
			if (mixerRef.current) {
				mixerRef.current.stopAllAction();
			}
		};
	}, [scene, animations]);

	useFrame((_, delta) => {
		if (mixerRef.current) {
			mixerRef.current.update(delta);
		}
		tweenGroupRef.current.update();
	});

	useEffect(() => {
		let head: THREE.Bone | undefined;
		const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
			const { innerWidth, innerHeight } = window;
			//put epicenter to 1/4 of screen width to be centered with canvas
			let xPos =
				(-1 * (innerWidth / (mode === 'MOBILE' ? 2 : 4) - clientX)) / innerWidth - 0.3;
			let yPos = (-1 * (innerHeight / 2 - clientY)) / innerHeight + 0.2;

			//need to put Tween within set timeout else Chrome issue
			setTimeout(() => {
				if (!head) {
					console.error('Head reference is missing');
					return;
				}

				const tween = new Tween(head.rotation)
					.to(
						{
							y: clamp(-0.8, 0.8)(xPos),
							z: -1 * clamp(-0.1, 0.2)(yPos),
							x: -1 * head.rotation.z,
						},
						300,
					)
					.easing(Easing.Quintic.Out)
					.start();
				tweenGroupRef.current.add(tween);
			}, 10);
		};

		const startAnimation = () => {
			scene.traverse((item: THREE.Object3D) => {
				if (item.name === 'head' && item.type === 'Bone') {
					head = item as THREE.Bone;
				}
			});

			if (head) {
				window.addEventListener('mousemove', onMouseMove);
			}
		};

		startAnimation();

		scene.scale.set(0, 0, 0);
		scene.rotation.y = Math.PI;
		const scaleTween = new Tween(scene.scale)
			.to({ x: 1, y: 1, z: 1 }, 1500)
			.easing(Easing.Quintic.Out)
			.start();
		tweenGroupRef.current.add(scaleTween);

		const rotationTween = new Tween(scene.rotation)
			.to({ x: 0, y: 0, z: 0 }, 1500)
			.easing(Easing.Quintic.Out)
			.start();
		tweenGroupRef.current.add(rotationTween);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			mixerRef.current?.stopAllAction();
		};
	}, [scene, mode, state]);

	return <primitive object={scene} position={[0, -1, 0]} scale={viewport.width / 7} />;
}

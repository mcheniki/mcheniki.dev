import type { CollectionEntry } from 'astro:content';

export type HomeContent = CollectionEntry<'home'>['data'];
export type HeroContent = HomeContent['hero'];
export type AboutContent = HomeContent['about'];
export type StackContent = HomeContent['stack'];
export type ProjectsContent = HomeContent['projects'];
export type ContactContent = HomeContent['contact'];

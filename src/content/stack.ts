import type { CollectionEntry } from 'astro:content';
import type { StackContent } from './home';

export type StackCatalog = CollectionEntry<'stack'>['data'];
export type StackConstellationText = StackContent['constellation'];

import {
	siPhp,
	siReact,
	siTypescript,
	siJavascript,
	siNodedotjs,
	siTailwindcss,
	siWordpress,
	siAstro,
	siSass,
	siCss,
	siHtml5,
	siGit,
	siDocker,
	siVite,
	siOvh,
	siCpanel,
	siCraftcms,
	siJest,
	siThreedotjs,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const ICON_MAP = {
	php: siPhp,
	react: siReact,
	typescript: siTypescript,
	javascript: siJavascript,
	jest: siJest,
	nodedotjs: siNodedotjs,
	tailwindcss: siTailwindcss,
	wordpress: siWordpress,
	astro: siAstro,
	sass: siSass,
	css: siCss,
	html5: siHtml5,
	git: siGit,
	docker: siDocker,
	vite: siVite,
	ovh: siOvh,
	cpanel: siCpanel,
	craftcms: siCraftcms,
	threedotjs: siThreedotjs,
} as const satisfies Record<string, SimpleIcon>;

export type IconName = keyof typeof ICON_MAP;

export function getIcon(slug: string): SimpleIcon | undefined {
	return ICON_MAP[slug.toLowerCase() as IconName];
}

export function getIconTitle(slug: string): string {
	return ICON_MAP[slug.toLowerCase() as IconName]?.title ?? slug;
}

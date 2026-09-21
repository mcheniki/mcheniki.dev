import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';
import { loadEnv } from 'vite';

const { PUBLIC_URL_WEBSITE } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';
import { getRouteIdFromPath, getRoutePath } from './src/i18n/routes';

export default defineConfig({
	site: PUBLIC_URL_WEBSITE ?? 'http://localhost:4321',
	security: {
		allowedDomains: [
			{
				protocol: 'https',
				hostname: 'mcheniki.dev',
			},
		],
	},
	i18n: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		react({
			include: ['**/react/*'],
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		sitemap({
			serialize(item) {
				const route = getRouteIdFromPath(new URL(item.url).pathname);
				if (!route) return item;

				return {
					...item,
					links: ['fr', 'en'].map((locale) => ({
						lang: locale,
						url: new URL(getRoutePath(locale, route), item.url).href,
					})),
				};
			},
		}),
	],
	adapter: node({
		mode: 'standalone',
	}),
	vite: {
		plugins: [
			svgr({
				include: '**/*.svg?react',
				svgrOptions: {
					plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
					svgoConfig: {
						plugins: [
							'preset-default',
							'removeTitle',
							'removeDesc',
							'removeDoctype',
							'cleanupIds',
						],
					},
				},
			}),
			tailwindcss(),
		],
	},
});

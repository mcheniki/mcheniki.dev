import { defineMiddleware } from 'astro:middleware';
import { getLegacyRoutePath } from './i18n/routes';

export const onRequest = defineMiddleware((context, next) => {
	const destination = getLegacyRoutePath(context.url.pathname);

	if (destination) {
		return context.redirect(`${destination}${context.url.search}`, 301);
	}

	return next();
});

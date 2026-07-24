import { z } from 'zod';

export const formSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, { message: "L'email est requis" })
		.pipe(z.email({ message: 'Email invalide' })),
	name: z.string().trim().min(1, { message: 'Le nom est requis' }),
	message: z
		.string()
		.trim()
		.min(10, { message: 'Le message doit contenir au moins 10 caractères' })
		.max(1000, { message: 'Le message est trop long (max 1000 caractères)' }),
});

export type FormErrors = Partial<Record<keyof z.output<typeof formSchema>, string[]>>;

import { z } from 'zod';

import type { FormMessages } from '../../i18n/ui';

export function createFormSchema(messages: FormMessages) {
	return z.object({
		email: z
			.string()
			.trim()
			.min(1, { message: messages.emailRequired })
			.pipe(z.email({ message: messages.emailInvalid })),
		name: z.string().trim().min(1, { message: messages.nameRequired }),
		message: z
			.string()
			.trim()
			.min(10, { message: messages.messageMin })
			.max(1000, { message: messages.messageMax }),
	});
}

export type FormErrors = Partial<
	Record<keyof z.output<ReturnType<typeof createFormSchema>>, string[]>
>;

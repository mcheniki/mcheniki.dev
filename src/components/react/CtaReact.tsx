import { cva, type VariantProps } from 'class-variance-authority';
import { type MouseEvent } from 'react';

const styles = cva(
	'font-jetbrains cursor-pointer text-base-0 font-bold flex items-center gap-6 justify-center disabled:opacity-75 disabled:pointer-events-none',
	{
		variants: {
			indent: {
				primary: [
					'rounded-full',
					'min-w-160',
					'w-fit',
					'px-24',
					'py-12',
					'bg-primary-500',
					'hover:bg-primary-400',
					'transition-colors',
					'duration-300',
				],
				secondary: [
					'rounded-full',
					'min-w-160',
					'w-fit',
					'px-24',
					'py-12',
					'bg-transparent',
					'border',
					'border-primary-500',
					'hover:border-primary-400',
					'transition-colors',
					'duration-300',
				],
				withIcon: ['hover:text-primary-400', 'transition-colors', 'duration-300'],
				disabled: [
					'rounded-full',
					'min-w-160',
					'w-fit',
					'px-24',
					'py-12',
					'bg-base-400',
					'text-base-200',
					'cursor-not-allowed',
				],
			},
		},
	},
);
export type CTAVariantProps = VariantProps<typeof styles>;

type CtaProps = {
	url?: string;
	target?: '_blank' | 'self';
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	Pick<CTAVariantProps, 'indent'>;

export function CtaReact({ url, indent = 'primary', ...rest }: CtaProps) {
	const onClickLink = (event: MouseEvent<HTMLAnchorElement>) => {
		const target = event.target as HTMLAnchorElement;
		const isAnchor = target.href.includes('#');

		if (!isAnchor) return;

		event.preventDefault();

		const idTarget = target.href.split('#')[1];
		document.getElementById(idTarget)?.scrollIntoView();
	};

	return (
		<>
			{url ? (
				<a
					href={url}
					className={styles({ indent })}
					target={rest.target}
					onClick={onClickLink}
				>
					{rest.children}
				</a>
			) : (
				<button
					className={styles({
						indent: rest.disabled ? 'disabled' : indent,
					})}
					disabled={rest.disabled}
				>
					{rest.children}
				</button>
			)}
		</>
	);
}

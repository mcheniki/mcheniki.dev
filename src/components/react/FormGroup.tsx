type FormGroupProps = {
	name: string;
	withLabel?: boolean;
	className?: string;
	children: React.ReactNode;
};

export function FormGroup({ name, withLabel = true, className, children }: FormGroupProps) {
	return (
		<div className={`group relative ${className}`}>
			{withLabel && (
				<label
					className="absolute top-0 left-12 -translate-y-1/2 bg-base-800 px-3 text-12 text-primary-400 capitalize group-has-[:required]:after:content-['*']"
					htmlFor={name}
				>
					{name}
				</label>
			)}
			{children}
		</div>
	);
}

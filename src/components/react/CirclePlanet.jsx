const styles = {
	primary: {
		main: 'primary bg-primary-500',
		child: ['bg-primary-400', 'bg-primary-300', 'bg-primary-200'],
	},
	secondary: {
		main: 'secondary bg-secondary-500',
		child: ['bg-secondary-400', 'bg-secondary-300', 'bg-secondary-200'],
	},
};

export function CirclePlanet({
	color = 'primary',
	animated = false,
	active = false,
	version = '',
}) {
	const classVersion = version === 'portal' ? 'planet-portal' : '';

	return (
		<div
			className={`${classVersion} h-full w-full ${styles[color].main}`}
			data-animated={animated}
			data-active={active}
		>
			{styles[color].child.map((styleBG, index) => (
				<span
					key={index}
					className={`absolute bottom-0 left-0 h-full w-full ${styleBG}`}
				></span>
			))}
		</div>
	);
}

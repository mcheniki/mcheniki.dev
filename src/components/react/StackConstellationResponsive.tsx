import { useEffect, useState } from 'react';
import type { StackContent } from '../../content/home';
import StackConstellation from './StackConstellation';
import StackConstellationMobile from './StackConstellationMobile';

type Variant = 'portal' | 'realistic' | 'outline' | 'gyroscope' | 'crescent' | 'gyroscope-portal';

export default function StackConstellationResponsive({
	text,
	variant,
}: {
	text: StackContent['constellation'];
	variant: Variant;
}) {
	const [desktop, setDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const media = window.matchMedia('(min-width: 768px)');
		const sync = () => setDesktop(media.matches);
		sync();
		media.addEventListener('change', sync);
		return () => media.removeEventListener('change', sync);
	}, []);

	if (desktop === null) {
		return (
			<>
				<div className="hidden md:block">
					<StackConstellation text={text} variant={variant} />
				</div>
				<div className="md:hidden">
					<StackConstellationMobile text={text} />
				</div>
			</>
		);
	}

	return desktop ? (
		<StackConstellation text={text} variant={variant} />
	) : (
		<StackConstellationMobile text={text} />
	);
}

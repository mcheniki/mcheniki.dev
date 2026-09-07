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
	const [desktop, setDesktop] = useState(false);

	useEffect(() => {
		const media = window.matchMedia('(min-width: 768px)');
		const sync = () => setDesktop(media.matches);
		sync();
		media.addEventListener('change', sync);
		return () => media.removeEventListener('change', sync);
	}, []);

	return desktop ? (
		<StackConstellation text={text} variant={variant} />
	) : (
		<StackConstellationMobile text={text} />
	);
}

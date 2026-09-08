import { useEffect, useState } from 'react';
import type { StackContent } from '../../content/home';
import StackConstellation from './StackConstellation';
import StackConstellationMobile from './StackConstellationMobile';

export default function StackConstellationResponsive({
	text,
}: {
	text: StackContent['constellation'];
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
					<StackConstellation text={text} />
				</div>
				<div className="md:hidden">
					<StackConstellationMobile text={text} />
				</div>
			</>
		);
	}

	return desktop ? <StackConstellation text={text} /> : <StackConstellationMobile text={text} />;
}

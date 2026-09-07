import type { StackContent } from '../../content/home';
import { mobileDisclosureGroups, mobileOtherTechnologies } from './stackCatalog';

type Text = StackContent['constellation'];

function GyroMotif() {
	return (
		<span aria-hidden="true" className="constellation-mobile__gyro">
			<span />
			<span />
		</span>
	);
}

function RootLabel({ id, label }: { id: string; label: string }) {
	if (id === 'javascript') {
		return <span aria-label={label}>JavaScript&nbsp;/ TypeScript</span>;
	}

	return <span>{label}</span>;
}

function TechnologyList({
	technologies,
}: {
	technologies: readonly (typeof mobileOtherTechnologies)[number][];
}) {
	return (
		<ul className="constellation-mobile__tools">
			{technologies.map((technology) => (
				<li key={technology.id}>
					<span className="constellation-mobile__tool-icon">{technology.icon}</span>
					{technology.label}
				</li>
			))}
		</ul>
	);
}

export default function StackConstellationMobile({ text }: { text: Text }) {
	return (
		<div className="constellation-mobile">
			{mobileDisclosureGroups.map(({ root, neighbors }) => (
				<details className="constellation-mobile__disclosure" key={root.id}>
					<summary>
						<GyroMotif />
						<span className="constellation-mobile__root-icon">{root.icon}</span>
						<RootLabel id={root.id} label={root.label} />
						<span aria-hidden="true" className="constellation-mobile__toggle" />
					</summary>
					<TechnologyList technologies={neighbors} />
				</details>
			))}
			<details className="constellation-mobile__disclosure constellation-mobile__disclosure--other">
				<summary>
					<GyroMotif />
					<span>{text.otherTools}</span>
					<span aria-hidden="true" className="constellation-mobile__toggle" />
				</summary>
				<TechnologyList technologies={mobileOtherTechnologies} />
			</details>
		</div>
	);
}

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('React Error Boundary caught:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="rounded-8 border border-base-700 bg-base-900 p-16 text-center">
						<p className="text-base-300">
							Le formulaire est temporairement indisponible.
						</p>
						<p className="mt-8 text-14 text-base-500">
							Veuillez réessayer plus tard ou me contacter par email.
						</p>
					</div>
				)
			);
		}
		return this.props.children;
	}
}

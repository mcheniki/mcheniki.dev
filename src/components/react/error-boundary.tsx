import { Component, type ErrorInfo, type ReactNode } from 'react';

import type { ErrorBoundaryMessages } from '../../i18n/ui';
import type { Locale } from '../../i18n/config';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	locale: Locale;
	messages: ErrorBoundaryMessages;
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
						<p className="text-base-300">{this.props.messages.title}</p>
						<p className="mt-8 text-14 text-base-500">
							{this.props.messages.description}
						</p>
					</div>
				)
			);
		}
		return this.props.children;
	}
}

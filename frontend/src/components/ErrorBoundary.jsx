import { Component } from "react";
import { AlertTriangleIcon } from "lucide-react";
import { logClientError } from "../lib/logger";
import * as Sentry from "@sentry/react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        logClientError({
            message: error.message,
            stack: error.stack,
            componentStack: info.componentStack,
        });
        Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="text-center space-y-3">
                        <AlertTriangleIcon className="w-10 h-10 text-error mx-auto" />
                        <h1 className="text-lg font-bold">Something went wrong</h1>
                        <button onClick={() => window.location.reload()} className="btn btn-primary btn-sm">
                            Reload page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
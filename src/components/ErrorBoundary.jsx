import React from "react";
import { Button } from "@/components/ui/8bit/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    if (typeof window !== "undefined" && window.console) {
      console.error("ErrorBoundary caught an error:", error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-700">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h2>
          <details className="mb-4 whitespace-pre-wrap text-sm text-red-700 dark:text-red-300">
            {this.state.error && this.state.error.toString()}
            {this.state.info && this.state.info.componentStack}
          </details>
          <div className="flex gap-2">
            <Button onClick={() => window.location.reload()}>
              Reload page
            </Button>
            <Button variant="ghost" onClick={this.reset}>
              Dismiss
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

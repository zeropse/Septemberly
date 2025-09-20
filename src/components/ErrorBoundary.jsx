import React from "react";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-red-700">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent>
              <details className="mb-4 whitespace-pre-wrap text-sm text-red-700 cursor-pointer">
                {this.state.error && this.state.error.toString()}
                {this.state.info && this.state.info.componentStack}
              </details>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="cursor-pointer"
                >
                  Reload page
                </Button>
                <Button
                  variant="secondary"
                  onClick={this.reset}
                  className="cursor-pointer"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

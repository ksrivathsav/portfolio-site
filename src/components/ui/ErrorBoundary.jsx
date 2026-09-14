import { Component } from "react";
import { motion }    from "framer-motion";

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production: send to Sentry/Datadog here
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "3rem 2rem",
          textAlign: "center",
          borderRadius: "16px",
          border: "1.5px solid var(--color-border)",
          background: "var(--color-surface)",
          margin: "2rem auto",
          maxWidth: "480px",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚠️</div>
        <h3 style={{ color: "var(--color-heading)", marginBottom: "0.5rem" }}>
          Something went wrong
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          This section couldn&apos;t load. It could be a temporary issue.
        </p>
        <button
          onClick={this.handleReset}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "999px",
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </motion.div>
    );
  }
}

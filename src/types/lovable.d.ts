// Type declarations for Lovable runtime globals used by the app.
// Placing this in src/types ensures TypeScript includes it during builds.

type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
    // Lovable may inject a runtime object at globalThis.__lovable
    __lovable?: Record<string, unknown>;
  }
}

export {};

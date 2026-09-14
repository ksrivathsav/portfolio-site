// ──────────────────────────────────────────────────────────
//  src/hooks/useRetry.js
//  LLD: Async function wrapper with exponential back-off retry
//  Usage: const { run, loading, error } = useRetry(fetchFn)
// ──────────────────────────────────────────────────────────
import { useState, useCallback, useRef } from "react";

/**
 * @param {(...args: any[]) => Promise<any>} asyncFn  - The async function to wrap
 * @param {{ maxRetries?: number, baseDelay?: number }} opts
 */
export function useRetry(asyncFn, { maxRetries = 2, baseDelay = 800 } = {}) {
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);
  const [retries, setRetries]   = useState(0);
  const abortRef = useRef(null);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      let attempt = 0;
      while (attempt <= maxRetries) {
        try {
          const result = await asyncFn(...args);
          setLoading(false);
          setRetries(0);
          return result;
        } catch (err) {
          attempt++;
          setRetries(attempt);

          /* Don't retry on 4xx client errors (validation, auth, etc.) */
          const status = err?.status ?? err?.response?.status;
          if (status && status >= 400 && status < 500) {
            setError(err.message ?? "Request failed");
            setLoading(false);
            throw err;
          }

          if (attempt > maxRetries) {
            setError(err.message ?? "Request failed after retries");
            setLoading(false);
            throw err;
          }

          /* Exponential back-off: 800ms, 1600ms, 3200ms… */
          await new Promise((r) => setTimeout(r, baseDelay * 2 ** (attempt - 1)));
        }
      }
    },
    [asyncFn, maxRetries, baseDelay]
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return { run, loading, error, retries, cancel };
}

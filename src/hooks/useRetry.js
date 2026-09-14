// Async wrapper with exponential back-off retry and AbortController support.
// Usage:
//   const { run, loading, error, cancel } = useRetry(fetchFn)
//   await run(arg1, arg2)   cancel()   ← aborts in-flight
import { useState, useCallback, useRef } from "react";

/**
 * @param {(...args: any[]) => Promise<any>} asyncFn
 *   The async function to wrap. Receives an AbortSignal as its LAST argument,
 *   so callers can forward it to fetch() or other cancellable APIs:
 *     const { run } = useRetry((payload, signal) =>
 *       fetch('/api/chat', { body: JSON.stringify(payload), signal })
 *     )
 *
 * @param {{ maxRetries?: number, baseDelay?: number }} opts
 */
export function useRetry(asyncFn, { maxRetries = 2, baseDelay = 800 } = {}) {
  const [loading, setLoading]  = useState(false);
  const [error,   setError]    = useState(null);
  const [retries, setRetries]  = useState(0);

  /* Holds the AbortController for the current in-flight call */
  const abortCtrlRef = useRef(null);

  const run = useCallback(
    async (...args) => {
      /* Cancel any previous in-flight request before starting a new one */
      abortCtrlRef.current?.abort();
      const ctrl = new AbortController();
      abortCtrlRef.current = ctrl;

      setLoading(true);
      setError(null);

      let attempt = 0;
      while (attempt <= maxRetries) {
        try {
          /* Forward the AbortSignal as the last argument */
          const result = await asyncFn(...args, ctrl.signal);

          /* Only update state if this call was not aborted */
          if (!ctrl.signal.aborted) {
            setLoading(false);
            setRetries(0);
          }
          return result;

        } catch (err) {
          /* AbortError means the caller cancelled — don't retry, don't set error */
          if (err?.name === "AbortError" || ctrl.signal.aborted) {
            setLoading(false);
            return;
          }

          attempt++;
          setRetries(attempt);

          /* Don't retry on 4xx client errors — they won't succeed on retry */
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

          /* Exponential back-off: 800ms → 1600ms → 3200ms */
          await new Promise((resolve, reject) => {
            const t = setTimeout(resolve, baseDelay * 2 ** (attempt - 1));
            /* Stop waiting if the call is cancelled mid-backoff */
            ctrl.signal.addEventListener("abort", () => {
              clearTimeout(t);
              reject(new DOMException("Aborted", "AbortError"));
            });
          });
        }
      }
    },
    [asyncFn, maxRetries, baseDelay]
  );

  /** Abort the current in-flight request and reset loading state */
  const cancel = useCallback(() => {
    abortCtrlRef.current?.abort();
    abortCtrlRef.current = null;
    setLoading(false);
  }, []);

  return { run, loading, error, retries, cancel };
}

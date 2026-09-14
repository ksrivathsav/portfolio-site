// ──────────────────────────────────────────────────────────
//  src/context/ToastContext.jsx
//  LLD: Global toast notification state
//  HLD: Context provider → ToastContainer reads from here
// ──────────────────────────────────────────────────────────
/* eslint-disable react-refresh/only-export-components */
/*
 * Context files intentionally export both a Provider component and hooks.
 * This is standard React practice and is safe to disable for context modules.
 * See: https://github.com/ArnaudBarre/eslint-plugin-react-refresh#options
 */
import { createContext, useContext, useCallback, useMemo, useState } from "react";

const ToastContext = createContext(null);

let _id = 0;

/**
 * Provides a `toast` API with methods:
 *   toast.success(msg, opts?)
 *   toast.error(msg, opts?)
 *   toast.info(msg, opts?)
 *   toast.warning(msg, opts?)
 *   toast.fire({ type, message, duration? })   ← low-level
 *
 * type: "success" | "error" | "info" | "warning"
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  /*
   * Low-level fire function. We separate this from the convenience object
   * so we don't mutate the value returned by useCallback (immutability rule).
   */
  const fire = useCallback(
    ({ type = "info", message, duration = 4000 }) => {
      const id = ++_id;
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  /*
   * Build the public toast API as a stable memoized plain object.
   * Using useMemo (not direct mutation) satisfies react-hooks/immutability.
   */
  const toast = useMemo(
    () => ({
      fire,
      success: (msg, opts) => fire({ type: "success", message: msg, ...opts }),
      error:   (msg, opts) => fire({ type: "error",   message: msg, ...opts }),
      info:    (msg, opts) => fire({ type: "info",    message: msg, ...opts }),
      warning: (msg, opts) => fire({ type: "warning", message: msg, ...opts }),
    }),
    [fire]
  );

  return (
    <ToastContext.Provider value={{ toast, toasts, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

/** Hook to fire a toast from any component */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx.toast;
}

export function useToastState() {
  return useContext(ToastContext);
}

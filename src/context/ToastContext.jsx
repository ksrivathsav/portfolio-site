// ──────────────────────────────────────────────────────────
//  src/context/ToastContext.jsx
//  LLD: Global toast notification state
//  HLD: Context provider → Toast component reads from here
// ──────────────────────────────────────────────────────────
import { createContext, useContext, useCallback, useState } from "react";

const ToastContext = createContext(null);

let _id = 0;

/**
 * Provides toast({ type, message, duration }) anywhere in the tree.
 * type: "success" | "error" | "info" | "warning"
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "info", message, duration = 4000 }) => {
      const id = ++_id;
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  /* Convenience shorthands */
  toast.success = (msg, opts) => toast({ type: "success", message: msg, ...opts });
  toast.error   = (msg, opts) => toast({ type: "error",   message: msg, ...opts });
  toast.info    = (msg, opts) => toast({ type: "info",    message: msg, ...opts });
  toast.warning = (msg, opts) => toast({ type: "warning", message: msg, ...opts });

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

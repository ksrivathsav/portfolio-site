// ──────────────────────────────────────────────────────────
//  src/components/ui/Toast.jsx
//  LLD: Renders the live toast stack at the viewport corner
// ──────────────────────────────────────────────────────────
import { AnimatePresence, motion } from "framer-motion";
import { useToastState }           from "../../context/ToastContext";

const ICONS = {
  success: "✅",
  error:   "❌",
  info:    "ℹ️",
  warning: "⚠️",
};

const COLORS = {
  success: { bg: "#052e16", border: "#166534", text: "#4ade80" },
  error:   { bg: "#2d0f0f", border: "#7f1d1d", text: "#f87171" },
  info:    { bg: "#0c1a2e", border: "#1e3a5f", text: "#93c5fd" },
  warning: { bg: "#1c1300", border: "#713f12", text: "#fcd34d" },
};

export function ToastContainer() {
  const ctx = useToastState();
  if (!ctx) return null;
  const { toasts, dismiss } = ctx;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const c = COLORS[t.type] ?? COLORS.info;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0,  scale: 1   }}
              exit={{    opacity: 0, x: 80, scale: 0.85 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              onClick={() => dismiss(t.id)}
              role="alert"
              style={{
                pointerEvents: "all",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.75rem 1.1rem",
                borderRadius: "12px",
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.text,
                fontSize: "0.875rem",
                fontWeight: 500,
                boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
                backdropFilter: "blur(12px)",
                maxWidth: "340px",
                lineHeight: 1.4,
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{ICONS[t.type]}</span>
              <span>{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

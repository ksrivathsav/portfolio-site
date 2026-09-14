// ──────────────────────────────────────────────────────────
//  Chatbot.jsx  — AI "Talk to Srivathsav" widget
//  HLD: Frontend → /api/chat → OpenAI GPT-4o → response
//  LLD: useChat hook handles message state & API calls.
//       ChatWidget handles UI rendering.
// ──────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import { useBreakpoint } from "../hooks/useBreakpoint";

/* ── Starter questions visitors can tap ── */
const STARTERS = [
  "What are your key skills?",
  "Tell me about your current role",
  "What AI projects have you built?",
  "Are you open to new opportunities?",
  "What's your experience with cloud?",
];

/* ── Determine API base URL ── */
const API_BASE = import.meta.env.VITE_API_BASE ?? "";

/* ── useChat hook — LLD: single responsibility ── */
function useChat() {
  const [messages, setMessages] = useState([
    {
      role:    "assistant",
      content: "Hi! 👋 I'm an AI version of Srivathsav. Ask me anything about my skills, experience, projects, or background — I'll answer as if I were him.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text.trim() };
    const next    = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    setError(null);

    try {
      const res  = await fetch(`${API_BASE}/api/chat`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: next }),
      });

      if (res.status === 429) {
        const data = await res.json();
        throw new Error(data.error ?? "Too many messages. Please wait a moment.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to get response");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [...prev, {
        role:    "assistant",
        content: `Sorry, I ran into an issue: ${err.message}. Please try again or email me directly at srivathsavkommineni@gmail.com.`,
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const reset = useCallback(() => {
    setMessages([{
      role:    "assistant",
      content: "Hi! 👋 I'm an AI version of Srivathsav. Ask me anything about my skills, experience, projects, or background — I'll answer as if I were him.",
    }]);
    setError(null);
    setLoading(false);
  }, []);

  return { messages, loading, error, sendMessage, reset };
}

/* ── Main exported component ── */
export default function Chatbot() {
  const [open,  setOpen]  = useState(false);
  const [input, setInput] = useState("");
  const { isMobile }      = useBreakpoint();

  const { messages, loading, sendMessage, reset } = useChat();
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  /* ── Keyboard shortcut: press "/" to open chatbot ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Auto-scroll to newest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const submit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  };

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1,   y: 0 }}
            exit={{ opacity: 0, scale: 0.9,    y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              /*
               * Mobile: full-width bottom sheet.
               * On iOS the bottom sheet must sit ABOVE the home bar.
               * We use padding-bottom inside the window (not here) to
               * keep content clear of the safe area, because the sheet
               * itself spans edge-to-edge.
               */
              bottom: isMobile ? "0" : "calc(6rem + env(safe-area-inset-bottom, 0px))",
              right:  isMobile ? "0" : "1.5rem",
              left:   isMobile ? "0" : "auto",
              width:  isMobile ? "100%" : "min(380px, calc(100vw - 3rem))",
              /* Use svh/dvh for correct iOS height — fallback to 85vh */
              maxHeight: isMobile
                ? "min(85svh, 85dvh, 85vh)"
                : "min(580px, 85dvh)",
              zIndex: 1100,
              display: "flex",
              flexDirection: "column",
              borderRadius: isMobile ? "1.25rem 1.25rem 0 0" : "1.25rem",
              overflow: "hidden",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 32px 80px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "1rem 1.25rem",
              background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))",
              borderBottom: "1px solid var(--color-border)",
              flexShrink: 0,
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Sparkles size={17} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text)" }}>
                  Talk to Srivathsav AI
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-muted)" }}>
                  Powered by GPT-4o · Press <kbd style={{ background: "rgba(255,255,255,0.1)", borderRadius: "3px", padding: "1px 4px", fontSize: "0.68rem", fontFamily: "monospace", border: "1px solid rgba(255,255,255,0.15)" }}>/</kbd> to toggle
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                <motion.button
                  onClick={reset}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  aria-label="Reset chat"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", padding: "4px", borderRadius: "6px" }}
                >
                  <RefreshCw size={15} />
                </motion.button>
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  aria-label="Close chat"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", padding: "4px", borderRadius: "6px" }}
                >
                  <X size={17} />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "1rem 1rem 0.5rem",
              display: "flex", flexDirection: "column", gap: "0.875rem",
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #10b981, #06b6d4)"
                      : "linear-gradient(135deg, #6366f1, #a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {msg.role === "user"
                      ? <User size={13} color="#fff" />
                      : <Bot  size={13} color="#fff" />
                    }
                  </div>

                  {/* Bubble */}
                  <div style={{
                    maxWidth: "80%",
                    padding: "0.625rem 0.875rem",
                    borderRadius: msg.role === "user" ? "1rem 1rem 0.2rem 1rem" : "1rem 1rem 1rem 0.2rem",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #6366f1, #a855f7)"
                      : "var(--color-accent)",
                    color: msg.role === "user" ? "#fff" : "var(--color-text)",
                    border: msg.role === "user" ? "none" : "1px solid var(--color-border)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Bot size={13} color="#fff" />
                  </div>
                  <div style={{
                    padding: "0.625rem 0.875rem", borderRadius: "1rem 1rem 1rem 0.2rem",
                    background: "var(--color-accent)", border: "1px solid var(--color-border)",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-muted)", display: "inline-block" }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Starter chips — shown only at the beginning */}
              {messages.length === 1 && !loading && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", padding: "0.25rem 0" }}>
                  {STARTERS.map((q) => (
                    <motion.button
                      key={q}
                      onClick={() => { sendMessage(q); }}
                      whileHover={{ scale: 1.03, borderColor: "#6366f1" }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "9999px",
                        background: "var(--color-accent)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s",
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{
              padding: isMobile
                ? `0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom, 0px))`
                : "0.75rem 1rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex", gap: "0.5rem", alignItems: "flex-end",
              flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything…"
                disabled={loading}
                style={{
                  flex: 1, resize: "none",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "0.75rem",
                  background: "var(--color-accent)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  outline: "none",
                  lineHeight: 1.5,
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
                onFocus={(e)  => { e.target.style.borderColor = "#6366f1"; }}
                onBlur={(e)   => { e.target.style.borderColor = "var(--color-border)"; }}
              />
              <motion.button
                onClick={submit}
                disabled={loading || !input.trim()}
                whileHover={!loading && input.trim() ? { scale: 1.08 } : {}}
                whileTap={!loading  && input.trim() ? { scale: 0.93 } : {}}
                aria-label="Send"
                style={{
                  width: "40px", height: "40px", borderRadius: "0.75rem",
                  background: input.trim() ? "linear-gradient(135deg, #6366f1, #a855f7)" : "var(--color-accent)",
                  border: "1px solid var(--color-border)",
                  color: input.trim() ? "#fff" : "var(--color-muted)",
                  cursor: input.trim() ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.2s, color 0.2s",
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 320, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        style={{
          position: "fixed",
          bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
          right:  "1.5rem",
          zIndex: 1050,
          width:  "56px",
          height: "56px",
          borderRadius: "50%",
          background: open ? "var(--color-surface)" : "linear-gradient(135deg, #6366f1, #a855f7)",
          border: "1px solid " + (open ? "var(--color-border)" : "transparent"),
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px -4px rgba(99,102,241,0.55)",
          color: open ? "var(--color-text)" : "#fff",
          transition: "background 0.25s, border-color 0.25s, color 0.25s",
          touchAction: "manipulation",
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.div>
            : <motion.div key="ch" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}><MessageCircle size={22} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Unread indicator dot */}
      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: "fixed",
            bottom: "calc(2.9rem + env(safe-area-inset-bottom, 0px))",
            right: "1.35rem",
            zIndex: 1051,
            width: "10px", height: "10px", borderRadius: "50%",
            background: "#10b981",
            border: "2px solid var(--color-bg)",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { Link }            from "react-scroll";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTheme }        from "../context/ThemeContext";
import { navLinks }        from "../data/portfolioData";
import { useBreakpoint }   from "../hooks/useBreakpoint";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isTouch }             = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const useHamburger  = isTouch;
  const isMenuVisible = menuOpen && useHamburger;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Pill style ── */
  const pillStyle = {
    position: "fixed",
    top: "calc(0.875rem + env(safe-area-inset-top, 0px))",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: useHamburger ? "0.5rem" : "0.25rem",
    padding: useHamburger ? "0.45rem 0.75rem" : "0.45rem 0.6rem 0.45rem 0.9rem",
    borderRadius: "9999px",
    transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
    background: scrolled
      ? isDark ? "rgba(3,3,5,0.82)" : "rgba(245,245,247,0.88)"
      : isDark ? "rgba(3,3,5,0.55)" : "rgba(245,245,247,0.65)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: scrolled
      ? `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)"}`
      : `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
    boxShadow: scrolled
      ? `0 8px 40px -8px rgba(0,0,0,${isDark ? 0.55 : 0.18})`
      : "none",
    whiteSpace: "nowrap",
    maxWidth: "calc(100vw - 2rem)",
  };

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(to right, #6366f1, #a855f7, #06b6d4)",
          scaleX, transformOrigin: "left", zIndex: 1001,
        }}
      />

      {/* Floating pill nav */}
      <nav style={pillStyle} aria-label="Main navigation" className="nav-pill">

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: "pointer", flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.06 }}
            style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}
          >
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Code2 size={14} color="#fff" />
            </div>
            {/* Name only shows on mobile (no room for links) */}
            {useHamburger && (
              <span style={{
                fontWeight: 800, fontSize: "1rem",
                color: "var(--color-text)", letterSpacing: "-0.02em",
              }}>
                SK
              </span>
            )}
          </motion.div>
        </Link>

        {/* Separator — desktop only */}
        {!useHamburger && (
          <div style={{
            width: "1px", height: "18px",
            background: "var(--color-border)",
            margin: "0 0.3rem",
            flexShrink: 0,
          }} />
        )}

        {/* Desktop links */}
        {!useHamburger && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={-56}
                spy
                activeClass="nav-active"
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "color 0.2s ease, background 0.2s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--color-text)";
                  e.target.style.background = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--color-muted)";
                  e.target.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Separator — desktop only */}
        {!useHamburger && (
          <div style={{
            width: "1px", height: "18px",
            background: "var(--color-border)",
            margin: "0 0.3rem",
            flexShrink: 0,
          }} />
        )}

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            style={{
              background: "var(--color-accent)",
              border: "1px solid var(--color-border)",
              borderRadius: "9999px",
              padding: "0.35rem",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--color-muted)",
              flexShrink: 0,
              width: "32px", height: "32px",
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          {useHamburger && (
            <motion.button
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              style={{
                background: "var(--color-accent)",
                border: "1px solid var(--color-border)",
                borderRadius: "9999px",
                padding: "0.35rem",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--color-muted)",
                width: "32px", height: "32px",
              }}
            >
              {isMenuVisible ? <X size={15} /> : <Menu size={15} />}
            </motion.button>
          )}
        </div>
      </nav>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {isMenuVisible && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 997,
                background: "rgba(0,0,0,0.28)",
                backdropFilter: "blur(3px)",
              }}
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{ opacity: 0,    y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: "calc(60px + env(safe-area-inset-top, 0px))",
                left: "50%",
                transform: "translateX(-50%)",
                width: "calc(100% - 2rem)",
                maxWidth: "380px",
                zIndex: 998,
                background: isDark ? "rgba(8,8,16,0.92)" : "rgba(245,245,247,0.94)",
                backdropFilter: "blur(28px) saturate(200%)",
                WebkitBackdropFilter: "blur(28px) saturate(200%)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)"}`,
                borderRadius: "1.25rem",
                padding: "0.6rem",
                display: "flex", flexDirection: "column", gap: "0.2rem",
                boxShadow: "0 20px 60px -12px rgba(0,0,0,0.3)",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-56}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: "0.75rem 1.1rem", borderRadius: "0.75rem",
                    fontSize: "0.975rem", fontWeight: 500, cursor: "pointer",
                    color: "var(--color-text)", transition: "background 0.18s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

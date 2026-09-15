import { useState, useEffect } from "react";
import { Link }            from "react-scroll";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTheme }        from "../context/ThemeContext";
import { navLinks }        from "../data/portfolioData";
import { useBreakpoint }   from "../hooks/useBreakpoint";

export default function Navbar() {
  const { isDark, toggleTheme }  = useTheme();
  const { isTouch } = useBreakpoint();
  const [scrolled, setScrolled]  = useState(false);
  const [menuOpen, setMenuOpen]  = useState(false);

  // Show hamburger on anything narrower than 1024px so 7 links don't crowd
  const useHamburger = isTouch;   // isTouch = width < 1024

  // Derive visibility — avoids setState inside a useEffect
  const isMenuVisible = menuOpen && useHamburger;

  /* Reading progress */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Shared nav pill style ── */
  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    /* Height grows to clear iPhone notch / Dynamic Island */
    height: "calc(56px + env(safe-area-inset-top, 0px))",
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    /* Side padding fixed; top padding = safe area so content sits below notch */
    paddingTop: "env(safe-area-inset-top, 0px)",
    paddingBottom: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
    background: scrolled ? "var(--nav-bg)" : "transparent",
    backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
    borderBottom: scrolled
      ? "1px solid var(--color-border)"
      : "1px solid transparent",
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(to right, #6366f1, #a855f7, #06b6d4)",
          scaleX, transformOrigin: "left", zIndex: 1001,
        }}
      />

      <nav style={navStyle} aria-label="Main navigation">

        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: "pointer", flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div style={{
              width: "30px", height: "30px", borderRadius: "0.375rem",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Code2 size={15} color="#fff" />
            </div>
            <span style={{
              fontWeight: 800, fontSize: "1.05rem",
              color: "var(--color-text)", whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
            }}>
              Srivathsav
            </span>
          </motion.div>
        </Link>

        {/* Desktop centre links — only on 1024px+ */}
        {!useHamburger && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
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
                  padding: "0.375rem 0.875rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "color 0.2s ease, background 0.2s ease",
                  whiteSpace: "nowrap",
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

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            style={{
              background: "var(--color-accent)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem", padding: "0.4rem",
              cursor: "pointer", display: "flex", alignItems: "center",
              color: "var(--color-muted)", flexShrink: 0,
              backdropFilter: "blur(8px)",
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {useHamburger && (
            <motion.button
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              style={{
                background: "var(--color-accent)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem", padding: "0.4rem",
                cursor: "pointer", display: "flex", alignItems: "center",
                color: "var(--color-muted)",
              }}
            >
              {isMenuVisible ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          )}
        </div>
      </nav>

      {/* Mobile drawer + tap-outside backdrop */}
      <AnimatePresence>
        {isMenuVisible && (
          <>
            {/* Invisible backdrop — tap anywhere outside to close */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 997,
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(2px)",
              }}
            />

            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "calc(56px + env(safe-area-inset-top, 0px))",
                left: 0, right: 0, zIndex: 998,
                background: "var(--nav-bg)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: "1px solid var(--color-border)",
                padding: "0.75rem 1rem",
                paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
                display: "flex", flexDirection: "column", gap: "0.25rem",
                boxShadow: "0 12px 32px -8px rgba(0,0,0,0.15)",
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
                    padding: "0.75rem 1rem", borderRadius: "0.625rem",
                    fontSize: "1rem", fontWeight: 500, cursor: "pointer",
                    color: "var(--color-text)", transition: "background 0.2s ease",
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

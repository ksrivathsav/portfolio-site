import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { navLinks } from "../data/portfolioData";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isMobileNav } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when resizing to desktop
  useEffect(() => {
    if (!isMobileNav) setMenuOpen(false);
  }, [isMobileNav]);

  const navBase = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    padding: "0 1.25rem", height: "4rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
    borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
  };

  const navStyle = {
    ...navBase,
    background: scrolled ? "rgba(9,9,11,0.88)" : "transparent",
  };
  const lightNavStyle = {
    ...navBase,
    background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
  };

  return (
    <>
      {/* Reading progress bar */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px",
        background: "var(--color-primary)", scaleX, transformOrigin: "left", zIndex: 1001,
      }} />

      <nav style={isDark ? navStyle : lightNavStyle} aria-label="Main navigation">
        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: "pointer", flexShrink: 0 }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "1.875rem", height: "1.875rem", borderRadius: "0.25rem",
              background: "var(--color-primary)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Code2 size={15} color="var(--color-bg)" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-text)", whiteSpace: "nowrap" }}>
              Srivathsav
            </span>
          </motion.div>
        </Link>

        {/* Desktop links — only rendered when viewport >= 768px */}
        {!isMobileNav && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={-64}
                spy
                activeClass="nav-active"
                style={{
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  transition: "color 0.2s ease, background 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.target.style.color = "var(--color-text)"; e.target.style.background = "var(--color-accent)"; }}
                onMouseLeave={(e) => { e.target.style.color = "var(--color-muted)"; e.target.style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            style={{
              background: "var(--color-surface)", border: "1px solid var(--color-border)",
              borderRadius: "0.5rem", padding: "0.4rem",
              cursor: "pointer", display: "flex", alignItems: "center",
              color: "var(--color-muted)", flexShrink: 0,
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Hamburger — only rendered when viewport < 768px */}
          {isMobileNav && (
            <motion.button
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              style={{
                background: "var(--color-surface)", border: "1px solid var(--color-border)",
                borderRadius: "0.5rem", padding: "0.4rem",
                cursor: "pointer", display: "flex", alignItems: "center",
                color: "var(--color-muted)",
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          )}
        </div>
      </nav>

      {/* Mobile slide-down drawer */}
      <AnimatePresence>
        {menuOpen && isMobileNav && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed", top: "4rem", left: 0, right: 0, zIndex: 999,
              background: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
              padding: "0.75rem 1rem 1rem",
              display: "flex", flexDirection: "column", gap: "0.25rem",
              boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={-64}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  color: "var(--color-text)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => { e.target.style.background = "var(--color-accent)"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

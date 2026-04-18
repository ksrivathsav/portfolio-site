// ─────────────────────────────────────────────────────────
//  Navbar.jsx
//  Sticky navigation bar with:
//   • Smooth-scroll links (via react-scroll)
//   • Active section highlighting
//   • Dark/Light toggle
//   • Mobile hamburger menu
// ─────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { navLinks, personalInfo } from "../data/portfolioData";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add background blur when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "0 1.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    background: scrolled
      ? "rgba(15, 23, 42, 0.85)"
      : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
  };

  const lightNavStyle = {
    ...navStyle,
    background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
  };

  return (
    <>
      <nav style={isDark ? navStyle : lightNavStyle} aria-label="Main navigation">
        {/* Logo */}
        <Link to="hero" smooth duration={600} style={{ cursor: "pointer" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.25rem",
              background: "var(--color-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Code2 size={16} color="var(--color-bg)" />
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--color-text)" }}>
              Srivathsav
            </span>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          className="hidden md:flex">
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
                padding: "0.4rem 0.875rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                color: "var(--color-muted)",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--color-text)";
                e.target.style.background = "var(--color-surface)";
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

        {/* Right side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.625rem",
              padding: "0.45rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "var(--color-muted)",
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          {/* Hamburger (mobile) */}
          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
            className="flex md:hidden"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.625rem",
              padding: "0.45rem",
              cursor: "pointer",
              color: "var(--color-muted)",
            }}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "4rem",
              left: 0,
              right: 0,
              zIndex: 999,
              background: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
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

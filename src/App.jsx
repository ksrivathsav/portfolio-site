import { useEffect } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Experience from "./components/Experience";
import Education  from "./components/Education";
import Projects   from "./components/Projects";
import Skills     from "./components/Skills";
import Footer     from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <CursorGlow />
      <ScrollToTop />

      {/* Skip-to-content for accessibility */}
      <a
        href="#hero"
        style={{
          position: "absolute", top: "-100%", left: "1rem",
          background: "var(--color-primary)", color: "var(--color-bg)",
          padding: "0.5rem 1rem", borderRadius: "0 0 0.5rem 0.5rem",
          zIndex: 9999, textDecoration: "none", fontWeight: 700, transition: "top 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.top = "0"; }}
        onBlur={(e)  => { e.currentTarget.style.top = "-100%"; }}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Projects />
      </main>

      <Footer />
    </ThemeProvider>
  );
}

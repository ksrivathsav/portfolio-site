import { ThemeProvider } from "./context/ThemeContext";
import { motion } from "framer-motion";
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
  return (
    <ThemeProvider>
      <CursorGlow />
      <ScrollToTop />
      <a
        href="#hero"
        style={{
          position: "absolute", top: "-100%", left: "1rem",
          background: "var(--color-primary)", color: "#fff",
          padding: "0.5rem 1rem", borderRadius: "0 0 0.5rem 0.5rem",
          zIndex: 9999, textDecoration: "none", fontWeight: 700, transition: "top 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.top = "0"; }}
        onBlur={(e)  => { e.currentTarget.style.top = "-100%"; }}
      >
        Skip to main content
      </a>

      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <main id="main-content">
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}

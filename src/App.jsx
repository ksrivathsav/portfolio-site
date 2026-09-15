import { lazy, Suspense, memo } from "react";

import { ThemeProvider }  from "./context/ThemeContext";
import { ErrorBoundary }  from "./components/ui/ErrorBoundary";

// Hero loads eagerly — above the fold, on the critical path
import Hero   from "./components/Hero";
import Navbar from "./components/Navbar";

// All other sections are code-split for a faster initial load
const Experience = lazy(() => import("./components/Experience"));
const Education  = lazy(() => import("./components/Education"));
const Projects   = lazy(() => import("./components/Projects"));
const Skills     = lazy(() => import("./components/Skills"));
const Footer     = lazy(() => import("./components/Footer"));

import CursorGlow  from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";
import Chatbot     from "./components/Chatbot";

const SectionSkeleton = memo(() => (
  <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
    <div style={{
      width: "100%", maxWidth: "900px", height: "320px", borderRadius: "20px",
      background: "linear-gradient(90deg, var(--color-surface) 25%, var(--color-border) 50%, var(--color-surface) 75%)",
      backgroundSize: "200% 100%", animation: "shimmer 1.6s infinite",
    }} />
  </div>
));
SectionSkeleton.displayName = "SectionSkeleton";

function AppInner() {
  return (
    <>
      <CursorGlow />
      <ScrollToTop />
      <Chatbot />

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

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <Education />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

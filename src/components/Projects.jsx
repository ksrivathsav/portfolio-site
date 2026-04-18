import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { projects } from "../data/portfolioData";
import { SectionHeader } from "./Experience";

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "5rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          title="Featured Projects"
        />

        {/* Grid */}
        <motion.div layout style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          <AnimatePresence mode="popLayout">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        border: "1px solid var(--color-border)",
        borderRadius: "0.5rem",
        overflow: "hidden", // clip image
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <span style={{
          position: "absolute", top: "1rem", right: "1rem",
          display: "flex", alignItems: "center", gap: "0.25rem",
          fontSize: "0.7rem", fontWeight: 600,
          color: "var(--color-text)", background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          padding: "0.2rem 0.6rem", borderRadius: "9999px",
        }}>
          <Star size={10} style={{ color: "var(--color-text)" }} /> Featured
        </span>
      )}

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          {project.title}
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem", flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Tech stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "0.25rem 0.6rem",
              background: "var(--color-accent)",
              color: "var(--color-text)",
              borderRadius: "0.25rem",
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto", borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              flex: 1, justifyContent: "center", fontSize: "0.8125rem",
              border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text)"
            }}
            whileHover={{ background: "var(--color-accent)" }}
            whileTap={{ scale: 0.98 }}
          >
            <GithubIcon size={14} /> Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center", fontSize: "0.8125rem" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

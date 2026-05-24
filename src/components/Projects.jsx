import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { projects } from "../data/portfolioData";
import { SectionHeader } from "./Experience";
import { useBreakpoint } from "../hooks/useBreakpoint";

// Map Tailwind gradient strings → CSS hex colors for inline gradient strips
const GRADIENT_MAP = {
  "from-indigo-500 to-cyan-500":     ["#6366f1", "#06b6d4"],
  "from-amber-500 to-yellow-400":    ["#f59e0b", "#facc15"],
  "from-orange-500 to-rose-500":     ["#f97316", "#f43f5e"],
  "from-violet-500 to-fuchsia-500":  ["#8b5cf6", "#d946ef"],
  "from-sky-500 to-blue-600":        ["#0ea5e9", "#2563eb"],
  "from-emerald-500 to-teal-500":    ["#10b981", "#14b8a6"],
};

export default function Projects() {
  const { isMobile } = useBreakpoint();
  return (
    <section id="projects" style={{ padding: "5rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader title="Featured Projects" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
          gap: isMobile ? "1rem" : "1.5rem",
        }}>
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const { isTouch, isMobile } = useBreakpoint();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 280, damping: 28 });

  const handleMouseMove = (e) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
    const sx = ((e.clientX - rect.left) / rect.width) * 100;
    const sy = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${sx}%`);
    ref.current.style.setProperty("--mouse-y", `${sy}%`);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const [gradFrom, gradTo] = GRADIENT_MAP[project.gradient] || ["#6366f1", "#06b6d4"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: isMobile ? 0 : (index % 3) * 0.08, ease: "easeOut" }}
      style={isTouch ? {} : { rotateX, rotateY, perspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card card-spotlight"
    >
      {/* Colored gradient top strip */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        borderRadius: "var(--radius) var(--radius) 0 0",
        background: `linear-gradient(to right, ${gradFrom}, ${gradTo})`,
      }} />

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
          <Star size={10} style={{ color: gradFrom }} fill={gradFrom} /> Featured
        </span>
      )}

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingTop: "0.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          {project.title}
        </h3>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "1.5rem", flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontSize: "0.72rem", fontWeight: 500,
              padding: "0.2rem 0.55rem",
              background: "var(--color-accent)", color: "var(--color-text)",
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
              flex: 1, justifyContent: "center", fontSize: "0.8rem",
              border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text)",
            }}
            whileHover={{ background: "var(--color-accent)" }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon size={14} /> Code
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

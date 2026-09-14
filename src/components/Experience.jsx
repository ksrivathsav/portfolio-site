// ──────────────────────────────────────────────────────────
//  Experience.jsx
//  HLD: Section component — Work Experience timeline
//  LLD: Imports shared components from shared/ module boundary
//       Re-exports SectionHeader + CompanyLogo for legacy consumers
// ──────────────────────────────────────────────────────────
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences }     from "../data/portfolioData";
import { useBreakpoint }   from "../hooks/useBreakpoint";
import { SectionHeader, CompanyLogo } from "./shared";

/* ── Re-export so Education/Skills/Projects don't need updating ── */
export { SectionHeader, CompanyLogo };

/* ══════════════════════════════════════════════════════════
   EXPERIENCE  (default export)
══════════════════════════════════════════════════════════ */
export default function Experience() {
  const { isMobile }  = useBreakpoint();
  const timelineRef   = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const tlPL  = isMobile ? "1.5rem" : "2rem";
  const lineL = isMobile ? "0.75rem" : "1rem";
  const lineLC = `calc(${lineL} - 0.5px)`;

  return (
    <section
      id="experience"
      className="section-glass"
      style={{ padding: "6rem 1.5rem" }}
    >
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          eyebrow="Career"
          title="Work Experience"
          subtitle="A timeline of my professional journey"
        />

        <div ref={timelineRef} style={{ position: "relative", paddingLeft: tlPL }}>
          {/* Track */}
          <div style={{
            position: "absolute", left: lineL, top: 0, bottom: 0, width: "1px",
            background: "var(--color-border)", zIndex: 0,
          }} />
          {/* Animated fill */}
          <motion.div
            style={{
              position: "absolute", left: lineLC, top: 0, width: "2px", height: "100%",
              background: "linear-gradient(to bottom, #233E66, #0021A5, #FA4616, #F37440)",
              scaleY: lineScaleY, transformOrigin: "top", zIndex: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem", position: "relative", zIndex: 1 }}>
            {experiences.map((exp) => (
              <TimelineItem key={exp.id} exp={exp} dotLeft={lineL} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Single timeline card ─────────────────────────────── */
function TimelineItem({ exp, dotLeft = "1rem" }) {
  const { isMobile } = useBreakpoint();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const itemPL = isMobile ? "2rem" : "3rem";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
      style={{ position: "relative", paddingLeft: itemPL }}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 420, damping: 14 }}
        style={{
          position: "absolute", left: dotLeft, top: "1.15rem",
          width: "12px", height: "12px", borderRadius: "50%",
          background: exp.color, transform: "translateX(-50%)",
          boxShadow: `0 0 0 3px var(--color-bg), 0 0 0 5px ${exp.color}55`,
          zIndex: 2,
        }}
      >
        <motion.div
          animate={inView ? { scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1.5px solid ${exp.color}` }}
        />
      </motion.div>

      {/* Glass card */}
      <motion.div
        className="card"
        whileHover={isMobile ? {} : { x: 6, borderColor: exp.color + "55" }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ borderLeft: `3px solid ${exp.color}30`, padding: isMobile ? "1.1rem 1.25rem" : "1.5rem 1.75rem" }}
      >
        {/* Role + duration */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "flex-start",
          gap: "0.5rem", marginBottom: "0.75rem",
        }}>
          <h3 style={{ fontSize: isMobile ? "1rem" : "1.15rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>
            {exp.role}
          </h3>
          <span style={{
            fontSize: "0.75rem", fontWeight: 500,
            color: "var(--color-muted)", background: "var(--color-accent)",
            padding: "0.18rem 0.7rem", borderRadius: "9999px",
            whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.3rem", flexShrink: 0,
          }}>
            <Calendar size={11} /> {exp.duration}
          </span>
        </div>

        {/* Company logo + name + location */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <CompanyLogo url={exp.logoUrl} company={exp.company} color={exp.color} />
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: exp.color }}>
            {exp.company}
          </span>
          <span style={{ color: "var(--color-border)", fontSize: "0.85rem" }}>·</span>
          <span style={{ fontSize: "0.82rem", color: "var(--color-muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <MapPin size={11} /> {exp.location}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
//  Education.jsx
//  Minimalist vertical timeline for education
// ─────────────────────────────────────────────────────────
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education } from "../data/portfolioData";
import { SectionHeader } from "./Experience";

export default function Education() {
  return (
    <section id="education" style={{ padding: "5rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          title="Education"
          subtitle="My academic background and achievements"
        />

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "1rem", top: 0, bottom: 0,
            width: "1px",
            background: "var(--color-border)",
            zIndex: 0,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", position: "relative", zIndex: 1 }}>
            {education.map((edu, index) => (
              <TimelineItem key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ edu, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        position: "relative",
        paddingLeft: "3rem",
      }}
    >
      {/* Timeline Dot */}
      <div style={{
        position: "absolute",
        left: "1rem",
        top: "0.25rem",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        background: "var(--color-bg)",
        border: "2px solid var(--color-primary)",
        transform: "translateX(-50%)",
        boxShadow: "0 0 0 4px var(--color-bg)",
      }} />

      {/* Content */}
      <motion.div 
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          marginBottom: "1rem"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-text)", margin: 0 }}>
            {edu.degree}
          </h3>
          <span style={{ fontSize: "0.875rem", color: "var(--color-muted)", fontWeight: 500 }}>
            {edu.year}
          </span>
        </div>
        
        <div style={{ fontSize: "1rem", color: "var(--color-text)", fontWeight: 500 }}>
          {edu.institution}
        </div>
      </div>

      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem"
      }}>
        {edu.highlights.map((h, i) => (
          <li key={i} style={{
            color: "var(--color-muted)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            position: "relative",
            paddingLeft: "1.25rem",
          }}>
            <span style={{
              position: "absolute",
              left: 0, top: "0.6rem",
              width: "4px", height: "4px",
              borderRadius: "50%",
              background: "var(--color-border)",
            }} />
            {h}
          </li>
        ))}
      </ul>
      </motion.div>
    </motion.div>
  );
}

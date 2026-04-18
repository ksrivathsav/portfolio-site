// ─────────────────────────────────────────────────────────
//  Skills.jsx
//  Categorised skill badges displayed with stagger animations.
// ─────────────────────────────────────────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../data/portfolioData";
import { SectionHeader } from "./Experience";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "5rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Technologies I work with day-to-day"
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {skillCategories.map((cat, idx) => (
            <SkillCard key={cat.label} category={cat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="card"
    >
      {/* Category header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "1.375rem" }} aria-hidden="true">{category.icon}</span>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text)" }}>
          {category.label}
        </h3>
      </div>

      {/* Skill badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.04, duration: 0.35 }}
            className="badge"
            style={{ cursor: "default", border: "1px solid var(--color-border)", background: "transparent" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

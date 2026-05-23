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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="card skill-card-hover"
    >
      {/* Category header with bouncing icon */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 350, damping: 14 }}
          style={{ fontSize: "1.375rem", display: "inline-block" }}
          aria-hidden="true"
        >
          {category.icon}
        </motion.span>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text)" }}>
          {category.label}
        </h3>
        <span style={{
          marginLeft: "auto", fontSize: "0.7rem", fontWeight: 600,
          color: "var(--color-muted)", background: "var(--color-accent)",
          padding: "0.1rem 0.5rem", borderRadius: "9999px",
        }}>
          {category.skills.length}
        </span>
      </div>

      {/* Skill badges with stagger + hover invert */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.06 + i * 0.03, duration: 0.3, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              borderColor: "var(--color-primary)",
            }}
            className="badge"
            style={{
              cursor: "default",
              border: "1px solid var(--color-border)",
              background: "transparent",
              transition: "border-color 0.15s",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

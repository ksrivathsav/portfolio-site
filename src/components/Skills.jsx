import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skillCategories } from "../data/portfolioData";
import { SectionHeader }   from "./shared";
import { useBreakpoint }   from "../hooks/useBreakpoint";

/* Bento span per category index: [Frontend, Backend, AI/ML, Databases, Cloud, Core&Tools] */
const BENTO_SPANS = [2, 2, 4, 1, 1, 2];

export default function Skills() {
  return (
    <section id="skills" className="section-glass" style={{ padding: "6rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          eyebrow="Toolkit"
          title="Skills & Technologies"
          subtitle="Technologies I work with day-to-day"
        />
        <div className="bento-grid">
          {skillCategories.map((cat, idx) => (
            <SkillCard
              key={cat.label}
              category={cat}
              index={idx}
              span={BENTO_SPANS[idx] ?? 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, index, span }) {
  const { isTouch } = useBreakpoint();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  /* 3D tilt (desktop only) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-60, 60], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-60, 60], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width  / 2);
    my.set(e.clientY - rect.top  - rect.height / 2);
    const sx = ((e.clientX - rect.left) / rect.width)  * 100;
    const sy = ((e.clientY - rect.top)  / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${sx}%`);
    ref.current.style.setProperty("--mouse-y", `${sy}%`);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  /* Color accent per category */
  const ACCENTS = ["#6366f1", "#a855f7", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...(isTouch ? {} : { rotateX, rotateY, perspective: 900, transformStyle: "preserve-3d" }),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card card-spotlight skill-card-hover bento-${span}`}
    >
      {/* Accent strip at top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        borderRadius: "var(--radius) var(--radius) 0 0",
        background: `linear-gradient(to right, ${accent}, transparent)`,
        opacity: 0.8,
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.07 + 0.18, type: "spring", stiffness: 350, damping: 14 }}
          style={{ fontSize: "1.4rem", display: "inline-block" }}
          aria-hidden="true"
        >
          {category.icon}
        </motion.span>
        <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-text)" }}>
          {category.label}
        </h3>
        <span style={{
          marginLeft: "auto", fontSize: "0.68rem", fontWeight: 700,
          color: accent, background: `${accent}18`,
          padding: "0.15rem 0.5rem", borderRadius: "9999px", flexShrink: 0,
          border: `1px solid ${accent}30`,
        }}>
          {category.skills.length}
        </span>
      </div>

      {/* Skill badges — staggered reveal */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.38rem" }}>
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.04 + i * 0.018, duration: 0.28, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              background: accent,
              color: "#fff",
              borderColor: accent,
            }}
            className="badge"
            style={{ cursor: "default", transition: "all 0.15s" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

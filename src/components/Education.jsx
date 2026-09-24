import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { education }     from "../data/portfolioData";
import { SectionHeader, CompanyLogo } from "./shared";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function Education() {
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
    <section id="education" style={{ padding: "6rem 1.5rem" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader
          eyebrow="Academic"
          title="Education"
          subtitle="My academic background and achievements"
        />

        <div ref={timelineRef} style={{ position: "relative", paddingLeft: tlPL }}>
          <div style={{
            position: "absolute", left: lineL, top: 0, bottom: 0, width: "1px",
            background: "var(--color-border)", zIndex: 0,
          }} />
          <motion.div
            style={{
              position: "absolute", left: lineLC, top: 0, width: "2px", height: "100%",
              background: "linear-gradient(to bottom, #0021A5, #7B1D1D)",
              scaleY: lineScaleY, transformOrigin: "top", zIndex: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem", position: "relative", zIndex: 1 }}>
            {education.map((edu, index) => (
              <EduItem key={edu.id} edu={edu} index={index} dotLeft={lineL} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EduItem({ edu, index, dotLeft = "1rem" }) {
  const { isMobile } = useBreakpoint();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const itemPL = isMobile ? "2rem" : "3rem";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      style={{ position: "relative", paddingLeft: itemPL }}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.25, type: "spring", stiffness: 420, damping: 14 }}
        style={{
          position: "absolute", left: dotLeft, top: "1.15rem",
          width: "12px", height: "12px", borderRadius: "50%",
          background: edu.color, transform: "translateX(-50%)",
          boxShadow: `0 0 0 3px var(--color-bg), 0 0 0 5px ${edu.color}55`,
          zIndex: 2,
        }}
      >
        <motion.div
          animate={inView ? { scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1.5px solid ${edu.color}` }}
        />
      </motion.div>

      {/* Glass card */}
      <motion.div
        className="card"
        whileHover={isMobile ? {} : { x: 6, borderColor: edu.color + "55" }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{ borderLeft: `3px solid ${edu.color}30`, padding: isMobile ? "1.1rem 1.25rem" : "1.5rem 1.75rem" }}
      >
        {/* Degree + year */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "flex-start",
          gap: "0.5rem", marginBottom: "0.75rem",
        }}>
          <h3 style={{ fontSize: isMobile ? "1rem" : "1.1rem", fontWeight: 700, color: "var(--color-text)", margin: 0, flex: 1, minWidth: 0 }}>
            {edu.degree}
          </h3>
          <span style={{
            fontSize: "0.75rem", fontWeight: 500,
            color: "var(--color-muted)", background: "var(--color-accent)",
            padding: "0.18rem 0.7rem", borderRadius: "9999px",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {edu.year}
          </span>
        </div>

        {/* Institution logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <CompanyLogo url={edu.logoUrl} company={edu.institution} color={edu.color} />
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: edu.color }}>
            {edu.institution}
          </span>
        </div>

        {/* Highlights */}
        {edu.highlights && edu.highlights.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0 0", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {edu.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                style={{
                  color: "var(--color-muted)", fontSize: "0.88rem",
                  lineHeight: 1.65, position: "relative", paddingLeft: "1rem",
                }}
              >
                <span style={{
                  position: "absolute", left: 0, top: "0.62rem",
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: edu.color, opacity: 0.75,
                }} />
                {h}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

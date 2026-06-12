import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experiences } from "../data/portfolioData";
import { useBreakpoint } from "../hooks/useBreakpoint";

const bulletContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const bulletItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Experience() {
  const { isMobile } = useBreakpoint();
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.85", "end 0.15"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const tlPL   = isMobile ? "1.5rem" : "2rem";
  const lineL  = isMobile ? "0.75rem" : "1rem";
  const lineLC = isMobile ? "calc(0.75rem - 0.5px)" : "calc(1rem - 0.5px)";

  return (
    <section id="experience" style={{ padding: "5rem 1.5rem", background: "var(--color-surface)" }}>
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SectionHeader title="Work Experience" subtitle="A timeline of my professional journey" />
        <div ref={timelineRef} style={{ position: "relative", paddingLeft: tlPL }}>
          <div style={{ position: "absolute", left: lineL, top: 0, bottom: 0, width: "1px", background: "var(--color-border)", zIndex: 0 }} />
          <motion.div style={{ position: "absolute", left: lineLC, top: 0, width: "2px", height: "100%", background: "linear-gradient(to bottom, #003087, #003087, #FA4616, #F37440)", scaleY: lineScaleY, transformOrigin: "top", zIndex: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", position: "relative", zIndex: 1 }}>
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} exp={exp} index={index} dotLeft={lineL} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Company logo with initials fallback (exported for reuse) */
export function CompanyLogo({ url, company, color }) {
  const [failed, setFailed] = useState(false);
  const base = import.meta.env.BASE_URL;
  const src = url ? (url.startsWith("http") ? url : `${base}${url}`) : null;
  const isPng = src && src.endsWith(".png");

  return (
    <div style={{
      height: "32px",
      minWidth: "32px",
      maxWidth: "100px",
      borderRadius: "6px",
      flexShrink: 0,
      background: failed || !src ? `${color}14` : (isPng ? "#ffffff" : "var(--color-bg)"),
      border: `1.5px solid ${failed || !src ? color + "30" : "var(--color-border)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      padding: failed || !src ? "0" : "3px 6px",
      boxShadow: isPng && !failed ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
    }}>
      {!failed && src ? (
        <img
          src={src}
          alt={`${company} logo`}
          style={{ height: "24px", width: "auto", maxWidth: "92px", objectFit: "contain", display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: "0.6rem", fontWeight: 800, color, letterSpacing: "-0.02em", padding: "0 4px" }}>
          {company.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function TimelineItem({ exp, index, dotLeft = "1rem" }) {
  const { isMobile } = useBreakpoint();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const itemPL = isMobile ? "2rem" : "3rem";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
      style={{ position: "relative", paddingLeft: itemPL }}
    >
      {/* Pulsing colored dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 420, damping: 14 }}
        style={{
          position: "absolute", left: dotLeft, top: "0.45rem",
          width: "12px", height: "12px", borderRadius: "50%",
          background: exp.color, transform: "translateX(-50%)",
          boxShadow: `0 0 0 3px var(--color-surface), 0 0 0 5px ${exp.color}55`,
          zIndex: 2,
        }}
      >
        <motion.div
          animate={isInView ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1.5px solid ${exp.color}` }}
        />
      </motion.div>

      {/* Hover-slide content */}
      <motion.div
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ borderLeft: "2px solid transparent", paddingLeft: "1rem", transition: "border-color 0.3s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = exp.color)}
        onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}
      >
        {/* Role + duration pill */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <h3 style={{ fontSize: isMobile ? "1rem" : "1.15rem", fontWeight: 700, color: "var(--color-text)", margin: 0 }}>
            {exp.role}
          </h3>
          <span style={{
            fontSize: "0.78rem", fontWeight: 500,
            color: "var(--color-muted)", background: "var(--color-accent)",
            padding: "0.15rem 0.65rem", borderRadius: "9999px", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: "0.3rem", flexShrink: 0,
          }}>
            <Calendar size={11} />
            {exp.duration}
          </span>
        </div>

        {/* Company logo + name + location */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <CompanyLogo url={exp.logoUrl} company={exp.company} color={exp.color} />
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: exp.color }}>{exp.company}</span>
          <span style={{ color: "var(--color-border)", fontSize: "0.85rem" }}>·</span>
          <span style={{ fontSize: "0.82rem", color: "var(--color-muted)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <MapPin size={11} /> {exp.location}
          </span>
        </div>

        {/* Staggered responsibility bullets */}
        {exp.responsibilities.length > 0 && (
          <motion.ul
            variants={bulletContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {exp.responsibilities.map((desc, i) => (
              <motion.li key={i} variants={bulletItem} style={{
                color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.65,
                position: "relative", paddingLeft: "1rem",
              }}>
                <span style={{ position: "absolute", left: 0, top: "0.62rem", width: "4px", height: "4px", borderRadius: "50%", background: exp.color, opacity: 0.75 }} />
                {desc}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Animated section header — shared across sections ── */
export function SectionHeader({ title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ marginBottom: "3rem" }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      <div style={{ position: "relative", height: "1px", background: "var(--color-border)", margin: "1.25rem 0", overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, transformOrigin: "left", background: "linear-gradient(to right, #6366f1, #06b6d4, transparent)" }}
        />
      </div>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          style={{ marginBottom: 0 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

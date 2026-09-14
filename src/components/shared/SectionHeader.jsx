import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * @param {string} title     - Main section heading
 * @param {string} [eyebrow] - Small ALL-CAPS label above the title
 * @param {string} [subtitle]- Muted paragraph below the gradient line
 */
export function SectionHeader({ title, subtitle, eyebrow }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} style={{ marginBottom: "3.5rem" }}>
      {eyebrow && (
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {title}
      </motion.h2>

      {/* Animated gradient underline */}
      <div style={{ position: "relative", height: "2px", background: "var(--color-border)", margin: "1.25rem 0", overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", inset: 0, transformOrigin: "left",
            background: "linear-gradient(to right, #6366f1, #a855f7, #06b6d4, transparent)",
          }}
        />
      </div>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ marginBottom: 0 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

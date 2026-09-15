import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  /* Outer glow — heavy lag for trailing effect */
  const gX = useSpring(rawX, { damping: 28, stiffness: 90, mass: 0.6 });
  const gY = useSpring(rawY, { damping: 28, stiffness: 90, mass: 0.6 });

  /* Ring — medium lag */
  const rX = useSpring(rawX, { damping: 18, stiffness: 180, mass: 0.4 });
  const rY = useSpring(rawY, { damping: 18, stiffness: 180, mass: 0.4 });

  useEffect(() => {
    /* Touch devices — hide cursor completely */
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <>
      {/* Ambient aurora glow — follows with lag */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          left: gX, top: gY,
          x: "-50%", y: "-50%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, rgba(168,85,247,0.06) 35%, rgba(6,182,212,0.03) 60%, transparent 75%)",
        }}
      />

      {/* Medium glow ring — tighter, more responsive */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          left: rX, top: rY,
          x: "-50%", y: "-50%",
          width: "180px", height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
        }}
      />

      {/* Precise cursor dot — no lag */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9997,
          left: rawX, top: rawY,
          x: "-50%", y: "-50%",
          width: "10px", height: "10px",
          borderRadius: "50%",
          background: "rgba(99,102,241,0.7)",
          mixBlendMode: "screen",
        }}
      />

      {/* Outer ring — gradient border */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9996,
          left: rX, top: rY,
          x: "-50%", y: "-50%",
          width: "36px", height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.45)",
          background: "transparent",
        }}
      />
    </>
  );
}

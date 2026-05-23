import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  const x = useSpring(rawX, { damping: 20, stiffness: 160, mass: 0.5 });
  const y = useSpring(rawY, { damping: 20, stiffness: 160, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => { rawX.set(e.clientX); rawY.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          left: x, top: y,
          x: "-50%", y: "-50%",
          width: "650px", height: "650px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
        }}
      />
      {/* Smaller tighter ring */}
      <motion.div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          left: rawX, top: rawY,
          x: "-50%", y: "-50%",
          width: "28px", height: "28px",
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.35)",
          backdropFilter: "none",
        }}
      />
    </>
  );
}

// ──────────────────────────────────────────────────────────
//  useCounter.js
//  LLD: Single-responsibility hook — animates a number
//       from 0 → end when the element enters the viewport
// ──────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";

/**
 * @param {number} end       - Target number to count up to
 * @param {number} duration  - Total animation duration in ms
 */
export function useCounter(end, duration = 1800) {
  const [count,  setCount]  = useState(0);
  const ref      = useRef(null);
  const hasRun   = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;

          let step = 0;
          const steps    = 40;
          const increment = end / steps;
          const interval  = duration / steps;

          const timer = setInterval(() => {
            step += increment;
            if (step >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(step));
            }
          }, interval);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

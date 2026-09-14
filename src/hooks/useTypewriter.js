// ──────────────────────────────────────────────────────────
//  useTypewriter.js
//  LLD: Single-responsibility hook — cycling typewriter
// ──────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

/**
 * Cycles through an array of texts with a typewriter effect.
 * @param {string[]} texts   - List of strings to cycle through
 * @param {number}   speed   - ms per character when typing
 * @param {number}   pauseMs - ms to pause at the end of each phrase
 */
export function useTypewriter(texts, speed = 52, pauseMs = 2000) {
  const list = Array.isArray(texts) ? texts : [texts];
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase]         = useState("typing");   // "typing" | "deleting"
  const [idx, setIdx]             = useState(0);

  useEffect(() => {
    let timer;
    const current = list[idx];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      } else {
        timer = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setIdx((i) => (i + 1) % list.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, idx, list, speed, pauseMs]);

  return {
    displayed,
    showCursor: true,            // cursor always visible while cycling
    isTyping:   phase === "typing",
  };
}

// ──────────────────────────────────────────────────────────
//  useTypewriter.js
//  LLD: Single-responsibility hook — cycling typewriter
//
//  Uses useReducer so ALL state transitions happen in a pure
//  reducer, satisfying react-hooks/set-state-in-effect.
//  Timing (delays) is managed by the useEffect — the reducer
//  itself never touches time.
// ──────────────────────────────────────────────────────────
import { useReducer, useEffect } from "react";

/**
 * Pure state machine — no side effects.
 * action.texts is passed in so the reducer can read the current phrase
 * without the texts array being part of the reducer's closure.
 *
 * @param {{ displayed: string, phase: 'typing'|'deleting', idx: number }} state
 * @param {{ type: string, texts: string[] }} action
 */
function typewriterReducer(state, { type: actionType, texts }) {
  if (actionType !== "TICK") return state;

  const { displayed, phase, idx } = state;
  const current = texts[idx] ?? "";

  if (phase === "typing") {
    if (displayed.length < current.length) {
      return { ...state, displayed: current.slice(0, displayed.length + 1) };
    }
    // Full word typed — transition to deleting phase
    return { ...state, phase: "deleting" };
  }

  // phase === "deleting"
  if (displayed.length > 0) {
    return { ...state, displayed: displayed.slice(0, -1) };
  }

  // Fully deleted — advance to next phrase
  return {
    displayed: "",
    phase:     "typing",
    idx:       (idx + 1) % texts.length,
  };
}

/**
 * Cycles through an array of texts with a typewriter effect.
 *
 * @param {string | string[]} texts    - List of strings to cycle (pass a STABLE reference,
 *                                       e.g. a constant declared outside the component)
 * @param {number}            speed    - ms per character when typing (default 52)
 * @param {number}            pauseMs  - ms to pause at end of phrase before deleting (default 2000)
 */
export function useTypewriter(texts, speed = 52, pauseMs = 2000) {
  const list = Array.isArray(texts) ? texts : [texts];

  const [state, dispatch] = useReducer(typewriterReducer, {
    displayed: "",
    phase:     "typing",
    idx:       0,
  });

  useEffect(() => {
    const { displayed, phase, idx } = state;
    const current = list[idx] ?? "";

    /*
     * Determine the delay before the next TICK dispatch:
     *   • Just finished typing the full phrase → wait pauseMs before deleting
     *   • Deleting  → speed / 2  (backspace is faster than typing)
     *   • Typing    → speed ms per character
     */
    const delay =
      phase === "typing" && displayed.length === current.length ? pauseMs :
      phase === "deleting"                                       ? speed / 2 :
                                                                   speed;

    const timer = setTimeout(() => {
      dispatch({ type: "TICK", texts: list });
    }, delay);

    return () => clearTimeout(timer);
  // `list` is derived from `texts` inline; callers should pass a stable ref
  // (e.g. a module-level constant) to avoid unnecessary re-runs.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, speed, pauseMs]);

  return {
    displayed:  state.displayed,
    showCursor: true,
    isTyping:   state.phase === "typing",
  };
}

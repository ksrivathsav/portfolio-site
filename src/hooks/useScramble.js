import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export function useScramble(text, { delay = 0, speed = 38 } = {}) {
  const [display, setDisplay] = useState(text.replace(/\S/g, "·"));

  useEffect(() => {
    let intervalId = null;
    let frame = 0;
    const totalFrames = text.length * 5;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const revealed = Math.min(
          Math.floor((frame / totalFrames) * text.length),
          text.length
        );

        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            if (i < revealed + 3)
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            return "·";
          })
          .join("");

        setDisplay(next);
        frame++;

        if (revealed >= text.length) {
          setDisplay(text);
          clearInterval(intervalId);
        }
      }, speed);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return display;
}

// ──────────────────────────────────────────────────────────
//  useBreakpoint.js
//  LLD: Single-responsibility — tracks viewport dimensions
//  Returns granular breakpoint flags for all device types
// ──────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useBreakpoint() {
  const getState = () => {
    if (typeof window === "undefined") return { width: 1280, height: 800 };
    return { width: window.innerWidth, height: window.innerHeight };
  };

  const [dims, setDims] = useState(getState);

  useEffect(() => {
    let rafId;
    const handler = () => {
      // Debounce via rAF to avoid thrashing on resize
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setDims(getState()));
    };
    window.addEventListener("resize",       handler, { passive: true });
    window.addEventListener("orientationchange", handler, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",            handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);

  const { width, height } = dims;

  return {
    width,
    height,

    // ── Phone tiers ──────────────────────────────────────
    isSmallPhone:  width < 375,                     // iPhone SE (old), budget Android
    isPhone:       width < 640,                     // all phones
    isMobile:      width < 640,                     // alias — widely used in codebase

    // ── Tablet ────────────────────────────────────────────
    isTablet:      width >= 640 && width < 1024,    // iPad mini → iPad Pro landscape
    isTabletSmall: width >= 640 && width < 768,     // iPad mini portrait
    isTabletLarge: width >= 768 && width < 1024,    // iPad Air/Pro portrait

    // ── Laptop / Desktop ──────────────────────────────────
    isDesktop:     width >= 1024,
    isLaptop:      width >= 1024 && width < 1440,   // 13" / 15" laptops
    isLargeScreen: width >= 1440,                   // MacBook Pro 14/16", iMac
    isXLarge:      width >= 1920,                   // Full HD monitors, iMac 27"
    isUltrawide:   width >= 2560,                   // 4K / 5K / ultrawide

    // ── Nav breakpoint ────────────────────────────────────
    isMobileNav:   width < 768,                     // hamburger menu threshold

    // ── Touch / hover ─────────────────────────────────────
    isTouch:       width < 1024,                    // disable JS hover effects

    // ── Orientation ───────────────────────────────────────
    isLandscape:   width > height,
    isPortrait:    width <= height,
    isPhoneLandscape: width < 900 && width > height, // phone in landscape mode
  };
}

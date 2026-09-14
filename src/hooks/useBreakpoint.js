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

    isSmallPhone:  width < 375,
    isPhone:       width < 640,
    isMobile:      width < 640,

    isTablet:      width >= 640 && width < 1024,
    isTabletSmall: width >= 640 && width < 768,
    isTabletLarge: width >= 768 && width < 1024,

    isDesktop:     width >= 1024,
    isLaptop:      width >= 1024 && width < 1440,
    isLargeScreen: width >= 1440,
    isXLarge:      width >= 1920,
    isUltrawide:   width >= 2560,

    isMobileNav:   width < 768,
    isTouch:       width < 1024,

    isLandscape:      width > height,
    isPortrait:       width <= height,
    isPhoneLandscape: width < 900 && width > height,
  };
}

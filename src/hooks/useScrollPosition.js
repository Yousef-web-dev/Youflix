'use client';

import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 50;

/**
 * Tracks scroll progress from 0 (top of page) to 1 (SCROLL_THRESHOLD px or more).
 * Used to smoothly interpolate the navbar background between transparent and solid.
 */
export default function useScrollPosition() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const y = window.scrollY;
      setScrollProgress(Math.min(y / SCROLL_THRESHOLD, 1));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

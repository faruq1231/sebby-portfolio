'use client';

import gsap from 'gsap';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, touchMultiplier: 1.15 });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', () => window.dispatchEvent(new Event('portfolio-scroll')));
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}

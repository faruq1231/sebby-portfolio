'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

export function RevealText({ children, delay = 0, intro = false }: { children: ReactNode; delay?: number; intro?: boolean }) {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLSpanElement>(null);
  const inView = useInView(frame, { once: true, amount: .3 });
  const shown = { y: '0%', rotate: 0 };

  return (
    <span className="text-mask" ref={frame}>
      <motion.span
        className="text-mask-content"
        initial={reduced ? false : { y: '110%', rotate: 2 }}
        animate={intro || inView || reduced ? shown : { y: '110%', rotate: 2 }}
        transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : delay, ease: [.16, 1, .3, 1] }}
      >{children}</motion.span>
    </span>
  );
}

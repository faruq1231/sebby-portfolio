'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function RevealText({ children, delay = 0, intro = false }: { children: ReactNode; delay?: number; intro?: boolean }) {
  const reduced = useReducedMotion();
  const shown = { y: '0%', rotate: 0 };

  return (
    <span className="text-mask">
      <motion.span
        className="text-mask-content"
        initial={reduced ? false : { y: '110%', rotate: 2 }}
        animate={intro ? shown : undefined}
        whileInView={intro ? undefined : shown}
        viewport={{ once: true, amount: .3 }}
        transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : delay, ease: [.16, 1, .3, 1] }}
      >{children}</motion.span>
    </span>
  );
}

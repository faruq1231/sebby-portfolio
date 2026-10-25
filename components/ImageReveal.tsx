'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialDelay?: number;
};

export function ImageReveal({ children, className = '', delay = 0, initialDelay = 0 }: ImageRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`image-reveal ${className}`.trim()}
      initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 24 }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .15 }}
      transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : delay + initialDelay, ease: [.16, 1, .3, 1] }}
    >
      {children}
    </motion.div>
  );
}

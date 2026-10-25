'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  initialDelay?: number;
};

export function ImageReveal({ children, className = '', delay = 0, initialDelay = 0 }: ImageRevealProps) {
  const frame = useRef<HTMLDivElement>(null);
  const seen = useInView(frame, { once: true, amount: .15 });
  const reduced = useReducedMotion();
  const hidden = { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 24 };
  const visible = { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 };

  return (
    <div ref={frame} className={`image-reveal ${className}`.trim()}>
      <motion.div
        className="image-reveal-content"
        initial={reduced ? false : hidden}
        animate={seen || reduced ? visible : hidden}
        transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : delay + initialDelay, ease: [.16, 1, .3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MouseEvent, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function MagneticButton({ children, href, className = '', onClick }: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20 });

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.13);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.13);
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`magnetic-button ${className}`.trim()}
      style={{ x, y }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {children}<ArrowUpRight size={18} aria-hidden="true" />
    </motion.a>
  );
}

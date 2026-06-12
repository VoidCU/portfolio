'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotionSafe } from './hooks';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Generic whileInView fade+rise wrapper for grids/cards (contract §3.15).
 * Initial values are identical on server and hydration renders (the reduced
 * preference is honored after mount only); under reduced motion the y write
 * is instant, so the only perceived motion is the 0.3s opacity fade.
 * `data-anim` lets the layout's <noscript> override force visibility
 * when JavaScript is unavailable.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      data-anim=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={
        reduced
          ? { duration: 0.3, delay, y: { duration: 0 } }
          : { duration: 0.7, delay, ease: EASE_RISE }
      }
    >
      {children}
    </motion.div>
  );
}

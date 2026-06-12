'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

type OdometerProps = {
  /** e.g. '580+', '8,848', '005+', 'TOP 3%' */
  value: string;
  className?: string;
};

/**
 * CONTRACT §3.5 — odometer digit roll.
 * SSR / initial render shows the FINAL value (plain digits — SEO/LCP safe).
 * After mount each digit becomes a masked 0–9 strip already positioned at its
 * final digit; on first in-view it rolls from the 0-position to the target
 * (1.4s, ease-rise, 0.06 stagger per column right → left), once.
 * Reduced motion: static final value, no roll. `.numeric` applied internally.
 */
export function Odometer({ value, className = '' }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const tokens = value.split(/(\d)/).filter(Boolean);
  const digitCount = tokens.filter((t) => /\d/.test(t)).length;
  const roll = mounted && inView && !reduced;
  let digitIndex = 0;

  const tokenStyle: React.CSSProperties = {
    display: 'inline-block',
    height: '1em',
    lineHeight: 1,
    whiteSpace: 'pre',
  };

  return (
    <span
      ref={ref}
      className={`numeric ${className}`}
      style={{ display: 'inline-flex', alignItems: 'flex-end' }}
    >
      {/* aria-label is naming-prohibited on generic spans (Safari/VO drops it) —
          a visually-hidden copy carries the accessible name instead. */}
      <span className="sr-only">{value}</span>
      {tokens.map((tok, i) => {
        const isDigit = /\d/.test(tok);
        if (!isDigit || !mounted) {
          return (
            <span key={i} aria-hidden="true" style={tokenStyle}>
              {tok}
            </span>
          );
        }
        const d = Number(tok);
        const col = digitIndex++;
        // rightmost column first
        const delay = (digitCount - 1 - col) * 0.06;
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{ ...tokenStyle, overflow: 'hidden' }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ y: `${-d * 10}%` }}
              animate={roll ? { y: ['0%', `${-d * 10}%`] } : { y: `${-d * 10}%` }}
              transition={
                roll ? { duration: 1.4, ease: EASE_RISE, delay } : { duration: 0 }
              }
            >
              {DIGITS.map((g) => (
                <span key={g} style={{ display: 'block', height: '1em' }}>
                  {g}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

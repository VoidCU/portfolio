'use client';

/**
 * VOL.08 — reading-progress altimeter (brief §5 /blog/[slug]).
 * A 2px accent bar across the very top scrubs with page scroll, while a mono
 * chip climbs from the volume's altitude (8,200M) to the summit (8,848M) as
 * the reader descends the post. All per-frame values go through MotionValues
 * (textContent writes) — zero React state per frame. Decorative: aria-hidden.
 * Reduced motion: no spring lag, the readout still updates (informational).
 */

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

const BASE_M = 8200; // VOL.08 — FIELD NOTES
const SUMMIT_M = 8848;

function metersAt(progress: number): string {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const meters = Math.round((BASE_M + (SUMMIT_M - BASE_M) * clamped) / 10) * 10;
  return `${meters.toLocaleString('en-US')}M`;
}

export default function ReadingAltimeter() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progress = reduced ? scrollYProgress : sprung;
  const meterRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(progress, 'change', (v) => {
    if (meterRef.current) meterRef.current.textContent = metersAt(v);
  });

  // Sync once on mount (deep links / restored scroll positions).
  useEffect(() => {
    if (meterRef.current) meterRef.current.textContent = metersAt(progress.get());
  }, [progress]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[140]"
    >
      <motion.div
        className="h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <span className="label numeric absolute right-4 top-20 hidden border border-line-2 bg-surface px-2.5 py-1.5 sm:block">
        READ ALT. <span ref={meterRef}>8,200M</span> / 8,848M
      </span>
    </div>
  );
}

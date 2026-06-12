'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * F3 — Route transitions (CONTRACT §3.13 + §5, BRIEF §3.4). Enter-only.
 * On every route mount: children render immediately; a bg curtain wipes away
 * (clip-path) with the route's mono volume label flashing on it.
 * Skipped entirely on first load while the AltimeterBoot overlay is showing.
 */

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* CONTRACT §5 route table — `VOL.NN — NAME / ALTITUDE`. */
const VOLUMES: Record<string, string> = {
  '/': 'VOL.00 — BASECAMP / 1,400M',
  '/about': 'VOL.01 — ORIGIN / 2,300M',
  '/projects': 'VOL.02 — EXPEDITIONS / 3,500M',
  '/open-source': 'VOL.03 — FIELD KITS / 4,000M',
  '/skills': 'VOL.04 — INSTRUMENTS / 5,300M',
  '/experience': 'VOL.05 — THE ROUTE / 6,200M',
  '/clients': 'VOL.06 — SIGNALS / 7,100M',
  '/achievements': 'VOL.07 — SUMMIT LOG / 8,000M',
  '/blog': 'VOL.08 — FIELD NOTES / 8,200M',
  '/now': 'VOL.09 — PRESENT POSITION / 8,400M',
  '/uses': 'VOL.10 — GEAR MANIFEST / 8,500M',
  '/contact': 'VOL.11 — TRANSMISSION / 8,600M',
};

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  const reduce = useReducedMotion();
  const [curtain, setCurtain] = useState(false);
  const checked = useRef(false);

  /* Pre-paint: raise the curtain over the incoming route — unless this is the
     very first load and the AltimeterBoot overlay owns the screen. */
  useLayoutEffect(() => {
    if (checked.current) return;
    checked.current = true;
    let bootShowing = false;
    try {
      bootShowing = window.sessionStorage.getItem('voidcu-booted') === null;
    } catch {
      bootShowing = false;
    }
    if (!bootShowing) setCurtain(true);
  }, []);

  const clean =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  const label = VOLUMES[clean] ?? `VOL.?? — ${clean.toUpperCase()}`;

  return (
    <>
      {children}
      {curtain && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-bg"
          initial={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          animate={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={
            reduce ? { duration: 0.25 } : { duration: 0.7, ease: EASE_SUMMIT }
          }
          onAnimationComplete={() => setCurtain(false)}
        >
          {reduce ? (
            /* Reduced motion: static label, plain 0.25s fade. */
            <span className="label numeric">{label}</span>
          ) : (
            /* Label fades in over 0.1s, out by 0.3s before the wipe ends. */
            <motion.span
              className="label numeric"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.7,
                times: [0, 0.143, 0.43, 0.571],
                ease: 'linear',
              }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      )}
    </>
  );
}

'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

/** % of the doubled track per second — one full loop (50%) in 40s at baseVelocity 1. */
const SPEED = 1.25;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** Mounted matchMedia flag — SSR and first client render agree (false). */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

type MarqueeProps = {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
};

/**
 * CONTRACT §3.7 — velocity-coupled marquee. useAnimationFrame advances x at the
 * base velocity; scroll velocity adds a signed boost (factor clamped ±3, so a
 * fast up-scroll briefly reverses the track). Modulo wrap over an aria-hidden
 * duplicate makes the loop seamless. Pauses on hover/focus; tap toggles pause
 * on touch (WCAG 2.2.2). Reduced motion: single static row, no frame loop.
 */
export default function Marquee({
  children,
  baseVelocity = 1,
  className = '',
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion();
  const paused = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  /** BRIEF §7 — ambient layers pause offscreen. IO fires immediately on observe. */
  const inView = useRef(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1200, 1200], [-3, 3], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useAnimationFrame((_, delta) => {
    if (reduced || paused.current || !inView.current) return;
    const boost = factor.get();
    const moveBy = baseVelocity * SPEED * (delta / 1000) * (1 + boost);
    baseX.set(baseX.get() - moveBy);
  });

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex w-max items-center whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${className}`}
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onPointerDown={() => {
        /* WCAG 2.2.2 — touch users get a pause control too: tap toggles. */
        paused.current = !paused.current;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        style={{ x }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

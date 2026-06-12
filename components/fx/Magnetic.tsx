'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 };

function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}

type MagneticProps = {
  /** Must be a single element. */
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/**
 * CONTRACT §3.6 — magnetic element. Child translates strength × pointer offset
 * from center via spring 150/15/0.1; inner content moves an extra 0.3×.
 * Snaps home on leave. Fine-pointer only (matchMedia); inert under reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const x = useSpring(ox, SPRING);
  const y = useSpring(oy, SPRING);
  const innerX = useTransform(x, (v) => v * 0.3);
  const innerY = useTransform(y, (v) => v * 0.3);

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ox.set((e.clientX - (r.left + r.width / 2)) * strength);
    oy.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    ox.set(0);
    oy.set(0);
  };

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.span style={{ display: 'block', x, y }}>
        <motion.span style={{ display: 'block', x: innerX, y: innerY }}>
          {children}
        </motion.span>
      </motion.span>
    </span>
  );
}

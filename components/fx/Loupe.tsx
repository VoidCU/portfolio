'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DOT = 12;
const GROWN_SCALE = 64 / DOT;
const SPRING = { stiffness: 400, damping: 40 };

type Mode = 'view' | 'read' | null;

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

/**
 * CONTRACT §3.10 — ONE global instance (mounted in layout). 12px
 * mix-blend-difference dot springing after the pointer (400/40). Delegated
 * document mouseover/mouseout watches [data-cursor] targets: "view" grows the
 * dot to a ~64px pill with a mono 'VIEW →' label, "read" shows 'READ →'.
 * Hidden entirely on coarse pointers and under reduced motion.
 */
export default function Loupe() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>(null);
  const x = useSpring(-100, SPRING);
  const y = useSpring(-100, SPRING);

  const active = fine && !reduced;

  useEffect(() => {
    if (!active) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t =
        e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      if (t) setMode(t.getAttribute('data-cursor') === 'read' ? 'read' : 'view');
    };
    const out = (e: MouseEvent) => {
      const t =
        e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      if (!t) return;
      const rel = e.relatedTarget;
      if (rel instanceof Element && t.contains(rel)) return;
      setMode(null);
    };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      setMode(null);
    };
  }, [active, x, y]);

  if (!active) return null;

  const grown = mode !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[190] mix-blend-difference"
      style={{ x, y }}
    >
      {/* the dot — white inverts against both themes under difference */}
      <motion.span
        className="absolute rounded-full bg-white"
        style={{ left: 0, top: 0, x: '-50%', y: '-50%', width: DOT, height: DOT }}
        animate={{ scale: grown ? GROWN_SCALE : 1 }}
        transition={{ duration: 0.3, ease: EASE_RISE }}
      />
      {/* label — black knocks out of the white pill, so it reads as the page
          color through the inverted disc; visible only when grown */}
      <motion.span
        className="absolute font-mono uppercase text-black"
        style={{
          left: 0,
          top: 0,
          x: '-50%',
          y: '-50%',
          fontSize: 9,
          letterSpacing: '0.12em',
          whiteSpace: 'nowrap',
        }}
        animate={{ opacity: grown ? 1 : 0, scale: grown ? 1 : 0.6 }}
        transition={{ duration: 0.2, ease: EASE_RISE, delay: grown ? 0.08 : 0 }}
      >
        {mode === 'read' ? 'READ →' : 'VIEW →'}
      </motion.span>
    </motion.div>
  );
}

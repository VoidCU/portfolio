'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Mono-safe glyphs only — no katakana (CONTRACT §3.4 / BRIEF §3.13). */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/+-';

type ScrambleProps = {
  text: string;
  className?: string;
  /** 'hover' | 'mount' | boolean (controlled) */
  play?: 'hover' | 'mount' | boolean;
};

/**
 * CONTRACT §3.4 — scramble decode. 30ms tick, characters lock left → right.
 * SSR renders the final text. Reduced motion: no scramble, final text only.
 */
export function Scramble({ text, className = '', play = 'hover' }: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useReducedMotion();

  const stop = useCallback(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const run = useCallback(() => {
    stop();
    if (reduced) {
      setDisplay(text);
      return;
    }
    let locked = 0;
    timer.current = setInterval(() => {
      locked += 1;
      if (locked >= text.length) {
        stop();
        setDisplay(text);
        return;
      }
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const c = text.charAt(i);
        out +=
          i < locked || c === ' '
            ? c
            : GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      }
      setDisplay(out);
    }, 30);
  }, [text, reduced, stop]);

  // Keep display in sync if `text` changes while idle.
  useEffect(() => {
    if (timer.current === null) setDisplay(text);
  }, [text]);

  const playedMount = useRef(false);
  useEffect(() => {
    if (play === 'mount' && !playedMount.current) {
      playedMount.current = true;
      run();
    }
    if (typeof play === 'boolean') {
      if (play) run();
      else {
        stop();
        setDisplay(text);
      }
    }
    return stop;
  }, [play, run, stop, text]);

  return (
    <span
      className={className}
      onPointerEnter={play === 'hover' ? () => run() : undefined}
      onFocus={play === 'hover' ? () => run() : undefined}
    >
      {/* aria-label is naming-prohibited on generic spans (Safari/VO drops it) —
          a visually-hidden copy carries the accessible name instead. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Hydration-safe reduced-motion flag: false on the server AND on the first
 * client render (so SSR-baked initial styles always match hydration), true
 * only after mount when the user actually prefers reduced motion. Reduced
 * branches that swap `initial` values must use this instead of framer's
 * useReducedMotion directly.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}

/**
 * True when the device has a real cursor — `(hover: hover) and (pointer: fine)`.
 * SSR-safe: false on the server and on first client render (contract §3.16).
 * Gate every cursor-dependent feature behind this.
 */
export function useFinePointer(): boolean {
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
 * Live Kathmandu wall-clock, `HH:MM` 24h (`Asia/Kathmandu`, UTC+05:45).
 * Mounted-only — returns '' until mounted (render with
 * `suppressHydrationWarning` on the consuming element). Contract §3.16.
 */
export function useKtmTime(): string {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kathmandu',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    // setState bails out when the formatted string is unchanged,
    // so a 1s tick re-renders consumers only once per minute.
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

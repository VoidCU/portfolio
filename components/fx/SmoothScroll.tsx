'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Lenis smooth scroll (contract §3.1).
 * - `ReactLenis root`, lerp 0.09.
 * - Listens for `voidcu:lenis-stop` / `voidcu:lenis-start` CustomEvents on
 *   window (dispatched by overlay menu, command palette, preloader).
 * - No-op passthrough under reduced motion (native scrolling).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const stop = () => lenisRef.current?.lenis?.stop();
    const start = () => lenisRef.current?.lenis?.start();

    window.addEventListener('voidcu:lenis-stop', stop);
    window.addEventListener('voidcu:lenis-start', start);
    return () => {
      window.removeEventListener('voidcu:lenis-stop', stop);
      window.removeEventListener('voidcu:lenis-start', start);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.09 }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/* BRIEF §2.5 --ease-summit — literal value required by WAAPI `easing`. */
const EASE_SUMMIT = 'cubic-bezier(0.76, 0, 0.24, 1)';

type Theme = 'dark' | 'light';

/** The widest label — invisible sizer reserves real width pre-mount (no layout pop). */
const SIZER = '[ NIGHT ]';

/**
 * BRIEF §4.12 / CONTRACT §4 — Day/Night over the Range.
 * The theme flip itself lives in layout.tsx's anti-FOUC script
 * (`window.__voidcuToggleTheme`) — this component only wraps that call in the
 * View Transitions circular reveal expanding from the button. Feature-detects
 * `document.startViewTransition`; plain swap for unsupported browsers and
 * reduced motion. Label stays in sync via a `data-theme` MutationObserver so
 * ExpeditionRadio flips are reflected too.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const flip = () => {
      /* Single source of truth — never duplicate the flip logic (CONTRACT §4). */
      (window as unknown as { __voidcuToggleTheme?: () => void })
        .__voidcuToggleTheme?.();
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    /* Fallback: plain swap (unsupported browsers / reduced motion). */
    if (reduced || typeof doc.startViewTransition !== 'function') {
      flip();
      return;
    }

    /* Circular reveal expanding from the button (BRIEF §4.12). */
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 24;
    const y = rect ? rect.top + rect.height / 2 : 24;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(flip);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: EASE_SUMMIT,
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        /* Transition skipped (rapid toggles) — theme already flipped. */
      });
  };

  /* Pre-mount placeholder — same box as the real button, no layout pop. */
  if (theme === null) {
    return (
      <span aria-hidden="true" className="label numeric relative inline-block">
        <span className="invisible block">{SIZER}</span>
      </span>
    );
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="swipe label numeric relative inline-block cursor-pointer transition-transform duration-200 hover:-translate-y-px"
    >
      {/* Invisible sizer keeps width constant across DAY/NIGHT states */}
      <span aria-hidden="true" className="invisible block">
        {SIZER}
      </span>
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {theme === 'dark' ? '[ DAY ]' : '[ NIGHT ]'}
      </span>
    </button>
  );
}

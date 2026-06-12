'use client';

import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useBootGate } from './AltimeterBoot';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * framer's `useReducedMotion` is null on the server but resolves synchronously
 * on the client's hydration render. Branching on it during hydration makes the
 * client markup disagree with the SSR-baked `translateY(110%)` initial style.
 * Only honor the preference after mount so server and hydration renders match.
 */
function useReducedMotionAfterMount(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduced;
}

type LineMaskProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
};

/**
 * CONTRACT §3.3 — overflow-hidden wrapper, inner y '110%' → 0 on ease-rise.
 * Holds its hidden state until the boot gate opens AND the element is in view.
 * SSR renders the real text (hidden via initial transform, no ssr:false dynamics).
 * Reduced motion: 0.3s opacity fade, no y movement.
 */
export function LineMask({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  once = true,
}: LineMaskProps) {
  const Component = Tag as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const gate = useBootGate();
  const reduced = useReducedMotionAfterMount();
  const inView = useInView(ref, { once, margin: '-12%' });
  const show = gate && inView;

  const hidden = reduced ? { opacity: 0 } : { y: '110%' };
  // Reduced visible target still includes y so the SSR-baked translateY(110%)
  // is always cleared; the y write is instant (see transition), so the only
  // perceived motion under reduced motion is the 0.3s opacity fade.
  const visible = reduced ? { opacity: 1, y: '0%' } : { y: '0%' };

  return (
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      <motion.span
        data-anim=""
        style={{ display: 'block' }}
        initial={hidden}
        animate={show ? visible : hidden}
        transition={
          reduced
            ? { duration: 0.3, delay, y: { duration: 0 } }
            : { duration: 0.7, ease: EASE_RISE, delay }
        }
      >
        {children}
      </motion.span>
    </Component>
  );
}

type CharMaskProps = {
  text: string;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: number;
};

/**
 * CONTRACT §3.3 — per-char reveal. Accessible name comes from an sr-only copy
 * of the text (ARIA prohibits `aria-label` on a generic span — Safari/VoiceOver
 * drops it, leaving headings nameless); animated chars stay `aria-hidden`.
 * Words wrapped in their own overflow-hidden inline-blocks so masking never
 * breaks mid-word line wrapping.
 */
export function CharMask({
  text,
  delay = 0,
  className = '',
  as = 'span',
  stagger = 0.025,
}: CharMaskProps) {
  const Component = as as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const gate = useBootGate();
  const reduced = useReducedMotionAfterMount();
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const show = gate && inView;

  const words = useMemo(() => {
    let offset = 0;
    return text.split(' ').map((word) => {
      const start = offset;
      offset += word.length + 1; // +1 for the space
      return { word, start };
    });
  }, [text]);

  const hidden = reduced ? { opacity: 0 } : { y: '110%' };
  // y stays in the reduced visible target so the SSR-baked translateY(110%)
  // is always cleared (instantly — see transition); only opacity fades.
  const visible = reduced ? { opacity: 1, y: '0%' } : { y: '0%' };

  return (
    <Component ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map(({ word, start }, wi) => (
        <React.Fragment key={`${wi}-${word}`}>
          <span aria-hidden="true" className="inline-block overflow-hidden">
            {Array.from(word).map((ch, ci) => (
              <motion.span
                key={ci}
                data-anim=""
                className="inline-block"
                initial={hidden}
                animate={show ? visible : hidden}
                transition={
                  reduced
                    ? { duration: 0.3, delay, y: { duration: 0 } }
                    : {
                        duration: 0.7,
                        ease: EASE_RISE,
                        delay: delay + (start + ci) * stagger,
                      }
                }
              >
                {ch}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Component>
  );
}

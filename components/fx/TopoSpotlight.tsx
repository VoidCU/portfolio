'use client';

import { useEffect, useRef } from 'react';

/**
 * Contour-ish tile, encoded as a data-URI. `gray` keyword keeps it neutral in
 * both themes; visibility is controlled by stroke-opacity (4% base / 14%
 * spotlight duplicate).
 */
function tile(opacity: number): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>` +
    `<g fill='none' stroke='gray' stroke-width='1' stroke-opacity='${opacity}'>` +
    `<path d='M0 28 C 40 18, 70 44, 105 36 S 170 14, 200 28'/>` +
    `<path d='M0 70 C 50 58, 90 86, 130 76 S 180 58, 200 70'/>` +
    `<path d='M0 118 C 35 132, 80 104, 120 116 S 175 134, 200 118'/>` +
    `<path d='M0 162 C 45 150, 85 176, 125 166 S 170 148, 200 162'/>` +
    `<path d='M0 196 C 55 188, 95 204, 140 196 S 180 186, 200 196'/>` +
    `<path d='M58 86 C 70 78, 92 80, 98 92 C 104 104, 88 114, 74 110 C 60 106, 50 94, 58 86 Z'/>` +
    `<path d='M148 36 C 158 30, 170 34, 172 44 C 174 54, 160 58, 152 52 C 144 46, 142 42, 148 36 Z'/>` +
    `<path d='M30 140 C 38 134, 50 138, 51 146 C 52 154, 40 158, 33 152 C 26 146, 25 144, 30 140 Z'/>` +
    `</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const CSS = `
.vc-topo{position:absolute;inset:0;pointer-events:none;--x:-600px;--y:-600px;background-image:${tile(
  0.04
)};}
.vc-topo::before{content:"";position:absolute;inset:0;background-image:${tile(
  0.14
)};-webkit-mask-image:radial-gradient(600px at var(--x) var(--y),black,transparent);mask-image:radial-gradient(600px at var(--x) var(--y),black,transparent);}
@media (hover:none),(prefers-reduced-motion:reduce){.vc-topo::before{content:none;}}
`;

type TopoSpotlightProps = { className?: string };

/**
 * CONTRACT §3.9 — topo pattern ground at 4% with a ~600px pointer spotlight
 * revealing a 14% duplicate through a radial-gradient mask. Position written
 * via rAF-throttled `--x`/`--y` CSS vars — zero React state, zero re-renders.
 * Parent must be `relative`. Touch / reduced motion: static 4% pattern.
 */
export default function TopoSpotlight({ className = '' }: TopoSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The layer itself is pointer-events-none — track the parent section.
    const target = el.parentElement ?? el;
    let raf = 0;
    let px = 0;
    let py = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty('--x', `${px}px`);
          el.style.setProperty('--y', `${py}px`);
        });
      }
    };
    const leave = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      el.style.setProperty('--x', '-600px');
      el.style.setProperty('--y', '-600px');
    };

    target.addEventListener('pointermove', move, { passive: true });
    target.addEventListener('pointerleave', leave);
    return () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerleave', leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* React 19 hoists + dedupes by href across instances */}
      <style href="vc-topo" precedence="default">
        {CSS}
      </style>
      <div ref={ref} aria-hidden="true" className={`vc-topo ${className}`} />
    </>
  );
}

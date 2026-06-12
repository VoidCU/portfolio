'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siPython,
  siTensorflow,
  siPytorch,
  siDocker,
  siKubernetes,
  siFlutter,
  siPostgresql,
  siFastapi,
  siTailwindcss,
  type SimpleIcon,
} from 'simple-icons';
import { profile } from '@/data/profile';
import { LineMask } from './fx/LineMask';
import { Odometer } from './fx/Odometer';
import { Reveal } from './fx/Reveal';
import Marquee from './fx/Marquee';
import TopoSpotlight from './fx/TopoSpotlight';
import { useBootGate } from './fx/AltimeterBoot';

/* ────────────────────────────────────────────────────────────────────
   CH.04 — INSTRUMENTS · the gear manifest (brief §4.6)
   Bento of skill categories + one kinetic stack marquee + repo odometer.
   ──────────────────────────────────────────────────────────────────── */

const CSS = `
.vc-cell{position:relative;height:100%;--x:-600px;--y:-600px;transition:transform .2s var(--ease-micro);}
@media (hover:hover) and (pointer:fine){
  .vc-cell:hover{transform:translateY(-4px);}
}
.vc-cell::after{content:"";position:absolute;inset:0;padding:1px;pointer-events:none;background:radial-gradient(500px circle at var(--x) var(--y),var(--acc-2),transparent 45%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:opacity .25s var(--ease-micro);}
@media (hover:hover) and (pointer:fine){
  .vc-cell:hover::after{opacity:1;}
}
@media (hover:none),(prefers-reduced-motion:reduce){
  .vc-cell::after{content:none;}
  .vc-cell:hover{transform:none;}
}
.vc-flood{display:inline-block;color:transparent;-webkit-text-stroke:1px var(--c-ghost);background-image:linear-gradient(var(--c-text),var(--c-text));background-repeat:no-repeat;background-size:0% 100%;-webkit-background-clip:text;background-clip:text;transition:background-size .9s var(--ease-summit);}
.vc-flood.is-solid{background-size:100% 100%;}
@media (prefers-reduced-motion:reduce){
  .vc-flood{transition:none;background-size:100% 100%;}
}
.vc-si svg path{fill:var(--c-muted);transition:fill .2s var(--ease-micro);}
html:not([data-theme="light"]) .vc-si:hover svg path{fill:var(--brand,var(--c-text));}
`;

/* Stack marquee — contract §7: simple-icons inline SVG, fill-muted,
   brand fill on hover in dark theme only. */
const STACK_ICONS: SimpleIcon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siPython,
  siTensorflow,
  siPytorch,
  siDocker,
  siKubernetes,
  siFlutter,
  siPostgresql,
  siFastapi,
  siTailwindcss,
];

/** Near-black brand hexes (Next.js) vanish on the dark ground — omit the var
 *  so the stylesheet fallback (ink) takes over. Hex comes from package data. */
function brandStyle(icon: SimpleIcon): React.CSSProperties | undefined {
  const r = parseInt(icon.hex.slice(0, 2), 16);
  const g = parseInt(icon.hex.slice(2, 4), 16);
  const b = parseInt(icon.hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance < 0.16) return undefined;
  return { '--brand': `#${icon.hex}` } as React.CSSProperties;
}

/** Tiny inline hook (brief §4.6) — rAF-written --x/--y on the cell for the
 *  spotlight ring. Fine-pointer only; inert on touch / reduced motion. */
function useCellSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

/* One bento cell: Reveal handles the staggered entrance (y 24→0, once,
   -12% margin); the inner plate carries the hover lift + spotlight ring. */
function Cell({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useCellSpotlight();
  return (
    <Reveal delay={delay} className={`h-full bg-bg ${className}`}>
      <div ref={ref} className="vc-cell bg-surface">
        {children}
      </div>
    </Reveal>
  );
}

function CategoryCell({
  category,
  items,
  index,
}: {
  category: string;
  items: readonly string[];
  index: number;
}) {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5 flex items-center gap-3">
        <span aria-hidden className="h-px w-4 bg-accent" />
        <h3 className="label numeric">{`0${index + 1} — ${category}`}</h3>
      </div>
      <ul className="flex flex-wrap content-start gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="inline-block border border-line-3 px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-dim transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Competencies() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const gate = useBootGate();
  const headInView = useInView(headRef, { once: true, margin: '-12%' });

  // Ghost numeral parallax — 0.15× drift across the section's traversal.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  const repoStat =
    profile.stats.find((s) => s.label === 'Repos') ?? profile.stats[2];

  // Bento spans — lg 4-col map; sm 2-col tiles gaplessly via dense flow.
  const SPANS: Record<number, string> = {
    0: 'sm:col-span-2 lg:col-span-2', // Frontend & UI
    2: 'lg:row-span-2', // AI & Data — tall cell
    3: 'lg:col-span-2', // DevOps & Cloud
  };

  const cells: React.ReactNode[] = [];
  let pos = 0;
  profile.skills.forEach((cat, i) => {
    cells.push(
      <Cell key={cat.category} delay={pos++ * 0.07} className={SPANS[i] ?? ''}>
        <CategoryCell category={cat.category} items={cat.items} index={i} />
      </Cell>,
    );

    if (i === 2) {
      // Repo-count odometer cell
      cells.push(
        <Cell key="vc-repos" delay={pos++ * 0.07}>
          <div className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="label numeric">GITHUB — MANIFEST</p>
            <Odometer
              value={repoStat.value}
              className="font-display text-6xl font-medium text-accent md:text-7xl"
            />
            <p className="label numeric">{`${repoStat.label} SHIPPED`}</p>
          </div>
        </Cell>,
      );
    }

    if (i === 4) {
      // Kinetic stack marquee cell
      cells.push(
        <Cell key="vc-stack" delay={pos++ * 0.07} className="sm:col-span-2 lg:col-span-2">
          <div className="flex h-full flex-col justify-center gap-6 py-6">
            <p className="label numeric px-6">FIELD STACK — IN ROTATION</p>
            <Marquee baseVelocity={0.8}>
              {STACK_ICONS.map((icon) => (
                <span
                  key={icon.slug}
                  title={icon.title}
                  className="vc-si mx-5 inline-flex"
                  style={brandStyle(icon)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    role="img"
                    aria-label={icon.title}
                  >
                    <path d={icon.path} />
                  </svg>
                </span>
              ))}
            </Marquee>
          </div>
        </Cell>,
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="instruments"
      className="relative overflow-hidden border-t border-line-1 bg-bg"
    >
      <TopoSpotlight />

      {/* Chapter plate — ghost numeral, parallax 0.15× */}
      <motion.span
        aria-hidden
        className="ghost-outline font-display numeric pointer-events-none absolute -top-8 right-0 leading-none select-none text-[clamp(11rem,22vw,22rem)]"
        style={reduced ? undefined : { y: ghostY }}
      >
        04
      </motion.span>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
        <div ref={headRef} className="mb-14 md:mb-20">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <LineMask as="p" className="label numeric">
              CH.04 — INSTRUMENTS
            </LineMask>
            <LineMask as="p" delay={0.08} className="label numeric">
              ▲ 5,300M
            </LineMask>
          </div>
          <LineMask as="h2" className="font-display text-chapter font-medium tracking-tight">
            <span className={`vc-flood ${gate && headInView ? 'is-solid' : ''}`}>
              INSTRUMENTS
            </span>
          </LineMask>
          <LineMask as="p" delay={0.15} className="font-voice text-epigraph text-dim mt-6">
            “Every instrument earns its weight.”
          </LineMask>
        </div>

        {/* Gear manifest — bento grid; 1px cartography via gap-px mortar */}
        <div className="grid grid-flow-dense grid-cols-1 gap-px border border-line-2 bg-line-2 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {cells}
        </div>

        {/* Field note */}
        <div className="mt-8 flex items-center gap-4">
          <div aria-hidden className="h-px flex-1 bg-line-2" />
          <p className="label numeric whitespace-nowrap">
            5 years · full-stack to low-level
          </p>
          <div aria-hidden className="h-px flex-1 bg-line-2" />
        </div>
      </div>

      {/* React 19 hoists + dedupes by href */}
      <style href="vc-instruments" precedence="default">
        {CSS}
      </style>
    </section>
  );
}

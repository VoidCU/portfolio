'use client';

import {
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * F3 — TrailSpine (CONTRACT §3.11 + §5, BRIEF §3.2).
 * Fixed left rail (lg+): scroll-drawn wandering route path, 8 waypoint dots
 * (one per homepage chapter), live altimeter readout 1,400M → 8,848M.
 * Below lg: a fixed 2px top progress bar. Entirely decorative (aria-hidden).
 */

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* CONTRACT §5 rows 1–8 — section ids the waypoints bind to. */
const SECTION_IDS = [
  'origin',
  'expeditions',
  'index',
  'instruments',
  'route',
  'signals',
  'summit-log',
  'transmission',
];

const ALT_MIN = 1400;
const ALT_MAX = 8848;

/* Gently wandering vertical route, y-monotonic, in a 48 × 1000 viewBox
   (1 viewBox x-unit == 1px across the 48px rail). */
const PATH_D =
  'M24 0 C31 70 13 132 20 200 C27 268 35 332 26 400 C17 468 12 534 22 600 C32 666 34 732 25 800 C16 868 20 936 24 1000';

type Waypoint = { id: string; frac: number; x: number };

function formatAltitude(progress: number): string {
  const raw = ALT_MIN + progress * (ALT_MAX - ALT_MIN);
  const alt = Math.min(ALT_MAX, Math.max(ALT_MIN, Math.round(raw / 10) * 10));
  return `${alt.toLocaleString('en-US')}M`;
}

function WaypointDot({
  point,
  passed,
  reduce,
}: {
  point: Waypoint;
  passed: boolean;
  reduce: boolean;
}) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const wasPassed = useRef(passed);

  /* One-shot pulse the moment the trail tip passes this camp. */
  useEffect(() => {
    if (passed && !wasPassed.current && !reduce && dotRef.current) {
      animate(
        dotRef.current,
        { scale: [1, 1.4, 1] },
        { duration: 0.7, ease: EASE_RISE },
      );
    }
    wasPassed.current = passed;
  }, [passed, reduce]);

  return (
    <span
      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: `${point.frac * 100}%`, left: `${point.x}px` }}
    >
      <span
        ref={dotRef}
        className={`block h-[7px] w-[7px] rounded-full border ${
          passed ? 'border-accent bg-accent' : 'border-line-4 bg-bg'
        }`}
      />
    </span>
  );
}

export default function TrailSpine() {
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  /* Reduced motion: no scrub lag — values still update (informational). */
  const progress = reduce ? scrollYProgress : sprung;

  const pathRef = useRef<SVGPathElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [points, setPoints] = useState<Waypoint[]>([]);
  const [passedCount, setPassedCount] = useState(0);

  /* Measure section offsets as fractions of document height — on mount and
     whenever the body resizes (fonts, images, accordions, breakpoints). */
  useEffect(() => {
    /* Sample x along the rendered path so dots sit ON the trail. */
    const xAtFrac = (frac: number): number => {
      const path = pathRef.current;
      if (!path) return 24;
      const targetY = frac * 1000;
      let lo = 0;
      let hi = path.getTotalLength();
      for (let i = 0; i < 18; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < targetY) lo = mid;
        else hi = mid;
      }
      return path.getPointAtLength((lo + hi) / 2).x;
    };

    const measure = () => {
      const total = document.documentElement.scrollHeight || 1;
      const next: Waypoint[] = [];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const frac = Math.min(0.98, Math.max(0.01, top / total));
        next.push({ id, frac, x: xAtFrac(frac) });
      }
      next.sort((a, b) => a.frac - b.frac);
      setPoints((prev) =>
        prev.length === next.length &&
        prev.every(
          (p, i) =>
            p.id === next[i].id && Math.abs(p.frac - next[i].frac) < 0.001,
        )
          ? prev
          : next,
      );
    };

    measure();
    /* Coalesce re-measures behind a trailing debounce: body height animates
       per-frame during accordion/layout transitions, and measure() is a heavy
       layout-read pass — run it once, after the resize settles. The body RO
       also covers window resizes (body box tracks the viewport), so no
       separate resize listener is needed. */
    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleMeasure = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(document.body);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

  /* Instrument writes: MotionValue events → textContent / state. No per-frame
     React state — passedCount only changes when a waypoint is crossed. */
  const updateInstruments = (v: number) => {
    if (readoutRef.current) {
      readoutRef.current.textContent = formatAltitude(v);
    }
    let n = 0;
    for (const p of points) if (v >= p.frac) n++;
    setPassedCount((c) => (c === n ? c : n));
  };

  useMotionValueEvent(progress, 'change', updateInstruments);

  /* Initial paint + after (re)measure. */
  useEffect(() => {
    updateInstruments(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, reduce]);

  return (
    <>
      {/* lg+: the rail. pointer-events-none except the waypoints. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-screen w-12 lg:block"
      >
        <div className="absolute inset-x-0 bottom-14 top-0">
          <svg
            className="h-full w-full"
            viewBox="0 0 48 1000"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={pathRef}
              d={PATH_D}
              className="stroke-line-4"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            {/* Drawn portion — accent, scrubbed by sprung scroll progress.
                Reduced motion: fully drawn. */}
            <motion.path
              d={PATH_D}
              className="stroke-accent"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : sprung }}
            />
          </svg>
          {points.map((point, i) => (
            <WaypointDot
              key={point.id}
              point={point}
              passed={i < passedCount}
              reduce={reduce}
            />
          ))}
        </div>
        {/* Altimeter readout — written via MotionValue event, never state. */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <span
            ref={readoutRef}
            className="numeric font-mono text-[0.62rem] tracking-[0.04em] text-muted"
          >
            1,400M
          </span>
        </div>
      </div>

      {/* Below lg: 2px top progress bar. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-accent lg:hidden"
        style={{ scaleX: progress }}
      />
    </>
  );
}

'use client';

/**
 * OFF THE TRAIL — 404 (BRIEF §5, final wow moment #11).
 * The trail spine wanders off-canvas into a dead end (drawn on mount);
 * a compass readout spins via spring and settles pointing at the magnetic
 * RETURN TO BASECAMP link; corner coordinates scramble endlessly; the
 * headline letters have come loose — draggable and throwable, touch included.
 * Transform/opacity/clip-path only; reduced-motion gets a composed static map.
 */

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Magnetic from '@/components/fx/Magnetic';
import { Scramble } from '@/components/fx/Scramble';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Mount-rise — boot-gate-free entrance (the gate never opens on 404   */
/* deep links, so this page choreographs its own arrival)              */
/* ------------------------------------------------------------------ */

function Rise({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0.3 }
          : { duration: 0.7, ease: EASE_RISE, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The trail that wanders into a dead end — drawn on mount             */
/* ------------------------------------------------------------------ */

/* Switchbacks climbing from the bottom-left, curling back on themselves
   before stopping mid-map. Waypoints ignite as the path passes them. */
const TRAIL_D =
  'M -40 720 C 120 660 200 640 170 580 C 140 524 40 520 90 470 ' +
  'C 136 424 300 470 380 430 C 460 390 420 330 330 330 ' +
  'C 250 330 240 270 330 250 C 420 230 560 290 640 260 ' +
  'C 700 238 690 200 640 196 C 600 193 580 210 590 224';

const WAYPOINTS = [
  { cx: 170, cy: 580, delay: 0.7 },
  { cx: 380, cy: 430, delay: 1.3 },
  { cx: 330, cy: 250, delay: 1.9 },
];

/* Dead-end cross at the path terminus. */
const DEAD_END = ['M 574 208 L 606 240', 'M 606 208 L 574 240'];

function DeadEndTrail() {
  const reduced = useReducedMotion();

  const draw = reduced
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 2.2, ease: EASE_RISE, delay: 0.3 },
      };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.path
          d={TRAIL_D}
          className="stroke-acc-5"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw}
        />
        {WAYPOINTS.map(({ cx, cy, delay }) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={5}
            className="fill-accent"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 0.7 },
                  transition: { duration: 0.3, delay },
                })}
            {...(reduced ? { opacity: 0.7 } : {})}
          />
        ))}
        {DEAD_END.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="stroke-danger"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            {...(reduced
              ? {}
              : {
                  initial: { pathLength: 0, opacity: 0 },
                  animate: { pathLength: 1, opacity: 0.9 },
                  transition: {
                    duration: 0.3,
                    ease: EASE_RISE,
                    delay: 2.5 + i * 0.12,
                  },
                })}
            {...(reduced ? { opacity: 0.9 } : {})}
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Compass — spins on a spring, settles pointing at the return link    */
/* ------------------------------------------------------------------ */

const NEEDLE_SPRING = { stiffness: 26, damping: 7, mass: 1 };
const SPIN = 1080; // three full turns before settling

const TICKS = Array.from({ length: 24 }, (_, i) => {
  const deg = i * 15;
  const main = deg % 90 === 0;
  const rad = (deg * Math.PI) / 180;
  const r1 = main ? 40 : 44;
  const r = (v: number) => Math.round(v * 100) / 100;
  return {
    deg,
    main,
    x1: r(50 + r1 * Math.sin(rad)),
    y1: r(50 - r1 * Math.cos(rad)),
    x2: r(50 + 48 * Math.sin(rad)),
    y2: r(50 - 48 * Math.cos(rad)),
  };
});

const CARDINALS = [
  { letter: 'N', x: 50, y: 28 },
  { letter: 'E', x: 73, y: 53 },
  { letter: 'S', x: 50, y: 79 },
  { letter: 'W', x: 27, y: 53 },
];

function Compass({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const reduced = useReducedMotion();
  const dialRef = useRef<HTMLButtonElement>(null);
  const hdgRef = useRef<HTMLSpanElement>(null);

  const bearing = useMotionValue(0);
  const needle = useSpring(bearing, NEEDLE_SPRING);

  /* Heading readout — written straight to textContent, zero React state. */
  useMotionValueEvent(needle, 'change', (v) => {
    if (!hdgRef.current) return;
    const deg = ((Math.round(v) % 360) + 360) % 360;
    hdgRef.current.textContent = `HDG ${String(deg).padStart(3, '0')}°`;
  });

  useEffect(() => {
    /* Bearing from the dial center to the basecamp link center (0° = up). */
    const aim = (): number | null => {
      const dial = dialRef.current;
      const target = targetRef.current;
      if (!dial || !target) return null;
      const d = dial.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const dx = t.left + t.width / 2 - (d.left + d.width / 2);
      const dy = t.top + t.height / 2 - (d.top + d.height / 2);
      return (Math.atan2(dx, -dy) * 180) / Math.PI;
    };

    const settle = window.setTimeout(
      () => {
        const angle = aim();
        if (angle === null) return;
        if (reduced) {
          /* Designed static state: needle already on bearing, no spin. */
          bearing.set(angle);
          needle.jump(angle);
        } else {
          bearing.set(angle + SPIN);
        }
      },
      reduced ? 0 : 1700,
    );

    /* Re-aim on resize without re-spinning (keep accumulated turns). */
    const onResize = () => {
      const angle = aim();
      if (angle === null) return;
      const turns = Math.round((bearing.get() - angle) / 360) * 360;
      bearing.set(angle + turns);
      if (reduced) needle.jump(angle + turns);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('resize', onResize);
    };
  }, [bearing, needle, reduced, targetRef]);

  /* One bonus turn per click — user-initiated, reduced-motion safe to skip. */
  const respin = () => {
    if (reduced) return;
    bearing.set(bearing.get() + 360);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        ref={dialRef}
        type="button"
        onClick={respin}
        aria-label="Spin the compass needle"
        className="relative block h-28 w-28 cursor-pointer rounded-full sm:h-32 sm:w-32"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <circle cx={50} cy={50} r={49} className="stroke-line-3" strokeWidth={1} />
          {TICKS.map((t) => (
            <line
              key={t.deg}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              className={t.main ? 'stroke-line-5' : 'stroke-line-3'}
              strokeWidth={t.main ? 1.5 : 1}
            />
          ))}
          {CARDINALS.map((c) => (
            <text
              key={c.letter}
              x={c.x}
              y={c.y}
              textAnchor="middle"
              fontSize={7.5}
              className="fill-muted font-mono"
            >
              {c.letter}
            </text>
          ))}
        </svg>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 will-change-transform"
          style={{ rotate: needle }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
            <path d="M50 14 L55 50 L50 60 L45 50 Z" className="fill-accent" />
            <path d="M50 86 L54 50 L46 50 Z" className="fill-line-4" />
          </svg>
        </motion.div>
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        />
      </button>
      <span ref={hdgRef} aria-hidden="true" className="label numeric mt-3 block">
        HDG 000°
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Corner coordinates — scramble looping between known and lost        */
/* ------------------------------------------------------------------ */

const LOST_COORDS = ['27.7172°N — 85.3240°E', '??.????°N — ??.????°E'];

function LostSignal() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 3000);
    return () => window.clearInterval(id);
  }, [reduced]);

  /* Remounting per tick replays the mount scramble — an endless loop.
     Reduced motion: Scramble renders the final text, the interval is off. */
  return (
    <Scramble
      key={tick}
      play="mount"
      text={LOST_COORDS[tick % LOST_COORDS.length]}
      className="label numeric"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Headline — the letters have come loose                              */
/* ------------------------------------------------------------------ */

const HEADLINE = ['OFF', 'THE', 'TRAIL'];

function LooseLetter({
  ch,
  index,
  constraints,
}: {
  ch: string;
  index: number;
  constraints: React.RefObject<HTMLElement | null>;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className="relative inline-block cursor-grab select-none active:cursor-grabbing"
      style={{ touchAction: 'none' }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0.3 }
          : { duration: 0.7, ease: EASE_RISE, delay: 0.25 + index * 0.03 }
      }
      drag
      dragConstraints={constraints}
      dragElastic={0.18}
      dragMomentum
      dragTransition={{
        bounceStiffness: 260,
        bounceDamping: 16,
        power: 0.7,
        timeConstant: 280,
      }}
      whileDrag={{ scale: 1.08, zIndex: 30 }}
      whileTap={{ scale: 1.04 }}
    >
      {ch}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* View                                                                */
/* ------------------------------------------------------------------ */

export default function NotFoundView() {
  /* Generous throw bounds — the whole field section. */
  const fieldRef = useRef<HTMLElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  let letterIndex = 0;

  return (
    <section
      ref={fieldRef}
      className="relative flex min-h-[100svh] flex-col overflow-clip bg-bg"
    >
      <DeadEndTrail />

      {/* Corner instrument readouts */}
      <Rise
        delay={0.15}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pt-24 sm:px-10"
      >
        <div className="label numeric space-y-1">
          <p>ERR 404 — OFF ROUTE</p>
          <p>LAST WAYPOINT · BASECAMP 1,400M</p>
        </div>
        <div className="label numeric space-y-1 text-right">
          <p>
            <LostSignal />
          </p>
          <p>POSITION UNCERTAIN</p>
        </div>
      </Rise>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-16 pt-36 sm:px-10">
        <h1
          aria-label="OFF THE TRAIL"
          className="font-display text-chapter relative z-20 flex flex-wrap gap-x-[0.22em] font-semibold text-ink"
        >
          {HEADLINE.map((word) => (
            <span key={word} aria-hidden="true" className="whitespace-nowrap">
              {Array.from(word).map((ch, ci) => (
                <LooseLetter
                  key={`${word}-${ci}`}
                  ch={ch}
                  index={letterIndex++}
                  constraints={fieldRef}
                />
              ))}
            </span>
          ))}
        </h1>

        <Rise delay={0.75}>
          <p aria-hidden="true" className="label mt-6">
            ( The letters have come loose — drag them )
          </p>
        </Rise>

        <Rise delay={0.85}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-dim">
            The page you are looking for does not exist. It may have moved,
            been deleted, or never existed in the first place.
          </p>
        </Rise>

        <Rise
          delay={0.95}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-8"
        >
          <Compass targetRef={linkRef} />
          <Magnetic>
            <Link
              ref={linkRef}
              href="/"
              className="group inline-flex items-center gap-3 border border-line-4 bg-surface px-7 py-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-micro)] hover:-translate-y-0.5 hover:border-acc-5 hover:bg-raised"
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-1.5"
              >
                ←
              </span>
              <span className="swipe numeric">Return to Basecamp (1,400M)</span>
            </Link>
          </Magnetic>
        </Rise>
      </div>

      {/* Bottom telemetry hairline */}
      <Rise delay={1.1} className="relative z-10 border-t border-line-2">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-4 sm:px-10">
          <p className="label numeric">Trail log · Dead end recorded</p>
          <p className="label numeric">Elev — · Grid ref unknown</p>
        </div>
      </Rise>
    </section>
  );
}

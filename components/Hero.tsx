'use client';

import Link from 'next/link';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { CharMask } from '@/components/fx/LineMask';
import { Odometer } from '@/components/fx/Odometer';
import Magnetic from '@/components/fx/Magnetic';
import { useFinePointer, useKtmTime, useReducedMotionSafe } from '@/components/fx/hooks';
import { useBootGate } from '@/components/fx/AltimeterBoot';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PARALLAX_SPRING = { stiffness: 100, damping: 30, mass: 0.4 };

const COORDS = '27.7172°N — 85.3240°E';
const ALTITUDE = '1,400M';
const ROLES = ['FULL-STACK ENGINEER', 'AI BUILDER', 'SYSTEMS LEAD'];

/* ------------------------------------------------------------------ */
/* Layer 1 — canvas star field (dark theme only, ≤120 particles)       */
/* ------------------------------------------------------------------ */

function Starfield() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dark, setDark] = useState(false);

  /* Watch data-theme on <html> — stars exist only under HIGH NIGHT. */
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark((root.dataset.theme ?? 'dark') !== 'light');
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !dark) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    /* Star ink comes from the live token, never a hardcoded hex. */
    const ink =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--c-text')
        .trim() || 'currentColor';

    type Star = { x: number; y: number; r: number; phase: number; speed: number };
    let stars: Star[] = [];

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      const count = Math.min(
        120,
        Math.max(40, Math.round((rect.width * rect.height) / 14000)),
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.82,
        r: (0.4 + Math.random() * 1.1) * dpr,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.9,
      }));
    };

    let frameId = 0;
    let playing = false;
    let onscreen = true;

    const draw = (t: number) => {
      frameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ink;
      for (const s of stars) {
        const twinkle =
          0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.phase + (t / 1000) * s.speed));
        ctx.globalAlpha = twinkle * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    /* Pause on tab-hide and when the hero scrolls offscreen. */
    const sync = () => {
      const should = !document.hidden && onscreen;
      if (should && !playing) {
        playing = true;
        frameId = requestAnimationFrame(draw);
      } else if (!should && playing) {
        playing = false;
        cancelAnimationFrame(frameId);
      }
    };

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver((entries) => {
      onscreen = entries[0]?.isIntersecting ?? true;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => seed());
    ro.observe(canvas);

    seed();
    sync();

    return () => {
      cancelAnimationFrame(frameId);
      playing = false;
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced, dark]);

  if (reduced || !dark) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Foreground helpers                                                  */
/* ------------------------------------------------------------------ */

/** Fades content in once the boot gate opens (rest of hero choreography). */
function GateFade({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const gate = useBootGate();
  /* Hydration-safe: SSR and first client render agree on the non-reduced
     initial (opacity 0, y 12); the reduced path then clears y instantly so
     no translateY residue survives for reduced-motion users. */
  const reduced = useReducedMotionSafe();
  const hidden = { opacity: 0, y: 12 };
  const visible = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={gate ? visible : hidden}
      transition={
        reduced
          ? { duration: 0.3, delay, y: { duration: 0 } }
          : { duration: 0.7, ease: EASE_RISE, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/** Fixed-height mono y-mask role cycler — static first value under reduced motion.
 *  WCAG 2.2.2: auto-cycling stops after a fixed number of loops (settling back on
 *  the primary role) instead of running indefinitely. */
const ROLE_LOOPS = 2;

function RoleCycler() {
  const gate = useBootGate();
  const reduced = useReducedMotionSafe();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!gate || reduced) return;
    let swaps = 0;
    const id = window.setInterval(() => {
      swaps += 1;
      setIdx((i) => (i + 1) % ROLES.length);
      /* Full loops end on index 0 — the readout settles on the primary role. */
      if (swaps >= ROLES.length * ROLE_LOOPS) window.clearInterval(id);
    }, 3500);
    return () => window.clearInterval(id);
  }, [gate, reduced]);

  return (
    <span className="relative block h-5 overflow-hidden">
      {/* aria-label is naming-prohibited on generic spans — sr-only copy instead. */}
      <span className="sr-only">{ROLES.join(' / ')}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={idx}
          aria-hidden="true"
          className="flex h-5 items-center whitespace-nowrap"
          initial={reduced ? { opacity: 0 } : { y: '110%' }}
          animate={reduced ? { opacity: 1 } : { y: '0%' }}
          exit={reduced ? { opacity: 0 } : { y: '-110%' }}
          transition={{ duration: reduced ? 0.3 : 0.5, ease: EASE_RISE }}
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 3 — ridgeline geometry (viewBox 0 0 1440 360, stretch)        */
/* ------------------------------------------------------------------ */

const RIDGES = [
  {
    /* far — ghost fill, highest peaks */
    d: 'M0 360 L0 200 L90 148 L160 190 L260 88 L340 162 L430 110 L520 180 L610 58 L700 150 L790 98 L880 170 L960 120 L1050 190 L1140 78 L1230 160 L1320 118 L1440 178 L1440 360 Z',
    fill: 'fill-ghost',
    height: 'h-[34vh] min-h-[200px]',
  },
  {
    /* mid — raised fill */
    d: 'M0 360 L0 252 L110 192 L210 240 L330 152 L450 230 L560 172 L680 250 L800 142 L920 230 L1040 182 L1160 250 L1280 172 L1380 228 L1440 202 L1440 360 Z',
    fill: 'fill-raised',
    height: 'h-[25vh] min-h-[150px]',
  },
  {
    /* near — surface fill, lowest foothills */
    d: 'M0 360 L0 300 L140 252 L280 290 L420 222 L560 280 L720 232 L880 290 L1020 242 L1180 294 L1320 252 L1440 284 L1440 360 Z',
    fill: 'fill-surface',
    height: 'h-[16vh] min-h-[100px]',
  },
] as const;

/* Pointer amplitude (px) and scroll-parallax factor per layer, far → near. */
const RIDGE_MOTION = [
  { amp: 6, factor: 0.05 },
  { amp: 14, factor: 0.12 },
  { amp: 26, factor: 0.25 },
] as const;

/* ------------------------------------------------------------------ */
/* Hero — Basecamp                                                     */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const gate = useBootGate();
  const time = useKtmTime();

  const [first, middle, last] = profile.name.toUpperCase().split(' ');

  /* Pointer parallax — fine-pointer only, ±1 normalized, springed. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, PARALLAX_SPRING);
  const sy = useSpring(py, PARALLAX_SPRING);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!fine || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  /* Scroll parallax — ridgelines separate, headline drifts at 0.3×. */
  const { scrollY } = useScroll();

  const farX = useTransform(sx, (v) => v * RIDGE_MOTION[0].amp);
  const farY = useTransform([sy, scrollY], (latest) => {
    const [p, s] = latest as number[];
    return reduced ? 0 : p * RIDGE_MOTION[0].amp + s * RIDGE_MOTION[0].factor;
  });
  const midX = useTransform(sx, (v) => v * RIDGE_MOTION[1].amp);
  const midY = useTransform([sy, scrollY], (latest) => {
    const [p, s] = latest as number[];
    return reduced ? 0 : p * RIDGE_MOTION[1].amp + s * RIDGE_MOTION[1].factor;
  });
  const nearX = useTransform(sx, (v) => v * RIDGE_MOTION[2].amp);
  const nearY = useTransform([sy, scrollY], (latest) => {
    const [p, s] = latest as number[];
    return reduced ? 0 : p * RIDGE_MOTION[2].amp + s * RIDGE_MOTION[2].factor;
  });
  const headY = useTransform(scrollY, (v) => (reduced ? 0 : v * 0.3));

  const ridgeStyles = [
    { x: farX, y: farY },
    { x: midX, y: midY },
    { x: nearX, y: nearY },
  ];

  return (
    <section
      id="basecamp"
      className="relative flex min-h-[100svh] flex-col overflow-clip bg-bg"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Layer 1 — stars (HIGH NIGHT only) */}
      <Starfield />

      {/* Layer 2 — aurora / dawn-mist blobs (pre-softened radials, transform-only drift) */}
      <div aria-hidden="true" className="hero-aurora hero-aurora-a" />
      <div aria-hidden="true" className="hero-aurora hero-aurora-b" />

      {/* Layer 3 — three ridgelines, pointer + scroll parallax */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {RIDGES.map((ridge, i) => (
          <motion.div
            key={ridge.fill}
            className={`absolute -inset-x-10 -bottom-12 ${ridge.height} will-change-transform`}
            style={{ top: 'auto', x: ridgeStyles[i].x, y: ridgeStyles[i].y }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1440 360"
              preserveAspectRatio="none"
            >
              <path d={ridge.d} className={ridge.fill} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Corner metadata — instrument readouts */}
      <GateFade
        delay={0.55}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 px-6 pt-20 sm:px-10"
      >
        <div className="label numeric space-y-1">
          <p>{COORDS}</p>
          <p>
            {ALTITUDE} · {profile.contacts.location}
          </p>
        </div>
        <div className="label numeric space-y-1 text-right">
          <p suppressHydrationWarning>KTM {time || '--:--'}</p>
          <p className="flex items-center justify-end gap-2">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open for work
          </p>
        </div>
      </GateFade>

      {/* Foreground — name, role cycler, CTAs (drifts up at 0.3× on scroll-out) */}
      <motion.div
        style={{ y: headY }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-32 sm:px-10"
      >
        <h1 className="font-display text-display font-semibold text-ink">
          <CharMask text={first ?? ''} as="span" className="block" />
          <CharMask text={middle ?? ''} as="span" className="block" delay={0.08} />
          <CharMask text={last ?? ''} as="span" className="block" delay={0.16} />
        </h1>

        {/* Role readout + education */}
        <GateFade
          delay={0.45}
          className="mt-8 flex flex-col gap-3 border-t border-line-2 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink sm:text-sm">
            <span className="text-muted" aria-hidden="true">
              ./
            </span>
            <RoleCycler />
          </div>
          <p className="label numeric">
            {profile.education.degree} · {profile.education.institution}
          </p>
        </GateFade>

        {/* CTAs */}
        <GateFade delay={0.6} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link href="/projects" className="btn-primary">
              View Work
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </Magnetic>
        </GateFade>
      </motion.div>

      {/* Stats row — odometer rolls once the curtain clears */}
      <GateFade delay={0.7} className="relative z-10 border-t border-line-2">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-6 sm:grid-cols-4 sm:px-10">
          {profile.stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`border-line-1 px-4 py-4 sm:py-5 ${i > 0 ? 'border-l' : ''} ${
                i === 2 ? 'max-sm:border-l-0' : ''
              } ${i >= 2 ? 'max-sm:border-t' : ''}`}
            >
              {gate ? (
                <Odometer
                  value={value}
                  className="font-display text-2xl font-semibold leading-none text-ink sm:text-3xl"
                />
              ) : (
                <span className="numeric font-display text-2xl font-semibold leading-none text-ink sm:text-3xl">
                  {value}
                </span>
              )}
              <p className="label mt-2">{label}</p>
            </div>
          ))}
        </div>
      </GateFade>

      {/* Atmosphere CSS (.hero-aurora, .hero-aurora-a/-b, hero-drift keyframes)
          lives in app/globals.css — the brief's atmosphere-only hues (§2.1/§2.2)
          are color values, and CONTRACT §0 bans hardcoded rgba in components. */}
    </section>
  );
}

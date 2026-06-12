'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Decorative camp elevations (brief §4.7) — purely stylistic. Assigned by
 * chronology: the oldest role camps lowest, the newest highest. profile.timeline
 * is ordered newest-first, so camp i gets STEPS[length - 1 - i]:
 * BloomBytes 2,000M → Freelance 3,400M → KS 4,600M → Elytra 5,800M → Neuron Nest 7,200M.
 */
const CAMP_STEPS = ['2,000M', '3,400M', '4,600M', '5,800M', '7,200M'];

/** Expedition-year readout range, scrubbed by the trail's scroll progress. */
const YEARS = ['2022', '2023', '2024', '2025', '2026'];

/** Waypoints ignite near the viewport's middle band — roughly where the trail tip is. */
const DOT_VIEWPORT_MARGIN = '-35% 0px -40% 0px';

type CampData = (typeof profile.timeline)[number];

/* ── CH.05 — THE ROUTE ─────────────────────────────────────────────── */

export default function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Ghost numeral parallax (~0.15× of section travel)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(sectionProgress, [0, 1], [-56, 56]);

  // The trail: drawn as the camps scroll through the middle of the viewport
  const { scrollYProgress: trailProgress } = useScroll({
    target: trailRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const drawn = useSpring(trailProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="route"
      aria-labelledby="route-title"
      className="relative overflow-x-clip border-t border-line-1 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-36">
        {/* Chapter plate */}
        <header className="relative mb-20 lg:mb-28">
          <motion.span
            aria-hidden="true"
            style={{ y: reduced ? 0 : ghostY }}
            className="ghost-outline font-display numeric pointer-events-none absolute -top-10 right-0 leading-none select-none text-[11rem] md:text-[16rem] lg:-top-20 lg:text-[22rem]"
          >
            05
          </motion.span>

          <div className="relative flex items-center justify-between">
            <LineMask as="p" className="label numeric">
              CH.05 — THE ROUTE
            </LineMask>
            <LineMask as="p" delay={0.08} className="label numeric">
              ▲ 6,200M
            </LineMask>
          </div>

          <LineMask as="h2" className="relative mt-5">
            <span
              id="route-title"
              className="font-display text-chapter font-semibold text-ink"
            >
              <FloodTitle text="THE ROUTE" />
            </span>
          </LineMask>

          <LineMask className="relative mt-6" delay={0.15}>
            <p className="font-voice text-epigraph text-dim">
              A route is written one camp at a time.
            </p>
          </LineMask>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_6rem] lg:gap-10">
          {/* The trail + camps */}
          <div ref={trailRef} className="relative">
            {/* Trail path — base hairline + scroll-drawn accent overlay */}
            <svg
              aria-hidden="true"
              className="absolute top-0 left-[7px] h-full w-[2px] -translate-x-1/2 lg:left-1/2"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M1 0 L1 100"
                className="stroke-line-3"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M1 0 L1 100"
                className="stroke-accent"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: reduced ? 1 : drawn }}
              />
            </svg>

            <ol className="space-y-14 lg:space-y-24">
              {profile.timeline.map((camp, i) => (
                <Camp
                  key={camp.index}
                  camp={camp}
                  fromLeft={i % 2 === 0}
                  altitude={
                    CAMP_STEPS[profile.timeline.length - 1 - i] ??
                    CAMP_STEPS[CAMP_STEPS.length - 1]
                  }
                />
              ))}
            </ol>
          </div>

          {/* Sticky expedition-year instrument (lg) — decorative readout */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-[38vh] flex flex-col items-end gap-3 text-right">
              <span className="h-px w-8 bg-line-4" />
              <span className="label numeric">EXP. YEAR</span>
              <YearReadout progress={trailProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── One camp on the route ─────────────────────────────────────────── */

function Camp({
  camp,
  fromLeft,
  altitude,
}: {
  camp: CampData;
  fromLeft: boolean;
  altitude: string;
}) {
  return (
    <li className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]">
      <Waypoint />

      {/* Camp card — slides in from alternating sides */}
      <motion.article
        initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.7, ease: EASE_RISE }}
        className={`group ml-9 border border-line-2 bg-surface p-6 transition-transform duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 md:p-8 lg:row-start-1 lg:ml-0 ${
          fromLeft ? 'lg:col-start-1' : 'lg:col-start-3'
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="label numeric">CAMP {camp.index}</span>
          <span className="label numeric lg:hidden">ALT {altitude}</span>
        </div>

        <LineMask as="h3" className="mt-4">
          <span className="font-display text-2xl font-medium text-ink md:text-3xl">
            {camp.role}
          </span>
        </LineMask>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="swipe font-mono text-sm text-dim">@ {camp.org}</span>
          <span className="label numeric">{camp.period}</span>
        </div>

        <ul className="mt-6 space-y-2.5 border-t border-line-1 pt-5">
          {camp.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed text-dim"
            >
              <span
                aria-hidden="true"
                className="mt-[0.65em] h-px w-4 shrink-0 bg-line-4"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.article>

      {/* Decorative elevation metadata — opposite column at lg */}
      <Reveal
        delay={0.15}
        className={`hidden self-start pt-6 lg:row-start-1 lg:flex ${
          fromLeft ? 'lg:col-start-3 justify-start' : 'lg:col-start-1 justify-end'
        }`}
      >
        <div
          aria-hidden="true"
          className={`flex flex-col gap-2 ${
            fromLeft ? 'items-start text-left' : 'items-end text-right'
          }`}
        >
          <span className="label numeric">CAMP {camp.index} — EST. ALT</span>
          <span className="ghost-outline font-display numeric text-5xl leading-none select-none xl:text-6xl">
            {altitude}
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/* ── Waypoint dot — scales 0→1 with a single pulse when reached ────── */

function Waypoint() {
  const reduced = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-8 left-[7px] z-10 -translate-x-1/2 lg:left-1/2"
    >
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-line-3 bg-bg">
        {reduced ? (
          <span className="h-2 w-2 rounded-full bg-accent" />
        ) : (
          <>
            {/* one-shot pulse halo */}
            <motion.span
              className="absolute inset-0 rounded-full border border-acc-5"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: [0.6, 2.1], opacity: [0.7, 0] }}
              viewport={{ once: true, margin: DOT_VIEWPORT_MARGIN }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
            />
            <motion.span
              className="h-2 w-2 rounded-full bg-accent"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.4, 1] }}
              viewport={{ once: true, margin: DOT_VIEWPORT_MARGIN }}
              transition={{ duration: 0.6, times: [0, 0.55, 1], ease: EASE_RISE }}
            />
          </>
        )}
      </span>
    </span>
  );
}

/* ── Chapter title — ghost outline flooding to solid (brief §4 global) ── */

function FloodTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span>{text}</span>;
  }

  return (
    <span className="relative inline-block">
      <span className="ghost-outline">{text}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.9, ease: EASE_SUMMIT, delay: 0.3 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ── Sticky year readout — rolling digits, MotionValue-driven ──────── */

function YearReadout({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();

  // Scroll progress → nearest year index (camps pass ≈ evenly through the trail)
  const snapped = useTransform(progress, (v) => {
    const idx = ((v - 0.02) / 0.94) * (YEARS.length - 1);
    return Math.round(Math.min(YEARS.length - 1, Math.max(0, idx)));
  });
  const rolled = useSpring(snapped, { stiffness: 160, damping: 24 });
  const value = reduced ? snapped : rolled;

  return (
    <span className="numeric flex font-mono text-4xl font-semibold leading-none text-ink">
      {Array.from({ length: YEARS[0].length }, (_, column) => (
        <DigitColumn key={column} column={column} value={value} />
      ))}
    </span>
  );
}

function DigitColumn({
  column,
  value,
}: {
  column: number;
  value: MotionValue<number>;
}) {
  const y = useTransform(value, (v) => `${-v}em`);

  return (
    <span className="block h-[1em] overflow-hidden">
      <motion.span className="block will-change-transform" style={{ y }}>
        {YEARS.map((year) => (
          <span key={year} className="block h-[1em] leading-none">
            {year[column]}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

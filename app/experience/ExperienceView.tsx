'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';

/* ────────────────────────────────────────────────────────────────────
   VOL.05 — THE ROUTE · roles as camps along a scroll-drawn trail,
   matching the homepage Timeline (CH.05) language.
   ──────────────────────────────────────────────────────────────────── */

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Decorative camp elevations (brief §4.7) — purely stylistic. Assigned by
 * chronology: the oldest role camps lowest, the newest highest. profile.timeline
 * is ordered newest-first, so camp i gets STEPS[length - 1 - i]:
 * BloomBytes 2,000M → Freelance 3,400M → KS 4,600M → Elytra 5,800M → Neuron Nest 7,200M.
 */
const CAMP_STEPS = ['2,000M', '3,400M', '4,600M', '5,800M', '7,200M'];

/** Waypoints ignite near the viewport's middle band — where the trail tip is. */
const DOT_VIEWPORT_MARGIN = '-35% 0px -40% 0px';

type CampData = (typeof profile.timeline)[number];

const RELATED = [
  { label: 'WHO I WORKED WITH', href: '/clients', external: false },
  { label: 'ACHIEVEMENTS', href: '/achievements', external: false },
  { label: 'RESUME', href: '/assets/pdfs/SarojResume.pdf', external: true },
];

export default function ExperienceView() {
  const trailRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // The trail: drawn as the camps scroll through the middle of the viewport
  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ['start 0.75', 'end 0.45'],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
      {/* Expedition log header */}
      <div className="mb-12 flex items-baseline justify-between gap-4 lg:mb-16">
        <p className="label numeric">EXPEDITION LOG — 05 CAMPS</p>
        <p className="label numeric hidden sm:block">2022 → PRESENT</p>
      </div>

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

      {/* Education — base training */}
      <section className="mt-20 lg:mt-28" aria-labelledby="education-title">
        <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line-2 pb-5">
          <LineMask as="h2">
            <span
              id="education-title"
              className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl"
            >
              EDUCATION
            </span>
          </LineMask>
          <p className="label numeric">BASE TRAINING</p>
        </div>
        <Reveal>
          <div className="flex flex-col justify-between gap-3 border border-line-2 bg-surface p-6 transition-transform duration-200 ease-[var(--ease-micro)] motion-safe:hover:-translate-y-1 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-base font-medium text-ink">
                {profile.education.degree}
              </p>
              <p className="mt-1 text-sm text-dim">{profile.education.institution}</p>
            </div>
            <span className="label numeric whitespace-nowrap">{profile.education.period}</span>
          </div>
        </Reveal>
      </section>

      {/* Related volumes */}
      <Reveal delay={0.1} className="mt-12">
        <nav aria-label="Related pages" className="flex flex-wrap gap-x-8 gap-y-4">
          {RELATED.map(({ label, href, external }) => (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              className="label group inline-flex items-center gap-2"
            >
              <span className="swipe">{label}</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          ))}
        </nav>
      </Reveal>
    </div>
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
  const reduced = useReducedMotion();

  return (
    <li className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)]">
      <Waypoint />

      {/* Camp card — slides in from alternating sides */}
      <motion.article
        initial={{ opacity: 0, x: reduced ? 0 : fromLeft ? -32 : 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: reduced ? 0.3 : 0.7, ease: EASE_RISE }}
        className={`group ml-9 border border-line-2 bg-surface p-6 transition-transform duration-200 ease-[var(--ease-micro)] motion-safe:hover:-translate-y-1 md:p-8 lg:row-start-1 lg:ml-0 ${
          fromLeft ? 'lg:col-start-1' : 'lg:col-start-3'
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="label numeric">CAMP {camp.index}</span>
          <span className="label numeric lg:hidden">ALT {altitude}</span>
        </div>

        <LineMask as="h2" className="mt-4">
          <span className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
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

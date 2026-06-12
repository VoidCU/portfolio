'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from './fx/LineMask';
import Marquee from './fx/Marquee';
import { Odometer } from './fx/Odometer';
import { Reveal } from './fx/Reveal';
import { useFinePointer } from './fx/hooks';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

type Client = (typeof profile.clients)[number];

/**
 * Deterministic FNV-1a hash of the client name → reveal delay 0–0.8s.
 * Constellation ignition: same "random" order every visit, no Math.random.
 */
function hashDelay(name: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h = Math.imul(h ^ name.charCodeAt(i), 0x01000193);
  }
  return ((h >>> 0) % 801) / 1000;
}

type Trace = { key: string; x1: number; y1: number; x2: number; y2: number };

function SignalCell({
  client,
  traceable,
  rollCategory,
  onTrace,
  onRelease,
}: {
  client: Client;
  traceable: boolean;
  rollCategory: boolean;
  onTrace: (key: string, el: HTMLElement) => void;
  onRelease: () => void;
}) {
  const { index, name, category, url } = client;

  const inner = (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="label numeric">{index}</span>
        {url && (
          <span
            aria-hidden="true"
            className="label text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        )}
      </div>
      <h3 className="font-display text-base font-medium leading-snug text-ink">
        <span className="swipe">{name}</span>
      </h3>
      {rollCategory ? (
        // y-mask roll: muted category at rest, ink copy swaps in on cell hover
        <div className="label numeric relative h-[1em] overflow-hidden">
          <span
            className="block leading-none transition-transform duration-300 group-hover:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: 'var(--ease-micro)' }}
          >
            {category}
          </span>
          <span
            aria-hidden="true"
            className="block leading-none text-ink transition-transform duration-300 group-hover:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: 'var(--ease-micro)' }}
          >
            {category}
          </span>
        </div>
      ) : (
        <p className="label numeric">{category}</p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.45, ease: EASE_RISE, delay: hashDelay(name) }}
      className="group relative border-t border-l border-line-2 transition-colors duration-200 hover:bg-acc-1"
      onPointerEnter={
        traceable ? (e) => onTrace(name, e.currentTarget) : undefined
      }
      onPointerLeave={traceable ? onRelease : undefined}
    >
      {url ? (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="block h-full"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const originRef = useRef<HTMLSpanElement | null>(null);
  const floodRef = useRef<HTMLDivElement | null>(null);

  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const traceable = fine && !reduced;

  const floodInView = useInView(floodRef, { once: true, margin: '-12%' });

  // Ghost numeral parallax (0.15× feel) — static under reduced motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Constellation trace — endpoints computed from rects on hover only.
  const [trace, setTrace] = useState<Trace | null>(null);

  const handleTrace = useCallback((key: string, el: HTMLElement) => {
    const section = sectionRef.current;
    const origin = originRef.current;
    if (!section || !origin) return;
    const s = section.getBoundingClientRect();
    const c = el.getBoundingClientRect();
    const o = origin.getBoundingClientRect();
    setTrace({
      key,
      x1: c.left - s.left + c.width / 2,
      y1: c.top - s.top + c.height / 2,
      x2: o.left - s.left + o.width / 2,
      y2: o.top - s.top + o.height / 2,
    });
  }, []);

  const handleRelease = useCallback(() => setTrace(null), []);

  const clientCount = profile.clients.length;

  return (
    <section ref={sectionRef} id="signals" className="relative py-24 lg:py-32">
      {/* Full-bleed trace overlay — line draws cell → KTM origin (fine pointer only) */}
      {traceable && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        >
          <AnimatePresence>
            {trace && (
              <motion.line
                key={trace.key}
                x1={trace.x1}
                y1={trace.y1}
                x2={trace.x2}
                y2={trace.y2}
                className="stroke-accent"
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.3, ease: EASE_RISE }}
              />
            )}
          </AnimatePresence>
        </svg>
      )}

      {/* ── Chapter plate — CH.06 SIGNALS, 7,100M ─────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.span
          aria-hidden="true"
          style={{ y: reduced ? 0 : ghostY }}
          className="ghost-outline font-display numeric pointer-events-none absolute -top-12 right-2 z-0 select-none text-[11rem] font-semibold leading-none sm:text-[16rem] lg:text-[22rem]"
        >
          06
        </motion.span>

        <div className="relative z-10 flex items-start justify-between">
          <span className="label numeric">CH.06 — SIGNALS</span>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="label numeric">▲ 7,100M</span>
            {/* Fixed KTM origin node — every trace terminates here */}
            <span
              ref={originRef}
              className="label numeric inline-flex items-center gap-2 text-accent"
            >
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-200 ${
                  trace ? 'scale-150' : 'scale-100'
                }`}
              />
              ⌖ KTM
            </span>
          </div>
        </div>

        <div ref={floodRef} className="relative z-10 mt-10">
          <LineMask
            as="h2"
            className="font-display text-chapter font-semibold uppercase text-ink"
          >
            {reduced ? (
              'SIGNALS'
            ) : (
              <span className="relative block">
                <span className="ghost-outline block">SIGNALS</span>
                {/* outline → solid flood, synced with the section reveal */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 block text-ink"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={
                    floodInView ? { clipPath: 'inset(0 0% 0 0)' } : undefined
                  }
                  transition={{ duration: 0.9, ease: EASE_SUMMIT, delay: 0.2 }}
                >
                  SIGNALS
                </motion.span>
              </span>
            )}
          </LineMask>
          <LineMask
            as="p"
            delay={0.15}
            className="font-voice text-epigraph mt-6 max-w-xl text-dim"
          >
            Every signal traces back to the valley.
          </LineMask>
        </div>

        {/* Intro row */}
        <div className="relative z-10 mt-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-xl">
            <p className="text-sm leading-relaxed text-dim">
              Companies and organisations I have delivered software for,
              spanning EdTech, HealthTech, AgriTech, government, real estate,
              events, and more.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="text-right">
            <Odometer
              value={`${clientCount}+`}
              className="font-display text-5xl font-semibold text-accent"
            />
            <p className="label numeric mt-2">Companies</p>
          </Reveal>
        </div>
      </div>

      {/* ── Ghost marquee of client names (aria-hidden dup inside Marquee) ── */}
      <Marquee baseVelocity={1} className="relative z-0 mt-14 py-4">
        {profile.clients.map(({ name }) => (
          <span key={name} className="flex items-center">
            <span className="ghost-outline font-display px-6 text-6xl font-semibold uppercase leading-none whitespace-nowrap md:px-10 md:text-8xl">
              {name}
            </span>
            <span aria-hidden="true" className="label numeric text-accent">
              ⌖
            </span>
          </span>
        ))}
      </Marquee>

      {/* ── Signal grid — deterministic hairline recipe ───────────── */}
      <div className="relative z-10 mx-auto mt-14 max-w-7xl px-6">
        <div className="grid grid-cols-1 border-r border-b border-line-2 sm:grid-cols-2 lg:grid-cols-3">
          {profile.clients.map((client) => (
            <SignalCell
              key={client.name}
              client={client}
              traceable={traceable}
              rollCategory={traceable}
              onTrace={handleTrace}
              onRelease={handleRelease}
            />
          ))}
          {/* Filler cell — completes the cartography at sm (1 slot) and lg (2 slots) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.45, ease: EASE_RISE, delay: 0.82 }}
            className="hidden items-end justify-between gap-3 border-t border-l border-line-2 p-5 sm:flex lg:col-span-2"
          >
            <span className="label numeric">
              {String(clientCount).padStart(2, '0')} SIGNALS RECEIVED
            </span>
            <span className="label numeric text-accent">ALL TRACES → KTM ⌖</span>
          </motion.div>
        </div>

        {/* Note */}
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-line-2" />
          <p className="label numeric max-w-md text-center">
            Most projects under NDA. Case studies available on request.
          </p>
          <div className="h-px flex-1 bg-line-2" />
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Odometer } from '@/components/fx/Odometer';
import { Reveal } from '@/components/fx/Reveal';

/* Bespoke CSS for this section only (brief §4.8):
   - .vc-flood     chapter title ghost-stroke → solid flood (background-clip sweep)
   - .vc-fill      hero numeral solid layer flooding over ghost strokes (clip-path
                   sweep, 1.4s ease-rise, synchronized with the odometer roll —
                   duplicate-layer clip instead of background-clip:text because
                   background-clip breaks over transform-animated odometer digits)
   - .vc-beacon    one-shot conic-gradient beacon ring (@property --vc-angle,
                   mask-composite ring), settling to a static accent border.
                   Where @property is unsupported the sweep never spins — the
                   card still settles to the static accent ring (designed fallback). */
const SUMMIT_CSS = `
@property --vc-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  .vc-flood {
    color: transparent;
    -webkit-text-stroke: 1px var(--c-ghost);
    background-image: linear-gradient(90deg, var(--c-text), var(--c-text));
    background-repeat: no-repeat;
    background-size: 0% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    transition: background-size 0.9s var(--ease-summit) 0.15s,
      -webkit-text-stroke-color 0.9s var(--ease-summit) 0.15s;
  }
  .vc-flood.vc-lit {
    background-size: 100% 100%;
    -webkit-text-stroke-color: transparent;
  }
}
.vc-fill {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.4s var(--ease-rise);
}
.vc-lit .vc-fill {
  clip-path: inset(0 0 0 0);
}
.vc-beacon {
  transition: transform 0.2s var(--ease-micro);
}
.vc-beacon:hover {
  transform: translateY(-4px);
}
.vc-beacon::before {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1px;
  background: conic-gradient(
    from var(--vc-angle),
    var(--c-accent) 0deg,
    transparent 80deg 360deg
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
}
.vc-beacon.vc-lit {
  border-color: var(--acc-5);
  transition: transform 0.2s var(--ease-micro),
    border-color 0.4s var(--ease-micro) 1.9s;
}
.vc-beacon.vc-lit::before {
  animation: vc-spin 1.8s var(--ease-summit) 0.35s 1 both;
}
@keyframes vc-spin {
  0% {
    --vc-angle: 0deg;
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    --vc-angle: 360deg;
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .vc-flood,
  .vc-fill,
  .vc-beacon.vc-lit {
    transition: none;
  }
  .vc-beacon.vc-lit::before {
    animation: none;
  }
}
`;

/** Registration tick marks — 4 tiny L-shaped corners on a summit certificate. */
function TickCorners() {
  const tick =
    'absolute h-2.5 w-2.5 border-line-4 transition-colors duration-200 group-hover:border-acc-5';
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${tick} left-0 top-0 border-l border-t`} />
      <span className={`${tick} right-0 top-0 border-r border-t`} />
      <span className={`${tick} bottom-0 left-0 border-b border-l`} />
      <span className={`${tick} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

/** Ghost-stroke odometer with a solid duplicate flooding over it (clip-path
 *  sweep synced to the 1.4s digit roll). Parent supplies font classes. */
function FloodNumeral({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      <span className="ghost-outline block">
        <Odometer value={value} />
      </span>
      <span aria-hidden="true" className="vc-fill absolute inset-0 block text-ink">
        <Odometer value={value} />
      </span>
    </span>
  );
}

export default function Achievements() {
  const competitive = profile.achievements.find((a) => a.type === 'competitive');
  const certs = profile.achievements.filter((a) => a.type === 'cert');

  // Hero numerals parsed from profile.achievements[0] strings — never hardcoded.
  // 'LeetCode: Top 3% Globally' → TOP 3% · '580+ problems solved · Global Rank 98k' → 580+ / 98K
  const heroStats = competitive
    ? [
        {
          value: competitive.title.match(/top\s*\d+%/i)?.[0]?.toUpperCase() ?? '',
          label: 'GLOBAL STANDING',
        },
        {
          value: competitive.detail.match(/\d[\d,]*\+/)?.[0] ?? '',
          label: 'PROBLEMS SOLVED',
        },
        {
          value:
            competitive.detail.match(/rank\s*([\d,.]*\d\s*k?)/i)?.[1]?.toUpperCase() ??
            '',
          label: 'GLOBAL RANK',
        },
      ].filter((s) => s.value)
    : [];

  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const beaconRef = useRef<HTMLElement | null>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-12%' });
  const statsInView = useInView(statsRef, { once: true, margin: '-12%' });
  const beaconInView = useInView(beaconRef, { once: true, margin: '-12%' });

  const headerLit = reduced || headerInView;
  const statsLit = reduced || statsInView;
  const beaconLit = reduced || beaconInView;

  // Ghost plate parallax, 0.15× feel across the section's scroll span.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const entryCount = String(profile.achievements.length).padStart(2, '0');

  return (
    <section
      id="summit-log"
      ref={sectionRef}
      className="relative border-t border-line-1 bg-bg"
    >
      <style>{SUMMIT_CSS}</style>

      {/* Chapter plate — ascending ghost numerals, parallax 0.15× */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.span
          style={reduced ? undefined : { y: ghostY }}
          className="ghost-outline numeric font-display absolute -top-8 right-[-0.04em] select-none whitespace-nowrap text-[9rem] font-semibold leading-none md:text-[15rem] xl:text-[21rem]"
        >
          8,000
        </motion.span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Plate header — unnumbered interlude */}
        <div ref={headerRef} className="mb-14 md:mb-20">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <span className="label numeric">SUMMIT LOG — INTERLUDE</span>
            <span className="label numeric">▲ 8,000M</span>
          </div>
          <LineMask as="h2">
            <span
              className={`vc-flood font-display block text-chapter font-semibold uppercase text-ink ${
                headerLit ? 'vc-lit' : ''
              }`}
            >
              Summit Log
            </span>
          </LineMask>
          <LineMask delay={0.12} className="mt-5 max-w-xl">
            <p className="font-voice text-epigraph text-dim">
              Proof of passage — stamped, dated, logged.
            </p>
          </LineMask>
        </div>

        {/* Hero numerals — odometer rolls inside ghost-stroke → solid flood */}
        {heroStats.length > 0 && (
          <div
            ref={statsRef}
            className={`mb-16 grid grid-cols-1 border-y border-line-2 sm:grid-cols-3 md:mb-20 ${
              statsLit ? 'vc-lit' : ''
            }`}
          >
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 sm:py-10 ${
                  i > 0
                    ? 'border-t border-line-2 sm:border-l sm:border-t-0 sm:pl-8 lg:pl-10'
                    : ''
                }`}
              >
                <FloodNumeral
                  value={stat.value}
                  className="font-display text-5xl font-semibold md:text-6xl xl:text-7xl"
                />
                <p className="label numeric mt-4">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Log entries */}
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <span className="label numeric">CERTIFICATIONS &amp; RECORDS</span>
          <span className="label numeric">{entryCount} ENTRIES</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* LeetCode record — one-shot conic beacon, settles to accent ring */}
          {competitive && (
            <Reveal className="h-full">
              <article
                ref={beaconRef}
                className={`vc-beacon group relative flex h-full flex-col border border-line-2 bg-surface p-6 ${
                  beaconLit ? 'vc-lit' : ''
                }`}
              >
                <TickCorners />
                <p className="label numeric mb-6 flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                    COMPETITIVE PROGRAMMING
                  </span>
                  <span>LOG 01</span>
                </p>
                <h3 className="font-display mb-2 text-xl font-semibold leading-snug text-ink">
                  {competitive.title}
                </h3>
                <p className="label numeric">{competitive.detail}</p>
                <a
                  href={profile.contacts.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swipe group/link label numeric mt-auto inline-flex w-fit items-center gap-2 pt-8"
                >
                  VIEW LOG
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5"
                  >
                    →
                  </span>
                </a>
              </article>
            </Reveal>
          )}

          {/* Summit certificates */}
          {certs.map((cert, i) => (
            <Reveal key={cert.title} delay={(i + 1) * 0.07} className="h-full">
              <article className="group relative flex h-full flex-col border border-line-2 bg-surface p-6 transition-transform duration-200 hover:-translate-y-1">
                <TickCorners />
                <p className="label numeric mb-6 flex items-baseline justify-between gap-3">
                  <span>CERTIFICATE</span>
                  <span>LOG {String(i + 2).padStart(2, '0')}</span>
                </p>
                <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="label numeric mt-auto pt-8">{cert.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

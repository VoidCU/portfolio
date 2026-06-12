'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { profile } from '@/data/profile';
import Magnetic from '@/components/fx/Magnetic';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { useKtmTime } from '@/components/fx/hooks';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navLinks = [
  { href: '/about',        label: 'About' },
  { href: '/skills',       label: 'Skills' },
  { href: '/experience',   label: 'Experience' },
  { href: '/projects',     label: 'Projects' },
  { href: '/blog',         label: 'Blog' },
  { href: '/clients',      label: 'Clients' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact',      label: 'Contact' },
];

const socialLinks = [
  { label: 'GitHub',   href: profile.contacts.github },
  { label: 'LinkedIn', href: profile.contacts.linkedin },
  { label: 'LeetCode', href: profile.contacts.leetcode },
  { label: 'Email',    href: `mailto:${profile.contacts.email}` },
  { label: 'Resume',   href: '/assets/pdfs/SarojResume.pdf' },
];

/* Prayer-flag palette — the ONLY hardcoded hex allowed in this file
   (brief §4.11): blue / white / red / green / yellow. */
const PRAYER_FLAG_COLORS = [
  '#4FC3F7',
  '#FFFFFF',
  '#FF6B5E',
  '#2BE4A2',
  '#F2D9A4',
] as const;

/* Deterministic PRNG — "random-from-seed" trajectories per burst. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Particle = {
  x: number;
  y: number;
  rotate: number;
  color: string;
  w: number;
  h: number;
  delay: number;
};

function makeParticles(seed: number): Particle[] {
  const rand = mulberry32(seed);
  return Array.from({ length: 24 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = 50 + rand() * 110;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.8 - 36, // biased skyward
      rotate: (rand() - 0.5) * 540,
      color: PRAYER_FLAG_COLORS[i % PRAYER_FLAG_COLORS.length],
      w: 6 + Math.round(rand() * 8),
      h: 4 + Math.round(rand() * 5),
      delay: rand() * 0.06,
    };
  });
}

/* Summit flag — trail spine terminus. Draws in once; click hoists the
   prayer flags (user-initiated; skipped under reduced motion). */
function SummitFlag() {
  const reduced = useReducedMotion();
  const [burst, setBurst] = useState(0);

  const particles = useMemo(
    () => (burst > 0 ? makeParticles(burst * 7919) : []),
    [burst],
  );

  useEffect(() => {
    if (burst === 0) return;
    const t = window.setTimeout(() => setBurst(0), 1600);
    return () => window.clearTimeout(t);
  }, [burst]);

  return (
    <span className="relative inline-block">
      <Magnetic strength={0.3}>
        <button
          type="button"
          aria-label="Hoist the summit prayer flags"
          onClick={() => {
            if (!reduced) setBurst((b) => b + 1);
          }}
          className="block cursor-pointer p-1 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <svg
            viewBox="0 0 40 56"
            width="36"
            height="50"
            fill="none"
            aria-hidden="true"
          >
            {/* pole */}
            <motion.path
              d="M9 4 V53"
              className="stroke-ink"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.6, ease: EASE_RISE }}
            />
            {/* pennant */}
            <motion.path
              d="M9 7 L32 13 L9 19 Z"
              className="stroke-accent"
              strokeWidth={1.5}
              strokeLinejoin="round"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE_RISE }}
            />
            {/* cairn base */}
            <motion.path
              d="M3 53 H15"
              className="stroke-ink"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={reduced ? undefined : { pathLength: 0 }}
              whileInView={reduced ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.35, delay: 0.85, ease: EASE_RISE }}
            />
          </svg>
        </button>
      </Magnetic>

      {/* prayer-flag confetti — absolutely positioned spans, spring exit */}
      {burst > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-2 z-10"
        >
          {particles.map((p, i) => (
            <motion.span
              key={`${burst}-${i}`}
              className="absolute block"
              style={{ width: p.w, height: p.h, backgroundColor: p.color }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                rotate: p.rotate,
                scale: 0.55,
              }}
              transition={{
                type: 'spring',
                stiffness: 55,
                damping: 13,
                mass: 0.7,
                delay: p.delay,
                opacity: { duration: 0.9, delay: p.delay + 0.3, ease: 'easeOut' },
              }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

const MEGA = 'LET’S TALK';

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const ktm = useKtmTime();
  const year = new Date().getFullYear();
  const buildHash = process.env.NEXT_PUBLIC_BUILD_HASH || 'dev';

  /* SAFE sticky-curtain variant: normal flow + inner parallax so the
     footer still feels like a reveal on every page (brief §4.11). */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line-2 bg-bg">
      <motion.div
        style={{ y: reduced ? 0 : y }}
        className="pb-8 pt-16 md:pt-20"
      >
        {/* ── Summit header + mega: full-bleed so 13vw never clips ── */}
        <div className="px-6">
          <div className="mb-4 flex items-end justify-between gap-6">
            <p className="label numeric">The Summit {'·'} Expedition Complete</p>
            <SummitFlag />
          </div>

          {/* ── THE MEGA — LET'S TALK ──────────────────────────────── */}
          <Magnetic strength={0.08} className="block w-fit max-w-full">
            <LineMask as="span" className="block">
              <a
                href={`mailto:${profile.contacts.email}`}
                className="group relative block w-fit whitespace-nowrap"
                aria-label={`${MEGA} — email ${profile.contacts.email}`}
              >
                <span className="font-display text-mega block font-semibold text-ink">
                  {MEGA}
                </span>
                {/* accent duplicate — fill rises bottom→top on hover */}
                <span
                  aria-hidden="true"
                  className="font-display text-mega pointer-events-none absolute inset-0 block font-semibold text-accent [clip-path:inset(100%_0_0_0)] [transition:clip-path_0.5s_var(--ease-summit)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:[transition:clip-path_0.01s]"
                >
                  {MEGA}
                </span>
              </a>
            </LineMask>
          </Magnetic>
        </div>

        <div className="mx-auto max-w-7xl px-6">
        {/* ── Columns: brand / navigation / links ─────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-line-1 pb-10 pt-10 md:grid-cols-3">
          {/* Brand */}
          <Reveal>
            <div className="space-y-4">
              <Link
                href="/"
                className="swipe inline-block font-mono text-sm font-bold uppercase tracking-[0.15em] text-ink"
              >
                {profile.alias}
              </Link>
              <p className="max-w-xs text-xs leading-relaxed text-muted">
                Full-stack engineer building scalable SaaS, AI systems, and
                production software. Based in {profile.contacts.location}.
              </p>
            </div>
          </Reveal>

          {/* Nav */}
          <Reveal delay={0.08}>
            <nav className="space-y-2" aria-label="Footer navigation">
              <p className="label mb-4">Navigation</p>
              {navLinks.map(({ href, label }) => (
                <div key={href}>
                  <Link
                    href={href}
                    className="swipe inline-block py-0.5 font-mono text-xs uppercase tracking-wider text-muted transition-transform duration-200 hover:translate-x-1"
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </nav>
          </Reveal>

          {/* Socials — arrow-slide */}
          <Reveal delay={0.16}>
            <div className="space-y-2">
              <p className="label mb-4">Links</p>
              {socialLinks.map(({ label, href }) => (
                <div key={label}>
                  <Link
                    href={href}
                    target={
                      href.startsWith('mailto') || href.startsWith('/')
                        ? undefined
                        : '_blank'
                    }
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-muted"
                  >
                    <span className="swipe">{label}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                    >
                      {'→'}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Telemetry row ────────────────────────────────────────── */}
        <Reveal className="border-t border-line-1 pt-6">
          <p className="label numeric">
            8,848M {'—'} SUMMIT {'·'} KTM{' '}
            <span suppressHydrationWarning>{ktm || '--:--'}</span> {'·'}{' '}
            27.7172{'°'}N 85.3240{'°'}E {'·'} BUILD {buildHash}
          </p>

          {/* ── Copyright + colophon (final line) ──────────────────── */}
          <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="label">
              &copy; {year} {profile.name}
            </p>
            <p className="label">
              Set in Clash Display, General Sans &amp; JetBrains Mono {'·'}{' '}
              Built with Next.js 15 in Kathmandu {'·'} &copy; {year}
            </p>
          </div>
        </Reveal>
        </div>
      </motion.div>
    </footer>
  );
}

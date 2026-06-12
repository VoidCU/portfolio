'use client';

import Image from 'next/image';
import { Fragment, useMemo, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Odometer } from '@/components/fx/Odometer';
import { Reveal } from '@/components/fx/Reveal';
import TopoSpotlight from '@/components/fx/TopoSpotlight';

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* Key phrases that receive the highlighter swipe (brief §4.3 / §3.8).
   Matched against profile data at render — content itself stays in data. */
const MANIFESTO_PHRASES = [
  'full-stack SaaS platforms',
  'AI pipelines',
  'hydrological models',
];
const BODY_PHRASES = [
  'Neuron Nest',
  'Elytra Solutions',
  'dynamic RBAC systems',
  'transformer models',
  'real-time multi-channel inboxes',
  'climate simulation workflows',
];

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Wrap known phrases of a plain paragraph in `.swipe` spans. */
function withSwipes(text: string, phrases: string[]) {
  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className="swipe">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/* ── Scrubbed manifesto (brief §4.3) ─────────────────────────────── */

type WordToken = { text: string; index: number };
type Block = { swipe: boolean; words: WordToken[] };

/** Group word tokens into swipe-phrase blocks, preserving global word index. */
function buildBlocks(tokens: string[], phrases: string[]): Block[] {
  const clean = (t: string) => t.replace(/[.,:;!?]+$/, '');
  const group = new Array<number>(tokens.length).fill(-1);
  let g = 0;
  for (const phrase of phrases) {
    const parts = phrase.split(' ');
    for (let i = 0; i + parts.length <= tokens.length; i++) {
      let ok = true;
      for (let j = 0; j < parts.length; j++) {
        const tok = tokens[i + j];
        const cmp = j === parts.length - 1 ? clean(tok) : tok;
        if (cmp !== parts[j] || group[i + j] !== -1) {
          ok = false;
          break;
        }
      }
      if (ok) {
        for (let j = 0; j < parts.length; j++) group[i + j] = g;
        g += 1;
        i += parts.length - 1;
      }
    }
  }

  const blocks: Block[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const swipe = group[i] !== -1;
    const last = blocks[blocks.length - 1];
    const continuesGroup = swipe && i > 0 && group[i] === group[i - 1];
    if (last && ((!swipe && !last.swipe) || continuesGroup)) {
      last.words.push({ text: tokens[i], index: i });
    } else {
      blocks.push({ swipe, words: [{ text: tokens[i], index: i }] });
    }
  }
  return blocks;
}

function ScrubWord({
  text,
  index,
  total,
  progress,
  reduced,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Each word owns one slice of the scroll range — pure MotionValue, no state.
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.18, 1],
  );
  if (reduced) return <span>{text}</span>;
  return <motion.span style={{ opacity }}>{text}</motion.span>;
}

function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });

  const tokens = useMemo(() => text.split(' '), [text]);
  const blocks = useMemo(() => buildBlocks(tokens, MANIFESTO_PHRASES), [tokens]);
  const total = tokens.length;
  const dropCap = tokens[0]?.charAt(0) ?? '';

  return (
    <p
      ref={ref}
      className="max-w-[62ch] text-xl leading-[1.7] text-ink md:text-2xl"
    >
      {/* full paragraph for screen readers — animated spans below are aria-hidden */}
      <span className="sr-only">{text}</span>
      {/* 3-line Fraunces drop cap */}
      <span
        aria-hidden="true"
        className="font-voice float-left mt-[0.06em] pr-[0.14em] text-[4.4em] leading-[0.78]"
      >
        {dropCap}
      </span>
      <span aria-hidden="true">
        {blocks.map((block, bi) => {
          const words = block.words.map(({ text: word, index }) => (
            <Fragment key={index}>
              <ScrubWord
                text={index === 0 ? word.slice(1) : word}
                index={index}
                total={total}
                progress={scrollYProgress}
                reduced={reduced}
              />
              {index < total - 1 ? ' ' : null}
            </Fragment>
          ));
          return block.swipe ? (
            <span key={bi} className="swipe">
              {words}
            </span>
          ) : (
            <Fragment key={bi}>{words}</Fragment>
          );
        })}
      </span>
    </p>
  );
}

/* ── Chapter title: outline → solid flood (brief §4 global rules) ── */

function FloodTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <LineMask
      as="h2"
      className="font-display text-chapter font-semibold uppercase"
    >
      {reduced ? (
        <span className="text-ink">{text}</span>
      ) : (
        <span className="relative inline-block">
          <span className="ghost-outline">{text}</span>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 text-ink"
            initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.9, ease: EASE_SUMMIT, delay: 0.2 }}
          >
            {text}
          </motion.span>
        </span>
      )}
    </LineMask>
  );
}

/* ── Portrait: duotone, clip entrance, internal parallax ─────────── */

function Portrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="relative w-full max-w-sm">
      <div className="pr-9">
        <motion.div
          ref={frameRef}
          className="group relative aspect-[3/4] overflow-hidden border border-line-3"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={
            reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }
          }
          viewport={{ once: true, margin: '-12%' }}
          transition={
            reduced
              ? { duration: 0.3 }
              : { duration: 0.8, ease: EASE_SUMMIT }
          }
        >
          {/* internal parallax: scaled 115%, y ±8% */}
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { y: imgY, scale: 1.15 }}
          >
            <Image
              src="/assets/me.jpeg"
              alt="Portrait of Saroj Prasad Mainali"
              width={1080}
              height={1440}
              sizes="(max-width: 1024px) 88vw, 384px"
              className="h-full w-full object-cover grayscale transition-[filter] duration-[400ms] group-hover:grayscale-0"
            />
          </motion.div>
          {/* theme-aware duotone tint layers — fade to full color on hover.
              Dark: mint-on-pine; light: evergreen-on-cream (tokens flip them). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-accent opacity-60 mix-blend-multiply transition-opacity duration-[400ms] group-hover:opacity-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-surface opacity-50 mix-blend-screen transition-opacity duration-[400ms] group-hover:opacity-0"
          />
        </motion.div>
      </div>

      {/* rotated mono marginalia along the frame edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 flex h-full items-start gap-3 [writing-mode:vertical-rl]"
      >
        <span className="label numeric whitespace-nowrap">
          FIG. 01 — THE ENGINEER
        </span>
        <span className="label numeric whitespace-nowrap">
          {profile.education.degree}
        </span>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // ghost numeral drifts at ~0.15× scroll speed
  const ghostY = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  const links = [
    { label: 'GitHub', href: profile.contacts.github, external: true },
    { label: 'LinkedIn', href: profile.contacts.linkedin, external: true },
    { label: 'LeetCode', href: profile.contacts.leetcode, external: true },
    {
      label: profile.contacts.email,
      href: `mailto:${profile.contacts.email}`,
      external: false,
    },
  ];

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative overflow-x-clip border-t border-line-1 bg-bg"
    >
      {/* chapter plate ghost numeral — parallax 0.15× */}
      <motion.span
        aria-hidden="true"
        className="ghost-outline font-display numeric pointer-events-none absolute right-0 top-[-0.06em] z-0 select-none text-[15rem] font-semibold leading-none sm:text-[20rem] lg:text-[24rem]"
        style={{ y: reduced ? 0 : ghostY }}
      >
        01
      </motion.span>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {/* chapter plate */}
        <header className="mb-16 lg:mb-24">
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <p className="label numeric">CH.01 — ORIGIN</p>
            <p className="label numeric">▲ 2,300M</p>
          </div>
          <FloodTitle text="ORIGIN" />
          <LineMask
            as="p"
            delay={0.12}
            className="font-voice mt-5 text-epigraph text-dim"
          >
            From the valley floor.
          </LineMask>
        </header>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          {/* Portrait + education + links */}
          <div className="space-y-8">
            <Portrait />

            <Reveal delay={0.1}>
              <div className="border border-line-2 p-6">
                <p className="label mb-4">Education</p>
                <p className="text-sm font-medium text-ink">
                  {profile.education.degree}
                </p>
                <p className="mt-1 text-sm text-dim">
                  {profile.education.institution}
                </p>
                <p className="label numeric mt-3">{profile.education.period}</p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className={`swipe group inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-muted ${
                        external ? 'uppercase' : ''
                      }`}
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Manifesto + second paragraph + stats */}
          <div className="space-y-12">
            <Manifesto text={profile.bio[0]} />

            <Reveal delay={0.08}>
              <p className="max-w-[62ch] text-base leading-[1.7] text-dim">
                {withSwipes(profile.bio[1], BODY_PHRASES)}
              </p>
            </Reveal>

            {/* Stats grid — odometers over topo spotlight ground */}
            <div className="relative border-b border-r border-line-2">
              <TopoSpotlight />
              <div className="relative grid grid-cols-2 sm:grid-cols-4">
                {profile.stats.map(({ value, label }, i) => (
                  <Reveal
                    key={label}
                    delay={i * 0.07}
                    className="border-l border-t border-line-2"
                  >
                    <div className="px-4 py-7 text-center">
                      <Odometer
                        value={value}
                        className="font-display text-3xl font-semibold text-accent md:text-4xl"
                      />
                      <p className="label mt-3">{label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

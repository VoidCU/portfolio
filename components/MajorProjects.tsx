'use client';

import {
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { ContourPlate } from '@/components/fx/ContourPlate';

/**
 * CH.02 — EXPEDITIONS (BRIEF §4.4, CONTRACT §5 row 2).
 * The homepage centerpiece: five sticky-stacking case cards, one per
 * featured project, each receding (scale + bg-bg shade overlay — never
 * filter) as the next climb slides over it. Mobile / reduced motion:
 * plain stacked cards with Reveal entrances, h-auto.
 */

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Sticky offsets: top = 80px + i * 24px (precomputed — Tailwind needs
   literal classes). The 24px stagger keeps every prior card's top edge
   peeking above the incoming one. */
const STICKY_TOP = [
  'lg:top-[80px]',
  'lg:top-[104px]',
  'lg:top-[128px]',
  'lg:top-[152px]',
  'lg:top-[176px]',
] as const;

const stickyTopPx = (i: number) => 80 + Math.min(i, STICKY_TOP.length - 1) * 24;

type Project = (typeof profile.featuredProjects)[number];

/* `lg` breakpoint gate for the scroll scrub — SSR-safe false. */
function useIsDesktop(): boolean {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return lg;
}

/* Outline→solid flood (BRIEF §4 global rules): ghost-stroke base, solid
   copy sweeps over via clip-path, 0.9s ease-summit. Reduced motion:
   solid statically (LineMask still provides the fade). */
function FloodTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="block">{text}</span>;
  return (
    <span className="relative block">
      <span aria-hidden="true" className="ghost-outline absolute inset-0 block">
        {text}
      </span>
      <motion.span
        className="block"
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

/* Pulsing status beacon — accent for LIVE, muted for IN DEV / RESEARCH
   (vivid tints stay inside ContourPlate per CONTRACT §3.8). */
function StatusBeacon({ status }: { status: Project['status'] }) {
  const live = status === 'LIVE';
  const dot = live ? 'bg-accent' : 'bg-muted';
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${dot}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      <span className={`label numeric ${live ? 'text-accent' : ''}`}>
        {status}
      </span>
    </span>
  );
}

/* Arrow-slide link with the highlighter swipe (CONTRACT §7). */
function FieldLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="swipe group inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
      >
        →
      </span>
    </a>
  );
}

const TICKS = [
  '-left-1.5 -top-1.5 border-l border-t',
  '-right-1.5 -top-1.5 border-r border-t',
  '-bottom-1.5 -left-1.5 border-b border-l',
  '-bottom-1.5 -right-1.5 border-b border-r',
] as const;

function ExpeditionCard({
  project,
  index,
  total,
  selfRef,
  nextRef,
}: {
  project: Project;
  index: number;
  total: number;
  selfRef: RefObject<HTMLElement | null>;
  nextRef: RefObject<HTMLElement | null> | null;
}) {
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  /* Scrub against the NEXT card: progress 0 → its top enters the viewport
     bottom; 1 → it docks at its sticky offset, fully covering this card. */
  const { scrollYProgress } = useScroll({
    target: (nextRef ?? selfRef) as RefObject<HTMLElement>,
    offset: ['start end', `start ${stickyTopPx(index + 1)}px`],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  const scrub = nextRef !== null && isDesktop && !reduced;

  return (
    <motion.article
      ref={selfRef as RefObject<HTMLElement>}
      aria-labelledby={`expedition-${project.index}`}
      className={`relative overflow-hidden rounded-none border border-line-2 bg-surface lg:sticky lg:h-[85vh] lg:max-h-[820px] lg:motion-reduce:static lg:motion-reduce:h-auto lg:motion-reduce:max-h-none ${
        STICKY_TOP[index] ?? STICKY_TOP[STICKY_TOP.length - 1]
      }`}
      style={scrub ? { scale, transformOrigin: 'center top' } : undefined}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.7, ease: EASE_RISE }}
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* ── Left: the climb log ─────────────────────────────────── */}
        <div className="flex h-full min-h-0 flex-col gap-5 p-6 sm:p-8 lg:gap-4 lg:p-10 xl:p-12">
          <div className="flex items-center justify-between gap-4">
            <span className="label numeric">
              EXP. {project.index}/{String(total).padStart(2, '0')}
            </span>
            <StatusBeacon status={project.status} />
          </div>

          <div>
            <span
              aria-hidden="true"
              className="numeric block select-none font-mono text-[clamp(3.5rem,9vw,5.5rem)] leading-[0.85] text-ghost lg:text-[clamp(3rem,5vw,5rem)]"
            >
              {project.index}
            </span>
            <LineMask
              as="h3"
              className="font-display mt-3 text-[clamp(2.25rem,8vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-ink lg:text-[clamp(2.25rem,5.5vw,4.75rem)]"
            >
              <span id={`expedition-${project.index}`}>{project.name}</span>
            </LineMask>
            <LineMask
              as="p"
              delay={0.1}
              className="font-voice mt-3 text-epigraph text-dim"
            >
              {project.tagline}
            </LineMask>
          </div>

          <Reveal delay={0.15}>
            <p className="max-w-[52ch] text-sm leading-relaxed text-dim lg:text-[0.95rem]">
              {project.desc}
            </p>
          </Reveal>

          <div className="mt-auto space-y-5 pt-2">
            <Reveal delay={0.2}>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="border border-line-3 px-3 py-1.5 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-muted transition-transform duration-200 ease-[var(--ease-micro)] hover:-translate-y-0.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-2 pt-5">
                <FieldLink href={project.github}>GitHub</FieldLink>
                {project.url && <FieldLink href={project.url}>Live</FieldLink>}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Right: survey plate in a registered frame ───────────── */}
        <div className="relative flex min-h-0 flex-col border-t border-line-2 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="label numeric">FIG. {project.index} — CONTOUR SURVEY</span>
            <span aria-hidden="true" className="label numeric hidden sm:inline">
              ⌖
            </span>
          </div>
          <Reveal delay={0.1} className="min-h-0 lg:flex-1">
            <div className="relative h-full w-full">
              <div className="relative aspect-[4/3] w-full border border-line-2 lg:absolute lg:inset-0 lg:aspect-auto">
                <ContourPlate seed={project.name} status={project.status} />
                {TICKS.map((pos) => (
                  <span
                    key={pos}
                    aria-hidden="true"
                    className={`pointer-events-none absolute h-3 w-3 border-line-4 ${pos}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Recession shade — bg-bg overlay 0→0.35 (never filter) */}
      {scrub && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-bg"
          style={{ opacity: shade }}
        />
      )}
    </motion.article>
  );
}

export default function MajorProjects() {
  const projects = profile.featuredProjects;
  const reduced = useReducedMotion();

  /* Stable per-card refs so each card can scrub against its successor. */
  const cardRefs = useMemo(
    () => projects.map(() => createRef<HTMLElement>()),
    [projects]
  );

  /* Chapter plate ghost numeral — 0.15× parallax. */
  const plateRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: plateProgress } = useScroll({
    target: plateRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(plateProgress, [0, 1], [80, -80]);

  return (
    <section id="expeditions" className="relative border-t border-line-1">
      {/* ── Chapter plate ───────────────────────────────────────────── */}
      <header
        ref={plateRef}
        className="relative overflow-hidden pb-14 pt-24 md:pb-20 md:pt-32"
      >
        <motion.span
          aria-hidden="true"
          className="ghost-outline font-display pointer-events-none absolute -top-8 right-0 select-none text-[clamp(10rem,24vw,24rem)] leading-none"
          style={reduced ? undefined : { y: ghostY }}
        >
          02
        </motion.span>
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="mb-6 flex items-center justify-between">
            <LineMask as="p" className="label numeric">
              CH.02 — EXPEDITIONS
            </LineMask>
            <LineMask as="p" delay={0.08} className="label numeric">
              ▲ 3,500M
            </LineMask>
          </div>
          <h2 className="font-display text-chapter font-semibold tracking-tight text-ink">
            <LineMask>
              <FloodTitle text="EXPEDITIONS" />
            </LineMask>
          </h2>
          <LineMask
            as="p"
            delay={0.15}
            className="font-voice mt-6 max-w-2xl text-epigraph text-dim"
          >
            Five climbs, documented.
          </LineMask>
        </div>
      </header>

      {/* ── The expedition stack ───────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-7xl space-y-6 px-6 pb-24 lg:space-y-16 lg:pb-36">
        {projects.map((project, i) => (
          <ExpeditionCard
            key={project.name}
            project={project}
            index={i}
            total={projects.length}
            selfRef={cardRefs[i]}
            nextRef={cardRefs[i + 1] ?? null}
          />
        ))}
      </div>
    </section>
  );
}

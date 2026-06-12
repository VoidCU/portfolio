'use client';

/**
 * CH.03 — THE INDEX (brief §4.5, contract §5 row 3).
 * Text-only survey of every featured expedition. Desktop: rows shift x:8 on
 * hover while siblings dim, and a cursor-following PreviewGhost crossfades
 * contour plates (all plates pre-rendered hidden — no first-hover lag).
 * Touch / reduced-motion: rows tap-open into inline accordions carrying the
 * plate, description, tech manifest and links — a designed fallback.
 */

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
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
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { ContourPlate } from '@/components/fx/ContourPlate';
import { useFinePointer } from '@/components/fx/hooks';

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_MICRO: [number, number, number, number] = [0.4, 0, 0.2, 1];
const GHOST_SPRING = { stiffness: 400, damping: 40 };

type Project = (typeof profile.featuredProjects)[number];

const STATUS_INK: Record<Project['status'], string> = {
  LIVE: 'text-accent',
  'IN DEV': 'text-muted',
  RESEARCH: 'text-muted',
};

const STATUS_DOT: Record<Project['status'], string> = {
  LIVE: 'bg-accent',
  'IN DEV': 'bg-muted',
  RESEARCH: 'bg-muted',
};

/** Shared row/legend grid so columns stay registered like survey lines. */
const ROW_GRID =
  'md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,0.85fr)_6.5rem_1.5rem] md:gap-x-8';

function StatusTag({
  status,
  className = '',
}: {
  status: Project['status'];
  className?: string;
}) {
  return (
    <span
      className={`numeric items-center gap-2 font-mono text-label uppercase tracking-[0.18em] ${STATUS_INK[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------- PreviewGhost --- */
/**
 * One fixed pointer-events-none follower springed (400/40) to the pointer.
 * Crossfades ContourPlates via AnimatePresence keyed by the hovered project;
 * every plate is also pre-rendered in a hidden absolute stack so the first
 * hover pays zero paint cost. Mounted on fine pointers only.
 */
function PreviewGhost({
  projects,
  hoveredName,
}: {
  projects: readonly Project[];
  hoveredName: string | null;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, GHOST_SPRING);
  const y = useSpring(my, GHOST_SPRING);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [mx, my]);

  const active = hoveredName
    ? projects.find((p) => p.name === hoveredName) ?? null
    : null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150]"
      style={{ x, y }}
    >
      <motion.div
        className="relative h-52 w-72 overflow-hidden border border-line-2 bg-surface"
        style={{ x: '-50%', y: '-50%' }}
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }}
        transition={{ duration: 0.25, ease: EASE_RISE }}
      >
        {/* all plates pre-rendered hidden — first hover never lags */}
        <div className="absolute inset-0 opacity-0">
          {projects.map((p) => (
            <ContourPlate key={p.name} seed={p.name} status={p.status} />
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.name}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_MICRO }}
            >
              <ContourPlate seed={active.name} status={active.status} />
              <span className="label numeric absolute right-3 top-2">
                {active.status}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------ section --- */

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const baseId = useId();

  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // ghost numeral parallax, 0.15×-ish of section scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const ghostEnabled = fine && !reduced;
  const previewName = ghostEnabled && expanded === null ? hovered : null;

  const projects = profile.featuredProjects;

  return (
    <section id="index" ref={sectionRef} className="relative border-t border-line-2">
      {/* chapter plate — ghost numeral parallaxing behind the title */}
      <motion.span
        aria-hidden="true"
        className="ghost-outline font-display pointer-events-none absolute right-0 top-12 select-none text-[clamp(9rem,22vw,22rem)] font-semibold leading-none"
        style={{ y: reduced ? 0 : numeralY }}
      >
        03
      </motion.span>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
        {/* plate metadata */}
        <div className="mb-6 flex items-center justify-between">
          <LineMask as="p" className="label numeric">
            CH.03 — THE INDEX
          </LineMask>
          <LineMask as="p" delay={0.08} className="label numeric">
            ▲ 4,400M
          </LineMask>
        </div>

        {/* chapter title — enters masked, floods outline → solid */}
        <h2 className="font-display text-chapter font-semibold tracking-tight">
          <LineMask>
            <span className="relative block">
              <span aria-hidden="true" className="ghost-outline absolute inset-0">
                THE INDEX
              </span>
              <motion.span
                className="relative block text-ink"
                initial={{
                  clipPath: reduced
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(0% 100% 0% 0%)',
                }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.9, ease: EASE_SUMMIT, delay: 0.2 }}
              >
                THE INDEX
              </motion.span>
            </span>
          </LineMask>
        </h2>

        {/* epigraph — one line */}
        <LineMask delay={0.12} className="mt-5">
          <p className="font-voice text-epigraph text-dim">
            Every expedition, indexed.
          </p>
        </LineMask>

        {/* column legend (lg registration marks) */}
        <Reveal className="mt-16">
          <div
            className={`hidden items-baseline border-b border-line-2 pb-3 pr-3 md:grid ${ROW_GRID}`}
          >
            <span className="label numeric">NO.</span>
            <span className="label">EXPEDITION</span>
            <span className="label">CLASSIFICATION</span>
            <span className="label">STATUS</span>
            <span aria-hidden="true" />
          </div>
        </Reveal>

        {/* index rows */}
        <div
          className="border-t border-line-2 md:border-t-0"
          onMouseLeave={() => setHovered(null)}
        >
          {projects.map((p, i) => {
            const isOpen = expanded === p.name;
            const isHovered = hovered === p.name;
            const dimmed = hovered !== null && !isHovered && !isOpen;

            return (
              <LineMask
                key={p.name}
                as="div"
                delay={0.05 + i * 0.07}
                className="border-b border-line-2"
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: dimmed ? 0.35 : 1,
                    x: !reduced && isHovered ? 8 : 0,
                  }}
                  transition={{ duration: 0.25, ease: EASE_MICRO }}
                >
                  {/* row header */}
                  <button
                    type="button"
                    data-cursor="view"
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-panel-${i}`}
                    onClick={() => setExpanded(isOpen ? null : p.name)}
                    onMouseEnter={() => fine && setHovered(p.name)}
                    className={`grid w-full cursor-pointer grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-6 pr-3 text-left md:py-7 ${ROW_GRID}`}
                  >
                    <span className="numeric font-mono text-label text-muted">
                      {p.index}
                    </span>

                    <span className="block min-w-0">
                      <span className="font-display block text-2xl font-medium text-ink md:text-3xl">
                        {p.name}
                      </span>
                      {/* tagline + status fold under the name on small screens */}
                      <span className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:hidden">
                        <span className="font-mono text-xs tracking-wider text-muted">
                          {p.tagline}
                        </span>
                        <StatusTag status={p.status} className="inline-flex" />
                      </span>
                    </span>

                    <span className="hidden font-mono text-xs leading-relaxed tracking-wider text-muted md:block">
                      {p.tagline}
                    </span>

                    <StatusTag status={p.status} className="hidden md:inline-flex" />

                    <motion.span
                      aria-hidden="true"
                      className="justify-self-end font-mono text-base text-dim md:text-lg"
                      animate={{
                        rotate: isOpen ? 90 : 0,
                        x: !reduced && isHovered && !isOpen ? 6 : 0,
                      }}
                      transition={{ duration: 0.25, ease: EASE_MICRO }}
                    >
                      →
                    </motion.span>
                  </button>

                  {/* expedition record — accordion (touch-first, works everywhere) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`${baseId}-panel-${i}`}
                        className="grid"
                        initial={{ gridTemplateRows: '0fr', opacity: 0 }}
                        animate={{ gridTemplateRows: '1fr', opacity: 1 }}
                        exit={{ gridTemplateRows: '0fr', opacity: 0 }}
                        transition={
                          reduced
                            ? {
                                gridTemplateRows: { duration: 0 },
                                opacity: { duration: 0.3 },
                              }
                            : {
                                gridTemplateRows: { duration: 0.5, ease: EASE_SUMMIT },
                                opacity: { duration: 0.35, ease: EASE_MICRO },
                              }
                        }
                      >
                        <div className="min-h-0 overflow-hidden">
                        <div className="grid gap-8 pb-8 pr-3 md:grid-cols-2 md:gap-12 md:pl-20">
                          <div className="space-y-4">
                            <p className="max-w-2xl text-sm leading-relaxed text-dim">
                              {p.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {p.tech.map((t) => (
                                <span
                                  key={t}
                                  className="border border-line-3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-transform duration-200 hover:-translate-y-0.5"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-2">
                              {p.github && (
                                <Link
                                  href={p.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="swipe group/link numeric font-mono text-label uppercase tracking-[0.18em] text-ink"
                                >
                                  GITHUB{' '}
                                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5">
                                    →
                                  </span>
                                </Link>
                              )}
                              {p.url && (
                                <Link
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="swipe group/link numeric font-mono text-label uppercase tracking-[0.18em] text-accent"
                                >
                                  LIVE SITE{' '}
                                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5">
                                    →
                                  </span>
                                </Link>
                              )}
                            </div>
                          </div>

                          {/* the plate, inline — the touch answer to the ghost */}
                          <div className="relative h-56 overflow-hidden border border-line-2 bg-surface md:h-64">
                            <ContourPlate seed={p.name} status={p.status} />
                          </div>
                        </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </LineMask>
            );
          })}
        </div>

        {/* CTA — all repos */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={profile.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="swipe group/cta numeric font-mono text-label uppercase tracking-[0.18em] text-ink"
            >
              ALL 80+ REPOS ON GITHUB{' '}
              <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1.5">
                →
              </span>
            </Link>
            <span className="label">Public and archived projects</span>
          </div>
        </Reveal>
      </div>

      {/* cursor-following contour preview — fine pointers only */}
      {ghostEnabled && (
        <PreviewGhost projects={projects} hoveredName={previewName} />
      )}
    </section>
  );
}

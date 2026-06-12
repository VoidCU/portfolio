'use client';

/**
 * VOL.02 — EXPEDITIONS, field view (BRIEF §5, CONTRACT §5/§7).
 * Featured projects as bordered expedition dossiers + the WORK DOMAINS grid
 * (deterministic borders, hover lift + acc-1 tint — no solid accent fill, the
 * old legibility bug stays dead). All hovers transform + .swipe; reveals via
 * LineMask/Reveal with designed reduced-motion fallbacks baked into the fx.
 */

import Link from 'next/link';
import { profile } from '@/data/profile';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { ContourPlate } from '@/components/fx/ContourPlate';

type Project = (typeof profile.featuredProjects)[number];
type Domain = { title: string; desc: string };

/* Pulsing status beacon — accent reserved for LIVE (vivid tints stay inside
   ContourPlate per CONTRACT §3.8). */
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
      <span className={`label numeric ${live ? 'text-accent' : ''}`}>{status}</span>
    </span>
  );
}

/* Arrow-slide link with the highlighter swipe (CONTRACT §7: arrow x:6). */
function FieldLink({
  href,
  accent = false,
  children,
}: {
  href: string;
  accent?: boolean;
  children: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`swipe group/link numeric inline-flex items-center gap-2 font-mono text-label font-semibold uppercase tracking-[0.18em] ${
        accent ? 'text-accent' : 'text-ink'
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover/link:translate-x-1.5"
      >
        →
      </span>
    </a>
  );
}

/* Corner registration ticks around the survey plate frame. */
const TICKS = [
  '-left-1.5 -top-1.5 border-l border-t',
  '-right-1.5 -top-1.5 border-r border-t',
  '-bottom-1.5 -left-1.5 border-b border-l',
  '-bottom-1.5 -right-1.5 border-b border-r',
] as const;

/* ----------------------------------------------------------- dossier --- */

function Dossier({
  project,
  i,
  total,
}: {
  project: Project;
  i: number;
  total: number;
}) {
  return (
    <Reveal delay={Math.min(i * 0.06, 0.18)}>
      <article
        aria-labelledby={`dossier-${project.index}`}
        className="grid grid-cols-1 border border-line-2 bg-surface lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      >
        {/* ── the climb log ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <span className="label numeric">
              EXP. {project.index}/{String(total).padStart(2, '0')}
            </span>
            <StatusBeacon status={project.status} />
          </div>

          <div>
            <span
              aria-hidden="true"
              className="numeric block select-none font-mono text-[clamp(3rem,7vw,4.5rem)] leading-[0.85] text-ghost"
            >
              {project.index}
            </span>
            <LineMask
              as="h2"
              className="font-display mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[0.95] tracking-tight text-ink"
            >
              <span id={`dossier-${project.index}`}>{project.name}</span>
            </LineMask>
            <LineMask as="p" delay={0.08} className="font-voice mt-3 text-epigraph text-dim">
              {project.tagline}
            </LineMask>
          </div>

          <p className="max-w-[60ch] text-sm leading-relaxed text-dim">{project.desc}</p>

          <div className="mt-auto space-y-5 pt-2">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="border border-line-3 px-2.5 py-1 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-muted transition-transform duration-200 ease-[var(--ease-micro)] hover:-translate-y-0.5"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-2 pt-5">
              {project.github && <FieldLink href={project.github}>GITHUB</FieldLink>}
              {project.url && (
                <FieldLink href={project.url} accent>
                  LIVE
                </FieldLink>
              )}
            </div>
          </div>
        </div>

        {/* ── survey plate thumbnail ────────────────────────────────── */}
        <div className="relative flex min-h-[280px] flex-col border-t border-line-2 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div className="relative min-h-[200px] flex-1 border border-line-2">
            <ContourPlate seed={project.name} status={project.status} />
            {TICKS.map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`pointer-events-none absolute h-3 w-3 border-line-4 ${pos}`}
              />
            ))}
          </div>
          <p className="label numeric mt-3 flex items-center justify-between">
            <span>FIG. {project.index} — CONTOUR SURVEY</span>
            <span aria-hidden="true">⌖</span>
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------- view --- */

export default function ProjectsView({ domains }: { domains: Domain[] }) {
  const projects = profile.featuredProjects;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-14 md:pb-32">
      {/* ── expedition dossiers ─────────────────────────────────────── */}
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between border-b border-line-2 pb-4">
          <h2 className="label">FEATURED EXPEDITIONS</h2>
          <span className="label numeric">
            {String(projects.length).padStart(2, '0')} DOSSIERS
          </span>
        </div>
      </Reveal>

      <div className="space-y-6 md:space-y-8">
        {projects.map((p, i) => (
          <Dossier key={p.name} project={p} i={i} total={projects.length} />
        ))}
      </div>

      {/* ── WORK DOMAINS — deterministic-border grid ────────────────── */}
      <section className="mt-24" aria-labelledby="work-domains">
        <div className="mb-10 flex items-baseline justify-between border-b border-line-2 pb-5">
          <LineMask
            as="h2"
            className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl"
          >
            <span id="work-domains">WORK DOMAINS</span>
          </LineMask>
          <span className="label numeric">
            {String(domains.length).padStart(2, '0')} AREAS
          </span>
        </div>

        {/* wrapper carries border-r/b; every cell carries border-t/l */}
        <div className="grid grid-cols-1 border-b border-r border-line-2 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <Reveal
              key={d.title}
              delay={Math.min(i * 0.06, 0.3)}
              className="border-l border-t border-line-2"
            >
              {/* lift + acc-1 tint — ink stays ink (legibility bug fixed) */}
              <div className="h-full p-6 transition duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 hover:bg-acc-1">
                <h3 className="font-display mb-3 text-base font-semibold tracking-tight text-ink">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-dim">{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTAs ────────────────────────────────────────────────────── */}
      <Reveal delay={0.1} className="mt-12">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={profile.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            All 80+ Repos on GitHub →
          </a>
          <Link
            href="/open-source"
            className="swipe group/os numeric inline-flex items-center gap-2 font-mono text-label font-semibold uppercase tracking-[0.18em] text-ink"
          >
            OPEN SOURCE
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover/os:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

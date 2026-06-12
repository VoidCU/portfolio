'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  siReact,
  siNextdotjs,
  siFlutter,
  siTailwindcss,
  siFigma,
  siFramer,
  siFastapi,
  siNestjs,
  siDjango,
  siLaravel,
  siNodedotjs,
  siGraphql,
  siTensorflow,
  siPytorch,
  siApachespark,
  siScikitlearn,
  siHuggingface,
  siDocker,
  siKubernetes,
  siGithubactions,
  siVercel,
  siPython,
  siTypescript,
  siJavascript,
  siCplusplus,
  siDart,
  siBlender,
  siGit,
  siLinux,
  type SimpleIcon,
} from 'simple-icons';
import { profile } from '@/data/profile';
import { Reveal } from '@/components/fx/Reveal';

/* ────────────────────────────────────────────────────────────────────
   VOL.04 — INSTRUMENTS · the field gear manifest
   Bento of skill categories matching the Competencies (CH.04) language.
   Chips carry simple-icons inline SVGs where a brand icon exists.
   ──────────────────────────────────────────────────────────────────── */

const CSS = `
.sk-chip{transition:transform .2s var(--ease-micro);}
@media (hover:hover) and (pointer:fine){
  .sk-chip:hover{transform:translateY(-2px);}
}
@media (prefers-reduced-motion:reduce){
  .sk-chip,.sk-chip:hover{transform:none;transition:none;}
}
.sk-si path{transition:fill .2s var(--ease-micro);}
html:not([data-theme="light"]) .sk-chip:hover .sk-si path{fill:var(--brand,currentColor);}
`;

/* Contract §7 — brand icons from simple-icons, rendered as inline SVG.
   Items without a matching icon stay text chips (NLP, AWS, CI/CD, SQL,
   Photoshop, Illustrator — no icon in the installed set). */
const ICONS: Record<string, SimpleIcon> = {
  React: siReact,
  'Next.js': siNextdotjs,
  Flutter: siFlutter,
  'Tailwind CSS': siTailwindcss,
  Figma: siFigma,
  'Framer Motion': siFramer,
  FastAPI: siFastapi,
  NestJS: siNestjs,
  Django: siDjango,
  Laravel: siLaravel,
  'Node.js': siNodedotjs,
  GraphQL: siGraphql,
  TensorFlow: siTensorflow,
  PyTorch: siPytorch,
  PySpark: siApachespark,
  'scikit-learn': siScikitlearn,
  HuggingFace: siHuggingface,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  'GitHub Actions': siGithubactions,
  Vercel: siVercel,
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  'C/C++': siCplusplus,
  Dart: siDart,
  Blender: siBlender,
  Git: siGit,
  Linux: siLinux,
};

/** Near-black brand hexes (Next.js) vanish on the dark ground — omit the
 *  var so the stylesheet fallback (ink) takes over. Hex from package data. */
function brandStyle(icon: SimpleIcon): React.CSSProperties | undefined {
  const r = parseInt(icon.hex.slice(0, 2), 16);
  const g = parseInt(icon.hex.slice(2, 4), 16);
  const b = parseInt(icon.hex.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance < 0.16) return undefined;
  return { '--brand': `#${icon.hex}` } as React.CSSProperties;
}

/* Bento spans — lg 4-col: [2,1,1] / [1,1,2]; sm 2-col tiles cleanly. */
const SPANS: Record<number, string> = {
  0: 'sm:col-span-2 lg:col-span-2', // Frontend & UI
  5: 'sm:col-span-2 lg:col-span-2', // Design & Tools
};

const RELATED = [
  { label: 'SEE THE PROJECTS', href: '/projects' },
  { label: 'MY SETUP', href: '/uses' },
  { label: 'EXPERIENCE', href: '/experience' },
];

function Chip({ item }: { item: string }) {
  const icon = ICONS[item];
  return (
    <li
      className="sk-chip inline-flex items-center gap-2 border border-line-3 px-2.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-dim"
      style={icon ? brandStyle(icon) : undefined}
    >
      {icon && (
        <svg viewBox="0 0 24 24" className="sk-si h-3.5 w-3.5 shrink-0" aria-hidden="true">
          <path d={icon.path} className="fill-muted" />
        </svg>
      )}
      <span>{item}</span>
    </li>
  );
}

export default function SkillsView() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
      {/* Manifest header */}
      <div className="mb-10 flex items-baseline justify-between gap-4">
        <p className="label numeric">GEAR MANIFEST — 06 CATEGORIES</p>
        <p className="label numeric hidden sm:block">CALIBRATED · FIELD-TESTED</p>
      </div>

      {/* Bento manifest — deterministic grid borders:
          cells border-t border-l, wrapper border-r border-b. */}
      <div className="grid grid-cols-1 border-r border-b border-line-2 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
        {profile.skills.map((cat, i) => (
          <Reveal
            key={cat.category}
            delay={i * 0.07}
            className={`border-t border-l border-line-2 bg-surface ${SPANS[i] ?? ''}`}
          >
            <div className="flex h-full flex-col p-6 transition-transform duration-200 ease-[var(--ease-micro)] motion-safe:hover:-translate-y-1">
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-4 bg-accent" />
                  <h2 className="label numeric">{`0${i + 1} — ${cat.category}`}</h2>
                </div>
                <span className="label numeric hidden md:inline">{`×0${cat.items.length}`}</span>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {cat.items.map((item) => (
                  <Chip key={item} item={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Field note */}
      <div className="mt-8 flex items-center gap-4">
        <div aria-hidden className="h-px flex-1 bg-line-2" />
        <p className="label numeric whitespace-nowrap">5 years · full-stack to low-level</p>
        <div aria-hidden className="h-px flex-1 bg-line-2" />
      </div>

      {/* Related volumes */}
      <Reveal delay={0.1} className="mt-10">
        <nav aria-label="Related pages" className="flex flex-wrap gap-x-8 gap-y-4">
          {RELATED.map(({ label, href }) => (
            <Link key={href} href={href} className="label group inline-flex items-center gap-2">
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

      {/* React 19 hoists + dedupes by href */}
      <style href="sk-instruments" precedence="default">
        {CSS}
      </style>
    </section>
  );
}

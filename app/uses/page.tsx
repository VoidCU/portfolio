import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';

export const metadata: Metadata = {
  title: 'Uses — Developer Setup, Tools & Stack',
  description:
    'The exact tools, software, and hardware Saroj Prasad Mainali (VoidCU) uses every day: VS Code, Windows Terminal + WSL 2, Next.js, FastAPI, PostgreSQL, Docker, Kubernetes, Figma, and a custom-built PC.',
  keywords: [
    'developer setup Nepal', 'VS Code setup developer', 'WSL 2 developer Nepal',
    'Next.js FastAPI stack', 'developer tools 2025', 'Saroj Prasad Mainali uses',
    'VoidCU setup', 'developer hardware Nepal', 'Figma design setup',
    'Docker Kubernetes developer', 'JetBrains Mono font', 'Vim VS Code developer',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Uses — Saroj Prasad Mainali (VoidCU)',
    description: 'My daily driver: VS Code + WSL 2, Next.js + FastAPI, Docker, Figma, and a custom Ryzen 7 PC. Updated when things change.',
    type: 'website',
    url: 'https://voidcu.com/uses',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Developer Setup' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uses — Saroj Prasad Mainali (VoidCU)',
    description: 'VS Code + WSL 2, Next.js + FastAPI, Docker, Figma. My real daily setup as a full-stack engineer in Nepal.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/uses' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Uses', item: 'https://voidcu.com/uses' },
  ],
};

const sections = [
  {
    label: 'Editor & Terminal',
    items: [
      { name: 'VS Code', detail: 'Primary editor. Extensions: Pylance, ESLint, Prisma, GitLens, Tailwind IntelliSense' },
      { name: 'Windows Terminal + WSL 2', detail: 'Ubuntu on WSL for dev work, PowerShell for Windows-specific tasks' },
      { name: 'JetBrains Mono', detail: 'The only font I have used for three years and will not change' },
      { name: 'Vim keybindings', detail: 'VS Code Vim extension. Yes, I am one of those people.' },
    ],
  },
  {
    label: 'Stack Defaults',
    items: [
      { name: 'Next.js 15 + TypeScript', detail: 'Frontend default for anything serious. App Router only.' },
      { name: 'FastAPI + Python', detail: 'Backend default. Clean, fast, good type hints.' },
      { name: 'PostgreSQL', detail: 'Primary database. Prisma ORM for TypeScript projects.' },
      { name: 'Docker + Kubernetes', detail: 'Everything runs in containers. No exceptions for production.' },
      { name: 'Tailwind CSS', detail: 'Utility-first and I will not apologize for it.' },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma', detail: 'All UI design work. Shared with clients for feedback.' },
      { name: 'Adobe Photoshop', detail: 'Image editing and compositing for client projects.' },
      { name: 'Adobe Illustrator', detail: 'Vector work, logos, icons.' },
    ],
  },
  {
    label: 'Productivity',
    items: [
      { name: 'Notion', detail: 'Project management, sprint planning, documentation.' },
      { name: 'Obsidian', detail: 'Personal knowledge base and daily notes.' },
      { name: 'Linear', detail: 'Issue tracking on larger projects.' },
      { name: 'Postman', detail: 'API testing. Used daily.' },
    ],
  },
  {
    label: 'Hardware',
    items: [
      { name: 'Custom PC', detail: 'Ryzen 7 5700X, RTX 3060, 32GB RAM. Built it myself. Runs Ubuntu dual-boot.' },
      { name: 'Mechanical keyboard', detail: 'Budget mechanical with brown switches. Loud enough to annoy coworkers.' },
      { name: 'NAS at KS Photography', detail: 'Maintained and configured the studio NAS for photo backup workflows.' },
    ],
  },
  {
    label: 'AI Tools I Actually Use',
    items: [
      { name: 'Claude', detail: 'Code review, documentation, architecture thinking.' },
      { name: 'GitHub Copilot', detail: 'Autocomplete in VS Code. Genuinely useful for boilerplate.' },
      { name: 'Perplexity', detail: 'Research with citations. Better than Googling for technical questions.' },
    ],
  },
];

/* Running item numbers across the whole manifest — 001, 002, … */
const manifest = (() => {
  let n = 0;
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item, n: ++n })),
  }));
})();

/* VOL.10 motif — gear ticks: survey-rule lines with calibration tick marks,
   longer tick every fifth interval (brief §5). Deterministic, static SVG. */
function GearTicksMotif() {
  const rules = [70, 170, 270];
  const ticks = rules.flatMap((y, r) =>
    Array.from({ length: 51 }, (_, i) => {
      const x = i * 24;
      const long = i % 5 === 0;
      return { key: `${r}-${i}`, x, y1: y, y2: y - (long ? 22 : 11) };
    }),
  );
  return (
    <svg
      className="h-full w-full text-ink"
      viewBox="0 0 1200 340"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {rules.map((y) => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} />
      ))}
      {ticks.map((t) => (
        <line key={t.key} x1={t.x} y1={t.y1} x2={t.x} y2={t.y2} />
      ))}
    </svg>
  );
}

/* Registration tick corners — the manifest plate stamp. */
function CornerTicks() {
  const base = 'pointer-events-none absolute h-2.5 w-2.5 border-line-5';
  return (
    <>
      <span aria-hidden="true" className={`${base} -left-px -top-px border-l border-t`} />
      <span aria-hidden="true" className={`${base} -right-px -top-px border-r border-t`} />
      <span aria-hidden="true" className={`${base} -bottom-px -left-px border-b border-l`} />
      <span aria-hidden="true" className={`${base} -bottom-px -right-px border-b border-r`} />
    </>
  );
}

export default function UsesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.10"
          title="GEAR MANIFEST"
          altitude="8,500M"
          motif={<GearTicksMotif />}
        >
          <LineMask as="p" delay={0.2} className="label">
            MY SETUP
          </LineMask>
          <LineMask as="p" delay={0.28} className="mt-4 max-w-xl text-sm leading-relaxed text-dim">
            A running list of what I use every day. Updated occasionally when
            something changes.
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          <div className="space-y-12">
            {manifest.map((section, si) => (
              <Reveal key={section.label} delay={si * 0.06}>
                <section aria-label={section.label} className="relative border border-line-2">
                  <CornerTicks />
                  <header className="flex items-baseline justify-between gap-4 border-b border-line-2 px-5 py-3">
                    <h2 className="label numeric text-ink">
                      {`SEC.${String(si + 1).padStart(2, '0')} — ${section.label}`}
                    </h2>
                    <span className="label numeric">
                      {`${String(section.items.length).padStart(2, '0')} ITEMS`}
                    </span>
                  </header>
                  <ul>
                    {section.items.map((item, i) => (
                      <li
                        key={item.name}
                        className={i > 0 ? 'border-t border-line-2' : ''}
                      >
                        <Reveal delay={0.08 + i * 0.06}>
                          <div className="group flex flex-col gap-1.5 px-5 py-4 transition-[transform,background-color] duration-200 ease-[var(--ease-micro)] hover:translate-x-2 hover:bg-acc-1 sm:flex-row sm:items-baseline sm:gap-5">
                            <span className="label numeric shrink-0 pt-0.5 sm:w-10">
                              {String(item.n).padStart(3, '0')}
                            </span>
                            <h3 className="shrink-0 text-sm font-medium text-ink sm:w-48">
                              <span className="swipe">{item.name}</span>
                            </h3>
                            <p className="flex-1 text-sm leading-relaxed text-dim">
                              {item.detail}
                            </p>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <ChapterNav current="/uses" />
      </main>
      <Footer />
    </>
  );
}

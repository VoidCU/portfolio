import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { Odometer } from '@/components/fx/Odometer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Open Source — 80+ Repos, Devanagari OCR & LeetCode Top 3%',
  description:
    'Saroj Prasad Mainali\'s open-source work: 80+ public GitHub repositories spanning web, AI, mobile, games, and research. Devanagari OCR at 99.98%, Perceparator audio separation. LeetCode Top 3% globally.',
  keywords: [
    'open source Nepal developer', 'GitHub VoidCU', '80 repositories Nepal',
    'Devanagari OCR open source', 'Perceparator PyTorch', 'Amarnepal open source',
    'LeetCode top 3 percent Nepal', '580 problems solved', 'Nepal open source developer',
    'Saroj Prasad Mainali GitHub', 'TensorFlow Nepal open source', 'VoidCU GitHub',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Open Source — Saroj Prasad Mainali (VoidCU)',
    description: '80+ public repos. Devanagari OCR at 99.98%, Perceparator audio separation, Amarnepal civic platform. LeetCode Top 3% globally.',
    type: 'website',
    url: 'https://voidcu.com/open-source',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Open Source Work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source — Saroj Prasad Mainali (VoidCU)',
    description: '80+ repos · Devanagari OCR 99.98% · Perceparator · LeetCode Top 3%. The public side of the work.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/open-source' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Open Source', item: 'https://voidcu.com/open-source' },
  ],
};

const highlights = [
  {
    name: 'Devanagari OCR',
    desc: 'CNN achieving 99.98% accuracy on handwritten Nepali character recognition. Paired with an Android draw-and-predict app.',
    tech: ['TensorFlow', 'Python', 'Android'],
    href: 'https://github.com/VoidCU/Handwritten-Devanagari-Character-Recognition',
    status: 'Research',
  },
  {
    name: 'Perceparator',
    desc: 'Transformer-based real-time dual-speaker audio separation trained on LibriMix dataset.',
    tech: ['PyTorch', 'Transformer', 'Python'],
    href: 'https://github.com/VoidCU/perceparator',
    status: 'Research',
  },
  {
    name: 'Amarnepal',
    desc: 'Civic data platform analyzing Nepal federal budgets with animated trend charts and editorial analysis.',
    tech: ['Next.js', 'TypeScript', 'Framer Motion'],
    href: 'https://github.com/VoidCU/amarnepal',
    status: 'Live',
  },
  {
    name: 'Void Social',
    desc: 'Multi-tenant social media management platform with AES-256-GCM encryption and full RBAC.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    href: 'https://github.com/VoidCU/void-social',
    status: 'In Dev',
  },
  {
    name: 'Project Lakhey',
    desc: 'Complete NGO and donor management system with public donor wall, event calendar, and impact tracking.',
    tech: ['Next.js', 'Prisma', 'Cloudinary'],
    href: 'https://github.com/VoidCU/project-lakhey',
    status: 'In Dev',
  },
];

const categories = [
  { label: 'Web & SaaS', count: '25+' },
  { label: 'AI & ML', count: '12+' },
  { label: 'Mobile (Flutter)', count: '8+' },
  { label: 'DevOps & Infra', count: '6+' },
  { label: 'Games & Graphics', count: '5+' },
  { label: 'Research & Tooling', count: '10+' },
];

/** Fork-graph motif — VOL.03 plate art (BRIEF §5), rendered at 4% by VolumePlate. */
function ForkMotif() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {/* trunk lanes */}
      <path d="M180 600 V0" />
      <path d="M540 600 V0" />
      <path d="M900 600 V0" />
      <path d="M1260 600 V0" />
      {/* branch / merge curves */}
      <path d="M180 470 C 180 420, 320 430, 320 380 V 260 C 320 210, 180 220, 180 170" />
      <path d="M540 520 C 540 470, 680 480, 680 430 V 180 C 680 130, 540 140, 540 90" />
      <path d="M900 440 C 900 390, 1040 400, 1040 350 V 250 C 1040 200, 900 210, 900 160" />
      <path d="M1260 500 C 1260 450, 1120 460, 1120 410 V 220 C 1120 170, 1260 180, 1260 130" />
      {/* commit nodes */}
      <circle cx="180" cy="470" r="7" />
      <circle cx="180" cy="170" r="7" />
      <circle cx="180" cy="60" r="7" />
      <circle cx="320" cy="320" r="7" />
      <circle cx="540" cy="520" r="7" />
      <circle cx="540" cy="90" r="7" />
      <circle cx="680" cy="300" r="7" />
      <circle cx="900" cy="540" r="7" />
      <circle cx="900" cy="440" r="7" />
      <circle cx="900" cy="160" r="7" />
      <circle cx="1040" cy="300" r="7" />
      <circle cx="1120" cy="320" r="7" />
      <circle cx="1260" cy="500" r="7" />
      <circle cx="1260" cy="130" r="7" />
    </svg>
  );
}

/* Arrow-slide mono link — arrows ride group hover (CONTRACT §7). */
function KitLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="swipe group/link numeric inline-flex items-center gap-2 font-mono text-label font-semibold uppercase tracking-[0.18em] text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover/link:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}

export default function OpenSourcePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate volume="VOL.03" title="FIELD KITS" altitude="4,000M" motif={<ForkMotif />}>
          <LineMask as="p" delay={0.2} className="font-voice text-epigraph text-dim">
            Tools packed in the open.
          </LineMask>
          <LineMask as="p" delay={0.28} className="label numeric mt-4">
            80+ REPOS · WEB / AI / MOBILE / GAMES / RESEARCH
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-14 md:pb-32">
          {/* ── repository manifest — deterministic-border grid ───────── */}
          <Reveal>
            <div className="mb-6 flex items-baseline justify-between border-b border-line-2 pb-4">
              <h2 className="label">REPOSITORY MANIFEST</h2>
              <span className="label numeric">06 CATEGORIES</span>
            </div>
          </Reveal>

          <div className="mb-16 grid grid-cols-2 border-b border-r border-line-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => (
              <Reveal
                key={cat.label}
                delay={Math.min(i * 0.06, 0.3)}
                className="border-l border-t border-line-2"
              >
                <div className="h-full p-4 text-center transition duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 hover:bg-acc-1 md:p-5">
                  <Odometer
                    value={cat.count}
                    className="font-display text-xl font-semibold text-accent md:text-2xl"
                  />
                  <p className="label mt-2">{cat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── competitive programming — instrument panel ────────────── */}
          <Reveal className="mb-16">
            <div className="border border-line-2 bg-surface p-6 md:p-8">
              <p className="label numeric mb-4">Competitive Programming</p>
              <div className="flex flex-wrap items-end gap-6 md:gap-10">
                <div>
                  <Odometer
                    value="580+"
                    className="font-display text-4xl font-semibold text-accent md:text-5xl"
                  />
                  <p className="label mt-2">Problems solved</p>
                </div>
                <div>
                  <Odometer
                    value="TOP 3%"
                    className="font-display text-4xl font-semibold text-ink md:text-5xl"
                  />
                  <p className="label mt-2">Global ranking</p>
                </div>
                <div className="min-w-[200px] flex-1">
                  <p className="max-w-[52ch] text-sm leading-relaxed text-dim">
                    LeetCode every morning. Not for interviews. To stay sharp. Graph problems at 7am
                    before emails are a good way to start the day.
                  </p>
                </div>
              </div>
              <div className="mt-6 border-t border-line-2 pt-4">
                <KitLink href={profile.contacts.leetcode}>View LeetCode Profile</KitLink>
              </div>
            </div>
          </Reveal>

          {/* ── field kits — highlighted repositories ─────────────────── */}
          <Reveal>
            <div className="mb-6 flex items-baseline justify-between border-b border-line-2 pb-4">
              <h2 className="label">Highlighted Repositories</h2>
              <span className="label numeric">
                {String(highlights.length).padStart(2, '0')} KITS
              </span>
            </div>
          </Reveal>

          <div className="mb-12 grid grid-cols-1 border-b border-r border-line-2 md:grid-cols-2">
            {highlights.map((repo, i) => (
              <Reveal
                key={repo.name}
                delay={Math.min(i * 0.06, 0.24)}
                className="border-l border-t border-line-2"
              >
                <Link
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-4 p-6 transition duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 hover:bg-acc-1 md:p-8"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="label numeric">KIT {String(i + 1).padStart(2, '0')}</span>
                    <span className="label numeric">{repo.status}</span>
                  </span>
                  <span className="font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                    <span className="swipe">{repo.name}</span>
                  </span>
                  <span className="block text-sm leading-relaxed text-dim">{repo.desc}</span>
                  <span className="mt-auto block space-y-4">
                    <span className="flex flex-wrap gap-2">
                      {repo.tech.map((t) => (
                        <span
                          key={t}
                          className="border border-line-3 px-2 py-0.5 font-mono text-[0.63rem] uppercase tracking-[0.14em] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="numeric flex items-center gap-2 border-t border-line-1 pt-4 font-mono text-label font-semibold uppercase tracking-[0.18em] text-ink">
                      GitHub
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}

            {/* overflow kit — the rest of the manifest */}
            <Reveal delay={0.3} className="border-l border-t border-line-2">
              <Link
                href={profile.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between gap-4 p-6 transition duration-200 ease-[var(--ease-micro)] hover:-translate-y-1 hover:bg-acc-1 md:p-8"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="label numeric">KIT {String(highlights.length + 1).padStart(2, '0')}</span>
                  <span className="label numeric">FULL MANIFEST</span>
                </span>
                <span className="font-voice block text-epigraph text-dim">
                  Everything else lives on GitHub.
                </span>
                <span className="numeric flex items-center gap-2 border-t border-line-1 pt-4 font-mono text-label font-semibold uppercase tracking-[0.18em] text-ink">
                  All 80+ Repos
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>

          {/* ── CTA ───────────────────────────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={profile.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                All Repos on GitHub →
              </a>
              <span className="label numeric">80+ public repositories</span>
            </div>
          </Reveal>
        </div>

        <ChapterNav current="/open-source" />
      </main>
      <Footer />
    </>
  );
}

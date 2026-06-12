import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Odometer } from '@/components/fx/Odometer';
import { Reveal } from '@/components/fx/Reveal';
import { profile } from '@/data/profile';
import SummitStats from './SummitStats';

export const metadata: Metadata = {
  title: 'Achievements — LeetCode Top 3% & Certifications',
  description:
    'Saroj Prasad Mainali: LeetCode Top 3% globally with 580+ problems solved. Certifications in Machine Learning, Advanced Learning Algorithms, and Game Theory from Stanford, DeepLearning.AI.',
  keywords: [
    'LeetCode top 3 percent Nepal', 'competitive programming Nepal', 'Saroj Prasad Mainali LeetCode',
    'machine learning certification Nepal', 'DeepLearning.AI certification Nepal',
    'Stanford game theory certification', 'software engineer achievements Nepal',
    '580 leetcode problems', 'VoidCU LeetCode', 'Nepal developer certifications',
    'algorithm problem solving Nepal', 'coding achievements Nepal',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Achievements — Saroj Prasad Mainali (VoidCU)',
    description: 'LeetCode Top 3% globally with 580+ problems. Certifications from Stanford, DeepLearning.AI, and Coursera.',
    type: 'website',
    url: 'https://voidcu.com/achievements',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Achievements' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Achievements — Saroj Prasad Mainali (VoidCU)',
    description: 'LeetCode Top 3% · 580+ problems · Machine Learning cert · Advanced Learning Algorithms cert.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/achievements' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Achievements', item: 'https://voidcu.com/achievements' },
  ],
};

/** VOL.07 motif — summit panorama at 4% (opacity applied by VolumePlate). */
function SummitPanoramaMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      className="h-full w-full text-ink"
    >
      {/* elevation rules */}
      {[96, 192, 288, 384].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="1440"
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      ))}
      {/* far range */}
      <path
        d="M0 430 L140 330 L240 386 L380 220 L470 300 L600 96 L700 230 L780 180 L920 330 L1040 240 L1170 400 L1300 300 L1440 410"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* near range */}
      <path
        d="M0 470 L180 396 L330 446 L520 330 L700 456 L900 366 L1100 470 L1280 410 L1440 460"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* summit flag on the high point */}
      <path d="M600 96 V52" stroke="currentColor" strokeWidth="2" />
      <path d="M600 52 L628 62 L600 72 Z" fill="currentColor" />
      <circle cx="600" cy="96" r="4" fill="currentColor" />
    </svg>
  );
}

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

export default function AchievementsPage() {
  const competitive = profile.achievements.find((a) => a.type === 'competitive');
  const certs = profile.achievements.filter((a) => a.type === 'cert');
  const entryCount = String(profile.achievements.length).padStart(2, '0');

  // Hero numerals parsed from profile.achievements — never hardcoded.
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
            competitive.detail.match(/rank\s*([\d,.]*\d\s*k?)/i)?.[1]?.toUpperCase() ?? '',
          label: 'GLOBAL RANK',
        },
      ].filter((s) => s.value)
    : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.07"
          title="SUMMIT LOG"
          altitude="8,000M"
          motif={<SummitPanoramaMotif />}
        >
          <LineMask as="p" delay={0.2} className="font-voice text-epigraph text-dim">
            Proof of passage — stamped, dated, logged.
          </LineMask>
          <LineMask as="p" delay={0.3} className="mt-4 text-sm leading-relaxed text-dim">
            I am not big on trophies, but a few things took real work. The LeetCode
            ranking is the one I am quietly proud of, mostly because it is a habit,
            not a single moment.
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          {/* Hero numerals — odometer rolls in ghost-stroke → solid flood */}
          {heroStats.length > 0 && <SummitStats stats={heroStats} />}

          {/* Log entries */}
          <div className="mt-16 mb-8 flex items-baseline justify-between gap-4 md:mt-20">
            <span className="label numeric">CERTIFICATIONS &amp; RECORDS</span>
            <span className="label numeric">{entryCount} ENTRIES</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {/* Competitive record — LOG 01 */}
            {competitive && (
              <Reveal className="h-full">
                <article className="group relative flex h-full flex-col border border-line-2 bg-surface p-6 transition-transform duration-200 hover:-translate-y-1">
                  <TickCorners />
                  <p className="label numeric mb-6 flex items-baseline justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                      COMPETITIVE PROGRAMMING
                    </span>
                    <span>LOG 01</span>
                  </p>
                  <h2 className="font-display mb-2 text-xl font-semibold leading-snug text-ink">
                    {competitive.title}
                  </h2>
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

          {/* Expedition totals — deterministic hairline grid */}
          <div className="mt-16 mb-8 flex items-baseline justify-between gap-4 md:mt-20">
            <span className="label numeric">EXPEDITION TOTALS</span>
            <span className="label numeric">▲ 8,000M</span>
          </div>

          <div className="grid grid-cols-2 border-r border-b border-line-2 sm:grid-cols-4">
            {profile.stats.map(({ value, label }, i) => (
              <Reveal
                key={label}
                delay={i * 0.07}
                className="border-t border-l border-line-2 p-5 text-center sm:p-6"
              >
                <Odometer
                  value={value}
                  className="font-display text-2xl font-semibold text-ink sm:text-3xl"
                />
                <p className="label numeric mt-2">{label}</p>
              </Reveal>
            ))}
          </div>

          {/* Cross-links */}
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-line-2 pt-8">
            <Link
              href={profile.contacts.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="swipe group label numeric inline-flex items-center gap-2"
            >
              LEETCODE PROFILE
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
            <Link
              href="/open-source"
              className="swipe group label numeric inline-flex items-center gap-2"
            >
              OPEN SOURCE
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
            <Link
              href="/blog/leetcode-obsession"
              className="swipe group label numeric inline-flex items-center gap-2"
            >
              WHY I STILL GRIND
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>

        <ChapterNav current="/achievements" />
      </main>
      <Footer />
    </>
  );
}

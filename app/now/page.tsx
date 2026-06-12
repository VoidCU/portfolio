import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';

/* Field-log snapshot — single source for the survey date (metadata + plate). */
const SURVEYED = 'June 2026';
const SURVEY_YEAR = SURVEYED.split(' ')[1];
const LOG_STAMP = '2026.06';

export const metadata: Metadata = {
  title: 'Now — What Saroj Prasad Mainali Is Working On',
  description:
    `Saroj Prasad Mainali's /now page: Leading engineering at Neuron Nest, building AI photo-culling at KS Photography, learning LLM fine-tuning and Kubernetes Istio. Updated ${SURVEYED} from Kathmandu.`,
  keywords: [
    'Saroj Prasad Mainali now', `VoidCU current work ${SURVEY_YEAR}`, 'Neuron Nest lead developer',
    'KS Photography AI pipeline', 'LLM fine-tuning Nepal', 'Kubernetes Istio learning',
    'Void Social development', 'Nepal developer now page', 'what saroj is doing',
    'developer now page Kathmandu', 'now page Nepal',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Now — Saroj Prasad Mainali (VoidCU)',
    description: `What I am working on right now: Neuron Nest LMS, AI photo pipeline, LLM fine-tuning, Void Social. ${SURVEYED} from Kathmandu.`,
    type: 'website',
    url: 'https://voidcu.com/now',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali — Now Page' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Now — Saroj Prasad Mainali (VoidCU)',
    description: `Leading engineering at Neuron Nest, building AI photo pipelines, learning LLM fine-tuning. Kathmandu, ${SURVEYED}.`,
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/now' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Now', item: 'https://voidcu.com/now' },
  ],
};

const fieldLog = [
  {
    label: 'WORK',
    entries: [
      'Leading engineering at Neuron Nest. Building out the LMS module. We have schools onboarding now, which means real users hitting real bugs.',
      'Technical Head at KS Photography Station. Finishing an AI photo-culling pipeline that reduces post-production time significantly for wedding photography workflows.',
      'One active freelance client. EdTech migrations. Data cleanup is 60% of the work, which nobody mentions in the proposal.',
    ],
  },
  {
    label: 'LEARNING',
    entries: [
      'Going deeper into LLM fine-tuning. Specifically LoRA and QLoRA approaches that are viable without massive compute budgets.',
      'Kubernetes advanced patterns. Service meshes, specifically Istio. More complex than I expected.',
    ],
  },
  {
    label: 'PERSONAL PROJECTS',
    entries: [
      'Void Social is in active development. Multi-tenant social media management platform. Hoping to soft-launch by August.',
      'This portfolio. It has been rebuilt more times than I want to admit.',
    ],
  },
  {
    label: 'WHERE I AM',
    entries: [
      'Kathmandu, Nepal. Working from home most days. Occasional coffee shop when I need a change of context. Power cuts are less frequent than they used to be. The internet is still unreliable at the worst moments.',
    ],
  },
];

/* Running entry numbers across the whole log — 001, 002, … */
const logGroups = (() => {
  let n = 0;
  return fieldLog.map((group) => ({
    ...group,
    entries: group.entries.map((text) => ({ text, n: ++n })),
  }));
})();

/* VOL.09 motif — compass rose: tick ring, concentric dials, cardinal +
   intercardinal star, crosshairs (brief §5). Deterministic, static SVG. */
function CompassRoseMotif() {
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i * 10 * Math.PI) / 180;
    const long = i % 9 === 0;
    const r1 = long ? 168 : 178;
    const r2 = 190;
    return {
      key: i,
      x1: +(200 + r1 * Math.sin(a)).toFixed(2),
      y1: +(200 - r1 * Math.cos(a)).toFixed(2),
      x2: +(200 + r2 * Math.sin(a)).toFixed(2),
      y2: +(200 - r2 * Math.cos(a)).toFixed(2),
    };
  });
  return (
    <svg
      className="absolute right-[-4%] top-1/2 h-[170%] w-auto -translate-y-1/2 text-ink"
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="200" cy="200" r="70" />
      <circle cx="200" cy="200" r="110" />
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="190" />
      {ticks.map((t) => (
        <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
      ))}
      {/* crosshairs */}
      <line x1="200" y1="10" x2="200" y2="390" />
      <line x1="10" y1="200" x2="390" y2="200" />
      {/* cardinal star */}
      <path d="M200 40 L212 188 L360 200 L212 212 L200 360 L188 212 L40 200 L188 188 Z" />
      {/* intercardinal star, rotated 45° */}
      <path
        d="M200 96 L208 192 L304 200 L208 208 L200 304 L192 208 L96 200 L192 192 Z"
        transform="rotate(45 200 200)"
      />
      <circle cx="200" cy="200" r="6" />
    </svg>
  );
}

export default function NowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.09"
          title="PRESENT POSITION"
          altitude="8,400M"
          motif={<CompassRoseMotif />}
        >
          <LineMask as="p" delay={0.2} className="label numeric">
            {`LAST SURVEYED — ${SURVEYED.toUpperCase()} · KATHMANDU`}
          </LineMask>
          <LineMask
            as="p"
            delay={0.28}
            className="font-voice mt-4 text-epigraph text-dim"
          >
            A /now page is a snapshot. What is true today may not be true in
            three months.
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
          <div className="space-y-10">
            {logGroups.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 0.06}>
                <section
                  aria-label={group.label}
                  className="border border-line-2"
                >
                  <header className="flex items-baseline justify-between gap-4 border-b border-line-2 px-5 py-3">
                    <h2 className="label numeric text-ink">
                      {`${String(gi + 1).padStart(2, '0')} / ${group.label}`}
                    </h2>
                    <span className="label numeric">
                      {`${String(group.entries.length).padStart(2, '0')} ${
                        group.entries.length === 1 ? 'ENTRY' : 'ENTRIES'
                      }`}
                    </span>
                  </header>
                  <ul>
                    {group.entries.map(({ text, n }, i) => (
                      <li
                        key={n}
                        className={`${i > 0 ? 'border-t border-line-2' : ''}`}
                      >
                        <Reveal delay={0.08 + i * 0.06}>
                          <div className="flex flex-col gap-1.5 px-5 py-4 transition-transform duration-200 ease-[var(--ease-micro)] hover:translate-x-2 sm:flex-row sm:gap-5">
                            <span className="label numeric shrink-0 pt-0.5">
                              {`${LOG_STAMP} / ${String(n).padStart(3, '0')}`}
                            </span>
                            <p className="text-sm leading-relaxed text-dim">{text}</p>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                  {group.label === 'WHERE I AM' && (
                    <p className="label numeric border-t border-line-2 px-5 py-3">
                      27.7172°N — 85.3240°E · 1,400M
                    </p>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <ChapterNav current="/now" />
      </main>
      <Footer />
    </>
  );
}

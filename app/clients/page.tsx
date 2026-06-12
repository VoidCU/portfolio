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
import SignalGrid from './SignalGrid';

export const metadata: Metadata = {
  title: 'Clients — 19+ Companies Across EdTech, HealthTech & More',
  description:
    'Saroj Prasad Mainali has delivered software for 19+ companies across EdTech, HealthTech, AgriTech, government, finance, real estate, events, and tourism in Nepal and internationally.',
  keywords: [
    'Saroj Prasad Mainali clients', 'Nepal software clients', 'EdTech Nepal developer',
    'HealthTech Nepal', 'AgriTech Nepal', 'Nepal government software', 'finance software Nepal',
    'freelance developer Nepal clients', 'software consultant Nepal', 'VoidCU clients',
    'Kathmandu software company', 'Nepal IT services', '19 companies Nepal developer',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Clients — Saroj Prasad Mainali (VoidCU)',
    description: '19+ companies across EdTech, HealthTech, AgriTech, government, real estate, events, and tourism. Nepal and international.',
    type: 'website',
    url: 'https://voidcu.com/clients',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Clients' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clients — Saroj Prasad Mainali (VoidCU)',
    description: '19+ companies served across many industries from Kathmandu and internationally.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/clients' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
    { '@type': 'ListItem', position: 2, name: 'Clients', item: 'https://voidcu.com/clients' },
  ],
};

/** VOL.06 motif — constellation at 4% (opacity applied by VolumePlate). */
function ConstellationMotif() {
  const stars: Array<[number, number, number]> = [
    [60, 90, 2.5], [180, 200, 2], [300, 60, 3], [430, 260, 2], [540, 130, 2.5],
    [660, 320, 2], [760, 80, 3], [900, 210, 2], [1020, 60, 2.5], [1100, 300, 2],
    [1220, 150, 3], [1340, 260, 2], [1400, 80, 2], [240, 360, 2], [80, 300, 2.5],
    [820, 400, 2.5], [500, 420, 2], [1280, 420, 2],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="h-full w-full text-ink"
    >
      {/* constellation links */}
      <path
        d="M60 90 L300 60 L540 130 L760 80 L1020 60 L1220 150 L1400 80 M180 200 L430 260 L660 320 L900 210 L1100 300 L1340 260 M80 300 L240 360 L500 420 L820 400 L1280 420"
        stroke="currentColor"
        strokeWidth="1"
      />
      {stars.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />
      ))}
      {/* origin reticle — KTM */}
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="720" cy="240" r="14" />
        <path d="M720 218 v10 M720 252 v10 M698 240 h10 M732 240 h10" />
      </g>
    </svg>
  );
}

export default function ClientsPage() {
  const clientCount = profile.clients.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.06"
          title="SIGNALS"
          altitude="7,100M"
          motif={<ConstellationMotif />}
        >
          <LineMask as="p" delay={0.2} className="font-voice text-epigraph text-dim">
            Every signal traces back to the valley.
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          {/* Intro row */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-xl">
              <p className="text-sm leading-relaxed text-dim">
                Companies and organisations I have delivered software for, spanning EdTech, HealthTech,
                AgriTech, government, real estate, events, tourism, and more. Some local, some halfway
                across the world.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="text-right">
              <Odometer
                value={`${clientCount}+`}
                className="font-display text-5xl font-semibold text-accent"
              />
              <p className="label numeric mt-2">Companies</p>
            </Reveal>
          </div>

          {/* Signal registry */}
          <div className="mt-12 mb-6 flex items-baseline justify-between gap-4">
            <span className="label numeric">SIGNAL REGISTRY</span>
            <span className="label numeric">{String(clientCount).padStart(2, '0')} NODES</span>
          </div>

          <SignalGrid />

          {/* NDA note */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-line-2" />
            <p className="label numeric max-w-md text-center">
              Most projects under NDA — case studies on request
            </p>
            <div className="h-px flex-1 bg-line-2" />
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/contact" className="btn-primary text-xs">
              Work with me →
            </Link>
            <Link
              href="/projects"
              className="swipe group label numeric inline-flex items-center gap-2"
            >
              SEE THE PROJECTS
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <ChapterNav current="/clients" />
      </main>
      <Footer />
    </>
  );
}

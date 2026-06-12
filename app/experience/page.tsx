import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { Reveal } from '@/components/fx/Reveal';
import ExperienceView from './ExperienceView';

export const metadata: Metadata = {
  title: 'Experience — Lead Developer, CTO & Freelance Engineer',
  description:
    'Saroj Prasad Mainali\'s work history: Lead Developer at Neuron Nest, CTO at Elytra Solutions, Technical Head at KS Photography. 5+ years across SaaS, AI, mobile, and automation in Kathmandu, Nepal.',
  keywords: [
    'Saroj Prasad Mainali experience', 'Nepal software engineer career', 'Neuron Nest lead developer',
    'Elytra Solutions CTO Nepal', 'KS Photography technical head', 'full-stack developer work history',
    'CTO Nepal startup', 'freelance developer Kathmandu', 'SaaS developer Nepal experience',
    'AI developer Nepal career', 'VoidCU work history',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Experience — Saroj Prasad Mainali (VoidCU)',
    description: 'Lead Developer, CTO, Technical Head, and freelance consultant. 5+ years overlapping roles in Nepal\'s tech industry.',
    type: 'website',
    url: 'https://voidcu.com/experience',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali — Work Experience' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience — Saroj Prasad Mainali (VoidCU)',
    description: 'Lead Developer at Neuron Nest, CTO at Elytra Solutions, Technical Head at KS Photography. 5 years of overlapping roles.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/experience' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Experience', item: 'https://voidcu.com/experience' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://voidcu.com/#person',
    name: 'Saroj Prasad Mainali',
    url: 'https://voidcu.com',
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Lead Developer',
        occupationLocation: { '@type': 'City', name: 'Kathmandu' },
        description: 'Building multi-tenant LMS platform for schools at Neuron Nest',
      },
      {
        '@type': 'Occupation',
        name: 'CTO & Co-founder',
        occupationLocation: { '@type': 'City', name: 'Kathmandu' },
        description: 'Technical leadership across 15+ client projects at Elytra Solutions',
      },
    ],
  },
];

/* Volume motif — route path (brief §5): a wandering ascent line with
   waypoint rings and a summit flag. Rendered at 4% by the plate. */
function RoutePathMotif() {
  return (
    <svg
      className="h-full w-full text-ink"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor">
        {/* the route */}
        <path
          d="M-40 488 C 120 440, 240 472, 360 408 C 480 344, 560 296, 680 320 C 800 344, 880 232, 1000 176 C 1120 120, 1280 72, 1480 24"
          strokeWidth="1.5"
          strokeDasharray="7 9"
        />
        {/* fainter parallel contour */}
        <path
          d="M-40 520 C 160 488, 300 512, 440 456 C 580 400, 660 352, 780 376 C 900 400, 1020 296, 1140 224 C 1260 152, 1360 120, 1480 88"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      </g>
      <g stroke="currentColor" strokeWidth="1">
        {/* waypoints along the route */}
        <circle cx="360" cy="408" r="7" />
        <circle cx="360" cy="408" r="2" fill="currentColor" />
        <circle cx="680" cy="320" r="7" />
        <circle cx="680" cy="320" r="2" fill="currentColor" />
        <circle cx="1000" cy="176" r="7" />
        <circle cx="1000" cy="176" r="2" fill="currentColor" />
        {/* summit peak + flag */}
        <path d="M1280 120l28-46 28 46z" />
        <path d="M1308 74V46M1308 46l20 9-20 9" />
      </g>
    </svg>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="relative min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.05"
          title="THE ROUTE"
          altitude="6,200M"
          motif={<RoutePathMotif />}
        >
          <p className="label numeric">WORK EXPERIENCE — EXPEDITION LOG</p>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm leading-relaxed text-dim md:text-base">
              Five years of overlapping roles, because the market here rewards being useful in more
              than one way. Lead, CTO, technical head, freelancer, often all in the same week.
            </p>
          </Reveal>
        </VolumePlate>

        <ExperienceView />

        <ChapterNav current="/experience" />
      </main>
      <Footer />
    </>
  );
}

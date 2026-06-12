import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import ContactView from './ContactView';

export const metadata: Metadata = {
  title: 'Contact — Hire Saroj Prasad Mainali for Your Project',
  description:
    'Get in touch with Saroj Prasad Mainali (VoidCU). Open to freelance projects, full-time roles, and technical collaborations. Based in Kathmandu, Nepal. Responds within 1-2 business days.',
  keywords: [
    'hire developer Nepal', 'hire full-stack engineer Nepal', 'freelance developer Kathmandu',
    'Nepal software consultant', 'contact Saroj Prasad Mainali', 'VoidCU contact',
    'hire Next.js developer Nepal', 'hire FastAPI developer', 'software engineer for hire Nepal',
    'Kathmandu developer contact', 'Nepal IT freelancer', 'full-stack engineer available',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Contact Saroj Prasad Mainali (VoidCU)',
    description: 'Open to freelance work, full-time roles, and interesting technical collaborations. Based in Kathmandu, Nepal.',
    type: 'website',
    url: 'https://voidcu.com/contact',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Contact Saroj Prasad Mainali' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Saroj Prasad Mainali (VoidCU)',
    description: 'Open to freelance, full-time roles, and collaborations. Available now. Response within 1-2 days.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/contact' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://voidcu.com/contact' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Saroj Prasad Mainali',
    url: 'https://voidcu.com/contact',
    description: 'Contact form and details to reach Saroj Prasad Mainali for freelance, full-time, or collaboration opportunities.',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://voidcu.com/#person',
      name: 'Saroj Prasad Mainali',
      email: 'sarojprasadmainali@gmail.com',
      url: 'https://voidcu.com',
    },
  },
];

/** Broadcast rings — the VOL.11 motif (BRIEF §5): concentric signal rings
    radiating from a transmitter node, rendered at 4% by the plate. */
const broadcastMotif = (
  <svg
    aria-hidden="true"
    viewBox="0 0 1200 480"
    preserveAspectRatio="xMidYMid slice"
    className="h-full w-full text-ink"
    fill="none"
  >
    <g stroke="currentColor" strokeWidth="1">
      {/* Primary transmitter — rings alternate solid / dashed */}
      {[36, 84, 140, 204, 276, 356, 444, 540].map((r, i) => (
        <circle
          key={r}
          cx="860"
          cy="220"
          r={r}
          strokeDasharray={i % 2 === 1 ? '2 7' : undefined}
        />
      ))}
      {/* Calibration ticks through the primary node */}
      <line x1="860" y1="160" x2="860" y2="196" />
      <line x1="860" y1="244" x2="860" y2="280" />
      <line x1="800" y1="220" x2="836" y2="220" />
      <line x1="884" y1="220" x2="920" y2="220" />
      {/* Secondary relay station, lower left */}
      {[40, 96, 160].map((r, i) => (
        <circle
          key={r}
          cx="150"
          cy="430"
          r={r}
          strokeDasharray={i % 2 === 0 ? '2 7' : undefined}
        />
      ))}
    </g>
    {/* Transmitter nodes */}
    <circle cx="860" cy="220" r="4" fill="currentColor" />
    <circle cx="150" cy="430" r="3" fill="currentColor" />
  </svg>
);

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate volume="VOL.11" title="TRANSMISSION" altitude="8,600M" motif={broadcastMotif}>
          <LineMask delay={0.15}>
            <p className="font-voice text-epigraph text-dim">
              Say the word — the line is open.
            </p>
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
          <ContactView />
        </div>

        <ChapterNav current="/contact" />
      </main>
      <Footer />
    </>
  );
}

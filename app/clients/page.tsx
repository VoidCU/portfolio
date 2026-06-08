import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

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

export default function ClientsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              CLIENTS
            </h1>
            <span className="label">05 / 07</span>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <p className="text-[var(--c-dim)] text-sm max-w-xl leading-relaxed">
              Companies and organisations I have delivered software for, spanning EdTech, HealthTech,
              AgriTech, government, real estate, events, tourism, and more. Some local, some halfway
              across the world.
            </p>
            <div className="text-right">
              <p className="font-heading font-black text-[var(--c-accent)] text-4xl">19+</p>
              <p className="label mt-1">Companies</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[var(--c-b2)]">
            {profile.clients.map(({ index, name, category, url }) => {
              const content = (
                <div className="group p-5 border-b border-r border-[var(--c-b2)] hover:bg-[var(--c-accent)] transition-colors duration-150">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <p className="font-mono text-[var(--c-muted)] group-hover:text-[var(--c-on-accent)] text-[10px] tracking-wider">{index}</p>
                      <h2 className="font-heading font-bold text-[var(--c-text)] group-hover:text-[var(--c-on-accent)] text-base leading-snug transition-colors">
                        {name}
                      </h2>
                      <p className="label text-[var(--c-muted)] group-hover:text-[var(--c-on-accent)] transition-colors">
                        {category}
                      </p>
                    </div>
                    {url && (
                      <span className="label text-[var(--c-muted)] group-hover:text-[var(--c-on-accent)] transition-colors text-[9px] mt-0.5 whitespace-nowrap">
                        ↗
                      </span>
                    )}
                  </div>
                </div>
              );

              return url ? (
                <Link key={name} href={url} target="_blank" rel="noopener noreferrer">
                  {content}
                </Link>
              ) : (
                <div key={name}>{content}</div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
            <p className="label whitespace-nowrap text-center">
              Most projects under NDA — case studies on request
            </p>
            <div className="flex-1 h-px bg-[var(--c-b2)]" />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-xs">Work with me →</Link>
            <Link href="/projects" className="label hover:text-[var(--c-accent)] transition-colors self-center">SEE THE PROJECTS →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

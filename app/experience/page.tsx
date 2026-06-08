import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

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

export default function ExperiencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              EXPERIENCE
            </h1>
            <span className="label">03 / 07</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm max-w-2xl leading-relaxed mb-12">
            Five years of overlapping roles, because the market here rewards being useful in more
            than one way. Lead, CTO, technical head, freelancer, often all in the same week.
          </p>

          <div className="space-y-0">
            {profile.timeline.map(({ index, role, org, period, items }, i) => (
              <div
                key={index}
                className={`group border-b border-[var(--c-b2)] ${i === 0 ? 'border-t' : ''}`}
              >
                <div className="py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-3 items-start">

                  <span className="font-mono text-[var(--c-muted)] text-sm pt-0.5 w-8 flex-shrink-0">
                    {index}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-heading font-bold text-[var(--c-text)] text-xl group-hover:text-[var(--c-accent)] transition-colors">
                        {role}
                      </h2>
                      <span className="text-[var(--c-muted)] font-mono text-xs tracking-wider uppercase">
                        @ {org}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[var(--c-dim)] text-sm">
                          <span className="mt-1.5 w-1 h-1 bg-[var(--c-accent)] flex-shrink-0" />
                          <span className="group-hover:text-[var(--c-text)] transition-colors leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="label md:text-right pt-1 whitespace-nowrap">
                    {period}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-8 pb-5 border-b border-[var(--c-b2)]">
              <h2 className="font-heading font-black text-[var(--c-text)] text-2xl md:text-3xl tracking-tight">
                EDUCATION
              </h2>
            </div>
            <div className="border border-[var(--c-b2)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[var(--c-text)] font-semibold text-base">{profile.education.degree}</p>
                <p className="text-[var(--c-dim)] text-sm">{profile.education.institution}</p>
              </div>
              <span className="label whitespace-nowrap">{profile.education.period}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/clients" className="label hover:text-[var(--c-accent)] transition-colors">WHO I WORKED WITH →</Link>
            <Link href="/achievements" className="label hover:text-[var(--c-accent)] transition-colors">ACHIEVEMENTS →</Link>
            <Link href="/assets/pdfs/SarojResume.pdf" target="_blank" className="label hover:text-[var(--c-accent)] transition-colors">RESUME →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

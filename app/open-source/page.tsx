import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

export default function OpenSourcePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              OPEN SOURCE
            </h1>
            <span className="label">80+ repos</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[var(--c-b2)] mb-16">
            {categories.map((cat, i) => (
              <div
                key={cat.label}
                className={`p-4 md:p-5 text-center border-b border-r border-[var(--c-b2)] ${i === categories.length - 1 ? 'border-r-0' : ''}`}
              >
                <p className="font-heading font-black text-[var(--c-accent)] text-xl md:text-2xl">{cat.count}</p>
                <p className="label mt-2">{cat.label}</p>
              </div>
            ))}
          </div>

          {/* LeetCode */}
          <div className="mb-16 border border-[var(--c-b2)] p-6 md:p-8">
            <p className="label mb-3">Competitive Programming</p>
            <div className="flex flex-wrap items-end gap-6 md:gap-8">
              <div>
                <p className="font-heading font-black text-[var(--c-accent)] text-4xl md:text-5xl">580+</p>
                <p className="label mt-2">Problems solved</p>
              </div>
              <div>
                <p className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl">Top 3%</p>
                <p className="label mt-2">Global ranking</p>
              </div>
              <div className="flex-1 min-w-[200px]">
                <p className="text-[var(--c-dim)] text-sm leading-relaxed">
                  LeetCode every morning. Not for interviews. To stay sharp. Graph problems at 7am before emails are a good way to start the day.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--c-b2)]">
              <Link
                href={profile.contacts.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors"
              >
                View LeetCode Profile →
              </Link>
            </div>
          </div>

          {/* Highlighted repos */}
          <p className="label mb-6">Highlighted Repositories</p>
          <div className="space-y-0 border-t border-[var(--c-b2)] mb-12">
            {highlights.map(repo => (
              <Link
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 md:gap-6 py-6 border-b border-[var(--c-b2)] hover:bg-[rgba(74,222,128,0.05)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-heading font-bold text-[var(--c-text)] group-hover:text-[var(--c-accent)] transition-colors text-base md:text-lg">
                      {repo.name}
                    </h3>
                    <span className="label">{repo.status}</span>
                  </div>
                  <p className="text-[var(--c-dim)] text-sm leading-relaxed mb-3">{repo.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.tech.map(t => (
                      <span key={t} className="border border-[var(--c-b2)] px-2 py-0.5 text-[var(--c-muted)] font-mono text-[10px] tracking-wider uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="label text-[var(--c-muted)] group-hover:text-[var(--c-accent)] transition-colors flex-shrink-0">
                  GitHub →
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
              All Repos on GitHub →
            </Link>
            <span className="label">80+ public repositories</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

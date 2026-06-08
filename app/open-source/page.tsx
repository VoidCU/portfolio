import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Open Source',
  description: '80+ public GitHub repositories spanning web, AI, mobile, games, and research. Devanagari OCR at 99.98% and Perceparator highlighted. 580+ LeetCode problems solved.',
  openGraph: {
    title: 'Open Source · Saroj Prasad Mainali',
    description: '80+ repos and 580+ LeetCode problems. The public side of the work.',
    type: 'website',
    url: 'https://voidcu.com/open-source',
  },
  alternates: { canonical: 'https://voidcu.com/open-source' },
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
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              OPEN SOURCE
            </h1>
            <span className="label">80+ repos</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-0 border border-[rgba(74,222,128,0.08)] mb-16">
            {categories.map((cat, i) => (
              <div
                key={cat.label}
                className={`p-5 text-center ${i < categories.length - 1 ? 'border-r border-[rgba(74,222,128,0.08)]' : ''}`}
              >
                <p className="font-heading font-black text-[#4ade80] text-2xl">{cat.count}</p>
                <p className="label mt-2">{cat.label}</p>
              </div>
            ))}
          </div>

          {/* LeetCode */}
          <div className="mb-16 border border-[rgba(74,222,128,0.08)] p-8">
            <p className="label mb-3">Competitive Programming</p>
            <div className="flex flex-wrap items-end gap-8">
              <div>
                <p className="font-heading font-black text-[#4ade80] text-5xl">580+</p>
                <p className="label mt-2">Problems solved</p>
              </div>
              <div>
                <p className="font-heading font-black text-[#e8fdf0] text-5xl">Top 3%</p>
                <p className="label mt-2">Global ranking</p>
              </div>
              <div className="flex-1">
                <p className="text-[#86efac] text-sm leading-relaxed max-w-md">
                  LeetCode every morning. Not for interviews. To stay sharp. Graph problems at 7am before emails are a good way to start the day.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(74,222,128,0.08)]">
              <Link
                href={profile.contacts.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[#4d7c5a] hover:text-[#4ade80] transition-colors"
              >
                View LeetCode Profile →
              </Link>
            </div>
          </div>

          {/* Highlighted repos */}
          <p className="label mb-6">Highlighted Repositories</p>
          <div className="space-y-0 border-t border-[rgba(74,222,128,0.08)] mb-12">
            {highlights.map(repo => (
              <Link
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 py-6 border-b border-[rgba(74,222,128,0.08)] hover:bg-[rgba(74,222,128,0.02)] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-heading font-bold text-[#e8fdf0] group-hover:text-[#4ade80] transition-colors text-lg">
                      {repo.name}
                    </h3>
                    <span className="label">{repo.status}</span>
                  </div>
                  <p className="text-[#86efac] text-sm leading-relaxed mb-3">{repo.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.tech.map(t => (
                      <span key={t} className="border border-[rgba(74,222,128,0.08)] px-2 py-0.5 text-[#4d7c5a] font-mono-custom text-[10px] tracking-wider uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="label text-[#4d7c5a] group-hover:text-[#4ade80] transition-colors flex-shrink-0">
                  GitHub →
                </span>
              </Link>
            ))}
          </div>

          {/* All repos CTA */}
          <div className="flex items-center gap-6">
            <Link
              href={profile.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
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

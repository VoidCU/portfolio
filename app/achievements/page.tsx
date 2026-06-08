import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

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

const clean = (s: string) => s.replace(/—/g, ':');

export default function AchievementsPage() {
  const competitive = profile.achievements.filter((a) => a.type === 'competitive');
  const certs = profile.achievements.filter((a) => a.type === 'cert');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              ACHIEVEMENTS
            </h1>
            <span className="label">06 / 07</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm max-w-2xl leading-relaxed mb-12">
            I am not big on trophies, but a few things took real work. The LeetCode ranking is the
            one I am quietly proud of, mostly because it is a habit, not a single moment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border border-[var(--c-b2)]">
            {competitive.map((ach) => (
              <div
                key={ach.title}
                className="p-8 lg:border-r border-b lg:border-b-0 border-[var(--c-b2)] flex flex-col justify-between"
              >
                <div>
                  <p className="label mb-6 text-[var(--c-accent)]">Competitive Programming</p>
                  <h2 className="font-heading font-black text-[var(--c-text)] text-2xl md:text-3xl leading-tight mb-3">
                    {clean(ach.title)}
                  </h2>
                  <p className="font-mono text-[var(--c-dim)] text-sm">{clean(ach.detail)}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--c-b2)]">
                  <p className="font-heading font-black text-[var(--c-accent)] text-5xl md:text-6xl">3%</p>
                  <p className="label mt-2">Global ranking</p>
                </div>
              </div>
            ))}

            <div className="divide-y divide-[var(--c-b2)]">
              <div className="p-5 pb-4">
                <p className="label">Certifications</p>
              </div>
              {certs.map(({ title, detail }) => (
                <div
                  key={title}
                  className="group px-5 py-4 flex items-start justify-between gap-6 hover:bg-[rgba(74,222,128,0.06)] transition-colors"
                >
                  <h3 className="text-[var(--c-dim)] group-hover:text-[var(--c-text)] text-sm font-semibold transition-colors leading-snug">
                    {clean(title)}
                  </h3>
                  <p className="label whitespace-nowrap text-right">{clean(detail)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[var(--c-b2)] mt-10">
            {profile.stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`p-4 sm:p-5 text-center ${i < profile.stats.length - 1 ? 'border-r border-[var(--c-b2)]' : ''}`}
              >
                <p className="font-heading font-black text-[var(--c-accent)] text-2xl sm:text-3xl">{value}</p>
                <p className="label mt-2">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={profile.contacts.leetcode} target="_blank" rel="noopener noreferrer" className="label hover:text-[var(--c-accent)] transition-colors">LEETCODE PROFILE →</Link>
            <Link href="/open-source" className="label hover:text-[var(--c-accent)] transition-colors">OPEN SOURCE →</Link>
            <Link href="/blog/leetcode-obsession" className="label hover:text-[var(--c-accent)] transition-colors">WHY I STILL GRIND →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

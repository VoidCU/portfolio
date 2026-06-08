import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    'LeetCode Top 3% globally with 580+ problems solved. Certifications in Machine Learning, Advanced Learning Algorithms, Game Theory, and research methods.',
  openGraph: {
    title: 'Achievements · Saroj Prasad Mainali',
    description: 'LeetCode top 3 percent, 580+ solved, and a stack of certifications.',
    type: 'website',
    url: 'https://voidcu.com/achievements',
  },
  alternates: { canonical: 'https://voidcu.com/achievements' },
};

// Strip em dashes from data so the rendered copy stays clean.
const clean = (s: string) => s.replace(/—/g, ':');

export default function AchievementsPage() {
  const competitive = profile.achievements.filter((a) => a.type === 'competitive');
  const certs = profile.achievements.filter((a) => a.type === 'cert');

  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              ACHIEVEMENTS
            </h1>
            <span className="label">06 / 07</span>
          </div>

          {/* Intro */}
          <p className="text-[#86efac] text-sm max-w-2xl leading-relaxed mb-12">
            I am not big on trophies, but a few things took real work. The LeetCode ranking is the
            one I am quietly proud of, mostly because it is a habit, not a single moment.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 border border-[rgba(74,222,128,0.08)]">
            {/* Competitive highlight */}
            {competitive.map((ach) => (
              <div
                key={ach.title}
                className="p-8 lg:border-r border-b lg:border-b-0 border-[rgba(74,222,128,0.08)] flex flex-col justify-between"
              >
                <div>
                  <p className="label mb-6 text-[#4ade80]">Competitive Programming</p>
                  <h2 className="font-heading font-black text-[#e8fdf0] text-3xl leading-tight mb-3">
                    {clean(ach.title)}
                  </h2>
                  <p className="font-mono-custom text-[#86efac] text-sm">{clean(ach.detail)}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-[rgba(74,222,128,0.08)]">
                  <p className="font-heading font-black text-[#4ade80] text-6xl">3%</p>
                  <p className="label mt-2">Global ranking</p>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div className="divide-y divide-[rgba(74,222,128,0.08)]">
              <div className="p-5 pb-4">
                <p className="label">Certifications</p>
              </div>
              {certs.map(({ title, detail }) => (
                <div
                  key={title}
                  className="group px-5 py-4 flex items-start justify-between gap-6 hover:bg-[rgba(74,222,128,0.03)] transition-colors"
                >
                  <h3 className="text-[#86efac] group-hover:text-[#e8fdf0] text-sm font-semibold transition-colors leading-snug">
                    {clean(title)}
                  </h3>
                  <p className="label whitespace-nowrap text-right">{clean(detail)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[rgba(74,222,128,0.08)] mt-10">
            {profile.stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`p-5 text-center ${i < profile.stats.length - 1 ? 'border-r border-[rgba(74,222,128,0.08)]' : ''}`}
              >
                <p className="font-heading font-black text-[#4ade80] text-3xl">{value}</p>
                <p className="label mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Cross links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={profile.contacts.leetcode} target="_blank" rel="noopener noreferrer" className="label hover:text-[#4ade80] transition-colors">LEETCODE PROFILE →</Link>
            <Link href="/open-source" className="label hover:text-[#4ade80] transition-colors">OPEN SOURCE →</Link>
            <Link href="/blog/leetcode-obsession" className="label hover:text-[#4ade80] transition-colors">WHY I STILL GRIND →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

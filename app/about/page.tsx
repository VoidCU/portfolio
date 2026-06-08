import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Full-stack engineer from Kathmandu, Nepal. Computer Engineering graduate with 5+ years building SaaS, AI systems, mobile apps, and automation.',
  openGraph: {
    title: 'About · Saroj Prasad Mainali',
    description:
      'Full-stack engineer from Kathmandu, Nepal. 5+ years, 100+ shipped products.',
    type: 'website',
    url: 'https://voidcu.com/about',
  },
  alternates: { canonical: 'https://voidcu.com/about' },
};

const extraBio = [
  'I grew up in Kathmandu, learning to code on rented hours in internet cafes before I ever owned a machine of my own. That start left a mark. I am resourceful, a little stubborn, and not precious about tools. When you learn under constraint, you learn to build anyway.',
  'These days I move across the whole stack and across domains: multi-tenant SaaS one hour, a Flutter screen the next, a hydrological model for an NGO in the afternoon. People call that scattered. I call it range. The patterns repeat once you have seen enough of them.',
  'I care about shipping things that actually work for real people, not demos that look good in a screenshot. I write open source for the joy of it, grind LeetCode most mornings to keep my head sharp, and mentor a small team that teaches me more than I teach them.',
];

const facts = [
  { label: 'Based in', value: 'Kathmandu, Nepal' },
  { label: 'Alias', value: 'VoidCU' },
  { label: 'Role', value: 'Full-Stack Engineer & AI Builder' },
  { label: 'Experience', value: '5+ years, 100+ shipped products' },
  { label: 'Status', value: 'Open to work & collaborations' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              ABOUT
            </h1>
            <span className="label">01 / 07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

            {/* Photo + facts */}
            <div className="space-y-6">
              <div className="relative aspect-square w-full max-w-xs">
                <div className="absolute inset-0 border border-[rgba(74,222,128,0.14)]" />
                <div className="absolute -bottom-2 -right-2 border border-[rgba(74,222,128,0.08)] w-full h-full" />
                <Image
                  src="https://raw.githubusercontent.com/VoidCU/VoidCU/main/assets/saroj.png"
                  alt="Saroj Prasad Mainali"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Quick facts */}
              <div className="border border-[rgba(74,222,128,0.08)] divide-y divide-[rgba(74,222,128,0.08)]">
                {facts.map(({ label, value }) => (
                  <div key={label} className="p-4">
                    <p className="label mb-1">{label}</p>
                    <p className="text-[#e8fdf0] text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="border border-[rgba(74,222,128,0.08)] p-5 space-y-1">
                <p className="label mb-3">Education</p>
                <p className="text-[#e8fdf0] font-semibold text-sm">{profile.education.degree}</p>
                <p className="text-[#86efac] text-xs">{profile.education.institution}</p>
                <p className="text-[#4d7c5a] text-xs font-mono-custom">{profile.education.period}</p>
              </div>
            </div>

            {/* Bio + stats */}
            <div className="space-y-10">
              <div className="space-y-5">
                {profile.bio.map((para, i) => (
                  <p key={`bio-${i}`} className="text-[#86efac] leading-relaxed text-base">
                    {para.replace(/—/g, ',')}
                  </p>
                ))}
                {extraBio.map((para, i) => (
                  <p key={`extra-${i}`} className="text-[#86efac] leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[rgba(74,222,128,0.08)]">
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

              {/* Skills summary */}
              <div>
                <p className="label mb-5">What I work with</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {profile.skills.map((cat) => (
                    <div key={cat.category} className="flex items-baseline gap-3 py-1.5 border-b border-[rgba(74,222,128,0.08)]">
                      <span className="text-[#e8fdf0] text-sm font-semibold whitespace-nowrap">{cat.category}</span>
                      <span className="text-[#4d7c5a] text-xs font-mono-custom truncate">{cat.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'GitHub', href: profile.contacts.github },
                  { label: 'LinkedIn', href: profile.contacts.linkedin },
                  { label: 'LeetCode', href: profile.contacts.leetcode },
                  { label: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="label border border-[rgba(74,222,128,0.08)] px-4 py-2.5 text-[#4d7c5a] hover:text-[#080d08] hover:bg-[#4ade80] hover:border-[#4ade80] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>

              {/* Internal links */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[rgba(74,222,128,0.08)]">
                <Link href="/now" className="label hover:text-[#4ade80] transition-colors">NOW →</Link>
                <Link href="/uses" className="label hover:text-[#4ade80] transition-colors">USES →</Link>
                <Link href="/experience" className="label hover:text-[#4ade80] transition-colors">EXPERIENCE →</Link>
                <Link href="/blog" className="label hover:text-[#4ade80] transition-colors">BLOG →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'About Saroj Prasad Mainali — Full-Stack Engineer from Kathmandu',
  description:
    'Saroj Prasad Mainali (VoidCU) is a full-stack engineer from Kathmandu, Nepal with 5+ years building SaaS, AI systems, mobile apps, and automation for 19+ companies worldwide.',
  keywords: [
    'Saroj Prasad Mainali', 'VoidCU', 'full-stack engineer Nepal', 'software engineer Kathmandu',
    'Nepal developer about', 'computer engineer tribhuvan university', 'Neuron Nest lead developer',
    'Elytra Solutions CTO', 'Nepal AI developer', 'freelance developer Nepal bio',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'About Saroj Prasad Mainali — Full-Stack Engineer & AI Builder',
    description:
      'Full-stack engineer from Kathmandu. 5+ years, 100+ shipped products, 19+ companies. Building SaaS, AI, and mobile apps that actually work.',
    type: 'profile',
    url: 'https://voidcu.com/about',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali — Full-Stack Engineer from Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Saroj Prasad Mainali — VoidCU',
    description: 'Full-stack engineer from Kathmandu. 5+ years · 100+ shipped products. Learn about who I am and what I build.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/about' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://voidcu.com/about' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://voidcu.com/#person',
    name: 'Saroj Prasad Mainali',
    alternateName: ['VoidCU', 'Saroj Mainali'],
    url: 'https://voidcu.com',
    image: 'https://voidcu.com/assets/me.jpeg',
    jobTitle: 'Full-Stack Engineer & Technical Lead',
    description: 'Full-stack engineer from Kathmandu, Nepal specialising in SaaS architecture, AI/ML systems, and mobile development.',
    address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Thapathali Campus, Tribhuvan University',
      address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    },
    sameAs: [
      'https://github.com/VoidCU',
      'https://www.linkedin.com/in/saroj-prasad-mainali',
      'https://leetcode.com/VoidCU',
    ],
    knowsAbout: [
      'Full-Stack Development', 'Machine Learning', 'SaaS Architecture',
      'Next.js', 'FastAPI', 'TypeScript', 'Python', 'Docker', 'Kubernetes',
      'Flutter', 'React', 'PostgreSQL', 'TensorFlow', 'PyTorch',
    ],
  },
];

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              ABOUT
            </h1>
            <span className="label">01 / 07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">

            {/* Photo + facts */}
            <div className="space-y-6">
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-0 border border-[var(--c-b3)]" />
                <div className="absolute -bottom-2 -right-2 border border-[var(--c-b2)] w-full h-full" />
                <Image
                  src="/assets/me.jpeg"
                  alt="Saroj Prasad Mainali — Full-Stack Engineer from Kathmandu, Nepal"
                  width={0}
                  height={0}
                  sizes="(max-width: 320px) 100vw, 320px"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  unoptimized
                  priority
                />
              </div>

              <div className="border border-[var(--c-b2)] divide-y divide-[var(--c-b2)]">
                {facts.map(({ label, value }) => (
                  <div key={label} className="p-4">
                    <p className="label mb-1">{label}</p>
                    <p className="text-[var(--c-text)] text-sm">{value}</p>
                  </div>
                ))}
              </div>

              <div className="border border-[var(--c-b2)] p-5 space-y-1">
                <p className="label mb-3">Education</p>
                <p className="text-[var(--c-text)] font-semibold text-sm">{profile.education.degree}</p>
                <p className="text-[var(--c-dim)] text-xs">{profile.education.institution}</p>
                <p className="text-[var(--c-muted)] text-xs font-mono">{profile.education.period}</p>
              </div>
            </div>

            {/* Bio + stats */}
            <div className="space-y-10">
              <div className="space-y-5">
                {profile.bio.map((para, i) => (
                  <p key={`bio-${i}`} className="text-[var(--c-dim)] leading-relaxed text-base">
                    {para.replace(/—/g, ',')}
                  </p>
                ))}
                {extraBio.map((para, i) => (
                  <p key={`extra-${i}`} className="text-[var(--c-dim)] leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[var(--c-b2)]">
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

              <div>
                <p className="label mb-5">What I work with</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                  {profile.skills.map((cat) => (
                    <div key={cat.category} className="flex items-baseline gap-3 py-1.5 border-b border-[var(--c-b2)]">
                      <span className="text-[var(--c-text)] text-sm font-semibold whitespace-nowrap">{cat.category}</span>
                      <span className="text-[var(--c-muted)] text-xs font-mono truncate">{cat.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

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
                    className="label border border-[var(--c-b2)] px-4 py-2.5 text-[var(--c-muted)] hover:text-[var(--c-on-accent)] hover:bg-[var(--c-accent)] hover:border-[var(--c-accent)] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--c-b2)]">
                <Link href="/now" className="label hover:text-[var(--c-accent)] transition-colors">NOW →</Link>
                <Link href="/uses" className="label hover:text-[var(--c-accent)] transition-colors">USES →</Link>
                <Link href="/experience" className="label hover:text-[var(--c-accent)] transition-colors">EXPERIENCE →</Link>
                <Link href="/blog" className="label hover:text-[var(--c-accent)] transition-colors">BLOG →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

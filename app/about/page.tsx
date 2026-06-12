import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolumePlate from '@/components/fx/VolumePlate';
import ChapterNav from '@/components/fx/ChapterNav';
import { LineMask } from '@/components/fx/LineMask';
import { Odometer } from '@/components/fx/Odometer';
import { Reveal } from '@/components/fx/Reveal';
import { profile } from '@/data/profile';
import Portrait from './Portrait';

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

/* VOL.01 motif — valley contour: nested cross-section lines dipping to the
   valley floor (brief §5). Static inline SVG, 4% opacity via the plate slot. */
function ValleyContourMotif() {
  const contours = Array.from({ length: 7 }, (_, i) => {
    const edge = 26 + i * 16;
    const floor = 392 - i * 30;
    return `M0 ${edge} C 340 ${edge + 8}, 440 ${floor} 600 ${floor} C 760 ${floor}, 860 ${edge + 8}, 1200 ${edge}`;
  });
  return (
    <svg
      className="h-full w-full text-ink"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {contours.map((d) => (
        <path key={d} d={d} />
      ))}
      {/* valley-floor river thread */}
      <path d="M520 400 C 560 380, 640 376, 680 400" />
    </svg>
  );
}

export default function AboutPage() {
  const dropSource = profile.bio[0];
  const dropCap = dropSource.charAt(0);
  const dropRest = dropSource.slice(1);

  const socials = [
    { label: 'GitHub', href: profile.contacts.github, external: true },
    { label: 'LinkedIn', href: profile.contacts.linkedin, external: true },
    { label: 'LeetCode', href: profile.contacts.leetcode, external: true },
    { label: profile.contacts.email, href: `mailto:${profile.contacts.email}`, external: false },
  ];

  const related = [
    { label: 'NOW', href: '/now' },
    { label: 'USES', href: '/uses' },
    { label: 'EXPERIENCE', href: '/experience' },
    { label: 'BLOG', href: '/blog' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="min-h-screen bg-bg">
        <VolumePlate
          volume="VOL.01"
          title="ORIGIN"
          altitude="2,300M"
          motif={<ValleyContourMotif />}
        >
          <LineMask as="p" delay={0.2} className="font-voice text-epigraph text-dim">
            From the valley floor.
          </LineMask>
        </VolumePlate>

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
            {/* ── Portrait + field record + education ─────────────── */}
            <div className="space-y-8">
              <Portrait degree={profile.education.degree} />

              <Reveal delay={0.08}>
                <div className="border border-line-2">
                  <p className="label numeric border-b border-line-2 px-5 py-3">
                    FIELD RECORD
                  </p>
                  <dl className="divide-y divide-line-2">
                    {facts.map(({ label, value }) => (
                      <div key={label} className="px-5 py-3.5">
                        <dt className="label mb-1">{label}</dt>
                        <dd className="text-sm text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="border border-line-2 p-6">
                  <p className="label mb-4">Education</p>
                  <p className="text-sm font-medium text-ink">{profile.education.degree}</p>
                  <p className="mt-1 text-sm text-dim">{profile.education.institution}</p>
                  <p className="label numeric mt-3">{profile.education.period}</p>
                </div>
              </Reveal>
            </div>

            {/* ── Bio + stats + skills + links ─────────────────────── */}
            <div className="space-y-12">
              {/* Fraunces drop cap on the first paragraph */}
              <Reveal>
                <p
                  aria-label={dropSource}
                  className="max-w-[62ch] text-lg leading-[1.7] text-ink md:text-xl"
                >
                  <span
                    aria-hidden="true"
                    className="font-voice float-left mt-[0.06em] pr-[0.14em] text-[4.4em] leading-[0.78]"
                  >
                    {dropCap}
                  </span>
                  <span aria-hidden="true">{dropRest}</span>
                </p>
              </Reveal>

              <div className="space-y-5">
                <Reveal delay={0.06}>
                  <p className="max-w-[62ch] text-base leading-[1.7] text-dim">
                    {profile.bio[1]}
                  </p>
                </Reveal>
                {extraBio.map((para, i) => (
                  <Reveal key={para.slice(0, 24)} delay={0.06 + (i + 1) * 0.06}>
                    <p className="max-w-[62ch] text-base leading-[1.7] text-dim">{para}</p>
                  </Reveal>
                ))}
              </div>

              {/* Stats — odometer row, deterministic grid borders */}
              <div className="border-b border-r border-line-2">
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {profile.stats.map(({ value, label }, i) => (
                    <Reveal
                      key={label}
                      delay={i * 0.06}
                      className="border-l border-t border-line-2"
                    >
                      <div className="px-4 py-7 text-center">
                        <Odometer
                          value={value}
                          className="font-display text-3xl font-semibold text-accent md:text-4xl"
                        />
                        <p className="label mt-3">{label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Skills summary rows */}
              <div>
                <LineMask as="p" className="label mb-5">
                  What I work with
                </LineMask>
                <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {profile.skills.map((cat, i) => (
                    <Reveal key={cat.category} delay={i * 0.06}>
                      <div className="flex items-baseline gap-3 border-b border-line-2 py-2.5 transition-transform duration-200 ease-[var(--ease-micro)] hover:translate-x-2">
                        <span className="swipe whitespace-nowrap text-sm font-medium text-ink">
                          {cat.category}
                        </span>
                        <span className="numeric truncate font-mono text-xs text-muted">
                          {cat.items.join(', ')}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <Reveal delay={0.08}>
                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {socials.map(({ label, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className={`swipe group inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-muted ${
                          external ? 'uppercase' : ''
                        }`}
                      >
                        {label}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Cross-volume links */}
              <Reveal delay={0.14}>
                <ul className="flex flex-wrap gap-x-7 gap-y-3 border-t border-line-2 pt-6">
                  {related.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="swipe group label inline-flex items-center gap-2"
                      >
                        {label}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>

        <ChapterNav current="/about" />
      </main>
      <Footer />
    </>
  );
}

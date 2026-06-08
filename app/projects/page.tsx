import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Projects — SaaS, AI Research & Civic Tech from Nepal',
  description:
    'Saroj Prasad Mainali\'s projects: Devanagari OCR at 99.98% accuracy, Amarnepal civic data platform, Void Social multi-tenant inbox, Project Lakhey donor system, and Perceparator audio separation. 100+ shipped products.',
  keywords: [
    'Saroj Prasad Mainali projects', 'Nepal software projects', 'Devanagari OCR Nepal',
    'Amarnepal civic tech', 'Void Social SaaS', 'Project Lakhey NGO', 'Perceparator audio separation',
    'Nepal AI projects', 'multi-tenant SaaS Nepal', 'Next.js projects Nepal',
    'open source Nepal developer', 'VoidCU projects', 'SaaS architect Nepal',
  ],
  authors: [{ name: 'Saroj Prasad Mainali', url: 'https://voidcu.com' }],
  openGraph: {
    title: 'Projects — Saroj Prasad Mainali (VoidCU)',
    description: 'Civic tech, multi-tenant SaaS, AI research, and mobile apps. Things I have actually shipped and am proud of.',
    type: 'website',
    url: 'https://voidcu.com/projects',
    siteName: 'Saroj Prasad Mainali',
    images: [{ url: '/assets/me.jpeg', width: 1200, height: 630, alt: 'Saroj Prasad Mainali Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Saroj Prasad Mainali (VoidCU)',
    description: 'Devanagari OCR, Amarnepal, Void Social, Project Lakhey, and more. Real products from a Nepal-based engineer.',
    creator: '@VoidCU',
    images: ['/assets/me.jpeg'],
  },
  alternates: { canonical: 'https://voidcu.com/projects' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voidcu.com' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://voidcu.com/projects' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Saroj Prasad Mainali',
    description: 'Selected software projects by Saroj Prasad Mainali (VoidCU)',
    itemListElement: profile.featuredProjects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.desc,
      url: p.url ?? p.github ?? 'https://voidcu.com/projects',
    })),
  },
];

const statusStyle: Record<string, string> = {
  'LIVE': 'text-[var(--c-accent)]',
  'IN DEV': 'text-[var(--c-dim)]',
  'RESEARCH': 'text-[var(--c-muted)]',
};

const domains = [
  { title: 'SaaS & Web Platforms', desc: 'Multi-tenant systems, RBAC, dashboards, CRMs, and Jamstack sites that ship and stay up.' },
  { title: 'AI & Machine Learning', desc: 'CNNs, transformers, NLP, and culling pipelines. Research that turns into something a person can use.' },
  { title: 'Mobile Apps', desc: 'Flutter and React Native apps for clients who want two platforms on one budget.' },
  { title: 'Automation & RPA', desc: 'Playwright bots and scripted workflows that removed roughly 1,500 hours of manual work a year.' },
  { title: 'Climate & Hydrology', desc: 'WEAP scenario modeling, SWAT calibration, and CMIP6 bias correction for NGO water studies.' },
  { title: 'DevOps & Infra', desc: 'Docker, Kubernetes, and CI/CD pipelines, run on real infrastructure in a place where the power goes out.' },
];

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-14 bg-[var(--c-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

          <div className="flex items-baseline justify-between mb-10 md:mb-12 pb-5 border-b border-[var(--c-b2)]">
            <h1 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
              PROJECTS
            </h1>
            <span className="label">04 / 07</span>
          </div>

          <p className="text-[var(--c-dim)] text-sm max-w-2xl leading-relaxed mb-12">
            A few things I have built that I am happy to talk about. Most client work is under NDA,
            so this is the public slice: civic tech, multi-tenant SaaS, and a couple of AI research
            projects that I did mostly because I could not stop thinking about them.
          </p>

          <div className="space-y-0 border-t border-[var(--c-b2)]">
            {profile.featuredProjects.map(({ index, name, tagline, desc, tech, url, github, status }) => (
              <div
                key={name}
                className="group border-b border-[var(--c-b2)] py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-5 hover:bg-[rgba(74,222,128,0.06)] transition-colors"
              >
                <span className="font-mono text-[var(--c-muted)] text-sm pt-1 w-8 flex-shrink-0">{index}</span>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-heading font-black text-[var(--c-text)] text-xl md:text-2xl tracking-tight group-hover:text-[var(--c-accent)] transition-colors">
                      {name}
                    </h2>
                    <span className={`font-mono text-xs tracking-widest uppercase ${statusStyle[status] ?? ''}`}>
                      ● {status}
                    </span>
                  </div>

                  <p className="text-[var(--c-muted)] text-xs font-mono tracking-wider">{tagline}</p>
                  <p className="text-[var(--c-dim)] text-sm leading-relaxed max-w-2xl">{desc}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="border border-[var(--c-b2)] px-2.5 py-1 text-[var(--c-muted)] font-mono text-[10px] tracking-wider uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 items-start lg:items-end pt-1">
                  {github && (
                    <Link href={github} target="_blank" rel="noopener noreferrer"
                      className="label text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors">
                      GITHUB →
                    </Link>
                  )}
                  {url && (
                    <Link href={url} target="_blank" rel="noopener noreferrer"
                      className="label text-[var(--c-accent)] hover:text-[var(--c-text)] transition-colors">
                      LIVE →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="flex items-baseline justify-between mb-10 pb-5 border-b border-[var(--c-b2)]">
              <h2 className="font-heading font-black text-[var(--c-text)] text-2xl md:text-3xl tracking-tight">
                WORK DOMAINS
              </h2>
              <span className="label">{domains.length} areas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[var(--c-b2)]">
              {domains.map((d) => (
                <div
                  key={d.title}
                  className="group p-6 border-b border-r border-[var(--c-b2)] hover:border-[var(--c-accent)] hover:bg-[var(--c-accent)] transition-colors last:border-b-0"
                >
                  <h3 className="font-heading font-bold text-[var(--c-text)] group-hover:text-[var(--c-on-accent)] text-base mb-3 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-[var(--c-dim)] group-hover:text-[var(--c-on-accent)] text-sm leading-relaxed transition-colors">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
              All 80+ Repos on GitHub →
            </Link>
            <Link href="/open-source" className="label hover:text-[var(--c-accent)] transition-colors">
              OPEN SOURCE →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

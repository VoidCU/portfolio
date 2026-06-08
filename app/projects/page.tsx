import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects: Amarnepal civic data platform, Void Social multi-tenant inbox, Project Lakhey donor system, Devanagari OCR at 99.98%, and Perceparator audio separation.',
  openGraph: {
    title: 'Projects · Saroj Prasad Mainali',
    description:
      'Civic tech, multi-tenant SaaS, and AI research. Things I have actually shipped.',
    type: 'website',
    url: 'https://voidcu.com/projects',
  },
  alternates: { canonical: 'https://voidcu.com/projects' },
};

const statusStyle: Record<string, string> = {
  'LIVE': 'text-[#4ade80]',
  'IN DEV': 'text-[#86efac]',
  'RESEARCH': 'text-[#4d7c5a]',
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
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              PROJECTS
            </h1>
            <span className="label">04 / 07</span>
          </div>

          {/* Intro */}
          <p className="text-[#86efac] text-sm max-w-2xl leading-relaxed mb-12">
            A few things I have built that I am happy to talk about. Most client work is under NDA,
            so this is the public slice: civic tech, multi-tenant SaaS, and a couple of AI research
            projects that I did mostly because I could not stop thinking about them.
          </p>

          {/* Project list */}
          <div className="space-y-0 border-t border-[rgba(74,222,128,0.08)]">
            {profile.featuredProjects.map(({ index, name, tagline, desc, tech, url, github, status }) => (
              <div
                key={name}
                className="group border-b border-[rgba(74,222,128,0.08)] py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-5 hover:bg-[rgba(74,222,128,0.03)] transition-colors"
              >
                {/* Index */}
                <span className="font-mono-custom text-[#4d7c5a] text-sm pt-1 w-8 flex-shrink-0">{index}</span>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-heading font-black text-[#e8fdf0] text-2xl tracking-tight group-hover:text-[#4ade80] transition-colors">
                      {name}
                    </h2>
                    <span className={`font-mono-custom text-xs tracking-widest uppercase ${statusStyle[status] ?? ''}`}>
                      ● {status}
                    </span>
                  </div>

                  <p className="text-[#4d7c5a] text-xs font-mono-custom tracking-wider">{tagline}</p>
                  <p className="text-[#86efac] text-sm leading-relaxed max-w-2xl">{desc}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="border border-[rgba(74,222,128,0.08)] px-2.5 py-1 text-[#4d7c5a] font-mono-custom text-[10px] tracking-wider uppercase group-hover:border-[rgba(74,222,128,0.14)] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 items-start lg:items-end justify-start pt-1">
                  {github && (
                    <Link
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-[#4d7c5a] hover:text-[#4ade80] transition-colors"
                    >
                      GITHUB →
                    </Link>
                  )}
                  {url && (
                    <Link
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-[#4ade80] hover:text-[#e8fdf0] transition-colors"
                    >
                      LIVE SITE →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Work domains */}
          <div className="mt-20">
            <div className="flex items-baseline justify-between mb-10 pb-5 border-b border-[rgba(74,222,128,0.08)]">
              <h2 className="font-heading font-black text-[#e8fdf0] text-2xl md:text-3xl tracking-tight">
                WORK DOMAINS
              </h2>
              <span className="label">{domains.length} areas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(74,222,128,0.08)]">
              {domains.map((d, i) => (
                <div
                  key={d.title}
                  className={`group p-6 border border-[rgba(74,222,128,0.08)] hover:border-[#4ade80] hover:bg-[#4ade80] transition-colors
                    ${i % 3 !== 2 ? 'lg:border-r-0' : ''}`}
                >
                  <h3 className="font-heading font-bold text-[#e8fdf0] group-hover:text-[#080d08] text-base mb-3 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-[#86efac] group-hover:text-[#0d140d] text-sm leading-relaxed transition-colors">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href={profile.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              All 80+ Repos on GitHub →
            </Link>
            <Link href="/open-source" className="label hover:text-[#4ade80] transition-colors">
              OPEN SOURCE →
            </Link>
            <span className="label">Public &amp; archived projects</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

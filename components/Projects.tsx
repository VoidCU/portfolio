import Link from 'next/link';
import { profile } from '@/data/profile';

const statusStyle: Record<string, string> = {
  'LIVE':     'text-[#4ade80]',
  'IN DEV':   'text-[#4d7c5a]',
  'RESEARCH': 'text-[#4d7c5a]',
};

export default function Projects() {
  return (
    <section id="projects" className="bg-[#080d08] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            PROJECTS
          </h2>
          <span className="label">04 / 07</span>
        </div>

        {/* Project list */}
        <div className="space-y-0 border-t border-[rgba(74,222,128,0.08)]">
          {profile.featuredProjects.map(({ index, name, tagline, desc, tech, url, github, status }) => (
            <div
              key={name}
              className="group border-b border-[rgba(74,222,128,0.08)] py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-5 hover:bg-[rgba(74,222,128,0.02)] transition-colors"
            >
              {/* Index */}
              <span className="font-mono text-[#4d7c5a] text-sm pt-1 w-8 flex-shrink-0">{index}</span>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-heading font-black text-[#e8fdf0] text-2xl tracking-tight group-hover:text-[#4ade80] transition-colors">
                    {name}
                  </h3>
                  <span className={`font-mono text-xs tracking-widest uppercase ${statusStyle[status] ?? ''}`}>
                    {status}
                  </span>
                </div>

                <p className="text-[#4d7c5a] text-xs font-mono tracking-wider">{tagline}</p>

                <p className="text-[#86efac] text-sm leading-relaxed max-w-2xl">{desc}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {tech.map(t => (
                    <span
                      key={t}
                      className="border border-[rgba(74,222,128,0.1)] px-2.5 py-1 text-[#4d7c5a] font-mono text-[10px] tracking-wider uppercase group-hover:border-[rgba(74,222,128,0.3)] group-hover:text-[#86efac] transition-colors"
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
                    className="label text-[#4d7c5a] hover:text-[#4ade80] transition-colors flex items-center gap-2"
                  >
                    GITHUB →
                  </Link>
                )}
                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-[#4ade80] hover:text-[#e8fdf0] transition-colors flex items-center gap-2"
                  >
                    LIVE SITE →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-6">
          <Link
            href={profile.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs"
          >
            All 80+ Repos on GitHub →
          </Link>
          <span className="label">Public and archived projects</span>
        </div>
      </div>
    </section>
  );
}

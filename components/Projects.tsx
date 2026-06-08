import Link from 'next/link';
import { profile } from '@/data/profile';

const statusStyle: Record<string, string> = {
  'LIVE':     'text-[var(--c-accent)]',
  'IN DEV':   'text-[var(--c-muted)]',
  'RESEARCH': 'text-[var(--c-muted)]',
};

export default function Projects() {
  return (
    <section id="projects" className="bg-[var(--c-bg)] border-t border-[var(--c-b1)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[var(--c-b2)]">
          <h2 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
            PROJECTS
          </h2>
          <span className="label">04 / 07</span>
        </div>

        {/* Project list */}
        <div className="space-y-0 border-t border-[var(--c-b2)]">
          {profile.featuredProjects.map(({ index, name, tagline, desc, tech, url, github, status }) => (
            <div
              key={name}
              className="group border-b border-[var(--c-b2)] py-8 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-5 hover:bg-[rgba(74,222,128,0.05)] transition-colors"
            >
              {/* Index */}
              <span className="font-mono text-[var(--c-muted)] text-sm pt-1 w-8 flex-shrink-0">{index}</span>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-heading font-black text-[var(--c-text)] text-2xl tracking-tight group-hover:text-[var(--c-accent)] transition-colors">
                    {name}
                  </h3>
                  <span className={`font-mono text-xs tracking-widest uppercase ${statusStyle[status] ?? ''}`}>
                    {status}
                  </span>
                </div>

                <p className="text-[var(--c-muted)] text-xs font-mono tracking-wider">{tagline}</p>

                <p className="text-[var(--c-dim)] text-sm leading-relaxed max-w-2xl">{desc}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {tech.map(t => (
                    <span
                      key={t}
                      className="border border-[rgba(74,222,128,0.1)] px-2.5 py-1 text-[var(--c-muted)] font-mono text-[10px] tracking-wider uppercase group-hover:border-[var(--c-b4)] group-hover:text-[var(--c-dim)] transition-colors"
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
                    className="label text-[var(--c-muted)] hover:text-[var(--c-accent)] transition-colors flex items-center gap-2"
                  >
                    GITHUB →
                  </Link>
                )}
                {url && (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-[var(--c-accent)] hover:text-[var(--c-text)] transition-colors flex items-center gap-2"
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

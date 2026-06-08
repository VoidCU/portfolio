import Link from 'next/link';
import { profile } from '@/data/profile';

export default function Clients() {
  return (
    <section id="clients" className="bg-[var(--c-surface)] border-t border-[var(--c-b1)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[var(--c-b2)]">
          <h2 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
            CLIENTS
          </h2>
          <span className="label">05 / 07</span>
        </div>

        {/* Intro line */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <p className="text-[var(--c-dim)] text-sm max-w-xl leading-relaxed">
            Companies and organisations I have delivered software for, spanning EdTech, HealthTech, AgriTech, government, real estate, events, and more.
          </p>
          <div className="text-right">
            <p className="font-heading font-black text-[var(--c-accent)] text-4xl">19+</p>
            <p className="label mt-1">Companies</p>
          </div>
        </div>

        {/* Client grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[var(--c-b2)]">
          {profile.clients.map(({ index, name, category, url }, i) => {
            const isLastInRow3 = (i + 1) % 3 === 0;
            const isLastInRow2 = (i + 1) % 2 === 0;
            const content = (
              <div
                className={`group p-5 border-[var(--c-b2)] hover:bg-[var(--c-accent)] transition-colors duration-150 cursor-pointer
                  ${!isLastInRow3 ? 'lg:border-r' : ''}
                  ${!isLastInRow2 ? 'sm:border-r lg:border-r-0' : 'sm:border-r-0'}
                  border-b`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="font-mono text-[var(--c-muted)] group-hover:text-[var(--c-accent)] text-[10px] tracking-wider">{index}</p>
                    <h3 className="font-heading font-bold text-[var(--c-text)] group-hover:text-[var(--c-on-accent)] text-base leading-snug transition-colors">
                      {name}
                    </h3>
                    <p className="label text-[var(--c-muted)] group-hover:text-[var(--c-accent)] transition-colors">
                      {category}
                    </p>
                  </div>
                  {url && (
                    <span className="label text-[var(--c-muted)] group-hover:text-[var(--c-on-accent)] transition-colors text-[9px] mt-0.5 whitespace-nowrap">
                      ↗
                    </span>
                  )}
                </div>
              </div>
            );

            return url ? (
              <Link
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </Link>
            ) : (
              <div key={name}>{content}</div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 flex items-center gap-4">
          <div className="divider flex-1" />
          <p className="label whitespace-nowrap text-[var(--c-ghost)]">
            Most projects under NDA. Case studies available on request.
          </p>
          <div className="divider flex-1" />
        </div>
      </div>
    </section>
  );
}

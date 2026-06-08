import { profile } from '@/data/profile';

export default function Achievements() {
  const competitive = profile.achievements.filter(a => a.type === 'competitive');
  const certs = profile.achievements.filter(a => a.type === 'cert');

  return (
    <section id="achievements" className="bg-[var(--c-bg)] border-t border-[var(--c-b1)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[var(--c-b2)]">
          <h2 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
            ACHIEVEMENTS
          </h2>
          <span className="label">06 / 07</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 border border-[var(--c-b2)]">
          {/* Competitive highlight */}
          {competitive.map(ach => (
            <div
              key={ach.title}
              className="p-8 lg:border-r border-b lg:border-b-0 border-[var(--c-b2)] flex flex-col justify-between"
            >
              <div>
                <p className="label mb-6">Competitive Programming</p>
                <h3 className="font-heading font-black text-[var(--c-text)] text-3xl leading-tight mb-3">
                  {ach.title}
                </h3>
                <p className="font-mono text-[var(--c-dim)] text-sm">{ach.detail}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--c-b2)]">
                <p className="font-heading font-black text-[var(--c-accent)] text-6xl">3%</p>
                <p className="label mt-2">Global ranking</p>
              </div>
            </div>
          ))}

          {/* Certifications */}
          <div className="divide-y divide-[var(--c-b2)]">
            <div className="p-5 pb-4">
              <p className="label">Certifications</p>
            </div>
            {certs.map(({ title, detail }) => (
              <div
                key={title}
                className="group px-5 py-4 flex items-start justify-between gap-6 hover:bg-[var(--c-b1)] transition-colors"
              >
                <h4 className="text-[var(--c-dim)] group-hover:text-[var(--c-text)] text-sm font-semibold transition-colors leading-snug">
                  {title}
                </h4>
                <p className="label whitespace-nowrap text-right">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

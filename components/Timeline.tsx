import { profile } from '@/data/profile';

export default function Timeline() {
  return (
    <section id="experience" className="bg-[#0d140d] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            EXPERIENCE
          </h2>
          <span className="label">03 / 07</span>
        </div>

        {/* Timeline list */}
        <div className="space-y-0">
          {profile.timeline.map(({ index, role, org, period, items }, i) => (
            <div
              key={index}
              className={`group border-b border-[rgba(74,222,128,0.08)] ${i === 0 ? 'border-t' : ''}`}
            >
              <div className="py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-3 items-start">

                {/* Index */}
                <span className="font-mono text-[#4d7c5a] text-sm pt-0.5 w-8 flex-shrink-0">
                  {index}
                </span>

                {/* Role + org */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-heading font-bold text-[#e8fdf0] text-xl group-hover:text-[#4ade80] transition-colors">
                      {role}
                    </h3>
                    <span className="text-[#4d7c5a] font-mono text-xs tracking-wider uppercase">
                      @ {org}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-[#4d7c5a] text-sm">
                        <span className="mt-1.5 w-1 h-1 bg-[rgba(74,222,128,0.2)] flex-shrink-0" />
                        <span className="group-hover:text-[#86efac] transition-colors leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Period */}
                <span className="label md:text-right pt-1 whitespace-nowrap">
                  {period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

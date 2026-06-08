import { profile } from '@/data/profile';

export default function Competencies() {
  return (
    <section id="skills" className="bg-[#080d08] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            SKILLS
          </h2>
          <span className="label">02 / 07</span>
        </div>

        {/* Magazine-style skills table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(74,222,128,0.08)]">
          {profile.skills.map((cat, idx) => (
            <div
              key={cat.category}
              className={`p-6 border-[rgba(74,222,128,0.08)] ${
                idx % 3 !== 2 ? 'lg:border-r' : ''
              } ${
                idx % 2 !== 1 ? 'md:border-r lg:border-r-0' : 'md:border-r-0'
              } ${
                idx < profile.skills.length - 3 ? 'lg:border-b' : ''
              } ${
                idx < profile.skills.length - 2 ? 'md:border-b' : ''
              } ${
                idx < profile.skills.length - 1 ? 'border-b md:border-b-0' : ''
              }`}
            >
              <p className="label mb-5">{cat.category}</p>
              <ul className="space-y-2.5">
                {cat.items.map(skill => (
                  <li key={skill} className="group flex items-center gap-3">
                    <span className="w-1 h-px bg-[rgba(74,222,128,0.2)] group-hover:w-4 transition-all duration-200" />
                    <span className="text-[#86efac] group-hover:text-[#e8fdf0] text-sm transition-colors duration-200">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex items-center gap-4">
          <div className="divider flex-1" />
          <p className="label whitespace-nowrap">
            5 years · full-stack to low-level
          </p>
          <div className="divider flex-1" />
        </div>
      </div>
    </section>
  );
}

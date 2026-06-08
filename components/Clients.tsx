import Link from 'next/link';
import { profile } from '@/data/profile';

export default function Clients() {
  return (
    <section id="clients" className="bg-[#0d140d] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            CLIENTS
          </h2>
          <span className="label">05 / 07</span>
        </div>

        {/* Intro line */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <p className="text-[#86efac] text-sm max-w-xl leading-relaxed">
            Companies and organisations I have delivered software for, spanning EdTech, HealthTech, AgriTech, government, real estate, events, and more.
          </p>
          <div className="text-right">
            <p className="font-heading font-black text-[#4ade80] text-4xl">19+</p>
            <p className="label mt-1">Companies</p>
          </div>
        </div>

        {/* Client grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[rgba(74,222,128,0.08)]">
          {profile.clients.map(({ index, name, category, url }, i) => {
            const isLastInRow3 = (i + 1) % 3 === 0;
            const isLastInRow2 = (i + 1) % 2 === 0;
            const content = (
              <div
                className={`group p-5 border-[rgba(74,222,128,0.08)] hover:bg-[#4ade80] transition-colors duration-150 cursor-pointer
                  ${!isLastInRow3 ? 'lg:border-r' : ''}
                  ${!isLastInRow2 ? 'sm:border-r lg:border-r-0' : 'sm:border-r-0'}
                  border-b`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="font-mono text-[#4d7c5a] group-hover:text-[#166534] text-[10px] tracking-wider">{index}</p>
                    <h3 className="font-heading font-bold text-[#e8fdf0] group-hover:text-[#080d08] text-base leading-snug transition-colors">
                      {name}
                    </h3>
                    <p className="label text-[#4d7c5a] group-hover:text-[#166534] transition-colors">
                      {category}
                    </p>
                  </div>
                  {url && (
                    <span className="label text-[#4d7c5a] group-hover:text-[#080d08] transition-colors text-[9px] mt-0.5 whitespace-nowrap">
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
          <p className="label whitespace-nowrap text-[#1f3a28]">
            Most projects under NDA. Case studies available on request.
          </p>
          <div className="divider flex-1" />
        </div>
      </div>
    </section>
  );
}

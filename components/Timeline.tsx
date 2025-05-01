// src/components/Timeline.tsx
import { profile } from '@/data/profile';

export default function Timeline() {
  return (
    <section id="experience" className="py-16 bg-[#111827]">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-12">
          Career Timeline
        </h2>
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1 bg-teal-600/40 h-full" />
          </div>

          <ul className="space-y-12">
            {profile.timeline.map(({ role, org, period, items }, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li
                  key={org}
                  className={`relative flex w-full ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Connector dot */}
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full shadow-md"></div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-1/2 bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition ${
                      isLeft ? 'mr-auto md:mr-8' : 'ml-auto md:ml-8'
                    }`}
                  >
                    <span className="inline-block px-3 py-1 bg-teal-400 text-black rounded-full text-sm font-bold mb-2">
                      {period}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {role} <span className="text-teal-400">@ {org}</span>
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-200">
                      {items.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

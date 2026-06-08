import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Lead Developer at Neuron Nest, CTO at Elytra Solutions, Technical Head at KS Photography Station, and freelance full-stack consultant. 5+ years across SaaS, AI, and automation.',
  openGraph: {
    title: 'Experience · Saroj Prasad Mainali',
    description: 'Lead Developer, CTO, and Technical Head roles across Kathmandu.',
    type: 'website',
    url: 'https://voidcu.com/experience',
  },
  alternates: { canonical: 'https://voidcu.com/experience' },
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 bg-[#080d08] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
            <h1 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
              EXPERIENCE
            </h1>
            <span className="label">03 / 07</span>
          </div>

          {/* Intro */}
          <p className="text-[#86efac] text-sm max-w-2xl leading-relaxed mb-12">
            Five years of overlapping roles, because the market here rewards being useful in more
            than one way. Lead, CTO, technical head, freelancer, often all in the same week.
          </p>

          {/* Timeline */}
          <div className="space-y-0">
            {profile.timeline.map(({ index, role, org, period, items }, i) => (
              <div
                key={index}
                className={`group border-b border-[rgba(74,222,128,0.08)] ${i === 0 ? 'border-t' : ''}`}
              >
                <div className="py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-3 items-start">

                  {/* Index */}
                  <span className="font-mono-custom text-[#4d7c5a] text-sm pt-0.5 w-8 flex-shrink-0">
                    {index}
                  </span>

                  {/* Role + org */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="font-heading font-bold text-[#e8fdf0] text-xl group-hover:text-[#4ade80] transition-colors">
                        {role}
                      </h2>
                      <span className="text-[#4d7c5a] font-mono-custom text-xs tracking-wider uppercase">
                        @ {org}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="mt-4 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#86efac] text-sm">
                          <span className="mt-1.5 w-1 h-1 bg-[#4ade80] flex-shrink-0" />
                          <span className="group-hover:text-[#e8fdf0] transition-colors leading-relaxed">
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

          {/* Education block */}
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-8 pb-5 border-b border-[rgba(74,222,128,0.08)]">
              <h2 className="font-heading font-black text-[#e8fdf0] text-2xl md:text-3xl tracking-tight">
                EDUCATION
              </h2>
            </div>
            <div className="border border-[rgba(74,222,128,0.08)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[#e8fdf0] font-semibold text-base">{profile.education.degree}</p>
                <p className="text-[#86efac] text-sm">{profile.education.institution}</p>
              </div>
              <span className="label whitespace-nowrap">{profile.education.period}</span>
            </div>
          </div>

          {/* Cross links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/clients" className="label hover:text-[#4ade80] transition-colors">WHO I WORKED WITH →</Link>
            <Link href="/achievements" className="label hover:text-[#4ade80] transition-colors">ACHIEVEMENTS →</Link>
            <Link href="/assets/pdfs/SarojResume.pdf" target="_blank" className="label hover:text-[#4ade80] transition-colors">RESUME →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

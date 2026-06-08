import Image from 'next/image';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="bg-[#0d140d] border-t border-[rgba(74,222,128,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[rgba(74,222,128,0.08)]">
          <h2 className="font-heading font-black text-[#e8fdf0] text-4xl md:text-5xl tracking-tight">
            ABOUT
          </h2>
          <span className="label">01 / 07</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Photo + education */}
          <div className="space-y-6">
            <div className="relative aspect-square w-full max-w-xs">
              {/* Sharp border frame */}
              <div className="absolute inset-0 border border-[rgba(74,222,128,0.22)]" />
              <div className="absolute -bottom-2 -right-2 border border-[rgba(74,222,128,0.08)] w-full h-full" />
              <Image
                src="/assets/me.jpeg"
                alt="Saroj Prasad Mainali"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Education */}
            <div className="border border-[rgba(74,222,128,0.08)] p-5 space-y-1">
              <p className="label mb-3">Education</p>
              <p className="text-[#e8fdf0] font-semibold text-sm">{profile.education.degree}</p>
              <p className="text-[#86efac] text-xs">{profile.education.institution}</p>
              <p className="text-[#4d7c5a] text-xs font-mono">{profile.education.period}</p>
            </div>
          </div>

          {/* Bio + stats */}
          <div className="space-y-10">
            <div className="space-y-5">
              {profile.bio.map((para, i) => (
                <p key={i} className="text-[#86efac] leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[rgba(74,222,128,0.08)]">
              {profile.stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`p-5 text-center ${i < profile.stats.length - 1 ? 'border-r border-[rgba(74,222,128,0.08)]' : ''}`}
                >
                  <p className="font-heading font-black text-[#4ade80] text-3xl">{value}</p>
                  <p className="label mt-2">{label}</p>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'GitHub', href: profile.contacts.github },
                { label: 'LinkedIn', href: profile.contacts.linkedin },
                { label: 'LeetCode', href: profile.contacts.leetcode },
                { label: `mailto:${profile.contacts.email}`, href: `mailto:${profile.contacts.email}` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="label border border-[rgba(74,222,128,0.14)] px-4 py-2.5 text-[#4d7c5a] hover:text-[#080d08] hover:bg-[#4ade80] hover:border-[#4ade80] transition-all"
                >
                  {label.startsWith('mailto:') ? profile.contacts.email : label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

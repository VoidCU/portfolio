import Image from 'next/image';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="bg-[var(--c-surface)] border-t border-[var(--c-b1)]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-12 pb-5 border-b border-[var(--c-b2)]">
          <h2 className="font-heading font-black text-[var(--c-text)] text-4xl md:text-5xl tracking-tight">
            ABOUT
          </h2>
          <span className="label">01 / 07</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          {/* Photo + education */}
          <div className="space-y-6">
            <div className="relative w-full max-w-xs">
              {/* Sharp border frame */}
              <div className="absolute inset-0 border border-[var(--c-b4)]" />
              <div className="absolute -bottom-2 -right-2 border border-[var(--c-b2)] w-full h-full" />
              <Image
                src="/assets/me.jpeg"
                alt="Saroj Prasad Mainali"
                width={0}
                height={0}
                sizes="(max-width: 320px) 100vw, 320px"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                unoptimized
              />
            </div>

            {/* Education */}
            <div className="border border-[var(--c-b2)] p-5 space-y-1">
              <p className="label mb-3">Education</p>
              <p className="text-[var(--c-text)] font-semibold text-sm">{profile.education.degree}</p>
              <p className="text-[var(--c-dim)] text-xs">{profile.education.institution}</p>
              <p className="text-[var(--c-muted)] text-xs font-mono">{profile.education.period}</p>
            </div>
          </div>

          {/* Bio + stats */}
          <div className="space-y-10">
            <div className="space-y-5">
              {profile.bio.map((para, i) => (
                <p key={i} className="text-[var(--c-dim)] leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[var(--c-b2)]">
              {profile.stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`p-5 text-center ${i < profile.stats.length - 1 ? 'border-r border-[var(--c-b2)]' : ''}`}
                >
                  <p className="font-heading font-black text-[var(--c-accent)] text-3xl">{value}</p>
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
                  className="label border border-[var(--c-b3)] px-4 py-2.5 text-[var(--c-muted)] hover:text-[var(--c-on-accent)] hover:bg-[var(--c-accent)] hover:border-[var(--c-accent)] transition-all"
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

'use client';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import { profile } from '@/data/profile';

const techStack = ['Next.js', 'FastAPI', 'TypeScript', 'Python', 'Docker', 'PostgreSQL', 'Flutter', 'TensorFlow', 'PyTorch', 'NestJS', 'Kubernetes', 'React'];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[var(--c-bg)] flex flex-col justify-between pt-14 overflow-hidden"
    >
      {/* Top bar */}
      <div className="w-full border-b border-[var(--c-b1)]" />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-16">

        {/* Status line */}
        <div className="flex items-center gap-3 mb-10 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-[var(--c-accent)] opacity-80" />
          <span className="label">Available for projects &amp; collaborations</span>
          <span className="label ml-auto">{profile.contacts.location}</span>
        </div>

        {/* Name — massive editorial */}
        <div className="animate-fade-up">
          <h1
            className="font-heading font-black text-[var(--c-text)] leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          >
            SAROJ
          </h1>
          <h1
            className="font-heading font-black text-[var(--c-accent)] leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          >
            PRASAD
          </h1>
          <h1
            className="font-heading font-black text-[var(--c-text)] leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)' }}
          >
            MAINALI
          </h1>
        </div>

        {/* Divider */}
        <div className="divider my-6 animate-fade-in delay-200" />

        {/* Role + Location row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up delay-300">
          <div className="text-[var(--c-dim)] font-mono text-sm tracking-wide flex items-center gap-3">
            <span className="text-[var(--c-muted)]">./</span>
            <Typewriter
              options={{
                strings: [
                  'Full-Stack Engineer',
                  'AI & ML Builder',
                  'SaaS Architect',
                  'Technical Lead',
                ],
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 35,
                wrapperClassName: 'text-[var(--c-text)] font-semibold',
                cursorClassName: 'text-[var(--c-accent)]',
              }}
            />
          </div>
          <div className="label">
            B.E. Computer Engineering · Tribhuvan University
          </div>
        </div>
      </div>

      {/* CTA + stats bar */}
      <div className="border-t border-[var(--c-b2)] animate-fade-up delay-400">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center gap-4 justify-between">
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/projects" className="btn-primary">
              View Work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {profile.stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-black text-[var(--c-accent)] text-lg leading-none">{value}</p>
                <p className="label mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="border-t border-[var(--c-b1)] overflow-hidden py-2.5 bg-[var(--c-surface)]">
        <div className="animate-ticker whitespace-nowrap w-max flex items-center gap-0">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8">
              <span className="label text-[var(--c-ghost)]">{t}</span>
              <span className="w-1 h-1 bg-[var(--c-ghost)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

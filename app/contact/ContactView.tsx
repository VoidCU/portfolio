'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { profile } from '@/data/profile';
import ContactForm from '@/components/ContactForm';
import { LineMask } from '@/components/fx/LineMask';
import { Reveal } from '@/components/fx/Reveal';
import { Scramble } from '@/components/fx/Scramble';
import { useKtmTime, useReducedMotionSafe } from '@/components/fx/hooks';

const channels = [
  { label: 'GitHub', value: '@VoidCU', href: profile.contacts.github },
  { label: 'LinkedIn', value: 'saroj-prasad-mainali', href: profile.contacts.linkedin },
  { label: 'LeetCode', value: '@VoidCU', href: profile.contacts.leetcode },
];

/** Email rail — COPY → COPIED scramble swap on click (BRIEF §4.10 language). */
function EmailRow() {
  const [copied, setCopied] = useState(false);
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(profile.contacts.email);
    } catch {
      /* clipboard unavailable — the mailto link remains the fallback */
    }
    setArmed(true);
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex items-center justify-between gap-4 border-y border-line-2 py-4">
      <div className="min-w-0">
        <p className="label">Email</p>
        <Link
          href={`mailto:${profile.contacts.email}`}
          className="swipe mt-1 inline-block max-w-full truncate font-mono text-sm text-ink"
        >
          {profile.contacts.email}
        </Link>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="label shrink-0 cursor-pointer border border-line-3 px-3 py-2 transition-transform duration-200 hover:-translate-y-0.5"
        style={{ transitionTimingFunction: 'var(--ease-micro)' }}
      >
        <Scramble
          text={copied ? 'COPIED' : 'COPY'}
          play={armed}
          className={copied ? 'text-accent' : undefined}
        />
      </button>
    </div>
  );
}

/**
 * VOL.11 TRANSMISSION — channel rails + relay form.
 * Mirrors the homepage CH.07 language (components/Contact.tsx):
 * scramble copy row, arrow-slide socials, mono location/time readouts.
 */
export default function ContactView() {
  const time = useKtmTime();
  const reduced = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement>(null);
  /* CSS drives the drift on the compositor; play-state pauses it offscreen
     (same fix as components/Contact.tsx — framer infinite keyframes ran
     main-thread style writes for the whole session). */
  const auroraInView = useInView(rootRef);

  return (
    <div ref={rootRef} className="relative">
      {/* Aurora — intensified for the transmission volume only (≤20% dark),
          pre-softened radial gradients, transform-only drift. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-6 -inset-y-16 overflow-hidden [[data-theme=light]_&]:opacity-60 ${auroraInView ? '' : 'cv-aurora-paused'}`}
      >
        <div className="cv-aurora-a absolute -left-[15%] -top-[20%] h-[42rem] w-[42rem] rounded-full bg-radial from-accent/20 via-accent/5 via-40% to-transparent to-70%" />
        <div className="cv-aurora-b absolute -bottom-[25%] -right-[12%] h-[48rem] w-[48rem] rounded-full bg-radial from-accent2/15 via-accent2/5 via-40% to-transparent to-70%" />
      </div>
      <style>{`
        .cv-aurora-a { animation: cv-drift-a 32s ease-in-out infinite; will-change: transform; }
        .cv-aurora-b { animation: cv-drift-b 40s ease-in-out infinite; will-change: transform; }
        .cv-aurora-paused .cv-aurora-a, .cv-aurora-paused .cv-aurora-b { animation-play-state: paused; }
        @keyframes cv-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(60px, -40px, 0) scale(1.12); }
          66% { transform: translate3d(-30px, 30px, 0) scale(0.96); }
        }
        @keyframes cv-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-50px, 30px, 0) scale(0.94); }
          66% { transform: translate3d(40px, -50px, 0) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cv-aurora-a, .cv-aurora-b { animation: none; }
        }
      `}</style>

      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Transmission-channel rails */}
        <div className="space-y-8 lg:col-span-5">
          <div>
            <LineMask as="p" className="label numeric mb-6">
              RX/11 — DIRECT CHANNELS · 27.7172°N 85.3240°E
            </LineMask>
            <LineMask as="h2" delay={0.06} className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Let us build something.
            </LineMask>
            <Reveal delay={0.12}>
              <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
                Open to freelance work, full-time roles, and collaborations that are actually
                interesting. I read everything and respond within a day, usually faster.
              </p>
            </Reveal>
          </div>

          {/* Availability beacon */}
          <Reveal delay={0.18}>
            <div className="border border-line-2 p-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-75" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="label">Available</span>
              </div>
              <p className="mt-1.5 text-xs text-muted">
                Taking new projects and exploring full-time opportunities.
              </p>
            </div>
          </Reveal>

          {/* Email — copy to clipboard */}
          <Reveal delay={0.24}>
            <EmailRow />
          </Reveal>

          {/* Socials — arrow-slide + swipe */}
          <Reveal delay={0.3}>
            <div className="divide-y divide-line-2 border-b border-line-2">
              {channels.map(({ label, value, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-3.5 transition-transform duration-200 hover:translate-x-2"
                  style={{ transitionTimingFunction: 'var(--ease-micro)' }}
                >
                  <span className="label">{label}</span>
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="swipe truncate font-mono text-xs text-dim">{value}</span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-muted transition-transform duration-200 group-hover:translate-x-1.5"
                      style={{ transitionTimingFunction: 'var(--ease-micro)' }}
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Location + KTM time — mono instrument readouts */}
          <Reveal delay={0.36}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="label">Location</p>
                <p className="mt-1 font-mono text-xs text-dim">{profile.contacts.location}</p>
              </div>
              <div className="text-right">
                <p className="label">Local time</p>
                <p className="numeric mt-1 font-mono text-xs text-dim" suppressHydrationWarning>
                  KTM {time || '--:--'}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Resume */}
          <Reveal delay={0.42}>
            <Link
              href="/assets/pdfs/SarojResume.pdf"
              target="_blank"
              className="btn-secondary group inline-flex items-center gap-2 text-xs"
            >
              Download Resume
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                style={{ transitionTimingFunction: 'var(--ease-micro)' }}
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* The relay form — single source: ContactForm */}
        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <ContactForm fallbackEmail={profile.contacts.email} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

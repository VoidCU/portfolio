'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/data/profile';
import ContactForm from './ContactForm';
import { LineMask } from './fx/LineMask';
import { Reveal } from './fx/Reveal';
import { Scramble } from './fx/Scramble';
import { useKtmTime } from './fx/hooks';

const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

const channels = [
  { label: 'GitHub', value: '@VoidCU', href: profile.contacts.github },
  { label: 'LinkedIn', value: 'saroj-prasad-mainali', href: profile.contacts.linkedin },
  { label: 'LeetCode', value: '@VoidCU', href: profile.contacts.leetcode },
];

/** Chapter title — 1px ghost stroke flooding to solid (BRIEF §4 global rules). */
function FloodTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="text-ink">{text}</span>;
  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="ghost-outline absolute inset-0">
        {text}
      </span>
      <motion.span
        className="relative block text-ink"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.9, ease: EASE_SUMMIT, delay: 0.2 }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/** Email row — COPY → COPIED scramble swap on click (BRIEF §4.10). */
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

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const time = useKtmTime();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Ghost numeral parallax at ~0.15× scroll
  const ghostY = useTransform(scrollYProgress, [0, 1], [48, -48]);

  // Ambient aurora pauses while the section is offscreen (BRIEF §7).
  const auroraInView = useInView(sectionRef);

  return (
    <section id="transmission" ref={sectionRef} className="relative border-t border-line-1 bg-bg">
      {/* Aurora — intensified for this chapter only (~20% dark / 12% light),
          pre-softened radial gradients, transform-only CSS drift; paused via
          animation-play-state while the section is offscreen (BRIEF §7). */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden [[data-theme=light]_&]:opacity-60${
          auroraInView ? '' : ' contact-aurora-paused'
        }`}
      >
        <div className="contact-aurora-a absolute -left-[15%] -top-[20%] h-[42rem] w-[42rem] rounded-full bg-radial from-accent/20 via-accent/5 via-40% to-transparent to-70%" />
        <div className="contact-aurora-b absolute -bottom-[25%] -right-[12%] h-[48rem] w-[48rem] rounded-full bg-radial from-accent2/15 via-accent2/5 via-40% to-transparent to-70%" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
        {/* Ghost chapter numeral — parallax 0.15× */}
        <motion.span
          aria-hidden="true"
          className="ghost-outline numeric font-display pointer-events-none absolute -top-8 right-0 select-none text-[10rem] font-semibold leading-none sm:text-[16rem] md:-top-14 md:text-[24rem]"
          style={reduced ? undefined : { y: ghostY }}
        >
          07
        </motion.span>

        {/* Chapter plate */}
        <div className="relative mb-16 md:mb-24">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="label numeric">CH.07 — TRANSMISSION</span>
            <span className="label numeric">▲ 8,600M · 27.7172°N 85.3240°E</span>
          </div>
          <LineMask as="h2" className="font-display text-chapter font-semibold uppercase">
            <FloodTitle text="Transmission" />
          </LineMask>
          <LineMask delay={0.15}>
            <p className="font-voice text-epigraph mt-6 max-w-[44ch] text-dim">
              The line is open — say the word.
            </p>
          </LineMask>
        </div>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Contact-channels rail */}
          <div className="space-y-8 lg:col-span-5">
            <div>
              <LineMask as="h3" className="font-display text-2xl font-semibold text-ink md:text-3xl">
                Let&apos;s build something.
              </LineMask>
              <Reveal delay={0.07}>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
                  Open to freelance work, full-time roles, and interesting collaborations.
                  I respond within 24 hours.
                </p>
              </Reveal>
            </div>

            {/* Availability */}
            <Reveal delay={0.14}>
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
                  Taking new projects &amp; exploring full-time opportunities.
                </p>
              </div>
            </Reveal>

            {/* Email — copy to clipboard */}
            <Reveal delay={0.21}>
              <EmailRow />
            </Reveal>

            {/* Channels — arrow-slide + swipe */}
            <Reveal delay={0.28}>
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

            {/* Location + KTM time */}
            <Reveal delay={0.35}>
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
          </div>

          {/* The form — single source: ContactForm */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Component-scoped aurora drift — same values as the previous
          framer keyframes, moved to compositor-friendly CSS so the only
          per-frame work is off the main thread and stops entirely while
          the section is offscreen (Hero §4.2 precedent). */}
      <style>{`
        .contact-aurora-a,
        .contact-aurora-b {
          will-change: transform;
        }
        .contact-aurora-a {
          animation: contact-drift-a 32s ease-in-out infinite;
        }
        .contact-aurora-b {
          animation: contact-drift-b 40s ease-in-out infinite;
        }
        .contact-aurora-paused .contact-aurora-a,
        .contact-aurora-paused .contact-aurora-b {
          animation-play-state: paused;
        }
        @keyframes contact-drift-a {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33.333% {
            transform: translate3d(60px, -40px, 0) scale(1.12);
          }
          66.667% {
            transform: translate3d(-30px, 30px, 0) scale(0.96);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes contact-drift-b {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33.333% {
            transform: translate3d(-50px, 30px, 0) scale(0.94);
          }
          66.667% {
            transform: translate3d(40px, -50px, 0) scale(1.1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-aurora-a,
          .contact-aurora-b {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

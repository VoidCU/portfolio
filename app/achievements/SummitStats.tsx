'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Odometer } from '@/components/fx/Odometer';

/* Ghost-stroke → solid flood over the odometer roll — matches the homepage
   Summit Log treatment (components/Achievements.tsx): a solid duplicate layer
   floods via clip-path sweep (1.4s ease-rise) synchronized with the digit
   roll, because background-clip:text breaks over transform-animated digits.
   Reduced motion: solid final state, no sweep. */
const FLOOD_CSS = `
.av-fill {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.4s var(--ease-rise) 0.1s;
}
.av-lit .av-fill {
  clip-path: inset(0 0 0 0);
}
@media (prefers-reduced-motion: reduce) {
  .av-fill { transition: none; }
}
`;

type Stat = { value: string; label: string };

function FloodNumeral({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      <span className="ghost-outline block">
        <Odometer value={value} />
      </span>
      <span aria-hidden="true" className="av-fill absolute inset-0 block text-ink">
        <Odometer value={value} />
      </span>
    </span>
  );
}

/** Hero numerals band — TOP 3% / 580+ / 98K in ghost→solid kinetic type. */
export default function SummitStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const reduced = useReducedMotion();
  const lit = reduced || inView;

  return (
    <>
      <style>{FLOOD_CSS}</style>
      <div
        ref={ref}
        className={`grid grid-cols-1 border-y border-line-2 sm:grid-cols-3 ${
          lit ? 'av-lit' : ''
        }`}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-8 sm:py-10 ${
              i > 0
                ? 'border-t border-line-2 sm:border-l sm:border-t-0 sm:pl-8 lg:pl-10'
                : ''
            }`}
          >
            <FloodNumeral
              value={stat.value}
              className="font-display text-5xl font-semibold md:text-6xl xl:text-7xl"
            />
            <p className="label numeric mt-4">{stat.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}

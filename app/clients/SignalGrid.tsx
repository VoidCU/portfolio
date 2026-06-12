'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '@/data/profile';
import { useFinePointer } from '@/components/fx/hooks';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Client = (typeof profile.clients)[number];

/**
 * Deterministic FNV-1a hash of the client name → reveal delay 0–0.8s.
 * Constellation ignition: same "random" order every visit, no Math.random.
 * (Same signal-map language as components/Clients.tsx.)
 */
function hashDelay(name: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h = Math.imul(h ^ name.charCodeAt(i), 0x01000193);
  }
  return ((h >>> 0) % 801) / 1000;
}

function SignalCell({
  client,
  rollCategory,
}: {
  client: Client;
  rollCategory: boolean;
}) {
  const { index, name, category, url } = client;

  const inner = (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="label numeric">{index}</span>
        {url && (
          <span
            aria-hidden="true"
            className="label text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        )}
      </div>
      <h2 className="font-display text-base font-medium leading-snug text-ink">
        <span className="swipe">{name}</span>
      </h2>
      {rollCategory ? (
        // y-mask roll: muted category at rest, ink copy swaps in on cell hover
        <div className="label numeric relative h-[1em] overflow-hidden">
          <span
            className="block leading-none transition-transform duration-300 group-hover:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: 'var(--ease-micro)' }}
          >
            {category}
          </span>
          <span
            aria-hidden="true"
            className="block leading-none text-ink transition-transform duration-300 group-hover:-translate-y-full motion-reduce:transition-none"
            style={{ transitionTimingFunction: 'var(--ease-micro)' }}
          >
            {category}
          </span>
        </div>
      ) : (
        <p className="label numeric">{category}</p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.45, ease: EASE_RISE, delay: hashDelay(name) }}
      className="group relative border-t border-l border-line-2 transition-colors duration-200 hover:bg-acc-1"
    >
      {url ? (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="block h-full"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}

/** All 19 clients — seeded-stagger constellation ignition, deterministic
 *  hairline recipe (cells border-t/l, wrapper border-r/b). */
export default function SignalGrid() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const rollCategory = fine && !reduced;
  const clientCount = profile.clients.length;

  return (
    <div className="grid grid-cols-1 border-r border-b border-line-2 sm:grid-cols-2 lg:grid-cols-3">
      {profile.clients.map((client) => (
        <SignalCell key={client.name} client={client} rollCategory={rollCategory} />
      ))}
      {/* Filler cell — completes the cartography at sm (1 slot) and lg (2 slots) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: 0.45, ease: EASE_RISE, delay: 0.82 }}
        className="hidden items-end justify-between gap-3 border-t border-l border-line-2 p-5 sm:flex lg:col-span-2"
      >
        <span className="label numeric">
          {String(clientCount).padStart(2, '0')} SIGNALS RECEIVED
        </span>
        <span className="label numeric text-accent">⌖ KTM — 27.7172°N 85.3240°E</span>
      </motion.div>
    </div>
  );
}

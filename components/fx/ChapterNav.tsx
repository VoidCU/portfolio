'use client';
import Link from 'next/link';
import Magnetic from './Magnetic';
import { VOLUMES } from './routes';

/** Prev/next Field Volume navigation at the bottom of every subpage (CONTRACT §5). */
export default function ChapterNav({ current }: { current: string }) {
  const i = VOLUMES.findIndex(v => v.href === current);
  if (i === -1) return null;
  const prev = VOLUMES[(i - 1 + VOLUMES.length) % VOLUMES.length];
  const next = VOLUMES[(i + 1) % VOLUMES.length];

  return (
    <nav aria-label="Chapter navigation" className="border-t border-line-2">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-6">
        <Magnetic className="justify-self-start">
          <Link
            href={prev.href}
            className="group flex flex-col gap-1 py-10 pr-6"
          >
            <span className="label numeric">
              <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-1.5">←</span>
              {` ${prev.volume} · ${prev.altitude}`}
            </span>
            <span className="font-display text-ink text-xl tracking-tight md:text-3xl">
              <span className="swipe">{prev.title}</span>
            </span>
          </Link>
        </Magnetic>
        <Magnetic className="justify-self-end">
          <Link
            href={next.href}
            className="group flex flex-col items-end gap-1 py-10 pl-6 text-right"
          >
            <span className="label numeric">
              {`${next.volume} · ${next.altitude} `}
              <span className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:translate-x-1.5">→</span>
            </span>
            <span className="font-display text-ink text-xl tracking-tight md:text-3xl">
              <span className="swipe">{next.title}</span>
            </span>
          </Link>
        </Magnetic>
      </div>
    </nav>
  );
}

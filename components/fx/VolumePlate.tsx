import { ReactNode } from 'react';
import { CharMask, LineMask } from './LineMask';

type Props = {
  volume: string;     // 'VOL.04'
  title: string;      // 'INSTRUMENTS'
  altitude: string;   // '5,300M'
  /** Page-specific decorative SVG, rendered absolute at 4% opacity behind the header */
  motif?: ReactNode;
  /** Optional intro line(s) under the title (epigraph, lede) */
  children?: ReactNode;
};

/** Shared subpage header — the "Field Volume" plate (CONTRACT §5). */
export default function VolumePlate({ volume, title, altitude, motif, children }: Props) {
  const numeral = volume.replace('VOL.', '');
  return (
    <header className="relative overflow-hidden border-b border-line-2 pt-28 pb-10 md:pt-36 md:pb-14">
      {motif && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]">
          {motif}
        </div>
      )}
      <span
        aria-hidden
        className="ghost-outline font-display pointer-events-none absolute -top-6 right-0 select-none text-[clamp(8rem,22vw,20rem)] leading-none"
      >
        {numeral}
      </span>
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-5 flex items-center justify-between">
          <LineMask as="p" className="label numeric">{`${volume} — FIELD VOLUME`}</LineMask>
          <LineMask as="p" delay={0.08} className="label numeric">{`▲ ${altitude}`}</LineMask>
        </div>
        <h1 className="font-display text-ink tracking-tight" style={{ fontSize: 'var(--text-chapter, clamp(3rem, 9vw, 9rem))', lineHeight: 0.95 }}>
          <CharMask text={title} />
        </h1>
        {children && <div className="mt-6 max-w-2xl">{children}</div>}
      </div>
    </header>
  );
}

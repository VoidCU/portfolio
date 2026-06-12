'use client';

/**
 * Static film grain (contract §3.2 / brief §3.5).
 * SVG feTurbulence data-URI, baseFrequency 0.65, 5% opacity,
 * mix-blend-overlay, fixed above all gradients. Kills gradient banding.
 * Static by design — no animation, no reduced-motion concerns.
 */

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;

const GRAIN_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] opacity-5 mix-blend-overlay"
      style={{
        backgroundImage: GRAIN_URI,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }}
    />
  );
}

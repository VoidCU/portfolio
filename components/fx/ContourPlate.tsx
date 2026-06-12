'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export type ContourStatus = 'LIVE' | 'IN DEV' | 'RESEARCH';

/**
 * Status tints. The two raw hex values below are the ONLY sanctioned hardcodes
 * (CONTRACT §3.8) — atmosphere ice + aurora violet, allowed inside this file only.
 */
const TINT: Record<ContourStatus, string> = {
  LIVE: 'var(--c-accent)',
  'IN DEV': '#4FC3F7',
  RESEARCH: '#8B7CFF',
};

/* ---------------------------------------------------------------- PRNG --- */

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ----------------------------------------------------------- geometry --- */

type Pt = [number, number];

/** Closed Catmull-Rom spline → cubic bezier path. */
function splineClosed(pts: Pt[]): string {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(
      1
    )}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

type Ring = { d: string; opacity: number; width: number };

type Plate = {
  rings: Ring[];
  /** dashed wander line threading the ring centers */
  route: string;
  cx: number;
  cy: number;
  lat: string;
  lon: string;
};

function buildPlate(seed: string): Plate {
  const h = xmur3(seed)();
  const rand = mulberry32(h);

  const ringCount = 6 + Math.floor(rand() * 3); // 6–8 rings
  const K = 16; // points per ring

  let cx = 170 + rand() * 60;
  let cy = 115 + rand() * 60;
  const r0 = 16 + rand() * 10;
  const rMax = 130 + rand() * 50;
  const step = (rMax - r0) / (ringCount - 1);

  // Shared radial noise profile — rings nest organically instead of jittering
  // independently; amplification grows toward the outer rings.
  const profile = Array.from({ length: K }, () => 1 + (rand() - 0.5) * 0.55);
  const angleJitter = Array.from(
    { length: K },
    () => ((rand() - 0.5) * Math.PI * 0.9) / K
  );

  const rings: Ring[] = [];
  const centers: Pt[] = [];

  for (let i = 0; i < ringCount; i++) {
    if (i > 0) {
      cx += (rand() - 0.5) * 16;
      cy += (rand() - 0.5) * 12;
    }
    centers.push([cx, cy]);

    const base = r0 + step * i;
    const amp = 0.35 + (i / (ringCount - 1)) * 0.45;
    const pts: Pt[] = [];
    for (let k = 0; k < K; k++) {
      const a = (k / K) * Math.PI * 2 + angleJitter[k];
      const r = base * (1 + (profile[k] - 1) * amp) + (rand() - 0.5) * step * 0.3;
      // slight vertical squash — landscape plate
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.78]);
    }

    const t = i / (ringCount - 1);
    rings.push({
      d: splineClosed(pts),
      opacity: 0.9 - t * 0.65, // inner rings brighter
      width: 1 + 0.5 * (1 - t), // 1.5 inner → 1 outer
    });
  }

  // outermost first so the brightest inner strokes paint on top
  rings.reverse();

  const route = centers
    .map(([px, py], i) => `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`)
    .join(' ');

  return {
    rings,
    route,
    cx: centers[0][0],
    cy: centers[0][1],
    lat: `27.${(h % 9000) + 1000}`,
    lon: `85.${((h >>> 7) % 9000) + 1000}`,
  };
}

const GRID_X = [50, 100, 150, 200, 250, 300, 350];
const GRID_Y = [50, 100, 150, 200, 250];

/* ---------------------------------------------------------- component --- */

type ContourPlateProps = {
  /** project name — deterministic artwork per seed */
  seed: string;
  status?: ContourStatus;
  className?: string;
};

/**
 * CONTRACT §3.8 — deterministic generative contour artwork. 6–8 concentric
 * distorted topo rings around a wandering center, stroke-only, status-tinted,
 * over a faint survey grid, with a fake grid-coordinate label derived from the
 * seed hash. Fills its container (absolute inset-0, slice). Subtle ≤6px
 * pointer parallax on the whole svg, fine-pointer only.
 */
export function ContourPlate({
  seed,
  status = 'LIVE',
  className = '',
}: ContourPlateProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plate = useMemo(() => buildPlate(seed), [seed]);
  const tint = TINT[status];

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const x = useSpring(dx, { stiffness: 120, damping: 20 });
  const y = useSpring(dy, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = el.parentElement ?? el;
    const clamp = (v: number) => Math.max(-6, Math.min(6, v));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      dx.set(clamp(((e.clientX - r.left) / r.width - 0.5) * 12));
      dy.set(clamp(((e.clientY - r.top) / r.height - 0.5) * 12));
    };
    const leave = () => {
      dx.set(0);
      dy.set(0);
    };
    target.addEventListener('pointermove', move, { passive: true });
    target.addEventListener('pointerleave', leave);
    return () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerleave', leave);
    };
  }, [dx, dy]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ x, y }}
      >
        {/* faint survey grid */}
        <g stroke="var(--line-1)" strokeWidth={1}>
          {GRID_X.map((gx) => (
            <line
              key={`v${gx}`}
              x1={gx}
              y1={0}
              x2={gx}
              y2={300}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {GRID_Y.map((gy) => (
            <line
              key={`h${gy}`}
              x1={0}
              y1={gy}
              x2={400}
              y2={gy}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* dashed wander line through the ring centers */}
        <path
          d={plate.route}
          fill="none"
          stroke="var(--line-3)"
          strokeWidth={1}
          strokeDasharray="2 4"
          vectorEffect="non-scaling-stroke"
        />

        {/* contour rings — outer faint, inner bright */}
        <g fill="none" stroke={tint} strokeLinejoin="round">
          {plate.rings.map((r, i) => (
            <path
              key={i}
              d={r.d}
              strokeOpacity={r.opacity}
              strokeWidth={r.width}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* summit crosshair */}
        <g fill="none" stroke={tint} strokeOpacity={0.9} strokeWidth={1}>
          <line
            x1={plate.cx - 7}
            y1={plate.cy}
            x2={plate.cx + 7}
            y2={plate.cy}
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={plate.cx}
            y1={plate.cy - 7}
            x2={plate.cx}
            y2={plate.cy + 7}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={plate.cx}
            cy={plate.cy}
            r={2.5}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </motion.svg>

      {/* fake grid coordinates from the seed hash */}
      <span className="label numeric absolute bottom-2 left-3">
        {plate.lat}°N / {plate.lon}°E
      </span>
    </div>
  );
}

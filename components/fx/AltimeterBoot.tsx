'use client';

import { animate, motion, useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

/**
 * F3 — AltimeterBoot (CONTRACT §3.12, BRIEF §3.3).
 * The #1 signature moment: boot log → 0→1,400M altimeter count + coordinate
 * scramble → curtain lift. Once per session (sessionStorage `voidcu-booted`).
 * Exports `useBootGate()` so every LineMask sitewide holds until the gate opens.
 */

const SESSION_KEY = 'voidcu-booted';
const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BOOT_LINES = [
  'init voidcu.os … ok',
  'mount /expedition … ok',
  'calibrate altimeter … ok',
];
const COORDS = '27.7172°N — 85.3240°E';
const SCRAMBLE_POOL = '0123456789°.—NSEW';

/* Timings in ms from mount — total 1,600ms. Phases overlap to stay ≤1.6s. */
const T_TYPE = 500; // boot lines type 0 → 500
const T_COUNT_START = 450; // count + scramble 450 → 1050
const T_COUNT = 600;
const T_EXIT_START = 800; // curtain 800 → 1600
const T_EXIT = 800;
const T_GATE = T_EXIT_START + T_EXIT - 150; // gate opens 150ms before curtain finishes
const T_FAILSAFE = 2500; // gate forces open no matter what

function readSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Module-level boot gate — tiny external store (useSyncExternalStore) */
/* ------------------------------------------------------------------ */

let booted = typeof window !== 'undefined' && readSession();
/** True once any AltimeterBoot instance has run the boot choreography. */
let claimed = false;
const listeners = new Set<() => void>();

function openGate(): void {
  if (booted) return;
  booted = true;
  listeners.forEach((fn) => fn());
}

/* CONTRACT §3.12 failsafe, owned by the gate itself: on pages without the
   boot overlay (fresh-session deep links to subpages) nothing else calls
   openGate(), so the first subscriber opens the gate as soon as it is clear
   no overlay claimed the boot — plus a hard 2.5s timeout either way. */
let failsafeArmed = false;

function armGateFailsafe(): void {
  if (booted || failsafeArmed || typeof window === 'undefined') return;
  failsafeArmed = true;
  /* Macrotask: AltimeterBoot's useLayoutEffect (if it is on this page) has
     already run by now; if nothing claimed the boot, open immediately. */
  window.setTimeout(() => {
    if (!claimed) openGate();
  }, 0);
  window.setTimeout(openGate, T_FAILSAFE);
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  armGateFailsafe();
  return () => {
    listeners.delete(fn);
  };
}

const getSnapshot = () => booted;
/* Server snapshot is true: SSR renders final composed text behind the overlay. */
const getServerSnapshot = () => true;

export function useBootGate(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ------------------------------------------------------------------ */
/* Overlay                                                             */
/* ------------------------------------------------------------------ */

type Phase = 'boot' | 'exit' | 'done';

export default function AltimeterBoot() {
  const reduce = useReducedMotion();
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const [phase, setPhase] = useState<Phase>('boot');
  const [skipped, setSkipped] = useState(false);
  const finishedRef = useRef(false);
  /** Guards this instance's effect against StrictMode double-runs. */
  const ranRef = useRef(false);

  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    openGate();
    window.dispatchEvent(new CustomEvent('voidcu:lenis-start'));
    setPhase('done');
  }, []);

  /* Pre-paint: default-render the overlay (it exists in SSR HTML so content
     never flashes) and remove it instantly if this session already booted. */
  useLayoutEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    /* Already booted this session — or another mount already ran the
       choreography (client nav back to '/') — drop the overlay instantly. */
    if (claimed || readSession()) {
      openGate();
      setSkipped(true);
      return;
    }
    claimed = true;

    /* Set at start so refreshes skip even if the sequence is interrupted. */
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* sessionStorage unavailable — boot still runs, gate still opens */
    }

    window.dispatchEvent(new CustomEvent('voidcu:lenis-stop'));

    /* Failsafes: the gate (and scroll) must never stay locked. */
    window.setTimeout(openGate, T_FAILSAFE);
    window.setTimeout(finish, T_FAILSAFE + 200);

    if (reduceRef.current) {
      /* Reduced motion: gate opens immediately, overlay fades 0.3s. */
      openGate();
      setPhase('exit');
      return;
    }

    /* A — boot log types in at terminal speed (mono, muted). */
    const totalChars = BOOT_LINES.reduce((n, line) => n + line.length, 0);
    const typeStart = performance.now();
    const typeFrame = () => {
      const p = Math.min(1, (performance.now() - typeStart) / T_TYPE);
      let budget = Math.floor(p * totalChars);
      BOOT_LINES.forEach((line, i) => {
        const shown = Math.min(line.length, Math.max(0, budget));
        budget -= shown;
        const el = lineRefs.current[i];
        if (el) el.textContent = line.slice(0, shown);
      });
      if (p < 1) requestAnimationFrame(typeFrame);
    };
    requestAnimationFrame(typeFrame);

    /* B — altimeter counts 0 → 1,400M (animate() writes textContent) while
       the coordinates scramble-decode beside it, locking left → right. */
    window.setTimeout(() => {
      animate(0, 1400, {
        duration: T_COUNT / 1000,
        ease: EASE_RISE,
        onUpdate: (v) => {
          if (countRef.current) {
            countRef.current.textContent = `${Math.round(v).toLocaleString('en-US')}M`;
          }
        },
      });
      const scrambleStart = performance.now();
      const tick = () => {
        const p = Math.min(1, (performance.now() - scrambleStart) / T_COUNT);
        const locked = Math.floor(p * COORDS.length);
        let out = COORDS.slice(0, locked);
        for (let i = locked; i < COORDS.length; i++) {
          out +=
            COORDS[i] === ' '
              ? ' '
              : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
        }
        if (coordsRef.current) coordsRef.current.textContent = out;
        if (p < 1) window.setTimeout(tick, 30);
      };
      tick();
    }, T_COUNT_START);

    /* C — curtain lifts; gate opens 150ms before it finishes so hero
       line-masks begin under the rising curtain (one continuous motion). */
    window.setTimeout(() => setPhase('exit'), T_EXIT_START);
    window.setTimeout(openGate, T_GATE);
  }, [finish]);

  if (skipped || phase === 'done') return null;

  const reducing = Boolean(reduce);
  const exiting = phase === 'exit';

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex items-end bg-bg"
      initial={false}
      animate={
        exiting
          ? reducing
            ? { opacity: 0 }
            : { clipPath: 'inset(0 0 100% 0)' }
          : reducing
            ? { opacity: 1 }
            : { clipPath: 'inset(0 0 0% 0)' }
      }
      transition={
        reducing
          ? { duration: 0.3 }
          : { duration: T_EXIT / 1000, ease: EASE_SUMMIT }
      }
      onAnimationComplete={() => {
        if (phase === 'exit') finish();
      }}
    >
      <div className="w-full px-6 pb-10 sm:px-10 sm:pb-14">
        <div className="space-y-1 font-mono text-[0.7rem] leading-4 tracking-[0.08em] text-muted">
          {BOOT_LINES.map((line, i) => (
            <div
              key={line}
              className="h-4 whitespace-pre"
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span
            ref={countRef}
            className="numeric font-mono text-4xl tracking-tight text-ink sm:text-5xl"
          >
            0M
          </span>
          <span
            ref={coordsRef}
            className="numeric font-mono text-[0.7rem] tracking-[0.18em] text-muted"
          />
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { Command } from 'cmdk';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * F3 — ExpeditionRadio (CONTRACT §3.14 + §5, BRIEF §3.12).
 * The ⌘K command palette styled as the expedition radio. cmdk (Radix Dialog
 * underneath) provides filtering, focus trap, Esc-to-close, and focus return.
 */

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EMAIL = 'sarojprasadmainali@gmail.com';
const GITHUB_URL = 'https://github.com/VoidCU';
const LINKEDIN_URL = 'https://www.linkedin.com/in/saroj-prasad-mainali';
const RESUME_PATH = '/assets/pdfs/SarojResume.pdf';

/* CONTRACT §5 route table — all 12 routes, VOL.NN + altitude meta. */
const ROUTES: Array<{ path: string; label: string; altitude: string }> = [
  { path: '/', label: 'VOL.00 — BASECAMP', altitude: '1,400M' },
  { path: '/about', label: 'VOL.01 — ORIGIN', altitude: '2,300M' },
  { path: '/projects', label: 'VOL.02 — EXPEDITIONS', altitude: '3,500M' },
  { path: '/open-source', label: 'VOL.03 — FIELD KITS', altitude: '4,000M' },
  { path: '/skills', label: 'VOL.04 — INSTRUMENTS', altitude: '5,300M' },
  { path: '/experience', label: 'VOL.05 — THE ROUTE', altitude: '6,200M' },
  { path: '/clients', label: 'VOL.06 — SIGNALS', altitude: '7,100M' },
  { path: '/achievements', label: 'VOL.07 — SUMMIT LOG', altitude: '8,000M' },
  { path: '/blog', label: 'VOL.08 — FIELD NOTES', altitude: '8,200M' },
  { path: '/now', label: 'VOL.09 — PRESENT POSITION', altitude: '8,400M' },
  { path: '/uses', label: 'VOL.10 — GEAR MANIFEST', altitude: '8,500M' },
  { path: '/contact', label: 'VOL.11 — TRANSMISSION', altitude: '8,600M' },
];

const GROUP_HEADING_CLASS =
  '[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[0.6rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-muted';

function RadioItem({
  children,
  value,
  keywords,
  meta,
  onSelect,
}: {
  children: ReactNode;
  value: string;
  keywords?: string[];
  meta?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-[0.7rem] uppercase tracking-[0.12em] text-dim data-[selected=true]:bg-raised data-[selected=true]:text-ink"
    >
      {children}
      {meta && (
        <span className="numeric ml-auto shrink-0 normal-case text-[0.62rem] tracking-[0.08em] text-muted">
          {meta}
        </span>
      )}
    </Command.Item>
  );
}

export default function ExpeditionRadio() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const prevOpen = useRef(false);
  const copyTimer = useRef<number | undefined>(undefined);

  /* Open: ⌘K / Ctrl+K, plus the `voidcu:open-radio` CustomEvent (navbar chip). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('voidcu:open-radio', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('voidcu:open-radio', onOpenEvent);
    };
  }, []);

  /* Lenis stops while the radio is open. Skip the initial mount so we never
     dispatch a stray `lenis-start` under the AltimeterBoot overlay. */
  useEffect(() => {
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    window.dispatchEvent(
      new CustomEvent(open ? 'voidcu:lenis-stop' : 'voidcu:lenis-start'),
    );
    if (!open) setCopied(false);
  }, [open]);

  const close = () => setOpen(false);

  const navigate = (path: string) => {
    close();
    router.push(path);
  };

  const toggleTheme = () => {
    /* Single source of truth lives in the layout anti-FOUC script (CONTRACT §4). */
    const w = window as unknown as { __voidcuToggleTheme?: () => void };
    w.__voidcuToggleTheme?.();
  };

  const copyEmail = () => {
    void navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    close();
  };

  const downloadResume = () => {
    const a = document.createElement('a');
    a.href = RESUME_PATH;
    a.download = 'SarojResume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    close();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Expedition radio — command palette"
      loop
      vimBindings={false}
      overlayClassName="fixed inset-0 z-[210] bg-bg/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[16vh] z-[220] w-[min(40rem,92vw)] -translate-x-1/2"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE_RISE }}
        className="relative overflow-hidden border border-line-3 bg-surface font-mono text-ink shadow-2xl"
      >
        {/* Subtle scanline — currentColor at 3% so no hardcoded hues. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 text-ink opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)',
          }}
        />

        <div className="flex items-center justify-between border-b border-line-3 px-4 py-3">
          <span className="label numeric">CH 07 — TRANSMISSION READY</span>
          <span className="label">ESC</span>
        </div>

        <Command.Input
          placeholder="TUNE FREQUENCY — TYPE A COMMAND…"
          className="w-full border-b border-line-2 bg-transparent px-4 py-3.5 text-[0.8rem] uppercase tracking-[0.12em] text-ink outline-none placeholder:text-muted"
        />

        <Command.List className="max-h-[min(50vh,22rem)] overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="px-3 py-8 text-center text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            NO SIGNAL ON THIS FREQUENCY
          </Command.Empty>

          <Command.Group heading="NAVIGATE" className={GROUP_HEADING_CLASS}>
            {ROUTES.map((route) => (
              <RadioItem
                key={route.path}
                value={`${route.label} ${route.path}`}
                keywords={[route.path]}
                meta={route.altitude}
                onSelect={() => navigate(route.path)}
              >
                {route.label}
              </RadioItem>
            ))}
          </Command.Group>

          <Command.Separator className="mx-3 my-1 h-px bg-line-2" />

          <Command.Group heading="ACTIONS" className={GROUP_HEADING_CLASS}>
            <RadioItem
              value="toggle theme day night"
              keywords={['dark', 'light', 'mode']}
              meta="THEME"
              onSelect={toggleTheme}
            >
              TOGGLE DAY / NIGHT
            </RadioItem>
            <RadioItem
              value="copy email"
              keywords={['email', EMAIL]}
              meta={EMAIL}
              onSelect={copyEmail}
            >
              {copied ? 'COPIED' : 'COPY EMAIL'}
            </RadioItem>
            <RadioItem
              value="open github"
              keywords={['github', 'code']}
              meta="EXT ↗"
              onSelect={() => openExternal(GITHUB_URL)}
            >
              OPEN GITHUB
            </RadioItem>
            <RadioItem
              value="open linkedin"
              keywords={['linkedin', 'social']}
              meta="EXT ↗"
              onSelect={() => openExternal(LINKEDIN_URL)}
            >
              OPEN LINKEDIN
            </RadioItem>
            <RadioItem
              value="download resume"
              keywords={['cv', 'pdf', 'resume']}
              meta="PDF ↓"
              onSelect={downloadResume}
            >
              DOWNLOAD RESUME
            </RadioItem>
          </Command.Group>
        </Command.List>
      </motion.div>
    </Command.Dialog>
  );
}

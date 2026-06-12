'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { Scramble } from '@/components/fx/Scramble';
import { LineMask } from '@/components/fx/LineMask';
import { useKtmTime } from '@/components/fx/hooks';
import { VOLUMES } from '@/components/fx/routes';

const EASE_RISE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SUMMIT: [number, number, number, number] = [0.76, 0, 0.24, 1];

const RESUME_HREF = '/assets/pdfs/SarojResume.pdf';

/* Primary nav (same set the old navbar exposed) + CONTRACT §5 volume metadata. */
const NAV = [
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
].map((item) => ({
  ...item,
  vol: VOLUMES.find((v) => v.href === item.href),
}));

/* Homepage chapter sentinels — ids/labels BINDING per CONTRACT §5.
   7 numbered chapters; BASECAMP and SUMMIT LOG are unnumbered. */
const CHAPTERS = [
  { id: 'basecamp', text: 'BASECAMP' },
  { id: 'origin', text: 'CH.01/07 — ORIGIN' },
  { id: 'expeditions', text: 'CH.02/07 — EXPEDITIONS' },
  { id: 'index', text: 'CH.03/07 — THE INDEX' },
  { id: 'instruments', text: 'CH.04/07 — INSTRUMENTS' },
  { id: 'route', text: 'CH.05/07 — THE ROUTE' },
  { id: 'signals', text: 'CH.06/07 — SIGNALS' },
  { id: 'summit-log', text: 'SUMMIT LOG' },
  { id: 'transmission', text: 'CH.07/07 — TRANSMISSION' },
];

/**
 * BRIEF §4.1 — The Instrument Bar.
 * Transparent over the hero, blurred surface past 80px; hides on scroll-down,
 * returns on scroll-up. Center: live chapter indicator driven by
 * IntersectionObserver sentinels over the homepage section ids (gracefully
 * absent on subpages). Right: KTM clock, ⌘K radio chip, theme toggle, resume.
 * Below xl the primary links live in a full-screen 100dvh overlay menu.
 */
export default function Navbar() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const time = useKtmTime();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [chapter, setChapter] = useState<(typeof CHAPTERS)[number] | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /* ── Scroll instrumentation: surface at 80px, hide-down / show-up ── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 80);
    if (y < 120) setHidden(false);
    else if (y > prev + 2) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });
  useEffect(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  /* ── Live chapter indicator — IO sentinels over CONTRACT §5 ids ──── */
  useEffect(() => {
    if (pathname !== '/') {
      setChapter(null);
      return;
    }
    const targets = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) {
      setChapter(null);
      return;
    }
    /* A thin band ~40% down the viewport — the section crossing it wins. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const hit = CHAPTERS.find((c) => c.id === entry.target.id);
          if (hit) setChapter(hit);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  /* ── Overlay menu side-effects ─────────────────────────────────── */
  useEffect(() => {
    setOpen(false); // close on route change
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const menuButton = menuButtonRef.current;
    window.dispatchEvent(new CustomEvent('voidcu:lenis-stop'));
    document.body.style.overflow = 'hidden'; // native touch scroll lock
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      window.dispatchEvent(new CustomEvent('voidcu:lenis-start'));
      document.body.style.overflow = '';
      menuButton?.focus();
    };
  }, [open]);

  /* While open, everything outside the navbar root (header + overlay) goes
     `inert` so AT stays scoped to the menu WITHOUT aria-modal — aria-modal
     would mark the header (and its MENU/CLOSE toggle, wordmark, ThemeToggle)
     inert even though the focus trap deliberately includes them. */
  useEffect(() => {
    if (!open || !rootRef.current) return;
    const inerted: HTMLElement[] = [];
    for (
      let node: HTMLElement | null = rootRef.current;
      node && node !== document.body;
      node = node.parentElement
    ) {
      const parent: HTMLElement | null = node.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === node || !(sibling instanceof HTMLElement)) continue;
        if (sibling.inert) continue; // leave independently-inert subtrees alone
        sibling.inert = true;
        inerted.push(sibling);
      }
    }
    return () => {
      inerted.forEach((el) => {
        el.inert = false;
      });
    };
  }, [open]);

  /* Esc closes; Tab cycles within the bar + overlay (focus trap). */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !rootRef.current) return;
      const focusables = Array.from(
        rootRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const openRadio = () =>
    window.dispatchEvent(new CustomEvent('voidcu:open-radio'));

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div ref={rootRef}>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open && !reduced ? '-120%' : '0%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`flex h-16 items-center justify-between gap-5 px-5 transition-[background-color,border-color] duration-300 md:px-8 ${
            scrolled && !open
              ? 'border-b border-line-2 bg-surface/80 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          {/* ── Left: wordmark + desktop links ─────────────────────── */}
          <div className="flex min-w-0 items-center gap-8">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="VOIDCU — basecamp"
              className="numeric font-mono text-sm font-semibold tracking-[0.18em] text-ink"
            >
              <Scramble text="VOIDCU" play="hover" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
              {NAV.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`swipe relative font-mono text-label uppercase tracking-[0.18em] transition-colors duration-200 ${
                      active ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ── Center: live chapter indicator (home only, lg+) ────── */}
          <div
            aria-hidden="true"
            className="hidden min-w-0 flex-1 justify-center lg:flex"
          >
            {pathname === '/' && chapter && (
              <div className="relative h-4 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={chapter.id}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.4, ease: EASE_RISE }}
                    className="label numeric block whitespace-nowrap"
                  >
                    {chapter.text}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ── Right cluster: clock / ⌘K / theme / resume / menu ──── */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <span
              aria-hidden="true"
              suppressHydrationWarning
              className="label numeric hidden whitespace-nowrap md:inline"
            >
              {time ? `KTM ${time}` : 'KTM --:--'}
            </span>

            <button
              type="button"
              onClick={openRadio}
              aria-label="Open the expedition radio (Ctrl+K)"
              className="hidden cursor-pointer items-center border border-line-3 px-2 py-1 font-mono text-label uppercase tracking-[0.18em] text-muted transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-5 md:pointer-fine:inline-flex"
            >
              ⌘K
            </button>

            <ThemeToggle />

            <Link
              href={RESUME_HREF}
              target="_blank"
              rel="noopener"
              className="hidden border border-line-3 px-3 py-1.5 font-mono text-label uppercase tracking-[0.18em] text-ink transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-acc-5 sm:inline-block"
            >
              Resume
            </Link>

            {/* MENU ↔ CLOSE crossfade through a y-mask */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="expedition-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative h-5 w-[6ch] cursor-pointer overflow-hidden text-right font-mono text-label uppercase tracking-[0.18em] text-ink xl:hidden"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={open ? 'close' : 'menu'}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.3, ease: EASE_RISE }}
                  className="block"
                >
                  {open ? 'Close' : 'Menu'}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen overlay menu (below xl) ──────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="expedition-menu"
            id="expedition-menu"
            role="dialog"
            aria-label="Expedition menu"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={
              reduced ? { duration: 0.25 } : { duration: 0.7, ease: EASE_SUMMIT }
            }
            className="fixed inset-0 z-40 flex h-[100dvh] flex-col bg-bg xl:hidden"
          >
            <nav
              aria-label="Expedition menu"
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 pb-4 pt-20 sm:px-10"
            >
              {NAV.map(({ href, label, vol }, i) => (
                <LineMask key={href} delay={0.15 + i * 0.06}>
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className="flex items-baseline justify-between gap-4 border-b border-line-1 py-2 transition-transform duration-300 hover:translate-x-2 focus-visible:translate-x-2"
                  >
                    <span
                      className={`font-display text-5xl font-medium leading-none sm:text-6xl md:text-7xl ${
                        isActive(href) ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {label}
                    </span>
                    {vol && (
                      <span className="label numeric shrink-0 whitespace-nowrap text-right">
                        {vol.volume}
                        <span className="hidden sm:inline"> — {vol.altitude}</span>
                      </span>
                    )}
                  </Link>
                </LineMask>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line-2 px-6 py-5 sm:px-10">
              <Link
                href={RESUME_HREF}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="swipe font-mono text-label uppercase tracking-[0.18em] text-ink"
              >
                Resume ↗
              </Link>
              <span
                aria-hidden="true"
                suppressHydrationWarning
                className="label numeric whitespace-nowrap"
              >
                {time ? `KTM ${time} · ` : ''}
                <span className="hidden min-[420px]:inline">
                  27.7172°N 85.3240°E
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

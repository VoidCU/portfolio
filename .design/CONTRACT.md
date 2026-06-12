# THE ASCENT — Engineering API Contract (v1, BINDING)

Read `.design/ASCENT-BRIEF.md` first for design intent. THIS file pins the exact
interfaces. Where the brief and this contract disagree on names/paths/props, THIS
CONTRACT WINS. Do not invent different prop names, file paths, token names, or ids.

## 0. Hard rules for every agent

- `data/profile.ts` and `data/blog.ts` are **READ-ONLY**. Never edit them.
- `app/fonts.ts` exists and is **READ-ONLY** (exports `clash`, `general`, `fraunces`, `jetbrains`).
- `next.config.ts` is done (injects `NEXT_PUBLIC_BUILD_HASH`). READ-ONLY.
- Only edit files you OWN (your task says which). Imports from other owners must
  follow this contract exactly.
- TypeScript strict — no `any` unless unavoidable. `'use client'` where needed.
- All pages keep their existing `metadata` exports and JSON-LD scripts intact.
- Tailwind 4. Use the new token utilities (`bg-bg`, `text-ink`, `border-line-2`, …)
  defined in §2. NEVER write `var(--c-…)` arbitrary values in components and never
  hardcode hex/rgba colors in components.
- Every animation: transform/opacity/clip-path only. Respect `useReducedMotion`
  per brief §7 (a designed static state, not a gap).
- Cursor-dependent features gate behind `(hover: hover) and (pointer: fine)`
  (CSS) or the `useFinePointer()` hook (§3.16).

## 1. Fonts (already wired in app/fonts.ts)

CSS variables available on `<html>`: `--font-clash` (display, w500/600),
`--font-general` (body, w400/500), `--font-fraunces` (italic voice),
`--font-mono` (JetBrains Mono w400/600).

Utility classes (defined in globals.css §2): `.font-display` → Clash,
`.font-voice` → Fraunces italic, body default → General Sans, `.font-mono` →
Tailwind built-in maps to `--font-mono` via @theme.

## 2. globals.css — tokens & utilities (owner: agent F1)

Tailwind 4 `@theme inline` registers (component-facing utility names in parens):

- Colors: `--color-bg` (`bg-bg`), `--color-surface` (`bg-surface`), `--color-raised`
  (`bg-raised`), `--color-ink` (`text-ink`), `--color-dim` (`text-dim`),
  `--color-muted` (`text-muted`), `--color-ghost` (`text-ghost`), `--color-accent`
  (`text-accent`/`bg-accent`), `--color-accent2`, `--color-on-accent`, `--color-danger`,
  `--color-line-1..5` (`border-line-1`…`border-line-5`), `--color-acc-1..5`
  (`border-acc-1`…). Each maps to the runtime vars `--c-bg`, `--c-surface`,
  `--c-raised`, `--c-text`, `--c-dim`, `--c-muted`, `--c-ghost`, `--c-accent`,
  `--c-accent2`, `--c-on-accent`, `--c-danger`, `--line-1..5`, `--acc-1..5`,
  which are set per `[data-theme]` with the exact hex values from brief §2.1/§2.2/§2.3.
- Fonts: `--font-sans: var(--font-general)`, `--font-mono: var(--font-mono)` …
- Easings as plain CSS vars: `--ease-summit`, `--ease-rise`, `--ease-micro`
  (cubic-beziers from brief §2.5).

Utility classes F1 must provide (others may rely on them):

- `.label` — mono, 0.68rem, tracking 0.18em, uppercase, `color: var(--c-muted)`.
- `.numeric` — `font-feature-settings: 'tnum' 1, 'zero' 1`.
- `.font-display`, `.font-voice` (Fraunces italic, `font-variation-settings` opsz 144).
- `.ghost-outline` — transparent fill + 1px text stroke in `--c-ghost` (use
  `-webkit-text-stroke`; color transparent).
- `.swipe` — the highlighter-swipe hover gesture (brief §3.8): an `::after`
  accent layer (`background: var(--acc-3)`) behind the text, `clip-path:
  inset(0 100% 0 0)`, transitions to `inset(0)` on `:hover`/`:focus-visible` in
  0.35s; retracts on leave. Works on any inline(-block) element. `position:
  relative; z-index` so text stays above. NO text color change.
- `.btn-primary`, `.btn-secondary` — keep API (className only), restyle to new tokens.
- `html`/`body`: `overflow-x: clip` (NOT hidden — sticky must survive). No
  `scroll-behavior: smooth` (Lenis owns scrolling).
- Theme: `[data-theme="dark"]` and `[data-theme="light"]` blocks + `color-scheme`.
  DARK IS DEFAULT (`:root` = dark values).

## 3. Foundation components — `components/fx/` (client components)

| # | File | Export(s) + props (exact) |
|---|------|---------------------------|
| 3.1 | `fx/SmoothScroll.tsx` | default `SmoothScroll({ children }: { children: React.ReactNode })` — `ReactLenis root` (from `lenis/react`), lerp 0.09; listens for `voidcu:lenis-stop` / `voidcu:lenis-start` CustomEvents on `window` to stop/start; no-op passthrough under reduced motion. |
| 3.2 | `fx/Grain.tsx` | default `Grain()` — fixed, pointer-events-none, z-[200], feTurbulence data-URI, 5% opacity, mix-blend-overlay. |
| 3.3 | `fx/LineMask.tsx` | named `LineMask({ children, delay = 0, className = '', as: Tag = 'div', once = true })` — overflow-hidden wrapper, inner y '110%'→0, ease-rise; named `CharMask({ text, delay = 0, className = '', as = 'span', stagger = 0.025 })` — per-char reveal, `aria-label` on container, `aria-hidden` chars. Both animate `whileInView` (margin -12%, once) AND wait for boot gate on first paint (import `useBootGate`). |
| 3.4 | `fx/Scramble.tsx` | named `Scramble({ text, className = '', play = 'hover' })` — play: 'hover' \| 'mount' \| boolean (controlled). 30ms tick, locks left→right. |
| 3.5 | `fx/Odometer.tsx` | named `Odometer({ value, className = '' })` — value: string like '580+' or '8,848'; SSR renders final value; digit columns roll on first in-view (1.4s ease-rise). `.numeric` applied internally. |
| 3.6 | `fx/Magnetic.tsx` | default `Magnetic({ children, strength = 0.35, className = '' })` — children must be a single element; spring 150/15/0.1; inner content moves 0.3×; fine-pointer only. |
| 3.7 | `fx/Marquee.tsx` | default `Marquee({ children, baseVelocity = 1, className = '' })` — infinite x loop, scroll-velocity coupled, `aria-hidden` duplicate, pause on hover; static single row under reduced motion. |
| 3.8 | `fx/ContourPlate.tsx` | named `ContourPlate({ seed, status = 'LIVE', className = '' })` — seed: string (project name), status: 'LIVE' \| 'IN DEV' \| 'RESEARCH'. Deterministic hash → 6–8 concentric distorted SVG contour rings; status tints LIVE=accent, IN DEV=ice `#4FC3F7`, RESEARCH=violet `#8B7CFF` (these two hex are the ONLY allowed hardcodes, inside this file only); corner mono coordinate label. Fills its container (absolute inset-0 svg, preserveAspectRatio slice). |
| 3.9 | `fx/TopoSpotlight.tsx` | default `TopoSpotlight({ className = '' })` — absolute-inset topo SVG pattern layer at 4% opacity; pointer spotlight via rAF-written `--x`/`--y` CSS vars + radial-gradient mask; parent must be `relative`. Static on touch/reduced motion. |
| 3.10 | `fx/Loupe.tsx` | default `Loupe()` — ONE global instance (mounted in layout). mix-blend-difference springed dot (400/40). Grows + shows mono label over any element with `data-cursor="view"` (label `VIEW →`) or `data-cursor="read"` (label `READ →`). Fine-pointer only. |
| 3.11 | `fx/TrailSpine.tsx` | default `TrailSpine()` — fixed left rail lg+, scroll-drawn SVG path + 7 waypoint dots (chapters §5) + altimeter readout 1,400M→8,848M (MotionValue-written textContent). Mobile: 2px top progress bar. Reads section positions by `document.getElementById` of ids in §5. |
| 3.12 | `fx/AltimeterBoot.tsx` | default `AltimeterBoot()` — sessionStorage key `voidcu-booted`; boot-log lines → 0→1,400M count → curtain `clipPath` exit (brief §3.3). Also exports **`useBootGate(): boolean`** — true immediately if already booted this session OR ~150ms before curtain finishes (so hero starts under the lifting curtain); always true server-side/after mount-timeout 2.5s (failsafe). Dispatches lenis stop/start events while visible. |
| 3.13 | `app/template.tsx` | default export — enter-only route transition (brief §3.4): bg curtain wipe + route volume label. Must render `{children}` immediately (no gating of content). Reads route via `usePathname()`; label map in §5. Reduced motion: 0.25s fade. |
| 3.14 | `fx/ExpeditionRadio.tsx` | default `ExpeditionRadio()` — cmdk ⌘K palette (brief §3.12). Routes from §5 table, theme toggle (calls same mechanism as §4), copy email `sarojprasadmainali@gmail.com`, external GitHub/LinkedIn. Dispatches lenis stop/start. Listens for `voidcu:open-radio` CustomEvent (navbar chip dispatches it). |
| 3.15 | `fx/Reveal.tsx` | named `Reveal({ children, delay = 0, y = 24, className = '' })` — generic whileInView fade+rise wrapper for grids/cards. |
| 3.16 | `fx/hooks.ts` | named `useFinePointer(): boolean` (matchMedia hover+fine, SSR-safe false), named `useKtmTime(): string` (mounted-only `Asia/Kathmandu` HH:MM, returns '' until mounted). |

## 4. Theme mechanism (owner: Navbar agent, file `components/ThemeToggle.tsx`)

- `data-theme` on `<html>`, values `dark` | `light`. Default = system preference
  (layout.tsx anti-FOUC script — owner F1 — reads localStorage `theme`, falls back
  to `prefers-color-scheme`).
- ThemeToggle keeps default export, no props. View Transitions circular reveal
  with feature-detect + reduced-motion fallback to plain swap. Sets localStorage.
- Single source of truth for the flip: F1's anti-FOUC inline script (layout.tsx)
  defines `window.__voidcuToggleTheme = function(){ read current data-theme, flip,
  write attribute + localStorage }`. BOTH ThemeToggle and ExpeditionRadio call
  `window.__voidcuToggleTheme()` (ThemeToggle wraps the call in its View-Transition
  choreography). Neither duplicates the flip logic.

## 5. Homepage chapters — ids, labels, altitudes (BINDING for TrailSpine, Navbar, template.tsx, sections)

Render order in `app/page.tsx` (owner: orchestrator, do not edit):

| # | Component | section id | Chapter label | Altitude |
|---|-----------|-----------|---------------|----------|
| 0 | Hero | `basecamp` | BASECAMP | 1,400M |
| 1 | About | `origin` | CH.01 — ORIGIN | 2,300M |
| 2 | MajorProjects | `expeditions` | CH.02 — EXPEDITIONS | 3,500M |
| 3 | Projects | `index` | CH.03 — THE INDEX | 4,400M |
| 4 | Competencies | `instruments` | CH.04 — INSTRUMENTS | 5,300M |
| 5 | Timeline | `route` | CH.05 — THE ROUTE | 6,200M |
| 6 | Clients | `signals` | CH.06 — SIGNALS | 7,100M |
| 7 | Achievements | `summit-log` | SUMMIT LOG | 8,000M |
| 8 | Contact | `transmission` | CH.07 — TRANSMISSION | 8,600M |
| 9 | Footer | — | SUMMIT | 8,848M |

TrailSpine waypoints = rows 1–8 (8 dots) + footer flag terminus. Numbered
chapters are 7 (`CH.NN/07` format in navbar); SUMMIT LOG is an unnumbered interlude.

Route table (for template.tsx volume labels + ExpeditionRadio + prev/next nav):

| Route | Volume label | Altitude |
|---|---|---|
| `/` | VOL.00 — BASECAMP | 1,400M |
| `/about` | VOL.01 — ORIGIN | 2,300M |
| `/projects` | VOL.02 — EXPEDITIONS | 3,500M |
| `/open-source` | VOL.03 — FIELD KITS | 4,000M |
| `/skills` | VOL.04 — INSTRUMENTS | 5,300M |
| `/experience` | VOL.05 — THE ROUTE | 6,200M |
| `/clients` | VOL.06 — SIGNALS | 7,100M |
| `/achievements` | VOL.07 — SUMMIT LOG | 8,000M |
| `/blog` | VOL.08 — FIELD NOTES | 8,200M |
| `/now` | VOL.09 — PRESENT POSITION | 8,400M |
| `/uses` | VOL.10 — GEAR MANIFEST | 8,500M |
| `/contact` | VOL.11 — TRANSMISSION | 8,600M |

Prev/next chapter nav at the bottom of each subpage follows this order (wraps
around). Implemented per-page by the page's owner using `Magnetic` + arrow-slide.

## 6. Shared component signatures that MUST NOT change

- `components/Navbar.tsx` — default export, no props (used by every page).
- `components/Footer.tsx` — default export, no props.
- `components/ContactForm.tsx` — default export, no props; posts to `/api/contact` (existing route, do not change the request shape).
- All `components/fx/*` per §3.

## 6b. Subpage scaffolding (exists on disk, READ-ONLY for page agents)

- `components/fx/routes.ts` — `VOLUMES: Volume[]` canonical route table (§5).
- `components/fx/VolumePlate.tsx` — default `VolumePlate({ volume, title, altitude, motif?, children? })`
  — server-safe subpage header (ghost numeral, CharMask title, mono labels, 4% motif slot).
- `components/fx/ChapterNav.tsx` — default `ChapterNav({ current: string })` — prev/next
  volume nav, place directly before `<Footer />`.

## 7. Conventions

- Section scaffold (each homepage section owner): `<section id="…" className="relative …">`,
  chapter plate = ghost numeral (`.ghost-outline`, ~16-24rem, absolute, parallax 0.15×)
  + `LineMask` chapter title (`.font-display`, outline→solid flood per brief §4 global
  rules) + one `.font-voice` epigraph + mono altitude metadata (`.label .numeric`).
- Hover rows: `x:8` shift + sibling dim via group hover; arrows slide `x:6`; links use `.swipe`.
- Counters: `<Odometer>`; timestamps/coords: `.label .numeric`.
- `me.jpeg` portrait: `next/image` proper `width/height`, no `unoptimized`.
- Brand icons: import from `simple-icons` package (e.g. `import { siReact } from 'simple-icons'`)
  and render `<svg>` with `path d={si.path}`; monochrome `fill-muted`, brand color on hover allowed in dark theme only.
- Build hash: `process.env.NEXT_PUBLIC_BUILD_HASH` (footer telemetry).
- KTM clock: `useKtmTime()` from `fx/hooks`.

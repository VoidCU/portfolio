# THE ASCENT â€” Field Notes from 1,400m
## Definitive Build Brief â€” v1.0 FINAL (Design Director sign-off, 2026-06-12)

This document is the single source of truth. Where it conflicts with prior explorations, this document wins. Repo: `Z:\portfolio` (Next.js 15 App Router, Tailwind 4, Framer Motion 12 already installed).

---

## 1. CONCEPT STATEMENT

The homepage is one continuous expedition: a scroll-journey from the Kathmandu valley (27.7172Â°N, 85.3240Â°E, 1,400m) to the summit of production systems at 8,848m. A scroll-drawn SVG trail spine connects seven numbered chapters; a live altimeter climbs as you scroll. Light theme is dawn mist over field-journal paper ("FIRST LIGHT"); dark theme is high-altitude night with aurora and stars ("HIGH NIGHT"). Every label is an instrument readout â€” mono coordinates, timestamps, elevations, slashed-zero tabular numerals. Every section is a camp on the route. The existing brutalist 1px-grid system survives and becomes the cartography of a topographic map, finally set in motion.

Voice discipline: the altitude conceit lives ONLY in mono metadata, the spine, and decorative elevations. It never leaks into headlines or body copy. Decorative elevations are clearly stylistic, not literal claims.

Identity: the VoidCU alias is foregrounded in the boot sequence and wordmark; the operator is Saroj Prasad Mainali, building from Kathmandu.

---

## 2. DESIGN TOKENS

All tokens registered in Tailwind 4 `@theme` in `Z:\portfolio\app\globals.css` â€” utilities must be `bg-bg`, `text-accent`, `border-line-2`, never `bg-[var(--c-bg)]` arbitrary values. Set `color-scheme: dark` / `color-scheme: light` per `data-theme`.

### 2.1 Color â€” DARK "HIGH NIGHT" (default when `prefers-color-scheme: dark`)

| Token | Hex | Use |
|---|---|---|
| `--c-bg` | `#050807` | Pine-cast void black, page ground |
| `--c-surface` | `#0B1210` | Cards, nav scrolled state |
| `--c-raised` | `#111A17` | Hover surfaces, raised plates |
| `--c-text` | `#EDF4F0` | Primary ink |
| `--c-dim` | `#C3D2CB` | Secondary text |
| `--c-muted` | `#7E928A` | Mono labels, metadata |
| `--c-ghost` | `#1E2A26` | Outline/watermark type, ghost numerals |
| `--c-accent` | `#2BE4A2` | Glacier mint â€” moments only |
| `--c-accent2` | `#18B87F` | Accent hover |
| `--c-on-accent` | `#04110B` | Text on accent fills |
| `--c-danger` | `#FF6B5E` | Form errors |

Atmosphere-only hues (gradients â‰¤14% opacity, NEVER on UI/text): aurora violet `#8B7CFF`, ice `#4FC3F7`.

### 2.2 Color â€” LIGHT "FIRST LIGHT"

| Token | Hex | Use |
|---|---|---|
| `--c-bg` | `#FAFAF6` | Warm paper |
| `--c-surface` | `#F1F4EE` | Cards |
| `--c-raised` | `#E9EFE9` | Raised plates |
| `--c-text` | `#101713` | Ink |
| `--c-dim` | `#2E3B34` | Secondary |
| `--c-muted` | `#5F6F66` | Metadata |
| `--c-ghost` | `#D7E0D8` | Outline type |
| `--c-accent` | `#0B7B57` | Evergreen (4.5:1+ on bg â€” text-safe) |
| `--c-accent2` | `#086344` | Hover |
| `--c-on-accent` | `#FAFAF6` | On accent fills |
| `--c-danger` | `#C8442C` | Errors |

Atmosphere-only: dawn gold `#F2D9A4`, rose `#F4C6B8` (â‰¤12% opacity radial gradients).

### 2.3 Border ramps â€” DIRECTOR'S RULING

Two ramps. The **neutral ramp is the default** for all hairline cartography (grids, cards, dividers, section frames) â€” derived from text color so the map never goes green-tinted:

- `--line-1..5`: dark = `rgba(237,244,240, .06/.10/.16/.26/.45)`; light = `rgba(16,23,19, .08/.12/.18/.28/.50)`.

The **accent ramp is reserved** for focus rings, active waypoints, spine, beacons, and hover moments only:

- `--acc-1..5`: dark = `rgba(43,228,162, .08/.13/.20/.30/.50)`; light = `rgba(11,123,87, .08/.13/.22/.32/.55)`.

**MANDATORY CLEANUP:** grep-kill every `rgba(74,222,128` in `Z:\portfolio\components\Projects.tsx`, `Competencies.tsx`, `Timeline.tsx`, `Contact.tsx` and replace with ramp tokens. Add a CI grep check that fails on any hardcoded `rgba(74,222,128` or raw hex accent outside `globals.css`.

**Light-mode accent policy:** vivid glacier mint `#2BE4A2` never appears in light theme at all. In light theme, accent-as-text is permitted only via `--c-accent` evergreen (verified â‰¥4.5:1). The highlighter swipe in light theme is an accent-tinted fill behind dark ink (marker on field notes), never recolored text. Add a lint/grep check for accent-as-text classes on light-theme-visible elements.

### 2.4 Typography

| Role | Family | Source | Weights | Treatment |
|---|---|---|---|---|
| Display | **Clash Display** | Fontshare woff2 via `next/font/local` (download: `https://api.fontshare.com/v2/fonts/download/clash-display` â€” ship only 500, 600) | 500/600 | tracking `-0.02em` |
| Voice/epigraph | **Fraunces** italic variable | `next/font/google` (`Fraunces`, `style: ['italic']`, axes `opsz 144`, `wght 480â€“560`, `WONK 1`) | variable, italic-only subset | ONLY one-line chapter epigraphs + project taglines, 1.25â€“1.75rem |
| Body | **General Sans** | Fontshare woff2 via `next/font/local` (download: `https://api.fontshare.com/v2/fonts/download/general-sans` â€” 400, 500) | 400/500 | 1rem/1.7, `max-w-[62ch]` |
| Instrument mono | **JetBrains Mono** | `next/font/google` (already in repo) | 400/600 | 0.63â€“0.72rem, tracking `0.18em`, uppercase |

**Calibration rule (global):** every altitude, stat, timestamp, coordinate, and counter gets `font-feature-settings: 'tnum' 1, 'zero' 1` â€” slashed-zero tabular numerals. Token it as a `.numeric` utility.

Fluid type scale â€” tokenized in `@theme`, no inline `clamp()`:

- `--text-display: clamp(4rem, 12vw, 12rem)` / leading `0.92` â€” hero name
- `--text-chapter: clamp(3rem, 9vw, 9rem)` â€” chapter titles
- `--text-epigraph: clamp(1.25rem, 2vw, 1.75rem)` â€” Fraunces lines
- `--text-mega: 13vw` â€” footer LET'S TALK
- `--text-label: 0.63remâ€“0.72rem` â€” mono instrument labels

`.font-heading` must reference the next/font CSS variables (`var(--font-clash)` etc.), never hardcoded family names. Delete the Space Grotesk hardcode.

### 2.5 Motion tokens (in `@theme`)

- `--ease-summit: cubic-bezier(0.76, 0, 0.24, 1)` â€” curtains, chapter wipes, menu. 0.7â€“0.9s.
- `--ease-rise: cubic-bezier(0.22, 1, 0.36, 1)` â€” line-mask text, card entrances. 0.6â€“0.8s.
- `--ease-micro: cubic-bezier(0.4, 0, 0.2, 1)` â€” hovers, chips, labels. 0.15â€“0.25s.

Springs: magnetic = stiffness 150 / damping 15 / mass 0.1 (inner label moves at 0.3Ã— offset); cursor preview follower = stiffness 400 / damping 40; scroll-scrub lag = `useSpring(stiffness 100, damping 30)`.

Staggers: chars 0.025, words 0.04, grid cells/cards 0.07, menu links 0.06 with `delayChildren 0.15`.

### 2.6 Dependencies & deletions

Add: `lenis` (use `lenis/react`), `cmdk` (command palette), `simple-icons`. Remove: `typewriter-effect`, `react-intersection-observer` (Framer's `whileInView` covers it). Delete dead code: `Z:\portfolio\components\MotionDiv.tsx`, `Z:\portfolio\components\Section.tsx`, the stale inline form inside `Z:\portfolio\components\Contact.tsx` (ContactForm.tsx is the single source). Revive `Z:\portfolio\components\MajorProjects.tsx` (currently a null stub) per Â§4.4.

---

## 3. FOUNDATION COMPONENTS (build in this order)

### 3.1 Smooth scroll â€” `<SmoothScroll>`
`ReactLenis root` with `lerp: 0.09`. Remove `scroll-behavior: smooth` from CSS. `lenis.stop()` while overlay menu, command palette, or preloader is open; `lenis.start()` on close. Disabled entirely under reduced-motion. CRITICAL: move the current `html/body overflow-x-hidden` to an inner wrapper or use `overflow-x: clip` â€” `position: sticky` (card stack Â§4.4, summit footer Â§4.11) silently dies inside any `overflow: hidden` ancestor.

### 3.2 Trail Spine + Altimeter â€” `<TrailSpine>` (build FIRST among visuals; it is the page's connective tissue)
Fixed left rail, lg+ only, 48px wide. Vertical wandering SVG route path; `pathLength` bound to page `scrollYProgress` via `useScroll` + `useSpring(100, 30)`. Seven waypoint dots (one per chapter) fill with `--c-accent` and pulse 1.4Ã— once as passed. Below the path: mono altimeter readout mapping scroll `[0,1] â†’ [1,400M â€¦ 8,848M]`, rounded to nearest 10, `.numeric`. All values written via MotionValues â€” zero React state per frame. Mobile: collapses to a 2px top progress bar with altitude tooltip on touch-hold. Reduced-motion: spine renders fully drawn, waypoints fill statically as sections pass (no pulse), altimeter still updates (it's informational).

### 3.3 Preloader â€” `<AltimeterBoot>` (â‰¤1.6s total, once per session)
`sessionStorage` gate. Full-screen `--c-bg` overlay, SSR-rendered so content never flashes (real page markup exists behind it for LCP/SEO). Sequence: (1) mono boot lines type in at terminal speed â€” `init voidcu.os â€¦ ok`, `mount /expedition â€¦ ok`, `calibrate altimeter â€¦ ok` (~0.5s total); (2) readout counts `0 â†’ 1,400M` via Framer `animate()` writing `textContent` while `27.7172Â°N â€” 85.3240Â°E` scramble-decodes alongside (~0.6s); (3) curtain exits `clipPath: inset(0 0 100% 0)`, 0.8s `--ease-summit`. **Handoff spec (verbatim):** hero line-masks begin 0.2s BEFORE the curtain completes â€” one continuous motion. Reduced-motion: instant 0.3s opacity fade, no count, no scramble.

### 3.4 Page transitions â€” `app/template.tsx`, enter-only
App Router exit animations are structurally unreliable â€” commit to **enter-only** choreography (never the FrozenRouter hack; adopt `next-view-transitions` later only if exit wipes are demanded). On every route enter: a `--c-bg` curtain wipes away `clipPath: inset(0) â†’ inset(0 0 100% 0)`, 0.7s `--ease-summit`, while the route's mono volume label (`VOL. 03 â€” SKILLS / 4,200M`) flashes on it; the page H1 line-mask reveals mid-wipe. Reduced-motion: 0.25s crossfade, label static.

### 3.5 Grain â€” `<Grain>`
SVG `feTurbulence` data-URI, `baseFrequency 0.65`, 5% opacity, `mix-blend-overlay`, `position: fixed`, `pointer-events: none`, z-index above all gradients in both themes. Static (no animation). Purpose: kills gradient banding.

### 3.6 Split-text reveal â€” `<LineMask>` / `<CharMask>`
Every headline enters via `overflow-hidden` wrapper, content `y: '110%' â†’ 0`, `--ease-rise` 0.6â€“0.8s. Char stagger 0.025, word 0.04, line 0.08. Accessibility: `aria-label` on container, `aria-hidden` on split spans. SSR renders the final composed text (split happens client-side on hydrate, initial styles applied before paint â€” use direct client imports, NOT `dynamic ssr:false`). Reduced-motion: opacity fade 0.3s, no y movement.

### 3.7 Magnetic â€” `<Magnetic>`
lg+ and `(hover: hover)` only. Element follows pointer within its bounds via `useSpring`'d MotionValues (150/15/0.1); inner label translates at 0.3Ã— the offset. Snaps home on leave. Used on: footer LET'S TALK, summit flag, 404 return link, prev/next volume nav.

### 3.8 Highlighter swipe â€” `<Swipe>` â€” THE BRAND GESTURE
Every meaningful hover across the site: an accent stroke sweeps left-to-right BEHIND ink text via a `clip-path: inset(0 100% 0 0) â†’ inset(0)` pseudo-layer, 0.35s `--ease-micro`-adjacent. Dark theme: glacier mint at low alpha behind light ink ("surveyor's marker"); light theme: evergreen-tinted fill behind dark ink (marker on field notes) â€” text color never changes to accent in light theme. Apply to: nav links, client names, org names in Timeline, marked bio phrases, blog row titles. Retracts right-to-left on leave (origin swap).

### 3.9 Cursor system â€” `<Loupe>` + `<PreviewGhost>`
`(hover: hover)` and `(pointer: fine)` only; native cursor retained underneath. (a) **Loupe:** a small springed `mix-blend-difference` dot (400/40) that grows into a `VIEW â†’` mono label over project index rows and blog rows. (b) **PreviewGhost:** one fixed `pointer-events-none` `motion.div` (springed x/y 400/40) crossfading contour-art plates via `AnimatePresence` keyed by hovered slug; all plates pre-rendered hidden to eliminate first-hover lag. Both written via MotionValues, never state.

### 3.10 Marquee â€” `<Marquee>`
Base 40s linear loop, transform-only, `aria-hidden` duplicate track. Velocity-coupled: `useVelocity(scrollY)` modulates playback rate (scroll fast â†’ marquee speeds/skews subtly). Pause on hover and under reduced-motion (reduced-motion shows a static single row).

### 3.11 Counters â€” `<Odometer>`
Slashed-zero tabular columns. Each digit column rolls vertically on viewport entry (`once: true`, 1.4s, `--ease-rise`). SSR renders FINAL values; the roll is a client embellishment (SEO/LCP safe). Simple count-ups use `animate()` writing `textContent`. Reduced-motion: static final values, no roll.

### 3.12 Command palette â€” `<ExpeditionRadio>` (âŒ˜K)
`cmdk`, styled as the expedition radio: mono type, 1px `--line-3` frame, scanline-subtle header reading `CH 07 â€” TRANSMISSION READY`. Commands: navigate all 13 routes (each row shows `VOL. NN` + altitude metadata), toggle day/night, copy email (with COPYâ†’COPIED scramble swap), jump to homepage chapters, open GitHub/LinkedIn. Opens with `--ease-rise` scale 0.97â†’1 + fade 0.25s; Lenis stopped while open; focus-trapped; Esc closes. Hint chip `âŒ˜K` lives in the navbar right cluster (hidden on touch).

### 3.13 Scramble decode â€” `<Scramble>`
30ms interval, characters lock left-to-right. Used: VOIDCU wordmark hover, preloader coordinates, contact success line, 404 corner coordinates, COPYâ†’COPIED swap.

### 3.14 Contour plates â€” `<ContourPlate seed={nameHash}>`
Deterministic generative SVG per project: 6â€“8 concentric distorted contour rings seeded by name hash, tinted by status â€” LIVE `#2BE4A2`, IN DEV `#4FC3F7`, RESEARCH `#8B7CFF` (dark theme; light theme tints derive from evergreen/ice at fill-level, not text). Mono coordinate label in a corner. This is honest art direction for projects with no screenshots; the frame accepts a real screenshot per-project later with zero layout change. Used in: MajorProjects cards, Projects index preview ghost, touch accordions.

### 3.15 Spotlight ground â€” `<TopoSpotlight>`
4%-opacity topo-contour SVG pattern sections; pattern brightens within a ~600px radial spotlight following the pointer via rAF-throttled CSS custom properties (`--x`/`--y`) on a masked pseudo-element. Zero re-renders. `(hover: hover)` only; static 4% pattern on touch/reduced-motion.

---

## 4. HOMEPAGE â€” SECTION-BY-SECTION SPEC

Global rules: every headline enters via line mask; every grid staggers `whileInView({ once: true, margin: '-12%' })`; all numerals count once in view (SSR final values); hovers are transform-based (y:-4 lift, x:8 row shift, arrow-slide x:6 on â†’ links) plus the highlighter swipe â€” never color-only. Chapter plates: ghost outline numeral (`--c-ghost`, `-webkit-text-stroke 1px`, ~24rem) parallaxing at 0.15Ã— behind a line-masked chapter title and one Fraunces italic epigraph. **Outline-to-solid flood:** chapter titles enter as 1px ghost-stroke type that floods to solid via a background-clip gradient sweep synchronized with the section's reveal (0.9s `--ease-summit`).

### 4.1 NAVBAR â€” Instrument Bar (`components/Navbar.tsx`)
- Transparent over hero â†’ `backdrop-blur` + `--c-surface`/80 + bottom `--line-2` hairline once scrolled past 80px.
- Left: VOIDCU wordmark, hover scramble-decode (30ms, locks left-to-right).
- Center (lg+): live chapter indicator `CH. 03/07 â€” INSTRUMENTS`, updated by IntersectionObserver sentinels; digits roll vertically (y-mask swap, 0.4s `--ease-rise`).
- Right: live `KTM 14:32` clock (`Intl.DateTimeFormat`, `Asia/Kathmandu` +05:45, mounted-only, `suppressHydrationWarning`), âŒ˜K hint chip, theme toggle (Â§4.12).
- Hide on scroll-down / return on scroll-up: `useMotionValueEvent(scrollY)` â†’ `y: '-120%'` spring.
- Active route: `layoutId` underline that draws under the current link. Link hover: highlighter swipe.
- Mobile menu: `100dvh` overlay, `clipPath inset(0 0 100% 0) â†’ inset(0)` 0.7s `--ease-summit`; links at `text-7xl` Clash Display, stagger 0.06 via line masks, each with mono altitude metadata; MENUâ†”CLOSE crossfades through a y-mask; Lenis stopped while open; focus-trapped.

### 4.2 HERO â€” Basecamp (`components/Hero.tsx`)
Full `100svh` scene, layered back-to-front:
1. Canvas star field â€” dark theme only, ~120 particles, DPR capped at 2, paused via `visibilitychange` + IntersectionObserver, absent under reduced-motion.
2. Two aurora gradient blobs (`#8B7CFF`/`#4FC3F7`/`#2BE4A2` â‰¤14%) drifting on transform-only keyframes 32s/40s alternate; light theme swaps to dawn gold/rose mist â‰¤12%. Pre-softened radial gradients â€” NO `filter: blur` on viewport-size elements.
3. Three layered SVG Himalayan ridgeline silhouettes in `--c-surface`/`--c-raised`/`--c-ghost`; pointer parallax Â±6/Â±14/Â±26px via `useSpring`'d MotionValues; scroll parallax y at 0.05/0.12/0.25 of scrollY.
4. Grain overlay.

Foreground: name in Clash Display `--text-display`, three lines, each overflow-hidden masked, chars `y:'110%'â†’0` stagger 0.025 `--ease-rise`, starting 0.2s before preloader curtain clears. **DELETE typewriter-effect.** Role line: fixed-width mono readout cycling `FULL-STACK ENGINEER / AI BUILDER / SYSTEMS LEAD` via y-mask swap every 3.5s (static first value under reduced-motion). Corner metadata (mono 0.63rem): top-left coordinates + `1,400M`; top-right live KTM time + `OPEN FOR WORK` with `animate-ping` dot. Stats row (`005+ / 100+ / 80+ / 580+`) odometer-rolls on load, slashed-zero tnum. Scroll cue: trail spine's first segment draws downward from hero base. Scroll-out: headline drifts up at 0.3Ã—, ridgelines separate â€” walking out of basecamp.

### 4.3 ABOUT â€” CH.01 ORIGIN (`components/About.tsx`)
- Chapter plate: ghost `01`, title `ORIGIN` (outlineâ†’solid flood), epigraph *"From the valley floor."* (Fraunces italic).
- **Scrubbed manifesto:** bio paragraph #1 split into word spans (~60 words); section `useScroll offset ['start 0.9','start 0.25']`; each word opacity 0.18â†’1 over its scroll slice. Opens with a 3-line Fraunces italic drop cap. Marked key phrases get the highlighter swipe on hover. Remove the render-time em-dash `.replace` â€” fix the content in `Z:\portfolio\data\profile.ts`. Reduced-motion: full-opacity static paragraph, drop cap retained.
- Portrait: `me.jpeg` via `next/image` (AVIF/WebP, remove `unoptimized`), theme-aware duotone (grayscale + multiply/screen overlays: pine/mint dark, evergreen/cream light); clipped frame with internal parallax y Â±8% (image scaled 115%); entrance `clip-path inset(100% 0 0 0) â†’ 0` 0.8s `--ease-summit`; hover transitions duotoneâ†’full color 0.4s. Rotated 90Â° mono marginalia along the frame: `FIG. 01 â€” THE ENGINEER`, `B.E. COMPUTER ENGINEERING`.
- Stats grid odometer (once), topo contour pattern behind at 4% with cursor spotlight (Â§3.15).

### 4.4 MAJORPROJECTS â€” CH.02 EXPEDITIONS (`components/MajorProjects.tsx` â€” revive the dead stub; centerpiece)
Sticky-stacking case cards for all 5 `featuredProjects`. Container `relative`; each card `sticky top-[calc(64px+i*24px)] h-[85vh]` `bg-surface` 1px `--line-2` border. Per-card `useScroll`: outgoing card `scale 1â†’0.94` + `brightness 1â†’0.65` as the next slides over. Card layout â€” left: giant mono index `01`, name Clash Display 6vw line-masked, Fraunces italic tagline, body desc, tech chips (mono, `--line-3` border, hover y:-2); right: `<ContourPlate>` (Â§3.14), swap to real screenshots per-project later in the same frame. Status badge: pulsing beacon dot + mono label. GitHub/URL links: arrow-slide (â†’ translates x:6) + highlighter swipe. Reduced-motion/mobile: cards stack normally (no sticky scale), entrance fades. Sticky REQUIRES no overflow-hidden ancestor (Â§3.1).

### 4.5 PROJECTS GRID â€” The Index (`components/Projects.tsx`)
Text-only index rows: name / category / year / â†’. Cursor-following `<PreviewGhost>` with contour plates; **Loupe** grows to `VIEW â†’` over rows. Hovered row shifts x:8, siblings dim to 0.35 (group hover); rows enter 0.07 stagger line-masks. Touch / `(hover: none)`: preview disabled by design, rows become tap-to-expand accordions showing the plate inline â€” a designed fallback, not an absence. Kill all hardcoded greens here (ramp tokens).

### 4.6 COMPETENCIES â€” CH.03 INSTRUMENTS (`components/Competencies.tsx`)
Bento "gear manifest" replacing the uniform grid: `grid-cols-4` (lg) mixed col-span/row-span cells, one per skill category, PLUS one kinetic cell running a scroll-velocity-reactive marquee of stack icons (simple-icons inline SVG, monochrome â†’ brand color on hover) and one cell with GitHub repo count odometer. Cells reveal `whileInView` stagger 0.07, `y: 24â†’0`. Hover: y:-4 lift + spotlight border (radial-gradient 500px at `var(--x) var(--y)`, accent 12%, rAF-throttled CSS vars on a masked pseudo-element ring). Skill tick marks use `var(--c-accent)` â€” delete hardcoded rgba greens.

### 4.7 TIMELINE â€” CH.04 THE ROUTE (`components/Timeline.tsx`)
The trail spine visibly threads through this section: center (lg) / left (mobile) SVG path drawing with scroll (`pathLength` scrub, `vector-effect: non-scaling-stroke`). Each of 5 roles is a camp: waypoint dot scales 0â†’1 with a single pulse; card slides from alternating sides (`x: Â±32`, opacity, 0.7s `--ease-rise`); role title line-masked; period as mono timestamp; decorative elevation metadata ascending 1,400Mâ†’7,200M (BloomBytes lowest â†’ Neuron Nest highest). Opposite column: pinned mono year readout scrubbing 2022â†’2026 with rolling digits as camps pass. Org names: highlighter swipe on hover. Bullets: ramp tokens, not hardcoded green.

### 4.8 ACHIEVEMENTS â€” Summit Log (`components/Achievements.tsx`)
Hero numerals (`TOP 3%`, `580+`, `98K`) as odometer digit-rolls (once, 1.4s, `--ease-rise`, tnum/zero, SSR final values) â€” and they enter as 1px ghost-stroke type flooding to solid via background-clip sweep synchronized with the count (kinetic type, not plain odometers). Cert cards as summit certificates: 1px `--line-2` border + corner registration tick marks, mono issuer/date, stagger reveal 0.07. LeetCode Top-3% card: one-shot conic-gradient beacon â€” `@property --angle` animated 0â†’360Â° once over 1.8s on reveal, clipped to a 1px ring via `mask-composite: exclude`, settling to static accent border. The `3%` figure reads from `profile.ts`, not JSX.

### 4.9 CLIENTS â€” Signal Map (`components/Clients.tsx`)
19 cells reveal in a seeded random stagger (constellation igniting). Hover: NO full solid fill (fixes the legibility bug) â€” instead accent bg at 8%, category label swaps in via y-mask, and a thin SVG line draws (`pathLength` 0â†’1, 0.3s) from the hovered cell to a small fixed `KTM âŒ–` origin node in the section corner, retracting on leave. Client names get the highlighter swipe. Above the grid: velocity-reactive marquee of client names in `--c-ghost` outline type, `aria-hidden` duplicate, paused on hover and reduced-motion.

### 4.10 CONTACT â€” CH.07 TRANSMISSION (`components/Contact.tsx` + `ContactForm.tsx`)
Framed as a transmission from altitude; aurora blobs intensify to 20% opacity here only. **Delete the stale inline form in Contact.tsx â€” ContactForm.tsx is the single source.** Fields: floating mono labels shrink/translate to top on focus/filled (0.2s `--ease-micro`); 1px bottom border draws accent leftâ†’right on focus (`scaleX`, `origin-left`). Errors: `--c-danger` token (kill Tailwind `red-500`) + 4px x-shake (3 keyframes, skipped under reduced-motion). Submit: label slides up via y-mask to `TRANSMITTINGâ€¦` with an indeterminate 1px progress beam sweeping the button; success = SVG checkmark `pathLength` draw + `TRANSMISSION RECEIVED 27.7172Â°N` scramble-in; AnimatePresence enter/exit (no `setTimeout` pop). Email row: COPYâ†’COPIED scramble swap on click.

### 4.11 FOOTER â€” The Summit, 8,848M (`components/Footer.tsx`)
Parallax curtain reveal: footer `position: sticky bottom-0` behind `main`; main slides away to expose it (verify no overflow-hidden ancestor). Dominated by `LET'S TALK` at `--text-mega` Clash Display linking `mailto:` â€” hover fill via clipped duplicate layer (absolute accent copy, `clip-path inset(100% 0 0 0) â†’ inset(0)`, 0.5s `--ease-summit`), magnetic on lg+. Trail spine terminates here: a small SVG summit flag draws (`pathLength`) when footer enters; clicking it bursts 24 CSS-particle rectangles in prayer-flag colors (blue/white/red/green/yellow, absolutely-positioned spans, spring exit) â€” the one whimsy easter egg, user-initiated so reduced-motion safe but still gate the burst behind the media query.

**Telemetry row** (mono, one line): `8,848M â€” SUMMIT Â· KTM 23:41 Â· 27.7172Â°N 85.3240Â°E Â· BUILD a74e84e` â€” real git hash injected at build time (`process.env.NEXT_PUBLIC_BUILD_HASH` from `git rev-parse --short HEAD` in `next.config.ts`). Socials with arrow-slide hovers. `Â© 2026 SAROJ PRASAD MAINALI`.

**Colophon** (mono, `--c-muted`, final line): `SET IN CLASH DISPLAY, GENERAL SANS & JETBRAINS MONO Â· BUILT WITH NEXT.JS 15 IN KATHMANDU Â· Â© 2026`.

### 4.12 THEME TOGGLE â€” Day/Night over the Range (`components/ThemeToggle.tsx`)
Default follows `prefers-color-scheme` (fix the current light-default; keep anti-FOUC script). Toggle uses View Transitions API circular reveal expanding from the button (`::view-transition-new` clip-path circle, 0.6s `--ease-summit`); plain 0.25s crossfade fallback for unsupported browsers and reduced-motion. In-scene: stars ignite/extinguish, aurora â†” dawn mist swap, ridgelines re-tint. Reserve real width for the pre-mount placeholder (no layout pop). Set `color-scheme` per theme.

---

## 5. SUBPAGE SYSTEM â€” Field Volumes (13 routes under `Z:\portfolio\app\`)

- `template.tsx` enter choreography per Â§3.4. Enter-only; never FrozenRouter.
- **Volume plates** break template monotony: each route header = oversized `--c-ghost` outline numeral + page-specific static SVG motif at 4% opacity â€” topo contours `/projects`, constellation `/clients`, route path `/experience`, instrument grid `/skills`, broadcast rings `/contact`, journal rules `/blog`, gear list ticks `/uses`, fork graph `/open-source`, compass rose `/now`, summit panorama `/achievements`, valley contour `/about`. Same scaffold, distinct identity, near-zero render cost.
- All lists stagger `whileInView` 0.06. H1s line-mask mid-wipe.
- Every volume ends with prev/next chapter navigation: `â† VOL.02 PROJECTS / VOL.04 EXPERIENCE â†’`, magnetic, arrow-slide â€” the numbering finally traversable.
- **Content drift fixes:** `/uses`, `/open-source` read from `data/profile.ts`; the `3%` figure and `/now` date read from data files; fix the stale "June 2025" in `/now`.
- **Blog:** `/blog` rows stagger with arrow-slide + loupe; `/blog/[slug]` gets a reading-progress altimeter (2px top bar labeled with climbing meters), sticky waypoint TOC (lg+, active heading via IntersectionObserver, accent dot slides via `layoutId`), related-posts-by-category footer, styled code blocks (Shiki, theme-aware).
- **404 â€” "OFF THE TRAIL"** (`app/not-found.tsx`): full site chrome retained (Navbar + Footer). The trail spine wanders off-canvas into a dead end; a mono compass readout spins via `useSpring` before settling, pointing at a magnetic `RETURN TO BASECAMP (1,400M)` link; coordinates scramble endlessly in the corner. The headline letters are **draggable and throwable** (Framer `drag` + `dragTransition` inertia) â€” transform-only, user-initiated (inherently reduced-motion safe), works on touch.
- Fix grid border fragility: replace conflicting `odd:` variants + inline style overrides in skills/clients/domains grids with a single deterministic border recipe (cell gets `border-t border-l`, grid gets `border-r border-b`) at all breakpoints.

---

## 6. SIGNATURE WOW MOMENTS (protect these in any scope cut, in priority order)

1. **The Altimeter Boot** â€” boot-log lines, 0â†’1,400M count, scrambling coordinates, curtain lift, name staggering up 0.2s before the curtain clears. Once per session.
2. **The Trail Spine** â€” a scroll-drawn route map of the page itself, waypoints igniting, live altimeter 1,400Mâ†’8,848M.
3. **Day/Night over the Range** â€” View Transitions circular reveal; the theme switch IS the art direction.
4. **Expedition Stack** â€” five sticky-stacking case cards with deterministic contour-art plates.
5. **The Scrubbed Manifesto** â€” bio read word-by-word by scroll over parallaxing ridgelines, opened by a Fraunces drop cap.
6. **The Index Ghost + Loupe** â€” cursor-following contour previews with a mix-blend `VIEW â†’` loupe while siblings dim.
7. **Summit Footer** â€” sticky-reveal 13vw LET'S TALK, summit flag draw, prayer-flag confetti, telemetry row + colophon.
8. **Constellation Clients** â€” every hover draws a live SVG line back to the KTM origin node.
9. **The Expedition Radio (âŒ˜K)** â€” full command palette: routes, theme, copy email.
10. **The Highlighter Swipe** â€” the brand gesture on every meaningful hover, sitewide.
11. **OFF THE TRAIL 404** â€” wandering spine, spinning compass, throwable letters.

---

## 7. PERFORMANCE & ACCESSIBILITY GUARDRAILS (non-negotiable)

**Reduced-motion is a parallel design, not a switch-off.** Wrap the app in `MotionConfig reducedMotion="user"`; additionally `useReducedMotion` to: swap y-masks â†’ opacity fades; kill Lenis, stars, marquee motion (static single row), parallax, preloader count (0.3s fade), scrubbed manifesto (full-opacity static), digit rolls (static finals), x-shake, confetti. Every scrub/preloader/marquee ships a static-but-composed state designed day one â€” never an empty gap.

**60fps rules:** animate transform/opacity/clip-path only â€” never layout properties, never `filter: blur` on viewport-size elements (pre-soften gradients in the asset). All per-frame values through MotionValues / rAF-written CSS vars â€” never React state. Stars: â‰¤120 particles, DPR cap 2, paused via `visibilitychange` + IntersectionObserver. All ambient layers pause offscreen. Audit with DevTools performance at 4Ã— CPU slowdown; budget: no frame >16ms during steady scroll on a mid-tier laptop.

**LCP/SEO:** preloader â‰¤1.6s, sessionStorage-gated, SSR markup rendered behind it; counters and headlines SSR final values; hero name is real text. Fonts: Clash 2 weights, Fraunces italic-only subset, `next/font` with `display: swap`-equivalent defaults; if FCP suffers, cut Fraunces first. Target Lighthouse â‰¥90 performance, 100 accessibility/SEO.

**Touch:** every cursor-dependent feature (preview ghost, loupe, magnetic, spotlight) gates behind `(hover: hover) and (pointer: fine)` with a DESIGNED fallback: index rows â†’ tap-to-expand accordions with inline plates; spotlight â†’ static 4% pattern; magnetic â†’ plain links; mobile spine â†’ 2px progress bar.

**Contrast:** all body text â‰¥4.5:1 in both themes; atmosphere gradients â‰¤14% dark / â‰¤12% light and verified under text; vivid mint never as text in light theme (CI grep). `--c-danger` used for all error states.

**Assets:** `me.jpeg` â†’ `next/image` AVIF/WebP, remove `unoptimized`; generate a real 1200Ã—630 `opengraph-image`; dedupe `bctapp.jpg/png`; replace 48â€“100px skill PNGs with simple-icons SVG; fix apple-icon (PNG, not SVG).

**A11y mechanics:** split-text uses `aria-label` + `aria-hidden` spans; marquees `aria-hidden` duplicates; menu and âŒ˜K focus-trapped with Esc; visible focus rings (accent ramp); `suppressHydrationWarning` only on the clock; live clock and altimeter are decorative (`aria-hidden`) with semantic equivalents where informational.

**Build order:** tokens/@theme â†’ Lenis + overflow fix â†’ grain â†’ LineMask/Odometer/Swipe â†’ TrailSpine â†’ Hero â†’ template.tsx â†’ Preloader â†’ MajorProjects stack â†’ remaining chapters â†’ subpages â†’ âŒ˜K â†’ 404 â†’ polish pass at 4Ã— slowdown.

Key files: `Z:\portfolio\app\globals.css`, `Z:\portfolio\app\layout.tsx`, `Z:\portfolio\app\template.tsx` (new), `Z:\portfolio\data\profile.ts`, `Z:\portfolio\components\` (all listed above), `Z:\portfolio\next.config.ts` (build hash injection). Current build hash for telemetry dev reference: `a74e84e`.
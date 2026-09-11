# Beyond the ordinary

The existing profile, project records, articles, qualifications, client list, résumé, and contact endpoint remain the content sources. The new identity is an engineer's journey from Kathmandu into software, intelligence, and design.

## Art direction

Near-black navy, icy silver, warm ember orange, quiet hairlines, rounded project canvases, generous negative space. Clash Display provides architectural headings; Fraunces italic adds an editorial voice. General Sans and JetBrains Mono retain the existing licensed/font setup.

The homepage moves through origin, selected work, capabilities, experience, journal, and the next chapter. Shared navigation, footer, chapter covers, and chapter links carry the system into every inner route. Project, skill, and experience layouts are rebuilt; existing long-form content remains available.

## Research references

- https://bruno-simon.com/ — interaction can express the maker's personality and still provide direct access to work.
- https://www.awwwards.com/inspiration/theatre-js-motion-design-for-the-web — deliberate motion pacing and composition.
- https://motion.dev/docs/react-use-scroll — scroll-linked motion values for parallax and progress.
- https://threejs.org/docs/ — renderer lifecycle, geometry, materials, and disposal.
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion — user-controlled motion preferences.

## Artwork and implementation

The built-in image generation tool created the Himalayan orbital landscape. The selected image is saved in the project as `public/assets/art/orbital-himalaya.webp`, optimized with Sharp at quality 88. The source PNG remains in the generator's output directory. See `ART-PROMPT.txt` for the exact prompt.

Project illustrations are original, code-native thematic compositions, not screenshots of the products. They represent civic data, connected conversations, donor impact, character recognition, and audio separation. Links and development statuses come directly from `data/profile.ts`.

The Three.js sculpture is lazy loaded, caps pixel density, pauses offscreen and in hidden tabs, handles unavailable WebGL with a static fallback, and disposes GPU resources on unmount. Motion preferences are read after hydration and update when the OS preference changes. The homepage additionally includes a pause control. The site does not gate content behind a loading film or audio.

## Local validation

- `npm run lint`
- PowerShell isolated production build: `$env:NEXT_DIST_DIR='.next-cinema'; npm run build`
- PowerShell preview: `$env:NEXT_DIST_DIR='.next-preview'; npm run dev -- --port 3100`
- `npm run test:e2e` against the preview; set `PLAYWRIGHT_BASE_URL` to test another local server.
- Playwright covers desktop and mobile navigation, keyboard menu behavior, project filters, contact validation and mocked success, reduced motion, and route overflow.
- Contact success is mocked during browser checks; tests do not send live emails.

All content counts are retained from the user's existing content, not newly verified claims. No production deployment is performed by this redesign.

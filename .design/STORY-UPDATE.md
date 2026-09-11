# Cinematic story update

Implemented a three-chapter homepage walkthrough with original Himalayan origin, engineering workshop and connected valley artwork. Desktop chapters crossfade with normal document scrolling; mobile chapters use individual full-bleed scenes. Chapter links remain usable with reduced motion. The hero links directly into the story, and the final chapter leads to selected work.

Auctionmandu is the highlighted project. Genzlink replaces Void Social in the featured project data, current project copy and metadata. Removed the old Void Social open-source highlight rather than implying the replacement app has a public source repository. Existing project descriptions, skills and biography are retained except for the requested product updates.

## Image provenance

- `public/assets/projects/auctionmandu-web.webp`: optimized public homepage screenshot from `Z:/lilami/docs/screenshots/hero/home.png`.
- `public/assets/projects/auctionmandu-app.webp`: actual app screenshot from `Z:/lilami/website/public/screenshot/s4.png`.
- `public/assets/projects/auctionmandu-map.webp`: actual app map screenshot from `Z:/lilami/website/public/screenshot/s5.png` (available asset for future case study use).
- `public/assets/projects/genzlink-app.webp`: actual app screen composition from `Z:/GenZLink-website/public/phone-clean.png`.
- `public/assets/project/handwritten.png`: existing OCR project image.
- Amarnepal, Project Lakhey and Perceparator use clearly captioned editorial artwork; those cards do not present generated images as product screenshots.
- `public/assets/art/saroj-editorial.webp`: identity-preserving editorial edit of the user-provided portrait, with a separate minimal beard grooming refinement. No CSS grayscale or duotone obscures the face.
- Exact generation prompts and output paths: `STORY-ART-PROMPTS.json`.

Official product research: https://auctionmandu.com/ and https://www.genzlinkapp.com/. Amarnepal reference: https://amarnepal.com/. Product technologies checked against local project package manifests. The product screenshots are existing public assets from the local repositories, not freshly captured live pages. External live screenshot capture was blocked by sandbox network restrictions; automatic approval review rejected escalation due to an account usage limit. No retries or indirect external capture were attempted afterward.

## Interactive workshop

Replaced the abstract rotating rings with a modeled desk, monitor displaying the real Auctionmandu screen, complete keyboard and mouse, PCB with traces and components, CPU and copper heatsink, memory modules, server sleds, vents, fans, patch cables and machined base. Four discipline controls move the camera to meaningful views and expose related skills. An exploded view separates the heatsink and assemblies. Rendering stops offscreen, while the tab is hidden, or when motion is paused. Controls remain usable with reduced motion; a matching workshop image is the WebGL fallback.

## Validation

- ESLint passed.
- Production build passed, all 43 routes generated.
- 14 Playwright checks passed across desktop and mobile: chapter navigation, project destinations/filtering, workshop interactions, reduced motion, menu focus behavior, route rendering and mocked contact handling.
- Visual review: desktop and mobile story, project showcase, model overview and exploded view, and light theme.
- 320px viewport checked without horizontal overflow.
- QA screenshots are local under `.design/qa/` and excluded from source lint and version control.

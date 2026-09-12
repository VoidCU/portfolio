# Systems experience and GitHub profile — September 13, 2026

- Added five user-supplied system types to `profile.systems`, surfaced by `SystemsLedger` on the homepage and Projects page. These remain experience descriptions, without invented clients, URLs, stacks, or performance figures.
- Replaced Amarnepal's editorial landscape with its real homepage budget interface, captured at 1440 × 760 from `https://amarnepal.com` with third-party scripts blocked. The image is a site screenshot, not a generated mockup. Updated the project description to reflect its broader civic data scope.
- Added a portable profile README and five local images in `github-profile/`. GitHub profile Markdown belongs in `VoidCU/VoidCU`; the supplied `VoidCU/VoidCU.github.io` is a separate static Pages repository on branch `Main`. The connected integration has read-only access, so no remote mutation was attempted.
- Replaced the local repository's create-next-app boilerplate README with project, development, and content documentation.

Sources: [Amarnepal](https://amarnepal.com), [GitHub profile documentation](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme), existing portfolio content, and owner-provided systems experience.

## Validation

- ESLint and the production build passed; all 43 routes generated.
- Existing browser suite: 21 of 22 passed on the first run; the desktop menu test passed when rerun alone. No menu implementation or test changes were made.
- Additional browser inspection verified all five systems and the real Amarnepal image on `/` and `/projects` at 1440px and 390px, with no horizontal page overflow. Dark and light layouts were inspected.
- The profile README was rendered locally with a GFM parser and a GitHub-like stylesheet. All images loaded, its day/night source selection worked, and desktop/mobile layouts had no page overflow. This was a local preview, not a published GitHub render.

## Expanded profile follow-up

The profile now has eight navigable chapters, full-size product showcases, an expandable mobile preview, research and systems sections, a contextual toolkit, detailed career history, a client directory, education, certificates, dated practice statistics, writing, and contact links. The 40 new SVG panels include dedicated mobile and day/night versions; all are self-contained and editable using `github-profile/scripts/build-assets.mjs`.

`github-profile/PREVIEW.html` and `preview.css` provide a portable local browser preview. The final version passed checks at 1060px and 390px in both themes: 21 rendered images, 55 unique local asset references, all navigation anchors, keyboard-operated disclosure controls, correct responsive artwork selection, and no horizontal page overflow. The SVG generator passes ESLint. No website application code or remote GitHub files changed in this follow-up.

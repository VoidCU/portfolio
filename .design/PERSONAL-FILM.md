# Saroj's personal film

This update makes the portfolio a story about Saroj, keeping the existing midnight blue and copper design. The opening now introduces his name and uses a generated editorial scene based on the supplied identity reference. The three story scenes follow Kathmandu, the 2 a.m. server recovery described in his existing journal, and his work across software, AI, photography and water modelling. These are generated illustrations of his story, not documentary photographs of particular events.

## New art

18 final images were generated with the built-in image generation tool and optimized to WebP in `public/assets/art/`. Every final prompt, original generated path and saved asset path is recorded in `PERSONAL-FILM-PROMPTS.json`.

- Opening: `saroj-opening.webp`.
- Personal chapters: `saroj-roots.webp`, `saroj-afterhours.webp`, `saroj-maker.webp`.
- Journal: `journal-context.webp`, `journal-machine.webp`, `journal-time.webp`.
- Home contact: `contact-invitation.webp`.
- Perceparator research art: `audio-material.webp`.
- Individual page covers: `cover-origin.webp`, `cover-projects.webp`, `cover-opensource.webp`, `cover-systems.webp`, `cover-journey.webp`, `cover-collaboration.webp`, `cover-notes.webp`, `cover-now.webp`, `cover-contact.webp`.

The existing Himalayan art is now assigned separately to the achievements cover, Amarnepal and Lakhey cards. The old workshop art is reserved for the Uses cover. The profile portrait remains the recognizable identity image on the home and About pages. Responsive versions of a chapter use the same chapter artwork. No background image is shared between the homepage story, journal, contact area or individual page covers.

An initial journal-cover candidate included an unrelated person and was rejected. The selected replacement is an object-only photograph of a notebook and pen.

## Motion and studio

`FilmMotion.tsx` provides shared pause handling and scroll-driven lenses for images and project displays. The opening moves from a wide portrait toward a closer frame; chapter cameras push in with scrolling; covers, journal images and product screens move independently. A quote from the existing Wearing Many Hats article reveals in three lines. There is no scroll locking or autoplay sound.

The studio expands across the page with six views: overview, interface, intelligence, infrastructure, photography and personal setup. Added a camera and lens, a glass-sided PC with graphics card and cooling details, a phone, notebook, desk lamp and studio platform. The PC configuration text comes from the existing Uses page; the model is an illustrative studio composition rather than a measured replica. Mouse orbit, accessible rotation buttons and reset controls work alongside discipline views and an exploded assembly. Mobile scrolling stays native over the model.

The model loads only as its section approaches the viewport. Rendering stops when paused, hidden or offscreen. The static WebGL fallback, `public/assets/art/studio-fallback.webp`, is a capture of the actual new model, not reused generated section art. GPU resources and controls are disposed on unmount.

## Verification

Validated desktop and mobile layouts, 320px width, portrait framing, readable chapter copy, unique page covers, lazy studio loading, all six camera views, reduced motion and WebGL fallback. Existing contact checks mock the endpoint; no email was sent. Build and automated check results are reported in the final delivery.

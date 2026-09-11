# Orbital portfolio update

The opening portrait and origin portrait remain. The story uses the original Himalayan observatory, workshop and valley landscapes, with copy centred on discovering a problem, doing the work and shipping a useful product.

Twenty daylight editions were created with the **built-in image_gen tool**, inspected and saved under `public/assets/art/*-day.webp`. Exact prompts, input names, original generation paths and final asset paths are recorded in [DAYLIGHT-PROMPTS.json](DAYLIGHT-PROMPTS.json). Night originals are preserved. `ThemeImage` switches the requested asset with the site's saved theme; product screenshots retain their original UI.

The old workstation model was removed. `UniverseScene` models an Earth, atmospheric rim, satellite bus/solar cells/dish/thrusters, neural connections and three-piece skill panels. Six scroll chapters change the camera and panel assembly. The renderer sleeps offscreen and in background tabs, limits pixel density and supports reduced motion, manual pause and a WebGL fallback. All skills remain HTML content. Ambient light beams and the model's illumination share the persisted night-light switch.

The public LeetCode GraphQL `matchedUser(username: "VoidCU")` response was checked on September 12, 2026: 690 solved, 270 easy, 351 medium, 69 hard, rank 100,376. These are dated snapshot values, not a live feed; no percentile is inferred. Source profile: https://leetcode.com/u/VoidCU/. Other headline counts are supplied by the portfolio owner: 200+ projects, 150+ repositories, 10+ companies, 300+ happy people and friends.

Earth texture source: https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg, saved locally as `public/assets/universe/earth.jpg`. Three.js licence is included alongside the texture. Satellite and neural geometry are built locally in code.

Validation includes production compilation and route generation, lint, desktop/mobile navigation, theme persistence and asset switching, scroll layer selection, WebGL fallback, and the complete connected interaction sequence. Preview screenshots are in the ignored `.design/qa` folder.

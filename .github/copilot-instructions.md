## Copilot / AI Agent Instructions — JIGI LENS

Purpose: short, actionable guidance so an AI coding agent can be productive immediately.

Big picture
- Single-page portfolio (`index.html`) plus three category pages in `pages/`.
- No build tools or backend — plain HTML/CSS/JS. Changes are file edits and browser preview.

Key files to read first
- `index.html` — landing content, hero slider, gallery snippets.
- `js/main.js` — slider, lightbox, `applyImageOrientation()`, `initLightbox()`, `gatherImages()`.
- `css/main.css` — mobile-first styles, breakpoints (1024/768/480), layout & aspect-ratios.
- `pages/*.html` — full gallery pages that reference `../css/main.css` and `../js/main.js`.

Developer workflows & checks
- Preview: open `index.html` in a browser (no build). For automated preview use a static server if needed.
- Image updates: swap `src` values in `index.html` or add to `assets/images/` and update paths.
- Slider timing: change `interval = 5200` in `js/main.js` (milliseconds).

Project-specific patterns and examples
- Single CSS file: all styling is centralized in `css/main.css`.
- Image handling: remote images are common; use `loading="lazy"` and `object-fit: cover` on `.gallery-item img`.
- JS idempotency: `initLightbox()` guards against recreating the overlay; follow this pattern when adding DOM overlays.
- Orientation helper: `applyImageOrientation()` runs on `DOMContentLoaded` and `resize` — call it after DOM updates.
- Slider wrap: index uses modulo arithmetic: `idx = (n + count) % count` — preserve this for looping behavior.

Integration points & external deps
- Google Fonts (Playfair Display, Inter) loaded in HTML.
- Images commonly hosted externally (Postimg/Pexels). No backend APIs.

Editing rules for agents
- Don't add build tools or install packages without asking. Keep edits minimal and in-place.
- When changing markup, maintain existing class names (`.gallery-item`, `.item-label`, `.gallery-full`) to avoid breaking CSS/JS.
- When adding JS event listeners, prefer delegation (existing pattern) and ensure overlays are idempotent.

Where to look for examples
- Slider code and `interval` in `js/main.js`.
- Lightbox implementation and `applyImageOrientation()` in `js/main.js`.
- Responsive rules and aspect-ratio conventions in `css/main.css`.

Next step for reviewers
- If this matches expectations, I can expand examples or add a short checklist for PRs (image size, alt text, mobile test steps).

---
If something is missing or you'd like more granular rules (PR checklist, naming conventions, or example edits), tell me which area to expand.

# Contributing to JIGGY LENS

Thank you for considering contributions to the JIGGY LENS portfolio website!

## Overview

This is a vanilla HTML/CSS/JavaScript site with no build tools. All changes are file edits and browser preview.

- **No build step required** — simply open `index.html` in a browser
- **No package dependencies** — plain CSS and vanilla JS
- **All CSS in one file** — `css/main.css` for easy global updates
- **Progressive enhancement** — JS enhances but isn't required

## Quick Start

1. Clone the repository
2. Open `index.html` in your browser
3. For images: swap URLs or add to `assets/images/` and update `srcset` in HTML

## Before You Make Changes

- Keep edits minimal and in-place
- Don't add build tools or install packages without opening an issue first
- Maintain existing class names (`.gallery-item`, `.item-label`, etc.) — they're tied to CSS and JS
- Test in modern browsers (Chrome/Edge 90+, Firefox 88+, Safari 14+)

## Common Tasks

### Adding a New Gallery Category

1. Duplicate a `.category` block in `index.html`
2. Change `.category-title` text
3. Update `.gallery-grid` class (e.g., `fashion-grid`)
4. Add CSS rule in `css/main.css`: `.fashion-grid .gallery-item { aspect-ratio: 16/9; }`
5. Add 2–3 `.gallery-item` divs with `<img>` + `.item-label`

### Updating Images

- **Hero slider:** Replace `.svg` placeholders in `/assets/images/hero/` with `.jpg` or `.webp`
  - Scaffold: `hero-1.jpg`, `hero-1.webp` (1600×900px)
  - Update `srcset` in `index.html` if you add new formats

- **Gallery images:** Update `src` and `srcset` in `index.html` or `pages/*.html`
  - Ensure `width`/`height` attributes match actual dimensions (prevents layout shift)
  - Use `loading="lazy"` for non-hero images

### Modifying Slider Timing

Change `interval = 5200` in `js/main.js` (milliseconds between slides)

### Updating Contact Info

Search for and update:
- `hello@jiggylens.com` (email)
- `234XXXXXXXXXX` (WhatsApp)
- Instagram/X handles in footer + booking section

### Styling Changes

All CSS is in `css/main.css`:
- Color tokens: `--bg`, `--text`, `--brand` (CSS variables in `:root`)
- Spacing: `--space: 6%` (used for padding)
- Radii: `--radius: 8px` (border-radius)
- Responsive breakpoints: 1024px (tablet), 768px (mobile), 480px (small phones)

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f8f6f2` | Background |
| `--text` | `#111` | Primary text |
| `--brand` | `#111` | Brand accent |
| `--radius` | `8px` | Border radius |
| `--transition` | `0.35s cubic-bezier(0.16,1,0.3,1)` | Smooth animations |

## Code Patterns

### JavaScript Idempotency

The lightbox (`initLightbox()`) guards against recreating overlays. Follow this pattern when adding DOM overlays:

```javascript
function initMyOverlay() {
  if (document.querySelector('.my-overlay')) return; // Already exists
  // Create overlay once
}
```

### Event Delegation

Use event delegation (not individual listeners) for gallery images:

```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.gallery-item img')) {
    // Handle click
  }
});
```

### Image Orientation

`applyImageOrientation()` runs on `DOMContentLoaded` and `resize`. If you modify the DOM, call it after updates.

## Testing

- **Local preview:** Open `index.html` in your browser
- **Mobile:** Test on iOS Safari and Chrome Mobile
- **Lighthouse:** Run Lighthouse check in DevTools for performance/accessibility targets
- **HTML/CSS:** Basic linting runs on PRs via GitHub Actions

## PR Checklist

- [ ] Alt text provided for all new images
- [ ] `width`/`height` attributes set on all images (prevents CLS)
- [ ] Tested on desktop (Chrome/Safari) and mobile (iOS/Android)
- [ ] No build tools added
- [ ] Class names preserved (`.gallery-item`, etc.)
- [ ] CSS uses design tokens (`--bg`, `--text`, etc.) where applicable
- [ ] Accessibility: keyboard navigation, focus styles, semantic HTML

## Questions?

Open an issue or check the [Copilot Instructions](./.github/copilot-instructions.md) for architecture details.

---

Made with ❤️ by Jiggy Lens

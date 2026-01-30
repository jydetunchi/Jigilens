# Image Migration Guide

## Hero Images

Hero slider images are scaffolded with SVG placeholders. To replace with real images:

### File Structure
```
assets/images/hero/
├── hero-1.svg       ← Placeholder
├── hero-1.jpg       ← Add your image here (1600×900)
├── hero-1.webp      ← Optional: WebP for modern browsers
├── hero-2.svg       ← Placeholder
├── hero-2.jpg       ← Add your image here (1600×900)
└── ... (same pattern for hero-3, hero-4)
```

### How It Works

The `index.html` uses a fallback chain in the `srcset`:

```html
<img src="/assets/images/hero/hero-1.svg"
     srcset="/assets/images/hero/hero-1.webp 1600w,
             /assets/images/hero/hero-1.jpg 1600w,
             /assets/images/hero/hero-1.svg"
     sizes="100vw"
     width="1600" height="900" alt="...">
```

**Fallback order:**
1. **WebP** (newest, smallest file size) — modern browsers
2. **JPEG** (fallback) — older browsers
3. **SVG** (placeholder) — if images missing

### Converting Images to WebP

```bash
# Using ImageMagick
convert hero-1.jpg -quality 85 hero-1.webp

# Using cwebp (Google's encoder, faster)
cwebp -quality 85 hero-1.jpg -o hero-1.webp
```

## Portfolio Gallery Images

### Portraits

Scaffold in `assets/images/portraits/`:
```
portrait-1.jpg (800×1000 or similar 3:4 aspect ratio)
portrait-1.webp
portrait-2.jpg
portrait-2.webp
portrait-3.jpg
portrait-3.webp
```

The `srcset` in `index.html` and `pages/portraits.html` references these paths.

### Events

Scaffold in `assets/images/events/`:
```
DSC01291.jpg (900×600 or similar 16:9 aspect ratio)
DSC01291.webp
DSC01530.jpg
DSC01530.webp
... (and so on for all 8 event images)
```

**Note:** Existing local event images (`assets/images/events/DSC*.jpg`) are preserved; just add `.webp` versions.

### Products

Scaffold in `assets/images/products/`:
```
product-1.jpg (900×600)
product-1.webp
product-2.jpg
product-2.webp
product-3.jpg
product-3.webp
```

## Batch Conversion Script

To convert all JPEGs to WebP in one command:

```bash
# Using ImageMagick (requires imagemagick package)
find assets/images -name "*.jpg" -exec sh -c 'convert "$1" -quality 85 "${1%.jpg}.webp"' _ {} \;

# Using cwebp (faster, requires libwebp package)
find assets/images -name "*.jpg" -exec cwebp -quality 85 {} -o {}.webp \;
```

## Dimensions & Aspect Ratios

**Keep these in sync with CSS rules in `css/main.css`:**

| Category | Dimensions | Aspect Ratio | Usage |
|----------|-----------|-------------|-------|
| Hero | 1600×900 | 16:9 | Full-screen slider |
| Portraits | 800×1000 | 3:4 | Gallery grid |
| Events | 900×600 | 16:9 | Gallery grid |
| Products | 900×600 | 16:9 | Gallery grid |

If you need different dimensions, update:
1. `width`/`height` in HTML (prevents layout shift)
2. `srcset` sizes (e.g., `900w` → `1200w`)
3. Corresponding CSS `aspect-ratio` rules if needed

## Performance Tips

- **Optimize images first:** Use [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app), or ImageMagick
- **Use WebP for modern browsers:** Saves ~25–30% file size vs JPEG
- **Keep hero image < 500KB:** Critical for page load speed
- **Use Lighthouse:** Run `npm run lighthouse` to audit performance

## Verifying Images Load

1. Open `index.html` in your browser
2. Open DevTools (F12) → Network tab
3. Look for images in the network list
4. Check that WebP/JPEG load (not just SVG)
5. Run Lighthouse (Chrome DevTools) and check performance score

---

For questions, see [CONTRIBUTING.md](../CONTRIBUTING.md).

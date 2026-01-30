# JIGI LENS

A modern, cinematic portfolio website for Jigi Lens photography. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Full-screen hero slider** with auto-play and manual controls
- **Responsive gallery** with smooth hover animations
- **Smooth scroll navigation** with active state tracking
- **Mobile-optimized** design with adaptive typography
- **Cinematic aesthetic** using Playfair Display and Inter fonts
- **Performance-focused** vanilla JavaScript (no dependencies)

## Project Structure

```
jiggylens/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # All styles
├── js/
│   └── main.js         # Interactive features
├── README.md           # Project documentation
└── .gitignore          # Git ignore rules
```

## Quick Start

1. Clone the repository
2. Open `index.html` in a web browser
3. No build step required—it runs as-is

## Sections

- **Hero** - Full-screen cinematic slider with CTA buttons
- **Gallery** - Categorized portfolio (Portraits, Events, Products)
- **About** - Photographer bio
- **Booking** - Contact information and social links
- **Footer** - Copyright and links

## Customization

### Edit Content
- Update image URLs in `index.html`
- Modify text, email, and social links
- Change category titles and labels

### Styling
- All CSS is in `css/main.css`
- Color palette: `#f8f6f2` (cream), `#111` (near-black)
- Fonts: Playfair Display (headlines), Inter (body)

### JavaScript
- Slider logic in `js/main.js` (5.2s auto-play interval)
- Scroll animations trigger at 20% visibility threshold
- Mobile-friendly touch events via native browser handling

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Font & Color System

| Element | Font | Size | Color |
|---------|------|------|-------|
| Logo | Playfair | 1.55rem | #111 |
| Hero Title | Playfair | 4.2–8.4rem | white |
| Section Title | Playfair | 3.6rem | #111 |
| Body Text | Inter | 1rem | #111 |
| Background | — | — | #f8f6f2 |

## Performance Notes

- Images are hosted externally (Postimg, Pexels)—replace with self-hosted images for production
- No external JS libraries—fully vanilla
- CSS animations use GPU-accelerated properties (transform, opacity)
- Intersection Observer for scroll-triggered animations

## License

© 2026 JIGI LENS — Lagos
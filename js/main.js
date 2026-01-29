// ── HERO SLIDER ──
const bgSlider = document.querySelector('.hero-bg-slider');
const bgSlides = document.querySelectorAll('.hero-bg-slider .slide');
const prev = document.querySelector('.slider-prev');
const next = document.querySelector('.slider-next');
const heroSection = document.querySelector('.hero--fullscreen');

let idx = 0;
const count = bgSlides.length;
let timer = null;
const interval = 5200;

function goto(n) {
  idx = (n + count) % count;
  if (bgSlider) bgSlider.style.transform = `translateX(-${idx * 100}%)`;
}

function fwd() { goto(idx + 1); }
function back() { goto(idx - 1); }

prev?.addEventListener('click', back);
next?.addEventListener('click', fwd);

function autoStart() { timer = setInterval(fwd, interval); }
function autoStop() { clearInterval(timer); timer = null; }

autoStart();
heroSection?.addEventListener('mouseenter', autoStop);
heroSection?.addEventListener('mouseleave', autoStart);

// ── FADE-IN ON SCROLL ──
const fadeObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(s => fadeObs.observe(s));

// ── SMOOTH SCROLL ──
function scrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── NAVBAR ACTIVE STATE ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-primary a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

updateActiveNav();

// ── PREVENT DEFAULT BUTTON BEHAVIOR IF NO ONCLICK ──
document.querySelectorAll('button').forEach(btn => {
  if (!btn.onclick) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }
});

// ── IMAGE ORIENTATION HANDLER ──
function applyImageOrientation() {
  const imgs = document.querySelectorAll('.gallery-item img');
  imgs.forEach(img => {
    function setClass() {
      if (!img.naturalWidth || !img.naturalHeight) return;
      img.classList.remove('portrait','landscape');
      if (img.naturalHeight > img.naturalWidth) img.classList.add('portrait');
      else img.classList.add('landscape');
    }

    if (img.complete) setClass();
    else img.addEventListener('load', setClass);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyImageOrientation();
  initLightbox();
});
window.addEventListener('resize', applyImageOrientation);

// ── LIGHTBOX / MODAL ──
function initLightbox() {
  if (document.querySelector('.lightbox-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
      <div class="lightbox-media"><img src="" alt="" /></div>
      <button class="lightbox-nav lightbox-next" aria-label="Next">›</button>
      <div class="lightbox-caption"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-media img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  let currentIndex = -1;
  let images = [];

  function gatherImages() {
    images = Array.from(document.querySelectorAll('.gallery-item img'));
  }

  function openAt(index) {
    if (!images.length) gatherImages();
    if (index < 0 || index >= images.length) return;
    const src = images[index].getAttribute('src');
    const alt = images[index].getAttribute('alt') || '';
    const label = images[index].closest('.gallery-item')?.querySelector('.item-label')?.textContent?.trim() || '';

    imgEl.src = src;
    imgEl.alt = alt;
    captionEl.textContent = label || alt;

    overlay.classList.add('open');
    currentIndex = index;
    document.documentElement.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('open');
    imgEl.src = '';
    captionEl.textContent = '';
    currentIndex = -1;
    document.documentElement.style.overflow = '';
  }

  function showNext() {
    if (currentIndex < images.length - 1) openAt(currentIndex + 1);
  }
  function showPrev() {
    if (currentIndex > 0) openAt(currentIndex - 1);
  }

  // Delegated click handler for gallery images
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.gallery-item img')) {
      gatherImages();
      const idx = images.indexOf(target);
      if (idx !== -1) openAt(idx);
    }
  });

  // Overlay close on background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

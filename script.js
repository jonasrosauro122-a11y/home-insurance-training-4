// Minimal interactive scripts:
// - IntersectionObserver reveal animations
// - Parallax transform for hero device
// - Nav hide/show small effect
// - Year in footer

(() => {
  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal, .reveal-hero');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // once revealed we can unobserve to save work
        io.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  revealElements.forEach(el => io.observe(el));

  // Parallax for hero media
  const device = document.querySelector('.device-mockup');
  if (device) {
    // gentle parallax on scroll
    window.addEventListener('scroll', () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const h = window.innerHeight;
      // factor from -1..1
      const factor = (rect.top - h/2) / (h);
      // translate slightly
      const translateY = Math.max(-20, Math.min(20, factor * 40));
      device.style.transform = `translateY(${translateY}px)`;
    }, {passive:true});
  }

  // Nav look change on scroll
  const nav = document.querySelector('.top-nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    lastScroll = y;
  }, {passive:true});

  // Mobile menu toggle (simple)
  const menuBtn = document.querySelector('.menu-btn');
  menuBtn && menuBtn.addEventListener('click', () => {
    // For now, simple feedback animation (future: open drawer)
    menuBtn.classList.toggle('open');
    menuBtn.setAttribute('aria-pressed', menuBtn.classList.contains('open'));
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();


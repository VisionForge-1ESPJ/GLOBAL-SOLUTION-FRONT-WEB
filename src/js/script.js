(function () {
 
  /* ─── Scroll spy ─────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const sections = ['hero', 'tecnologia', 'plataforma', 'recursos', 'impacto', 'contato']
    .map(id => document.getElementById(id))
    .filter(Boolean);
 
  function setActive(id) {
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === id));
  }
 
  const spyObserver = new IntersectionObserver((entries) => {
    let best = null;
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
    });
    if (best) setActive(best.target.id || 'hero');
  }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] });
 
  sections.forEach(s => spyObserver.observe(s));
  navLinks.forEach(l => l.addEventListener('click', () => setActive(l.dataset.target)));
 
  /* ─── UTC clock ──────────────────────────────────────────── */
  const heroTs = document.getElementById('hero-ts');
  const footTs = document.getElementById('foot-ts');
 
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const d = new Date();
    const s = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + ' UTC';
    if (heroTs) heroTs.textContent = s;
    if (footTs) footTs.textContent = s + ' · –15.793 / –47.882';
  }
  tick();
  setInterval(tick, 1000);
 
  /* ─── Mobile nav ─────────────────────────────────────────── */
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');
 
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    });
 
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }
 
  /* ─── Scroll reveal ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
 
  // Stagger: add data-reveal + stagger delay to each child
  document.querySelectorAll('[data-stagger]').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--reveal-delay', `${i * 90}ms`);
    });
  });
 
  // Observe all [data-reveal] elements
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
 
  /* ─── Counter animation ──────────────────────────────────── */
  function animateCounter(el) {
    const unitSpan = el.querySelector('.u');
    const unitHTML = unitSpan ? unitSpan.outerHTML : '';
 
    let rawNum = '';
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) rawNum += node.textContent.trim();
    });
 
    const negative = rawNum.includes('–') || rawNum.includes('-');
    const numStr = rawNum.replace(/[–\-]/g, '');
    const target = parseFloat(numStr);
    if (isNaN(target)) return;
 
    const hasDecimal = numStr.includes('.');
    const duration = 1600;
    const startTime = performance.now();
 
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease out quart
      const current = target * eased;
      const formatted = hasDecimal ? current.toFixed(1) : Math.round(current).toString();
      el.innerHTML = (negative ? '–' : '') + formatted + unitHTML;
      if (progress < 1) requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);
  }
 
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
 
  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
 
  /* ─── Form submit ────────────────────────────────────────── */
  const form = document.getElementById('cta-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      btn.innerHTML = 'Enviado ✓';
      form.classList.add('submitted');
    });
  }
 
})();
 
RoutetransparentecontenteAnimationcontente
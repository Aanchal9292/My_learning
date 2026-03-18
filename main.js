/* ============================================================
   AANCHAL PORTFOLIO — main.js
   ============================================================ */

/* ── 1. CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (!cursor || !ring) return;

  let mx = 0, my = 0;   // mouse position
  let rx = 0, ry = 0;   // ring position (lagged)

  // Move dot instantly
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Smoothly follow with ring
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow cursor on hover over interactive elements
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('large');
      ring.classList.add('large');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('large');
      ring.classList.remove('large');
    });
  });
})();


/* ── 2. NAVBAR — add glass background on scroll ── */
(function initNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
})();


/* ── 3. SKILL BARS — animate width when section scrolls into view ── */
(function initSkillBars() {
  const container = document.querySelector('.skills-container');
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Set each bar's width to its data-pct value
      entry.target.querySelectorAll('.skill-bar').forEach((bar) => {
        const pct = bar.getAttribute('data-pct') || '0';
        bar.style.width = pct + '%';
      });

      // Stop observing once animated
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  observer.observe(container);
})();


/* ── 4. EDUCATION TIMELINE — staggered slide-in animation ── */
(function initEduTimeline() {
  const items = document.querySelectorAll('.edu-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (!entry.isIntersecting) return;
      // Stagger each item by 150ms
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 150);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  items.forEach((item) => observer.observe(item));
})();


/* ── 5. SKILL CARDS — mouse-tracking glow spotlight ── */
(function initSkillCardGlow() {
  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();


/* ── 6. SMOOTH SCROLL — for nav links (fallback) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


/* ── 7. ACTIVE NAV LINK — highlight current section ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.style.color = link.getAttribute('href') === '#' + id
          ? 'var(--accent)'
          : '';
      });
    });
  }, { threshold: 0.4 });

  sections.forEach((sec) => observer.observe(sec));
})();
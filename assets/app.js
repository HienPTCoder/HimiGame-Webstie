const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.game-card').forEach((card, index) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('filtered-out', !show);
    if (show) card.style.setProperty('--filter-delay', `${index * 70}ms`);
  });
}));

document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-6px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

const modal = document.querySelector('#demo-modal');
const openModal = () => { if (!modal) return; modal.hidden = false; requestAnimationFrame(() => modal.classList.add('open')); document.body.style.overflow = 'hidden'; };
const closeModal = () => { if (!modal) return; modal.classList.remove('open'); setTimeout(() => { modal.hidden = true; }, 250); document.body.style.overflow = ''; };
document.querySelector('#watch-demo')?.addEventListener('click', openModal);
modal?.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

document.querySelectorAll('.to-top').forEach(button => button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

const policyLinks = [...document.querySelectorAll('.policy-aside a')];
if (policyLinks.length) {
  const sections = policyLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const policyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        policyLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach(section => policyObserver.observe(section));
}

const canvas = document.querySelector('#particles');
if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.min(55, Math.floor(window.innerWidth / 24)) }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.25 + .25, v: Math.random() * .18 + .04, a: Math.random() * .5 + .15
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach(p => {
      p.y -= p.v; if (p.y < -4) p.y = window.innerHeight + 4;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(138, 220, 255, ${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); draw(); window.addEventListener('resize', resize);
}

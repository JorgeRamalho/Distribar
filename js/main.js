/* Distribar — Main interactions */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActiveNav();
  initContactForm();
  initMarcasMarquee();
  initScrollGradient();
  initCardapio();
});

/* Navbar scroll effect */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile menu toggle */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

/* Scroll reveal animation */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.sobre__card, .produto-card, .contato__card, .diferenciais__content, .diferenciais__visual, .section__header'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* Active nav link on scroll */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* Contact form */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    showToast(`Obrigado, ${nome}! Recebemos sua mensagem. 🍻`);

    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* Duplicate marquee items for seamless infinite scroll */
function initMarcasMarquee() {
  const track = document.getElementById('marcasTrack');
  if (!track) return;

  track.querySelectorAll('.marca-badge').forEach(badge => {
    const copy = badge.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  });
}

/* Scroll: verão amarelo → laranja → vermelho */
function initScrollGradient() {
  const root = document.documentElement;
  const maxScroll = 700;

  const palette = {
    grad: [
      ['#FFD93D', '#FFB703'],
      ['#FF6B35', '#F77F00'],
      ['#E63946', '#D62828']
    ],
    hero: [
      ['#FFFFFF', '#FFFFFF'],
      ['#FFFBF5', '#FFF8F0'],
      ['#FFF5EB', '#FFEDE0']
    ],
    orbs: [
      ['#FFD93D', '#FFB703'],
      ['#FF6B35', '#F77F00'],
      ['#E63946', '#C1121F']
    ],
    section: ['#FFF8F0', '#FFF5EB'],
    accent: ['#FF6B35', '#E63946']
  };

  const lerp = (a, b, t) => Math.round(a + (b - a) * t);

  const lerpHex = (from, to, t) => {
    const f = parseInt(from.slice(1), 16);
    const e = parseInt(to.slice(1), 16);
    const r = lerp(f >> 16, e >> 16, t);
    const g = lerp((f >> 8) & 255, (e >> 8) & 255, t);
    const b = lerp(f & 255, e & 255, t);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const applyGradient = () => {
    const t = Math.min(window.scrollY / maxScroll, 1);
    const ease = t * t * (3 - 2 * t);

    const [g1, g2, g3] = palette.grad.map(([a, b]) => lerpHex(a, b, ease));
    const [h1, h2, h3] = palette.hero.map(([a, b]) => lerpHex(a, b, ease));
    const [o1, o2, o3] = palette.orbs.map(([a, b]) => lerpHex(a, b, ease));
    const sectionMid = lerpHex(palette.section[0], palette.section[1], ease);
    const accent = lerpHex(palette.accent[0], palette.accent[1], ease);

    root.style.setProperty('--grad-1', g1);
    root.style.setProperty('--grad-2', g2);
    root.style.setProperty('--grad-3', g3);
    root.style.setProperty('--gradient-brand', `linear-gradient(135deg, ${g1} 0%, ${g2} 50%, ${g3} 100%)`);
    root.style.setProperty('--hero-1', h1);
    root.style.setProperty('--hero-2', h2);
    root.style.setProperty('--hero-3', h3);
    root.style.setProperty('--gradient-hero', `linear-gradient(160deg, ${h1} 0%, ${h2} 40%, ${h3} 100%)`);
    root.style.setProperty('--orb-1', o1);
    root.style.setProperty('--orb-2', o2);
    root.style.setProperty('--orb-3', o3);
    root.style.setProperty('--section-mid', sectionMid);
    root.style.setProperty('--section-glow', sectionMid);
    root.style.setProperty('--accent-scroll', accent);
    root.style.setProperty('--scroll-progress', ease.toFixed(3));

    document.body.classList.toggle('theme-summer', ease > 0.4);
  };

  window.addEventListener('scroll', applyGradient, { passive: true });
  applyGradient();
}

/* Cardápio de bebidas */
function initCardapio() {
  const overlay = document.getElementById('cardapioOverlay');
  const openBtn = document.getElementById('openCardapio');
  const closeBtn = document.getElementById('closeCardapio');
  const pedidoBtn = document.getElementById('cardapioPedido');
  const subtotalEl = document.getElementById('cardapioSubtotal');
  const items = document.querySelectorAll('.cardapio-item');

  if (!overlay || !openBtn) return;

  const formatBRL = value =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const updateSubtotal = () => {
    let total = 0;
    items.forEach(item => {
      const qty = parseInt(item.querySelector('.cardapio-qty__value').textContent, 10);
      const price = parseFloat(item.dataset.price);
      total += qty * price;
      item.querySelector('.cardapio-qty__minus').disabled = qty === 0;
    });
    subtotalEl.textContent = formatBRL(total);
  };

  const changeQty = (item, delta) => {
    const valueEl = item.querySelector('.cardapio-qty__value');
    let qty = parseInt(valueEl.textContent, 10) + delta;
    if (qty < 0) qty = 0;
    if (qty > 99) qty = 99;
    valueEl.textContent = qty;
    updateSubtotal();
  };

  items.forEach(item => {
    item.querySelector('.cardapio-qty__plus').addEventListener('click', () => changeQty(item, 1));
    item.querySelector('.cardapio-qty__minus').addEventListener('click', () => changeQty(item, -1));
  });

  const resetCart = () => {
    items.forEach(item => {
      item.querySelector('.cardapio-qty__value').textContent = '0';
      item.querySelector('.cardapio-qty__minus').disabled = true;
    });
    updateSubtotal();
  };

  const open = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cardapio-open');
  };

  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cardapio-open');
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });
  pedidoBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });

  resetCart();
}

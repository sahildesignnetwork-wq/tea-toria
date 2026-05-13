import './styles/global.css';

// ── NAV ──
export function renderNav(activePage) {
  const pages = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu.html' },
    { name: 'Services', href: '/services.html' },
    { name: 'About', href: '/about.html' },
  ];

  const navLinks = pages
    .map(p => `<li><a href="${p.href}" class="${p.name === activePage ? 'active' : ''}">${p.name}</a></li>`)
    .join('');

  const mobileLinks = pages
    .map(p => `<a href="${p.href}" class="${p.name === activePage ? 'active' : ''}" onclick="closeMobileMenu()">${p.name}</a>`)
    .join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <a href="/" class="nav-logo">
        <img src="/images/tea-toria-logo-green.jpg" alt="Tea Toria" class="nav-logo-img" />
        <span>Tea Toria</span>
      </a>
      <ul class="nav-links">${navLinks}</ul>
      <a href="https://wa.me/916263126954" class="nav-order-btn">Order Now</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileLinks}
      <a href="https://wa.me/916263126954" style="color:var(--gold);font-weight:700;">📲 Order Now</a>
    </div>
  `);

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  window.closeMobileMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  };
}

// ── FOOTER ──
export function renderFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-logo"><img src="/images/tea-toria-logo-green.jpg" alt="Tea Toria" class="footer-logo-img" /> Tea Toria</div>
      <p class="footer-tagline">"Traditional Taste With Tandoor"</p>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/menu.html">Menu</a>
        <a href="/services.html">Services</a>
        <a href="/about.html">About</a>
      </div>
      <div class="footer-socials">
        <a href="https://wa.me/916263126954" aria-label="WhatsApp">💬</a>
        <a href="https://instagram.com/tea.toria" aria-label="Instagram">📷</a>
        <a href="#" aria-label="Facebook">📘</a>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} <span>Tea Toria</span> · Bhopal, India · All rights reserved</p>
    </div>
  `;
  document.body.appendChild(footer);
}

// ── WHATSAPP FAB ──
export function renderFab() {
  const fab = document.createElement('a');
  fab.href = 'https://wa.me/916263126954';
  fab.className = 'fab-wa';
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.setAttribute('aria-label', 'Chat on WhatsApp');
  fab.innerHTML = '💬';
  document.body.appendChild(fab);
}

// ── STATUS BADGE ──
export function renderStatusBadge(container) {
  const target = document.getElementById(container);
  if (!target) return;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  const h = ist.getHours();
  const m = ist.getMinutes();
  const mins = h * 60 + m;
  const isOpen = mins >= 630 && mins < 1350;

  target.innerHTML = `
    <div class="status-badge ${isOpen ? 'open' : 'closed'}">
      <div class="status-dot"></div>
      ${isOpen ? 'Open Now · Until 10:30 PM' : 'Closed · Opens at 10:30 AM'}
    </div>
  `;
}

// ── SCROLL REVEAL ──
export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ── INIT ──
export function initApp(activePage) {
  renderNav(activePage);
  renderFooter();
  renderFab();
  initScrollReveal();
}

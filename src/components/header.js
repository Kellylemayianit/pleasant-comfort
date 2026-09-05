/* ============================================================
   components/header.js — pure render function
   ============================================================ */

import { icon } from '../utilities/icons.js';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/rooms', label: 'Rooms & Rates' },
  { path: '/contact', label: 'Contact' }
];

export function renderHeader(activePath) {
  const navItem = (link, cls) =>
    `<a href="#${link.path}" class="${cls}${activePath === link.path ? ' is-active' : ''}">${link.label}</a>`;

  return `
    <header class="site-header" id="siteHeader">
      <div class="site-header__inner">
        <a href="#/" class="brand">
          <span class="brand__name">Pleasant Comfort</span>
          <span class="brand__sub">Guest House · Kimana</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${NAV_LINKS.map((l) => navItem(l, 'site-nav__link')).join('')}
        </nav>
        <div class="header-actions">
          <button class="cart-toggle" id="cartToggle" aria-label="Open cart">
            ${icon('bag')}
            <span class="cart-toggle__count" id="cartCount">0</span>
          </button>
          <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobileNav" aria-label="Mobile">
        ${NAV_LINKS.map((l) => navItem(l, 'mobile-nav__link')).join('')}
      </nav>
    </header>
  `;
}

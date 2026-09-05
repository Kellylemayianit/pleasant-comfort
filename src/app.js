/* ============================================================
   app.js — the kernel
   Route dispatch + ALL delegated event wiring. Pages and
   components only render markup with data-* attributes;
   every click/interaction is caught here via delegation on
   document, so listeners survive route swaps without ever
   being rebound per-page.
   ============================================================ */

import { initRouter, onRouteChange, getRoute } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderModalShell, closeModal } from './components/modal.js';
import { renderCartItems, renderCartFooter } from './components/cartPanel.js';
import { renderHomePage } from './pages/home.js';
import { renderRoomsPage } from './pages/rooms.js';
import { renderContactPage } from './pages/contact.js';
import { getProperty, getRooms } from './services/dataLoader.js';
import * as Cart from './utilities/booking.js';
import { waLink, buildBookingMessage, buildEventMessage } from './utilities/channelLinks.js';
import { $, $$, showToast } from './utilities/helpers.js';

const PAGES = {
  '/': renderHomePage,
  '/rooms': renderRoomsPage,
  '/contact': renderContactPage
};

const appEl = $('#app');
const headerSlot = $('#headerSlot');
const footerSlot = $('#footerSlot');

/* ── Cart UI sync ─────────────────────────────────────────── */

function syncCartBadge() {
  const badge = $('#cartCount');
  if (!badge) return;
  const qty = Cart.getTotalQty();
  badge.textContent = qty;
  badge.classList.toggle('is-visible', qty > 0);

  const bar = $('#mobileCartBar');
  const barSummary = $('#mobileCartSummary');
  if (bar) {
    bar.classList.toggle('is-visible', qty > 0);
    if (barSummary) barSummary.textContent = `${qty} room${qty !== 1 ? 's' : ''} selected`;
  }
  const fab = $('#fabWhatsapp');
  if (fab) fab.classList.toggle('has-mobile-bar', qty > 0);
}

function syncAddButtons() {
  $$('[data-room-id].btn-add-cart').forEach((btn) => {
    const id = btn.dataset.roomId;
    const item = Cart.getItem(id);
    if (item && item.qty > 0) {
      btn.textContent = `✓ In cart (${item.qty})`;
      btn.classList.add('is-added');
    } else {
      btn.textContent = 'Add to cart';
      btn.classList.remove('is-added');
    }
  });
}

function renderCartPanel() {
  const body = $('#cartPanelBody');
  const footer = $('#cartPanelFooter');
  if (!body || !footer) return;
  const items = Cart.getAll();
  body.innerHTML = renderCartItems(items);
  footer.innerHTML = renderCartFooter(Cart.getTotalPrice(), Cart.isEmpty());
}

function openCart() {
  $('#cartPanel')?.classList.add('is-open');
  $('#cartOverlay')?.classList.add('is-open');
  renderCartPanel();
}
function closeCart() {
  $('#cartPanel')?.classList.remove('is-open');
  $('#cartOverlay')?.classList.remove('is-open');
}

/* ── Page rendering ──────────────────────────────────────── */

async function renderPage(route) {
  const pageFn = PAGES[route.path] || PAGES['/'];
  await pageFn(appEl);
  // Rooms must be loaded into the cart catalogue on every route
  // (not just /rooms) so cart badge/qty math works app-wide.
  const rooms = await getRooms();
  Cart.setCatalogue(rooms);
  syncCartBadge();
  syncAddButtons();

  headerSlot.innerHTML = renderHeader(route.path);
  bindHeader();
  window.scrollTo(0, 0);
}

function bindHeader() {
  const nav = $('#siteHeader');
  const toggle = $('#navToggle');
  const mobileMenu = $('#mobileNav');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
    });
  }
  $('#cartToggle')?.addEventListener('click', openCart);
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });
}

/* ── Delegated events (bound once, survive route changes) ──── */

function bindDelegatedEvents() {
  document.addEventListener('click', async (e) => {
    // Qty stepper
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const roomId = qtyBtn.dataset.roomId;
      const valueEl = $('#qty-' + roomId);
      const current = parseInt(valueEl?.textContent, 10) || 1;
      const next = qtyBtn.dataset.action === 'increase' ? current + 1 : Math.max(1, current - 1);
      if (valueEl) valueEl.textContent = next;
      return;
    }

    // Add to cart
    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn) {
      const roomId = addBtn.dataset.roomId;
      const qtyEl = $('#qty-' + roomId);
      const qty = parseInt(qtyEl?.textContent, 10) || 1;
      const rooms = await getRooms();
      const room = rooms.find((r) => r.id === roomId);
      Cart.addItem(roomId, qty);
      syncCartBadge();
      syncAddButtons();
      showToast(`${qty} × ${room?.name || 'Room'} added to cart`);
      if (Cart.getTotalQty() === qty) setTimeout(openCart, 500);
      return;
    }

    // Remove from cart (inside drawer)
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      Cart.removeItem(removeBtn.dataset.remove);
      renderCartPanel();
      syncCartBadge();
      syncAddButtons();
      showToast('Room removed from cart');
      return;
    }

    // Cart drawer open/close
    if (e.target.closest('#cartClose')) { closeCart(); return; }
    if (e.target.closest('#cartOverlay')) { closeCart(); return; }
    if (e.target.closest('#mobileCartBar')) { openCart(); return; }

    // Checkout via WhatsApp
    if (e.target.closest('#checkoutWhatsApp')) {
      if (Cart.isEmpty()) {
        showToast('Add a room before sending an enquiry');
        return;
      }
      const notes = $('#cartNotesInput')?.value || '';
      const message = buildBookingMessage(Cart.getAll(), notes, Cart.getTotalPrice());
      window.open(waLink(message), '_blank', 'noopener,noreferrer');
      return;
    }

    // Event / meeting enquiry buttons
    const eventBtn = e.target.closest('.event-enquiry-btn');
    if (eventBtn) {
      const message = buildEventMessage(eventBtn.dataset.eventKind);
      window.open(waLink(message), '_blank', 'noopener,noreferrer');
      return;
    }

    // Modal close
    if (e.target.closest('#modalClose') || e.target.id === 'modalOverlay') {
      closeModal();
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeModal();
    }
  });
}

/* ── Boot ─────────────────────────────────────────────────── */

async function boot() {
  // Static shell pieces that don't change per route.
  const modalMount = document.createElement('div');
  modalMount.innerHTML = renderModalShell();
  document.body.appendChild(modalMount.firstElementChild);

  bindDelegatedEvents();
  initRouter();
  onRouteChange(renderPage);

  const property = await getProperty();
  footerSlot.innerHTML = renderFooter(property);

  // Render immediately for the initial load too (initRouter fires
  // on DOMContentLoaded, but app.js may load after that event).
  await renderPage(getRoute());
}

boot();

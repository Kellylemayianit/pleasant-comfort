/* ============================================================
   components/cartPanel.js — pure render function for the
   cart drawer's inner content (items list + footer).
   The drawer chrome itself lives once in index.html; this
   function re-renders just the body/footer when the cart
   changes.
   ============================================================ */

import { formatKES } from '../utilities/helpers.js';

export function renderCartItems(cartItems) {
  const items = Object.values(cartItems);

  if (items.length === 0) {
    return `
      <div class="cart-empty" id="cartEmpty">
        <div class="cart-empty__icon">🧳</div>
        <p>Your cart is empty. Add a room to start a WhatsApp enquiry.</p>
      </div>
    `;
  }

  return `
    <ul id="cartItemsList">
      ${items
        .map(
          (item) => `
        <li class="cart-item" data-room-id="${item.roomId}">
          <div>
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__qty">${item.qty} room${item.qty !== 1 ? 's' : ''} × ${formatKES(item.price)}</div>
            <button class="cart-item__remove" data-remove="${item.roomId}">Remove</button>
          </div>
          <div class="cart-item__price">${formatKES(item.price * item.qty)}</div>
        </li>`
        )
        .join('')}
    </ul>
  `;
}

export function renderCartFooter(totalPrice, isEmpty) {
  if (isEmpty) return '';
  return `
    <div class="cart-notes">
      <label for="cartNotesInput">Anything we should know?</label>
      <textarea id="cartNotesInput" placeholder="e.g. arriving late, need airport pick-up..."></textarea>
    </div>
    <div class="cart-total" style="margin-top:1rem;">
      <span class="cart-total__label">Estimated total (1 night)</span>
      <span class="cart-total__amount" id="cartTotalDisplay">${formatKES(totalPrice)}</span>
    </div>
    <button class="btn btn-whatsapp btn-block" id="checkoutWhatsApp">Send enquiry on WhatsApp</button>
    <p class="cart-disclaimer">This sends your request via WhatsApp — availability and final price are confirmed by the guest house directly.</p>
  `;
}

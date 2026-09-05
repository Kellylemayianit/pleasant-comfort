/* ============================================================
   pages/rooms.js
   ============================================================ */

import { getRooms, getAddOns, getEventEnquiries } from '../services/dataLoader.js';
import { renderRoomCardFull } from '../components/roomCard.js';
import { renderEventCard } from '../components/eventCard.js';
import * as Cart from '../utilities/booking.js';

export async function renderRoomsPage(container) {
  const [rooms, addOns, events] = await Promise.all([getRooms(), getAddOns(), getEventEnquiries()]);
  Cart.setCatalogue(rooms);

  container.innerHTML = `
    <div class="how-it-works">
      <div class="container how-it-works__row">
        <span class="how-it-works__step"><span class="how-it-works__num">1</span> Choose your rooms</span>
        <span class="how-it-works__arrow">→</span>
        <span class="how-it-works__step"><span class="how-it-works__num">2</span> Add to cart</span>
        <span class="how-it-works__arrow">→</span>
        <span class="how-it-works__step"><span class="how-it-works__num">3</span> Send enquiry on WhatsApp</span>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h1>Rooms &amp; rates</h1>
          <p>Prices shown are per room, per night. Add what you need to the cart, then send it as one message — availability and final price are confirmed directly with the guest house.</p>
        </div>

        <div id="roomsList">
          ${rooms.map((room) => renderRoomCardFull(room, Cart.getItem(room.id)?.qty || 1)).join('')}
        </div>

        <div class="callout">
          <span class="callout__icon">ℹ️</span>
          <p><strong>Also available on request:</strong> ${addOns.join(' · ')}</p>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <div class="section-head">
          <h2>Planning something bigger?</h2>
          <p>A meeting stopover or a group heading to Amboseli together — tell us what you need.</p>
        </div>
        <div class="grid-2">
          ${events.map((e) => renderEventCard(e)).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ============================================================
   components/roomCard.js — pure render functions
   ============================================================ */

import { icon } from '../utilities/icons.js';
import { formatKES } from '../utilities/helpers.js';

/** Compact card — used in the home page preview grid */
export function renderRoomCardCompact(room) {
  return `
    <article class="room-card">
      <div class="room-card__image"><span class="glyph">${icon(room.icon, 34)}</span></div>
      <div class="room-card__body">
        <span class="room-card__type">${room.type}</span>
        <h3 class="room-card__name">${room.name}</h3>
        <p class="room-card__desc">${room.description}</p>
        <div class="room-card__footer">
          <div>
            <span class="room-card__price-amount">${formatKES(room.price)}</span>
            <span class="room-card__price-note">per room / night</span>
          </div>
          <a href="#/rooms" class="btn btn-outline btn-sm">View</a>
        </div>
      </div>
    </article>
  `;
}

/** Full card with quantity stepper + add-to-cart — used on the rooms page */
export function renderRoomCardFull(room, currentQty = 0) {
  return `
    <article class="room-card-full" data-room-id="${room.id}">
      <div class="room-card-full__image">
        <span class="glyph">${icon(room.icon, 48)}</span>
        <span class="caption">${room.size}</span>
      </div>
      <div class="room-card-full__body">
        <span class="room-card__type">${room.type}</span>
        <h3 style="margin-top:0.25rem;">${room.name}</h3>
        <p>${room.description}</p>
        <div class="room-feature-list">
          ${room.amenities.map((a) => `<span class="room-feature-item">${a}</span>`).join('')}
        </div>
        <div class="price-row">
          <span class="price-row__amount">${formatKES(room.price)}</span>
          <span class="price-row__per">per room / night</span>
        </div>
        <div class="qty-row">
          <span class="qty-row__label">Rooms</span>
          <span class="qty-stepper">
            <button class="btn-round qty-btn" data-room-id="${room.id}" data-action="decrease" aria-label="Decrease quantity">−</button>
            <span class="qty-row__value" id="qty-${room.id}">${currentQty || 1}</span>
            <button class="btn-round qty-btn" data-room-id="${room.id}" data-action="increase" aria-label="Increase quantity">+</button>
          </span>
        </div>
        <button class="btn btn-primary btn-block btn-add-cart" data-room-id="${room.id}">Add to cart</button>
      </div>
    </article>
  `;
}

/* ============================================================
   components/eventCard.js — pure render function
   ============================================================ */

import { icon } from '../utilities/icons.js';

export function renderEventCard(entry) {
  return `
    <article class="event-card">
      <div class="event-card__image">${icon(entry.icon, 40)}</div>
      <div class="event-card__body">
        <h3>${entry.title}</h3>
        <p>${entry.description}</p>
        <div class="event-card__features">
          ${entry.features.map((f) => `<span class="event-feature">${f}</span>`).join('')}
        </div>
        <button class="btn btn-whatsapp btn-block event-enquiry-btn" data-event-kind="${entry.id}">
          ${icon('whatsapp')} Enquire on WhatsApp
        </button>
      </div>
    </article>
  `;
}

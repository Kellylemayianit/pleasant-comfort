/* ============================================================
   components/modal.js
   Generic modal — the overlay/dialog chrome lives once in
   index.html (#modalOverlay / #modalBody). This module just
   fills it with content and toggles visibility, so any page
   can pop up a detail view without its own markup.
   ============================================================ */

import { $ } from '../utilities/helpers.js';
import { icon } from '../utilities/icons.js';

export function renderModalShell() {
  return `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal" role="dialog" aria-modal="true" id="modalDialog">
        <div class="modal__header">
          <div id="modalTitle" style="margin:0;"></div>
          <button class="modal__close" id="modalClose" aria-label="Close">${icon('close')}</button>
        </div>
        <div id="modalBody"></div>
      </div>
    </div>
  `;
}

export function openModal({ title = '', bodyHtml = '' } = {}) {
  const overlay = $('#modalOverlay');
  const titleEl = $('#modalTitle');
  const bodyEl = $('#modalBody');
  if (!overlay) return;
  if (titleEl) titleEl.innerHTML = title ? `<h3>${title}</h3>` : '';
  if (bodyEl) bodyEl.innerHTML = bodyHtml;
  overlay.classList.add('is-open');
}

export function closeModal() {
  const overlay = $('#modalOverlay');
  if (overlay) overlay.classList.remove('is-open');
}

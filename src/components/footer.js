/* ============================================================
   components/footer.js — pure render function
   ============================================================ */

import { CONTACT } from '../utilities/channelLinks.js';

export function renderFooter(property) {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand__name">Pleasant Comfort</div>
            <p class="footer-brand__desc">${property.location}. A small, family-run stopover on the way to Amboseli.</p>
          </div>
          <div>
            <div class="footer-col__title">EXPLORE</div>
            <div class="footer-col__list">
              <a href="#/">Home</a>
              <a href="#/rooms">Rooms &amp; rates</a>
              <a href="#/contact">Contact</a>
            </div>
          </div>
          <div>
            <div class="footer-col__title">REACH US</div>
            <div class="footer-col__list">
              <a href="tel:+${CONTACT.phoneIntl}">${CONTACT.phoneDisplay}</a>
              <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
              <a href="${property.contact.mapsUrl}" target="_blank" rel="noopener">View on Google Maps</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} Pleasant Comfort Guest House</span>
          <span>Prototype site — content pending owner review</span>
        </div>
      </div>
    </footer>
  `;
}

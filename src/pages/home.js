/* ============================================================
   pages/home.js
   ============================================================ */

import { getProperty, getFeatures, getRooms } from '../services/dataLoader.js';
import { renderHero, renderFeaturesStrip } from '../components/hero.js';
import { renderRoomCardCompact } from '../components/roomCard.js';
import { icon } from '../utilities/icons.js';

export async function renderHomePage(container) {
  const [property, features, rooms] = await Promise.all([getProperty(), getFeatures(), getRooms()]);

  container.innerHTML = `
    ${renderHero(property)}
    ${renderFeaturesStrip(features)}

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="tag">${icon('pin', 14)} Kimana, Kajiado County</span>
          <h2 style="margin-top:0.6rem;">Rooms, kept simple</h2>
          <p>${property.about[1]}</p>
        </div>
        <div class="grid-3">
          ${rooms.map((room) => renderRoomCardCompact(room)).join('')}
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <div class="grid-2" style="align-items:center;">
          <div>
            <h2>Easy to find, easy to reach</h2>
            <div class="rule"></div>
            <p>Look for the pink building just off the main road through Kimana town — a landmark guests mention finding without trouble.</p>
            <ul style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem;">
              ${property.distances
                .map(
                  (d) => `
                <li style="display:flex;justify-content:space-between;max-width:340px;font-size:0.9rem;color:var(--ink-soft);border-bottom:1px solid rgba(42,33,29,0.08);padding-bottom:0.5rem;">
                  <span>${d.label}</span><strong style="color:var(--rose-deep);">${d.value}</strong>
                </li>`
                )
                .join('')}
            </ul>
            <a href="#/contact" class="btn btn-outline" style="margin-top:1.5rem;">Get directions</a>
          </div>
          <div class="hero__visual" style="min-height:260px;">
            <div class="hero__visual-mark">
              <span class="glyph">📍</span>
              <span>2 minutes from Kimana town centre</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" style="text-align:center;">
        <h2>Planning to stop over?</h2>
        <p style="margin-inline:auto;">Send us your dates on WhatsApp and we'll confirm a room the same day.</p>
        <a href="#/rooms" class="btn btn-primary" style="margin-top:0.75rem;">See rooms &amp; rates</a>
      </div>
    </section>
  `;
}

/* ============================================================
   components/hero.js — pure render functions
   ============================================================ */

import { icon } from '../utilities/icons.js';

export function renderHero(property) {
  return `
    <section class="hero">
      <div class="hero__content">
        <p class="hero__kicker">Kimana · on the road to Amboseli</p>
        <h1 class="hero__title">${property.tagline}</h1>
        <p class="hero__desc">${property.about[0]}</p>
        <div class="hero__cta">
          <a href="#/rooms" class="btn btn-primary">See rooms &amp; rates</a>
          <a href="#/contact" class="btn btn-outline">Get directions</a>
        </div>
      </div>
      <div class="hero__visual">
        <div class="hero__visual-mark">
          <span class="glyph">🏡</span>
          <span>The pink building by the roadside</span>
        </div>
        <div class="hero__badge">
          ${icon('shield')}
          <div>
            <strong>Front desk staffed 24 hours</strong>
            <span>Late arrival on the Amboseli road? No problem.</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFeaturesStrip(features) {
  return `
    <div class="features-strip">
      <div class="container features-strip__grid">
        ${features
          .map(
            (f) => `
          <div class="feature-item">
            <span class="feature-item__icon">${icon(f.icon)}</span>
            <span>${f.label}</span>
          </div>`
          )
          .join('')}
      </div>
    </div>
  `;
}

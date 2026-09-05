/* ============================================================
   pages/contact.js
   ============================================================ */

import { getProperty } from '../services/dataLoader.js';
import { CONTACT, waLink, telLink, mailtoLink } from '../utilities/channelLinks.js';
import { icon } from '../utilities/icons.js';

export async function renderContactPage(container) {
  const property = await getProperty();
  const generalWaMessage = `Hello Pleasant Comfort Guest House, I'd like to ask about a room. Could you share availability?`;

  container.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="section-head">
          <h1>Get in touch</h1>
          <p>${property.location}. Reception is staffed around the clock, so reach out any time.</p>
        </div>

        <div class="contact-grid">
          <div>
            <div class="contact-channel">
              <span class="contact-channel__icon">${icon('whatsapp')}</span>
              <div>
                <div class="contact-channel__label">WhatsApp</div>
                <div class="contact-channel__value">${CONTACT.phoneDisplay}</div>
                <a href="${waLink(generalWaMessage)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="margin-top:0.6rem;">Message us</a>
              </div>
            </div>
            <div class="contact-channel">
              <span class="contact-channel__icon">${icon('phone')}</span>
              <div>
                <div class="contact-channel__label">Call</div>
                <div class="contact-channel__value">${CONTACT.phoneDisplay}</div>
                <a href="${telLink()}" class="btn btn-outline btn-sm" style="margin-top:0.6rem;">Call now</a>
              </div>
            </div>
            <div class="contact-channel">
              <span class="contact-channel__icon">${icon('mail')}</span>
              <div>
                <div class="contact-channel__label">Email</div>
                <div class="contact-channel__value">${CONTACT.email}</div>
                <a href="${mailtoLink('Room enquiry', 'Hello, I would like to ask about a room...')}" class="btn btn-outline btn-sm" style="margin-top:0.6rem;">Send email</a>
              </div>
            </div>
            <div class="contact-channel" style="border-bottom:none;">
              <span class="contact-channel__icon">${icon('clock')}</span>
              <div>
                <div class="contact-channel__label">Front desk hours</div>
                <div class="contact-channel__value">${property.contact.hours}</div>
              </div>
            </div>
          </div>

          <div>
            <div class="hero__visual" style="min-height:220px;">
              <div class="hero__visual-mark">
                <span class="glyph">${icon('pin', 40)}</span>
                <span>${property.location}</span>
              </div>
            </div>
            <a href="${property.contact.mapsUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-block" style="margin-top:1rem;">Open in Google Maps</a>

            <h3 style="margin-top:2rem;">Good to know</h3>
            <ul style="display:flex;flex-direction:column;gap:0.5rem;">
              ${property.policies.map((p) => `<li style="font-size:0.88rem;color:var(--ink-soft);">• ${p}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

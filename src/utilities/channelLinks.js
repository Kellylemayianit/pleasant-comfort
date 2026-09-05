/* ============================================================
   utilities/channelLinks.js
   Builds wa.me / tel: / mailto: links. Every checkout path,
   the floating WhatsApp button, and the contact page all
   resolve to the SAME property contact — set once here.
   ============================================================ */

import { formatKES } from './helpers.js';

// Single source of truth for the property's contact details.
export const CONTACT = {
  phoneIntl: '254725153212',      // used for wa.me and tel: (no leading +)
  phoneDisplay: '+254 725 153 212',
  email: 'verombuthia2002@gmail.com'
};

export function waLink(message) {
  return `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${CONTACT.phoneIntl}`;
}

export function mailtoLink(subject, body) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  return `mailto:${CONTACT.email}${params.toString() ? '?' + params.toString() : ''}`;
}

function pad(n) { return String(n).padStart(2, '0'); }

function todayLabel() {
  const d = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]}, ${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const LINE = '─────────────────────────';
const DLINE = '═════════════════════════';

/**
 * Build the formatted WhatsApp booking-enquiry message from cart contents.
 * @param {Object} cartItems - result of Booking.getAll()
 * @param {string} notes - free-text special requests
 * @param {number} totalPrice
 */
export function buildBookingMessage(cartItems, notes, totalPrice) {
  const items = Object.values(cartItems);
  const totalRooms = items.reduce((sum, i) => sum + i.qty, 0);
  const lines = [];

  lines.push('*🏡 PLEASANT COMFORT GUEST HOUSE*');
  lines.push('_Kimana, Kajiado · Kenya_');
  lines.push(DLINE);
  lines.push('');
  lines.push('*📋 ROOM BOOKING ENQUIRY*');
  lines.push(`Date sent: ${todayLabel()}`);
  lines.push('');
  lines.push('*🛏️ SELECTED ROOMS*');
  lines.push(LINE);

  items.forEach((item, idx) => {
    const subtotal = item.price * item.qty;
    lines.push(`${idx + 1}. *${item.name}*`);
    lines.push(`   Qty: ${item.qty} room${item.qty !== 1 ? 's' : ''}`);
    lines.push(`   Rate: ${formatKES(item.price)} per room/night`);
    lines.push(`   Subtotal: ${formatKES(subtotal)}`);
    if (idx < items.length - 1) lines.push('');
  });

  lines.push('');
  lines.push(LINE);
  lines.push(`*Total rooms:* ${totalRooms}`);
  lines.push(`*Estimated total (1 night):* ${formatKES(totalPrice)}`);
  lines.push('');

  if (notes && notes.trim()) {
    lines.push('*✏️ SPECIAL REQUESTS*');
    lines.push(LINE);
    lines.push(notes.trim());
    lines.push('');
  }

  lines.push(DLINE);
  lines.push('_Please confirm availability and my_');
  lines.push('_check-in / check-out dates. Thank you!_ 🙏');

  return lines.join('\n');
}

export function buildEventMessage(kind) {
  const templates = {
    conference: [
      '*🎤 MEETING SPACE ENQUIRY*',
      '',
      'Hello Pleasant Comfort Guest House,',
      '',
      'I would like to enquire about your meeting space.',
      '',
      'Please share:',
      '• Available dates',
      '• Seating / group size options',
      '• Tea-break arrangements',
      '• WiFi availability',
      '',
      '_Sent via the Pleasant Comfort website_'
    ],
    event: [
      '*🎉 GROUP / CELEBRATION ENQUIRY*',
      '',
      'Hello Pleasant Comfort Guest House,',
      '',
      'I would like to enquire about a group stay / celebration.',
      '',
      'Please share:',
      '• Available dates & room block',
      '• Group size',
      '• Flexible check-in options',
      '• Pricing',
      '',
      '_Sent via the Pleasant Comfort website_'
    ]
  };
  return (templates[kind] || templates.event).join('\n');
}

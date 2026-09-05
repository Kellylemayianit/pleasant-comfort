/* ============================================================
   utilities/icons.js
   Shared inline-SVG icons, stroke-based, inherit currentColor.
   ============================================================ */

const base = (inner, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const icons = {
  wifi: (s) => base('<path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><path d="M12 19.5h.01"/>', s),
  parking: (s) => base('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 16V7h3.5a3 3 0 0 1 0 6H9"/>', s),
  shield: (s) => base('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9.5 12l1.8 1.8L15 10"/>', s),
  globe: (s) => base('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', s),
  bed: (s) => base('<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18v2M21 18v2"/><path d="M3 12V7a2 2 0 0 1 2-2h4v5"/>', s),
  bedDouble: (s) => base('<path d="M2 18v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M2 18v2M22 18v2"/><path d="M2 11V7a1 1 0 0 1 1-1h4v5M11 11V7a1 1 0 0 1 1-1h4v5"/>', s),
  home: (s) => base('<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-5h2v5h4a1 1 0 0 0 1-1v-9"/>', s),
  megaphone: (s) => base('<path d="M3 11v3a1 1 0 0 0 1 1h2l1 5h2l-1-5h3l7 4V6l-7 4H4a1 1 0 0 0-1 1z"/>', s),
  sparkles: (s) => base('<path d="M12 3l1.3 4.4L18 8.7l-4.7 1.3L12 15l-1.3-5-4.7-1.3 4.7-1.3z"/><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/>', s),
  pin: (s) => base('<path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/>', s),
  clock: (s) => base('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>', s),
  phone: (s) => base('<path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5v4a1 1 0 0 1-1.1 1A18 18 0 0 1 4 5.1 1 1 0 0 1 5 4z"/>', s),
  mail: (s) => base('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', s),
  whatsapp: (s = 22) => base('<path d="M7 17l-1.4 3.4L9 19a8 8 0 1 0-3.5-2.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5"/>', s),
  bag: (s) => base('<path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>', s),
  close: (s) => base('<path d="M6 6l12 12M18 6L6 18"/>', s)
};

export function icon(name, size) {
  const fn = icons[name];
  return fn ? fn(size) : '';
}

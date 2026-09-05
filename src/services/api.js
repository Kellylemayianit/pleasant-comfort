/* ============================================================
   services/api.js
   Thin async client. Every function resolves from mockData.js
   today. When a real backend exists, swap only the function
   BODIES below for fetch() calls — callers (dataLoader.js)
   never need to change.
   ============================================================ */

import { PROPERTY, FEATURES, ROOMS, ADD_ONS, EVENT_ENQUIRIES } from './mockData.js';

function resolveFast(value) {
  // Wrapped in a promise so call sites already await it,
  // ready for a real network call later.
  return Promise.resolve(value);
}

export function getProperty() {
  return resolveFast(PROPERTY);
}

export function getFeatures() {
  return resolveFast(FEATURES);
}

export function getRooms() {
  return resolveFast(ROOMS);
}

export function getRoomById(id) {
  return resolveFast(ROOMS.find((room) => room.id === id) || null);
}

export function getAddOns() {
  return resolveFast(ADD_ONS);
}

export function getEventEnquiries() {
  return resolveFast(EVENT_ENQUIRIES);
}

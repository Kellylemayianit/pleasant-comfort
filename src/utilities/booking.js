/* ============================================================
   utilities/booking.js
   Cart state management, backed by localStorage so it survives
   route changes and page reloads within the prototype.
   Room data is cached in-memory from dataLoader so cart items
   can carry name/price without re-fetching.
   ============================================================ */

const STORAGE_KEY = 'pleasantcomfort_cart';

let roomCatalogue = {}; // { [roomId]: { name, price, icon } } — set via setCatalogue()
let cartData = {};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cartData = raw ? JSON.parse(raw) : {};
  } catch (_) {
    cartData = {};
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
  } catch (_) { /* storage unavailable — ignore, cart still works in-memory */ }
}

load();

/** Call once rooms are fetched, so the cart can validate/enrich items */
export function setCatalogue(rooms) {
  roomCatalogue = {};
  rooms.forEach((room) => {
    roomCatalogue[room.id] = room;
  });
}

export function getAll() {
  return { ...cartData };
}

export function getItem(roomId) {
  return cartData[roomId] || null;
}

export function setQty(roomId, qty) {
  const room = roomCatalogue[roomId];
  if (!room) return;
  const safeQty = Math.max(0, parseInt(qty, 10) || 0);
  if (safeQty === 0) {
    delete cartData[roomId];
  } else {
    cartData[roomId] = { roomId, name: room.name, price: room.price, qty: safeQty };
  }
  save();
}

export function addItem(roomId, qty) {
  const current = cartData[roomId] ? cartData[roomId].qty : 0;
  setQty(roomId, current + qty);
}

export function removeItem(roomId) {
  setQty(roomId, 0);
}

export function clear() {
  cartData = {};
  save();
}

export function getTotalQty() {
  return Object.values(cartData).reduce((sum, item) => sum + item.qty, 0);
}

export function getTotalPrice() {
  return Object.values(cartData).reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function isEmpty() {
  return Object.keys(cartData).length === 0;
}

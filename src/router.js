/* ============================================================
   router.js
   Minimal hash-based router: parses location.hash, notifies
   subscribers on change. Deliberately hash-based (not the
   History API) so this SPA also runs straight off file://
   for prototype demos with no server involved.
   ============================================================ */

const DEFAULT_ROUTE = '/';
const listeners = [];

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || DEFAULT_ROUTE;
  const [path, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  return { path: path || DEFAULT_ROUTE, params };
}

export function getRoute() {
  return parseHash();
}

export function navigate(path) {
  window.location.hash = path;
}

export function onRouteChange(callback) {
  listeners.push(callback);
}

function notify() {
  const route = parseHash();
  listeners.forEach((cb) => cb(route));
}

export function initRouter() {
  window.addEventListener('hashchange', notify);
  window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) window.location.hash = DEFAULT_ROUTE;
    notify();
  });
}

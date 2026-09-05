/* ============================================================
   utilities/helpers.js
   DOM query/inject shortcuts, formatting, toast
   ============================================================ */

export const $ = (sel, scope = document) => scope.querySelector(sel);
export const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

/** Format a number as Kenyan Shillings, e.g. formatKES(2500) -> "KES 2,500" */
export function formatKES(amount) {
  return 'KES ' + Number(amount).toLocaleString('en-KE');
}

/** Inject HTML string into a container element */
export function render(container, html) {
  if (!container) return;
  container.innerHTML = html;
}

let toastTimer = null;

/** Show a brief toast message at the bottom of the screen */
export function showToast(message, duration = 2400) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), duration);
}

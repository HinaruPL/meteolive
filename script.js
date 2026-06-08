const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const statusEl = document.querySelector('[data-live-status]');
if (statusEl) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  statusEl.textContent = `Ostatnie odświeżenie widoku: ${formatter.format(now)}`;
}

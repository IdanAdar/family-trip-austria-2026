// Countdown
const target = new Date('2026-08-06T00:00:00').getTime();
function updateCountdown() {
  const now = Date.now();
  const diff = target - now;
  if (diff < 0) {
    document.getElementById('d').textContent = '0';
    document.getElementById('h').textContent = '0';
    document.getElementById('m').textContent = '0';
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('d').textContent = d;
  document.getElementById('h').textContent = h;
  document.getElementById('m').textContent = m;
}
updateCountdown();
setInterval(updateCountdown, 60000);

// Accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
    document.querySelectorAll('.accordion-btn span:last-child').forEach(s => s.textContent = '+');
    if (!isOpen) {
      content.classList.add('open');
      btn.querySelector('span:last-child').textContent = '−';
    }
  });
});

// Make overview region cards clickable to zoom map
const mapCards = document.querySelectorAll('#overview .region-card');
if (mapCards.length) {
  mapCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      mapCards.forEach(c => c.classList.remove('ring-2', 'ring-alpine-400'));
      card.classList.add('ring-2', 'ring-alpine-400');

      if (index === 0) {
        map.flyTo([48.11, 16.57], 12);
      } else if (index === 1) {
        map.flyTo([47.23, 11.87], 10);
      } else if (index === 2) {
        map.flyTo([47.34, 13.39], 10);
      }
    });
  });
}

// Map
const map = L.map('map').setView([47.4, 12.5], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
const places = [
  { name: 'וינה (שדה תעופה)', coords: [48.1103, 16.5697] },
  { name: 'Chalet Wildruh · צילר', coords: [47.233, 11.866] },
  { name: 'פלחאו', coords: [47.345, 13.392] },
  { name: 'Ellmi / Ellmau', coords: [47.51, 12.30] },
  { name: 'שוואץ', coords: [47.35, 11.71] },
  { name: 'קיצביל', coords: [47.45, 12.39] },
  { name: 'סברובסקי', coords: [47.30, 11.60] },
  { name: 'מפלי קרימל', coords: [47.21, 12.17] },
  { name: 'קרחון קיצשטיין', coords: [47.20, 12.68] },
];
places.forEach(p => {
  L.marker(p.coords).addTo(map).bindPopup(p.name);
});

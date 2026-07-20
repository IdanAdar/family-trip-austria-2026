// Countdown
const target = new Date('2026-08-06T00:00:00').getTime();
function updateCountdown() {
  const now = Date.now();
  const diff = target - now;
  if (diff < 0) {
    if (document.getElementById('d')) {
      document.getElementById('d').textContent = '0';
      document.getElementById('h').textContent = '0';
      document.getElementById('m').textContent = '0';
    }
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (document.getElementById('d')) {
    document.getElementById('d').textContent = d;
    document.getElementById('h').textContent = h;
    document.getElementById('m').textContent = m;
  }
}
updateCountdown();
setInterval(updateCountdown, 60000);

// Map
const mapEl = document.getElementById('map');
let map = null;
if (mapEl) {
  map = L.map('map').setView([47.4, 12.5], 7);
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
}

// Region cards – match by name text (works regardless of DOM/RTL order)
const mapCards = document.querySelectorAll('#overview .region-card');
if (mapCards.length && map) {
  mapCards.forEach(card => {
    card.addEventListener('click', () => {
      mapCards.forEach(c => c.classList.remove('ring-2', 'ring-alpine-400'));
      card.classList.add('ring-2', 'ring-alpine-400');

      const title = card.querySelector('h3')?.textContent || '';

      if (title.includes('טירול')) {
        map.flyTo([47.23, 11.87], 10);
      } else if (title.includes('זלצבורג')) {
        map.flyTo([47.34, 13.39], 10);
      } else if (title.includes('וינה')) {
        map.flyTo([48.11, 16.57], 12);
      }
    });
  });
}

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

// Places data
const allPlaces = [
  // Vienna
  { name: 'וינה (שדה תעופה)', coords: [48.1103, 16.5697], region: 'vienna' },

  // Tyrol
  { name: 'Chalet Wildruh', coords: [47.233, 11.866], region: 'tyrol' },
  { name: "Ellmi's Zauberwelt", coords: [47.51, 12.30], region: 'tyrol' },
  { name: 'מכרה הכסף (שוואץ)', coords: [47.35, 11.71], region: 'tyrol' },
  { name: 'Hexenwasser Söll', coords: [47.51, 12.19], region: 'tyrol' },
  { name: 'קיצביל', coords: [47.45, 12.39], region: 'tyrol' },
  { name: 'Swarovski Kristallwelten', coords: [47.30, 11.60], region: 'tyrol' },
  { name: 'Achensee', coords: [47.45, 11.72], region: 'tyrol' },
  { name: 'Spieljochbahn', coords: [47.25, 11.85], region: 'tyrol' },
  { name: 'Rosenalm', coords: [47.20, 11.85], region: 'tyrol' },
  { name: 'Ahornbahn / Mountopolis', coords: [47.17, 11.86], region: 'tyrol' },
  { name: 'Erlebnissennerei', coords: [47.18, 11.88], region: 'tyrol' },
  { name: 'Erlebnistherme Zillertal', coords: [47.28, 11.88], region: 'tyrol' },

  // Salzburg
  { name: 'פלחאו', coords: [47.345, 13.392], region: 'salzburg' },
  { name: 'מפלי קרימל', coords: [47.21, 12.17], region: 'salzburg' },
  { name: 'Salzburg Zoo', coords: [47.804, 13.052], region: 'salzburg' },
  { name: "Toni's Almspielplatz", coords: [47.39, 13.15], region: 'salzburg' },
  { name: 'Therme Amadé', coords: [47.34, 13.39], region: 'salzburg' },
  { name: "Flori's Path", coords: [47.35, 13.39], region: 'salzburg' },
  { name: 'Jägersee', coords: [47.22, 13.15], region: 'salzburg' },
  { name: 'Gosausee', coords: [47.54, 13.51], region: 'salzburg' },
  { name: 'קרחון קיצשטיינהורן', coords: [47.20, 12.68], region: 'salzburg' },
  { name: 'Hopsiland Planai', coords: [47.39, 13.69], region: 'salzburg' },
];

// Map
const mapEl = document.getElementById('map');
let map = null;
let markers = [];

if (mapEl) {
  map = L.map('map').setView([47.4, 12.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  function renderMarkers(filter = 'all') {
    // clear existing
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const filtered = filter === 'all'
      ? allPlaces
      : allPlaces.filter(p => p.region === filter);

    filtered.forEach(p => {
      const marker = L.marker(p.coords).addTo(map).bindPopup(p.name);
      markers.push(marker);
    });
  }

  renderMarkers('all');

  // Filter buttons
  document.querySelectorAll('[data-map-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-map-filter]').forEach(b => {
        b.classList.remove('bg-alpine-600', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-alpine-600', 'text-white');

      const filter = btn.getAttribute('data-map-filter');
      renderMarkers(filter);

      if (filter === 'tyrol') map.flyTo([47.30, 11.85], 9);
      else if (filter === 'salzburg') map.flyTo([47.35, 13.30], 9);
      else if (filter === 'vienna') map.flyTo([48.11, 16.57], 11);
      else map.flyTo([47.4, 12.5], 7);
    });
  });
}

// Region cards – match by name text
const mapCards = document.querySelectorAll('#overview .region-card');
if (mapCards.length && map) {
  mapCards.forEach(card => {
    card.addEventListener('click', () => {
      mapCards.forEach(c => c.classList.remove('ring-2', 'ring-alpine-400'));
      card.classList.add('ring-2', 'ring-alpine-400');

      const title = card.querySelector('h3')?.textContent || '';

      if (title.includes('טירול')) {
        map.flyTo([47.30, 11.85], 9);
        // also trigger tyrol filter if buttons exist
        const btn = document.querySelector('[data-map-filter="tyrol"]');
        if (btn) btn.click();
      } else if (title.includes('זלצבורג')) {
        map.flyTo([47.35, 13.30], 9);
        const btn = document.querySelector('[data-map-filter="salzburg"]');
        if (btn) btn.click();
      } else if (title.includes('וינה')) {
        map.flyTo([48.11, 16.57], 11);
        const btn = document.querySelector('[data-map-filter="vienna"]');
        if (btn) btn.click();
      }
    });
  });
}

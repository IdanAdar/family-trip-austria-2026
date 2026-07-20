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

// All places from the daily planner + key options
const allPlaces = [
  // ——— Vienna ———
  { name: 'וינה · שדה התעופה (NH)', coords: [48.1103, 16.5697] },
  { name: 'פראטר (Prater)', coords: [48.2167, 16.3958] },

  // ——— On the way to Tyrol ———
  { name: 'Motorikpark Ansfelden', coords: [48.212, 14.289] },
  { name: 'SEP / BILLA (Salzkammergut)', coords: [47.95, 13.65] },

  // ——— Tyrol / Zillertal ———
  { name: 'Chalet Wildruh', coords: [47.233, 11.866] },
  { name: "Ellmi's Zauberwelt", coords: [47.512, 12.303] },
  { name: 'Erlebnistherme Zillertal', coords: [47.283, 11.875] },
  { name: 'מכרה הכסף (שוואץ)', coords: [47.351, 11.708] },
  { name: 'DEZ Innsbruck + Smyths', coords: [47.263, 11.432] },
  { name: 'Hexenwasser Söll', coords: [47.505, 12.192] },
  { name: 'קיצביל (Kitzbühel)', coords: [47.447, 12.392] },
  { name: 'Swarovski Kristallwelten', coords: [47.294, 11.604] },
  { name: 'Achensee / Atoll', coords: [47.448, 11.722] },
  { name: 'Spieljochbahn', coords: [47.248, 11.852] },
  { name: 'Rosenalm + Arena Coaster', coords: [47.198, 11.848] },
  { name: 'Ahornbahn / Mountopolis', coords: [47.168, 11.863] },
  { name: 'Erlebnissennerei Zillertal', coords: [47.178, 11.885] },

  // ——— Transition day ———
  { name: 'מפלי קרימל', coords: [47.211, 12.172] },
  { name: 'Triassic Park', coords: [47.485, 12.545] },

  // ——— Salzburg region ———
  { name: 'פלחאו (Phantasia)', coords: [47.345, 13.392] },
  { name: 'Salzburg Zoo', coords: [47.804, 13.052] },
  { name: "Toni's Almspielplatz", coords: [47.392, 13.148] },
  { name: 'Therme Amadé', coords: [47.338, 13.395] },
  { name: "Flori's Path", coords: [47.352, 13.395] },
  { name: 'Jägersee', coords: [47.223, 13.155] },
  { name: 'Gosausee', coords: [47.538, 13.508] },
  { name: 'קרחון קיצשטיינהורן', coords: [47.198, 12.685] },
  { name: 'Hopsiland Planai', coords: [47.392, 13.688] },
];

// Map – start focused on Tyrol (matches default selected region card)
const mapEl = document.getElementById('map');
let map = null;

if (mapEl) {
  map = L.map('map').setView([47.30, 11.85], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  allPlaces.forEach(p => {
    L.marker(p.coords).addTo(map).bindPopup(`<strong>${p.name}</strong>`);
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
      } else if (title.includes('זלצבורג')) {
        map.flyTo([47.35, 13.30], 9);
      } else if (title.includes('וינה')) {
        map.flyTo([48.15, 16.40], 11);
      }
    });
  });
}

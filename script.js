// Countdown
const tripStart = new Date('2026-08-06T00:00:00').getTime();
const tripEnd = new Date('2026-08-24T00:00:00').getTime(); // after 23/8

function updateCountdown() {
  const now = Date.now();
  const el = document.getElementById('countdown');
  if (!el) return;

  // After the trip ends
  if (now >= tripEnd) {
    el.innerHTML = '<p class="text-2xl md:text-3xl font-bold">הטיול הסתיים 🏔️</p>';
    return;
  }

  // During the trip
  if (now >= tripStart) {
    el.innerHTML = '<p class="text-2xl md:text-3xl font-bold">הטיול התחיל! ✈️</p>';
    return;
  }

  // Before the trip – countdown
  const diff = tripStart - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const dEl = document.getElementById('d');
  const hEl = document.getElementById('h');
  const mEl = document.getElementById('m');

  // If the structure was replaced earlier, restore the number boxes
  if (!dEl || !hEl || !mEl) {
    el.innerHTML =
      '<div><div class="text-3xl font-bold" id="d">' + d + '</div><div class="text-xs opacity-90">ימים</div></div>' +
      '<div><div class="text-3xl font-bold" id="h">' + h + '</div><div class="text-xs opacity-90">שעות</div></div>' +
      '<div><div class="text-3xl font-bold" id="m">' + m + '</div><div class="text-xs opacity-90">דקות</div></div>';
    return;
  }

  dEl.textContent = d;
  hEl.textContent = h;
  mEl.textContent = m;
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
  { name: 'Harter Schleierwasserfall', coords: [47.28, 11.75] },
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
  { name: 'פלכאו (Phantasia)', coords: [47.345, 13.392] },
  { name: 'Salzburg Zoo', coords: [47.804, 13.052] },
  { name: 'Hopsiland Planai', coords: [47.392, 13.688] },
  { name: "Flori's Path", coords: [47.352, 13.395] },
  { name: 'Funspace Flachau', coords: [47.345, 13.39] },
  { name: 'טירת מאוטרנדורף', coords: [47.135, 13.678] },
  { name: 'Jägersee', coords: [47.223, 13.155] },
  { name: 'Gosausee', coords: [47.538, 13.508] },
  { name: 'קרחון קיצשטיינהורן', coords: [47.198, 12.685] },
  { name: "Toni's Almspielplatz", coords: [47.392, 13.148] },
  { name: 'Therme Amadé', coords: [47.338, 13.395] },
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
    const marker = L.marker(p.coords).addTo(map);
    const popupContent = `
      <strong>${p.name}</strong><br>
      <a href="https://www.google.com/maps/search/?api=1&query=${p.coords[0]},${p.coords[1]}" target="_blank" class="nav-btn gmaps text-xs inline-block mt-2">📍 Google Maps</a>
      <a href="https://waze.com/ul?ll=${p.coords[0]},${p.coords[1]}&navigate=yes" target="_blank" class="nav-btn text-xs inline-block mt-2">Waze</a>
    `;
    marker.bindPopup(popupContent);
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

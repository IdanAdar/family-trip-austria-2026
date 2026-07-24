/* Austria 2026 – render + map + countdown */

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"');
}

function mapsLinks(place) {
  let gHref, wHref;
  if (place.gmapsUrl) {
    gHref = place.gmapsUrl;
  } else if (place.gmaps) {
    gHref = `https://www.google.com/maps/search/?api=1&query=${place.gmaps}`;
  } else if (place.lat != null) {
    gHref = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
  }
  if (place.wazeQ) {
    wHref = `https://waze.com/ul?q=${place.wazeQ}&navigate=yes`;
  } else if (place.lat != null) {
    wHref = `https://waze.com/ul?ll=${place.lat},${place.lng}&navigate=yes`;
  }
  let html = '<div class="flex gap-2 mt-2 flex-wrap">';
  if (gHref) html += `<a class="nav-btn gmaps" href="${gHref}" target="_blank">📍 Google</a>`;
  if (wHref) html += `<a class="nav-btn" href="${wHref}" target="_blank">Waze</a>`;
  html += '</div>';
  return html;
}

function mapEmbed(place) {
  if (place.lat == null && !place.gmaps && !place.gmapsUrl) return '';
  let q;
  if (place.lat != null) q = `${place.lat},${place.lng}`;
  else if (place.gmaps) q = place.gmaps.replace(/\+/g, ' ');
  else return '';
  const z = place.zoom || 14;
  return `<iframe class="map-embed mt-2 rounded-lg" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${z}&output=embed&hl=he"></iframe>`;
}

function renderPlace(place) {
  const imgBlock = place.imgLink
    ? `<a href="${esc(place.imgLink)}" target="_blank"><img src="${esc(place.img)}" alt="${esc(place.title)}"></a>`
    : `<img src="${esc(place.img)}" alt="${esc(place.title)}">`;

  let body = `
    <h4 class="font-bold text-sm">${place.title}</h4>
    <p class="text-xs text-slate-600 mt-0.5">${place.desc || ''}</p>`;
  if (place.extraHtml) body += `<p class="text-xs text-slate-600 mt-1">${place.extraHtml}</p>`;
  body += mapEmbed(place);
  body += mapsLinks(place);
  if (place.checklist && place.checklist.length) {
    body += `<p class="text-xs font-semibold mt-3 mb-1">ציוד חובה:</p><ul class="text-xs text-slate-700 space-y-1">`;
    place.checklist.forEach(item => {
      body += `<li><input type="checkbox" class="mr-1"> ${esc(item)}</li>`;
    });
    body += `</ul>`;
  }

  return `<div class="place-card">${imgBlock}<div class="p-3">${body}</div></div>`;
}

function renderDay(day) {
  let headerInner = '';
  if (day.preview) {
    headerInner += `<img src="${esc(day.preview)}" class="preview-img" alt="${esc(day.key || '')}">`;
  }
  headerInner += `<div class="flex-1 text-right">${day.header}`;
  if (day.cardNote) headerInner += `<div class="card-note">${esc(day.cardNote)}</div>`;
  if (day.dayNote) headerInner += `<div class="day-note">${esc(day.dayNote)}</div>`;
  headerInner += `</div>`;

  let content = '';
  if (day.introHtml) content += `<p class="text-sm text-slate-600 mb-3">${day.introHtml}</p>`;

  if (day.places && day.places.length) {
    const cols = day.places.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
    content += `<div class="grid ${cols} gap-4">`;
    day.places.forEach(p => { content += renderPlace(p); });
    content += `</div>`;
  }

  if (day.footerHtml) {
    const fc = day.footerClass || 'text-slate-600';
    content += `<p class="text-sm ${fc} mt-3">${day.footerHtml}</p>`;
  }

  return `
    <div class="day-card bg-slate-50 rounded-xl border p-5">
      <button type="button" class="w-full text-right accordion-btn flex justify-between items-center font-bold mb-3 accordion-header">
        ${headerInner}
      </button>
      <div class="accordion-content">${content}</div>
    </div>`;
}

function renderItinerary() {
  const root = document.getElementById('itinerary-root');
  if (!root || !window.TRIP_DATA) return;
  const data = window.TRIP_DATA;
  let html = '<h2 class="text-3xl font-bold text-center mb-8">המסלול יום-יום</h2>';

  data.sections.forEach(sec => {
    html += `<h3 class="text-lg font-bold ${sec.titleClass || ''} mb-3">${sec.title}${sec.titleExtra || ''}</h3>`;
    if (sec.sectionNoteHtml) {
      html += `<p class="text-sm text-slate-600 mb-4">${sec.sectionNoteHtml}</p>`;
    }
    html += `<div class="space-y-6 mb-10">`;
    (sec.days || []).forEach(d => { html += renderDay(d); });
    html += `</div>`;
  });

  root.innerHTML = html;
  bindAccordions();
}

function renderCars() {
  const root = document.getElementById('cars-root');
  if (!root || !window.TRIP_DATA) return;
  const c = window.TRIP_DATA.cars;
  let html = '<h2 class="text-3xl font-bold text-center mb-8">🚗 רכבים (SIXT)</h2>';
  html += '<div class="grid md:grid-cols-2 gap-6">';
  c.options.forEach(o => {
    html += `
      <div class="bg-white rounded-2xl shadow p-6">
        <div class="text-xs font-bold ${o.labelClass} mb-2">${esc(o.label)}</div>
        <h3 class="font-bold text-lg mb-2">${esc(o.title)}</h3>
        <ul class="text-sm text-slate-700 space-y-1">
          <li><strong>הזמנה:</strong> ${esc(o.booking)}</li>
          <li><strong>איסוף:</strong> ${esc(o.pickup)}</li>
          <li><strong>החזרה:</strong> ${esc(o.return)}</li>
          <li><strong>מחיר:</strong> ${esc(o.price)}</li>
        </ul>
      </div>`;
  });
  html += '</div>';

  const b = c.branch;
  html += `
    <div class="mt-6 bg-white rounded-2xl shadow p-6 text-sm space-y-3">
      <h3 class="font-bold text-base mb-1">${esc(b.title)}</h3>
      <p class="text-slate-700"><strong>כתובת:</strong> ${esc(b.address)}</p>
      <p class="text-slate-700"><strong>מיקום:</strong> ${esc(b.location)}</p>
      <p class="text-slate-700"><strong>שעות:</strong> ${esc(b.hours)}</p>
      <p class="text-slate-700"><strong>אתר הסניף:</strong> <a href="${esc(b.site)}" target="_blank" class="text-alpine-600 underline">sixt.com – Vienna Airport</a></p>
      <p class="text-slate-700"><strong>ניווט:</strong>
        <a href="${esc(b.gmaps)}" target="_blank" class="text-alpine-600 underline">Google Maps</a> ·
        <a href="${esc(b.waze)}" target="_blank" class="text-alpine-600 underline">Waze</a>
      </p>
      <div class="bg-slate-50 rounded-xl p-4 text-slate-600">
        <p class="font-medium text-slate-800 mb-1">איך מגיעים לדלפק אחרי הנחיתה:</p>
        <p>${b.howto}</p>
        <p class="mt-2">${b.returnNote}</p>
      </div>
    </div>`;
  root.innerHTML = html;
}

function renderStays() {
  const root = document.getElementById('stays-root');
  if (!root || !window.TRIP_DATA) return;
  let html = '<h2 class="text-3xl font-bold text-center mb-8">לינה</h2><div class="grid md:grid-cols-1 gap-8">';
  window.TRIP_DATA.stays.forEach(s => {
    html += `
      <div class="stay-card bg-white rounded-2xl shadow overflow-hidden">
        <a href="${esc(s.link)}" target="_blank">
          <img src="${esc(s.img)}" alt="${esc(s.name)}" class="w-full h-48 object-cover">
        </a>
        <div class="${s.headerClass} text-white p-6">
          <h3 class="font-bold text-xl">${esc(s.name)}</h3>
          ${s.subtitle ? `<p class="text-sm opacity-90">${esc(s.subtitle)}</p>` : ''}
        </div>
        <div class="p-6 space-y-4 text-sm">`;
    if (s.blocks) {
      s.blocks.forEach(b => {
        html += `
          <div>
            <p class="font-semibold text-base mb-1">${esc(b.title)}</p>
            <p><strong>חדר:</strong> ${esc(b.room)}</p>
            <p><strong>מספר הזמנה:</strong> ${esc(b.booking)}</p>
          </div>`;
      });
    }
    if (s.status) html += `<p><strong>סטטוס:</strong> ${esc(s.status)}</p>`;
    if (s.payment) html += `<p class="${s.blocks ? 'pt-3 border-t' : ''}"><strong>תשלום:</strong> ${esc(s.payment)}</p>`;
    html += `<a href="${esc(s.link)}" target="_blank" class="inline-block text-alpine-600 underline">${esc(s.extraLinkText || 'אתר')}</a>`;
    html += `</div></div>`;
  });
  html += '</div>';
  root.innerHTML = html;
}

function renderPacking() {
  const root = document.getElementById('packing-root');
  if (!root || !window.TRIP_DATA) return;
  let html = '<h2 class="text-3xl font-bold text-center mb-8">ציוד + Checklist</h2><div class="grid md:grid-cols-3 gap-6 text-sm">';
  window.TRIP_DATA.packing.forEach(col => {
    html += `<div class="bg-white rounded-xl p-5 shadow-sm border"><h3 class="font-bold mb-3">${col.title}</h3><ul class="space-y-1">`;
    col.items.forEach(item => {
      html += `<li><input type="checkbox" class="mr-2"> ${esc(item)}</li>`;
    });
    html += `</ul></div>`;
  });
  html += '</div>';
  root.innerHTML = html;
}

function bindAccordions() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (!content || !content.classList.contains('accordion-content')) return;
      const isOpen = content.classList.contains('open');
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      if (!isOpen) content.classList.add('open');
    });
  });
}

/* Countdown */
const tripStart = new Date('2026-08-06T00:00:00').getTime();
const tripEnd = new Date('2026-08-24T00:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const el = document.getElementById('countdown');
  if (!el) return;
  if (now >= tripEnd) {
    el.innerHTML = '<p class="text-2xl md:text-3xl font-bold">הטיול הסתיים 🏔️</p>';
    return;
  }
  if (now >= tripStart) {
    el.innerHTML = '<p class="text-2xl md:text-3xl font-bold">הטיול התחיל! ✈️</p>';
    return;
  }
  const diff = tripStart - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const dEl = document.getElementById('d');
  const hEl = document.getElementById('h');
  const mEl = document.getElementById('m');
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

/* Region pills: bound independently of map so active toggle always works */
let mapInstance = null;

function bindRegionPills() {
  const cards = document.querySelectorAll('#region-pills .region-card');
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      cards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const title = (this.querySelector('h3') && this.querySelector('h3').textContent) || '';
      if (!mapInstance) return;
      if (title.indexOf('טירול') !== -1) mapInstance.flyTo([47.30, 11.85], 9);
      else if (title.indexOf('זלצבורג') !== -1) mapInstance.flyTo([47.35, 13.30], 9);
      else if (title.indexOf('וינה') !== -1) mapInstance.flyTo([48.15, 16.40], 11);
    });
  });
}

function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;
  mapInstance = L.map('map').setView([47.30, 11.85], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(mapInstance);

  const places = (window.TRIP_DATA && window.TRIP_DATA.mapPlaces) || [];
  places.forEach(p => {
    const marker = L.marker(p.coords).addTo(mapInstance);
    marker.bindPopup(`
      <div style="min-width:180px">
        <strong>${p.name}</strong><br><br>
        <a href="https://www.google.com/maps/search/?api=1&query=${p.coords[0]},${p.coords[1]}" target="_blank"
           style="display:inline-block;background:#eff6ff;color:#1d4ed8;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:13px;margin-right:8px">📍 Google Maps</a>
        <a href="https://waze.com/ul?ll=${p.coords[0]},${p.coords[1]}&navigate=yes" target="_blank"
           style="display:inline-block;background:#f1f5f9;color:#334155;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:13px">Waze</a>
      </div>`, { closeButton: true, offset: [0, -5] });
  });
}

function translatePage(lang) {
  const url = encodeURIComponent(window.location.href);
  window.open('https://translate.google.com/translate?sl=he&tl=' + lang + '&u=' + url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  renderItinerary();
  renderCars();
  renderStays();
  renderPacking();
  updateCountdown();
  setInterval(updateCountdown, 60000);
  bindRegionPills();
  initMap();

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
  }
});

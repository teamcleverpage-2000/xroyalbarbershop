document.addEventListener('DOMContentLoaded', function () {
  var c = websiteContent;

  // ── Nav ──────────────────────────────────────────────
  document.getElementById('nav-cta').href = c.boekingslink;

  // ── Hero ─────────────────────────────────────────────
  document.getElementById('hero-titel').textContent    = c.heroTitel;
  document.getElementById('hero-subtitel').textContent = c.heroSubtitel;
  document.getElementById('hero-cta').href             = c.boekingslink;

  // ── Voordelen ────────────────────────────────────────
  var vg = document.getElementById('voordelen-grid');
  c.voordelen.forEach(function (v, i) {
    var d = document.createElement('div');
    d.className = 'voordeel-item fade-in' + (i > 0 ? ' fd' + i : '');
    d.innerHTML = '<span class="voordeel-icoon">' + v.icoon + '</span><h3>' + v.titel + '</h3><p>' + v.tekst + '</p>';
    vg.appendChild(d);
  });

  // ── Over ons ─────────────────────────────────────────
  document.getElementById('over-ons-tekst').textContent = c.overOns;
  document.getElementById('over-ons-cta').href          = c.boekingslink;

  // ── Tarieven ─────────────────────────────────────────
  document.getElementById('tarieven-boek-link').href = c.boekingslink;
  renderTarieven(c.diensten);

  // ── Reviews ──────────────────────────────────────────
  var rg = document.getElementById('reviews-grid');
  c.reviews.forEach(function (r, i) {
    var sterren = '';
    for (var j = 0; j < r.sterren; j++) { sterren += '★'; }
    var card = document.createElement('div');
    card.className = 'review-card fade-in' + (i > 0 ? ' fd' + i : '');
    card.innerHTML =
      '<div class="review-top">' +
        '<div class="review-avatar">' + r.naam.charAt(0) + '</div>' +
        '<span class="review-naam">' + r.naam + '</span>' +
      '</div>' +
      '<div class="review-sterren">' + sterren + '</div>' +
      '<p class="review-tekst">' + r.tekst + '</p>' +
      '<div class="review-datum">' +
        '<svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
          '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>' +
          '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>' +
          '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>' +
          '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>' +
        '</svg>' +
        r.datum +
      '</div>';
    rg.appendChild(card);
  });
  document.getElementById('alle-reviews-link').href = c.googleReviewsLink;

  // ── Contact ──────────────────────────────────────────
  var adresLink = document.getElementById('adres-link');
  adresLink.textContent = c.adres;
  adresLink.href        = c.googleMapsLink;

  var telEl = document.getElementById('contact-tel');
  telEl.textContent = c.telefoonnummer;
  telEl.href        = 'tel:' + c.telefoonnummer.replace(/[^0-9+]/g, '');

  var emailEl = document.getElementById('contact-email');
  emailEl.textContent = c.email;
  emailEl.href        = 'mailto:' + c.email;

  document.getElementById('contact-cta').href = c.boekingslink;
  document.getElementById('contact-ig').href  = c.instagram;
  var tiktokEl = document.getElementById('contact-tiktok');
  if (tiktokEl) tiktokEl.href = c.tiktok;

  // ── Footer ───────────────────────────────────────────
  document.getElementById('footer-adres').textContent = c.adres;
  document.getElementById('footer-jaar').textContent  = new Date().getFullYear();

  // ── Sticky CTA ───────────────────────────────────────
  document.getElementById('sticky-afspraak').href = c.boekingslink;

  // ── Hamburger menu ───────────────────────────────────
  var toggle   = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  toggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // ── Nav scrolled shadow ──────────────────────────────
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Fade-in observer ─────────────────────────────────
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });

  // ── Start Sanity Integraties ─────────────────────────
  haalOpeningstijdenOp();
  haalLookbookOp();
  haalTarievenOp();
});

function renderTarieven(diensten) {
  var tb = document.getElementById('tarieven-body');
  if (!tb) return;
  tb.innerHTML = '';

  var dienstenLijst = Array.isArray(diensten) && diensten.length ? diensten : websiteContent.diensten;
  dienstenLijst.forEach(function (d) {
    var tr = document.createElement('tr');
    if (d.highlight) tr.className = 'vip-row';
    var badge = d.highlight ? '<span class="vip-badge">Meest gekozen</span>' : '';
    tr.innerHTML = '<td>' + (d.naam || '') + badge + '</td><td class="prijs">' + (d.prijs || '') + '</td>';
    tb.appendChild(tr);
  });
}

async function haalTarievenOp() {
  try {
    const data = await fetchSanityData('diensten');
    if (Array.isArray(data) && data.length) {
      renderTarieven(data);
      return;
    }
  } catch (error) {
    console.warn('Falling back to local tarieven content:', error);
  }
  renderTarieven(websiteContent.diensten);
}

// Sanity gegevens via Vercel API proxy met lokale fallback
const PROJECT_ID = 'pnnengxa';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

async function fetchSanityData(type) {
  let query;
  if (type === 'lookbook') {
    query = '*[_type == "lookbook"] | order(coalesce(volgorde, 999) asc, _createdAt asc){ "url": image.asset->url, title, volgorde }';
  } else if (type === 'openingstijden') {
    query = '*[_type == "openingstijd"] | order(coalesce(volgorde, 999) asc, _createdAt asc){dag, tijd, volgorde}';
  } else if (type === 'diensten') {
    query = '*[_type == "dienst"] | order(coalesce(volgorde, 999) asc, _createdAt asc){naam, prijs, highlight, volgorde}';
  } else {
    query = '*[_type == "salonInfo"][0]';
  }
  const proxyUrl = `/api/sanity?type=${type}`;
  const directUrl = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const proxyResponse = await fetch(proxyUrl, {
      headers: { Accept: 'application/json' }
    });
    if (proxyResponse.ok) {
      const proxyJson = await proxyResponse.json();
      if (proxyJson) return proxyJson;
    }
  } catch (error) {
    console.warn('Proxy endpoint unavailable, falling back to direct Sanity request:', error);
  }

  const directResponse = await fetch(directUrl, {
    headers: { Accept: 'application/json' }
  });
  if (!directResponse.ok) {
    throw new Error(`Direct Sanity request failed with status ${directResponse.status}`);
  }

  const directJson = await directResponse.json();
  return directJson.result || null;
}

function renderOpeningstijden(data) {
  const lijst = document.getElementById('openingstijden-lijst');
  if (!lijst) return;
  lijst.innerHTML = '';

  if (Array.isArray(data)) {
    if (data.length >= 7) {
      data.forEach(item => {
        const tijd = item.tijd || 'Gesloten';
        const dagNetjes = item.dag || '';
        lijst.innerHTML += `<li class="${tijd === 'Gesloten' ? 'dag-gesloten' : ''}"><span class="dag-naam">${dagNetjes}</span><span class="dag-tijd">${tijd}</span></li>`;
      });
      return;
    }

    const dagVolgorde = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
    const perDag = {};
    data.forEach(item => {
      if (item && item.dag) {
        perDag[item.dag] = item.tijd || 'Gesloten';
      }
    });
    dagVolgorde.forEach(dag => {
      const tijd = perDag[dag] || 'Gesloten';
      lijst.innerHTML += `<li class="${tijd === 'Gesloten' ? 'dag-gesloten' : ''}"><span class="dag-naam">${dag}</span><span class="dag-tijd">${tijd}</span></li>`;
    });
    return;
  }

  const dagen = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
  dagen.forEach(dag => {
    const tijd = data && data[dag] ? data[dag] : 'Gesloten';
    const dagNetjes = dag.charAt(0).toUpperCase() + dag.slice(1);
    lijst.innerHTML += `<li class="${tijd === 'Gesloten' ? 'dag-gesloten' : ''}"><span class="dag-naam">${dagNetjes}</span><span class="dag-tijd">${tijd}</span></li>`;
  });
}

function renderLookbook(items) {
  const grid = document.getElementById('lookbook-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const fotoUrls = Array.isArray(items)
    ? items.map(item => typeof item === 'string' ? item : item.bestand || item.url || '')
    : [];

  if (!fotoUrls.length) {
    grid.innerHTML = '<p>Nog geen foto\'s toegevoegd aan het lookbook.</p>';
    return;
  }

  fotoUrls.filter(Boolean).forEach((fotoUrl, index) => {
    const fotoHTML = `
      <div class="lookbook-item fade-in">
        <img src="${fotoUrl}" alt="Kapperslook ${index + 1}" class="lookbook-img" onerror="this.style.display='none'">
      </div>
    `;
    grid.innerHTML += fotoHTML;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
}

async function haalOpeningstijdenOp() {
  try {
    const data = await fetchSanityData('openingstijden');
    if (Array.isArray(data) && data.length) {
      renderOpeningstijden(data);
      return;
    }
  } catch (error) {
    console.warn('Falling back to local openingstijden content:', error);
  }
  const fallback = await fetchSanityData('content');
  renderOpeningstijden(fallback || websiteContent.openingstijden);
}

async function haalLookbookOp() {
  try {
    const data = await fetchSanityData('lookbook');
    if (Array.isArray(data) && data.length) {
      renderLookbook(data);
      return;
    }
  } catch (error) {
    console.warn('Falling back to local lookbook content:', error);
  }
  const fallback = await fetchSanityData('content');
  const fotos = fallback && fallback.fotos ? fallback.fotos : websiteContent.lookbook;
  renderLookbook(fotos);
}
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const statusEl = document.querySelector('[data-live-status]');
if (statusEl) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  statusEl.textContent = `Ostatnie odświeżenie widoku: ${formatter.format(now)}`;
}

const siteBaseUrl = 'https://meteolive.pl';
const currentPath = window.location.pathname;

const weatherCities = {
  'warszawa': ['Warszawa', 52.2297, 21.0122],
  'krakow': ['Kraków', 50.0647, 19.9450],
  'wroclaw': ['Wrocław', 51.1079, 17.0385],
  'poznan': ['Poznań', 52.4064, 16.9252],
  'gdansk': ['Gdańsk', 54.3520, 18.6466],
  'gdynia': ['Gdynia', 54.5189, 18.5305],
  'lodz': ['Łódź', 51.7592, 19.4560],
  'katowice': ['Katowice', 50.2649, 19.0238],
  'lublin': ['Lublin', 51.2465, 22.5684],
  'szczecin': ['Szczecin', 53.4285, 14.5528],
  'rzeszow': ['Rzeszów', 50.0413, 21.9990],
  'bialystok': ['Białystok', 53.1325, 23.1688],
  'bydgoszcz': ['Bydgoszcz', 53.1235, 18.0084],
  'torun': ['Toruń', 53.0138, 18.5984],
  'olsztyn': ['Olsztyn', 53.7784, 20.4801],
  'kielce': ['Kielce', 50.8661, 20.6286],
  'opole': ['Opole', 50.6751, 17.9213],
  'radom': ['Radom', 51.4027, 21.1471],
  'sosnowiec': ['Sosnowiec', 50.2863, 19.1041],
  'tarnow': ['Tarnów', 50.0121, 20.9858],
  'plock': ['Płock', 52.5468, 19.7064],
  'elblag': ['Elbląg', 54.1561, 19.4045],
  'walbrzych': ['Wałbrzych', 50.7714, 16.2843],
  'koszalin': ['Koszalin', 54.1944, 16.1722],
  'kalisz': ['Kalisz', 51.7611, 18.0910],
  'legnica': ['Legnica', 51.2070, 16.1553],
  'zielona-gora': ['Zielona Góra', 51.9355, 15.5062],
  'gorzow-wielkopolski': ['Gorzów Wielkopolski', 52.7368, 15.2288],
  'bielsko-biala': ['Bielsko-Biała', 49.8224, 19.0469],
  'gliwice': ['Gliwice', 50.2945, 18.6714],
  'czestochowa': ['Częstochowa', 50.8118, 19.1203]
};

const guideSchemas = {
  '/poradniki/jak-czytac-radar-opadow/': 'Jak czytać radar opadów?',
  '/poradniki/jak-sprawdzic-czy-bedzie-padac/': 'Jak sprawdzić, czy będzie padać?',
  '/poradniki/jak-sprawdzic-pogode-przed-podroza/': 'Jak sprawdzić pogodę przed podróżą?',
  '/poradniki/jak-sprawdzic-pogode-na-weekend/': 'Jak sprawdzić pogodę na weekend?',
  '/poradniki/kiedy-burza-jest-blisko/': 'Kiedy burza jest blisko?',
  '/poradniki/jak-zabezpieczyc-balkon-przed-wichura/': 'Jak zabezpieczyć balkon przed wichurą?',
  '/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/': 'Co oznaczają kolory na radarze pogodowym?',
  '/poradniki/jak-sprawdzic-czy-bedzie-burza/': 'Jak sprawdzić, czy będzie burza?',
  '/poradniki/jak-przygotowac-sie-na-burze/': 'Jak przygotować się na burzę?',
  '/poradniki/jak-sprawdzic-kierunek-wiatru/': 'Jak sprawdzić kierunek wiatru?',
  '/poradniki/jak-sprawdzic-silny-wiatr/': 'Jak sprawdzić silny wiatr?',
  '/poradniki/jak-przetrwac-upal/': 'Jak przetrwać upał?',
  '/poradniki/czym-rozni-sie-prognoza-od-radaru/': 'Czym różni się prognoza od radaru?',
  '/poradniki/co-oznaczaja-ostrzezenia-imgw/': 'Co oznaczają ostrzeżenia IMGW?'
};

function addJsonLd(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function buildSitePublisher() {
  return { '@type': 'Organization', name: 'MeteoLive', url: siteBaseUrl, logo: `${siteBaseUrl}/assets/favicon.svg` };
}

if (currentPath === '/poradniki/') {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Poradniki pogodowe',
    description: 'Proste poradniki pogodowe MeteoLive o radarach, opadach, burzach, wietrze, upale, podróży i ostrzeżeniach.',
    url: `${siteBaseUrl}/poradniki/`,
    publisher: buildSitePublisher(),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: Object.entries(guideSchemas).map(([path, name], index) => ({ '@type': 'ListItem', position: index + 1, name, url: `${siteBaseUrl}${path}` }))
    }
  });
}

if (guideSchemas[currentPath]) {
  const title = guideSchemas[currentPath];
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: `${title} — praktyczny poradnik pogodowy MeteoLive napisany prostym językiem.`,
    inLanguage: 'pl-PL',
    url: `${siteBaseUrl}${currentPath}`,
    mainEntityOfPage: `${siteBaseUrl}${currentPath}`,
    author: buildSitePublisher(),
    publisher: buildSitePublisher()
  });
}

const weatherCodeLabels = {
  clearsky: 'bezchmurnie', fair: 'pogodnie', partlycloudy: 'częściowe zachmurzenie', cloudy: 'pochmurno',
  lightrain: 'słaby deszcz', rain: 'deszcz', heavyrain: 'silny deszcz', lightsnow: 'słaby śnieg', snow: 'śnieg', heavysnow: 'silny śnieg',
  sleet: 'deszcz ze śniegiem', fog: 'mgła', lightrainshowers: 'przelotny słaby deszcz', rainshowers: 'przelotny deszcz', heavyrainshowers: 'silne przelotne opady',
  thunderstorm: 'burza', rainandthunder: 'deszcz i burza', heavyrainandthunder: 'silny deszcz i burza'
};

function injectForecastStyles() {
  if (document.getElementById('meteolive-forecast-styles')) return;
  const style = document.createElement('style');
  style.id = 'meteolive-forecast-styles';
  style.textContent = `
    .forecast-widget { margin-top: 0; }
    .forecast-header, .city-search-actions { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
    .forecast-current { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-metric, .forecast-hour, .forecast-day { border: 1px solid rgba(148, 163, 184, .18); border-radius: 18px; padding: 1rem; background: rgba(15, 23, 42, .42); }
    .forecast-metric strong { display: block; font-size: 1.45rem; margin-top: .25rem; color: #f8fafc; }
    .forecast-metric span, .forecast-hour span, .forecast-day span, .forecast-source, .city-search-help { color: #94a3b8; font-size: .9rem; }
    .forecast-hours { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-hour strong, .forecast-day strong { display: block; margin: .35rem 0; color: #f8fafc; }
    .forecast-source { margin-top: 1rem; }
    .forecast-error { border: 1px solid rgba(248, 113, 113, .35); background: rgba(127, 29, 29, .22); padding: 1rem; border-radius: 18px; }
    .city-search-box { margin-top: 1.5rem; }
    .city-search-form { display: grid; grid-template-columns: 1fr auto; gap: .75rem; margin-top: 1rem; }
    .city-search-form input { width: 100%; border: 1px solid rgba(148, 163, 184, .28); background: rgba(15, 23, 42, .72); color: #f8fafc; border-radius: 16px; padding: 1rem; font: inherit; }
    .city-search-form input::placeholder { color: #94a3b8; }
    .city-search-status { margin-top: .85rem; color: #cbd5e1; }
    .city-card-hidden { display: none !important; }
    @media (max-width: 1050px) { .forecast-days { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 800px) { .forecast-current, .forecast-hours { grid-template-columns: 1fr 1fr; } .forecast-header, .city-search-actions { display: block; } .city-search-form { grid-template-columns: 1fr; } }
    @media (max-width: 520px) { .forecast-current, .forecast-hours, .forecast-days { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(style);
}

function normalizeText(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
}

function cleanSymbolCode(symbol) {
  if (!symbol) return 'prognoza';
  return symbol.replace(/_(day|night|polartwilight)$/g, '');
}

function describeWeather(symbol) {
  const clean = cleanSymbolCode(symbol);
  return weatherCodeLabels[clean] || clean.replaceAll('_', ' ');
}

function getPrecipitation(block) {
  return block?.data?.next_1_hours?.details?.precipitation_amount ?? block?.data?.next_6_hours?.details?.precipitation_amount ?? 0;
}

function formatForecastTime(time) {
  return new Intl.DateTimeFormat('pl-PL', { weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(time));
}

function formatForecastDay(dateKey) {
  return new Intl.DateTimeFormat('pl-PL', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(new Date(`${dateKey}T12:00:00`));
}

function buildDailyForecast(timeseries) {
  const daily = {};
  timeseries.forEach((block) => {
    const date = new Date(block.time);
    const dateKey = date.toISOString().slice(0, 10);
    const hour = date.getUTCHours();
    const details = block.data.instant.details || {};
    const temp = details.air_temperature;
    const symbol = cleanSymbolCode(block.data.next_6_hours?.summary?.symbol_code || block.data.next_1_hours?.summary?.symbol_code || '');
    if (!Number.isFinite(temp)) return;
    if (!daily[dateKey]) daily[dateKey] = { min: temp, max: temp, precipitation: 0, symbols: {} };
    daily[dateKey].min = Math.min(daily[dateKey].min, temp);
    daily[dateKey].max = Math.max(daily[dateKey].max, temp);
    daily[dateKey].symbols[symbol] = (daily[dateKey].symbols[symbol] || 0) + 1;
    if (hour % 6 === 0) daily[dateKey].precipitation += block.data.next_6_hours?.details?.precipitation_amount ?? getPrecipitation(block);
  });
  return Object.entries(daily).slice(0, 7).map(([dateKey, value]) => {
    const dominantSymbol = Object.entries(value.symbols).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    return { dateKey, min: Math.round(value.min), max: Math.round(value.max), precipitation: value.precipitation, description: describeWeather(dominantSymbol) };
  });
}

function createForecastSection(cityName) {
  injectForecastStyles();
  const section = document.createElement('section');
  section.className = 'section forecast-widget';
  section.innerHTML = `<div class="container content-card" data-forecast-widget><div class="forecast-header"><div><span class="eyebrow"><span class="pulse"></span> Prognoza zewnętrzna</span><h2>Pogoda ${cityName} — prognoza</h2><p class="section-intro">Prognoza jest pobierana z MET Norway na podstawie współrzędnych miasta i zapisywana lokalnie w przeglądarce na około 60 minut.</p></div></div><p>Ładuję prognozę...</p></div>`;
  const hero = document.querySelector('.hero');
  if (hero?.parentNode) hero.parentNode.insertBefore(section, hero.nextSibling);
  return section.querySelector('[data-forecast-widget]');
}

function renderForecast(container, cityName, data) {
  const timeseries = data?.properties?.timeseries || [];
  if (!timeseries.length) throw new Error('Brak danych prognozy');
  const nowBlock = timeseries[0];
  const details = nowBlock.data.instant.details || {};
  const symbol = nowBlock.data.next_1_hours?.summary?.symbol_code || nowBlock.data.next_6_hours?.summary?.symbol_code || '';
  const nextBlocks = timeseries.slice(0, 4);
  const dailyForecast = buildDailyForecast(timeseries);
  const updatedAt = new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date());
  container.innerHTML = `<div class="forecast-header"><div><span class="eyebrow"><span class="pulse"></span> Prognoza zewnętrzna</span><h2>Pogoda ${cityName} — teraz i kolejne dni</h2><p class="section-intro">Dane orientacyjne dla współrzędnych miasta. Przy groźnej pogodzie sprawdzaj też oficjalne ostrzeżenia IMGW-PIB.</p></div><p class="notice">Aktualizacja widoku: ${updatedAt}</p></div><div class="forecast-current"><div class="forecast-metric"><span>Temperatura</span><strong>${Math.round(details.air_temperature)}°C</strong></div><div class="forecast-metric"><span>Warunki</span><strong>${describeWeather(symbol)}</strong></div><div class="forecast-metric"><span>Wiatr</span><strong>${Math.round(details.wind_speed || 0)} m/s</strong></div><div class="forecast-metric"><span>Opad</span><strong>${getPrecipitation(nowBlock).toFixed(1)} mm</strong></div></div><h3>Prognoza godzinowa</h3><div class="forecast-hours">${nextBlocks.map((block) => { const itemDetails = block.data.instant.details || {}; const itemSymbol = block.data.next_1_hours?.summary?.symbol_code || block.data.next_6_hours?.summary?.symbol_code || ''; return `<div class="forecast-hour"><span>${formatForecastTime(block.time)}</span><strong>${Math.round(itemDetails.air_temperature)}°C</strong><p>${describeWeather(itemSymbol)}</p><span>Wiatr: ${Math.round(itemDetails.wind_speed || 0)} m/s · Opad: ${getPrecipitation(block).toFixed(1)} mm</span></div>`; }).join('')}</div><h3>Prognoza na kolejne dni</h3><div class="forecast-days">${dailyForecast.map((day) => `<div class="forecast-day"><span>${formatForecastDay(day.dateKey)}</span><strong>${day.min}°C / ${day.max}°C</strong><p>${day.description}</p><span>Opad: ${day.precipitation.toFixed(1)} mm</span></div>`).join('')}</div><p class="forecast-source">Dalsza prognoza jest orientacyjna i może się zmieniać. Źródło prognozy: <a href="https://api.met.no/" rel="nofollow noopener">MET Norway / api.met.no</a>. MeteoLive nie jest oficjalnym serwisem ostrzeżeń — komunikaty bezpieczeństwa sprawdzaj w IMGW-PIB.</p>`;
}

async function loadCityForecast() {
  const match = currentPath.match(/^\/pogoda\/([^/]+)\/$/);
  if (!match) return;
  const slug = match[1];
  const city = weatherCities[slug];
  if (!city) return;
  const [cityName, lat, lon] = city;
  const container = createForecastSection(cityName);
  const cacheKey = `meteolive_forecast_${slug}_v2`;
  const maxAgeMs = 60 * 60 * 1000;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.savedAt < maxAgeMs) { renderForecast(container, cityName, cached.data); return; }
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error(`MET Norway API error: ${response.status}`);
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data }));
    renderForecast(container, cityName, data);
  } catch (error) {
    container.innerHTML = `<h2>Pogoda ${cityName} — prognoza chwilowo niedostępna</h2><div class="forecast-error"><p>Nie udało się pobrać prognozy z MET Norway. Radary i mapy pogodowe poniżej nadal działają.</p></div><p class="forecast-source">Źródło prognozy: <a href="https://api.met.no/" rel="nofollow noopener">MET Norway / api.met.no</a>.</p>`;
  }
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const radius = 6371;
  const toRad = (value) => value * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function initCitySearch() {
  const input = document.querySelector('[data-city-search-input]');
  const cards = Array.from(document.querySelectorAll('[data-city-card]'));
  const countEl = document.querySelector('[data-city-search-count]');
  const status = document.querySelector('[data-city-location-status]');
  const locateButton = document.querySelector('[data-city-locate-button]');
  if (!input || !cards.length) return;
  injectForecastStyles();

  const updateCount = (visible) => {
    if (countEl) countEl.textContent = visible === 1 ? 'Znaleziono 1 miasto.' : `Znaleziono ${visible} miast.`;
  };

  const filterCities = () => {
    const query = normalizeText(input.value.trim());
    let visible = 0;
    cards.forEach((card) => {
      const name = normalizeText(card.dataset.cityName || card.textContent);
      const slug = normalizeText(card.dataset.citySlug || '');
      const matches = !query || name.includes(query) || slug.includes(query);
      card.classList.toggle('city-card-hidden', !matches);
      if (matches) visible += 1;
    });
    updateCount(visible);
  };

  input.addEventListener('input', filterCities);
  updateCount(cards.length);

  if (locateButton) {
    locateButton.addEventListener('click', () => {
      if (!navigator.geolocation) {
        if (status) status.textContent = 'Twoja przeglądarka nie obsługuje geolokalizacji.';
        return;
      }
      if (status) status.textContent = 'Sprawdzam najbliższe miasto...';
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const nearest = Object.entries(weatherCities).map(([slug, [name, lat, lon]]) => ({ slug, name, distance: distanceKm(latitude, longitude, lat, lon) })).sort((a, b) => a.distance - b.distance)[0];
        if (!nearest) return;
        if (status) status.textContent = `Najbliższe dostępne miasto: ${nearest.name} (${Math.round(nearest.distance)} km). Przekierowuję...`;
        window.location.href = `/pogoda/${nearest.slug}/`;
      }, () => {
        if (status) status.textContent = 'Nie udało się pobrać lokalizacji. Wpisz nazwę miasta ręcznie.';
      }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
    });
  }
}

loadCityForecast();
initCitySearch();

const cookieConsentKey = 'meteolive_cookie_consent_v1';
const gaMeasurementId = 'G-MQ1X7GSLXX';

function loadGoogleAnalytics() {
  if (window.meteoliveGaLoaded) return;
  window.meteoliveGaLoaded = true;
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaMeasurementId, { anonymize_ip: true });
}

function createCookieConsentBanner() {
  if (localStorage.getItem(cookieConsentKey)) return;
  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Informacja o cookies');
  banner.innerHTML = `<div class="cookie-banner__content"><strong>Cookies, zewnętrzne mapy i analityka</strong><p>MeteoLive korzysta z podstawowych rozwiązań technicznych, zewnętrznych map pogodowych i prognozy MET Norway. Google Analytics uruchomimy tylko po kliknięciu „Akceptuję”.</p><a href="/cookies/">Dowiedz się więcej</a></div><div class="cookie-banner__actions"><button type="button" class="btn cookie-secondary" data-cookie-choice="necessary">Tylko niezbędne</button><button type="button" class="btn primary" data-cookie-choice="accepted">Akceptuję</button></div>`;
  banner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.dataset.cookieChoice || 'closed';
      localStorage.setItem(cookieConsentKey, choice);
      if (choice === 'accepted') loadGoogleAnalytics();
      banner.remove();
    });
  });
  document.body.appendChild(banner);
}

if (localStorage.getItem(cookieConsentKey) === 'accepted') loadGoogleAnalytics();
createCookieConsentBanner();

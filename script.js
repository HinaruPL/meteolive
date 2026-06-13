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
  'warszawa': { name: 'Warszawa', lat: 52.2297, lon: 21.0122, voivodeship: 'mazowieckie', county: 'Warszawa' },
  'krakow': { name: 'Kraków', lat: 50.0647, lon: 19.9450, voivodeship: 'małopolskie', county: 'Kraków' },
  'wroclaw': { name: 'Wrocław', lat: 51.1079, lon: 17.0385, voivodeship: 'dolnośląskie', county: 'Wrocław' },
  'poznan': { name: 'Poznań', lat: 52.4064, lon: 16.9252, voivodeship: 'wielkopolskie', county: 'Poznań' },
  'gdansk': { name: 'Gdańsk', lat: 54.3520, lon: 18.6466, voivodeship: 'pomorskie', county: 'Gdańsk' },
  'gdynia': { name: 'Gdynia', lat: 54.5189, lon: 18.5305, voivodeship: 'pomorskie', county: 'Gdynia' },
  'lodz': { name: 'Łódź', lat: 51.7592, lon: 19.4560, voivodeship: 'łódzkie', county: 'Łódź' },
  'katowice': { name: 'Katowice', lat: 50.2649, lon: 19.0238, voivodeship: 'śląskie', county: 'Katowice' },
  'lublin': { name: 'Lublin', lat: 51.2465, lon: 22.5684, voivodeship: 'lubelskie', county: 'Lublin' },
  'szczecin': { name: 'Szczecin', lat: 53.4285, lon: 14.5528, voivodeship: 'zachodniopomorskie', county: 'Szczecin' },
  'rzeszow': { name: 'Rzeszów', lat: 50.0413, lon: 21.9990, voivodeship: 'podkarpackie', county: 'Rzeszów' },
  'bialystok': { name: 'Białystok', lat: 53.1325, lon: 23.1688, voivodeship: 'podlaskie', county: 'Białystok' },
  'bydgoszcz': { name: 'Bydgoszcz', lat: 53.1235, lon: 18.0084, voivodeship: 'kujawsko-pomorskie', county: 'Bydgoszcz' },
  'torun': { name: 'Toruń', lat: 53.0138, lon: 18.5984, voivodeship: 'kujawsko-pomorskie', county: 'Toruń' },
  'olsztyn': { name: 'Olsztyn', lat: 53.7784, lon: 20.4801, voivodeship: 'warmińsko-mazurskie', county: 'Olsztyn' },
  'kielce': { name: 'Kielce', lat: 50.8661, lon: 20.6286, voivodeship: 'świętokrzyskie', county: 'Kielce' },
  'opole': { name: 'Opole', lat: 50.6751, lon: 17.9213, voivodeship: 'opolskie', county: 'Opole' },
  'radom': { name: 'Radom', lat: 51.4027, lon: 21.1471, voivodeship: 'mazowieckie', county: 'Radom' },
  'sosnowiec': { name: 'Sosnowiec', lat: 50.2863, lon: 19.1041, voivodeship: 'śląskie', county: 'Sosnowiec' },
  'tarnow': { name: 'Tarnów', lat: 50.0121, lon: 20.9858, voivodeship: 'małopolskie', county: 'Tarnów' },
  'plock': { name: 'Płock', lat: 52.5468, lon: 19.7064, voivodeship: 'mazowieckie', county: 'Płock' },
  'elblag': { name: 'Elbląg', lat: 54.1561, lon: 19.4045, voivodeship: 'warmińsko-mazurskie', county: 'Elbląg' },
  'walbrzych': { name: 'Wałbrzych', lat: 50.7714, lon: 16.2843, voivodeship: 'dolnośląskie', county: 'Wałbrzych' },
  'koszalin': { name: 'Koszalin', lat: 54.1944, lon: 16.1722, voivodeship: 'zachodniopomorskie', county: 'Koszalin' },
  'kalisz': { name: 'Kalisz', lat: 51.7611, lon: 18.0910, voivodeship: 'wielkopolskie', county: 'Kalisz' },
  'legnica': { name: 'Legnica', lat: 51.2070, lon: 16.1553, voivodeship: 'dolnośląskie', county: 'Legnica' },
  'zielona-gora': { name: 'Zielona Góra', lat: 51.9355, lon: 15.5062, voivodeship: 'lubuskie', county: 'Zielona Góra' },
  'gorzow-wielkopolski': { name: 'Gorzów Wielkopolski', lat: 52.7368, lon: 15.2288, voivodeship: 'lubuskie', county: 'Gorzów Wielkopolski' },
  'bielsko-biala': { name: 'Bielsko-Biała', lat: 49.8224, lon: 19.0469, voivodeship: 'śląskie', county: 'Bielsko-Biała' },
  'gliwice': { name: 'Gliwice', lat: 50.2945, lon: 18.6714, voivodeship: 'śląskie', county: 'Gliwice' },
  'czestochowa': { name: 'Częstochowa', lat: 50.8118, lon: 19.1203, voivodeship: 'śląskie', county: 'Częstochowa' }
};

function getCityInfo(slug) {
  const city = weatherCities[slug];
  if (!city) return null;
  if (Array.isArray(city)) {
    const [name, lat, lon] = city;
    return { name, lat, lon, voivodeship: '', county: '' };
  }
  return city;
}

const weatherRegions = [
  { name: 'Dolnośląskie', slug: 'dolnoslaskie', cityCount: 3 },
  { name: 'Kujawsko-pomorskie', slug: 'kujawsko-pomorskie', cityCount: 2 },
  { name: 'Lubelskie', slug: 'lubelskie', cityCount: 1 },
  { name: 'Lubuskie', slug: 'lubuskie', cityCount: 2 },
  { name: 'Łódzkie', slug: 'lodzkie', cityCount: 1 },
  { name: 'Małopolskie', slug: 'malopolskie', cityCount: 2 },
  { name: 'Mazowieckie', slug: 'mazowieckie', cityCount: 3 },
  { name: 'Opolskie', slug: 'opolskie', cityCount: 1 },
  { name: 'Podkarpackie', slug: 'podkarpackie', cityCount: 1 },
  { name: 'Podlaskie', slug: 'podlaskie', cityCount: 1 },
  { name: 'Pomorskie', slug: 'pomorskie', cityCount: 2 },
  { name: 'Śląskie', slug: 'slaskie', cityCount: 5 },
  { name: 'Świętokrzyskie', slug: 'swietokrzyskie', cityCount: 1 },
  { name: 'Warmińsko-mazurskie', slug: 'warminsko-mazurskie', cityCount: 2 },
  { name: 'Wielkopolskie', slug: 'wielkopolskie', cityCount: 2 },
  { name: 'Zachodniopomorskie', slug: 'zachodniopomorskie', cityCount: 2 }
];

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

if (currentPath === '/pogoda/') {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pogoda w Polsce według województw',
    description: 'Indeks pogody MeteoLive: województwa, wyszukiwarka miast i lokalne prognozy pogody.',
    url: `${siteBaseUrl}/pogoda/`,
    publisher: buildSitePublisher(),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: weatherRegions.map((region, index) => ({ '@type': 'ListItem', position: index + 1, name: region.name, url: `${siteBaseUrl}/pogoda/${region.slug}/` }))
    }
  });
}

if (currentPath === '/pogoda/mazowieckie/') {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pogoda mazowieckie',
    description: 'Miasta i powiaty w województwie mazowieckim dostępne w MeteoLive.',
    url: `${siteBaseUrl}/pogoda/mazowieckie/`,
    publisher: buildSitePublisher()
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
    .forecast-metric, .forecast-hour, .forecast-day, .search-result-card { border: 1px solid rgba(148, 163, 184, .18); border-radius: 18px; padding: 1rem; background: rgba(15, 23, 42, .42); }
    .forecast-metric strong { display: block; font-size: 1.45rem; margin-top: .25rem; color: #f8fafc; }
    .forecast-metric span, .forecast-hour span, .forecast-day span, .forecast-source, .city-search-help, .search-result-card span { color: #94a3b8; font-size: .9rem; }
    .forecast-hours { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-hour strong, .forecast-day strong, .search-result-card strong { display: block; margin: .35rem 0; color: #f8fafc; }
    .forecast-source { margin-top: 1rem; }
    .forecast-error { border: 1px solid rgba(248, 113, 113, .35); background: rgba(127, 29, 29, .22); padding: 1rem; border-radius: 18px; }
    .city-search-box { margin-top: 1.5rem; }
    .city-search-form { display: grid; grid-template-columns: 1fr auto; gap: .75rem; margin-top: 1rem; }
    .city-search-form input { width: 100%; border: 1px solid rgba(148, 163, 184, .28); background: rgba(15, 23, 42, .72); color: #f8fafc; border-radius: 16px; padding: 1rem; font: inherit; }
    .city-search-form input::placeholder { color: #94a3b8; }
    .city-search-status { margin-top: .85rem; color: #cbd5e1; }
    .city-card-hidden { display: none !important; }
    .city-search-results { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .85rem; margin-top: 1rem; }
    .search-result-card { text-decoration: none; color: inherit; }
    .search-result-card:hover { transform: translateY(-2px); }
    @media (max-width: 1050px) { .forecast-days, .city-search-results { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (max-width: 800px) { .forecast-current, .forecast-hours, .city-search-results { grid-template-columns: 1fr 1fr; } .forecast-header, .city-search-actions { display: block; } .city-search-form { grid-template-columns: 1fr; } }
    @media (max-width: 520px) { .forecast-current, .forecast-hours, .forecast-days, .city-search-results { grid-template-columns: 1fr; } }
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
  const city = getCityInfo(slug);
  if (!city) return;
  const { name: cityName, lat, lon } = city;
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
  const results = document.querySelector('[data-city-search-results]');
  if (!input) return;
  injectForecastStyles();

  const cityEntries = Object.entries(weatherCities).map(([slug, city]) => ({ slug, ...getCityInfo(slug) }));

  const updateCount = (visible, label = 'miast') => {
    if (!countEl) return;
    if (visible === 1) countEl.textContent = `Znaleziono 1 ${label === 'województw' ? 'województwo' : 'miasto'}.`;
    else countEl.textContent = `Znaleziono ${visible} ${label}.`;
  };

  const renderSearchResults = (items) => {
    if (!results) return;
    results.innerHTML = items.slice(0, 8).map((city) => `<a class="search-result-card" href="/pogoda/${city.slug}/"><span>${city.voivodeship || 'Miasto'}</span><strong>${city.name}</strong><span>Powiat: ${city.county || '—'} · Otwórz prognozę →</span></a>`).join('');
  };

  const filterCities = () => {
    const query = normalizeText(input.value.trim());

    if (cards.length) {
      let visibleCards = 0;
      cards.forEach((card) => {
        const name = normalizeText(card.dataset.cityName || card.dataset.regionName || card.textContent);
        const slug = normalizeText(card.dataset.citySlug || card.dataset.regionSlug || '');
        const matches = !query || name.includes(query) || slug.includes(query);
        card.classList.toggle('city-card-hidden', !matches);
        if (matches) visibleCards += 1;
      });
      updateCount(visibleCards, document.querySelector('[data-region-grid]') ? 'województw' : 'miast');
    }

    if (results) {
      if (!query) {
        results.innerHTML = '';
        if (!cards.length) updateCount(cityEntries.length, 'miast');
        return;
      }
      const matchedCities = cityEntries.filter((city) => {
        const haystack = normalizeText(`${city.name} ${city.slug} ${city.voivodeship} ${city.county}`);
        return haystack.includes(query);
      });
      renderSearchResults(matchedCities);
      updateCount(matchedCities.length, 'miast');
    }
  };

  input.addEventListener('input', filterCities);
  if (cards.length) updateCount(cards.length, document.querySelector('[data-region-grid]') ? 'województw' : 'miast');
  if (results) renderSearchResults([]);

  if (locateButton) {
    locateButton.addEventListener('click', () => {
      if (!navigator.geolocation) {
        if (status) status.textContent = 'Twoja przeglądarka nie obsługuje geolokalizacji.';
        return;
      }
      if (status) status.textContent = 'Sprawdzam najbliższe miasto...';
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const nearest = cityEntries.map((city) => ({ ...city, distance: distanceKm(latitude, longitude, city.lat, city.lon) })).sort((a, b) => a.distance - b.distance)[0];
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

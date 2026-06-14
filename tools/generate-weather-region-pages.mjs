import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const citiesPath = path.join(rootDir, 'data', 'weather-cities.json');

const regions = [
  { name: 'Dolnośląskie', slug: 'dolnoslaskie' },
  { name: 'Kujawsko-pomorskie', slug: 'kujawsko-pomorskie' },
  { name: 'Lubelskie', slug: 'lubelskie' },
  { name: 'Lubuskie', slug: 'lubuskie' },
  { name: 'Łódzkie', slug: 'lodzkie' },
  { name: 'Małopolskie', slug: 'malopolskie' },
  { name: 'Mazowieckie', slug: 'mazowieckie' },
  { name: 'Opolskie', slug: 'opolskie' },
  { name: 'Podkarpackie', slug: 'podkarpackie' },
  { name: 'Podlaskie', slug: 'podlaskie' },
  { name: 'Pomorskie', slug: 'pomorskie' },
  { name: 'Śląskie', slug: 'slaskie' },
  { name: 'Świętokrzyskie', slug: 'swietokrzyskie' },
  { name: 'Warmińsko-mazurskie', slug: 'warminsko-mazurskie' },
  { name: 'Wielkopolskie', slug: 'wielkopolskie' },
  { name: 'Zachodniopomorskie', slug: 'zachodniopomorskie' }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateCity(city) {
  return city &&
    typeof city.name === 'string' &&
    typeof city.slug === 'string' &&
    typeof city.voivodeship === 'string' &&
    typeof city.voivodeshipSlug === 'string' &&
    typeof city.county === 'string' &&
    Number.isFinite(city.lat) &&
    Number.isFinite(city.lon);
}

function cityCountText(count) {
  if (count === 1) return '1 miasto';
  if ([2, 3, 4].includes(count)) return `${count} miasta`;
  return `${count} miast`;
}

function generateCityCards(cities) {
  return cities.map((city) => `          <a class="card" data-city-card data-city-name="${escapeHtml(city.name)}" data-city-slug="${escapeHtml(city.slug)}" href="/pogoda/${escapeHtml(city.slug)}/"><div><div class="icon">🏙</div><h3>${escapeHtml(city.name)}</h3><p>Powiat: ${escapeHtml(city.county)}. Prognoza, radary i mapy dla miasta ${escapeHtml(city.name)}.</p></div><span class="card-link">Otwórz prognozę →</span></a>`).join('\n');
}

function generateRegionPage(region, cities) {
  const regionNameLower = region.name.toLowerCase();
  const cityNames = cities.map((city) => city.name).join(', ');
  const introCityText = cityNames || 'kolejne miasta zostaną dodane w następnych etapach';
  const cards = cities.length
    ? generateCityCards(cities)
    : '          <article class="content-card"><h3>Miasta w przygotowaniu</h3><p>To województwo ma już przygotowany adres. Miasta zostaną dodane po uzupełnieniu bazy danych.</p></article>';

  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pogoda ${escapeHtml(regionNameLower)} — miasta i prognozy | MeteoLive</title>
  <meta name="description" content="Pogoda w województwie ${escapeHtml(regionNameLower)}. Sprawdź dostępne miasta, prognozę MET Norway, radary pogodowe i linki do oficjalnych ostrzeżeń IMGW-PIB.">
  <link rel="canonical" href="https://meteolive.pl/pogoda/${escapeHtml(region.slug)}/">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Pogoda ${escapeHtml(regionNameLower)} — miasta | MeteoLive">
  <meta property="og:description" content="Dostępne miasta w województwie ${escapeHtml(regionNameLower)}: ${escapeHtml(introCityText)}.">
  <meta property="og:url" content="https://meteolive.pl/pogoda/${escapeHtml(region.slug)}/">
  <meta name="twitter:card" content="summary">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header"><div class="container nav"><a class="logo" href="/" aria-label="MeteoLive — strona główna"><span class="logo-mark">☁</span><span>MeteoLive</span></a><nav class="nav-links" aria-label="Główna nawigacja"><a href="/radar-burz/">Burze</a><a href="/radar-opadow/">Opady</a><a href="/radar-wiatru/">Wiatr</a><a href="/mapa-temperatury/">Temperatura</a><a href="/ostrzezenia-pogodowe/">Ostrzeżenia</a><a href="/pogoda/">Pogoda</a><a href="/poradniki/">Poradniki</a></nav></div></header>

  <main>
    <section class="hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Okruszki"><a href="/">Strona główna</a><span>›</span><a href="/pogoda/">Pogoda</a><span>›</span><span>${escapeHtml(region.name)}</span></nav>
        <span class="eyebrow"><span class="pulse"></span> Województwo ${escapeHtml(regionNameLower)}</span>
        <h1>Pogoda ${escapeHtml(regionNameLower)}.</h1>
        <p class="lead">Poniżej znajdziesz miasta z województwa ${escapeHtml(regionNameLower)}, które są już dostępne w MeteoLive. Każda strona miasta prowadzi do prognozy MET Norway, radarów pogodowych i linków do oficjalnych ostrzeżeń IMGW-PIB.</p>

        <div class="content-card city-search-box" aria-label="Wyszukiwarka miast">
          <div class="city-search-actions">
            <div>
              <h2>Znajdź miasto</h2>
              <p class="city-search-help">Szukaj po nazwie miasta, województwie albo powiecie. Wyszukiwarka korzysta z pliku data/weather-cities.json.</p>
            </div>
            <button class="btn primary" type="button" data-city-locate-button>Użyj mojej lokalizacji</button>
          </div>
          <div class="city-search-form">
            <input type="search" data-city-search-input placeholder="Wpisz miasto lub województwo..." aria-label="Wpisz nazwę miasta">
            <a class="btn" href="/pogoda/">Wszystkie województwa</a>
          </div>
          <p class="city-search-status" data-city-search-count>Znaleziono ${cityCountText(cities.length)}.</p>
          <p class="city-search-status" data-city-location-status></p>
          <div class="city-search-results" data-city-search-results aria-live="polite"></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Miasta w bazie</h2>
        <p class="section-intro">Na razie pokazujemy miasta, które już mają działające strony w MeteoLive. Kolejne miasta z tego województwa będą dodawane z jednej bazy danych.</p>
        <div class="grid">
${cards}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <article class="content-card"><h2>Jak korzystać z tej strony?</h2><p>Wybierz miasto z listy albo użyj wyszukiwarki. Strona miasta pokaże prognozę z MET Norway, prognozę godzinową i kilkudniową oraz szybkie linki do map pogodowych.</p></article>
        <article class="content-card"><h2>Ważne przy ostrzeżeniach</h2><p>MeteoLive nie jest oficjalnym serwisem ostrzeżeń. Przy burzach, wichurach, ulewach, upałach i innych groźnych zjawiskach sprawdzaj komunikaty IMGW-PIB.</p></article>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-grid">
      <span>© <span data-year></span> MeteoLive</span>
      <span><a href="/o-nas/">O nas</a> · <a href="/kontakt/">Kontakt</a> · <a href="/skad-bierzemy-dane-pogodowe/">Źródła danych</a> · <a href="/polityka-prywatnosci/">Polityka prywatności</a> · <a href="/cookies/">Cookies</a> · <a href="/regulamin/">Regulamin</a></span>
    </div>
  </footer>
  <script src="/script.js?v=city-search-ranking-20260614"></script>
</body>
</html>
`;
}

function main() {
  const rawCities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  const cities = rawCities.filter(validateCity).sort((a, b) => a.name.localeCompare(b.name, 'pl'));

  if (cities.length !== rawCities.length) {
    console.warn(`Pominięto ${rawCities.length - cities.length} niepełnych rekordów miast.`);
  }

  regions.forEach((region) => {
    const regionCities = cities.filter((city) => city.voivodeshipSlug === region.slug);
    const outputDir = path.join(rootDir, 'pogoda', region.slug);
    const outputPath = path.join(outputDir, 'index.html');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, generateRegionPage(region, regionCities), 'utf8');
    console.log(`Wygenerowano ${path.relative(rootDir, outputPath)} — ${cityCountText(regionCities.length)}`);
  });
}

main();

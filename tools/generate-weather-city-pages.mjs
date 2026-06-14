import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const citiesPath = path.join(rootDir, 'data', 'weather-cities.json');

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

function cityPage(city) {
  const name = escapeHtml(city.name);
  const slug = escapeHtml(city.slug);
  const voivodeship = escapeHtml(city.voivodeship);
  const county = escapeHtml(city.county);
  const lat = Number(city.lat).toFixed(4);
  const lon = Number(city.lon).toFixed(4);
  const windyRain = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=9&level=surface&overlay=rain&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;
  const windyWind = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=9&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C`;
  const description = `Pogoda ${city.name}: prognoza na teraz i kolejne dni, radar opadów, radar burz, mapa wiatru, temperatura i ostrzeżenia pogodowe dla województwa ${city.voivodeship}.`;

  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pogoda ${name} — radar, prognoza, wiatr i ostrzeżenia | MeteoLive</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="https://meteolive.pl/pogoda/${slug}/">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Pogoda ${name} — prognoza i radary | MeteoLive">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="https://meteolive.pl/pogoda/${slug}/">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Pogoda ${name} — MeteoLive">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Pogoda ${name}","description":"${escapeHtml(description)}","url":"https://meteolive.pl/pogoda/${slug}/","inLanguage":"pl-PL","isPartOf":{"@type":"WebSite","name":"MeteoLive","url":"https://meteolive.pl/"},"about":{"@type":"Place","name":"${name}","geo":{"@type":"GeoCoordinates","latitude":${lat},"longitude":${lon}},"address":{"@type":"PostalAddress","addressLocality":"${name}","addressRegion":"${voivodeship}","addressCountry":"PL"}}}</script>
</head>
<body>
  <header class="site-header"><div class="container nav"><a class="logo" href="/" aria-label="MeteoLive — strona główna"><span class="logo-mark">☁</span><span>MeteoLive</span></a><nav class="nav-links" aria-label="Główna nawigacja"><a href="/radar-burz/">Burze</a><a href="/radar-opadow/">Opady</a><a href="/radar-wiatru/">Wiatr</a><a href="/mapa-temperatury/">Temperatura</a><a href="/ostrzezenia-pogodowe/">Ostrzeżenia</a><a href="/pogoda/">Pogoda</a></nav></div></header>
  <main>
    <section class="hero"><div class="container"><nav class="breadcrumbs" aria-label="Okruszki"><a href="/">Strona główna</a><span>›</span><a href="/pogoda/">Pogoda</a><span>›</span><a href="/pogoda/${escapeHtml(city.voivodeshipSlug)}/">${voivodeship}</a><span>›</span><span>${name}</span></nav><span class="eyebrow"><span class="pulse"></span> Pogoda dla miasta</span><h1>Pogoda ${name}.</h1><p class="lead">Sprawdź lokalną prognozę pogody dla miasta ${name}, radar opadów ustawiony na okolice miasta, radar burz, mapę wiatru, temperaturę oraz oficjalne ostrzeżenia pogodowe. Województwo: ${voivodeship}. Powiat: ${county}.</p></div></section>

    <section class="section"><div class="container content-card"><h2>Radar opadów ${name} — podgląd na żywo</h2><p class="section-intro">Mapa Windy poniżej jest ustawiona na współrzędne miasta ${name} (${lat}, ${lon}) i przybliżona do okolicy miasta.</p><div class="embed-box"><iframe title="Radar opadów Windy dla ${name}" src="${windyRain}" loading="lazy"></iframe></div><div class="attribution">Mapa: <a href="https://www.windy.com/" rel="nofollow noopener" target="_blank">Windy.com</a>. To podgląd orientacyjny — przy groźnej pogodzie sprawdzaj oficjalne ostrzeżenia IMGW-PIB.</div></div></section>

    <section class="section"><div class="container content-card"><h2>${name} — najważniejsze mapy pogodowe</h2><div class="grid"><a class="card" href="/radar-opadow/"><div><div class="icon">🌧</div><h3>Radar opadów</h3><p>Sprawdź większy widok opadów nad Polską i regionem.</p></div><span class="card-link">Otwórz →</span></a><a class="card" href="/radar-burz/"><div><div class="icon">⚡</div><h3>Radar burz</h3><p>Zobacz, czy w pobliżu występują burze i wyładowania.</p></div><span class="card-link">Otwórz →</span></a><a class="card" href="/radar-wiatru/"><div><div class="icon">💨</div><h3>Mapa wiatru</h3><p>Sprawdź kierunek i siłę wiatru w okolicy.</p></div><span class="card-link">Otwórz →</span></a><a class="card" href="/mapa-temperatury/"><div><div class="icon">🌡</div><h3>Temperatura</h3><p>Porównaj temperaturę w regionie i w Polsce.</p></div><span class="card-link">Otwórz →</span></a><a class="card" href="/ostrzezenia-pogodowe/"><div><div class="icon">⚠️</div><h3>Ostrzeżenia</h3><p>Przejdź do linków z oficjalnymi ostrzeżeniami IMGW-PIB.</p></div><span class="card-link">Sprawdź →</span></a><a class="card" href="/pogoda/"><div><div class="icon">🏙</div><h3>Inne miasta</h3><p>Wróć do listy miast i województw w MeteoLive.</p></div><span class="card-link">Zobacz →</span></a></div></div></section>

    <section class="section"><div class="container two-col"><article class="content-card"><h2>Jak sprawdzać pogodę dla miasta ${name}?</h2><p>Najpierw zobacz prognozę na górze strony, potem porównaj ją z radarem opadów i mapą wiatru. Przy burzowej pogodzie sprawdź też radar burz oraz oficjalne ostrzeżenia.</p></article><article class="content-card"><h2>Mapa wiatru dla okolicy</h2><div class="embed-box"><iframe title="Mapa wiatru Windy dla ${name}" src="${windyWind}" loading="lazy"></iframe></div></article></div></section>
  </main>
  <footer class="footer"><div class="container footer-grid"><span>© <span data-year></span> MeteoLive</span><span><a href="/o-nas/">O nas</a> · <a href="/kontakt/">Kontakt</a> · <a href="/polityka-prywatnosci/">Polityka prywatności</a> · <a href="/regulamin/">Regulamin</a></span></div></footer>
  <script src="/script.js?v=city-search-ranking-20260614"></script>
</body>
</html>
`;
}

function main() {
  const rawCities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  const cities = rawCities.filter(validateCity).sort((a, b) => a.slug.localeCompare(b.slug));
  const slugs = new Set();
  cities.forEach((city) => {
    if (slugs.has(city.slug)) throw new Error(`Duplikat sluga miasta: ${city.slug}`);
    slugs.add(city.slug);
    const outputDir = path.join(rootDir, 'pogoda', city.slug);
    const outputPath = path.join(outputDir, 'index.html');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, cityPage(city), 'utf8');
    console.log(`Wygenerowano ${path.relative(rootDir, outputPath)} — ${city.name}`);
  });
}

main();

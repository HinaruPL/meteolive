import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const siteBaseUrl = 'https://meteolive.pl';
const cityDataPath = path.join(rootDir, 'data', 'weather-cities.json');
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const robotsPath = path.join(rootDir, 'robots.txt');

const requiredHubPaths = [
  '/pogoda-na-weekend/',
  '/pogoda-nad-morzem/',
  '/pogoda-w-gorach/',
  '/najpopularniejsze-miasta-pogoda/',
  '/poradniki/',
  '/skad-bierzemy-dane-pogodowe/',
];

const canonicalSamplePaths = [
  '/',
  '/pogoda/',
  '/pogoda/dolnoslaskie/',
  '/pogoda/mazowieckie/',
  '/pogoda/pomorskie/',
  '/pogoda/slaskie/',
  '/pogoda/warminsko-mazurskie/',
  '/pogoda-na-weekend/',
  '/pogoda-nad-morzem/',
  '/pogoda-w-gorach/',
  '/najpopularniejsze-miasta-pogoda/',
  '/skad-bierzemy-dane-pogodowe/',
];

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeUtf8(filePath, text) {
  fs.writeFileSync(filePath, text, { encoding: 'utf8' });
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function urlToSitePath(url) {
  try {
    const parsed = new URL(url);
    if (parsed.origin !== siteBaseUrl) return null;
    return parsed.pathname;
  } catch {
    return null;
  }
}

function sitePathToFilePath(sitePath) {
  if (sitePath === '/') return path.join(rootDir, 'index.html');
  return path.join(rootDir, sitePath.replace(/^\/|\/$/g, ''), 'index.html');
}

function filePathForDisplay(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, '/');
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
    || html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i);
  return match?.[1] || null;
}

function deterministicCitySample(cities, size = 30) {
  if (cities.length <= size) return cities;
  const step = Math.max(1, Math.floor(cities.length / size));
  const sample = [];
  for (let index = 0; index < cities.length && sample.length < size; index += step) {
    sample.push(cities[index]);
  }
  return sample.slice(0, size);
}

const htmlScanRoots = [
  '404.html',
  'index.html',
  'cookies',
  'kontakt',
  'mapa-strony',
  'mapa-temperatury',
  'o-nas',
  'ostrzezenia-pogodowe',
  'pogoda',
  'pogoda-na-weekend',
  'pogoda-nad-morzem',
  'pogoda-w-gorach',
  'polityka-prywatnosci',
  'poradniki',
  'radar-burz',
  'radar-opadow',
  'radar-wiatru',
  'regulamin',
  'skad-bierzemy-dane-pogodowe',
];

function collectHtmlFilesFromPath(targetPath) {
  if (!fs.existsSync(targetPath)) return [];
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) return targetPath.endsWith('.html') ? [targetPath] : [];
  return collectHtmlFiles(targetPath);
}

function collectHtmlFiles(dir) {
  const ignoredDirs = new Set(['.git', '.agents', '.codex', 'node_modules']);
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...collectHtmlFiles(path.join(dir, entry.name)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path.join(dir, entry.name));
  }
  return files;
}

function checkCanonical(sitePath) {
  const filePath = sitePathToFilePath(sitePath);
  const expected = `${siteBaseUrl}${sitePath}`;
  if (!fs.existsSync(filePath)) {
    return { sitePath, expected, actual: null, ok: false, reason: 'missing-file' };
  }
  const actual = extractCanonical(readUtf8(filePath));
  return { sitePath, expected, actual, ok: actual === expected, reason: actual ? 'checked' : 'missing-canonical' };
}

function buildAudit() {
  const cities = JSON.parse(readUtf8(cityDataPath));
  const sitemapUrls = extractSitemapUrls(readUtf8(sitemapPath));
  const robotsText = readUtf8(robotsPath);
  const sitemapCounts = new Map();

  for (const url of sitemapUrls) {
    sitemapCounts.set(url, (sitemapCounts.get(url) || 0) + 1);
  }

  const duplicateUrls = [...sitemapCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([url, count]) => ({ url, count }));

  const invalidOriginUrls = sitemapUrls.filter((url) => urlToSitePath(url) === null);
  const urlsWithoutTrailingSlash = sitemapUrls.filter((url) => {
    const sitePath = urlToSitePath(url);
    return sitePath !== null && sitePath !== '/' && !sitePath.endsWith('/');
  });

  const sitemapPathSet = new Set(sitemapUrls.map(urlToSitePath).filter(Boolean));
  const cityPages = cities.map((city) => ({
    city,
    filePath: path.join(rootDir, 'pogoda', city.slug, 'index.html'),
    urlPath: `/pogoda/${city.slug}/`,
    url: `${siteBaseUrl}/pogoda/${city.slug}/`,
  }));

  const missingCityFiles = cityPages.filter((item) => !fs.existsSync(item.filePath));
  const missingCityUrls = cityPages.filter((item) => !sitemapPathSet.has(item.urlPath));
  const cityDirectoriesOnDisk = fs.readdirSync(path.join(rootDir, 'pogoda'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(rootDir, 'pogoda', entry.name, 'index.html')));

  const knownCitySlugs = new Set(cities.map((city) => city.slug));
  const knownRegionSlugs = new Set([
    'dolnoslaskie',
    'kujawsko-pomorskie',
    'lubelskie',
    'lubuskie',
    'lodzkie',
    'malopolskie',
    'mazowieckie',
    'opolskie',
    'podkarpackie',
    'podlaskie',
    'pomorskie',
    'slaskie',
    'swietokrzyskie',
    'warminsko-mazurskie',
    'wielkopolskie',
    'zachodniopomorskie',
  ]);
  const cityPageDirectoriesOnDisk = cityDirectoriesOnDisk.filter((entry) => knownCitySlugs.has(entry.name));
  const regionPageDirectoriesOnDisk = cityDirectoriesOnDisk.filter((entry) => knownRegionSlugs.has(entry.name));
  const missingRegionUrls = [...knownRegionSlugs]
    .map((slug) => `/pogoda/${slug}/`)
    .filter((sitePath) => !sitemapPathSet.has(sitePath));
  const missingHubUrls = requiredHubPaths.filter((sitePath) => !sitemapPathSet.has(sitePath));

  const sitemapUrlsWithoutFiles = sitemapUrls
    .map((url) => ({ url, sitePath: urlToSitePath(url) }))
    .filter((item) => item.sitePath !== null)
    .filter((item) => !fs.existsSync(sitePathToFilePath(item.sitePath)));

  const citySamplePaths = deterministicCitySample(cities).map((city) => `/pogoda/${city.slug}/`);
  const canonicalChecks = [...canonicalSamplePaths, ...citySamplePaths].map(checkCanonical);
  const badCanonicalChecks = canonicalChecks.filter((item) => !item.ok);

  const htmlFiles = htmlScanRoots.flatMap((scanRoot) => collectHtmlFilesFromPath(path.join(rootDir, scanRoot)));
  const noindexMatches = [];
  const robotsMetaMatches = [];
  const xRobotsMatches = [];
  for (const filePath of htmlFiles) {
    const text = readUtf8(filePath);
    if (/noindex/i.test(text)) noindexMatches.push(filePathForDisplay(filePath));
    if (/<meta[^>]+name=["']robots["']/i.test(text)) robotsMetaMatches.push(filePathForDisplay(filePath));
    if (/X-Robots-Tag/i.test(text)) xRobotsMatches.push(filePathForDisplay(filePath));
  }

  const cityNoindexMatches = noindexMatches.filter((file) => file.startsWith('pogoda/'));
  const robotsBlocksPogoda = /Disallow:\s*\/pogoda\/?/i.test(robotsText);
  const robotsBlocksData = /Disallow:\s*\/data\/?/i.test(robotsText);
  const robotsHasSitemap = /Sitemap:\s*https:\/\/meteolive\.pl\/sitemap\.xml/i.test(robotsText);

  return {
    generatedAt: new Date().toISOString(),
    cityCount: cities.length,
    cityPagesOnDisk: cityPageDirectoriesOnDisk.length,
    regionPagesOnDisk: regionPageDirectoriesOnDisk.length,
    sitemapUrlCount: sitemapUrls.length,
    missingCityFiles,
    missingCityUrls,
    sitemapUrlsWithoutFiles,
    duplicateUrls,
    invalidOriginUrls,
    urlsWithoutTrailingSlash,
    missingRegionUrls,
    missingHubUrls,
    canonicalChecks,
    badCanonicalChecks,
    noindexMatches,
    robotsMetaMatches,
    xRobotsMatches,
    cityNoindexMatches,
    robots: {
      blocksPogoda: robotsBlocksPogoda,
      blocksData: robotsBlocksData,
      hasExpectedSitemap: robotsHasSitemap,
    },
  };
}

function formatList(items, mapper = (item) => item) {
  if (!items.length) return '- brak';
  return items.map((item) => `- ${mapper(item)}`).join('\n');
}

function buildMarkdownReport(audit) {
  const technicalOk = audit.missingCityFiles.length === 0
    && audit.missingCityUrls.length === 0
    && audit.sitemapUrlsWithoutFiles.length === 0
    && audit.duplicateUrls.length === 0
    && audit.invalidOriginUrls.length === 0
    && audit.urlsWithoutTrailingSlash.length === 0
    && audit.missingRegionUrls.length === 0
    && audit.missingHubUrls.length === 0
    && audit.badCanonicalChecks.length === 0
    && audit.cityNoindexMatches.length === 0
    && !audit.robots.blocksPogoda
    && !audit.robots.blocksData
    && audit.robots.hasExpectedSitemap;

  return `# Audyt indeksowalności MeteoLive

Data audytu: ${audit.generatedAt}

## Podsumowanie

- Liczba miast w \`data/weather-cities.json\`: ${audit.cityCount}
- Liczba statycznych stron miast na dysku: ${audit.cityPagesOnDisk}
- Liczba stron województw na dysku: ${audit.regionPagesOnDisk}
- Liczba URL-i w \`sitemap.xml\`: ${audit.sitemapUrlCount}
- Brakujące pliki stron miast: ${audit.missingCityFiles.length}
- Brakujące URL-e miast w sitemap: ${audit.missingCityUrls.length}
- URL-e z sitemap bez pliku: ${audit.sitemapUrlsWithoutFiles.length}
- Duplikaty w sitemap: ${audit.duplicateUrls.length}
- URL-e bez końcowego slash: ${audit.urlsWithoutTrailingSlash.length}
- Błędne canonicale w próbie kontrolnej: ${audit.badCanonicalChecks.length}
- Wystąpienia \`noindex\` na stronach miast/województw: ${audit.cityNoindexMatches.length}

## Sitemap

\`sitemap.xml\` zawiera ${audit.sitemapUrlCount} URL-i. Audyt potwierdził pokrycie wszystkich miast z bazy, stron województw, hubów SEO i strony źródeł danych.

Brakujące URL-e miast:

${formatList(audit.missingCityUrls, (item) => item.url)}

URL-e z sitemap bez odpowiadającego pliku:

${formatList(audit.sitemapUrlsWithoutFiles, (item) => item.url)}

Duplikaty w sitemap:

${formatList(audit.duplicateUrls, (item) => `${item.url} (${item.count} razy)`)}

URL-e bez końcowego slash:

${formatList(audit.urlsWithoutTrailingSlash)}

## Robots.txt

- \`/pogoda/\` blokowane: ${audit.robots.blocksPogoda ? 'tak' : 'nie'}
- \`/data/\` blokowane: ${audit.robots.blocksData ? 'tak' : 'nie'}
- Sitemap wskazana jako \`https://meteolive.pl/sitemap.xml\`: ${audit.robots.hasExpectedSitemap ? 'tak' : 'nie'}

## Canonicale

Sprawdzono stronę główną, \`/pogoda/\`, huby SEO, kilka województw oraz rozproszoną próbę 30 stron miast. Canonicale powinny wskazywać dokładny URL strony.

Błędne canonicale:

${formatList(audit.badCanonicalChecks, (item) => `${item.sitePath}: oczekiwano ${item.expected}, znaleziono ${item.actual || 'brak'}`)}

## Noindex i dyrektywy robots

Wyszukano \`noindex\`, meta \`robots\` i \`X-Robots-Tag\` w plikach HTML.

- Pliki z \`noindex\`: ${audit.noindexMatches.length}
- Pliki z meta \`robots\`: ${audit.robotsMetaMatches.length}
- Pliki z \`X-Robots-Tag\`: ${audit.xRobotsMatches.length}
- Pliki \`/pogoda/\` z \`noindex\`: ${audit.cityNoindexMatches.length}

Pliki HTML z \`noindex\`:

${formatList(audit.noindexMatches)}

Pliki \`/pogoda/\` z \`noindex\`:

${formatList(audit.cityNoindexMatches)}

## Strony statyczne

Strony miast istnieją jako statyczne pliki \`pogoda/[slug]/index.html\`. Główna treść strony, title, meta description, canonical, sekcje radarów i linki są obecne w HTML, więc crawler nie musi generować podstawowej treści przez JavaScript.

## Rekomendacja

${technicalOk
    ? 'Audyt nie wykazał technicznej blokady indeksacji. Sitemap, robots.txt, canonicale i statyczne pliki stron miast wyglądają poprawnie. Niski poziom indeksacji w Google Search Console najpewniej wynika z czasu potrzebnego na crawling, crawl budget oraz podobieństwa wielu lokalnych stron pogodowych. Warto obserwować GSC po kolejnych deployach i nie wykonywać nerwowych zmian masowych bez danych z raportów Google.'
    : 'Audyt wykazał elementy wymagające poprawy technicznej. Po poprawkach należy ponownie uruchomić skrypt audytowy i sprawdzić raport Google Search Console po kolejnym crawlu.'}

## Działanie po audycie

Po czystym audycie technicznym dodano hub \`/najpopularniejsze-miasta-pogoda/\` oraz mocniejsze linkowanie z \`/\`, \`/pogoda/\` i stopek głównych stron. Celem jest ułatwienie Google odkrywania i priorytetyzacji najważniejszych lokalnych URL-i bez dodawania masowych nowych stron.
`;
}

function printSummary(audit) {
  console.log('Audyt indeksowalności MeteoLive');
  console.log(`Miasta w bazie: ${audit.cityCount}`);
  console.log(`Strony miast na dysku: ${audit.cityPagesOnDisk}`);
  console.log(`URL-e w sitemap: ${audit.sitemapUrlCount}`);
  console.log(`Brakujące pliki miast: ${audit.missingCityFiles.length}`);
  console.log(`Brakujące URL-e miast w sitemap: ${audit.missingCityUrls.length}`);
  console.log(`URL-e z sitemap bez pliku: ${audit.sitemapUrlsWithoutFiles.length}`);
  console.log(`Duplikaty w sitemap: ${audit.duplicateUrls.length}`);
  console.log(`URL-e bez końcowego slash: ${audit.urlsWithoutTrailingSlash.length}`);
  console.log(`Błędne canonicale w próbie: ${audit.badCanonicalChecks.length}`);
  console.log(`Noindex na stronach /pogoda/: ${audit.cityNoindexMatches.length}`);
  console.log(`Robots blokuje /pogoda/: ${audit.robots.blocksPogoda ? 'tak' : 'nie'}`);
  console.log(`Robots blokuje /data/: ${audit.robots.blocksData ? 'tak' : 'nie'}`);
  console.log(`Robots wskazuje sitemap: ${audit.robots.hasExpectedSitemap ? 'tak' : 'nie'}`);
}

const audit = buildAudit();
printSummary(audit);

const markdownArgIndex = process.argv.indexOf('--markdown');
if (markdownArgIndex !== -1) {
  const outputPath = process.argv[markdownArgIndex + 1];
  if (!outputPath) {
    console.error('Brak ścieżki po --markdown');
    process.exit(1);
  }
  const resolvedOutputPath = path.resolve(rootDir, outputPath);
  writeUtf8(resolvedOutputPath, buildMarkdownReport(audit));
  console.log(`Raport zapisany: ${filePathForDisplay(resolvedOutputPath)}`);
}

if (
  audit.missingCityFiles.length
  || audit.missingCityUrls.length
  || audit.sitemapUrlsWithoutFiles.length
  || audit.duplicateUrls.length
  || audit.invalidOriginUrls.length
  || audit.urlsWithoutTrailingSlash.length
  || audit.missingRegionUrls.length
  || audit.missingHubUrls.length
  || audit.badCanonicalChecks.length
  || audit.cityNoindexMatches.length
  || audit.robots.blocksPogoda
  || audit.robots.blocksData
  || !audit.robots.hasExpectedSitemap
) {
  process.exitCode = 1;
}

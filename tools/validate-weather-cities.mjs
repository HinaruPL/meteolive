import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const filePath = process.argv[2] ? path.resolve(rootDir, process.argv[2]) : path.join(rootDir, 'data', 'weather-cities.json');

const allowedVoivodeshipSlugs = new Set([
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
  'zachodniopomorskie'
]);

function fail(message) {
  console.error(`Błąd: ${message}`);
  process.exitCode = 1;
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

const raw = fs.readFileSync(filePath, 'utf8');
const cities = JSON.parse(raw);

if (!Array.isArray(cities)) {
  fail('Plik musi zawierać tablicę rekordów miast.');
  process.exit();
}

const slugs = new Map();
const cityKeys = new Map();
let valid = 0;

cities.forEach((city, index) => {
  const prefix = `Rekord #${index + 1}`;

  if (!city || typeof city !== 'object') {
    fail(`${prefix}: rekord nie jest obiektem.`);
    return;
  }

  ['name', 'slug', 'voivodeship', 'voivodeshipSlug', 'county'].forEach((field) => {
    if (typeof city[field] !== 'string' || !city[field].trim()) fail(`${prefix}: brak lub pusty tekst w polu ${field}.`);
  });

  if (!isNumber(city.lat) || city.lat < 48.5 || city.lat > 55.2) fail(`${prefix}: nieprawidłowa szerokość geograficzna lat=${city.lat}.`);
  if (!isNumber(city.lon) || city.lon < 13.8 || city.lon > 24.5) fail(`${prefix}: nieprawidłowa długość geograficzna lon=${city.lon}.`);

  if (city.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(city.slug)) fail(`${prefix}: slug ma nieprawidłowy format: ${city.slug}.`);
  if (city.voivodeshipSlug && !allowedVoivodeshipSlugs.has(city.voivodeshipSlug)) fail(`${prefix}: nieznany voivodeshipSlug: ${city.voivodeshipSlug}.`);

  if (city.slug) {
    if (slugs.has(city.slug)) fail(`${prefix}: duplikat sluga ${city.slug}; pierwszy rekord: #${slugs.get(city.slug) + 1}.`);
    slugs.set(city.slug, index);
  }

  const key = `${city.name}|${city.voivodeshipSlug}|${city.county}`.toLowerCase();
  if (cityKeys.has(key)) fail(`${prefix}: możliwy duplikat miasta ${city.name} / ${city.voivodeship} / ${city.county}; pierwszy rekord: #${cityKeys.get(key) + 1}.`);
  cityKeys.set(key, index);

  valid += 1;
});

if (!process.exitCode) console.log(`OK: zwalidowano ${valid} rekordów z pliku ${path.relative(rootDir, filePath)}.`);

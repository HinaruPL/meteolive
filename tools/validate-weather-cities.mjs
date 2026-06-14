import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const inputPath = process.argv[2] ? path.resolve(rootDir, process.argv[2]) : path.join(rootDir, 'data', 'weather-cities.json');

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

function isPlainString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

if (!fs.existsSync(inputPath)) {
  fail(`Nie znaleziono pliku: ${inputPath}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (error) {
  fail(`Nieprawidłowy JSON: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(data)) {
  fail('Plik musi zawierać tablicę rekordów miast.');
  process.exit(1);
}

const slugSet = new Map();
const nameCounts = new Map();
const errors = [];

for (const [index, row] of data.entries()) {
  const location = `Rekord #${index + 1}`;

  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    errors.push(`${location}: rekord nie jest obiektem.`);
    continue;
  }

  for (const field of ['name', 'slug', 'voivodeship', 'voivodeshipSlug', 'county']) {
    if (!isPlainString(row[field])) {
      errors.push(`${location}: brak lub pusty tekst w polu ${field}.`);
    }
  }

  if (!isNumber(row.lat) || row.lat < 48.5 || row.lat > 55.2) {
    errors.push(`${location}: nieprawidłowa szerokość geograficzna lat=${row.lat}.`);
  }

  if (!isNumber(row.lon) || row.lon < 13.8 || row.lon > 24.5) {
    errors.push(`${location}: nieprawidłowa długość geograficzna lon=${row.lon}.`);
  }

  if (isPlainString(row.slug)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) {
      errors.push(`${location}: slug ma nieprawidłowy format: ${row.slug}.`);
    }

    if (slugSet.has(row.slug)) {
      errors.push(`${location}: duplikat sluga ${row.slug}; pierwszy rekord: #${slugSet.get(row.slug) + 1}.`);
    }
    slugSet.set(row.slug, index);
  }

  if (isPlainString(row.voivodeshipSlug) && !allowedVoivodeshipSlugs.has(row.voivodeshipSlug)) {
    errors.push(`${location}: nieznany voivodeshipSlug: ${row.voivodeshipSlug}.`);
  }

  if (isPlainString(row.name)) {
    nameCounts.set(row.name, (nameCounts.get(row.name) || 0) + 1);
  }
}

const duplicateNames = [...nameCounts.entries()].filter(([, count]) => count > 1);

if (errors.length > 0) {
  console.error(`Walidacja nie powiodła się dla ${inputPath}`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Walidacja zakończona powodzeniem dla ${inputPath}`);
console.log(`Rekordy: ${data.length}`);
console.log(`Unikalne slugi: ${slugSet.size}`);
console.log(`Duplikaty nazw widocznych: ${duplicateNames.length}`);
if (duplicateNames.length > 0) {
  for (const [name, count] of duplicateNames.slice(0, 20)) {
    console.log(`- ${name}: ${count}`);
  }
}

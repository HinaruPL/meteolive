import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const sourcePath = process.argv[2]
  ? path.resolve(rootDir, process.argv[2])
  : path.join(rootDir, 'data', 'weather-cities-full.staging.json');
const targetPath = process.argv[3]
  ? path.resolve(rootDir, process.argv[3])
  : path.join(rootDir, 'data', 'weather-cities.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function cityKey(city) {
  return `${city.name}|${city.voivodeshipSlug}|${city.county}`.toLowerCase();
}

function sortCities(a, b) {
  return a.voivodeshipSlug.localeCompare(b.voivodeshipSlug, 'pl') ||
    a.name.localeCompare(b.name, 'pl') ||
    a.county.localeCompare(b.county, 'pl');
}

const source = readJson(sourcePath);
const target = readJson(targetPath);

if (!Array.isArray(source)) throw new Error(`Źródło nie jest tablicą: ${sourcePath}`);
if (!Array.isArray(target)) throw new Error(`Cel nie jest tablicą: ${targetPath}`);

const mergedByKey = new Map(target.map((city) => [cityKey(city), city]));
let added = 0;
let updated = 0;

source.forEach((city) => {
  const key = cityKey(city);
  if (mergedByKey.has(key)) updated += 1;
  else added += 1;
  mergedByKey.set(key, city);
});

const merged = Array.from(mergedByKey.values()).sort(sortCities);
writeJson(targetPath, merged);

console.log('Scalono bazę miast.');
console.log(`Źródło: ${path.relative(rootDir, sourcePath)} (${source.length} rekordów)`);
console.log(`Cel: ${path.relative(rootDir, targetPath)} (${target.length} -> ${merged.length} rekordów)`);
console.log(`Dodane: ${added}`);
console.log(`Zaktualizowane/zastąpione: ${updated}`);

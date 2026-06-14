# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages with the production domain `meteolive.pl`.

The `/pogoda/` section has been rebuilt from a flat city list into a structured weather directory:

- `/pogoda/` — list of 16 voivodeships + city search + geolocation.
- `/pogoda/[wojewodztwo]/` — cities from a voivodeship.
- `/pogoda/[miasto]/` — city forecast page.

Existing city URLs stay flat under `/pogoda/[miasto]/`, for example `/pogoda/warszawa/`, `/pogoda/krakow/`, `/pogoda/gdynia/`.

The city database is stored in one structured source-of-truth file:

- `data/weather-cities.json`

`script.js` loads this file and uses it for city forecasts, city search, search by voivodeship/county, JSON-LD collection data and geolocation nearest-city lookup.

Two generators have been added and tested:

- `tools/generate-weather-region-pages.mjs`
- `tools/generate-weather-city-pages.mjs`

## Completed

### Core site

- Production-ready homepage and global dark weather dashboard layout.
- Main radar/map pages:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- HTML sitemap page:
  - `/mapa-strony/`
- `404.html`, `robots.txt`, `sitemap.xml`, `assets/favicon.svg`.

### Pogoda / city pages

- Added and standardized the first 31 local city pages.
- Added 16 test city records, one from each voivodeship, to `data/weather-cities.json`.
- Created and regenerated 47 city pages from `data/weather-cities.json`.
- Regeneration commit:
  - `23be7b3b886947807771e1f701816ca8589cdd4d` — `Regenerate full SEO weather city pages`.
- Added full SEO city page generator:
  - `tools/generate-weather-city-pages.mjs`
- The generator creates full city pages with:
  - Polish city and voivodeship names in visible content,
  - slugs without Polish characters,
  - SEO title,
  - meta description,
  - canonical URL,
  - Open Graph tags,
  - Twitter tags,
  - JSON-LD `WebPage` + `Place` + `GeoCoordinates`,
  - breadcrumb navigation,
  - MET Norway forecast hook through existing `script.js`,
  - Windy rain iframe centered on the city coordinates,
  - Windy wind iframe centered on the city coordinates,
  - full radar/map card section: rain, storms, wind, temperature, warnings, other cities.

Local command for full city page regeneration:

```bash
node tools/generate-weather-city-pages.mjs
```

This command overwrites `/pogoda/[miasto]/index.html` for every valid city record in `data/weather-cities.json`.

### City data

- Added dedicated city data file:
  - `data/weather-cities.json`
- Current city record fields:
  - `name`,
  - `slug`,
  - `voivodeship`,
  - `voivodeshipSlug`,
  - `county`,
  - `lat`,
  - `lon`.
- `script.js` now loads city data from `data/weather-cities.json`.
- City search works by city name, slug, voivodeship, `voivodeshipSlug` and county.
- Geolocation chooses the nearest available city from `data/weather-cities.json`.
- Forecast widgets use coordinates from `data/weather-cities.json`.

### Pogoda / voivodeship pages

All 16 voivodeship pages now exist and are linked from `/pogoda/`:

- `/pogoda/dolnoslaskie/`
- `/pogoda/kujawsko-pomorskie/`
- `/pogoda/lubelskie/`
- `/pogoda/lubuskie/`
- `/pogoda/lodzkie/`
- `/pogoda/malopolskie/`
- `/pogoda/mazowieckie/`
- `/pogoda/opolskie/`
- `/pogoda/podkarpackie/`
- `/pogoda/podlaskie/`
- `/pogoda/pomorskie/`
- `/pogoda/slaskie/`
- `/pogoda/swietokrzyskie/`
- `/pogoda/warminsko-mazurskie/`
- `/pogoda/wielkopolskie/`
- `/pogoda/zachodniopomorskie/`

`sitemap.xml` has been updated with all 16 voivodeship pages and all 47 current city pages.

### Region generator

- Added:
  - `tools/generate-weather-region-pages.mjs`
- Purpose:
  - read `data/weather-cities.json`,
  - generate static `/pogoda/[wojewodztwo]/index.html` pages,
  - avoid manually maintaining region pages as the city database grows.
- Local command:

```bash
node tools/generate-weather-region-pages.mjs
```

### Poradniki

- Added `/poradniki/` and 14 weather guides.
- `script.js` adds structured data helpers for poradniki and weather collection pages.

### Legal, analytics and contact

- Added trust/legal pages:
  - `/o-nas/`
  - `/kontakt/`
  - `/polityka-prywatnosci/`
  - `/cookies/`
  - `/regulamin/`
- Temporary contact email:
  - `kontakt.meteolive@gmail.com`
- Added cookie banner through `script.js`.
- GA4 measurement ID:
  - `G-MQ1X7GSLXX`
- GA4 loads only after the user clicks `Akceptuję` in the cookie banner.
- Google AdSense is not added yet.

## Important notes

- MeteoLive does not scrape third-party weather or lightning data.
- MeteoLive is not an official weather warning service and must not present itself as one.
- For dangerous weather, pages should direct users to official IMGW-PIB warnings.
- MET Norway / api.met.no is used for local city forecast blocks.
- Windy iframes are used only as embedded map views with attribution/linking.
- External source decisions should stay documented in `docs/SOURCES_RESEARCH.md`.
- Counties remain data/grouping fields for now, not separate URL pages.
- Existing city URLs stay flat under `/pogoda/[miasto]/`.
- Google AdSense should be added only after the site has enough finished content and privacy/cookie notes are updated.

## Next steps

1. Verify Cloudflare Pages deployment after commit `23be7b3b886947807771e1f701816ca8589cdd4d`.
2. Test several city URLs after deployment:
   - `/pogoda/zamosc/`
   - `/pogoda/rybnik/`
   - `/pogoda/swinoujscie/`
   - `/pogoda/warszawa/`
3. Confirm that Windy rain and wind iframes center correctly on city coordinates.
4. If the 47-city test batch is OK, prepare verified full Polish city database with duplicate-name handling.
5. Add all Polish cities to `data/weather-cities.json` with unique slugs. If two cities have the same name, use disambiguated slugs such as `nazwa-wojewodztwo` or `nazwa-powiat`.
6. Regenerate city pages and voivodeship pages from the data file.
7. Regenerate/update `sitemap.xml` only with pages that actually exist.
8. Consider Cloudflare Worker cache/proxy for MET Norway if traffic grows significantly.
9. Configure Email Routing or SMTP for `kontakt@meteolive.pl` later.
10. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

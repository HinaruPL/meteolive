# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages with the production domain `meteolive.pl`.

The `/pogoda/` section has been rebuilt from a flat city list into a structured weather directory:

- `/pogoda/` — list of 16 voivodeships + city search + geolocation.
- `/pogoda/[wojewodztwo]/` — cities from a voivodeship.
- `/pogoda/[miasto]/` — existing city forecast page.

Existing city URLs stay flat under `/pogoda/[miasto]/`, for example `/pogoda/warszawa/`, `/pogoda/krakow/`, `/pogoda/gdynia/`.

The city database is stored in one structured source-of-truth file:

- `data/weather-cities.json`

`script.js` loads this file and uses it for city forecasts, city search, search by voivodeship/county, JSON-LD collection data and geolocation nearest-city lookup.

A generator for region pages has been added:

- `tools/generate-weather-region-pages.mjs`

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

- Added and standardized 31 local city pages.
- City pages show MET Norway forecast blocks through `script.js`:
  - current conditions,
  - hourly forecast,
  - multi-day forecast,
  - visible attribution to MET Norway / api.met.no,
  - localStorage cache for about 60 minutes,
  - fallback text if the forecast API is unavailable.

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

`sitemap.xml` has been updated with all 16 voivodeship pages.

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
- External source decisions should stay documented in `docs/SOURCES_RESEARCH.md`.
- Counties remain data/grouping fields for now, not separate URL pages.
- Existing city URLs stay flat under `/pogoda/[miasto]/`.
- Google AdSense should be added only after the site has enough finished content and privacy/cookie notes are updated.

## Next steps

1. Verify Cloudflare Pages deployment after the latest GitHub commits.
2. Test `/pogoda/`:
   - all 16 voivodeship links,
   - city search,
   - search by voivodeship,
   - search by county,
   - geolocation button.
3. Test the two newly finished region pages:
   - `/pogoda/podlaskie/`
   - `/pogoda/warminsko-mazurskie/`
4. Then start adding new city records to `data/weather-cities.json` in verified batches.
5. Add new city pages only after the data records are verified.
6. Keep `sitemap.xml` updated only with pages that actually exist.
7. Consider Cloudflare Worker cache/proxy for MET Norway if traffic grows significantly.
8. Configure Email Routing or SMTP for `kontakt@meteolive.pl` later.
9. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

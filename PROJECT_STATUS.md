# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages with the production domain `meteolive.pl`.

The `/pogoda/` section is being rebuilt from a flat city list into a structured weather directory:

- `/pogoda/` — list of voivodeships + city search + geolocation.
- `/pogoda/[wojewodztwo]/` — cities from a voivodeship.
- `/pogoda/[miasto]/` — existing city forecast page.

Existing city URLs stay flat under `/pogoda/[miasto]/`, for example `/pogoda/warszawa/`, `/pogoda/krakow/`, `/pogoda/gdynia/`.

The city database is now stored in one structured source-of-truth file:

- `data/weather-cities.json`

`script.js` loads this file and uses it for:

- city forecasts,
- city search,
- search by voivodeship,
- search by county,
- JSON-LD collection data,
- geolocation nearest-city lookup.

A generator for region pages has been added:

- `tools/generate-weather-region-pages.mjs`

## Production URLs

- `https://meteolive.pl/`
- `https://www.meteolive.pl/`
- `https://meteolive.pages.dev/`

## Completed

### Core site

- Created production-ready homepage and global dark weather dashboard layout.
- Added main radar/map pages:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- Added official alert source links on `/ostrzezenia-pogodowe/`.
- Added HTML sitemap page:
  - `/mapa-strony/`
- Added improved `404.html` with `noindex,follow`.
- Added `robots.txt`, `sitemap.xml` and `assets/favicon.svg`.

### Pogoda / city pages

- Added and standardized 31 local city pages:
  - `/pogoda/warszawa/`
  - `/pogoda/krakow/`
  - `/pogoda/wroclaw/`
  - `/pogoda/poznan/`
  - `/pogoda/gdansk/`
  - `/pogoda/gdynia/`
  - `/pogoda/lodz/`
  - `/pogoda/katowice/`
  - `/pogoda/lublin/`
  - `/pogoda/szczecin/`
  - `/pogoda/rzeszow/`
  - `/pogoda/bialystok/`
  - `/pogoda/bydgoszcz/`
  - `/pogoda/torun/`
  - `/pogoda/olsztyn/`
  - `/pogoda/kielce/`
  - `/pogoda/opole/`
  - `/pogoda/radom/`
  - `/pogoda/sosnowiec/`
  - `/pogoda/tarnow/`
  - `/pogoda/plock/`
  - `/pogoda/elblag/`
  - `/pogoda/walbrzych/`
  - `/pogoda/koszalin/`
  - `/pogoda/kalisz/`
  - `/pogoda/legnica/`
  - `/pogoda/zielona-gora/`
  - `/pogoda/gorzow-wielkopolski/`
  - `/pogoda/bielsko-biala/`
  - `/pogoda/gliwice/`
  - `/pogoda/czestochowa/`
- City pages automatically show MET Norway forecast blocks through `script.js`:
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
- City search works by:
  - city name,
  - slug,
  - voivodeship,
  - `voivodeshipSlug`,
  - county.
- Geolocation chooses the nearest available city from `data/weather-cities.json`.
- Forecast widgets use coordinates from `data/weather-cities.json`.

### Pogoda / voivodeship pages

- `/pogoda/` now links to existing voivodeship pages and keeps non-existing ones unlinked to avoid 404 pages.
- Added or kept available region pages:
  - `/pogoda/dolnoslaskie/`
  - `/pogoda/kujawsko-pomorskie/`
  - `/pogoda/lubelskie/`
  - `/pogoda/lubuskie/`
  - `/pogoda/lodzkie/`
  - `/pogoda/malopolskie/`
  - `/pogoda/mazowieckie/`
  - `/pogoda/opolskie/`
  - `/pogoda/podkarpackie/`
  - `/pogoda/pomorskie/`
  - `/pogoda/slaskie/`
  - `/pogoda/swietokrzyskie/`
  - `/pogoda/wielkopolskie/`
  - `/pogoda/zachodniopomorskie/`
- These pages list only cities that already exist as city forecast pages.
- `sitemap.xml` has been updated with the existing voivodeship pages only.

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
- Added GA4 measurement ID:
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

## Known issue / to finish

Two voivodeship pages still need to be created manually or through a later generator run:

- `/pogoda/podlaskie/`
- `/pogoda/warminsko-mazurskie/`

The assistant tool blocked direct creation attempts for these two files during the rollout, so `/pogoda/` currently keeps them unlinked to avoid 404 pages, and `sitemap.xml` does not include them yet.

## Next steps

1. Verify Cloudflare Pages deployment after the latest GitHub commits.
2. Test `/pogoda/`:
   - active voivodeship links,
   - city search,
   - search by voivodeship,
   - search by county,
   - geolocation button.
3. Test several region pages, for example:
   - `/pogoda/dolnoslaskie/`
   - `/pogoda/slaskie/`
   - `/pogoda/pomorskie/`
4. Finish the two remaining region pages:
   - `/pogoda/podlaskie/`
   - `/pogoda/warminsko-mazurskie/`
5. After those pages exist, update `/pogoda/` and `sitemap.xml` again.
6. Then start adding new city records to `data/weather-cities.json` in verified batches.
7. Add new city pages only after the data records are verified.
8. Keep `sitemap.xml` updated only with pages that actually exist.
9. Consider Cloudflare Worker cache/proxy for MET Norway if traffic grows significantly.
10. Configure Email Routing or SMTP for `kontakt@meteolive.pl` later.
11. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

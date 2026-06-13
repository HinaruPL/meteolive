# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages with the production domain `meteolive.pl`. The site has radar/map pages, legal/trust pages, a poradniki section, a city weather section and consent-based GA4.

The `/pogoda/` section has now started the planned rebuild from a flat city list into a structured weather directory by voivodeship. Existing city URLs remain unchanged, for example `/pogoda/warszawa/`, `/pogoda/krakow/` and `/pogoda/gdynia/`.

The city database has been moved out of inline JavaScript into one structured source-of-truth file: `data/weather-cities.json`. `script.js` now loads this file and uses it for city forecasts, city search, voivodeship/county search, JSON-LD collection data and geolocation.

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
- Added automatic MET Norway forecast widget for city pages through `script.js`:
  - works on `/pogoda/[city]/` pages,
  - uses configured city coordinates,
  - fetches `locationforecast/2.0/compact`,
  - caches results in `localStorage` for about 60 minutes,
  - shows current conditions, short hourly forecast and multi-day outlook,
  - shows visible attribution to MET Norway / api.met.no,
  - shows fallback text if the forecast API is unavailable.
- Rebuilt `/pogoda/` from a flat city list into a voivodeship-first directory:
  - shows 16 voivodeships,
  - keeps the city search box,
  - keeps the geolocation button,
  - avoids linking inactive voivodeships to 404 pages.
- Added first region page as a template:
  - `/pogoda/mazowieckie/`
- `/pogoda/mazowieckie/` currently links to existing city pages:
  - Warszawa,
  - Radom,
  - Płock.
- Added dedicated city data file:
  - `data/weather-cities.json`
- `data/weather-cities.json` currently stores 31 city records with:
  - `name`,
  - `slug`,
  - `voivodeship`,
  - `voivodeshipSlug`,
  - `county`,
  - `lat`,
  - `lon`.
- Updated `script.js` so it loads city data from `data/weather-cities.json` instead of keeping the city list inline.
- Added basic validation for city records in `script.js` before using them.
- Updated city search logic:
  - searches by city name,
  - searches by slug,
  - searches by voivodeship,
  - searches by `voivodeshipSlug`,
  - searches by county,
  - can render city result cards even when the main `/pogoda/` page shows voivodeships instead of all cities.
- Geolocation now chooses the nearest available city from `data/weather-cities.json`.
- Forecast widgets now use city coordinates from `data/weather-cities.json`.

### Poradniki

- Added weather guide section:
  - `/poradniki/`
  - `/poradniki/jak-czytac-radar-opadow/`
  - `/poradniki/jak-sprawdzic-czy-bedzie-padac/`
  - `/poradniki/jak-sprawdzic-pogode-przed-podroza/`
  - `/poradniki/jak-sprawdzic-pogode-na-weekend/`
  - `/poradniki/kiedy-burza-jest-blisko/`
  - `/poradniki/jak-zabezpieczyc-balkon-przed-wichura/`
  - `/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/`
  - `/poradniki/jak-sprawdzic-czy-bedzie-burza/`
  - `/poradniki/jak-przygotowac-sie-na-burze/`
  - `/poradniki/jak-sprawdzic-kierunek-wiatru/`
  - `/poradniki/jak-sprawdzic-silny-wiatr/`
  - `/poradniki/jak-przetrwac-upal/`
  - `/poradniki/czym-rozni-sie-prognoza-od-radaru/`
  - `/poradniki/co-oznaczaja-ostrzezenia-imgw/`
- Added structured data helpers in `script.js` for poradniki and current collection pages.

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
- Added Google Analytics 4 with measurement ID `G-MQ1X7GSLXX`.
- GA4 loads only after the user clicks `Akceptuję` in the cookie banner.
- Google AdSense is not added yet.

### Documentation

- Added source research notes:
  - `docs/SOURCES_RESEARCH.md`
- Added Codex working brief:
  - `docs/CODEX_BRIEF.md`
- Updated `sitemap.xml` after adding `/pogoda/mazowieckie/`.
- Updated `PROJECT_STATUS.md` after moving city data to `data/weather-cities.json`.

## Technical assumptions

- Static HTML/CSS/JS project.
- Hosting: Cloudflare Pages.
- Branch: `main`.
- Build command: empty.
- Build output directory: `.`.
- Domain: `meteolive.pl`.
- Local preview command:

```bash
python -m http.server 8000
```

## Important notes

- Windy embeds are used for radar/weather, rain, wind and temperature map previews.
- MET Norway / api.met.no is used for local city forecast blocks.
- City forecast requests are cached in `localStorage` for about 60 minutes per city.
- City forecast coordinates now come from `data/weather-cities.json`.
- The multi-day outlook is orientational and may change; user-facing text says so.
- City geolocation search runs in the browser after user permission and is used only to find the nearest configured city.
- MeteoLive does not scrape third-party weather or lightning data.
- MeteoLive is not an official warning service and must not present itself as one.
- City pages and guides should keep clear links to official IMGW-PIB warnings instead of presenting MeteoLive as an official alert source.
- Cookie banner stores a local choice in `localStorage`.
- GA4 measurement ID: `G-MQ1X7GSLXX`.
- GA4 loads only after the user selects `Akceptuję`; it does not load after `Tylko niezbędne`.
- Google AdSense is not added yet.
- Any future data source must be checked for embedding rules, licensing, attribution and commercial use.
- External source decisions should remain documented in `docs/SOURCES_RESEARCH.md`.
- Temporary contact email is `kontakt.meteolive@gmail.com`.
- Domain contact email `kontakt@meteolive.pl` is planned later, after Email Routing or SMTP is configured.
- Google Search Console property is verified and sitemap has been submitted.
- AdSense should be added only after the site has enough finished content and privacy/cookie notes are updated for ads.

## Recommended data / URL structure going forward

Target structure:

- `/pogoda/` — voivodeships + search by city/location/voivodeship.
- `/pogoda/[wojewodztwo]/` — cities from that voivodeship, optionally grouped by county headings.
- `/pogoda/[miasto]/` — existing city forecast page.

Current source-of-truth city data fields in `data/weather-cities.json`:

- `name`
- `slug`
- `voivodeship`
- `voivodeshipSlug`
- `county`
- `lat`
- `lon`

Important: existing city URLs should stay flat under `/pogoda/[miasto]/`, not nested under voivodeships, to preserve current URLs and avoid redirects. Counties should remain data/grouping fields for now, not separate URL pages.

## Next steps

1. Verify the latest Cloudflare Pages deployment after GitHub changes are built.
2. Test whether `/data/weather-cities.json` loads in the browser.
3. Test `/pogoda/`:
   - voivodeship cards,
   - search by city name,
   - search by voivodeship,
   - geolocation button.
4. Test `/pogoda/mazowieckie/`:
   - city links to Warszawa, Radom and Płock,
   - search box,
   - mobile layout.
5. Test forecast widgets on a few city pages, e.g. `/pogoda/warszawa/`, `/pogoda/gdynia/`, `/pogoda/krakow/`.
6. Add the remaining 15 voivodeship pages in small batches, using `/pogoda/mazowieckie/` as the template.
7. Add new city records to `data/weather-cities.json` in batches from one verified city source: name, slug, voivodeship, voivodeshipSlug, county, lat, lon.
8. Add new city pages in batches after the data records are verified.
9. Keep `sitemap.xml` updated only with pages that actually exist.
10. Ensure `www.meteolive.pl` redirects to `meteolive.pl` with 301 redirect.
11. Add more weather guides in small batches.
12. Consider Cloudflare Worker cache/proxy for MET Norway if traffic grows significantly.
13. Configure Email Routing or SMTP for `kontakt@meteolive.pl` later.
14. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

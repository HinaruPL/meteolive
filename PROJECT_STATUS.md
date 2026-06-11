# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages and the production domain is connected. The core site is now in a stronger pre-publication state: homepage copy is production-ready, core radar/map pages are expanded, trust/legal pages are in place, the city index is expanded, 21 local city pages are available, the editorial/weather guide section contains 7 practical poradniki, structured data has been added for the guides section, the contact page uses a temporary working Gmail address, privacy/cookies pages are prepared, a simple cookie banner is active, and Google Analytics 4 is configured to load only after the user clicks `Akceptuję`.

Production URLs:

- `https://meteolive.pl/`
- `https://www.meteolive.pl/`
- `https://meteolive.pages.dev/`

## Completed

- Created/updated README with project goal and local preview instructions.
- Added global CSS for modern dark weather dashboard layout.
- Added basic JavaScript helpers for current year and local refresh text.
- Added structured data helpers in `script.js` for:
  - `/poradniki/` as `CollectionPage` + `ItemList`,
  - guide pages as `Article` + `FAQPage`.
- Added static `BreadcrumbList` JSON-LD directly in guide HTML pages.
- Added production homepage copy.
- Added radar pages:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- Expanded SEO content on:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- Added weather guide section:
  - `/poradniki/`
  - `/poradniki/jak-czytac-radar-opadow/`
  - `/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/`
  - `/poradniki/jak-sprawdzic-czy-bedzie-burza/`
  - `/poradniki/jak-przygotowac-sie-na-burze/`
  - `/poradniki/jak-sprawdzic-kierunek-wiatru/`
  - `/poradniki/czym-rozni-sie-prognoza-od-radaru/`
  - `/poradniki/co-oznaczaja-ostrzezenia-imgw/`
- Linked weather guides from the homepage and expanded the guides index.
- Added and expanded city index:
  - `/pogoda/`
- Added and standardized local city pages:
  - `/pogoda/warszawa/`
  - `/pogoda/krakow/`
  - `/pogoda/wroclaw/`
  - `/pogoda/poznan/`
  - `/pogoda/gdansk/`
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
  - `/pogoda/zielona-gora/`
  - `/pogoda/gorzow-wielkopolski/`
  - `/pogoda/bielsko-biala/`
  - `/pogoda/gliwice/`
  - `/pogoda/czestochowa/`
- Replaced short ASCII-only city pages with fuller Polish versions where needed.
- Unified city page navigation with links to radar pages, warnings, guides and city index.
- Unified city page footers with trust/legal links.
- Added trust/legal pages:
  - `/o-nas/`
  - `/kontakt/`
  - `/polityka-prywatnosci/`
  - `/cookies/`
  - `/regulamin/`
- Updated `/kontakt/` with temporary working email address:
  - `kontakt.meteolive@gmail.com`
- Expanded `/polityka-prywatnosci/` with information about technical data, cookies, external maps, Google Analytics, future ads and contact.
- Added `/cookies/` as a dedicated cookie information page.
- Updated `/cookies/` after GA4 setup with measurement ID `G-MQ1X7GSLXX` and consent behavior.
- Updated `/regulamin/` with cookies, analytics and future ads notes.
- Added a simple global cookie consent banner through `script.js`.
- Added cookie banner styles in `style.css`.
- Added Google Analytics 4 through `script.js` with measurement ID `G-MQ1X7GSLXX`.
- Temporarily changed GA4 to load immediately through `script.js` so the Google Analytics setup wizard could detect the tag.
- Restored GA4 to consent-based loading after Analytics setup was completed.
- Added `robots.txt`.
- Added and updated `sitemap.xml` with radar pages, city pages, trust/legal pages, cookies page and all current weather guides.
- Added improved `404.html` with `noindex,follow` and footer links.
- Added `assets/favicon.svg`.
- Added source research notes:
  - `docs/SOURCES_RESEARCH.md`
- Added Codex working brief:
  - `docs/CODEX_BRIEF.md`
- Deployed the static site to Cloudflare Pages.
- Connected production domain `meteolive.pl`.
- Added live/embedded map sources:
  - storm radar on `/radar-burz/` through Windy.com radar embed,
  - lightning preview on `/radar-burz/` through attributed burze.dzis.net / Blitzortung.org map preview,
  - rain map on `/radar-opadow/` through attributed Windy.com embed,
  - wind map on `/radar-wiatru/` through attributed Windy.com embed,
  - temperature map on `/mapa-temperatury/` through attributed Windy.com embed.
- Added official alert source links on `/ostrzezenia-pogodowe/`.
- Updated source decision documentation after production launch.

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
- The storm page uses Windy as the main radar weather view and an externally hosted lightning preview from burze.dzis.net with attribution to burze.dzis.net and Blitzortung.org.
- MeteoLive does not scrape third-party weather or lightning data.
- MeteoLive is not an official warning service and must not present itself as one.
- City pages and guides should keep clear links to official IMGW-PIB warnings instead of presenting MeteoLive as an official alert source.
- Structured data is injected through `script.js` for guide `Article` and `FAQPage`; guide breadcrumbs are static in HTML.
- Cookie banner stores a local choice in `localStorage`.
- GA4 measurement ID: `G-MQ1X7GSLXX`.
- GA4 loads only after the user selects `Akceptuję`; it does not load after `Tylko niezbędne`.
- Google AdSense is not added yet.
- Any future data source must be checked for embedding rules, licensing, attribution and commercial use.
- External source decisions should remain documented in `docs/SOURCES_RESEARCH.md`.
- Temporary contact email is `kontakt.meteolive@gmail.com`.
- Domain contact email `kontakt@meteolive.pl` is planned later, after Email Routing or SMTP is configured.
- Google Search Console property is verified and sitemap has been submitted.
- Main pages have been manually submitted for indexing in Google Search Console.
- AdSense should be added only after the site has enough finished content and privacy/cookie notes are updated for ads.

## Next steps

1. Verify the latest Cloudflare Pages deployment after GitHub changes are built.
2. Test GA4 Realtime after clicking `Akceptuję` in a fresh/incognito session.
3. Check that GA4 does not load after clicking `Tylko niezbędne`.
4. Check `/kontakt/`, `/polityka-prywatnosci/`, `/cookies/` and `/regulamin/` after deployment.
5. Check whether Google discovers the expanded `/pogoda/` city URLs and `/poradniki/` URLs.
6. Ensure `www.meteolive.pl` redirects to `meteolive.pl` with 301 redirect.
7. Add more weather guides in small batches.
8. Add more city pages in small batches.
9. Consider future structured weather data provider for city forecasts.
10. Configure Email Routing or SMTP for `kontakt@meteolive.pl` later.
11. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

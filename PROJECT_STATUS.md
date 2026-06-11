# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages and the production domain is connected. The core site is now in a stronger pre-publication state: homepage copy is production-ready, core radar/map pages are expanded, trust/legal pages are in place, the city index is expanded, 11 local city pages are available, the editorial/weather guide section contains 7 practical poradniki, and structured data has been added for the guides section.

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
  - guide pages as `Article` + `FAQPage` + `BreadcrumbList`.
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
- Replaced short ASCII-only city pages with fuller Polish versions where needed.
- Unified city page navigation with links to radar pages, warnings and city index.
- Unified city page footers with trust/legal links.
- Added trust/legal pages:
  - `/o-nas/`
  - `/kontakt/`
  - `/polityka-prywatnosci/`
  - `/regulamin/`
- Added `robots.txt`.
- Added and updated `sitemap.xml` with radar pages, city pages, trust/legal pages and all current weather guides.
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
- Structured data is currently injected through `script.js` for guide pages and the guide index.
- Any future data source must be checked for embedding rules, licensing, attribution and commercial use.
- External source decisions should remain documented in `docs/SOURCES_RESEARCH.md`.
- The contact email `kontakt@meteolive.pl` should be activated or replaced with an active address.
- Google Search Console property is verified and sitemap has been submitted.
- AdSense should not be added yet. Add it after more finished content and after privacy/cookie notes are ready for advertising.
- Analytics should be added later together with CMP/cookie consent.

## Next steps

1. Verify the latest Cloudflare Pages deployment after GitHub changes are built.
2. Test at least one guide URL in Google Rich Results Test or Schema Markup Validator.
3. Resubmit or refresh `https://meteolive.pl/sitemap.xml` in Google Search Console after deployment.
4. Check whether Google discovers the expanded `/poradniki/` URLs.
5. When manual indexing quota is available again, request indexing for `/`, `/poradniki/`, `/radar-burz/`, `/radar-opadow/` and `/ostrzezenia-pogodowe/` first.
6. Ensure `www.meteolive.pl` redirects to `meteolive.pl` with 301 redirect.
7. Check live versions of all city and guide URLs after deployment.
8. Activate `kontakt@meteolive.pl` or replace it with an active contact email.
9. Add more weather guides in small batches.
10. Add more city pages in small batches.
11. Consider future structured weather data provider for city forecasts.
12. Add Google Analytics only when CMP/cookie consent is ready.
13. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.

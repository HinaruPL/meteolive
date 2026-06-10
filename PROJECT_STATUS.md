# MeteoLive — PROJECT_STATUS

## Current status

MeteoLive is live on Cloudflare Pages and the production domain is connected. The first production polish pass is complete: homepage copy no longer uses MVP/test wording, core radar pages have working external map views, and basic trust/legal pages are in place.

Production URLs:

- `https://meteolive.pl/`
- `https://www.meteolive.pl/`
- `https://meteolive.pages.dev/`

## Completed

- Created/updated README with project goal and local preview instructions.
- Added global CSS for modern dark weather dashboard layout.
- Added basic JavaScript helpers for current year and local refresh text.
- Added production homepage copy.
- Added radar pages:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- Added first local city template:
  - `/pogoda/warszawa/`
- Added trust/legal pages:
  - `/o-nas/`
  - `/kontakt/`
  - `/polityka-prywatnosci/`
  - `/regulamin/`
- Added `robots.txt`.
- Added and updated `sitemap.xml`.
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
- Any future data source must be checked for embedding rules, licensing, attribution and commercial use.
- External source decisions should remain documented in `docs/SOURCES_RESEARCH.md`.
- The contact email `kontakt@meteolive.pl` should be activated or replaced with an active address.

## Next steps

1. Verify all live URLs after Cloudflare deployment finishes.
2. Ensure `www.meteolive.pl` redirects to `meteolive.pl` with 301 redirect.
3. Submit `https://meteolive.pl/sitemap.xml` in Google Search Console.
4. Add Google Analytics when ready.
5. Add AdSense only after the site has enough finished content and privacy/cookie notes are updated.
6. Add stronger SEO content and FAQ sections for each radar page.
7. Add city pages for the largest Polish cities.
8. Consider future structured weather data provider for city forecasts.

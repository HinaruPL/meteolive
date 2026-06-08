# MeteoLive — PROJECT_STATUS

## Current status

Initial static MVP structure has been created.

## Completed

- Created/updated README with project goal and local preview instructions.
- Added global CSS for modern dark weather dashboard layout.
- Added basic JavaScript helpers for current year and local refresh text.
- Added homepage MVP.
- Added radar pages:
  - `/radar-burz/`
  - `/radar-opadow/`
  - `/radar-wiatru/`
  - `/mapa-temperatury/`
  - `/ostrzezenia-pogodowe/`
- Added first local city template:
  - `/pogoda/warszawa/`
- Added `robots.txt`.
- Added `sitemap.xml`.

## Technical assumptions

- Static HTML/CSS/JS project.
- Intended hosting: Cloudflare Pages.
- Intended domain: `meteolive.pl`.
- Local preview command:

```bash
python -m http.server 8000
```

## Important notes

- Windy embeds are currently used only as MVP/test placeholders on some map pages.
- Before production launch, all external map/data sources must be checked for embedding rules, licensing, attribution and commercial use.
- Storm radar page currently uses a visual placeholder until a safe source for lightning/burza data is selected.

## Next steps

1. Test locally in browser.
2. Improve mobile details and navigation if needed.
3. Choose final external sources for storm, rain, wind, temperature and alerts.
4. Add proper source attribution blocks.
5. Add SEO content for each radar page.
6. Add core city pages after domain setup.
7. Connect to Cloudflare Pages when ready.

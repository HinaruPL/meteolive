# MeteoLive — source research

This file tracks external map/data sources considered for MeteoLive.

## Current MVP approach

The first MVP uses simple embedded maps where possible, plus placeholders where licensing or embedding details still need verification.

## Sources to verify before production

### Windy Embed

Potential use:

- Wind map
- Temperature map
- Rain/weather layer preview

Notes:

- Windy provides an official embed generator.
- The embed generator allows selecting map view, layer, model, units and then copying embed HTML.
- Windy also provides a Map Forecast API, but the API documentation says the testing version is for development only and is not allowed in production. Production work should use the professional version.

Decision for now:

- OK for MVP visual testing through public embed.
- Do not build a custom Windy API implementation without checking pricing and production terms.

### RainViewer Weather Radar API

Potential use:

- Radar opadów
- Rain radar tiles
- Future custom Leaflet rain map

Notes:

- RainViewer describes its public Weather Radar API as free for personal, educational and small-scale community use.
- Attribution is required, for example visible credit with a link to RainViewer.
- The free tier is not meant for high-volume commercial integrations without separate terms.

Decision for now:

- Candidate for a future custom rain radar page.
- Before production with ads/traffic, verify commercial suitability or contact RainViewer.

### IMGW public data

Potential use:

- Weather alerts
- Public observational data
- Official Polish meteorological references

Notes:

- IMGW public data service states that using the service means accepting the regulations.
- Before using IMGW content/data directly, the exact rules for reuse, attribution and commercial context must be checked.

Decision for now:

- Use cautiously.
- Prefer linking/citing official information until reuse rules are confirmed.

### Lightning/storm maps

Potential use:

- Radar burz
- Lightning map

Notes:

- Storm/lightning data is sensitive from a licensing perspective.
- Do not scrape or rehost lightning data.
- Choose either an official embeddable map or a provider with clear terms.

Decision for now:

- Keep storm page as placeholder.
- Research safe embedding options before production.

## Production rule

Before MeteoLive goes live with ads or real SEO traffic, every external source must have:

1. confirmed permission or official embed/API usage path,
2. visible attribution if required,
3. graceful fallback if the source fails,
4. no scraping of third-party content.

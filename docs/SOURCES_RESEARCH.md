# MeteoLive — source research

This file tracks external map/data sources considered for MeteoLive.

## Current production approach

MeteoLive is now live on `https://meteolive.pl/`. The current production version uses official public embeds or clearly attributed external map previews where possible.

## Source decisions

### Windy Embed

Current use:

- `/radar-opadow/` — rain/weather map preview
- `/radar-wiatru/` — wind map preview
- `/mapa-temperatury/` — temperature map preview

Notes:

- Windy provides an official embed generator.
- The embed generator allows selecting map view, layer, model, units and then copying embed HTML.
- Windy also provides a Map Forecast API, but the API documentation says the testing version is for development only and is not allowed in production. Production work should use the professional version.

Decision:

- OK for current production as public iframe embeds with visible attribution to Windy.com.
- Do not build a custom Windy API implementation without checking pricing and production terms.

### burze.dzis.net / Blitzortung.org

Current use:

- `/radar-burz/` — externally hosted animated storm map image linked to burze.dzis.net.

Notes:

- burze.dzis.net provides a webmaster page with ready map snippets and allows hotlinking/copying maps when source information/link is preserved.
- The map uses lightning data from Blitzortung.org.
- MeteoLive does not fetch, scrape, store or reprocess raw Blitzortung data.

Decision:

- OK for current production as an attributed external map preview.
- Keep visible credit for burze.dzis.net and Blitzortung.org.
- Do not build a custom lightning map from raw Blitzortung data without explicit permission or a clear commercial license.

### RainViewer Weather Radar API

Potential use:

- Future custom rain radar page
- Future Leaflet/MapLibre radar tiles

Notes:

- RainViewer describes its public Weather Radar API as free for personal, educational and small-scale community use.
- Attribution is required, for example visible credit with a link to RainViewer.
- The free tier is not meant for high-volume commercial integrations without separate terms.

Decision:

- Candidate for a future custom rain radar page.
- Before production with ads/traffic, verify commercial suitability or contact RainViewer.

### IMGW public data / IMGW-PIB

Current use:

- `/ostrzezenia-pogodowe/` links to official IMGW-PIB weather information and warns users that MeteoLive does not replace official alerts.

Potential future use:

- Weather alerts
- Public observational data
- Official Polish meteorological references

Notes:

- IMGW public data service states that using the service means accepting the regulations.
- Before using IMGW content/data directly, the exact rules for reuse, attribution and commercial context must be checked.

Decision:

- Use cautiously.
- Current implementation links to official IMGW-PIB information rather than copying or reprocessing official alert data.
- If MeteoLive later displays IMGW data directly, include required attribution and document data processing clearly.

### Open-Meteo

Potential use:

- Future city forecasts
- Weather data API

Notes:

- Free Open-Meteo access is not appropriate for sites with advertising/commercial use.
- Paid Open-Meteo may be considered later if city pages need structured forecast data.

Decision:

- Do not use the free API for MeteoLive with ads/commercial traffic.
- Consider paid usage later.

### MET Norway API

Potential use:

- Future city forecasts through a cached/proxied backend.

Notes:

- Requires proper attribution and responsible API usage.
- Should not be called directly at scale from a static frontend.

Decision:

- Possible later with Cloudflare Worker cache/proxy.
- Not used in current static MVP.

### OpenWeatherMap

Potential use:

- Future current weather and forecasts for city pages.

Notes:

- Requires API key and limit management.
- A backend/proxy is preferable for key protection and caching.

Decision:

- Possible later for city pages.
- Not used in current static MVP.

## Production rule

Before adding any new external source, every integration must have:

1. confirmed permission or official embed/API usage path,
2. visible attribution if required,
3. graceful fallback if the source fails,
4. no scraping of third-party content,
5. clear wording that MeteoLive is not an official warning service unless the source and role are explicitly official.

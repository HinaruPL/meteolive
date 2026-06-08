# Codex brief — MeteoLive MVP

## Project context

MeteoLive is a Polish weather radar website focused on live maps and SEO-friendly pages.

The goal is to build a modern, fast, mobile-friendly static website for:

- radar burz,
- radar opadów,
- radar wiatru,
- mapa temperatury,
- ostrzeżenia pogodowe,
- pogoda dla miast.

The project is intentionally static for now: HTML, CSS and JavaScript only.

## Current repository state

The initial MVP skeleton already exists:

- `index.html`
- `style.css`
- `script.js`
- radar pages
- first city page template
- `robots.txt`
- `sitemap.xml`
- `PROJECT_STATUS.md`
- `docs/SOURCES_RESEARCH.md`

## Main task for Codex

Improve the existing MVP without changing the project into a framework app.

Keep it static and Cloudflare Pages friendly.

## Priorities

1. Improve layout consistency across all pages.
2. Avoid repeated header/footer HTML where possible only if it can still work as static files without build tooling.
3. Add a proper `404.html` page.
4. Add `assets/` folder and a lightweight SVG favicon/logo.
5. Add Open Graph and Twitter meta tags to all pages.
6. Add canonical URLs assuming final domain `https://meteolive.pl`.
7. Add semantic sections and breadcrumbs on subpages.
8. Add visible attribution blocks for embedded third-party maps.
9. Improve accessibility:
   - clear heading hierarchy,
   - aria labels where needed,
   - visible focus states,
   - good contrast,
   - keyboard-friendly navigation.
10. Improve mobile navigation if necessary.
11. Update `sitemap.xml` after adding or renaming pages.
12. Update `PROJECT_STATUS.md` after major changes.

## Style direction

Modern weather dashboard:

- dark navy background,
- cyan / blue / green accents,
- glass cards,
- clean mobile UI,
- premium but simple,
- fast loading,
- no heavy libraries.

## SEO writing style

Polish language, natural and practical.

Content should be useful, not generic filler. Every page should explain:

- what the map shows,
- how to read it,
- when it is useful,
- what the limitations are,
- which related MeteoLive pages help verify the situation.

Use simple language for regular users.

## External source safety

Do not scrape third-party data.

Do not claim data is official unless it actually comes from an official source.

Do not remove source attribution from embeds.

Before adding any new external provider, check whether it provides an official embed/API and note the source in `docs/SOURCES_RESEARCH.md`.

## Local test

Run:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Check these pages:

- `/`
- `/radar-burz/`
- `/radar-opadow/`
- `/radar-wiatru/`
- `/mapa-temperatury/`
- `/ostrzezenia-pogodowe/`
- `/pogoda/warszawa/`
- `/404.html`

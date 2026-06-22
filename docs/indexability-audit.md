# Audyt indeksowalności MeteoLive

Data audytu: 2026-06-22T15:19:25.994Z

## Podsumowanie

- Liczba miast w `data/weather-cities.json`: 1038
- Liczba statycznych stron miast na dysku: 1038
- Liczba stron województw na dysku: 16
- Liczba URL-i w `sitemap.xml`: 1086
- Brakujące pliki stron miast: 0
- Brakujące URL-e miast w sitemap: 0
- URL-e z sitemap bez pliku: 0
- Duplikaty w sitemap: 0
- URL-e bez końcowego slash: 0
- Błędne canonicale w próbie kontrolnej: 0
- Wystąpienia `noindex` na stronach miast/województw: 0

## Sitemap

`sitemap.xml` zawiera 1086 URL-i. Audyt potwierdził pokrycie wszystkich miast z bazy, stron województw, hubów SEO i strony źródeł danych.

Brakujące URL-e miast:

- brak

URL-e z sitemap bez odpowiadającego pliku:

- brak

Duplikaty w sitemap:

- brak

URL-e bez końcowego slash:

- brak

## Robots.txt

- `/pogoda/` blokowane: nie
- `/data/` blokowane: nie
- Sitemap wskazana jako `https://meteolive.pl/sitemap.xml`: tak

## Canonicale

Sprawdzono stronę główną, `/pogoda/`, huby SEO, kilka województw oraz rozproszoną próbę 30 stron miast. Canonicale powinny wskazywać dokładny URL strony.

Błędne canonicale:

- brak

## Noindex i dyrektywy robots

Wyszukano `noindex`, meta `robots` i `X-Robots-Tag` w plikach HTML.

- Pliki z `noindex`: 1
- Pliki z meta `robots`: 1
- Pliki z `X-Robots-Tag`: 0
- Pliki `/pogoda/` z `noindex`: 0

Pliki HTML z `noindex`:

- 404.html

Pliki `/pogoda/` z `noindex`:

- brak

## Strony statyczne

Strony miast istnieją jako statyczne pliki `pogoda/[slug]/index.html`. Główna treść strony, title, meta description, canonical, sekcje radarów i linki są obecne w HTML, więc crawler nie musi generować podstawowej treści przez JavaScript.

## Rekomendacja

Audyt nie wykazał technicznej blokady indeksacji. Sitemap, robots.txt, canonicale i statyczne pliki stron miast wyglądają poprawnie. Niski poziom indeksacji w Google Search Console najpewniej wynika z czasu potrzebnego na crawling, crawl budget oraz podobieństwa wielu lokalnych stron pogodowych. Warto obserwować GSC po kolejnych deployach i nie wykonywać nerwowych zmian masowych bez danych z raportów Google.

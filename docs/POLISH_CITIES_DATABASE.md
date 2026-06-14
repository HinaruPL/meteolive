# Pełna baza miast Polski — MeteoLive

## Cel

Celem jest przygotowanie produkcyjnej bazy miast dla sekcji `/pogoda/`, tak aby można było wygenerować pełne strony pogodowe dla wszystkich miast w Polsce.

Docelowy plik produkcyjny:

```text
data/weather-cities.json
```

Plik roboczy/staging dla pełnej bazy:

```text
data/weather-cities-full.staging.json
```

## Wymagany format rekordu

Każde miasto musi mieć dokładnie te pola:

```json
{
  "name": "Zamość",
  "slug": "zamosc",
  "voivodeship": "lubelskie",
  "voivodeshipSlug": "lubelskie",
  "county": "Zamość",
  "lat": 50.7231,
  "lon": 23.2519
}
```

## Reguły jakości

1. `name` ma zawierać polskie znaki.
2. `voivodeship` ma zawierać poprawną polską nazwę województwa, np. `dolnośląskie`, `łódzkie`, `śląskie`.
3. `slug` nie używa polskich znaków i jest bezpieczny do adresu URL.
4. `slug` musi być unikalny w całej bazie.
5. Jeżeli kilka miast ma tę samą nazwę, slug musi być rozróżniony, np.:

```text
olesnica-dolnoslaskie
olesnica-swietokrzyskie
olsztyn-warminsko-mazurskie
olsztyn-slaskie
```

6. `county` ma rozróżniać miasto/powiat, szczególnie przy miastach na prawach powiatu.
7. `lat` i `lon` muszą wskazywać centrum miejscowości i mieścić się w granicach Polski.
8. Nie dodajemy miejscowości bez współrzędnych, bo prognoza MET Norway i Windy wymagają `lat/lon`.

## Źródła danych

Preferowana kolejność:

1. Oficjalny wykaz miejscowości / miast z rejestru TERYT/SIMC.
2. Źródło współrzędnych o jasnej licencji i możliwości użycia na stronie statycznej.
3. Ręczna weryfikacja problematycznych rekordów: duplikaty nazw, miasta o tej samej nazwie w różnych województwach, miasta na prawach powiatu.

Uwaga: sama lista nazw miast nie wystarczy. Do działania prognozy i map potrzebne są współrzędne.

## Komendy robocze

### 1. Walidacja obecnej lub stagingowej bazy

```bash
node tools/validate-weather-cities.mjs data/weather-cities.json
node tools/validate-weather-cities.mjs data/weather-cities-full.staging.json
```

Walidator sprawdza:

- wymagane pola,
- format slugów,
- duplikaty slugów,
- znane województwa,
- podstawowy zakres współrzędnych Polski,
- potencjalne duplikaty miasto/województwo/powiat.

### 2. Scalenie stagingu z produkcją

```bash
node tools/merge-weather-cities.mjs data/weather-cities-full.staging.json data/weather-cities.json
```

### 3. Wygenerowanie stron miast

```bash
node tools/generate-weather-city-pages.mjs
```

### 4. Wygenerowanie stron województw

```bash
node tools/generate-weather-region-pages.mjs
```

### 5. Walidacja po wygenerowaniu

```bash
node tools/validate-weather-cities.mjs data/weather-cities.json
```

## Kolejność wdrożenia pełnej bazy

1. Przygotować `data/weather-cities-full.staging.json`.
2. Zweryfikować, ile rekordów ma staging.
3. Uruchomić walidator.
4. Naprawić duplikaty slugów i błędne współrzędne.
5. Scalić staging z `data/weather-cities.json`.
6. Ponownie uruchomić walidator.
7. Wygenerować strony miast.
8. Wygenerować strony województw.
9. Zaktualizować `sitemap.xml` tylko o istniejące strony.
10. Sprawdzić kilka miast ręcznie:
    - duże miasto,
    - małe miasto,
    - miasto z polskimi znakami,
    - miasto o powtarzającej się nazwie,
    - miasto nad morzem / w górach / na granicy.

## Uwaga SEO

Każde miasto generuje osobną stronę z pełnym SEO. Po dodaniu pełnej bazy liczba stron może znacząco wzrosnąć, dlatego przed masowym wdrożeniem trzeba upewnić się, że:

- strony nie są puste,
- mają unikalne `title` i `meta description`,
- Windy iframe wskazuje właściwe miasto,
- prognoza MET Norway ładuje się na podstawie współrzędnych,
- sitemap nie zawiera nieistniejących adresów.

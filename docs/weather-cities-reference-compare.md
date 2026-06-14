# Porównanie `weather-cities-final.staging.json` z listą referencyjną

## Źródło referencyjne

- Użyta lista referencyjna: [List of cities and towns in Poland](https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Poland)
- Powód użycia: w tym środowisku nie udało się stabilnie pobrać oficjalnego TERYT/SIMC z GUS, więc użyłem publicznej listy aktualnych miast i miasteczek jako proxy.
- Z tej listy wynika stan referencyjny na 1 stycznia 2026: `1026` lokalizacji sklasyfikowanych jako miasto lub miasteczko.

## Liczby

- Rekordy w final staging: `1038`
- Nazwy w liście referencyjnej: `1026`
- Różnica: `+12`

## Rekordy stagingu, których nie ma na liście referencyjnej

Nie zidentyfikowałem nowych rekordów, które z wystarczającą pewnością można by usunąć na podstawie samej listy referencyjnej i bez bezpośredniego TERYT/SIMC.

W praktyce wcześniejsze rekordy wysokiego ryzyka zostały już usunięte w poprzednich rundach, a te, które nadal pozostają w stagingu i mogłyby wyglądać podejrzanie, to realne miasta, na przykład:

- `Dobre Miasto`
- `Nowe Miasto`
- `Nowe Miasto Lubawskie`
- `Nowe Miasto nad Pilicą`
- `Olsztyn`

Te nazwy wyglądają „opisowo”, ale są prawidłowymi nazwami aktualnych miast/miasteczek.

## Nazwy referencyjne brakujące w stagingu

- Nie znalazłem nazw, które z wysoką pewnością trzeba by dodać do `weather-cities-final.staging.json`.
- Wszystkie `47/47` miast produkcyjnych z `data/weather-cities.json` są nadal obecne.

## Różnice wynikające z przecinków i polskich znaków

- W listach referencyjnych często występują formy rozróżniające typu `Dobra, Łobez County` albo `Oleśnica, Lower Silesian Voivodeship`.
- W stagingu zachowane są pełne polskie nazwy widoczne dla użytkownika, a rozróżnianie duplikatów odbywa się przez slug.
- Nie widzę potrzeby zmiany widocznych nazw tylko z powodu przecinków albo znaków diakrytycznych.

## Rekomendacja

- `data/weather-cities-reference-clean.staging.json` może pozostać zgodny z `data/weather-cities-final.staging.json`.
- Nie rekomenduję dalszego cięcia bez bezpośredniego porównania z TERYT/SIMC.
- Jeśli potrzebujemy ścisłej zgodności z urzędowym rejestrem, następny krok powinien użyć oficjalnego eksportu GUS, a nie proxy z Wikipedii.

## Walidacja

- `node tools/validate-weather-cities.mjs data/weather-cities-reference-clean.staging.json`
- Wynik: `Validation passed`
- Rekordy: `1038`
- Unikalne slugi: `1038`
- Duplikaty widocznych nazw: `5`


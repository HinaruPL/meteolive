# Raport końcowego czyszczenia `weather-cities-final.staging.json`

## Podsumowanie

- Liczba rekordów przed ostatnim czyszczeniem: `1039`
- Liczba rekordów po ostatnim czyszczeniu: `1038`
- Liczba usuniętych rekordów: `1`
- Docelowy poziom orientacyjny: około `1026`
- Różnica względem orientacyjnego celu po tej rundzie: `+12`

## Co usunięto

1. `Dobrzyń (Golub-Dobrzyń)`  
   Powód: rekord wyglądał na niepoprawny wpis z nazwą w formie disambiguacji, a nie na aktualne miasto/miasteczko. W praktyce poprawnym aktualnym ośrodkiem jest `Golub-Dobrzyń`.

## Co pozostawiono mimo wątpliwości

1. `Dobre Miasto`  
   Powód: nazwa może wyglądać „opisowo”, ale to prawdziwe i aktualne miasto w Polsce, więc rekord został zachowany.

## Miasta produkcyjne

- Wszystkie `47/47` obecnych miast z `data/weather-cities.json` nadal są obecne w `data/weather-cities-final.staging.json`.

## Walidacja

- Komenda: `node tools/validate-weather-cities.mjs data/weather-cities-final.staging.json`
- Wynik: `Validation passed`
- Dodatkowo:
  - rekordy: `1038`
  - unikalne slugi: `1038`
  - duplikaty widocznych nazw: `5`

## Rekomendacja

Finalny staging nadaje się już do merge.

Liczba rekordów nadal jest nieco wyższa od orientacyjnych `~1026`, ale końcowy zestaw wygląda spójnie, walidacja przechodzi, a wszystkie produkcyjne miasta zostały zachowane. W tej rundzie nie widzę mocnych podstaw do dalszego agresywnego usuwania rekordów.

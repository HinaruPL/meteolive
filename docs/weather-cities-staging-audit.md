# Audyt stagingu weather-cities

## Podsumowanie

- Rekordy w stagingu: **1127**
- Rekordy w bazie produkcyjnej: **47**
- Oczekiwana liczba aktualnych miast/miasteczek w Polsce: **1026**
- Różnica względem oczekiwanego stanu: **+101**
- Miasta z obecnego `data/weather-cities.json` obecne w stagingu: **47/47**
- Brakujących z aktualnej bazy: **0**
- Podejrzane rekordy wg szerokiej heurystyki: **70**

## Źródła

- Staging został zbudowany z publicznego dumpu Wikidata SPARQL, ponieważ w tym środowisku nie udało się stabilnie pobrać danych z TERYT/SIMC z oficjalnego serwisu GUS.
- Do porównania liczby aktualnych miast i miasteczek użyto publicznego zestawienia [List of cities and towns in Poland](https://en.wikipedia.org/wiki/List_of_cities_and_towns_in_Poland), które podaje 1026 aktualnych pozycji na 1 stycznia 2026 i odwołuje się do danych GUS.

## Dlaczego staging ma 1127 rekordów

Analiza wskazuje, że staging jest zbyt szeroki, bo oprócz zwykłych miast i miasteczek zawiera też:
- dzielnice i części miast,
- kolonie robotnicze i osiedla patronackie,
- układy urbanistyczne i obiekty dziedzictwa,
- rekordy z historycznymi województwami,
- miejsca z nazwami wyglądającymi na dawne lokalizacje lub obiekty historyczne.

## Rozkład rekordów wg województwa

| Województwo | Liczba |
| --- | ---: |
| białostockie | 2 |
| dolnośląskie | 94 |
| krośnieńskie | 1 |
| kujawsko-pomorskie | 59 |
| legnickie | 1 |
| lubelskie | 64 |
| lubuskie | 49 |
| łódzkie | 67 |
| małopolskie | 64 |
| mazowieckie | 123 |
| opolskie | 41 |
| pilskie | 1 |
| podkarpackie | 56 |
| podlaskie | 42 |
| pomorskie | 41 |
| poznańskie | 1 |
| suwalskie | 1 |
| śląskie | 123 |
| świętokrzyskie | 50 |
| tarnobrzeskie | 1 |
| warmińsko-mazurskie | 53 |
| wielkopolskie | 123 |
| zachodniopomorskie | 70 |

## Pokrycie obecnej bazy

Wszystkie **47** rekordy z `data/weather-cities.json` są obecne w stagingu. Brakujących rekordów: **0**.

## Podejrzane rekordy

Poniżej jest pełna lista **70** rekordów, które według szerokiej heurystyki wyglądają najbardziej podejrzanie.

| # | Nazwa | Slug | County | Województwo | Powód |
| ---: | --- | --- | --- | --- | --- |
| 1 | mieszkaniowe osiedle robotnicze, Księży Młyn 1, Łódź | mieszkaniowe-osiedle-robotnicze-ksiezy-mlyn-1-lodz | Stary Widzew | łódzkie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji; mała litera |
| 2 | zespół zabudowy osiedla robotniczego Huty Laura, później Huty Jedność w Siemianowicach Śląskich | zespol-zabudowy-osiedla-robotniczego-huty-laura-pozniej-huty-jednosc-w-siemianowicach-slaskich | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji; mała litera |
| 3 | zespół zabudowy osiedla robotniczego kopalni węgla kamiennego „Donnersmarckgrube” w Rybniku | zespol-zabudowy-osiedla-robotniczego-kopalni-wegla-kamiennego-donnersmarckgrube-w-rybniku | Chwałowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji; mała litera |
| 4 | Kolonia patronacka "Fitzner i Gamper" | kolonia-patronacka-fitzner-i-gamper | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 5 | Kolonia patronacka "Focha" | kolonia-patronacka-focha | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 6 | Kolonia patronacka "Renardowska" w Sosnowcu - Katarzynie | kolonia-patronacka-renardowska-w-sosnowcu-katarzynie | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 7 | Kolonia robotnicza huty „Ferrum” | kolonia-robotnicza-huty-ferrum | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 8 | Kolonia robotnicza kopalni „Kleofas” | kolonia-robotnicza-kopalni-kleofas | Załęże | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 9 | kolonia robotnicza kopalni Wujek w Katowicach | kolonia-robotnicza-kopalni-wujek-w-katowicach | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; mała litera |
| 10 | Kolonia urzędnicza kopalni „Wujek” | kolonia-urzednicza-kopalni-wujek | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 11 | Osiedle patronackie Huty "Katarzyna" | osiedle-patronackie-huty-katarzyna | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 12 | Osiedle robotnicze "Kamienice" | osiedle-robotnicze-kamienice | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 13 | układ urbanistyczno-przestrzenny osiedla Giszowiec w Katowicach | uklad-urbanistyczno-przestrzenny-osiedla-giszowiec-w-katowicach | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; mała litera |
| 14 | Układ urbanistyczny i zabudowa kolonii robotniczej Południowa, (Kolonia robotnicza Karol Emanuel) | uklad-urbanistyczny-i-zabudowa-kolonii-robotniczej-poludniowa-kolonia-robotnicza-karol-emanuel | Ruda Śląska | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 15 | Zespół osady robotniczej (układ przestrzenny pl. św. Jana) | zespol-osady-robotniczej-uklad-przestrzenny-pl-sw-jana | Chorzów | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa; znaki obiektu/instytucji |
| 16 | Boże Dary | boze-dary | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 17 | Dobra Myśl | dobra-mysl | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 18 | Domy robotnicze przy ul. św. Wawrzyńca w Poznaniu | domy-robotnicze-przy-ul-sw-wawrzynca-w-poznaniu | Poznań | wielkopolskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 19 | Fryderyka | fryderyka | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 20 | Helgoland | helgoland | Szopienice-Burowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 21 | Huta Jerzego | huta-jerzego | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 22 | Kolonia Alfred | kolonia-alfred | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 23 | Kolonia Dwunastu Apostołów | kolonia-dwunastu-apostolow | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 24 | Kolonia Hegenscheidta | kolonia-hegenscheidta | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 25 | Kolonia miejska kopalni Wujek | kolonia-miejska-kopalni-wujek | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 26 | Kolonia Morawa | kolonia-morawa | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 27 | Kolonia robotnicza Ficinus | kolonia-robotnicza-ficinus | Wirek | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 28 | Kolonia robotników kolejowych na Wildzie | kolonia-robotnikow-kolejowych-na-wildzie | Poznań | wielkopolskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 29 | Kolonia św. Huberta | kolonia-sw-huberta | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 30 | Kolonia urzędnicza Dietla | kolonia-urzednicza-dietla | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 31 | Kolonia Wandy | kolonia-wandy | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 32 | Kolonia Wilhelmina | kolonia-wilhelmina | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 33 | Neu Berlin | neu-berlin | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 34 | Nowa Kolonia Robotnicza | nowa-kolonia-robotnicza | Bytom | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 35 | Osiedle Koszutka | osiedle-koszutka | Katowice | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 36 | Osiedle patronackie Dietla | osiedle-patronackie-dietla | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 37 | Osiedle patronackie Huldschinsky'ego | osiedle-patronackie-huldschinsky-ego | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 38 | Osiedle patronackie Schoena | osiedle-patronackie-schoena | Środula | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 39 | Osiedle patronackie Warszawskiego Towarzystwa Kopalń Węgla i Zakładów Hutniczych w Sosnowcu Ostrowach Górniczych | osiedle-patronackie-warszawskiego-towarzystwa-kopaln-wegla-i-zakladow-hutniczych-w-sosnowcu-ostrowach-gorniczych | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 40 | Porąbka | porabka | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 41 | Srokowiec | srokowiec | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 42 | Wesoła | wesola | Warszawa | mazowieckie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 43 | Wrocławskie Nowe Miasto | wroclawskie-nowe-miasto | Wrocław | dolnośląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 44 | Zagórze | zagorze | Sosnowiec | śląskie | county niepowiatowe i != nazwa; podejrzana nazwa |
| 45 | Bendzin | bendzin | Świętochłowice | śląskie | county niepowiatowe i != nazwa |
| 46 | Braniewo | braniewo | Księstwo warmińskie | warmińsko-mazurskie | county niepowiatowe i != nazwa |
| 47 | Chojnów | chojnow | powiat legnicki | legnickie | historyczne województwo |
| 48 | Darłowo | darlowo | księstwo pomorskie | zachodniopomorskie | county niepowiatowe i != nazwa |
| 49 | Dąbie | dabie-zachodniopomorskie | Szczecin | zachodniopomorskie | county niepowiatowe i != nazwa |
| 50 | Fordon | fordon | Bydgoszcz | kujawsko-pomorskie | county niepowiatowe i != nazwa |
| 51 | Giżycko | gizycko | Giżycko | suwalskie | historyczne województwo |
| 52 | Głogów | glogow | Księstwo śląskie | dolnośląskie | county niepowiatowe i != nazwa |
| 53 | Hrubieszów | hrubieszow | Królestwo Polskie | lubelskie | county niepowiatowe i != nazwa |
| 54 | Hugo | hugo | Siemianowice Śląskie | śląskie | county niepowiatowe i != nazwa |
| 55 | osiedle robotnicze w Markach | osiedle-robotnicze-w-markach | powiat wołomiński | mazowieckie | podejrzana nazwa; mała litera |
| 56 | Ostróda | ostroda | Prusy Wschodnie | warmińsko-mazurskie | county niepowiatowe i != nazwa |
| 57 | Piła | pila | powiat pilski | pilskie | historyczne województwo |
| 58 | Rymanów | rymanow | powiat krośnieński | krośnieńskie | historyczne województwo |
| 59 | Sandomierz | sandomierz | powiat sandomierski | tarnobrzeskie | historyczne województwo |
| 60 | Siemiatycze | siemiatycze | powiat siemiatycki | białostockie | historyczne województwo |
| 61 | Września | wrzesnia | powiat wrzesiński | poznańskie | historyczne województwo |
| 62 | Wysokie Mazowieckie | wysokie-mazowieckie | powiat wysokomazowiecki | białostockie | historyczne województwo |
| 63 | Dobre Miasto | dobre-miasto | powiat olsztyński | warmińsko-mazurskie | podejrzana nazwa |
| 64 | III kolonia robotnicza w Knurowie | iii-kolonia-robotnicza-w-knurowie | powiat gliwicki | śląskie | podejrzana nazwa |
| 65 | Kolonia Wolność Górnicza | kolonia-wolnosc-gornicza | powiat tarnogórski | śląskie | podejrzana nazwa |
| 66 | Nowe Miasto | nowe-miasto | powiat płoński | mazowieckie | podejrzana nazwa |
| 67 | Nowe Miasto Lubawskie | nowe-miasto-lubawskie | powiat nowomiejski | warmińsko-mazurskie | podejrzana nazwa |
| 68 | Nowe Miasto nad Pilicą | nowe-miasto-nad-pilica | powiat grójecki | mazowieckie | podejrzana nazwa |
| 69 | Rejowiec Fabryczny | rejowiec-fabryczny | powiat chełmski | lubelskie | podejrzana nazwa |
| 70 | Dobrzyń (Golub-Dobrzyń) | dobrzyn-golub-dobrzyn | powiat golubsko-dobrzyński | kujawsko-pomorskie | znaki obiektu/instytucji |

## Bliskie klastry współrzędnych

Przykłady par rekordów położonych bardzo blisko siebie, zwykle w obrębie tych samych dzielnic lub historycznych zespołów zabudowy.

| Odległość | Rekord A | Rekord B |
| ---: | --- | --- |
| 0.000 km | Dąbie | Dąbie |
| 0.000 km | Dąbrowice | Dąbrowice |
| 0.000 km | Dobrzyń nad Wisłą | Dobrzyń nad Wisłą |
| 0.000 km | Gąbin | Gąbin |
| 0.000 km | Katowice | Konurbacja górnośląska |
| 0.049 km | Bielsk | Bielsk |
| 0.114 km | Kolonia patronacka "Renardowska" w Sosnowcu - Katarzynie | Osiedle patronackie Huty "Katarzyna" |
| 0.122 km | Kolonia Dwunastu Apostołów | Kolonia urzędnicza kopalni „Wujek” |
| 0.267 km | Kolonia urzędnicza Dietla | Osiedle patronackie Dietla |
| 0.329 km | Neu Berlin | zespół zabudowy osiedla robotniczego Huty Laura, później Huty Jedność w Siemianowicach Śląskich |
| 0.345 km | Osiedle patronackie Huldschinsky'ego | Osiedle patronackie Huty "Katarzyna" |
| 0.350 km | Kolonia patronacka "Focha" | Kolonia urzędnicza Dietla |
| 0.377 km | Helgoland | Kolonia Wilhelmina |
| 0.411 km | Janowo | Janowo |
| 0.427 km | Kolonia patronacka "Focha" | Osiedle patronackie Dietla |

## Rekomendacja

Nie scalać jeszcze do `data/weather-cities.json`.
Najpierw trzeba odfiltrować rekordy wysokiego ryzyka, a następnie porównać staging bezpośrednio z oficjalnym TERYT/SIMC albo z inną urzędową listą miejscowości.
Na podstawie obecnego audytu staging wygląda na **zbyt szeroki o około 101 rekordów** i zawiera zbyt dużo dzielnic, kolonii, osiedli historycznych oraz obiektów dziedzictwa, żeby uznać go za produkcyjny bez ręcznego czyszczenia.

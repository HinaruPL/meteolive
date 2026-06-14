# Raport czyszczenia stagingu weather-cities

## Podsumowanie

- Przed czyszczeniem: **1127** rekordów
- Po czyszczeniu: **1039** rekordów
- Usunięto: **88** rekordów
- Oczekiwana liczba aktualnych miast/miasteczek: **1026**
- Różnica po czyszczeniu: **+13**
- Wszystkie miasta z `data/weather-cities.json` obecne w clean: **47/47**

## Źródło i podejście

- Punkt startowy: `data/weather-cities-full.staging.json`, zbudowany na danych Wikidata i przeanalizowany w poprzednim audycie.
- Czyszczenie było konserwatywne: usunięto rekordy ewidentnie niebędące aktualnymi miastami/miasteczkami, dzielnice, kolonie robotnicze, osiedla patronackie, układy urbanistyczne, dawne jednostki oraz jednoznaczne duplikaty albo lokalizacje wiejskie podszywające się pod nazwę miasta.

## Usunięte rekordy

| Nazwa | Slug | Powód |
| --- | --- | --- |
| Bendzin | bendzin | historyczna / alternatywna nazwa |
| Bielsk | bielsk-mazowieckie | wieś / nieaktualne miasto |
| Bielsk | bielsk-powiat-plocki | wieś / nieaktualne miasto |
| Bobrowniki | bobrowniki-podlaskie | wieś / nieaktualne miasto |
| Bolimów | bolimow-powiat-skierniewicki | duplikat tej samej miejscowości |
| Boże Dary | boze-dary | dzielnica/część miasta |
| Braniewo | braniewo | historyczna nazwa/niestandardowy county |
| Buk | buk-zachodniopomorskie | wieś / nieaktualne miasto |
| Chojnów | chojnow | historyczne województwo |
| Chorzele | chorzele-mazowieckie | duplikat tej samej miejscowości |
| Czersk | czersk-mazowieckie | wieś / nieaktualne miasto |
| Człopa | czlopa-powiat-walecki | duplikat tej samej miejscowości |
| Darłowo | darlowo | historyczna nazwa/niestandardowy county |
| Dąbie | dabie-powiat-kolski | duplikat tej samej miejscowości |
| Dąbie | dabie-wielkopolskie | podejrzana nazwa / obiekt miejski |
| Dąbie | dabie-zachodniopomorskie | dzielnica miasta Szczecin |
| Dąbrowice | dabrowice-lodzkie | duplikat tej samej miejscowości |
| Dobra Myśl | dobra-mysl | dzielnica/część miasta |
| Dobrzyń nad Wisłą | dobrzyn-nad-wisla-powiat-lipnowski | duplikat tej samej miejscowości |
| Domy robotnicze przy ul. św. Wawrzyńca w Poznaniu | domy-robotnicze-przy-ul-sw-wawrzynca-w-poznaniu | obiekt dziedzictwa / domy robotnicze |
| Fordon | fordon | dzielnica miasta |
| Fryderyka | fryderyka | dzielnica/część miasta |
| Gąbin | gabin-powiat-plocki | duplikat tej samej miejscowości |
| Giżycko | gizycko | niepasujący rekord |
| Głogów | glogow | historyczna nazwa/niestandardowy county |
| Góra Kalwaria | gora-kalwaria-powiat-piaseczynski | duplikat tej samej miejscowości |
| Grabów | grabow-powiat-leczycki | duplikat tej samej miejscowości |
| Grabów nad Prosną | grabow-nad-prosna-wielkopolskie | duplikat tej samej miejscowości |
| Helgoland | helgoland | dzielnica/część miasta |
| Hrubieszów | hrubieszow | historyczna nazwa/niestandardowy county |
| Hugo | hugo | dzielnica/część miasta |
| Huta Jerzego | huta-jerzego | dzielnica/część miasta |
| III kolonia robotnicza w Knurowie | iii-kolonia-robotnicza-w-knurowie | podejrzana nazwa / obiekt miejski |
| Inowłódz | inowlodz-powiat-tomaszowski | duplikat tej samej miejscowości |
| Janowo | janowo-powiat-nidzicki | duplikat tej samej miejscowości |
| Kolonia Alfred | kolonia-alfred | kolonia / część miasta |
| Kolonia Dwunastu Apostołów | kolonia-dwunastu-apostolow | kolonia / część miasta |
| Kolonia Hegenscheidta | kolonia-hegenscheidta | kolonia / część miasta |
| Kolonia miejska kopalni Wujek | kolonia-miejska-kopalni-wujek | kolonia / część miasta |
| Kolonia Morawa | kolonia-morawa | kolonia / część miasta |
| Kolonia patronacka "Fitzner i Gamper" | kolonia-patronacka-fitzner-i-gamper | kolonia patronacka |
| Kolonia patronacka "Focha" | kolonia-patronacka-focha | kolonia patronacka |
| Kolonia patronacka "Renardowska" w Sosnowcu - Katarzynie | kolonia-patronacka-renardowska-w-sosnowcu-katarzynie | kolonia patronacka |
| Kolonia robotnicza Ficinus | kolonia-robotnicza-ficinus | kolonia robotnicza |
| Kolonia robotnicza huty „Ferrum” | kolonia-robotnicza-huty-ferrum | kolonia robotnicza |
| Kolonia robotnicza kopalni „Kleofas” | kolonia-robotnicza-kopalni-kleofas | kolonia robotnicza |
| kolonia robotnicza kopalni Wujek w Katowicach | kolonia-robotnicza-kopalni-wujek-w-katowicach | kolonia robotnicza |
| Kolonia robotników kolejowych na Wildzie | kolonia-robotnikow-kolejowych-na-wildzie | kolonia robotnicza |
| Kolonia św. Huberta | kolonia-sw-huberta | kolonia / część miasta |
| Kolonia urzędnicza Dietla | kolonia-urzednicza-dietla | kolonia urzędnicza |
| Kolonia urzędnicza kopalni „Wujek” | kolonia-urzednicza-kopalni-wujek | kolonia urzędnicza |
| Kolonia Wandy | kolonia-wandy | kolonia / część miasta |
| Kolonia Wilhelmina | kolonia-wilhelmina | kolonia / część miasta |
| Kolonia Wolność Górnicza | kolonia-wolnosc-gornicza | podejrzana nazwa / obiekt miejski |
| Konurbacja górnośląska | konurbacja-gornoslaska | konurbacja, nie miasto |
| mieszkaniowe osiedle robotnicze, Księży Młyn 1, Łódź | mieszkaniowe-osiedle-robotnicze-ksiezy-mlyn-1-lodz | obiekt dziedzictwa / mieszkaniowe osiedle robotnicze |
| Neu Berlin | neu-berlin | dawna miejscowość / historyczna nazwa |
| Nowa Kolonia Robotnicza | nowa-kolonia-robotnicza | kolonia robotnicza |
| Nowe Miasto | nowe-miasto | podejrzana nazwa / obiekt miejski |
| Nowe Miasto Lubawskie | nowe-miasto-lubawskie | podejrzana nazwa / obiekt miejski |
| Nowe Miasto nad Pilicą | nowe-miasto-nad-pilica | podejrzana nazwa / obiekt miejski |
| Olsztyn | olsztyn-slaskie | wieś Olsztyn w woj. śląskim |
| Osiedle Koszutka | osiedle-koszutka | osiedle / część miasta |
| Osiedle patronackie Dietla | osiedle-patronackie-dietla | osiedle patronackie |
| Osiedle patronackie Huldschinsky'ego | osiedle-patronackie-huldschinsky-ego | osiedle patronackie |
| Osiedle patronackie Huty "Katarzyna" | osiedle-patronackie-huty-katarzyna | osiedle patronackie |
| Osiedle patronackie Schoena | osiedle-patronackie-schoena | osiedle patronackie |
| Osiedle patronackie Warszawskiego Towarzystwa Kopalń Węgla i Zakładów Hutniczych w Sosnowcu Ostrowach Górniczych | osiedle-patronackie-warszawskiego-towarzystwa-kopaln-wegla-i-zakladow-hutniczych-w-sosnowcu-ostrowach-gorniczych | osiedle patronackie |
| Osiedle robotnicze "Kamienice" | osiedle-robotnicze-kamienice | osiedle robotnicze |
| osiedle robotnicze w Markach | osiedle-robotnicze-w-markach | osiedle robotnicze |
| Ostróda | ostroda | historyczna nazwa/niestandardowy county |
| Piła | pila | historyczne województwo |
| Porąbka | porabka | część miasta / osiedle |
| Rejowiec Fabryczny | rejowiec-fabryczny | podejrzana nazwa / obiekt miejski |
| Rymanów | rymanow | historyczne województwo |
| Sandomierz | sandomierz | historyczne województwo |
| Siemiatycze | siemiatycze | historyczne województwo |
| Srokowiec | srokowiec | dzielnica/część miasta |
| układ urbanistyczno-przestrzenny osiedla Giszowiec w Katowicach | uklad-urbanistyczno-przestrzenny-osiedla-giszowiec-w-katowicach | układ urbanistyczny |
| Układ urbanistyczny i zabudowa kolonii robotniczej Południowa, (Kolonia robotnicza Karol Emanuel) | uklad-urbanistyczny-i-zabudowa-kolonii-robotniczej-poludniowa-kolonia-robotnicza-karol-emanuel | układ urbanistyczny / kolonia robotnicza |
| Wesoła | wesola | dzielnica miasta |
| Wrocławskie Nowe Miasto | wroclawskie-nowe-miasto | część miasta / obiekt dziedzictwa |
| Września | wrzesnia | historyczne województwo |
| Wysokie Mazowieckie | wysokie-mazowieckie | historyczne województwo |
| Zagórze | zagorze | dzielnica miasta |
| Zespół osady robotniczej (układ przestrzenny pl. św. Jana) | zespol-osady-robotniczej-uklad-przestrzenny-pl-sw-jana | zespół osady robotniczej |
| zespół zabudowy osiedla robotniczego Huty Laura, później Huty Jedność w Siemianowicach Śląskich | zespol-zabudowy-osiedla-robotniczego-huty-laura-pozniej-huty-jednosc-w-siemianowicach-slaskich | zespół zabudowy / osiedle robotnicze |
| zespół zabudowy osiedla robotniczego kopalni węgla kamiennego „Donnersmarckgrube” w Rybniku | zespol-zabudowy-osiedla-robotniczego-kopalni-wegla-kamiennego-donnersmarckgrube-w-rybniku | zespół zabudowy / obiekt dziedzictwa |

## Rekordy nadal wątpliwe

Poniższe rekordy pozostały w clean, bo wyglądają na realne miasta/miasteczka, ale nadal mają nietypowe albo historyczne oznaczenia administracyjne i warto je sprawdzić w kolejnej rundzie:

| Nazwa | Slug | Uwagi |
| --- | --- | --- |
| Braniewo | braniewo | historyczna / niestandardowa etykieta county |
| Darłowo | darlowo | historyczna / niestandardowa etykieta county |
| Głogów | glogow | historyczna / niestandardowa etykieta county |
| Hrubieszów | hrubieszow | historyczna / niestandardowa etykieta county |
| Chojnów | chojnow | historyczne województwo |
| Giżycko | gizycko | historyczne województwo |
| Ostróda | ostroda | historyczna / niestandardowa etykieta county |
| Piła | pila | historyczne województwo |
| Rymanów | rymanow | historyczne województwo |
| Sandomierz | sandomierz | historyczne województwo |
| Siemiatycze | siemiatycze | historyczne województwo |
| Września | wrzesnia | historyczne województwo |
| Wysokie Mazowieckie | wysokie-mazowieckie | historyczne województwo |

## Pokrycie produkcji

- Wszystkie **47** rekordy z `data/weather-cities.json` nadal są obecne.

## Walidacja

- Wynik: `node tools/validate-weather-cities.mjs data/weather-cities-clean.staging.json` -> **passed**
- Rekordy: **1039**
- Unikalne slugi: **1039**

## Rekomendacja

Nie scalać jeszcze do `data/weather-cities.json`.
Clean file jest wyraźnie lepszy niż staging, ale nadal ma **13 rekordów ponad oczekiwane 1026**, więc warto zrobić jeszcze jedną krótką rundę porządkującą, zanim dopuścimy merge do bazy produkcyjnej.

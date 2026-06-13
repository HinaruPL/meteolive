const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const statusEl = document.querySelector('[data-live-status]');
if (statusEl) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  statusEl.textContent = `Ostatnie odświeżenie widoku: ${formatter.format(now)}`;
}

const siteBaseUrl = 'https://meteolive.pl';
const currentPath = window.location.pathname;

const guideSchemas = {
  '/poradniki/jak-czytac-radar-opadow/': ['Jak czytać radar opadów?', 'Prosty poradnik MeteoLive wyjaśniający, jak czytać radar opadów, kolory, kierunek deszczu i ograniczenia mapy.', [['Czy radar opadów pokazuje dokładnie, kiedy zacznie padać?', 'Nie zawsze. Radar pomaga ocenić kierunek i zasięg opadów, ale lokalna pogoda może zmienić się szybciej, niż pokazuje mapa.'], ['Czy radar pokazuje śnieg?', 'Radar może pokazywać obszary opadów zimowych, ale rodzaj opadu warto porównywać z temperaturą i warunkami przy ziemi.'], ['Czy wystarczy patrzeć tylko na radar opadów?', 'Nie. Przy burzach, wichurach i groźnej pogodzie warto sprawdzić też mapę wiatru, radar burz i oficjalne ostrzeżenia IMGW-PIB.']]],
  '/poradniki/jak-sprawdzic-czy-bedzie-padac/': ['Jak sprawdzić, czy będzie padać?', 'Prosty poradnik o sprawdzaniu ryzyka deszczu przy pomocy radaru opadów, animacji mapy i prognozy.', [['Czy radar zawsze pokazuje deszcz idealnie?', 'Nie. Radar może mieć opóźnienie, ograniczenia techniczne albo pokazywać opad, który nie dochodzi do ziemi.'], ['Czy słaby opad na radarze oznacza lekki deszcz?', 'Zwykle tak, ale lokalnie opad może się nasilić. Warto patrzeć na animację, a nie tylko jeden obraz.'], ['Co sprawdzić przed dłuższą trasą?', 'Radar opadów, prognozę godzinową, mapę wiatru i ostrzeżenia pogodowe. Pogoda na trasie może różnić się od pogody w miejscu startu.']]],
  '/poradniki/jak-sprawdzic-pogode-przed-podroza/': ['Jak sprawdzić pogodę przed podróżą?', 'Praktyczny poradnik MeteoLive o sprawdzaniu pogody przed trasą: opady, burze, wiatr, temperatura i ostrzeżenia.', [['Czy wystarczy sprawdzić pogodę w miejscu startu?', 'Nie. Przed podróżą warto sprawdzić całą trasę, bo warunki po drodze mogą być zupełnie inne.'], ['Co jest najważniejsze przed jazdą w burzowy dzień?', 'Radar burz, radar opadów, mapa wiatru i oficjalne ostrzeżenia dla regionów po drodze.'], ['Kiedy ponownie sprawdzić pogodę w trasie?', 'Przy dłuższej podróży najlepiej wrócić do map podczas postoju, szczególnie gdy pogoda jest dynamiczna.']]],
  '/poradniki/jak-sprawdzic-pogode-na-weekend/': ['Jak sprawdzić pogodę na weekend?', 'Poradnik MeteoLive o planowaniu weekendu z pomocą prognozy, radaru opadów, burz, mapy temperatury i ostrzeżeń.', [['Kiedy najlepiej sprawdzać pogodę na weekend?', 'Kilka dni wcześniej warto sprawdzić ogólny trend, a w dniu wyjścia radar opadów, burze i ostrzeżenia.'], ['Czy prognoza na weekend zawsze się sprawdza?', 'Nie zawsze. Im dalej do weekendu, tym większa niepewność, szczególnie przy burzach i przelotnych opadach.'], ['Co sprawdzić w dniu wyjazdu?', 'Radar opadów, radar burz, mapę temperatury, wiatr oraz oficjalne ostrzeżenia pogodowe.']]],
  '/poradniki/kiedy-burza-jest-blisko/': ['Kiedy burza jest blisko?', 'Poradnik MeteoLive o objawach bliskiej burzy, radarze burz, wyładowaniach, wietrze i zasadach bezpieczeństwa.', [['Czy grzmot oznacza, że burza jest blisko?', 'Tak. Jeżeli słyszysz grzmot, burza jest już na tyle blisko, że trzeba zachować ostrożność.'], ['Czy mapa wyładowań wystarczy do oceny bezpieczeństwa?', 'Nie. Mapa pomaga, ale decyzję trzeba opierać też na tym, co widzisz i słyszysz oraz na ostrzeżeniach.'], ['Gdzie się schować, gdy burza jest blisko?', 'Najlepiej w budynku lub samochodzie. Unikaj otwartej przestrzeni, wody i samotnych wysokich drzew.']]],
  '/poradniki/jak-zabezpieczyc-balkon-przed-wichura/': ['Jak zabezpieczyć balkon przed wichurą?', 'Praktyczna checklista MeteoLive przed silnym wiatrem: balkon, donice, meble, suszarki, porywy i ostrzeżenia.', [['Co najpierw schować z balkonu przed wichurą?', 'Najpierw lekkie rzeczy: poduszki, krzesła, dekoracje, suszarki, konewki i przedmioty z balustrady.'], ['Czy donice na balustradzie są bezpieczne?', 'Przy silnym wietrze nie. Lepiej zdjąć je z barierki albo przenieść na podłogę balkonu pod ścianę.'], ['Kiedy zabezpieczyć balkon?', 'Najlepiej zanim wiatr się nasili, szczególnie gdy pojawia się ostrzeżenie IMGW-PIB przed silnym wiatrem.']]],
  '/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/': ['Co oznaczają kolory na radarze pogodowym?', 'Prosty poradnik MeteoLive o kolorach na radarze pogodowym, intensywności opadów, burzach i ograniczeniach odczytu.', [['Czy czerwony kolor zawsze oznacza burzę?', 'Nie zawsze. Może oznaczać bardzo intensywny opad, ale burzę najlepiej potwierdzać mapą wyładowań i oficjalnymi ostrzeżeniami.'], ['Czy słaby kolor oznacza, że nie trzeba brać parasola?', 'Nie. Słaby opad może się nasilić, a lokalnie pogoda może zmienić się szybko. Warto sprawdzić animację mapy.'], ['Dlaczego radar pokazuje opad, a u mnie nie pada?', 'Czasem opad nie dochodzi do ziemi albo mapa ma opóźnienie. Możliwe są też lokalne różnice w pogodzie.']]],
  '/poradniki/jak-sprawdzic-czy-bedzie-burza/': ['Jak sprawdzić, czy będzie burza?', 'Prosty poradnik MeteoLive o sprawdzaniu ryzyka burzy przy pomocy radaru burz, mapy wyładowań, wiatru i ostrzeżeń.', [['Czy mapa wyładowań pokazuje burze na żywo?', 'Mapa wyładowań pomaga zobaczyć aktywność burzową, ale może mieć opóźnienia lub ograniczenia. Traktuj ją jako podgląd, nie jako jedyne źródło decyzji.'], ['Czy burza może powstać bez wcześniejszego ostrzeżenia?', 'Tak, lokalne burze mogą rozwijać się szybko. Dlatego przy dusznej, gorącej i niestabilnej pogodzie warto regularnie sprawdzać mapy.'], ['Gdzie sprawdzać oficjalne ostrzeżenia?', 'Oficjalne ostrzeżenia pogodowe dla Polski publikuje IMGW-PIB. MeteoLive może kierować do tych źródeł, ale ich nie zastępuje.']]],
  '/poradniki/jak-przygotowac-sie-na-burze/': ['Jak przygotować się na burzę?', 'Praktyczna checklista MeteoLive przed burzą: radar, ostrzeżenia, dom, balkon, ogród, samochód i bezpieczne zachowanie.', [['Czy wystarczy sprawdzić tylko radar burz?', 'Nie. Radar pomaga ocenić sytuację, ale przy groźnej pogodzie trzeba sprawdzić też oficjalne ostrzeżenia IMGW-PIB.'], ['Kiedy burza jest już niebezpiecznie blisko?', 'Jeżeli słyszysz grzmoty, widzisz wyładowania albo wiatr nagle się nasila, przejdź w bezpieczne miejsce.'], ['Czy można zostać w aucie podczas burzy?', 'Samochód zwykle jest bezpieczniejszy niż otwarta przestrzeń, ale unikaj parkowania pod drzewami i konstrukcjami, które mogą się przewrócić.']]],
  '/poradniki/jak-sprawdzic-kierunek-wiatru/': ['Jak sprawdzić kierunek wiatru?', 'Prosty poradnik MeteoLive o mapie wiatru, kierunku, porywach i łączeniu informacji o wietrze z opadami oraz burzami.', [['Czy kierunek wiatru pokazuje, gdzie pójdzie deszcz?', 'Często pomaga to ocenić, ale nie zawsze daje prostą odpowiedź. Najlepiej porównać mapę wiatru z animacją radaru opadów.'], ['Czym różni się wiatr od porywów?', 'Wiatr to ogólny przepływ powietrza, a poryw to chwilowy, silniejszy podmuch. Porywy są ważne przy wichurach i burzach.'], ['Czy silny wiatr zawsze oznacza ostrzeżenie?', 'Nie zawsze, ale przy silnych porywach warto sprawdzić oficjalne ostrzeżenia IMGW-PIB.']]],
  '/poradniki/jak-sprawdzic-silny-wiatr/': ['Jak sprawdzić silny wiatr?', 'Prosty poradnik MeteoLive o sprawdzaniu silnego wiatru, porywów, mapy wiatru i ostrzeżeń.', [['Czym różni się wiatr od porywów?', 'Wiatr to ogólna prędkość przepływu powietrza, a poryw to krótkotrwały, silniejszy podmuch.'], ['Czy mapa wiatru wystarczy?', 'Nie zawsze. Przy groźnej pogodzie sprawdź też oficjalne ostrzeżenia IMGW-PIB i lokalne komunikaty.'], ['Kiedy wiatr może być groźny?', 'Gdy pojawiają się silne porywy, łamią się gałęzie, trudno utrzymać kierunek jazdy albo wydano ostrzeżenie pogodowe.']]],
  '/poradniki/jak-przetrwac-upal/': ['Jak przetrwać upał?', 'Praktyczny poradnik MeteoLive o upale, mapie temperatury, ostrzeżeniach, nawodnieniu i bezpieczeństwie.', [['Czy sam cień wystarczy podczas upału?', 'Cień pomaga, ale przy wysokiej temperaturze nadal trzeba pić wodę, ograniczać wysiłek i obserwować samopoczucie.'], ['Kiedy upał jest szczególnie groźny?', 'Gdy trwa kilka dni, noce są ciepłe, a organizm nie ma kiedy odpocząć. Groźny jest też wysiłek fizyczny w pełnym słońcu.'], ['Czy warto sprawdzać ostrzeżenia IMGW?', 'Tak. Oficjalne ostrzeżenia pomagają ocenić, czy upał może być niebezpieczny w Twoim regionie.']]],
  '/poradniki/czym-rozni-sie-prognoza-od-radaru/': ['Czym różni się prognoza od radaru?', 'Prosty poradnik MeteoLive wyjaśniający różnicę między prognozą pogody a radarem opadów oraz kiedy korzystać z każdego źródła.', [['Czy radar jest dokładniejszy niż prognoza?', 'Radar lepiej pokazuje bieżącą sytuację, ale nie zastępuje prognozy na kolejne godziny i dni. Oba źródła mają inne zastosowanie.'], ['Dlaczego prognoza mówiła, że będzie padać, a nie pada?', 'Prognoza pokazuje ryzyko i przewidywany przebieg pogody. Lokalnie opady mogą ominąć daną okolicę albo pojawić się później.'], ['Czy radar pokaże pogodę na jutro?', 'Nie. Radar pokazuje bieżące lub bardzo świeże dane opadowe. Do jutra potrzebna jest prognoza.']]],
  '/poradniki/co-oznaczaja-ostrzezenia-imgw/': ['Co oznaczają ostrzeżenia IMGW?', 'Prosty poradnik MeteoLive o ostrzeżeniach IMGW, stopniach ostrzeżeń, bezpieczeństwie i sprawdzaniu oficjalnych komunikatów.', [['Czy MeteoLive wydaje ostrzeżenia pogodowe?', 'Nie. MeteoLive nie wydaje oficjalnych ostrzeżeń. Strona pomaga przejść do map i wyjaśnień, ale oficjalne komunikaty należy sprawdzać w IMGW-PIB.'], ['Czy ostrzeżenie oznacza, że zjawisko na pewno wystąpi?', 'Ostrzeżenie oznacza ryzyko wystąpienia groźnego zjawiska na określonym obszarze i w określonym czasie. Pogoda nadal może różnić się lokalnie.'], ['Czy warto sprawdzać radar, gdy jest ostrzeżenie?', 'Tak. Radar i mapy pomagają zrozumieć bieżącą sytuację, ale nie zastępują oficjalnego komunikatu.']]]
};

const guidesItemList = Object.entries(guideSchemas).map(([path, data]) => [data[0], path]);

function addJsonLd(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function buildSitePublisher() {
  return {
    '@type': 'Organization',
    name: 'MeteoLive',
    url: siteBaseUrl,
    logo: `${siteBaseUrl}/assets/favicon.svg`
  };
}

if (currentPath === '/poradniki/') {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Poradniki pogodowe',
    description: 'Proste poradniki pogodowe MeteoLive o radarach, opadach, burzach, wietrze, upale, podróży i ostrzeżeniach.',
    url: `${siteBaseUrl}/poradniki/`,
    publisher: buildSitePublisher(),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guidesItemList.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `${siteBaseUrl}${path}`
      }))
    }
  });
}

if (guideSchemas[currentPath]) {
  const [headline, description, questions] = guideSchemas[currentPath];
  const pageUrl = `${siteBaseUrl}${currentPath}`;

  addJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline,
        description,
        inLanguage: 'pl-PL',
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        author: buildSitePublisher(),
        publisher: buildSitePublisher()
      },
      {
        '@type': 'FAQPage',
        mainEntity: questions.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer
          }
        }))
      }
    ]
  });
}

const weatherCities = {
  'warszawa': ['Warszawa', 52.2297, 21.0122],
  'krakow': ['Kraków', 50.0647, 19.9450],
  'wroclaw': ['Wrocław', 51.1079, 17.0385],
  'poznan': ['Poznań', 52.4064, 16.9252],
  'gdansk': ['Gdańsk', 54.3520, 18.6466],
  'gdynia': ['Gdynia', 54.5189, 18.5305],
  'lodz': ['Łódź', 51.7592, 19.4560],
  'katowice': ['Katowice', 50.2649, 19.0238],
  'lublin': ['Lublin', 51.2465, 22.5684],
  'szczecin': ['Szczecin', 53.4285, 14.5528],
  'rzeszow': ['Rzeszów', 50.0413, 21.9990],
  'bialystok': ['Białystok', 53.1325, 23.1688],
  'bydgoszcz': ['Bydgoszcz', 53.1235, 18.0084],
  'torun': ['Toruń', 53.0138, 18.5984],
  'olsztyn': ['Olsztyn', 53.7784, 20.4801],
  'kielce': ['Kielce', 50.8661, 20.6286],
  'opole': ['Opole', 50.6751, 17.9213],
  'radom': ['Radom', 51.4027, 21.1471],
  'sosnowiec': ['Sosnowiec', 50.2863, 19.1041],
  'tarnow': ['Tarnów', 50.0121, 20.9858],
  'plock': ['Płock', 52.5468, 19.7064],
  'elblag': ['Elbląg', 54.1561, 19.4045],
  'walbrzych': ['Wałbrzych', 50.7714, 16.2843],
  'koszalin': ['Koszalin', 54.1944, 16.1722],
  'kalisz': ['Kalisz', 51.7611, 18.0910],
  'legnica': ['Legnica', 51.2070, 16.1553],
  'zielona-gora': ['Zielona Góra', 51.9355, 15.5062],
  'gorzow-wielkopolski': ['Gorzów Wielkopolski', 52.7368, 15.2288],
  'bielsko-biala': ['Bielsko-Biała', 49.8224, 19.0469],
  'gliwice': ['Gliwice', 50.2945, 18.6714],
  'czestochowa': ['Częstochowa', 50.8118, 19.1203]
};

const weatherCodeLabels = {
  clearsky: 'bezchmurnie',
  fair: 'pogodnie',
  partlycloudy: 'częściowe zachmurzenie',
  cloudy: 'pochmurno',
  lightrain: 'słaby deszcz',
  rain: 'deszcz',
  heavyrain: 'silny deszcz',
  lightsnow: 'słaby śnieg',
  snow: 'śnieg',
  heavysnow: 'silny śnieg',
  sleet: 'deszcz ze śniegiem',
  fog: 'mgła',
  lightrainshowers: 'przelotny słaby deszcz',
  rainshowers: 'przelotny deszcz',
  heavyrainshowers: 'silne przelotne opady',
  thunderstorm: 'burza',
  rainandthunder: 'deszcz i burza',
  heavyrainandthunder: 'silny deszcz i burza'
};

function injectForecastStyles() {
  if (document.getElementById('meteolive-forecast-styles')) {
    return;
  }
  const style = document.createElement('style');
  style.id = 'meteolive-forecast-styles';
  style.textContent = `
    .forecast-widget { margin-top: 0; }
    .forecast-header { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; margin-bottom: 1.25rem; }
    .forecast-current { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-metric, .forecast-hour { border: 1px solid rgba(148, 163, 184, .18); border-radius: 18px; padding: 1rem; background: rgba(15, 23, 42, .42); }
    .forecast-metric strong { display: block; font-size: 1.45rem; margin-top: .25rem; color: #f8fafc; }
    .forecast-metric span, .forecast-hour span { color: #94a3b8; font-size: .9rem; }
    .forecast-hours { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 1rem; }
    .forecast-hour strong { display: block; margin: .35rem 0; color: #f8fafc; }
    .forecast-source { color: #94a3b8; font-size: .9rem; margin-top: 1rem; }
    .forecast-source a { color: inherit; }
    .forecast-error { border: 1px solid rgba(248, 113, 113, .35); background: rgba(127, 29, 29, .22); padding: 1rem; border-radius: 18px; }
    @media (max-width: 800px) { .forecast-current, .forecast-hours { grid-template-columns: 1fr 1fr; } .forecast-header { display: block; } }
    @media (max-width: 520px) { .forecast-current, .forecast-hours { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(style);
}

function cleanSymbolCode(symbol) {
  if (!symbol) return 'prognoza';
  return symbol.replace(/_(day|night|polartwilight)$/g, '');
}

function describeWeather(symbol) {
  const clean = cleanSymbolCode(symbol);
  return weatherCodeLabels[clean] || clean.replaceAll('_', ' ');
}

function getPrecipitation(block) {
  return block?.data?.next_1_hours?.details?.precipitation_amount
    ?? block?.data?.next_6_hours?.details?.precipitation_amount
    ?? 0;
}

function formatForecastTime(time) {
  return new Intl.DateTimeFormat('pl-PL', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(time));
}

function createForecastSection(cityName) {
  injectForecastStyles();
  const section = document.createElement('section');
  section.className = 'section forecast-widget';
  section.innerHTML = `
    <div class="container content-card" data-forecast-widget>
      <div class="forecast-header">
        <div>
          <span class="eyebrow"><span class="pulse"></span> Prognoza zewnętrzna</span>
          <h2>Pogoda ${cityName} — prognoza na najbliższe godziny</h2>
          <p class="section-intro">Prognoza jest pobierana z MET Norway na podstawie współrzędnych miasta i zapisywana lokalnie w przeglądarce na około 60 minut.</p>
        </div>
      </div>
      <p>Ładuję prognozę...</p>
    </div>
  `;

  const hero = document.querySelector('.hero');
  if (hero?.parentNode) {
    hero.parentNode.insertBefore(section, hero.nextSibling);
  }
  return section.querySelector('[data-forecast-widget]');
}

function renderForecast(container, cityName, data) {
  const timeseries = data?.properties?.timeseries || [];
  if (!timeseries.length) {
    throw new Error('Brak danych prognozy');
  }

  const nowBlock = timeseries[0];
  const details = nowBlock.data.instant.details || {};
  const symbol = nowBlock.data.next_1_hours?.summary?.symbol_code || nowBlock.data.next_6_hours?.summary?.symbol_code || '';
  const nextBlocks = timeseries.slice(0, 4);
  const updatedAt = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

  container.innerHTML = `
    <div class="forecast-header">
      <div>
        <span class="eyebrow"><span class="pulse"></span> Prognoza zewnętrzna</span>
        <h2>Pogoda ${cityName} — najbliższe godziny</h2>
        <p class="section-intro">Dane orientacyjne dla współrzędnych miasta. Przy groźnej pogodzie sprawdzaj też oficjalne ostrzeżenia IMGW-PIB.</p>
      </div>
      <p class="notice">Aktualizacja widoku: ${updatedAt}</p>
    </div>
    <div class="forecast-current">
      <div class="forecast-metric"><span>Temperatura</span><strong>${Math.round(details.air_temperature)}°C</strong></div>
      <div class="forecast-metric"><span>Warunki</span><strong>${describeWeather(symbol)}</strong></div>
      <div class="forecast-metric"><span>Wiatr</span><strong>${Math.round(details.wind_speed || 0)} m/s</strong></div>
      <div class="forecast-metric"><span>Opad</span><strong>${getPrecipitation(nowBlock).toFixed(1)} mm</strong></div>
    </div>
    <h3>Prognoza godzinowa</h3>
    <div class="forecast-hours">
      ${nextBlocks.map((block) => {
        const itemDetails = block.data.instant.details || {};
        const itemSymbol = block.data.next_1_hours?.summary?.symbol_code || block.data.next_6_hours?.summary?.symbol_code || '';
        return `<div class="forecast-hour"><span>${formatForecastTime(block.time)}</span><strong>${Math.round(itemDetails.air_temperature)}°C</strong><p>${describeWeather(itemSymbol)}</p><span>Wiatr: ${Math.round(itemDetails.wind_speed || 0)} m/s · Opad: ${getPrecipitation(block).toFixed(1)} mm</span></div>`;
      }).join('')}
    </div>
    <p class="forecast-source">Źródło prognozy: <a href="https://api.met.no/" rel="nofollow noopener">MET Norway / api.met.no</a>. MeteoLive nie jest oficjalnym serwisem ostrzeżeń — komunikaty bezpieczeństwa sprawdzaj w IMGW-PIB.</p>
  `;
}

async function loadCityForecast() {
  const match = currentPath.match(/^\/pogoda\/([^/]+)\/$/);
  if (!match) return;

  const slug = match[1];
  const city = weatherCities[slug];
  if (!city) return;

  const [cityName, lat, lon] = city;
  const container = createForecastSection(cityName);
  const cacheKey = `meteolive_forecast_${slug}_v1`;
  const maxAgeMs = 60 * 60 * 1000;

  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.savedAt < maxAgeMs) {
      renderForecast(container, cityName, cached.data);
      return;
    }

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) {
      throw new Error(`MET Norway API error: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data }));
    renderForecast(container, cityName, data);
  } catch (error) {
    container.innerHTML = `
      <h2>Pogoda ${cityName} — prognoza chwilowo niedostępna</h2>
      <div class="forecast-error"><p>Nie udało się pobrać prognozy z MET Norway. Radary i mapy pogodowe poniżej nadal działają, więc możesz sprawdzić opady, burze, wiatr i ostrzeżenia.</p></div>
      <p class="forecast-source">Źródło prognozy: <a href="https://api.met.no/" rel="nofollow noopener">MET Norway / api.met.no</a>.</p>
    `;
  }
}

loadCityForecast();

const cookieConsentKey = 'meteolive_cookie_consent_v1';
const gaMeasurementId = 'G-MQ1X7GSLXX';

function loadGoogleAnalytics() {
  if (window.meteoliveGaLoaded) {
    return;
  }

  window.meteoliveGaLoaded = true;

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', gaMeasurementId, {
    anonymize_ip: true
  });
}

function createCookieConsentBanner() {
  if (localStorage.getItem(cookieConsentKey)) {
    return;
  }

  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Informacja o cookies');
  banner.innerHTML = `
    <div class="cookie-banner__content">
      <strong>Cookies, zewnętrzne mapy i analityka</strong>
      <p>MeteoLive korzysta z podstawowych rozwiązań technicznych, zewnętrznych map pogodowych i prognozy MET Norway. Google Analytics uruchomimy tylko po kliknięciu „Akceptuję”.</p>
      <a href="/cookies/">Dowiedz się więcej</a>
    </div>
    <div class="cookie-banner__actions">
      <button type="button" class="btn cookie-secondary" data-cookie-choice="necessary">Tylko niezbędne</button>
      <button type="button" class="btn primary" data-cookie-choice="accepted">Akceptuję</button>
    </div>
  `;

  banner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.dataset.cookieChoice || 'closed';
      localStorage.setItem(cookieConsentKey, choice);

      if (choice === 'accepted') {
        loadGoogleAnalytics();
      }

      banner.remove();
    });
  });

  document.body.appendChild(banner);
}

if (localStorage.getItem(cookieConsentKey) === 'accepted') {
  loadGoogleAnalytics();
}

createCookieConsentBanner();

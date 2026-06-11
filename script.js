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
  '/poradniki/jak-czytac-radar-opadow/': {
    headline: 'Jak czytać radar opadów?',
    description: 'Prosty poradnik MeteoLive wyjaśniający, jak czytać radar opadów, kolory, kierunek deszczu i ograniczenia mapy.',
    questions: [
      ['Czy radar opadów pokazuje dokładnie, kiedy zacznie padać?', 'Nie zawsze. Radar pomaga ocenić kierunek i zasięg opadów, ale lokalna pogoda może zmienić się szybciej, niż pokazuje mapa.'],
      ['Czy radar pokazuje śnieg?', 'Radar może pokazywać obszary opadów zimowych, ale rodzaj opadu warto porównywać z temperaturą i warunkami przy ziemi.'],
      ['Czy wystarczy patrzeć tylko na radar opadów?', 'Nie. Przy burzach, wichurach i groźnej pogodzie warto sprawdzić też mapę wiatru, radar burz i oficjalne ostrzeżenia IMGW-PIB.']
    ]
  },
  '/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/': {
    headline: 'Co oznaczają kolory na radarze pogodowym?',
    description: 'Prosty poradnik MeteoLive o kolorach na radarze pogodowym, intensywności opadów, burzach i ograniczeniach odczytu.',
    questions: [
      ['Czy czerwony kolor zawsze oznacza burzę?', 'Nie zawsze. Może oznaczać bardzo intensywny opad, ale burzę najlepiej potwierdzać mapą wyładowań i oficjalnymi ostrzeżeniami.'],
      ['Czy słaby kolor oznacza, że nie trzeba brać parasola?', 'Nie. Słaby opad może się nasilić, a lokalnie pogoda może zmienić się szybko. Warto sprawdzić animację mapy.'],
      ['Dlaczego radar pokazuje opad, a u mnie nie pada?', 'Czasem opad nie dochodzi do ziemi albo mapa ma opóźnienie. Możliwe są też lokalne różnice w pogodzie.']
    ]
  },
  '/poradniki/jak-sprawdzic-czy-bedzie-burza/': {
    headline: 'Jak sprawdzić, czy będzie burza?',
    description: 'Prosty poradnik MeteoLive o sprawdzaniu ryzyka burzy przy pomocy radaru burz, mapy wyładowań, wiatru i ostrzeżeń.',
    questions: [
      ['Czy mapa wyładowań pokazuje burze na żywo?', 'Mapa wyładowań pomaga zobaczyć aktywność burzową, ale może mieć opóźnienia lub ograniczenia. Traktuj ją jako podgląd, nie jako jedyne źródło decyzji.'],
      ['Czy burza może powstać bez wcześniejszego ostrzeżenia?', 'Tak, lokalne burze mogą rozwijać się szybko. Dlatego przy dusznej, gorącej i niestabilnej pogodzie warto regularnie sprawdzać mapy.'],
      ['Gdzie sprawdzać oficjalne ostrzeżenia?', 'Oficjalne ostrzeżenia pogodowe dla Polski publikuje IMGW-PIB. MeteoLive może kierować do tych źródeł, ale ich nie zastępuje.']
    ]
  },
  '/poradniki/jak-przygotowac-sie-na-burze/': {
    headline: 'Jak przygotować się na burzę?',
    description: 'Praktyczna checklista MeteoLive przed burzą: radar, ostrzeżenia, dom, balkon, ogród, samochód i bezpieczne zachowanie.',
    questions: [
      ['Czy wystarczy sprawdzić tylko radar burz?', 'Nie. Radar pomaga ocenić sytuację, ale przy groźnej pogodzie trzeba sprawdzić też oficjalne ostrzeżenia IMGW-PIB.'],
      ['Kiedy burza jest już niebezpiecznie blisko?', 'Jeżeli słyszysz grzmoty, widzisz wyładowania albo wiatr nagle się nasila, przejdź w bezpieczne miejsce.'],
      ['Czy można zostać w aucie podczas burzy?', 'Samochód zwykle jest bezpieczniejszy niż otwarta przestrzeń, ale unikaj parkowania pod drzewami i konstrukcjami, które mogą się przewrócić.']
    ]
  },
  '/poradniki/jak-sprawdzic-kierunek-wiatru/': {
    headline: 'Jak sprawdzić kierunek wiatru?',
    description: 'Prosty poradnik MeteoLive o mapie wiatru, kierunku, porywach i łączeniu informacji o wietrze z opadami oraz burzami.',
    questions: [
      ['Czy kierunek wiatru pokazuje, gdzie pójdzie deszcz?', 'Często pomaga to ocenić, ale nie zawsze daje prostą odpowiedź. Najlepiej porównać mapę wiatru z animacją radaru opadów.'],
      ['Czym różni się wiatr od porywów?', 'Wiatr to ogólny przepływ powietrza, a poryw to chwilowy, silniejszy podmuch. Porywy są ważne przy wichurach i burzach.'],
      ['Czy silny wiatr zawsze oznacza ostrzeżenie?', 'Nie zawsze, ale przy silnych porywach warto sprawdzić oficjalne ostrzeżenia IMGW-PIB.']
    ]
  },
  '/poradniki/czym-rozni-sie-prognoza-od-radaru/': {
    headline: 'Czym różni się prognoza od radaru?',
    description: 'Prosty poradnik MeteoLive wyjaśniający różnicę między prognozą pogody a radarem opadów oraz kiedy korzystać z każdego źródła.',
    questions: [
      ['Czy radar jest dokładniejszy niż prognoza?', 'Radar lepiej pokazuje bieżącą sytuację, ale nie zastępuje prognozy na kolejne godziny i dni. Oba źródła mają inne zastosowanie.'],
      ['Dlaczego prognoza mówiła, że będzie padać, a nie pada?', 'Prognoza pokazuje ryzyko i przewidywany przebieg pogody. Lokalnie opady mogą ominąć daną okolicę albo pojawić się później.'],
      ['Czy radar pokaże pogodę na jutro?', 'Nie. Radar pokazuje bieżące lub bardzo świeże dane opadowe. Do jutra potrzebna jest prognoza.']
    ]
  },
  '/poradniki/co-oznaczaja-ostrzezenia-imgw/': {
    headline: 'Co oznaczają ostrzeżenia IMGW?',
    description: 'Prosty poradnik MeteoLive o ostrzeżeniach IMGW, stopniach ostrzeżeń, bezpieczeństwie i sprawdzaniu oficjalnych komunikatów.',
    questions: [
      ['Czy MeteoLive wydaje ostrzeżenia pogodowe?', 'Nie. MeteoLive nie wydaje oficjalnych ostrzeżeń. Strona pomaga przejść do map i wyjaśnień, ale oficjalne komunikaty należy sprawdzać w IMGW-PIB.'],
      ['Czy ostrzeżenie oznacza, że zjawisko na pewno wystąpi?', 'Ostrzeżenie oznacza ryzyko wystąpienia groźnego zjawiska na określonym obszarze i w określonym czasie. Pogoda nadal może różnić się lokalnie.'],
      ['Czy warto sprawdzać radar, gdy jest ostrzeżenie?', 'Tak. Radar i mapy pomagają zrozumieć bieżącą sytuację, ale nie zastępują oficjalnego komunikatu.']
    ]
  }
};

const guidesItemList = [
  ['Jak czytać radar opadów?', '/poradniki/jak-czytac-radar-opadow/'],
  ['Co oznaczają kolory na radarze pogodowym?', '/poradniki/co-oznaczaja-kolory-na-radarze-pogodowym/'],
  ['Jak sprawdzić, czy będzie burza?', '/poradniki/jak-sprawdzic-czy-bedzie-burza/'],
  ['Jak przygotować się na burzę?', '/poradniki/jak-przygotowac-sie-na-burze/'],
  ['Jak sprawdzić kierunek wiatru?', '/poradniki/jak-sprawdzic-kierunek-wiatru/'],
  ['Czym różni się prognoza od radaru?', '/poradniki/czym-rozni-sie-prognoza-od-radaru/'],
  ['Co oznaczają ostrzeżenia IMGW?', '/poradniki/co-oznaczaja-ostrzezenia-imgw/']
];

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
    description: 'Proste poradniki pogodowe MeteoLive o radarach, opadach, burzach, wietrze i ostrzeżeniach.',
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
  const guide = guideSchemas[currentPath];
  const pageUrl = `${siteBaseUrl}${currentPath}`;

  addJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.headline,
        description: guide.description,
        inLanguage: 'pl-PL',
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        author: buildSitePublisher(),
        publisher: buildSitePublisher()
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.questions.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Strona główna',
            item: siteBaseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Poradniki',
            item: `${siteBaseUrl}/poradniki/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.headline,
            item: pageUrl
          }
        ]
      }
    ]
  });
}

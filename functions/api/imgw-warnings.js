const SOURCE_NAME = 'Instytut Meteorologii i Gospodarki Wodnej â€“ PaĹ„stwowy Instytut Badawczy';
const SOURCE_URL = 'https://meteo.imgw.pl/dyn/';
const METEO_URL = 'https://danepubliczne.imgw.pl/api/data/warningsmeteo';
const CACHE_TTL_SECONDS = 15 * 60;

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=0, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=300`,
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders
    }
  });
}

function parseDate(value) {
  if (!value) return null;
  const normalized = String(value).replace(' ', 'T');
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isStillRelevant(item, now) {
  const validTo = parseDate(item.obowiazuje_do);
  if (validTo && validTo < now) return false;
  return true;
}

function formatPriority(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function collectAreaNames(item) {
  const names = [];
  const add = (value) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed && !names.includes(trimmed)) names.push(trimmed);
    }
  };

  add(item.wojewodztwo);
  add(item.powiat);
  add(item.gmina);
  add(item.obszar);

  if (Array.isArray(item.obszary)) {
    item.obszary.forEach((entry) => {
      add(entry?.wojewodztwo);
      add(entry?.powiat);
      add(entry?.gmina);
      add(entry?.nazwa);
      add(entry?.opis);
    });
  }

  return names;
}

function buildAreaSummary(item) {
  const names = collectAreaNames(item);
  if (names.length) {
    if (names.length === 1) return `Obszar: ${names[0]}`;
    if (names.length === 2) return `Obszar: ${names[0]}, ${names[1]}`;
    return `Obszar: ${names.slice(0, 3).join(', ')}${names.length > 3 ? ' i kolejne lokalizacje' : ''}`;
  }

  const count = Number(item.liczba_lokalizacji || item.liczba_powiatow || item.liczba_gmin);
  if (Number.isFinite(count) && count > 0) {
    return `Obszar: ${count} lokalizacji objÄ™tych ostrzeĹĽeniem`;
  }

  return 'Obszar: wybrane powiaty lub gminy - szczegĂłĹ‚y sprawdĹş w IMGW-PIB';
}

function transformMeteoWarning(item) {
  const areaNames = collectAreaNames(item);
  return {
    id: item.id || null,
    eventName: item.nazwa_zdarzenia || 'OstrzeĹĽenie meteorologiczne',
    degree: formatPriority(item.stopien),
    probability: formatPriority(item.prawdopodobienstwo),
    validFrom: item.obowiazuje_od || null,
    validTo: item.obowiazuje_do || null,
    publishedAt: item.opublikowano || null,
    bureau: item.biuro || null,
    areaSummary: buildAreaSummary(item),
    areaDetails: areaNames,
    description: item.tresc || '',
    note: item.komentarz && item.komentarz !== 'Brak.' ? item.komentarz : ''
  };
}

function sortWarnings(a, b) {
  const degreeA = Number.isFinite(a.degree) ? a.degree : -999;
  const degreeB = Number.isFinite(b.degree) ? b.degree : -999;
  if (degreeA !== degreeB) return degreeB - degreeA;
  const dateA = parseDate(a.publishedAt) || new Date(0);
  const dateB = parseDate(b.publishedAt) || new Date(0);
  return dateB - dateA;
}

async function fetchJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`IMGW API error ${response.status} for ${url}`);
  }
  return response.json();
}

export async function onRequestGet({ request, context }) {
  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const meteoRaw = await fetchJson(METEO_URL, controller.signal);
    const now = new Date();
    const meteorological = Array.isArray(meteoRaw)
      ? meteoRaw.filter((item) => isStillRelevant(item, now)).map(transformMeteoWarning).sort(sortWarnings)
      : [];

    const payload = {
      fetchedAt: new Date().toISOString(),
      sourceName: SOURCE_NAME,
      sourceUrl: SOURCE_URL,
      processedBy: 'MeteoLive',
      counts: {
        meteorological: meteorological.length
      },
      meteorological
    };

    const response = jsonResponse(payload);
    context?.waitUntil?.(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    const payload = {
      fetchedAt: new Date().toISOString(),
      sourceName: SOURCE_NAME,
      sourceUrl: SOURCE_URL,
      processedBy: 'MeteoLive',
      error: true,
      message: 'Nie udaĹ‚o siÄ™ chwilowo pobraÄ‡ danych ostrzeĹĽeĹ„. SprawdĹş oficjalnÄ… mapÄ™ IMGW-PIB.',
      meteorological: []
    };
    return jsonResponse(payload, 502);
  } finally {
    clearTimeout(timeout);
  }
}

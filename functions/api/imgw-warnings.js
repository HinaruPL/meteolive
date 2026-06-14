const SOURCE_NAME = 'Instytut Meteorologii i Gospodarki Wodnej – Państwowy Instytut Badawczy';
const SOURCE_URL = 'https://meteo.imgw.pl/dyn/';
const METEO_URL = 'https://danepubliczne.imgw.pl/api/data/warningsmeteo';
const HYDRO_URL = 'https://danepubliczne.imgw.pl/api/data/warningshydro';
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
  const validTo = parseDate(item.obowiazuje_do || item.data_do);
  if (validTo && validTo < now) return false;
  return true;
}

function formatPriority(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function transformMeteoWarning(item) {
  const territoryCount = Array.isArray(item.teryt) ? item.teryt.length : 0;
  return {
    id: item.id || null,
    category: 'meteorological',
    eventName: item.nazwa_zdarzenia || 'Ostrzeżenie meteorologiczne',
    degree: formatPriority(item.stopien),
    probability: formatPriority(item.prawdopodobienstwo),
    validFrom: item.obowiazuje_od || null,
    validTo: item.obowiazuje_do || null,
    publishedAt: item.opublikowano || null,
    bureau: item.biuro || null,
    areaSummary: territoryCount ? `${territoryCount} jednostek TERYT` : 'Obszar wskazany przez IMGW-PIB',
    areaDetails: territoryCount ? item.teryt.slice(0, 20) : [],
    description: item.tresc || '',
    note: item.komentarz && item.komentarz !== 'Brak.' ? item.komentarz : ''
  };
}

function transformHydroWarning(item) {
  const areas = Array.isArray(item.obszary) ? item.obszary : [];
  return {
    id: item.numer || null,
    category: 'hydrological',
    eventName: item.zdarzenie || 'Ostrzeżenie hydrologiczne',
    degree: formatPriority(item.stopień),
    probability: formatPriority(item.prawdopodobienstwo),
    validFrom: item.data_od || null,
    validTo: item.data_do || null,
    publishedAt: item.opublikowano || null,
    bureau: item.biuro || null,
    areaSummary: areas.length ? areas.map((area) => area.wojewodztwo).filter(Boolean).join(', ') : 'Obszar wskazany przez IMGW-PIB',
    areaDetails: areas.map((area) => ({
      voivodeship: area.wojewodztwo || '',
      description: area.opis || '',
      basinCodes: Array.isArray(area.kod_zlewni) ? area.kod_zlewni : []
    })),
    description: item.przebieg || '',
    note: item.komentarz || ''
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
    const [meteoRaw, hydroRaw] = await Promise.all([
      fetchJson(METEO_URL, controller.signal),
      fetchJson(HYDRO_URL, controller.signal)
    ]);

    const now = new Date();
    const meteorological = Array.isArray(meteoRaw)
      ? meteoRaw.filter((item) => isStillRelevant(item, now)).map(transformMeteoWarning).sort(sortWarnings)
      : [];
    const hydrological = Array.isArray(hydroRaw)
      ? hydroRaw.filter((item) => isStillRelevant(item, now)).map(transformHydroWarning).sort(sortWarnings)
      : [];

    const payload = {
      fetchedAt: new Date().toISOString(),
      sourceName: SOURCE_NAME,
      sourceUrl: SOURCE_URL,
      processedBy: 'MeteoLive',
      counts: {
        meteorological: meteorological.length,
        hydrological: hydrological.length
      },
      meteorological,
      hydrological
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
      message: 'Nie udało się chwilowo pobrać danych ostrzeżeń. Sprawdź oficjalną mapę IMGW-PIB.',
      meteorological: [],
      hydrological: []
    };
    return jsonResponse(payload, 502);
  } finally {
    clearTimeout(timeout);
  }
}

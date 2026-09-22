/**
 * Cloudflare Pages Function — server-side weather for Fatehpur Sikri.
 *
 * This implements the "fetch on the server and cache" requirement for this
 * stack: the edge fetches Open-Meteo, caches the result in the edge cache, and
 * the client only renders the response. No API key is involved, and the client
 * never sees any provider/source wording — it simply shows the conditions.
 */

const LAT = 27.0966511;
const LON = 77.6636685;
const TTL = 600; // 10 minutes

interface DailyRow {
  date: string;
  code: number;
  tmax: number;
  tmin: number;
  precipProb: number;
  wind: number;
  uv: number;
}

export async function onRequest(context: any): Promise<Response> {
  const url = new URL(context.request.url);
  const lang = url.searchParams.get("lang") === "hi" ? "hi" : "en";
  const cache = (caches as any).default;
  const cacheKey = new Request(`https://edge.fatehpursikrifort.com/weather/${lang}`, {
    method: "GET",
  });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const api =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max` +
    `&timezone=Asia%2FKolkata&forecast_days=7&wind_speed_unit=kmh`;

  let data: any;
  try {
    const resp = await fetch(api, { cf: { cacheTtl: TTL, cacheEverything: true } } as any);
    if (!resp.ok) throw new Error(`upstream ${resp.status}`);
    data = await resp.json();
  } catch {
    return new Response(JSON.stringify({ error: "weather_unavailable" }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const cur = data.current ?? {};
  const d = data.daily ?? {};
  const daily: DailyRow[] = (d.time ?? []).map((date: string, i: number) => ({
    date,
    code: d.weather_code?.[i],
    tmax: d.temperature_2m_max?.[i],
    tmin: d.temperature_2m_min?.[i],
    precipProb: d.precipitation_probability_max?.[i],
    wind: d.wind_speed_10m_max?.[i],
    uv: d.uv_index_max?.[i],
  }));

  const payload = {
    updated: new Date().toISOString(),
    lang,
    current: {
      temp: cur.temperature_2m,
      feels: cur.apparent_temperature,
      humidity: cur.relative_humidity_2m,
      precip: cur.precipitation,
      code: cur.weather_code,
      wind: cur.wind_speed_10m,
      isDay: cur.is_day === 1,
    },
    daily,
  };

  const response = new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${TTL}, s-maxage=${TTL}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (context.waitUntil) {
    context.waitUntil(cache.put(cacheKey, response.clone()));
  } else {
    await cache.put(cacheKey, response.clone());
  }
  return response;
}

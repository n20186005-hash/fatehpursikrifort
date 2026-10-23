import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../functions/weather";
test("weather payload adapter and upstream failure", async () => {
  const originalFetch = globalThis.fetch;
  const originalCaches = globalThis.caches;
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: { default: { match: async () => null, put: async () => {} } },
  });
  const current = {
    temperature_2m: 25,
    apparent_temperature: 26,
    relative_humidity_2m: 40,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 10,
    is_day: 1,
  };
  try {
    globalThis.fetch = async () =>
      Response.json({
        current,
        daily: {
          time: ["2026-10-23"],
          weather_code: [0],
          temperature_2m_max: [30],
          temperature_2m_min: [20],
          precipitation_probability_max: [0],
          wind_speed_10m_max: [10],
          uv_index_max: [5],
        },
      });
    for (const lang of ["hi", "en"]) {
      const response = await onRequest({
        request: new Request(
          `https://fatehpursikrifort.com/weather?lang=${lang}`
        ),
      });
      const data = (await response.json()) as any;
      assert.equal(response.status, 200);
      assert.equal(data.lang, lang);
      assert.equal(data.current.temp, 25);
      assert.equal(data.daily.length, 1);
    }
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal(
      (
        await onRequest({
          request: new Request("https://fatehpursikrifort.com/weather"),
        })
      ).status,
      502
    );
    globalThis.fetch = async () =>
      Response.json({ current: {}, daily: { time: [] } });
    assert.equal(
      (
        await onRequest({
          request: new Request("https://fatehpursikrifort.com/weather"),
        })
      ).status,
      502
    );
  } finally {
    globalThis.fetch = originalFetch;
    Object.defineProperty(globalThis, "caches", {
      configurable: true,
      value: originalCaches,
    });
  }
});

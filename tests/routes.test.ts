import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "../worker";
const env = {
  ASSETS: {
    async fetch(request: Request) {
      const path = new URL(request.url).pathname;
      try {
        return new Response(await readFile("dist/public" + path), {
          headers: {
            "Content-Type": path.endsWith(".html")
              ? "text/html"
              : "application/octet-stream",
          },
        });
      } catch {
        return new Response("missing", { status: 404 });
      }
    },
  },
};
const ctx = { waitUntil() {} };
test("all locale families contain matching crawlable metadata and one H1", async () => {
  for (const prefix of ["", "/en"])
    for (const suffix of ["/", "/privacy", "/terms", "/cookies"]) {
      const response = await worker.fetch(
        new Request("https://fatehpursikrifort.com" + prefix + suffix),
        env,
        ctx
      );
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(html.includes(`<html lang="${prefix ? "en" : "hi"}">`));
      assert.ok(
        html.includes(
          `rel="canonical" href="https://fatehpursikrifort.com${prefix}${suffix}"`
        )
      );
      assert.ok(html.includes('hreflang="hi"'));
      assert.ok(html.includes('hreflang="en"'));
      assert.ok(!html.includes("AggregateRating"));
      assert.ok(!html.includes("%VITE_"));
      for (const match of html.matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/g
      ))
        JSON.parse(match[1]);
    }
});
test("protocol, canonical aliases, query preservation and real noindex error routes", async () => {
  for (const [input, expected] of [
    [
      "http://fatehpursikrifort.com/en/privacy?x=1",
      "https://fatehpursikrifort.com/en/privacy?x=1",
    ],
    [
      "https://fatehpursikrifort.com/en?x=1",
      "https://fatehpursikrifort.com/en/?x=1",
    ],
    [
      "https://fatehpursikrifort.com/privacy/?x=1",
      "https://fatehpursikrifort.com/privacy?x=1",
    ],
  ]) {
    const response = await worker.fetch(new Request(input), env, ctx);
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("Location"), expected);
  }
  for (const route of [
    "/unknown",
    "/404",
    "/404.html",
    "/en/unknown",
    "/en/404",
    "/en/404.html",
  ]) {
    const response = await worker.fetch(
      new Request("https://fatehpursikrifort.com" + route),
      env,
      ctx
    );
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
    assert.ok((await response.text()).includes("noindex, follow"));
  }
});
test("current prerender image and script references resolve to generated files", async () => {
  const html = await readFile("dist/public/index.html", "utf8");
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g))
    assert.ok((await readFile("dist/public" + match[1])).length > 0, match[1]);
});

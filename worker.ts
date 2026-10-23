import { onRequest } from "./functions/weather";
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}
interface Context {
  waitUntil(promise: Promise<unknown>): void;
}
const valid = new Set([
  "/",
  "/privacy",
  "/terms",
  "/cookies",
  "/en/",
  "/en/privacy",
  "/en/terms",
  "/en/cookies",
]);
export default {
  async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
    const url = new URL(request.url);
    if (
      url.protocol === "http:" &&
      !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    ) {
      url.protocol = "https:";
      return Response.redirect(url.href, 301);
    }
    if (!["GET", "HEAD"].includes(request.method))
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    if (url.pathname === "/weather")
      return onRequest({ request, waitUntil: ctx.waitUntil.bind(ctx) });
    const aliases: Record<string, string> = {
      "/index.html": "/",
      "/en": "/en/",
      "/en/index.html": "/en/",
    };
    const normalized =
      aliases[url.pathname] ||
      (url.pathname.endsWith("/index.html") &&
      valid.has(url.pathname.slice(0, -11))
        ? url.pathname.slice(0, -11)
        : null) ||
      (url.pathname.endsWith("/") &&
      url.pathname !== "/" &&
      url.pathname !== "/en/" &&
      valid.has(url.pathname.slice(0, -1))
        ? url.pathname.slice(0, -1)
        : null);
    if (normalized) {
      url.pathname = normalized;
      return Response.redirect(url.href, 301);
    }
    let response: Response;
    if (valid.has(url.pathname)) {
      const asset = new URL(url);
      asset.pathname =
        url.pathname === "/"
          ? "/index.html"
          : url.pathname === "/en/"
            ? "/en/index.html"
            : url.pathname + "/index.html";
      response = await env.ASSETS.fetch(new Request(asset, request));
    } else {
      response = await env.ASSETS.fetch(request);
      if (
        response.status === 404 ||
        url.pathname === "/404" ||
        url.pathname === "/404.html" ||
        url.pathname === "/en/404" ||
        url.pathname === "/en/404.html"
      ) {
        const asset = new URL(url);
        asset.pathname = url.pathname.startsWith("/en/")
          ? "/en/404.html"
          : "/404.html";
        const page = await env.ASSETS.fetch(new Request(asset, request));
        response = new Response(request.method === "HEAD" ? null : page.body, {
          status: 404,
          headers: page.headers,
        });
      }
    }
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    if (headers.get("Content-Type")?.includes("text/html")) {
      headers.set("Cache-Control", "no-cache");
      headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://cloudflareinsights.com; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
      );
    }
    if (response.status === 404) headers.set("X-Robots-Tag", "noindex");
    return new Response(request.method === "HEAD" ? null : response.body, {
      status: response.status,
      headers,
    });
  },
};

import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { render } from "../dist/render/entry-server.js";
const origin = "https://fatehpursikrifort.com";
const template = await readFile("dist/public/index.html", "utf8");
const copy = {
  hi: {
    home: [
      "फ़तेहपुर सीकरी का किला: कहाँ है, समय और टिकट | आगरा, उत्तर प्रदेश",
      "फ़तेहपुर सीकरी आगरा ज़िले, उत्तर प्रदेश में है। आगरा से 37 किमी: किले का इतिहास, सूर्योदय–सूर्यास्त समय, टिकट, बुलंद दरवाज़ा और यात्रा योजना।",
    ],
    privacy: [
      "गोपनीयता नीति | फ़तेहपुर सीकरी गाइड",
      "स्वतंत्र फ़तेहपुर सीकरी गाइड: ब्राउज़र स्टोरेज, वैकल्पिक Google Analytics और अन्य तृतीय-पक्ष सेवाओं की जानकारी।",
    ],
    terms: [
      "उपयोग की शर्तें | फ़तेहपुर सीकरी गाइड",
      "फ़तेहपुर सीकरी की स्वतंत्र सूचना गाइड के उपयोग, स्रोतों, तस्वीरों और बदल सकने वाली यात्रा सूचना की शर्तें।",
    ],
    cookies: [
      "कुकी और विश्लेषण पसंद | फ़तेहपुर सीकरी गाइड",
      "वैकल्पिक Google Analytics की पसंद बदलें। भाषा URL से चुनी जाती है; सहेजने की स्थिति इस पृष्ठ पर दिखाई जाती है।",
    ],
    error: [
      "404 — पृष्ठ नहीं मिला | फ़तेहपुर सीकरी",
      "यह पृष्ठ उपलब्ध नहीं है। फ़तेहपुर सीकरी की मुख्य यात्रा गाइड पर लौटें।",
    ],
  },
  en: {
    home: [
      "Fatehpur Sikri Fort: Location, Timings & Tickets | Agra, Uttar Pradesh",
      "Fatehpur Sikri Fort is in Agra district, Uttar Pradesh, 37 km from Agra. Plan palace and mosque visits with opening hours, tickets, history and directions.",
    ],
    privacy: [
      "Privacy policy | Fatehpur Sikri Guide",
      "How this independent Fatehpur Sikri guide uses browser storage, optional Google Analytics, embedded maps, fonts and server weather requests.",
    ],
    terms: [
      "Terms of use | Fatehpur Sikri Guide",
      "Terms for this independent Fatehpur Sikri visitor guide, its source information, image licences and changing travel arrangements.",
    ],
    cookies: [
      "Cookie and analytics choices | Fatehpur Sikri Guide",
      "Change optional Google Analytics permission and see whether the choice was saved. The page URL selects language.",
    ],
    error: [
      "404 — Page not found | Fatehpur Sikri",
      "This page is unavailable. Return to the Fatehpur Sikri visitor guide.",
    ],
  },
};
const escape = text =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
const routes = [];
for (const lang of ["hi", "en"])
  for (const key of ["home", "privacy", "terms", "cookies", "error"]) {
    const prefix = lang === "en" ? "/en" : "";
    const route =
      key === "home"
        ? prefix + "/"
        : prefix + "/" + (key === "error" ? "404" : key);
    const suffix = key === "home" ? "/" : "/" + key;
    const hi = suffix;
    const en = "/en" + suffix;
    const [title, description] = copy[lang][key];
    let metadata = `<meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${origin + route}"><meta property="og:image" content="${origin}/social.jpg"><meta property="og:image:alt" content="Buland Darwaza, photographed by Rajatkantib in 2014; CC BY-SA 4.0"><meta name="twitter:card" content="summary_large_image">`;
    if (key === "error")
      metadata += '<meta name="robots" content="noindex, follow">';
    else
      metadata += `<link rel="canonical" href="${origin + route}"><link rel="alternate" hreflang="hi" href="${origin + hi}"><link rel="alternate" hreflang="en" href="${origin + en}"><link rel="alternate" hreflang="x-default" href="${origin + hi}">`;
    const html = template
      .replace('<html lang="hi">', `<html lang="${lang}">`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${escape(title)}</title>${metadata}`
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root">${render(route)}</div>`
      );
    const destination =
      key === "error"
        ? `dist/public${prefix}/404.html`
        : key === "home"
          ? `dist/public${prefix}/index.html`
          : `dist/public${route}/index.html`;
    await mkdir(destination.slice(0, destination.lastIndexOf("/")), {
      recursive: true,
    });
    await writeFile(destination, html);
    if (key !== "error") routes.push(route);
  }
await writeFile(
  "dist/public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route}</loc></url>`).join("")}</urlset>`
);
await writeFile(
  "dist/public/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
);

# Fatehpur Sikri visitor guide

React/Vite visitor guide with Hindi at `/` and English at `/en/`. Both languages include privacy, terms and cookie-settings pages. The build prerenders the same React components used for hydration, then Cloudflare Workers serves those HTML files and the native weather endpoint.

Use `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test` and `pnpm build`. Preview the built Worker with `pnpm preview`; `pnpm dev` is a component development server and does not provide the production routes.

The Worker uses the `ASSETS` binding for built files and adapts the existing Open-Meteo Pages handler at `/weather`. Google Analytics remains optional and loads only after a verified choice. Language follows the URL.

## Photographs

- `assets/buland-darwaza-rajatkantib.jpg` and `client/public/social.jpg`: [Buland Darwaza](https://commons.wikimedia.org/wiki/File:Buland_Darwaza_.jpg), Rajatkantib, 3 February 2014, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Original source bytes retained; the build resizes/compresses WebP and social JPEG derivatives, with a display crop on the page.
- `assets/courtyard-kamyaawasthi.jpg`: [Courtyard at Fatehpur Sikri 1](https://commons.wikimedia.org/wiki/File:Courtyard_at_Fatehpur_Sikri_1.jpg), Kamyaawasthi, 26 December 2020, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Original source bytes retained; the build resizes/compresses WebP derivatives and the page applies a display crop.

The photographs and any adaptations remain under their respective CC BY-SA 4.0 licence. Visible credits link each source and licence. Decorative patterns and the existing brand assets are separate from the photographs.

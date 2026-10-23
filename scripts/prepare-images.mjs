import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("assets/generated", { recursive: true });
for (const [name, width] of [
  ["buland-darwaza-rajatkantib.jpg", 1400],
  ["courtyard-kamyaawasthi.jpg", 1400],
  ["fatehpur-brand-mark.png", 160],
  ["fatehpur-hero-arch-pattern.png", 1400],
  ["fatehpur-jali-pattern.png", 1200],
  ["fatehpur-stone-detail.png", 900],
]) {
  await sharp("assets/" + name)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile("assets/generated/" + name.replace(/\.(jpg|png)$/, ".webp"));
}
await sharp("assets/buland-darwaza-rajatkantib.jpg")
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 85 })
  .toFile("client/public/social.jpg");

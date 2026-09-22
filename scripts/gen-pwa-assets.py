"""Generate PWA icons and the OG cover from existing brand assets.

- PWA icons (192 / 512 / 512-maskable) derived from the square brand mark.
- og-cover.jpg (1200x630) center-cropped from the real Buland Darwaza photo.
"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
PUBLIC = os.path.join(ROOT, "client", "public")
ICONS = os.path.join(PUBLIC, "icons")
os.makedirs(ICONS, exist_ok=True)

BG = (183, 78, 50)  # site terracotta #B74E32
BG_DARK = (58, 38, 32)  # site ink #3a2620

mark = Image.open(os.path.join(ASSETS, "fatehpur-brand-mark.png")).convert("RGBA")


def make_icon(size, maskable=False):
    if maskable:
        # Full-bleed background with the mark inset to the safe zone (40%).
        canvas = Image.new("RGBA", (size, size), BG)
        inner = int(size * 0.6)
        m = mark.resize((inner, inner), Image.LANCZOS)
        offset = (size - inner) // 2
        canvas.alpha_composite(m, (offset, offset))
        return canvas.convert("RGB")
    # Standard icon: square mark with a small terracotta margin.
    canvas = Image.new("RGBA", (size, size), BG)
    inner = int(size * 0.82)
    m = mark.resize((inner, inner), Image.LANCZOS)
    offset = (size - inner) // 2
    canvas.alpha_composite(m, (offset, offset))
    return canvas.convert("RGB")


make_icon(192).save(os.path.join(ICONS, "icon-192.png"), "PNG")
make_icon(512).save(os.path.join(ICONS, "icon-512.png"), "PNG")
make_icon(512, maskable=True).save(os.path.join(ICONS, "icon-512-maskable.png"), "PNG")

# OG cover: center-crop the real photo to 1200x630 (1.91:1).
target = (1200, 630)
photo = Image.open(os.path.join(ASSETS, "buland-darwaza-wikimedia.jpg")).convert("RGB")
w, h = photo.size
scale = max(target[0] / w, target[1] / h)
resized = photo.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
left = (resized.width - target[0]) // 2
top = (resized.height - target[1]) // 2
cropped = resized.crop((left, top, left + target[0], top + target[1]))
cropped.save(os.path.join(PUBLIC, "og-cover.jpg"), "JPEG", quality=85)

print("PWA assets generated:")
for f in ("icon-192.png", "icon-512.png", "icon-512-maskable.png", "../og-cover.jpg"):
    p = os.path.join(ICONS, f) if not f.startswith("..") else os.path.join(PUBLIC, "og-cover.jpg")
    print(" -", os.path.relpath(p, ROOT), os.path.getsize(p), "bytes")

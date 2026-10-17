"""Build the header's AH monogram as portable SVG, PNG and ICO favicons."""

from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static"
FONT = STATIC / "fonts" / "anton.ttf"
BACKGROUND = "#f04a2a"
INK = "#121711"

font = TTFont(FONT)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font["head"].unitsPerEm
tracking = -3 / 43 * units
paths = []
bounds = []
cursor = 0
for character in "AH":
    glyph = glyphs[cmap[ord(character)]]
    pen = SVGPathPen(glyphs)
    glyph.draw(pen)
    paths.append(f'<path transform="translate({cursor} 0)" d="{pen.getCommands()}"/>')
    box = BoundsPen(glyphs)
    glyph.draw(box)
    x0, y0, x1, y1 = box.bounds
    bounds.append((cursor + x0, y0, cursor + x1, y1))
    cursor += glyph.width + tracking

x0 = min(box[0] for box in bounds)
y0 = min(box[1] for box in bounds)
x1 = max(box[2] for box in bounds)
y1 = max(box[3] for box in bounds)
scale = 48 / max(x1 - x0, y1 - y0)
tx = (64 - (x1 - x0) * scale) / 2 - x0 * scale
ty = (64 - (y1 - y0) * scale) / 2 + y1 * scale
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n'
    f'  <rect width="64" height="64" fill="{BACKGROUND}"/>\n'
    f'  <g fill="{INK}" transform="translate({tx} {ty}) scale({scale} {-scale})">\n'
    + "\n".join(f"    {path}" for path in paths)
    + "\n  </g>\n</svg>\n"
)
(STATIC / "favicon.svg").write_text(svg, encoding="utf-8")

# Supersample the same font and tracking for crisp small browser icons.
raster_font = ImageFont.truetype(str(FONT), 1024)
mask = Image.new("L", (2400, 1600))
draw = ImageDraw.Draw(mask)
cursor = 100
for character in "AH":
    draw.text((cursor, 100), character, font=raster_font, fill=255)
    cursor += raster_font.getlength(character) - 3 / 43 * 1024
mask = mask.crop(mask.getbbox())
mask.thumbnail((384, 384), Image.Resampling.LANCZOS)
icon = Image.new("RGB", (512, 512), BACKGROUND)
icon.paste(INK, ((512 - mask.width) // 2, (512 - mask.height) // 2), mask)
icon.save(STATIC / "favicon-512.png")
icon.resize((180, 180), Image.Resampling.LANCZOS).save(STATIC / "apple-touch-icon.png")
icon.save(STATIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

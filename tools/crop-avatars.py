# חיתוך והקטנה של שמונה הדמויות מ-Gemini לגודל שהמשחק צריך.
# כל תמונה נחתכת סביב הראש והכתפיים, כי המסגרת המקורית רחבה ובגודל 44 פיקסלים
# הפנים היו יוצאות זעירות. אחרי החיתוך: ריבוע 256 והצגה בעיגול.
from PIL import Image, ImageDraw
from pathlib import Path

# קבצי המקור מ-Gemini יושבים ב-tools/originals/ בשמות src1 עד src8, לפי
# הסדר שבו הורדו. אחרי הריצה צריך להריץ גם: node tools/build-data.mjs
HERE = Path(__file__).parent / "originals"
OUT = Path(__file__).parent.parent / "images"

# src, יעד, מרכז אופקי, מרכז אנכי, גודל החיתוך ביחס לצלע. הערכים נקבעו לפי
# מיקום הראש בכל תמונה: לכובע הקש של החקלאי צריך חיתוך רחב יותר בגלל השוליים,
# וראש העיר הגיע כבר ממוסגר צפוף ולכן כמעט לא נחתך.
JOBS = [
    ("src1.jpg", "avatar1.jpg", 0.50, 0.455, 0.80, "המתכננת"),
    ("src2.jpg", "avatar2.jpg", 0.50, 0.450, 0.80, "המהנדס"),
    ("src7.jpg", "avatar3.jpg", 0.50, 0.480, 0.94, "ראש העיר"),
    ("src3.jpg", "avatar4.jpg", 0.50, 0.460, 0.80, "הפקידה"),
    ("src4.jpg", "avatar5.jpg", 0.50, 0.450, 0.86, "החקלאי"),
    ("src5.jpg", "avatar6.jpg", 0.50, 0.450, 0.80, "הפעילה"),
    ("src6.jpg", "avatar7.jpg", 0.50, 0.450, 0.80, "היזם"),
    ("src8.jpg", "avatar8.jpg", 0.50, 0.450, 0.82, "המודדת"),
]

SIZE = 256
results = []

for src, dst, cx, cy, frac, label in JOBS:
    im = Image.open(HERE / src).convert("RGB")
    w, h = im.size
    side = int(min(w, h) * frac)
    left = int(w * cx - side / 2)
    top = int(h * cy - side / 2)
    # שמירה על גבולות התמונה בלי להזיז את המרכז יותר מהנדרש
    left = max(0, min(left, w - side))
    top = max(0, min(top, h - side))
    crop = im.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)
    crop.save(OUT / dst, "JPEG", quality=88, optimize=True, progressive=True, subsampling=0)
    results.append((dst, label, (OUT / dst).stat().st_size // 1024, crop))

# גיליון בדיקה: כל דמות בעיגול בגודל התצוגה האמיתי (44) ולצידו 64, כמו במסך המרצה
CELL, PAD = 150, 12
sheet = Image.new("RGB", (CELL * 4 + PAD * 5, (CELL + 40) * 2 + PAD * 3), (233, 236, 240))
d = ImageDraw.Draw(sheet)

def circle(img, size):
    small = img.resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4 - 1, size * 4 - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS)
    out = Image.new("RGB", (size, size), (255, 255, 255))
    out.paste(small, (0, 0), mask)
    return out

for i, (dst, label, kb, img) in enumerate(results):
    col, row = i % 4, i // 4
    x = PAD + col * (CELL + PAD)
    y = PAD + row * (CELL + 40 + PAD)
    sheet.paste(circle(img, 96), (x + 6, y))
    sheet.paste(circle(img, 64), (x + 6, y + 100))
    sheet.paste(circle(img, 44), (x + 78, y + 100))
    d.text((x + 6, y + 100 + 68), dst.replace(".jpg", "") + "  " + str(kb) + "KB", fill=(60, 66, 76))

sheet.save(Path(__file__).parent / "contact.png")
print("\n".join(f"{d} = {l} ({k}KB)" for d, l, k, _ in results))
print("גיליון בדיקה: contact.png")

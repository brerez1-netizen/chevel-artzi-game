# פרומפטים לשמונה הדמויות

הדמויות מוצגות במשחק כעיגולים קטנים בקוטר 44 פיקסלים לאורך החבלים, עם מסגרת בצבע הקבוצה. לכן זה **פורטרט ראש וכתפיים**, לא דמות מלאה: דמות שלמה שמושכת בחבל נראית טוב בגדול ונמרחת לכתם בגודל הזה.

## מה חייב להיות זהה בשמונה

- ריבוע 1:1, לפחות 512 על 512.
- ראש וכתפיים, הפנים במרכז המסגרת, מבט קדימה.
- רקע חלק בגוון חול בהיר אחיד, בלי סצנה ובלי פרטים מאחור. העיגול חותך את הפינות, וכל מה שיושב שם ייעלם.
- אותו סגנון בשמונה: איור וקטורי שטוח, קווי מתאר עדינים, בלי צל דרמטי ובלי ריאליזם פוטוגרפי.
- **בלי טקסט, בלי לוגו, בלי כיתוב** בשום מקום בתמונה.
- אנשים ישראלים בגילאים ובמראה מגוונים, לבוש עבודה יומיומי ולא חליפות מכנסים.

## הבסיס המשותף

הדביקו את הפסקה הזו בתחילת כל אחד משמונת הפרומפטים:

```
Flat vector illustration portrait, head and shoulders, facing forward, centered in a square frame.
Uniform light sand-beige background, completely plain, no scene, no props floating behind.
Soft clean line work, muted warm palette, gentle shading, no photorealism, no dramatic lighting.
Absolutely no text, no letters, no logos, no watermarks anywhere in the image.
Square 1:1 aspect ratio.
```

## שמונה הדמויות

`avatar1.svg` - **המתכננת**
```
A woman in her thirties, urban planner. Dark curly hair tied back, round glasses, plain olive shirt. Calm focused expression.
```

`avatar2.svg` - **המהנדס**
```
A man in his forties, construction engineer. Short dark hair, light stubble, yellow hard hat, grey work shirt with a collar.
```

`avatar3.svg` - **ראש העיר**
```
A man in his sixties, local authority head. Grey hair, clean shaven, open-collar blue shirt, no tie. Confident friendly expression.
```

`avatar4.svg` - **הפקידה**
```
A woman in her fifties, municipal clerk. Straight shoulder-length brown hair, reading glasses on a chain, cream blouse. Patient expression.
```

`avatar5.svg` - **החקלאי**
```
A man in his fifties, farmer, weathered sun-tanned skin. Wide-brim straw hat, faded khaki work shirt, open collar.
```

`avatar6.svg` - **הפעילה**
```
A woman in her twenties, environmental activist. Auburn hair in a loose bun, small nose stud, plain green t-shirt. Determined expression.
```

`avatar7.svg` - **היזם**
```
A man in his thirties, infrastructure developer. Neat dark hair, light beard, charcoal shirt with rolled sleeves visible at the shoulder.
```

`avatar8.svg` - **המודדת**
```
A woman in her forties, land surveyor. Hair under a cap, high-visibility orange vest over a grey shirt. Practical no-nonsense expression.
```

## הסטטוס

שמונה הדמויות יוצרו ב-Gemini ב-7.9.2026 ונמצאות במשחק. המקורות, 2048 על 2048, שמורים ב-`tools/originals/` בשמות `src1` עד `src8` לפי סדר ההורדה.

## אם מחליפים דמות או מוסיפים תשיעית

1. להדביק את הבסיס ואת התיאור יחד, ולשמור את התוצאה ב-`tools/originals/`.
2. להוסיף שורה ל-`JOBS` ב-`tools/crop-avatars.py` ולהריץ אותו. הוא חותך סביב הראש ומקטין ל-256, כי המסגור שהמודל מחזיר רחב מדי לעיגול של 44 פיקסלים. ערכי החיתוך שונים בין דמות לדמות, ויש להתאים אותם לפי `contact.png` שנוצר בסוף הריצה ומראה כל דמות בגודל התצוגה האמיתי.
3. להריץ `node tools/build-data.mjs`.

**מה שכדאי לדעת מהסבב הראשון**: שמונה הפרומפטים חזרו בסגנון אחיד ובלי טקסט מזויף בניסיון אחד. מה שדרש עבודה זה לא הייצור אלא המסגור, כי המודל משאיר הרבה אוויר מעל הראש והפנים יוצאות זעירות בגודל שבו הן באמת מוצגות.

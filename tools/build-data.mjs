// מייצר את js/gameData.js מתוך tools/questions.json.
// האפשרות הראשונה בכל שאלה במקור היא הנכונה, וכאן היא מעורבבת עם זרע קבוע
// כדי שההגרלה תהיה זהה בכל הרצה ולא תיווצר הטיה של "תמיד תשובה א'".
import { readFileSync, writeFileSync } from 'node:fs';

const SEED = 20260907;
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);

const src = JSON.parse(readFileSync(new URL('./questions.json', import.meta.url), 'utf8'));

const questions = src.questions.map((q, idx) => {
  const correctText = q.a[0];
  const opts = q.a.slice();
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  const correct = opts.indexOf(correctText);
  if (correct < 0) throw new Error('התשובה הנכונה אבדה בערבוב, שאלה ' + idx);
  return { id: 'q' + (idx + 1), kind: q.kind, q: q.q, options: opts, correct };
});

const dist = [0, 0, 0, 0];
questions.forEach((q) => dist[q.correct]++);

const teams = [
  { id: 0, name: 'הממשלה',            short: 'ממשלה',   color: '#2f6fd0', corner: 'ne', blurb: 'שליש מחברי המועצה הארצית הם נציגי משרדי הממשלה' },
  { id: 1, name: 'הרשויות המקומיות',  short: 'רשויות',  color: '#e08a2e', corner: 'nw', blurb: 'שליש מחברי המועצה הארצית הם נציגי הרשויות המקומיות' },
  { id: 2, name: 'הירוקים',           short: 'ירוקים',  color: '#3f9d5a', corner: 'sw', blurb: 'הולקחש"פ, הולחו"ף, ונציג ארגון הגג לאיכות הסביבה בות"ל' },
  { id: 3, name: 'התשתיות',           short: 'תשתיות',  color: '#8158d0', corner: 'se', blurb: 'הות"ל והתת"ל, מסלול מהיר לתשתיות בעלות חשיבות לאומית' }
];

const avatars = [
  { id: 'a1', file: 'images/avatar1.svg', label: 'המתכננת' },
  { id: 'a2', file: 'images/avatar2.svg', label: 'המהנדס' },
  { id: 'a3', file: 'images/avatar3.svg', label: 'ראש העיר' },
  { id: 'a4', file: 'images/avatar4.svg', label: 'הפקידה' },
  { id: 'a5', file: 'images/avatar5.svg', label: 'החקלאי' },
  { id: 'a6', file: 'images/avatar6.svg', label: 'הפעילה' },
  { id: 'a7', file: 'images/avatar7.svg', label: 'היזם' },
  { id: 'a8', file: 'images/avatar8.svg', label: 'המודד' }
];

const out = `// נוצר אוטומטית על ידי tools/build-data.mjs. לא לערוך ידנית.
// מקור התוכן: tools/questions.json. לשנות שם ולהריץ: node tools/build-data.mjs
// זרע הערבוב: ${SEED}. פיזור התשובה הנכונה בין ארבעת המקומות: ${dist.join(' / ')}
window.gameData = ${JSON.stringify({
  id: 'chevel-artzi',
  title: 'מי מושך את התוכנית',
  lesson: 'vaada-artzit',
  durationSec: 480,
  lockoutMs: 3000,
  scoring: { base: 60, bonus: 140, decay: 0.18 },
  physics: { friction: 220, maxRadius: 0.40, centerZone: 0.07, ease: 0.12 },
  teams,
  avatars,
  questions
}, null, 2)};
`;

writeFileSync(new URL('../js/gameData.js', import.meta.url), out, 'utf8');
console.log('נכתב js/gameData.js');
console.log('שאלות:', questions.length);
console.log('פיזור התשובה הנכונה:', dist.join(' / '));

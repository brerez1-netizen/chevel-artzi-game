// דמויות זמניות ב-SVG עד שייכנסו איורי ה-AI. אותה מסגרת עגולה, שיער וגוון עור משתנים,
// וסמל קטן שמרמז על התפקיד. הצבע של הקבוצה נצבע מעל בקוד המשחק, לא כאן.
import { writeFileSync } from 'node:fs';

const people = [
  { file: 'avatar1.svg', skin: '#f0c9a6', hair: '#3b2b22', long: true,  prop: 'ruler'  },
  { file: 'avatar2.svg', skin: '#e3b183', hair: '#1f1a17', long: false, prop: 'helmet' },
  { file: 'avatar3.svg', skin: '#f5d6b8', hair: '#6b6b6b', long: false, prop: 'tie'    },
  { file: 'avatar4.svg', skin: '#d9a271', hair: '#2a2320', long: true,  prop: 'folder' },
  { file: 'avatar5.svg', skin: '#c98a55', hair: '#4a3527', long: false, prop: 'hat'    },
  { file: 'avatar6.svg', skin: '#f2cfae', hair: '#8a3f2a', long: true,  prop: 'leaf'   },
  { file: 'avatar7.svg', skin: '#e8bd93', hair: '#241d1a', long: false, prop: 'tie'    },
  { file: 'avatar8.svg', skin: '#f0c9a6', hair: '#5a4632', long: false, prop: 'ruler'  }
];

const props = {
  ruler:  '<rect x="58" y="60" width="26" height="7" rx="2" fill="#f4f1ea" stroke="#8a8375" stroke-width="1.5"/>',
  helmet: '<path d="M28 40a22 22 0 0 1 44 0z" fill="#f2b134"/><rect x="24" y="39" width="52" height="5" rx="2.5" fill="#d99a1f"/>',
  tie:    '<path d="M50 72l-5 6 5 16 5-16z" fill="#c0392b"/>',
  folder: '<rect x="56" y="62" width="26" height="18" rx="2" fill="#e8d9b0" stroke="#a89464" stroke-width="1.5"/>',
  hat:    '<ellipse cx="50" cy="40" rx="30" ry="6" fill="#b08050"/><path d="M32 40a18 14 0 0 1 36 0z" fill="#c8945c"/>',
  leaf:   '<path d="M60 62c12-4 20 2 20 12-12 3-20-3-20-12z" fill="#4e9e5f"/>'
};

for (const p of people) {
  const hair = p.long
    ? `<path d="M22 46c0-17 12-28 28-28s28 11 28 28v30c-6 2-9-6-9-16 0-8-38-8-38 0 0 10-3 18-9 16z" fill="${p.hair}"/>`
    : `<path d="M22 46c0-17 12-28 28-28s28 11 28 28c-6 2-10-8-28-8s-22 10-28 8z" fill="${p.hair}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
<circle cx="50" cy="50" r="49" fill="#fbf7ef"/>
<path d="M50 60c16 0 28 11 30 26a49 49 0 0 1-60 0c2-15 14-26 30-26z" fill="#cfd6de"/>
<circle cx="50" cy="45" r="21" fill="${p.skin}"/>
${hair}
<circle cx="43" cy="46" r="2.4" fill="#2b2b2b"/><circle cx="57" cy="46" r="2.4" fill="#2b2b2b"/>
<path d="M44 55c3 3 9 3 12 0" stroke="#8a5b45" stroke-width="2" fill="none" stroke-linecap="round"/>
${props[p.prop]}
</svg>`;
  writeFileSync(new URL('../images/' + p.file, import.meta.url), svg, 'utf8');
}
console.log('נוצרו', people.length, 'דמויות זמניות ב-images/');

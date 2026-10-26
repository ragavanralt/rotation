// Reads the share text a game gives you and turns it into a score.
// Returns { game, value, label, won } or null when it can't tell.

import { GAMES } from './games.js';

const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const fmtTime = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
const GROUP_SQUARES = /[\u{1F7E6}\u{1F7E8}\u{1F7E9}\u{1F7EA}]/u; // blue, yellow, green, purple squares
const RED = '\u{1F7E5}';
const GREEN = '\u{1F7E9}';
const KEYCAP = /(\d)️?⃣/gu;

// "3/6" style score. Skips dates like 26/10 by checking the numbers make sense.
function fraction(text, maxDen = 20) {
  for (const m of text.matchAll(/\b(\d{1,2}|X)\s*\/\s*(\d{1,2})\b/gi)) {
    const den = Number(m[2]);
    const num = m[1].toUpperCase() === 'X' ? null : Number(m[1]);
    if (den > maxDen || (num !== null && num > den)) continue;
    return { num, den };
  }
  return null;
}

function guesses(text) {
  const f = fraction(text);
  if (!f) return null;
  if (f.num === null) return { value: f.den + 1, won: false, label: `X/${f.den}` };
  return { value: f.num, won: true, label: `${f.num}/${f.den}` };
}

function groups(text) {
  const rows = text.split('\n')
    .map((line) => [...line.replace(/\s/g, '')].filter((ch) => GROUP_SQUARES.test(ch)))
    .filter((r) => r.length === 4);
  if (!rows.length) return null;
  const solved = rows.filter((r) => r.every((ch) => ch === r[0])).length;
  const mistakes = rows.length - solved;
  const won = solved === 4;
  return { value: mistakes, won, label: won ? (mistakes ? plural(mistakes, 'mistake') : 'Perfect') : `${solved}/4 groups` };
}

function multi(text, boards) {
  const cells = [];
  for (const line of text.split('\n')) {
    for (const m of line.matchAll(new RegExp(`${KEYCAP.source}|${RED}`, 'gu'))) cells.push(m[1] ? Number(m[1]) : null);
  }
  const used = cells.slice(0, boards);
  if (!used.length) return null;
  const solved = used.filter((n) => n !== null);
  const total = solved.reduce((a, n) => a + n, 0);
  const won = solved.length === boards;
  return { value: won ? total : total + (boards - solved.length) * 10, won, label: won ? `${total} guesses` : `${solved.length}/${boards} solved` };
}

function time(text) {
  const m = text.match(/(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const sec = Number(m[1]) * 60 + Number(m[2]);
  return { value: sec, won: true, label: fmtTime(sec) };
}

// Order matters: the more specific checks go first.
const PARSERS = [
  { game: 'connections-sports', test: /connections:?\s*sports/i, read: groups },
  { game: 'connections', test: /^\s*connections\b/im, read: groups },
  {
    game: 'strands', test: /^\s*strands\b/im,
    read: (t) => { const h = [...t].filter((ch) => ch === '\u{1F4A1}').length; return { value: h, won: true, label: h ? plural(h, 'hint') : 'No hints' }; },
  },
  { game: 'mini', test: /mini crossword/i, read: time },
  { game: 'wordle', test: /\bwordle\s+[\d,.]+\s+[1-6x]\/6/i, read: guesses },
  { game: 'worldle', test: /#?worldle\b/i, read: guesses },
  { game: 'flagle', test: /#?flagle\b/i, read: guesses },
  { game: 'tradle', test: /#?tradle\b/i, read: guesses },
  {
    game: 'globle', test: /globle/i,
    read: (t) => { const m = t.match(/=\s*(\d+)/) || t.match(/(\d+)\s*guess/i); if (!m) return null; const n = Number(m[1]); return { value: n, won: true, label: plural(n, 'guess').replace('guesss', 'guesses') }; },
  },
  { game: 'quordle', test: /quordle/i, read: (t) => multi(t, 4) },
  { game: 'octordle', test: /octordle/i, read: (t) => multi(t, 8) },
  {
    game: 'framed', test: /^\s*framed\b/im,
    read: (t) => {
      const line = t.split('\n').find((l) => l.includes(RED) || l.includes(GREEN));
      if (!line) return null;
      const marks = [...line].filter((ch) => ch === RED || ch === GREEN);
      const i = marks.indexOf(GREEN);
      return i < 0 ? { value: 7, won: false, label: 'Missed it' } : { value: i + 1, won: true, label: `${i + 1}/6` };
    },
  },
  {
    game: 'krillion', test: /krillion/i,
    read: (t) => { const m = t.match(/([\d,]+)\s?m\b/i); if (!m) return { value: null, won: true, label: 'Done' }; const d = Number(m[1].replace(/,/g, '')); return { value: d, won: true, label: `${d.toLocaleString()} m deep` }; },
  },
  {
    game: 'travle', test: /#?travle\b/i,
    read: (t) => { const m = t.match(/\s([+-]\d+)\b/); if (/perfect/i.test(t)) return { value: 0, won: true, label: 'Perfect' }; if (!m) return { value: null, won: true, label: 'Done' }; const n = Number(m[1]); return { value: n, won: true, label: n > 0 ? `+${n}` : `${n}` }; },
  },
  {
    game: 'waffle', test: /#?waffle/i,
    read: (t) => { const f = fraction(t, 5); if (!f) return null; if (f.num === null) return { value: 0, won: false, label: 'No stars' }; return { value: f.num, won: true, label: plural(f.num, 'star') }; },
  },
  {
    game: 'immaculate', test: /immaculate\s*grid/i,
    read: (t) => { const f = fraction(t, 9); if (!f) return null; const n = f.num ?? 0; return { value: n, won: n > 0, label: `${n}/9` }; },
  },
  {
    game: 'timeguessr', test: /timeguessr/i,
    read: (t) => { const m = t.match(/([\d,]{3,})\s*\/\s*50,?000/); if (!m) return null; const n = Number(m[1].replace(/,/g, '')); return { value: n, won: true, label: `${n.toLocaleString()} pts` }; },
  },
  {
    game: 'contexto', test: /contexto/i,
    read: (t) => { const m = t.match(/(\d+)\s*(guess|tries|attempt)/i); if (!m) return null; const n = Number(m[1]); return { value: n, won: true, label: `${n} guesses` }; },
  },
];

// Last resort: find a game's name in the text, then look for a score.
const BY_NAME = [...GAMES].sort((a, b) => b.name.length - a.name.length);

export function parseResult(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;
  for (const p of PARSERS) {
    if (!p.test.test(text)) continue;
    const r = p.read(text);
    if (r) return { game: p.game, ...r };
  }
  const flat = squash(text);
  const g = BY_NAME.find((x) => flat.includes(squash(x.name)));
  if (!g) return null;
  const r = (g.unit === 'time' && time(text)) || guesses(text) || { value: null, won: true, label: 'Done' };
  return { game: g.id, ...r };
}

export { fmtTime };

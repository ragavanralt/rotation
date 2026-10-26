import { GAMES, TYPES, C, byId } from './games.js';
import { parseResult, fmtTime } from './parse.js';

const KEY = 'rotation:v1';
const INK = '#1F1A3D';
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- saved state (this phone only) ---------- */

const fresh = () => ({ v: 1, rotation: [], log: {}, full: {}, theme: 'auto', onboarded: false, pending: null });
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && s.v === 1) return { ...fresh(), ...s };
  } catch { /* storage blocked or empty */ }
  return fresh();
}
let state = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode: keep going in memory */ }
}

let tab = state.onboarded ? 'today' : 'games';
let filter = 'all';
const bored = { mode: 'mine', len: 'any', pick: null };

/* ---------- days ---------- */

const pad = (n) => String(n).padStart(2, '0');
const localKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const utcKey = (d = new Date()) => d.toISOString().slice(0, 10);
const dayKey = (g, d = new Date()) => (g.reset === 'utc' ? utcKey(d) : localKey(d));
function addDays(k, n) {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
const weekday = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); };
const mondayOf = (k) => addDays(k, -((weekday(k) + 6) % 7));
function nextReset(g, now = new Date()) {
  const t = new Date(now);
  if (g.reset === 'utc') t.setUTCHours(24, 0, 0, 0); else t.setHours(24, 0, 0, 0);
  return t;
}
function untilText(ms) {
  const m = Math.max(1, Math.round(ms / 60000));
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}

/* ---------- game data ---------- */

const rotationGames = () => state.rotation.map((id) => byId[id]).filter(Boolean);
const entry = (g, d) => state.log[dayKey(g, d)]?.[g.id];

function checkFull() {
  const rot = rotationGames();
  const k = localKey();
  if (rot.length && rot.every((g) => entry(g))) state.full[k] = true;
  else delete state.full[k];
}

function logResult(id, r) {
  const g = byId[id];
  const k = dayKey(g);
  (state.log[k] ||= {})[id] = { label: r.label || 'Done', value: r.value ?? null, won: r.won !== false, at: Date.now() };
  if (state.pending?.id === id) state.pending = null;
  checkFull();
  save();
  render();
}

function unlog(id) {
  const g = byId[id];
  const k = dayKey(g);
  if (state.log[k]) delete state.log[k][id];
  checkFull();
  save();
  render();
}

function masterStreak() {
  let k = localKey();
  if (!state.full[k]) k = addDays(k, -1);
  let n = 0;
  let freezes = 0;
  const used = new Set();
  for (let i = 0; i < 3650; i++) {
    if (state.full[k]) { n++; k = addDays(k, -1); continue; }
    const wk = mondayOf(k);
    if (!used.has(wk) && state.full[addDays(k, -1)]) { used.add(wk); freezes++; k = addDays(k, -1); continue; }
    break;
  }
  const thisWeek = used.has(mondayOf(localKey())) || used.has(mondayOf(addDays(localKey(), -1)));
  return { n, freezes, thisWeek };
}

function bestMaster() {
  const days = Object.keys(state.full).sort();
  let best = 0, run = 0, prev = null, frozen = new Set();
  for (const k of days) {
    const gap = prev && addDays(prev, 1);
    if (prev && gap === k) run++;
    else if (prev && addDays(prev, 2) === k && !frozen.has(mondayOf(gap))) { run++; frozen.add(mondayOf(gap)); }
    else { run = 1; frozen = new Set(); }
    best = Math.max(best, run);
    prev = k;
  }
  return Math.max(best, masterStreak().n);
}

function gameStats(g) {
  const days = Object.entries(state.log).filter(([, v]) => v[g.id]).map(([k, v]) => [k, v[g.id]]).sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const keys = new Set(days.map((d) => d[0]));
  let cur = 0;
  let k = dayKey(g);
  if (!keys.has(k)) k = addDays(k, -1);
  while (keys.has(k)) { cur++; k = addDays(k, -1); }
  let best = 0, run = 0, prev = null;
  for (const [day] of days) { run = prev && addDays(prev, 1) === day ? run + 1 : 1; best = Math.max(best, run); prev = day; }
  const vals = days.map((d) => d[1]).filter((e) => typeof e.value === 'number' && e.won).map((e) => e.value);
  const avg = vals.length ? vals.reduce((a, n) => a + n, 0) / vals.length : null;
  const top = vals.length ? (g.better === 'high' ? Math.max(...vals) : Math.min(...vals)) : null;
  const wins = days.filter((d) => d[1].won).length;
  return { played: days.length, cur, best, avg, top, winPct: days.length ? Math.round((100 * wins) / days.length) : 0 };
}

function scoreLine(g, s) {
  if (s.avg === null) return s.played ? 'Logged as done' : 'Not played yet';
  const a = (n) => (Math.round(n * 10) / 10).toString();
  switch (g.unit) {
    case 'guesses': return `Average ${a(s.avg)} guesses`;
    case 'mistakes': return `Average ${a(s.avg)} mistakes`;
    case 'hints': return `Average ${a(s.avg)} hints`;
    case 'time': return `Average ${fmtTime(Math.round(s.avg))}, best ${fmtTime(s.top)}`;
    case 'depth': return `Deepest dive ${s.top.toLocaleString()} m`;
    case 'correct': return `Best grid ${s.top}/9`;
    case 'stars': return `Average ${a(s.avg)} stars`;
    case 'score': return `Best ${s.top.toLocaleString()} points`;
    case 'overpar': return `Average ${s.avg > 0 ? '+' : ''}${a(s.avg)} over par`;
    default: return 'Logged as done';
  }
}

/* ---------- little drawings ---------- */

const PLUS = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const FLAME = `<svg viewBox="0 0 80 96" aria-hidden="true"><path d="M40 5 C47 22 67 31 67 57 C67 77 55 91 40 91 C25 91 13 77 13 59 C13 45 21 37 27 30 C27 40 31 46 37 48 C33 32 35 18 40 5 Z" fill="${C.tang}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M40 47 C44 57 55 61 55 73 C55 83 48 87 40 87 C32 87 25 83 25 73 C25 65 31 61 34 56 C36 62 38 64 40 64 Z" fill="${C.sun}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/></svg>`;

/* ---------- views ---------- */

function card(g) {
  const e = entry(g);
  const until = untilText(nextReset(g) - Date.now());
  return `<article class="card${e ? ' done' : ''}" style="--c:${g.color}">
    <button class="card-play" data-play="${g.id}" aria-label="Play ${esc(g.name)}">
      <span class="art">${g.icon}</span>
      <span class="name">${esc(g.name)}</span>
    </button>
    ${e ? `<span class="stamp" aria-label="Today: ${esc(e.label)}">${esc(e.label)}</span>` : ''}
    <div class="card-foot">
      <span class="reset">${e ? `New in ${until}` : `${until} left`}</span>
      <button class="card-log" data-log="${g.id}" aria-label="${e ? 'Change' : 'Log'} your ${esc(g.name)} result">${e ? CHECK : PLUS}</button>
    </div>
  </article>`;
}

function viewToday() {
  const rot = rotationGames();
  if (!rot.length) {
    return `<section class="empty">
      <p class="empty-big">Your board is empty.</p>
      <p>Pick the games you play and they’ll live here.</p>
      <button class="btn sun" data-tab="games">Pick games</button>
    </section>`;
  }
  const done = rot.filter((g) => entry(g));
  const todo = rot.filter((g) => !entry(g));
  const now = new Date();
  const s = masterStreak();
  const all = done.length === rot.length;
  return `
    <section class="hero">
      <div>
        <h1 class="day">${now.toLocaleDateString(undefined, { weekday: 'long' })}</h1>
        <p class="date">${now.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</p>
      </div>
      <div class="streak" role="img" aria-label="${s.n} day streak">${FLAME}<span class="streak-n">${s.n}</span><span class="streak-l">day streak</span></div>
    </section>
    <div class="progress">
      <div class="dots" aria-hidden="true">${rot.map((g) => `<span class="dot${entry(g) ? ' on' : ''}" style="--c:${g.color}"></span>`).join('')}</div>
      <p>${all ? 'All done. Same time tomorrow?' : `${done.length} of ${rot.length} done today`}</p>
    </div>
    <div class="actions">
      <button class="btn sun" data-act="paste">Paste a result</button>
      <button class="btn gum" data-act="bored">I’m bored</button>
    </div>
    <div class="grid">${[...todo, ...done].map(card).join('')}</div>
    ${s.thisWeek ? '<p class="note">Your freeze day kept the streak alive this week.</p>' : ''}`;
}

function viewStats() {
  const s = masterStreak();
  const today = localKey();
  const start = mondayOf(addDays(today, -7 * 11));
  const cells = [];
  for (let i = 0; i < 84; i++) {
    const k = addDays(start, i);
    const some = state.log[k] && Object.keys(state.log[k]).length;
    const cls = k > today ? 'future' : state.full[k] ? 'full' : some ? 'some' : '';
    cells.push(`<span class="cell ${cls}${k === today ? ' today' : ''}" title="${k}"></span>`);
  }
  const played = new Set(Object.values(state.log).flatMap((v) => Object.keys(v)));
  const list = [...new Set([...state.rotation, ...played])].map((id) => byId[id]).filter(Boolean);
  const rows = list.map((g) => {
    const st = gameStats(g);
    return `<div class="statrow" style="--c:${g.color}">
      <span class="chip-art">${g.icon}</span>
      <div class="sr-main">
        <p class="sr-name">${esc(g.name)}</p>
        <p class="sr-sub">${scoreLine(g, st)}</p>
        <p class="sr-sub">${st.played} played${st.played && st.winPct < 100 ? `, ${st.winPct}% solved` : ''}, best run ${st.best}</p>
      </div>
      <div class="sr-streak"><span class="sr-n">${st.cur}</span><span>in a row</span></div>
    </div>`;
  }).join('');
  return `
    <h1 class="page-title">Your stats</h1>
    <section class="big-streak">
      <div class="streak lg" role="img" aria-label="${s.n} day streak">${FLAME}<span class="streak-n">${s.n}</span></div>
      <div>
        <p class="bs-line">${s.n === 1 ? '1 day' : `${s.n} days`} in a row with every game done.</p>
        <p class="muted">Longest ever: ${bestMaster()} days. Miss one day and a freeze covers it, once a week.</p>
      </div>
    </section>
    <section class="heat-wrap">
      <p class="sec-title">Last 12 weeks</p>
      <div class="heat" aria-label="Calendar of days played">${cells.join('')}</div>
      <p class="legend"><span class="cell full"></span> every game <span class="cell some"></span> some games</p>
    </section>
    <section>
      <p class="sec-title">Game by game</p>
      ${rows || '<p class="muted">Play a game and its stats show up here.</p>'}
    </section>`;
}

function tile(g) {
  const on = state.rotation.includes(g.id);
  return `<article class="tile${on ? ' on' : ''}" style="--c:${g.color}">
    <button class="tile-main" data-toggle="${g.id}" aria-pressed="${on}">
      <span class="tile-check" aria-hidden="true">${on ? CHECK : PLUS}</span>
      <span class="art">${g.icon}</span>
      <span class="t-name">${esc(g.name)}</span>
      <span class="t-blurb">${esc(g.blurb)}</span>
    </button>
    <div class="t-foot">
      <span class="pill">${g.mins} min</span>
      <a class="try" href="${g.url}" target="_blank" rel="noopener">Try it</a>
    </div>
  </article>`;
}

function viewGames() {
  const onb = !state.onboarded;
  const n = state.rotation.length;
  const list = GAMES.filter((g) => filter === 'all' || g.type === filter);
  const chips = [['all', 'All'], ...Object.entries(TYPES)]
    .map(([k, label]) => `<button class="chip" data-filter="${k}" aria-pressed="${filter === k}">${label}</button>`).join('');
  return `
    ${onb
      ? `<section class="intro"><h1 class="page-title">Pick your games</h1><p>Tap the ones you play every day. You can change this any time.</p></section>`
      : `<h1 class="page-title">All games</h1><p class="muted under-title">${n} in your rotation. Tap a game to add or remove it.</p>`}
    <div class="chips scroll" role="group" aria-label="Filter games">${chips}</div>
    <div class="tiles">${list.map(tile).join('')}</div>
    ${onb ? `<div class="sticky"><button class="btn sun wide" data-act="start" ${n ? '' : 'disabled'}>${n ? `Start with ${n} game${n > 1 ? 's' : ''}` : 'Pick at least one game'}</button></div>` : ''}`;
}

/* ---------- sheets ---------- */

let sheetName = null;
function openSheet(name, html) {
  let back = $('.backdrop');
  if (!back) {
    back = document.createElement('div');
    back.className = 'backdrop';
    back.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"></div>';
    back.addEventListener('click', (e) => { if (e.target === back) closeSheet(); });
    document.body.appendChild(back);
    document.body.classList.add('locked');
  }
  sheetName = name;
  const sheet = $('.sheet', back);
  sheet.innerHTML = `<button class="sheet-x" data-act="close" aria-label="Close">${PLUS}</button>${html}`;
  sheet.setAttribute('aria-label', name);
  sheet.querySelector('button:not(.sheet-x), textarea')?.focus({ preventScroll: true });
}
function closeSheet() {
  $('.backdrop')?.remove();
  document.body.classList.remove('locked');
  sheetName = null;
}

function openLog(id = null, { welcome = false, text = '' } = {}) {
  const g = id && byId[id];
  const e = g && entry(g);
  const head = g
    ? `<div class="sheet-head" style="--c:${g.color}"><span class="chip-art">${g.icon}</span><div>
        <h2>${welcome ? `Back from ${esc(g.name)}?` : esc(g.name)}</h2>
        <p class="muted">${e ? `Today: ${esc(e.label)}` : welcome ? 'Paste your result or mark it done.' : 'In the game, tap Share, then paste it here.'}</p></div></div>`
    : `<h2>Paste a result</h2><p class="muted">In any game, tap Share, then paste it here. Rotation works out which game it is.</p>`;
  openSheet('log', `${head}
    <textarea id="pasteBox" rows="5" placeholder="Paste the share text here">${esc(text)}</textarea>
    <p class="err" id="pasteErr" hidden></p>
    <div class="row">
      <button class="btn" data-act="clip">Paste from clipboard</button>
      <button class="btn sun" data-act="logpaste" data-id="${id || ''}">Log it</button>
    </div>
    ${g ? `<div class="row">
      <button class="btn ghost" data-act="markdone" data-id="${id}">Just mark it done</button>
      ${e ? `<button class="btn ghost" data-act="undo" data-id="${id}">Undo today</button>` : welcome ? `<button class="btn ghost" data-act="close">Not yet</button>` : ''}
    </div>` : ''}`);
}

function showErr(msg) { const p = $('#pasteErr'); if (p) { p.textContent = msg; p.hidden = false; } }

function commit(r) {
  const g = byId[r.game];
  const wasFull = !!state.full[localKey()];
  logResult(g.id, r);
  const inRot = state.rotation.includes(g.id);
  toast(`${g.name}: ${r.label}`, inRot ? null : { label: 'Add to my games', run: () => { state.rotation.push(g.id); checkFull(); save(); render(); } });
  if (!wasFull && state.full[localKey()]) confetti();
}

async function readClip() {
  try { return await navigator.clipboard.readText(); } catch { return null; }
}

async function quickPaste() {
  const text = await readClip();
  const r = text && parseResult(text);
  if (r) commit(r); else openLog(null, { text: text || '' });
}

function lenOk(g) {
  if (bored.len === 'quick') return g.mins <= 2;
  if (bored.len === 'mid') return g.mins >= 3 && g.mins <= 5;
  if (bored.len === 'long') return g.mins >= 6;
  return true;
}
function candidates() {
  return bored.mode === 'mine'
    ? rotationGames().filter((g) => !entry(g) && lenOk(g))
    : GAMES.filter((g) => !state.rotation.includes(g.id) && lenOk(g));
}
function pickBored() {
  const all = candidates();
  const others = all.filter((g) => g.id !== bored.pick?.id);
  const pool = others.length ? others : all;
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}
function openBored(first = false) {
  if (first) {
    bored.mode = rotationGames().some((g) => !entry(g)) ? 'mine' : 'new';
    bored.pick = pickBored();
  }
  const g = bored.pick;
  const chip = (k, v, label) => `<button class="chip" data-chip="${k}:${v}" aria-pressed="${bored[k] === v}">${label}</button>`;
  openSheet('bored', `
    <h2>I’m bored</h2>
    <div class="chips" role="group" aria-label="Where from">${chip('mode', 'mine', 'My games')}${chip('mode', 'new', 'Something new')}</div>
    <div class="chips" role="group" aria-label="How long">${chip('len', 'any', 'Any length')}${chip('len', 'quick', 'Quick')}${chip('len', 'mid', '3 to 5 min')}${chip('len', 'long', 'Longer')}</div>
    ${g ? `<div class="pick" style="--c:${g.color}">
        <span class="art wobble">${g.icon}</span>
        <p class="pick-name">${esc(g.name)}</p>
        <p class="pick-blurb">${esc(g.blurb)}</p>
        <p class="pick-meta">About ${g.mins} min, ${TYPES[g.type].toLowerCase()}</p>
      </div>
      <div class="row">
        <button class="btn ink" data-play="${g.id}">Play ${esc(g.name)}</button>
        <button class="btn" data-act="spin">Spin again</button>
      </div>
      ${bored.mode === 'new' ? `<button class="btn ghost wide" data-toggle="${g.id}" data-from="bored">${state.rotation.includes(g.id) ? 'Added to my games' : 'Add to my games'}</button>` : ''}`
    : `<p class="pick-empty">${bored.mode === 'mine' ? 'You’ve done every game that fits. Try something new.' : 'Nothing new fits that length. Try another.'}</p>`}`);
}

function openSettings(wipeArmed = false) {
  const th = (v, label) => `<button class="chip" data-theme-set="${v}" aria-pressed="${state.theme === v}">${label}</button>`;
  openSheet('settings', `
    <h2>Settings</h2>
    <p class="sec-title">Look</p>
    <div class="chips">${th('auto', 'Match my phone')}${th('bright', 'Bright')}${th('night', 'Night')}</div>
    <p class="sec-title">Reminder</p>
    <p class="muted">Add a daily 9 pm reminder to your calendar so the streak doesn’t slip.</p>
    <button class="btn" data-act="ics">Add calendar reminder</button>
    <p class="sec-title">Backup</p>
    <p class="muted">Your games and scores live on this phone only. Save a backup file now and then.</p>
    <div class="row"><button class="btn" data-act="export">Save backup</button><button class="btn" data-act="import">Load backup</button></div>
    <input type="file" id="importFile" accept="application/json,.json" hidden>
    <button class="btn ghost danger wide" data-act="wipe" data-armed="${wipeArmed}">${wipeArmed ? 'Tap again to clear everything' : 'Clear everything'}</button>
    <p class="fine">Rotation only links to games. Every game belongs to the people who make it.</p>`);
}

/* ---------- small helpers ---------- */

let toastTimer;
function toast(msg, action) {
  const t = $('#toast');
  t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button class="btn sm">${esc(action.label)}</button>` : ''}`;
  t.hidden = false;
  if (action) t.querySelector('button').onclick = () => { action.run(); t.hidden = true; };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, action ? 6000 : 3200);
}

function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = Object.values(C);
  const box = document.createElement('div');
  box.className = 'confetti';
  for (let i = 0; i < 40; i++) {
    const b = document.createElement('i');
    b.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};--d:${(0.9 + Math.random() * 0.8).toFixed(2)}s;--r:${Math.round(Math.random() * 720 - 360)}deg;--x:${Math.round(Math.random() * 80 - 40)}px;${i % 3 ? '' : 'border-radius:4px;'}`;
    box.appendChild(b);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 2000);
}

function download(name, type, body) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([body], { type }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

function icsReminder() {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const day = localKey(now).replace(/-/g, '');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Rotation//Daily games//EN', 'BEGIN:VEVENT',
    `UID:rotation-${day}@rotation`, `DTSTAMP:${stamp}`, `DTSTART:${day}T210000`, 'DURATION:PT10M', 'RRULE:FREQ=DAILY',
    'SUMMARY:Play your rotation', 'DESCRIPTION:Your daily games are waiting.',
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Play your rotation', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  download('rotation-reminder.ics', 'text/calendar', ics);
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  const night = state.theme === 'night' || (state.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('meta[name="theme-color"]').setAttribute('content', night ? '#1B1838' : '#BDE6FF');
}

function play(id) {
  const g = byId[id];
  state.pending = { id, at: Date.now() };
  save();
  closeSheet();
  window.open(g.url, '_blank', 'noopener');
}

function maybeWelcomeBack() {
  const p = state.pending;
  if (!p || sheetName) return;
  const g = byId[p.id];
  if (!g || entry(g) || Date.now() - p.at > 4 * 3600e3) { state.pending = null; save(); return; }
  if (Date.now() - p.at < 4000) return; // came straight back, probably a mis-tap
  state.pending = null;
  save();
  openLog(g.id, { welcome: true });
}

/* ---------- render + events ---------- */

function render() {
  applyTheme();
  $('#view').innerHTML = tab === 'today' ? viewToday() : tab === 'stats' ? viewStats() : viewGames();
  $('#tabs').hidden = !state.onboarded;
  document.body.classList.toggle('onboarding', !state.onboarded);
  document.querySelectorAll('#tabs [data-tab]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.tab === tab)));
}

function toggle(id) {
  const i = state.rotation.indexOf(id);
  if (i >= 0) state.rotation.splice(i, 1); else state.rotation.push(id);
  checkFull();
  save();
  render();
}

document.addEventListener('click', async (ev) => {
  const el = ev.target.closest('[data-tab],[data-play],[data-log],[data-act],[data-toggle],[data-chip],[data-filter],[data-theme-set]');
  if (!el || el.disabled) return;
  const d = el.dataset;
  if (d.tab) { tab = d.tab; closeSheet(); render(); window.scrollTo(0, 0); return; }
  if (d.play) { play(d.play); return; }
  if (d.log) { openLog(d.log); return; }
  if (d.toggle) { toggle(d.toggle); if (d.from === 'bored') openBored(); return; }
  if (d.chip) { const [k, v] = d.chip.split(':'); bored[k] = v; bored.pick = pickBored(); openBored(); return; }
  if (d.filter) { filter = d.filter; render(); return; }
  if (d.themeSet) { state.theme = d.themeSet; save(); applyTheme(); openSettings(); return; }
  switch (d.act) {
    case 'close': closeSheet(); break;
    case 'paste': quickPaste(); break;
    case 'bored': openBored(true); break;
    case 'spin': bored.pick = pickBored(); openBored(); break;
    case 'settings': openSettings(); break;
    case 'start': state.onboarded = true; tab = 'today'; save(); render(); window.scrollTo(0, 0); break;
    case 'clip': {
      const t = await readClip();
      if (t === null) showErr('Your browser blocked the clipboard. Press and hold in the box, then tap Paste.');
      else $('#pasteBox').value = t;
      break;
    }
    case 'logpaste': {
      const text = $('#pasteBox').value;
      if (!text.trim()) { showErr('Paste the share text first.'); break; }
      const r = parseResult(text);
      if (!r) { showErr(d.id ? 'Couldn’t find a score in that. Tap “Just mark it done” instead.' : 'Couldn’t tell which game that’s from. Open the game’s card and mark it done there.'); break; }
      closeSheet();
      commit(r);
      break;
    }
    case 'markdone': {
      const wasFull = !!state.full[localKey()];
      closeSheet();
      logResult(d.id, { label: 'Done', value: null, won: true });
      toast(`${byId[d.id].name}: done`);
      if (!wasFull && state.full[localKey()]) confetti();
      break;
    }
    case 'undo': closeSheet(); unlog(d.id); toast(`${byId[d.id].name} is back on the board`); break;
    case 'ics': icsReminder(); break;
    case 'export': download(`rotation-backup-${localKey()}.json`, 'application/json', JSON.stringify(state)); break;
    case 'import': $('#importFile').click(); break;
    case 'wipe':
      if (d.armed === 'true') { state = fresh(); save(); tab = 'games'; closeSheet(); render(); toast('Everything cleared'); }
      else openSettings(true);
      break;
    default: break;
  }
});

document.addEventListener('change', async (ev) => {
  if (ev.target.id !== 'importFile' || !ev.target.files[0]) return;
  try {
    const data = JSON.parse(await ev.target.files[0].text());
    if (data?.v !== 1 || !Array.isArray(data.rotation)) throw new Error('bad file');
    state = { ...fresh(), ...data };
    save();
    tab = state.onboarded ? 'today' : 'games';
    closeSheet();
    render();
    toast('Backup loaded');
  } catch {
    toast('That file isn’t a Rotation backup');
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sheetName) closeSheet(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  if (!sheetName) render();
  maybeWelcomeBack();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
setInterval(() => { if (tab === 'today' && !sheetName && document.visibilityState === 'visible') render(); }, 60000);

render();
maybeWelcomeBack();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

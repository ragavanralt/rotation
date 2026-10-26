// Every game Rotation knows about. Rotation only links out: each game belongs to its makers.
// reset: 'local' = new puzzle at your midnight, 'utc' = new puzzle at midnight UTC.
// unit + better tell the stats page how to read a score.

const INK = '#1F1A3D';
const W = '#FFFDF6';
export const C = {
  tomato: '#FF5A4E', tang: '#FF9A2E', sun: '#FFD23F', lime: '#A6E35A', mint: '#3DDC97',
  sky: '#4CC3FF', grape: '#A178FF', gum: '#FF6FB5', teal: '#22C5C5', blue: '#5C84FF', coral: '#FF8A70',
};

const svg = (inner) =>
  `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
const T = (x, y, s, ch) =>
  `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" fill="${INK}" stroke="none">${ch}</text>`;

export const TYPES = {
  words: 'Words', geo: 'Geography', trivia: 'Trivia', sports: 'Sports',
  music: 'Music', movies: 'Movies', math: 'Math', logic: 'Logic',
};

export const GAMES = [
  {
    id: 'wordle', name: 'Wordle', type: 'words', mins: 3, color: C.tang, unit: 'guesses', better: 'low',
    url: 'https://www.nytimes.com/games/wordle/index.html',
    blurb: 'Five letters, six tries. The one that started it all.',
    icon: svg(`<g transform="rotate(-7 50 50)"><rect x="9" y="35" width="26" height="30" rx="7" fill="${W}"/><rect x="37" y="35" width="26" height="30" rx="7" fill="${C.gum}"/><rect x="65" y="35" width="26" height="30" rx="7" fill="${W}"/>${T(22, 57, 20, 'F')}${T(50, 57, 20, 'U')}${T(78, 57, 20, 'N')}</g>`),
  },
  {
    id: 'connections', name: 'Connections', type: 'words', mins: 5, color: C.grape, unit: 'mistakes', better: 'low',
    url: 'https://www.nytimes.com/games/connections',
    blurb: 'Sixteen words, four secret groups.',
    icon: svg(`<path d="M28 28 H72 V72 H28 Z" stroke-dasharray="0.1 9" stroke-width="5"/><circle cx="28" cy="28" r="15" fill="${C.sun}"/><circle cx="72" cy="28" r="15" fill="${W}"/><circle cx="28" cy="72" r="15" fill="${W}"/><circle cx="72" cy="72" r="15" fill="${C.gum}"/>`),
  },
  {
    id: 'strands', name: 'Strands', type: 'words', mins: 5, color: C.mint, unit: 'hints', better: 'low',
    url: 'https://www.nytimes.com/games/strands',
    blurb: 'Themed words hiding in a grid of letters.',
    icon: svg(`<path d="M16 72 C28 30 44 30 50 50 S70 72 84 28" stroke-width="12"/><path d="M16 72 C28 30 44 30 50 50 S70 72 84 28" stroke="${C.gum}" stroke-width="5"/><circle cx="16" cy="72" r="8" fill="${W}"/><circle cx="50" cy="50" r="8" fill="${W}"/><circle cx="84" cy="28" r="8" fill="${W}"/>`),
  },
  {
    id: 'mini', name: 'The Mini', type: 'words', mins: 2, color: C.sky, unit: 'time', better: 'low',
    url: 'https://www.nytimes.com/crosswords/game/mini',
    blurb: 'A tiny crossword you can finish before your bus comes.',
    icon: svg(`<rect x="18" y="18" width="64" height="64" rx="10" fill="${W}"/><rect x="60" y="39" width="22" height="21" fill="${INK}" stroke="none"/><rect x="39" y="60" width="21" height="22" fill="${INK}" stroke="none"/><path d="M39 18 V82 M60 18 V82 M18 39 H82 M18 60 H82" stroke-width="3"/><rect x="18" y="18" width="64" height="64" rx="10"/>`),
  },
  {
    id: 'spellingbee', name: 'Spelling Bee', type: 'words', mins: 10, color: C.gum, unit: null, better: 'low',
    url: 'https://www.nytimes.com/puzzles/spelling-bee',
    blurb: 'Seven letters. See how many words you can squeeze out.',
    icon: svg(`<ellipse cx="38" cy="30" rx="10" ry="15" fill="${W}" transform="rotate(-25 38 30)"/><ellipse cx="60" cy="28" rx="10" ry="15" fill="${W}" transform="rotate(20 60 28)"/><ellipse cx="50" cy="58" rx="28" ry="20" fill="${C.sun}"/><path d="M42 41 Q37 58 42 75 M56 40 Q51 58 56 76" stroke-width="7"/><circle cx="70" cy="53" r="3.5" fill="${INK}"/><path d="M22 56 L12 59 L22 63" fill="${INK}"/>`),
  },
  {
    id: 'pips', name: 'Pips', type: 'logic', mins: 5, color: C.sun, unit: 'time', better: 'low',
    url: 'https://www.nytimes.com/games/pips',
    blurb: 'Place the dominoes so every rule on the board checks out.',
    icon: svg(`<g transform="rotate(-12 37 50)"><rect x="22" y="22" width="30" height="56" rx="8" fill="${W}"/><path d="M22 50 H52"/><circle cx="37" cy="36" r="4.5" fill="${INK}" stroke="none"/><circle cx="31" cy="60" r="4" fill="${INK}" stroke="none"/><circle cx="43" cy="68" r="4" fill="${INK}" stroke="none"/></g><g transform="rotate(14 67 56)"><rect x="52" y="28" width="30" height="56" rx="8" fill="${C.gum}"/><path d="M52 56 H82"/><circle cx="67" cy="42" r="4.5" fill="${INK}" stroke="none"/><circle cx="61" cy="66" r="4" fill="${INK}" stroke="none"/><circle cx="73" cy="74" r="4" fill="${INK}" stroke="none"/></g>`),
  },
  {
    id: 'connections-sports', name: 'Connections: Sports', type: 'sports', mins: 5, color: C.lime, unit: 'mistakes', better: 'low',
    url: 'https://www.nytimes.com/athletic/connections-sports-edition',
    blurb: 'Connections, except every group is about sports.',
    icon: svg(`<path d="M30 20 L42 14 Q50 22 58 14 L70 20 L86 36 L75 47 L68 41 V84 H32 V41 L25 47 L14 36 Z" fill="${W}"/><circle cx="43" cy="53" r="6" fill="${C.sun}"/><circle cx="57" cy="53" r="6" fill="${C.gum}"/><circle cx="43" cy="68" r="6" fill="${C.sky}"/><circle cx="57" cy="68" r="6" fill="${C.tang}"/>`),
  },
  {
    id: 'globle', name: 'Globle', type: 'geo', mins: 3, color: C.coral, unit: 'guesses', better: 'low',
    url: 'https://globle-game.com/',
    blurb: 'Find the mystery country. The map gets hotter as you get closer.',
    icon: svg(`<circle cx="50" cy="50" r="33" fill="${C.sky}"/><path d="M28 30 Q40 24 47 34 Q45 46 34 46 Q24 41 28 30 Z" fill="${C.sun}"/><path d="M55 55 Q68 49 75 60 Q71 73 58 73 Q51 64 55 55 Z" fill="${C.tomato}"/><path d="M17 50 H83 M50 17 Q33 50 50 83 M50 17 Q67 50 50 83" stroke-width="2.5"/><circle cx="50" cy="50" r="33"/>`),
  },
  {
    id: 'worldle', name: 'Worldle', type: 'geo', mins: 3, color: C.sky, unit: 'guesses', better: 'low',
    url: 'https://worldle.teuteuf.fr/',
    blurb: 'Name the country from its outline alone.',
    icon: svg(`<path d="M22 44 Q28 26 46 32 Q58 22 70 34 Q84 42 76 56 Q80 72 62 76 Q50 86 38 74 Q20 72 24 58 Q14 50 22 44 Z" fill="${W}"/><path d="M60 12 C50 12 46 22 50 30 L60 46 L70 30 C74 22 70 12 60 12 Z" fill="${C.tomato}"/><circle cx="60" cy="24" r="4" fill="${W}"/>`),
  },
  {
    id: 'flagle', name: 'Flagle', type: 'geo', mins: 2, color: C.mint, unit: 'guesses', better: 'low',
    url: 'https://www.flagle.io/',
    blurb: 'Guess the flag as it shows up one piece at a time.',
    icon: svg(`<path d="M28 12 V90" stroke-width="5"/><path d="M30 18 Q44 10 58 18 T86 18 V52 Q72 44 58 52 T30 52 Z" fill="${W}"/><path d="M30 30 Q44 22 58 30 T86 30 V40 Q72 32 58 40 T30 40 Z" fill="${C.tomato}" stroke="none"/><path d="M30 18 Q44 10 58 18 T86 18 V52 Q72 44 58 52 T30 52 Z"/><circle cx="28" cy="11" r="5" fill="${C.sun}"/>`),
  },
  {
    id: 'travle', name: 'Travle', type: 'geo', mins: 5, color: C.tang, unit: 'overpar', better: 'low',
    url: 'https://travle.earth/',
    blurb: 'Get from one country to another by land in as few stops as you can.',
    icon: svg(`<path d="M20 74 C30 40 60 70 76 36" stroke-dasharray="0.1 10" stroke-width="6"/><circle cx="20" cy="74" r="9" fill="${W}"/><path d="M78 12 C70 12 66 20 69 26 L78 42 L87 26 C90 20 86 12 78 12 Z" fill="${C.gum}"/><circle cx="78" cy="23" r="3.5" fill="${W}"/>`),
  },
  {
    id: 'tradle', name: 'Tradle', type: 'geo', mins: 3, color: C.teal, unit: 'guesses', better: 'low',
    url: 'https://oec.world/en/games/tradle',
    blurb: 'Guess the country from what it ships to the world.',
    icon: svg(`<path d="M18 38 L50 24 L82 38 L50 52 Z" fill="${W}"/><path d="M18 38 V70 L50 84 V52 Z" fill="${C.tang}"/><path d="M82 38 V70 L50 84 V52 Z" fill="${C.sun}"/><path d="M34 31 L66 45 V58"/>`),
  },
  {
    id: 'krillion', name: 'Krillion', type: 'trivia', mins: 4, color: C.blue, unit: 'depth', better: 'high', reset: 'utc',
    url: 'https://krillion.io/',
    blurb: 'Trivia where the weird answers score the most.',
    icon: svg(`<circle cx="30" cy="24" r="5" fill="${W}"/><circle cx="20" cy="13" r="3" fill="${W}"/><path d="M72 40 Q84 26 90 30 M70 38 Q78 22 82 16"/><path d="M40 68 L36 79 M50 70 L48 81 M60 68 L60 79"/><path d="M26 58 L13 49 L15 67 Z" fill="${C.coral}"/><path d="M26 58 C26 38 50 30 66 38 C76 43 78 56 70 62 C58 70 40 70 26 58 Z" fill="${C.coral}"/><path d="M44 38 Q40 50 46 64 M56 37 Q52 50 58 66"/><circle cx="66" cy="46" r="3.5" fill="${INK}" stroke="none"/>`),
  },
  {
    id: 'quordle', name: 'Quordle', type: 'words', mins: 6, color: C.gum, unit: 'guesses', better: 'low',
    url: 'https://www.merriam-webster.com/games/quordle/',
    blurb: 'Four word puzzles at once, nine tries for all of them.',
    icon: svg(`<rect x="14" y="14" width="34" height="34" rx="9" fill="${W}"/><rect x="52" y="14" width="34" height="34" rx="9" fill="${C.sun}"/><rect x="14" y="52" width="34" height="34" rx="9" fill="${C.sun}"/><rect x="52" y="52" width="34" height="34" rx="9" fill="${W}"/>${T(31, 39, 22, 'F')}${T(69, 39, 22, 'O')}${T(31, 77, 22, 'U')}${T(69, 77, 22, 'R')}`),
  },
  {
    id: 'octordle', name: 'Octordle', type: 'words', mins: 10, color: C.grape, unit: 'guesses', better: 'low',
    url: 'https://www.britannica.com/games/octordle/',
    blurb: 'Eight word puzzles at once. Bring snacks.',
    icon: svg(`<rect x="8" y="28" width="18" height="18" rx="5" fill="${W}"/><rect x="30" y="28" width="18" height="18" rx="5" fill="${C.sun}"/><rect x="52" y="28" width="18" height="18" rx="5" fill="${W}"/><rect x="74" y="28" width="18" height="18" rx="5" fill="${C.sun}"/><rect x="8" y="52" width="18" height="18" rx="5" fill="${C.sun}"/><rect x="30" y="52" width="18" height="18" rx="5" fill="${W}"/><rect x="52" y="52" width="18" height="18" rx="5" fill="${C.sun}"/><rect x="74" y="52" width="18" height="18" rx="5" fill="${W}"/>`),
  },
  {
    id: 'waffle', name: 'Waffle', type: 'words', mins: 5, color: C.sky, unit: 'stars', better: 'high',
    url: 'https://wafflegame.net/daily',
    blurb: 'Swap letters until every word in the waffle works.',
    icon: svg(`<rect x="16" y="16" width="68" height="68" rx="18" fill="${C.sun}"/><path d="M33 18 V82 M50 16 V84 M67 18 V82 M18 33 H82 M16 50 H84 M18 67 H82" stroke-width="3"/><rect x="39" y="37" width="24" height="18" rx="5" fill="${W}" transform="rotate(-10 51 46)"/>`),
  },
  {
    id: 'squaredle', name: 'Squaredle', type: 'words', mins: 8, color: C.sun, unit: null, better: 'low',
    url: 'https://squaredle.app/',
    blurb: 'Trace words through a square of letters.',
    icon: svg(`<rect x="16" y="16" width="68" height="68" rx="16" fill="${W}"/><path d="M30 30 L50 30 L70 50 L50 70 L30 70" stroke="${C.gum}" stroke-width="8"/><g fill="${INK}" stroke="none"><circle cx="30" cy="30" r="4.5"/><circle cx="50" cy="30" r="4.5"/><circle cx="70" cy="30" r="4.5"/><circle cx="30" cy="50" r="4.5"/><circle cx="50" cy="50" r="4.5"/><circle cx="70" cy="50" r="4.5"/><circle cx="30" cy="70" r="4.5"/><circle cx="50" cy="70" r="4.5"/><circle cx="70" cy="70" r="4.5"/></g>`),
  },
  {
    id: 'contexto', name: 'Contexto', type: 'words', mins: 5, color: C.coral, unit: 'guesses', better: 'low',
    url: 'https://contexto.me/',
    blurb: 'Find the secret word by how close in meaning your guesses are.',
    icon: svg(`<circle cx="46" cy="54" r="32" fill="${W}"/><circle cx="46" cy="54" r="21" fill="${C.tomato}"/><circle cx="46" cy="54" r="10" fill="${W}"/><path d="M46 54 L80 20 M71 18 L82 17 L81 28"/>`),
  },
  {
    id: 'semantle', name: 'Semantle', type: 'words', mins: 10, color: C.lime, unit: 'guesses', better: 'low',
    url: 'https://semantle.com/',
    blurb: 'Like Contexto, but meaner. Hot, cold, warmer.',
    icon: svg(`<path d="M41 68 V24 a9 9 0 0 1 18 0 V68" fill="${W}"/><circle cx="50" cy="74" r="14" fill="${C.tomato}"/><path d="M50 70 V34" stroke="${C.tomato}" stroke-width="7"/><path d="M62 34 h7 M62 46 h7 M62 58 h7" stroke-width="3"/>`),
  },
  {
    id: 'nerdle', name: 'Nerdle', type: 'math', mins: 4, color: C.mint, unit: 'guesses', better: 'low',
    url: 'https://nerdlegame.com/',
    blurb: 'Guess the hidden math equation instead of a word.',
    icon: svg(`<rect x="12" y="26" width="34" height="48" rx="10" fill="${W}"/><path d="M20 50 H38 M29 41 V59" stroke-width="6"/><rect x="54" y="26" width="34" height="48" rx="10" fill="${C.tang}"/><path d="M62 44 H80 M62 56 H80" stroke-width="6"/>`),
  },
  {
    id: 'framed', name: 'Framed', type: 'movies', mins: 3, color: C.tomato, unit: 'guesses', better: 'low',
    url: 'https://framed.wtf/',
    blurb: 'Name the movie from a single frame.',
    icon: svg(`<rect x="12" y="20" width="76" height="60" rx="9" fill="${INK}"/><rect x="22" y="28" width="56" height="44" rx="4" fill="${C.sky}" stroke="none"/><path d="M22 68 L38 50 L50 62 L60 52 L78 70 Z" fill="${C.mint}" stroke-width="3"/><circle cx="62" cy="40" r="6" fill="${C.sun}" stroke-width="3"/><g fill="${W}" stroke="none"><circle cx="17" cy="30" r="2"/><circle cx="17" cy="42" r="2"/><circle cx="17" cy="54" r="2"/><circle cx="17" cy="66" r="2"/><circle cx="83" cy="30" r="2"/><circle cx="83" cy="42" r="2"/><circle cx="83" cy="54" r="2"/><circle cx="83" cy="66" r="2"/></g>`),
  },
  {
    id: 'bandle', name: 'Bandle', type: 'music', mins: 3, color: C.grape, unit: 'guesses', better: 'low',
    url: 'https://bandle.app/',
    blurb: 'Name the song as the band joins in one instrument at a time.',
    icon: svg(`<path d="M40 70 V28 L76 20 V62" stroke-width="5"/><path d="M40 36 L76 28" stroke-width="5"/><ellipse cx="31" cy="71" rx="11" ry="9" fill="${C.sun}" transform="rotate(-15 31 71)"/><ellipse cx="67" cy="63" rx="11" ry="9" fill="${C.sun}" transform="rotate(-15 67 63)"/>`),
  },
  {
    id: 'spotle', name: 'Spotle', type: 'music', mins: 3, color: C.mint, unit: 'guesses', better: 'low',
    url: 'https://spotle.io/',
    blurb: 'Guess the music artist from clues about them.',
    icon: svg(`<path d="M26 44 Q26 70 50 70 Q74 70 74 44 M50 70 V84 M38 86 H62"/><rect x="36" y="12" width="28" height="46" rx="14" fill="${W}"/><path d="M36 30 H64 M36 40 H64" stroke-width="2.5"/>`),
  },
  {
    id: 'immaculate', name: 'Immaculate Grid', type: 'sports', mins: 5, color: C.sky, unit: 'correct', better: 'high',
    url: 'https://www.immaculategrid.com/',
    blurb: 'Baseball tic-tac-toe. Name a player for every square.',
    icon: svg(`<circle cx="50" cy="50" r="33" fill="${W}"/><path d="M30 25 Q42 50 30 75 M70 25 Q58 50 70 75" stroke="${C.tomato}" stroke-width="4" stroke-dasharray="3 6"/><circle cx="50" cy="50" r="33"/>`),
  },
  {
    id: 'poeltl', name: 'Poeltl', type: 'sports', mins: 3, color: C.grape, unit: 'guesses', better: 'low',
    url: 'https://poeltl.nbpa.com/',
    blurb: 'Guess the NBA player in eight tries.',
    icon: svg(`<circle cx="50" cy="50" r="33" fill="${C.tang}"/><path d="M17 50 H83 M50 17 V83 M27 26 Q42 50 27 74 M73 26 Q58 50 73 74" stroke-width="3"/><circle cx="50" cy="50" r="33"/>`),
  },
  {
    id: 'whoareya', name: 'Who Are Ya?', type: 'sports', mins: 3, color: C.lime, unit: 'guesses', better: 'low',
    url: 'https://playfootball.games/who-are-ya/',
    blurb: 'Guess the soccer player from his club, country and age.',
    icon: svg(`<circle cx="44" cy="56" r="30" fill="${W}"/><path d="M44 44 L55 52 L51 65 L37 65 L33 52 Z" fill="${INK}"/><path d="M44 44 V28 M55 52 L70 47 M51 65 L60 78 M37 65 L28 78 M33 52 L18 47" stroke-width="3"/><circle cx="44" cy="56" r="30"/>${T(80, 38, 34, '?')}`),
  },
  {
    id: 'timeguessr', name: 'TimeGuessr', type: 'trivia', mins: 5, color: C.tang, unit: 'score', better: 'high',
    url: 'https://timeguessr.com/',
    blurb: 'Guess where and when each photo was taken.',
    icon: svg(`<path d="M32 22 L24 14 M68 22 L76 14"/><circle cx="50" cy="54" r="30" fill="${W}"/><path d="M50 54 V36 M50 54 L64 62"/><path d="M50 28 v4 M76 54 h-4 M50 80 v-4 M24 54 h4" stroke-width="3"/>`),
  },
  {
    id: 'metazooa', name: 'Metazooa', type: 'trivia', mins: 4, color: C.mint, unit: 'guesses', better: 'low',
    url: 'https://metazooa.com/',
    blurb: 'Find the mystery animal by climbing the tree of life.',
    icon: svg(`<ellipse cx="50" cy="64" rx="19" ry="16" fill="${W}"/><ellipse cx="27" cy="44" rx="8" ry="10" fill="${W}" transform="rotate(-20 27 44)"/><ellipse cx="41" cy="30" rx="8" ry="11" fill="${W}"/><ellipse cx="59" cy="30" rx="8" ry="11" fill="${W}"/><ellipse cx="73" cy="44" rx="8" ry="10" fill="${W}" transform="rotate(20 73 44)"/>`),
  },
  {
    id: 'set', name: 'Daily SET', type: 'logic', mins: 5, color: C.gum, unit: 'time', better: 'low',
    url: 'https://www.setgame.com/set/puzzle',
    blurb: 'Find every set hiding in today’s twelve cards.',
    icon: svg(`<rect x="16" y="24" width="34" height="52" rx="7" fill="${W}" transform="rotate(-14 33 50)"/><rect x="50" y="24" width="34" height="52" rx="7" fill="${W}" transform="rotate(14 67 50)"/><rect x="33" y="22" width="34" height="54" rx="7" fill="${W}"/><path d="M50 32 L58 42 L50 52 L42 42 Z" fill="${C.grape}" stroke-width="3"/><ellipse cx="50" cy="64" rx="9" ry="4.5" fill="${C.tomato}" stroke-width="3"/>`),
  },
  {
    id: 'chess', name: 'Chess puzzle', type: 'logic', mins: 3, color: C.sun, unit: null, better: 'low',
    url: 'https://www.chess.com/daily-chess-puzzle',
    blurb: 'One chess puzzle from Chess.com, every day.',
    icon: svg(`<path d="M30 84 H72 V74 H30 Z" fill="${W}"/><path d="M36 74 C36 62 44 56 44 50 C36 52 28 50 26 44 L44 25 C48 17 57 15 63 18 C73 23 75 41 71 56 C69 64 67 70 67 74 Z" fill="${W}"/><circle cx="54" cy="31" r="3" fill="${INK}" stroke="none"/><path d="M63 24 Q71 32 66 42" stroke-width="3"/>`),
  },
  {
    id: 'costcodle', name: 'Costcodle', type: 'trivia', mins: 2, color: C.tomato, unit: 'guesses', better: 'low',
    url: 'https://costcodle.com/',
    blurb: 'Guess the price of a Costco item.',
    icon: svg(`<path d="M12 22 H24"/><path d="M24 22 L33 62 H74 L84 32 H27" fill="${W}"/><circle cx="40" cy="75" r="7" fill="${W}"/><circle cx="68" cy="75" r="7" fill="${W}"/><path d="M58 8 H76 L85 17 L76 26 H58 Z" fill="${C.sun}"/><circle cx="76" cy="17" r="2.5" fill="${INK}" stroke="none"/>`),
  },
];

export const byId = Object.fromEntries(GAMES.map((g) => [g.id, { reset: 'local', ...g }]));
GAMES.forEach((g, i) => { GAMES[i] = byId[g.id]; });

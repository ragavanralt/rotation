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
  music: 'Music', movies: 'Movies & TV', gaming: 'Games & anime', math: 'Math', logic: 'Logic',
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

// ---- more games, deeper cuts ----
// G(id, name, type, mins, color, unit, better, url, blurb, tags, pop, icon)
const G = (id, name, type, mins, color, unit, better, url, blurb, tags, pop, icon) =>
  ({ id, name, type, mins, color, unit, better, url, blurb, tags, pop, icon: svg(icon) });

const grid3 = `<rect x="14" y="22" width="60" height="60" rx="8" fill="${W}"/><path d="M34 22 V82 M54 22 V82 M14 42 H74 M14 62 H74" stroke-width="3"/>`;

GAMES.push(
  G('letterboxed', 'Letter Boxed', 'words', 8, C.tomato, null, 'low', 'https://www.nytimes.com/puzzles/letter-boxed',
    'Link letters around a box into words that use every one.', ['words'], 'big',
    `<rect x="22" y="22" width="56" height="56" rx="6" fill="${W}"/><path d="M36 22 L78 50 L50 78 L22 40" stroke="${C.gum}" stroke-width="5"/><g fill="${INK}" stroke="none"><circle cx="36" cy="22" r="5"/><circle cx="64" cy="22" r="5"/><circle cx="78" cy="50" r="5"/><circle cx="50" cy="78" r="5"/><circle cx="22" cy="40" r="5"/><circle cx="22" cy="62" r="5"/></g>`),
  G('sudoku', 'NYT Sudoku', 'logic', 10, C.sky, null, 'low', 'https://www.nytimes.com/puzzles/sudoku',
    'Easy, medium or hard, a fresh grid every day.', ['logic'], 'big',
    `<rect x="16" y="16" width="68" height="68" rx="10" fill="${W}"/><path d="M38.7 16 V84 M61.3 16 V84 M16 38.7 H84 M16 61.3 H84" stroke-width="3"/>${T(27.3, 34, 16, '5')}${T(50, 56.5, 16, '1')}${T(72.7, 79, 16, '9')}`),
  G('queens', 'Queens', 'logic', 3, C.grape, 'time', 'low', 'https://www.linkedin.com/games/queens',
    'Place one crown in every row, column and colour zone. On LinkedIn.', ['logic'], 'big',
    `<path d="M18 70 L22 32 L38 50 L50 26 L62 50 L78 32 L82 70 Z" fill="${C.sun}"/><path d="M16 80 H84" stroke-width="6"/><circle cx="22" cy="28" r="5" fill="${W}"/><circle cx="50" cy="22" r="5" fill="${W}"/><circle cx="78" cy="28" r="5" fill="${W}"/>`),
  G('tango', 'Tango', 'logic', 3, C.tang, 'time', 'low', 'https://www.linkedin.com/games/tango',
    'Fill the grid with suns and moons so every row balances. On LinkedIn.', ['logic'], 'big',
    `<circle cx="34" cy="50" r="18" fill="${C.sun}"/><path d="M34 20 V26 M34 74 V80 M8 50 H14 M54 50 H60 M16 32 L20 36 M48 64 L52 68 M16 68 L20 64 M48 36 L52 32" stroke-width="3"/><path d="M76 30 A20 20 0 1 0 76 70 A15 16 0 1 1 76 30 Z" fill="${C.sky}"/>`),
  G('zip', 'Zip', 'logic', 2, C.mint, 'time', 'low', 'https://www.linkedin.com/games/zip',
    'Draw one path through the numbers in order, filling every square. On LinkedIn.', ['logic'], 'big',
    `<path d="M22 24 H78 V50 H22 V76 H78" stroke="${C.gum}" stroke-width="9"/><circle cx="22" cy="24" r="10" fill="${W}"/><circle cx="78" cy="50" r="10" fill="${W}"/><circle cx="78" cy="76" r="10" fill="${W}"/>${T(22, 29, 14, '1')}${T(78, 55, 14, '2')}${T(78, 81, 14, '3')}`),
  G('pinpoint', 'Pinpoint', 'words', 2, C.sun, 'guesses', 'low', 'https://www.linkedin.com/games/pinpoint',
    'Guess the category from as few clue words as you can. On LinkedIn.', ['words'], 'big',
    `<path d="M50 60 V88" stroke-width="5"/><path d="M38 14 H62 L58 30 L70 48 H30 L42 30 Z" fill="${C.tomato}"/>`),
  G('dordle', 'Dordle', 'words', 4, C.lime, 'guesses', 'low', 'https://zaratustra.itch.io/dordle',
    'Two word puzzles at once, seven tries for both.', ['words'], 'cult',
    `<rect x="12" y="30" width="36" height="40" rx="9" fill="${W}" transform="rotate(-6 30 50)"/><rect x="52" y="30" width="36" height="40" rx="9" fill="${C.sun}" transform="rotate(6 70 50)"/>${T(30, 59, 24, 'D')}${T(70, 59, 24, '2')}`),
  G('sedecordle', 'Sedecordle', 'words', 15, C.gum, null, 'low', 'https://www.sedecordle.com/',
    'Sixteen word puzzles at once. Only for the brave.', ['words'], 'niche',
    `<g fill="${W}"><rect x="12" y="12" width="16" height="16" rx="4"/><rect x="32" y="12" width="16" height="16" rx="4" fill="${C.sun}"/><rect x="52" y="12" width="16" height="16" rx="4"/><rect x="72" y="12" width="16" height="16" rx="4"/><rect x="12" y="32" width="16" height="16" rx="4"/><rect x="32" y="32" width="16" height="16" rx="4"/><rect x="52" y="32" width="16" height="16" rx="4" fill="${C.sun}"/><rect x="72" y="32" width="16" height="16" rx="4"/><rect x="12" y="52" width="16" height="16" rx="4" fill="${C.sun}"/><rect x="32" y="52" width="16" height="16" rx="4"/><rect x="52" y="52" width="16" height="16" rx="4"/><rect x="72" y="52" width="16" height="16" rx="4"/><rect x="12" y="72" width="16" height="16" rx="4"/><rect x="32" y="72" width="16" height="16" rx="4"/><rect x="52" y="72" width="16" height="16" rx="4"/><rect x="72" y="72" width="16" height="16" rx="4" fill="${C.sun}"/></g>`),
  G('phrazle', 'Phrazle', 'words', 5, C.sky, 'guesses', 'low', 'https://solitaired.com/phrazle',
    'Wordle, but you’re guessing a whole phrase.', ['words'], 'cult',
    `<path d="M16 22 H84 V64 H44 L30 78 V64 H16 Z" fill="${W}"/><path d="M27 38 H41 M48 38 H72 M27 50 H58" stroke-width="5"/>`),
  G('dingdle', 'Dingdle', 'words', 3, C.coral, null, 'low', 'https://dingdle.com/',
    'A game-show phrase puzzle. Letters drop in every few seconds, so ding in early.', ['words'], 'niche',
    `<path d="M50 28 V18 M18 34 L12 30 M82 34 L88 30 M14 48 H8 M86 48 H92" stroke-width="3"/><path d="M30 66 C30 40 36 28 50 28 C64 28 70 40 70 66 Z" fill="${C.sun}"/><path d="M22 66 H78" stroke-width="6"/><circle cx="50" cy="75" r="6" fill="${W}"/>`),
  G('shoale', 'Shoale', 'words', 4, C.blue, null, 'low', 'https://shoale.xyz/',
    'Fish for the hidden word. Closer guesses reel in rarer fish.', ['words'], 'niche',
    `<path d="M54 8 V28 Q54 36 46 36 Q40 36 40 30" stroke-width="3"/><path d="M18 56 C32 38 56 38 68 56 C56 74 32 74 18 56 Z" fill="${C.sun}"/><path d="M68 56 L84 42 L84 70 Z" fill="${C.sun}"/><circle cx="32" cy="53" r="3.5" fill="${INK}" stroke="none"/><path d="M44 46 Q48 56 44 66" stroke-width="3"/>`),
  G('mathler', 'Mathler', 'math', 4, C.tang, 'guesses', 'low', 'https://www.mathler.com/',
    'Find the equation that equals today’s number.', ['logic', 'math'], 'cult',
    `<rect x="24" y="12" width="52" height="76" rx="11" fill="${W}"/><rect x="32" y="20" width="36" height="16" rx="4" fill="${C.mint}"/><g fill="${INK}" stroke="none"><circle cx="37" cy="50" r="4.5"/><circle cx="50" cy="50" r="4.5"/><circle cx="63" cy="50" r="4.5"/><circle cx="37" cy="64" r="4.5"/><circle cx="50" cy="64" r="4.5"/><circle cx="63" cy="64" r="4.5"/><circle cx="37" cy="78" r="4.5"/><circle cx="50" cy="78" r="4.5"/><circle cx="63" cy="78" r="4.5"/></g>`),
  G('shunt', 'Shunt', 'logic', 5, C.lime, null, 'low', 'https://www.shunt.im/',
    'One train-sorting puzzle a day. Build the train in as few moves as you can.', ['logic'], 'niche',
    `<path d="M8 82 H92" stroke-dasharray="0.1 9" stroke-width="6"/><path d="M8 76 H92"/><rect x="14" y="36" width="42" height="32" rx="7" fill="${C.tomato}"/><rect x="62" y="44" width="26" height="24" rx="6" fill="${C.sun}"/><path d="M56 58 H62"/><circle cx="25" cy="72" r="6" fill="${W}"/><circle cx="45" cy="72" r="6" fill="${W}"/><circle cx="75" cy="72" r="5" fill="${W}"/>`),
  G('countryle', 'Countryle', 'geo', 4, C.mint, 'guesses', 'low', 'https://countryle.com/',
    'Guess the country from its continent, climate, population and more.', ['geo'], 'cult',
    `<circle cx="50" cy="50" r="33" fill="${W}"/><path d="M50 20 L59 50 H41 Z" fill="${C.tomato}"/><path d="M50 80 L59 50 H41 Z" fill="${C.sky}"/><circle cx="50" cy="50" r="4" fill="${INK}" stroke="none"/><path d="M50 12 v5 M50 83 v5 M12 50 h5 M83 50 h5" stroke-width="3"/>`),
  G('globle-capitals', 'Globle: Capitals', 'geo', 3, C.sun, 'guesses', 'low', 'https://globle-capitals.com/',
    'Globle’s sequel: find the mystery capital city.', ['geo'], 'cult',
    `<circle cx="50" cy="50" r="33" fill="${C.sky}"/><path d="M17 50 H83 M50 17 Q33 50 50 83 M50 17 Q67 50 50 83" stroke-width="2.5"/><path d="M50 30 L56 44 L71 44 L59 53 L64 68 L50 59 L36 68 L41 53 L29 44 L44 44 Z" fill="${C.tomato}"/>`),
  G('capitalle', 'Capitalle', 'geo', 5, C.tomato, null, 'low', 'https://capitalle.app/',
    'Four quick daily geography games in one: capitals, borders, shapes and logos.', ['geo'], 'niche',
    `<path d="M18 82 H82" stroke-width="6"/><path d="M32 52 C32 30 68 30 68 52 Z" fill="${C.sun}"/><rect x="26" y="52" width="48" height="28" fill="${W}"/><path d="M34 52 V80 M44 52 V80 M56 52 V80 M66 52 V80" stroke-width="3"/><path d="M50 33 V16"/><path d="M50 16 L62 20 L50 25" fill="${C.sky}"/>`),
  G('oort', 'OORT', 'trivia', 4, C.grape, null, 'high', 'https://oort.lol/',
    'Trivia that launches you toward the stars. Rare answers fly further.', ['trivia'], 'niche',
    `<path d="M44 70 Q50 92 56 70" fill="${C.tang}"/><path d="M40 54 L26 70 L40 68 Z" fill="${C.tomato}"/><path d="M60 54 L74 70 L60 68 Z" fill="${C.tomato}"/><path d="M50 10 C65 23 67 46 61 68 H39 C33 46 35 23 50 10 Z" fill="${W}"/><circle cx="50" cy="38" r="7" fill="${C.sky}"/><circle cx="18" cy="22" r="2" fill="${W}" stroke="none"/><circle cx="84" cy="36" r="2.5" fill="${W}" stroke="none"/>`),
  G('icepicks', 'Icepicks', 'trivia', 3, C.sky, null, 'low', 'https://icepicks.io/',
    'Nine answers, three are traps. Right picks save penguins.', ['trivia'], 'niche',
    `<path d="M38 88 h-8 M62 88 h8" stroke="${C.tang}" stroke-width="5"/><ellipse cx="50" cy="56" rx="24" ry="31" fill="${INK}"/><ellipse cx="50" cy="63" rx="15" ry="22" fill="${W}" stroke="none"/><circle cx="43" cy="39" r="3.5" fill="${W}" stroke="none"/><circle cx="57" cy="39" r="3.5" fill="${W}" stroke="none"/><path d="M45 47 L50 54 L55 47 Z" fill="${C.tang}" stroke-width="2"/>`),
  G('headcount', 'Headcount', 'trivia', 3, C.lime, null, 'low', 'https://headcountgame.com/',
    'Guess how other players answered. The crowd is real people.', ['trivia'], 'niche',
    `<circle cx="26" cy="44" r="10" fill="${W}"/><path d="M10 80 C10 60 42 60 42 80 Z" fill="${W}"/><circle cx="74" cy="44" r="10" fill="${W}"/><path d="M58 80 C58 60 90 60 90 80 Z" fill="${W}"/><circle cx="50" cy="38" r="12" fill="${C.sun}"/><path d="M30 86 C30 60 70 60 70 86 Z" fill="${C.sun}"/>`),
  G('chronophoto', 'Chronophoto', 'trivia', 4, C.sun, null, 'high', 'https://www.chronophoto.app/',
    'Guess the year an old photo was taken.', ['history'], 'cult',
    `<g transform="rotate(-7 44 46)"><rect x="16" y="14" width="56" height="64" rx="5" fill="${W}"/><rect x="23" y="21" width="42" height="40" fill="${C.tang}" stroke-width="3"/><path d="M23 61 L36 46 L46 56 L54 48 L65 61 Z" fill="${C.coral}" stroke-width="3"/></g><circle cx="72" cy="70" r="17" fill="${W}"/><path d="M72 70 V60 M72 70 L80 74" stroke-width="3"/>`),
  G('foodguessr', 'FoodGuessr', 'trivia', 4, C.gum, null, 'high', 'https://www.foodguessr.com/',
    'Guess where in the world each dish comes from.', ['food', 'geo'], 'cult',
    `<path d="M60 14 L46 46 M74 18 L54 46" stroke-width="4"/><path d="M14 50 H86 C86 70 72 84 50 84 C28 84 14 70 14 50 Z" fill="${W}"/><path d="M28 50 C28 40 38 40 38 50 M44 50 C44 36 56 36 56 50 M62 50 C62 42 72 42 72 50" stroke-width="3"/>`),
  G('metaflora', 'Metaflora', 'trivia', 4, C.lime, 'guesses', 'low', 'https://flora.metazooa.com/',
    'Metazooa’s plant version. Find the mystery plant.', ['animals'], 'niche',
    `<path d="M50 62 V90" stroke-width="5"/><path d="M50 82 Q36 72 28 78 Q38 88 50 84" fill="${C.mint}"/><circle cx="50" cy="26" r="12" fill="${C.gum}"/><circle cx="33" cy="39" r="12" fill="${C.gum}"/><circle cx="67" cy="39" r="12" fill="${C.gum}"/><circle cx="39" cy="56" r="12" fill="${C.gum}"/><circle cx="61" cy="56" r="12" fill="${C.gum}"/><circle cx="50" cy="43" r="9" fill="${C.sun}"/>`),
  G('samples', 'Sample Sample Sample', 'music', 4, C.tang, 'guesses', 'low', 'https://samplesamplesample.com/',
    'Hear a few seconds of an old record, then name the hit that sampled it.', ['music'], 'niche',
    `<circle cx="48" cy="54" r="34" fill="${INK}"/><circle cx="48" cy="54" r="24" stroke="${W}" stroke-width="2"/><circle cx="48" cy="54" r="12" fill="${C.gum}"/><circle cx="48" cy="54" r="3" fill="${W}" stroke="none"/><path d="M88 10 L72 40" stroke-width="5"/><circle cx="88" cy="10" r="5" fill="${W}"/>`),
  G('disco', 'Disco', 'music', 5, C.grape, null, 'low', 'https://disco.aul.to/',
    'Rebuild a painting tile by tile, then find the song hidden behind it.', ['music'], 'niche',
    `<path d="M50 8 V20"/><circle cx="50" cy="52" r="32" fill="${W}"/><path d="M18 52 H82 M22 36 H78 M22 68 H78 M50 20 Q34 52 50 84 M50 20 Q66 52 50 84" stroke-width="2.5"/><path d="M53 37 H64 V51 H53 Z" fill="${C.sky}" stroke="none"/><path d="M36 53 H47 V66 H36 Z" fill="${C.gum}" stroke="none"/><path d="M84 18 v10 M79 23 h10" stroke-width="3"/>`),
  G('episode', 'Episode', 'movies', 3, C.sky, 'guesses', 'low', 'https://episode.wtf/',
    'Framed for TV: name the show from a single frame.', ['movies'], 'cult',
    `<path d="M38 28 L28 12 M50 28 L60 12"/><rect x="14" y="28" width="72" height="54" rx="12" fill="${W}"/><rect x="22" y="36" width="46" height="38" rx="6" fill="${C.gum}"/><circle cx="77" cy="45" r="3.5" fill="${INK}" stroke="none"/><circle cx="77" cy="59" r="3.5" fill="${INK}" stroke="none"/>`),
  G('moviedle', 'Moviedle', 'movies', 3, C.tang, 'guesses', 'low', 'https://moviedle.app/',
    'A whole movie squeezed into one second. Name it.', ['movies'], 'cult',
    `<path d="M16 30 L80 18 L84 32 L20 44 Z" fill="${INK}"/><path d="M31 28 L37 40 M47 25 L53 37 M63 22 L69 34" stroke="${W}" stroke-width="4"/><rect x="16" y="44" width="68" height="40" rx="6" fill="${W}"/><path d="M28 58 H58 M28 70 H48" stroke-width="4"/>`),
  G('boxoffice', 'Box Office Game', 'movies', 4, C.tomato, null, 'high', 'https://boxofficega.me/',
    'Guess which movies made the most money.', ['movies'], 'niche',
    `<circle cx="34" cy="34" r="10" fill="${C.sun}"/><circle cx="50" cy="27" r="12" fill="${C.sun}"/><circle cx="66" cy="34" r="10" fill="${C.sun}"/><path d="M24 40 L32 88 H68 L76 40 Z" fill="${W}"/><path d="M38 40 L41 88 M50 40 V88 M62 40 L59 88" stroke="${C.tomato}" stroke-width="5"/><path d="M24 40 L32 88 H68 L76 40 Z"/>`),
  G('guessthegame', 'GuessThe.Game', 'gaming', 4, C.lime, 'guesses', 'low', 'https://guessthe.game/',
    'Name the video game from screenshots.', ['gaming'], 'cult',
    `<path d="M24 34 H76 C90 34 94 76 80 78 C71 80 68 64 60 64 H40 C32 64 29 80 20 78 C6 76 10 34 24 34 Z" fill="${W}"/><path d="M30 44 V58 M23 51 H37" stroke-width="4.5"/><circle cx="64" cy="46" r="5" fill="${C.gum}"/><circle cx="74" cy="55" r="5" fill="${C.sky}"/>`),
  G('gamedle', 'Gamedle', 'gaming', 4, C.sky, 'guesses', 'low', 'https://www.gamedle.wtf/',
    'Guess the game from a blurry, pixelated cover.', ['gaming'], 'cult',
    `<path d="M20 20 H40 V30 H60 V20 H80 V30 H90 V50 H80 V60 H70 V70 H60 V80 H40 V70 H30 V60 H20 V50 H10 V30 H20 Z" fill="${C.tomato}" stroke-linejoin="miter"/><rect x="24" y="34" width="8" height="8" fill="${W}" stroke="none"/>`),
  G('loldle', 'LoLdle', 'gaming', 4, C.blue, 'guesses', 'low', 'https://loldle.net/',
    'Guess the League of Legends champion from clues.', ['gaming'], 'cult',
    `<path d="M50 12 L82 22 V46 C82 68 68 80 50 88 C32 80 18 68 18 46 V22 Z" fill="${W}"/><path d="M50 26 V76 M32 44 H68" stroke="${C.tang}" stroke-width="7"/>`),
  G('pokedle', 'Pokedle', 'gaming', 4, C.tomato, 'guesses', 'low', 'https://pokedle.net/',
    'Guess the Pokémon from its type, habitat and more.', ['gaming', 'anime'], 'cult',
    `<path d="M50 10 C70 10 81 42 81 60 C81 78 67 88 50 88 C33 88 19 78 19 60 C19 42 30 10 50 10 Z" fill="${W}"/><circle cx="40" cy="36" r="6" fill="${C.mint}"/><circle cx="62" cy="54" r="8" fill="${C.mint}"/><circle cx="36" cy="70" r="5" fill="${C.mint}"/><path d="M21 56 L31 50 L40 58 L50 50 L60 58 L69 50 L79 56" stroke-width="3"/>`),
  G('squirdle', 'Squirdle', 'gaming', 4, C.mint, 'guesses', 'low', 'https://squirdle.fireblend.com/',
    'Another Pokémon guesser, with higher or lower hints on height and weight.', ['gaming', 'anime'], 'niche',
    `<circle cx="50" cy="48" r="32" fill="${W}"/><path d="M39 40 Q39 27 50 27 Q61 27 61 38 Q61 46 50 50 V58" stroke-width="7"/><circle cx="50" cy="71" r="4.5" fill="${INK}" stroke="none"/>`),
  G('narutodle', 'Narutodle', 'gaming', 4, C.tang, 'guesses', 'low', 'https://narutodle.net/',
    'Guess the Naruto character from clues.', ['anime'], 'niche',
    `<path d="M50 12 L59 41 L88 50 L59 59 L50 88 L41 59 L12 50 L41 41 Z" fill="${W}"/><circle cx="50" cy="50" r="8" fill="${C.sky}"/>`),
  G('onepiecedle', 'Onepiecedle', 'gaming', 4, C.sky, 'guesses', 'low', 'https://onepiecedle.net/',
    'Guess the One Piece character from clues.', ['anime'], 'niche',
    `<path d="M18 48 C18 26 82 26 82 48 Z" fill="${C.tang}"/><rect x="18" y="48" width="64" height="34" rx="5" fill="${C.tang}"/><path d="M18 48 H82 M30 34 V82 M70 34 V82" stroke-width="3"/><rect x="43" y="52" width="14" height="14" rx="3" fill="${C.sun}"/>`),
  G('ig-basketball', 'Immaculate Grid: Hoops', 'sports', 5, C.tang, 'correct', 'high', 'https://www.immaculategrid.com/basketball',
    'Basketball tic-tac-toe. Name an NBA player for every square.', ['basketball'], 'cult',
    `${grid3}<circle cx="74" cy="28" r="17" fill="${C.tang}"/><path d="M57 28 H91 M74 11 V45 M62 16 Q70 28 62 40 M86 16 Q78 28 86 40" stroke-width="2.5"/>`),
  G('ig-hockey', 'Immaculate Grid: Hockey', 'sports', 5, C.sky, 'correct', 'high', 'https://www.immaculategrid.com/hockey',
    'Hockey tic-tac-toe. Name an NHL player for every square.', ['hockey'], 'niche',
    `${grid3}<path d="M92 8 L74 46 H58" stroke-width="6"/><ellipse cx="80" cy="54" rx="12" ry="6" fill="${INK}"/>`),
  G('ig-football', 'Immaculate Grid: Football', 'sports', 5, C.lime, 'correct', 'high', 'https://www.immaculategrid.com/football',
    'Football tic-tac-toe. Name an NFL player for every square.', ['nfl'], 'niche',
    `${grid3}<ellipse cx="74" cy="28" rx="18" ry="11" fill="${C.coral}" transform="rotate(-30 74 28)"/><path d="M67 32 L81 24 M70 25 L73 30 M75 22 L78 27" stroke="${W}" stroke-width="2.5"/>`),
  G('tikitaka', 'Tiki-Taka-Toe', 'sports', 5, C.mint, null, 'low', 'https://playfootball.games/tiki-taka-toe/',
    'Soccer tic-tac-toe. Name a player who fits both the row and the column.', ['soccer'], 'niche',
    `${grid3}<circle cx="74" cy="28" r="17" fill="${W}"/><path d="M74 21 L81 26 L78 34 L70 34 L67 26 Z" fill="${INK}" stroke-width="2"/>`),
);

// Tags drive the quiz; pop is how well known a game is: big, cult (a loyal crowd) or niche.
const META = {
  wordle: [['words'], 'big'], connections: [['words'], 'big'], strands: [['words'], 'big'], mini: [['words'], 'big'],
  spellingbee: [['words'], 'big'], pips: [['logic'], 'big'], 'connections-sports': [['sports', 'words'], 'big'],
  globle: [['geo'], 'big'], worldle: [['geo'], 'big'], flagle: [['geo'], 'cult'], travle: [['geo'], 'cult'],
  tradle: [['geo'], 'cult'], krillion: [['trivia'], 'niche'], quordle: [['words'], 'big'], octordle: [['words'], 'cult'],
  waffle: [['words'], 'cult'], squaredle: [['words'], 'cult'], contexto: [['words'], 'cult'], semantle: [['words'], 'cult'],
  nerdle: [['math', 'logic'], 'cult'], framed: [['movies'], 'cult'], bandle: [['music'], 'cult'], spotle: [['music'], 'cult'],
  immaculate: [['baseball'], 'cult'], poeltl: [['basketball'], 'cult'], whoareya: [['soccer'], 'cult'],
  timeguessr: [['history', 'geo'], 'cult'], metazooa: [['animals'], 'cult'], set: [['logic'], 'cult'], chess: [['logic'], 'big'],
  costcodle: [['food', 'trivia'], 'cult'],
};

export const byId = Object.fromEntries(GAMES.map((g) => {
  const [tags, pop] = META[g.id] || [g.tags, g.pop];
  return [g.id, { reset: 'local', ...g, tags, pop }];
}));
GAMES.forEach((g, i) => { GAMES[i] = byId[g.id]; });

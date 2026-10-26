# Rotation

Your daily games in one place. Pick the games you play, open them from one board, paste the share text when you finish, and keep one streak across all of them.

- No sign-up, no ads. Everything is saved on your own phone (Settings has a backup button).
- Rotation only links to games. It never copies or shows their puzzles, and every game belongs to the people who make it.
- Add it to your home screen and it opens like an app, even offline.

## Running it

It's a plain static site, no build step. GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.

To try it on your computer: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Adding a game

Add an entry to `GAMES` in `js/games.js` (name, link, type, minutes, colour and a 100×100 icon). If the game has share text, add a reader for it in `js/parse.js`; otherwise people can still mark it done.

Fonts: Bagel Fat One and Fredoka, both under the SIL Open Font License.

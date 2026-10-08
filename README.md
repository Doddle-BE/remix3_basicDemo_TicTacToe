# TicTacToe

A small Remix v3 tic-tac-toe game with an about page.

## Structure

- `app/routes.ts` names the URLs. `routes.home.href()` and `routes.about.href()` build links.
- `app/router.ts` connects those routes to the controller and the page renderer.
- `app/controller.tsx` handles each route. `app/controller.test.ts` requests `/` and `/about`.
- `app/pages/` holds the home page and the about page. Both are server-rendered.
- `app/ui/` holds the HTML document and the shared page styles.
- `app/game/` holds the rules and `tic-tac-toe.test.ts`. The board imports the rules.
- `app/client/` holds the browser entry and the interactive board.
- `app/assets.ts` serves `app/client/**` and `app/game/tic-tac-toe.ts`. Tests and server files stay off that list.
- Root `public/` contains static files served unchanged from the app root.

## Commands

```sh
npm i
npm run dev
npm run hmr
npm run start
npm test
npm run typecheck
```

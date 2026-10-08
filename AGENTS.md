# TicTacToe Agent Guide

This app was scaffolded with `remix new`. Use these conventions when continuing to build it out.

## Commands

```sh
npm i
npm run dev
npm run hmr
npm run start
npm test
npm run typecheck
```

Use `npm run hmr` for live server and browser updates; `npm run dev` only watches and restarts the server. `npm run start` runs in production mode without a separate build step.

## Building Features

Refer to ./.agents/skills/remix/SKILL.md for the Remix mental model and how to find guides and API READMEs through `node_modules/remix/INDEX.md`.

## Layout

- `app/routes.ts` defines the shared route contract used for type-safe hrefs
- `app/router.ts` wires routes to the controller and installs the standard Remix component renderer used by actions
- `app/controller.tsx` owns the route actions. `app/controller.test.ts` is the router smoke test
- `app/pages/` renders the home page and the about page
- `app/ui/` holds the document shell and shared page styles
- `app/client/` contains the browser runtime entry, the interactive board, and `game/` for the tic-tac-toe rules and their test
- `app/assets.ts` serves `app/client/**` to the browser. `denyFiles` excludes tests
- Root `public/` contains static files served unchanged from the app root

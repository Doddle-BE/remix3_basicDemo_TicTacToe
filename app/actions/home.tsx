import { HomePage } from '../pages/home-page.tsx'
import { readPlayers, readStoredPlayers } from './players.ts'
import type { InvalidNames } from './start.ts'

/** Renders the home page. A failed submission fills the form; otherwise saved names do. */
export function homeHandler(request: Request, invalid?: InvalidNames) {
  let { playerX, playerO } = readPlayers(request)
  let stored = readStoredPlayers(request)

  return (
    <HomePage
      playerX={playerX}
      playerO={playerO}
      values={invalid?.values ?? stored ?? undefined}
      error={invalid?.error}
    />
  )
}
import { HomePage } from '../pages/home-page.tsx'
import { readPlayers } from './players.ts'
import type { InvalidNames } from './start.ts'

/** Renders the home page, keeping a failed submission in the form. */
export function homeHandler(request: Request, invalid?: InvalidNames) {
  let { playerX, playerO } = readPlayers(request)
  return (
    <HomePage
      playerX={playerX}
      playerO={playerO}
      values={invalid?.values}
      error={invalid?.error}
    />
  )
}
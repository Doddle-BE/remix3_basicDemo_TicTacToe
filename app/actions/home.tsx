import { HomePage } from '../pages/home-page.tsx'
import { readPlayers } from './players.ts'

export function homeHandler(request: Request) {
  let { playerX, playerO } = readPlayers(request)
  return <HomePage playerX={playerX} playerO={playerO} />
}
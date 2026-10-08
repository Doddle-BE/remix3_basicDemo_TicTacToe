export interface Players {
  playerX: string
  playerO: string
}

const COOKIE_NAME = 'players'
const DEFAULT_PLAYERS: Players = { playerX: 'X', playerO: 'O' }

/** Reads the players cookie, falling back to X and O when it is missing or broken. */
export function readPlayers(request: Request): Players {
  return readStoredPlayers(request) ?? DEFAULT_PLAYERS
}

/** Reads names saved by the start form, or null when none are stored. */
export function readStoredPlayers(request: Request): Players | null {
  let header = request.headers.get('Cookie') ?? ''
  let cookie = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))

  if (!cookie) {
    return null
  }

  try {
    let value = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1))
    let players: unknown = JSON.parse(value)
    if (isPlayers(players)) {
      return { playerX: players.playerX, playerO: players.playerO }
    }
  } catch {
    // broken cookie: fall back to the default names
  }

  return null
}

/** Serializes players into a Set-Cookie header value. */
export function playersCookie(players: Players): string {
  let value = encodeURIComponent(JSON.stringify(players))
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax`
}

/** Checks that a cookie payload has a string name for each player. */
function isPlayers(value: unknown): value is Players {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return (
    'playerX' in value &&
    'playerO' in value &&
    typeof value.playerX === 'string' &&
    typeof value.playerO === 'string'
  )
}

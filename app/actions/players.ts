export interface Players {
    playerX: string
    playerO: string
  }
  
  const COOKIE_NAME = 'players'
  const DEFAULT_PLAYERS: Players = { playerX: 'X', playerO: 'O' }
  
  export function readPlayers(request: Request): Players {
    let header = request.headers.get('Cookie') ?? ''
    let cookie = header
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${COOKIE_NAME}=`))
  
    if (!cookie) {
      return DEFAULT_PLAYERS
    }
  
    try {
      let value = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1))
      let players = JSON.parse(value)
      if (typeof players.playerX === 'string' && typeof players.playerO === 'string') {
        return { playerX: players.playerX, playerO: players.playerO }
      }
    } catch {
      // broken cookie: return to default names
    }
    return DEFAULT_PLAYERS
  }
  
  export function playersCookie(players: Players): string {
    let value = encodeURIComponent(JSON.stringify(players))
    return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax`
  }
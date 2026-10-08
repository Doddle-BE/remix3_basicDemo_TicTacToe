import { routes } from '../routes.ts'
import { playersCookie } from './players.ts'

export async function startHandler(request: Request): Promise<Response> {
  let form = await request.formData()
  let playerX = String(form.get('playerX') ?? '').trim()
  let playerO = String(form.get('playerO') ?? '').trim()

  if (!isValidName(playerX) || !isValidName(playerO)) {
    return new Response('Ongeldige namen', { status: 400 })
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: routes.home.href(),
      'Set-Cookie': playersCookie({ playerX, playerO }),
    },
  })
}

function isValidName(name: string): boolean {
  return name.length > 0 && name.length <= 20
}
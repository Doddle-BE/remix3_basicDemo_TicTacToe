import { routes } from '../routes.ts'
import { playersCookie, type Players } from './players.ts'

export interface InvalidNames {
  error: string
  values: Players
}

const NAME_ERROR = 'Names must be 1-20 characters.'

/** Saves valid player names, or returns the submitted names with an error. */
export async function startHandler(request: Request): Promise<Response | InvalidNames> {
  let form = await request.formData()
  let playerX = readText(form, 'playerX')
  let playerO = readText(form, 'playerO')

  if (!isValidName(playerX.trim()) || !isValidName(playerO.trim())) {
    return { error: NAME_ERROR, values: { playerX, playerO } }
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: routes.home.href(),
      'Set-Cookie': playersCookie({ playerX: playerX.trim(), playerO: playerO.trim() }),
    },
  })
}

/** Reads a text field, leaving files and missing fields empty. */
function readText(form: FormData, name: string): string {
  let value = form.get(name)
  if (typeof value !== 'string') {
    return ''
  }
  return value
}

/** A name is one to twenty characters after trimming. */
function isValidName(name: string): boolean {
  return name.length > 0 && name.length <= 20
}
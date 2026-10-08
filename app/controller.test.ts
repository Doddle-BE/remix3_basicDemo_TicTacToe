import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'

import { playersCookie, type Players } from './actions/players.ts'
import { router } from './router.ts'
import { routes } from './routes.ts'

const origin = 'http://localhost'

/** Posts the start form with the given player names. */
async function postStart(
  playerX: string,
  playerO: string,
  cookie?: string,
): Promise<Response> {
  let body = new FormData()
  body.set('playerX', playerX)
  body.set('playerO', playerO)

  return router.fetch(
    new Request(new URL(routes.start.href(), origin), {
      method: 'POST',
      headers: cookie ? { Cookie: cookie } : undefined,
      body,
    }),
  )
}

describe('root controller', () => {
  it('GET / returns the home page', async () => {
    let response = await router.fetch(new URL(routes.home.href(), 'http://localhost'))
    let body = await response.text()

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type') ?? '', /text\/html/)
    assert.match(body, /<html[\s>]/)
    assert.match(body, /X's turn/)
    assert.match(body, new RegExp(`href="${routes.about.href()}"`))
  })

  it('GET /about returns the about page', async () => {
    let response = await router.fetch(new URL(routes.about.href(), 'http://localhost'))
    let body = await response.text()

    assert.equal(response.status, 200)
    assert.match(response.headers.get('Content-Type') ?? '', /text\/html/)
    assert.match(body, /<h1[^>]*>About<\/h1>/)
    assert.match(body, new RegExp(`href="${routes.home.href()}"`))
  })

  it('POST /start with valid names redirects and sets the players cookie', async () => {
    let players: Players = { playerX: 'Ada', playerO: 'Grace' }
    let response = await postStart(players.playerX, players.playerO)

    assert.equal(response.status, 303)
    assert.equal(response.headers.get('Location'), routes.home.href())
    assert.equal(response.headers.get('Set-Cookie'), playersCookie(players))
  })

  it('POST /start with invalid names re-renders the form', async () => {
    let saved: Players = { playerX: 'Ada', playerO: 'Grace' }
    let tooLongName = 'x'.repeat(21)
    let blank = await postStart('   ', 'Too Blank', playersCookie(saved).split(';')[0])
    let tooLong = await postStart('Ada Lovelace', tooLongName)
    let blankBody = await blank.text()
    let tooLongBody = await tooLong.text()

    assert.equal(blank.status, 400)
    assert.equal(tooLong.status, 400)
    assert.match(blank.headers.get('Content-Type') ?? '', /text\/html/)
    assert.match(tooLong.headers.get('Content-Type') ?? '', /text\/html/)
    assert.equal(blank.headers.get('Set-Cookie'), null)
    assert.equal(tooLong.headers.get('Set-Cookie'), null)
    assert.match(blankBody, /Names must be 1-20 characters/)
    assert.match(blankBody, /role="alert"/)
    assert.match(blankBody, /name="playerX"[^>]*value="   "/)
    assert.match(blankBody, /name="playerO"[^>]*value="Too Blank"/)
    assert.match(blankBody, /Ada's turn/)
    assert.match(tooLongBody, /Names must be 1-20 characters/)
    assert.match(tooLongBody, /name="playerX"[^>]*value="Ada Lovelace"/)
    assert.match(tooLongBody, new RegExp(`name="playerO"[^>]*value="${tooLongName}"`))
    assert.match(tooLongBody, /X's turn/)
  })

  it('GET / with the players cookie shows those names', async () => {
    let players: Players = { playerX: 'Ada', playerO: 'Grace' }
    let response = await router.fetch(
      new Request(new URL(routes.home.href(), origin), {
        headers: { Cookie: playersCookie(players).split(';')[0] },
      }),
    )
    let body = await response.text()

    assert.equal(response.status, 200)
    assert.match(body, /Ada's turn/)
    assert.match(body, /Grace/)
  })
})

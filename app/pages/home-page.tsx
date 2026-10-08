import type { Handle } from 'remix/component'

import type { Players } from '../actions/players.ts'
import { Board } from '../client/game/board.tsx'
import { routes } from '../routes.ts'
import { linkStyle, Page, titleStyle } from '../ui/page.tsx'

interface HomePageProps {
  playerX: string
  playerO: string
  values?: Players
  error?: string
}

export function HomePage(handle: Handle<HomePageProps>) {
  return () => {
    let { playerX, playerO, values, error } = handle.props

    return (
      <Page>
        <h1 mix={titleStyle}>Tic-tac-toe</h1>
        <form method="post" action={routes.start.href()}>
          {error && (
            <p id="names-error" role="alert">
              {error}
            </p>
          )}
          <label>
            Player X:&nbsp;
            <input
              name="playerX"
              required
              maxLength={20}
              defaultValue={values?.playerX}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'names-error' : undefined}
            />
          </label>
          <label>
            Player O:&nbsp;
            <input
              name="playerO"
              required
              maxLength={20}
              defaultValue={values?.playerO}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'names-error' : undefined}
            />
          </label>
          <button type="submit">Start</button>
        </form>
        <Board playerX={playerX} playerO={playerO} />
        <a href={routes.about.href()} mix={linkStyle}>
          About
        </a>
      </Page>
    )
  }
}
import type { Handle } from 'remix/component'

import { Board } from '../client/game/board.tsx'
import { routes } from '../routes.ts'
import { linkStyle, Page, titleStyle } from '../ui/page.tsx'

interface HomePageProps {
  playerX: string
  playerO: string
}

export function HomePage(handle: Handle<HomePageProps>) {
  return () => {
    let { playerX, playerO } = handle.props

    return (
      <Page>
        <h1 mix={titleStyle}>Tic-tac-toe</h1>
        <form method="post" action={routes.start.href()}>
          <label>
            Player X:&nbsp;
            <input name="playerX" required maxLength={20} />
          </label>
          <label>
            Player O:&nbsp;
            <input name="playerO" required maxLength={20} />
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
import { Board } from '../client/game/board.tsx'
import { routes } from '../routes.ts'
import { linkStyle, Page, titleStyle } from '../ui/page.tsx'

export function HomePage() {
  return () => (
    <Page>
      <h1 mix={titleStyle}>Tic-tac-toe</h1>
      <Board />
      <a href={routes.about.href()} mix={linkStyle}>
        About
      </a>
    </Page>
  )
}

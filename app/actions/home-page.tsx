import { routes } from '../routes.ts'
import { Board } from './public/board.tsx'
import { linkStyle, Page, titleStyle } from './page.tsx'

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

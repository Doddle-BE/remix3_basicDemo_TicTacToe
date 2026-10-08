import { css } from 'remix/component'

import { routes } from '../routes.ts'
import { linkStyle, Page, titleStyle } from './page.tsx'

export function AboutPage() {
  return () => (
    <Page title="About">
      <h1 mix={titleStyle}>About</h1>
      <section mix={sectionStyle}>
        <h2 mix={headingStyle}>Rules</h2>
        <p mix={paragraphStyle}>
          X starts. Three marks in a row wins, across a row, a column, or a diagonal. A full board
          with no three in a row is a draw.
        </p>
      </section>
      <section mix={sectionStyle}>
        <h2 mix={headingStyle}>How it's built</h2>
        <p mix={paragraphStyle}>
          This app is Remix v3. The page is server-rendered. The game is one interactive Board
          client entry. The match is stored as a move list.
        </p>
      </section>
      <a href={routes.home.href()} mix={linkStyle}>
        Back to the game
      </a>
    </Page>
  )
}

const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  maxWidth: '36rem',
  textAlign: 'left',
})

const headingStyle = css({
  margin: 0,
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})

const paragraphStyle = css({
  margin: 0,
})

import type { Handle, RemixNode } from 'remix/component'
import { css } from 'remix/component'

import { Document } from './document.tsx'

const FONT_STACK =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

interface PageProps {
  children?: RemixNode
  title?: string
}

export function Page(handle: Handle<PageProps>) {
  return () => {
    let { children, title } = handle.props

    return (
      <Document head={<GameFont />} title={title}>
        <main mix={pageStyle}>{children}</main>
      </Document>
    )
  }
}

function GameFont() {
  return () => (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
      />
    </>
  )
}

const pageStyle = css({
  '--surface-0': '#dee2e6',
  '--surface-3': '#f0f4f7',
  '--surface-4': '#f7fbff',
  '--text-primary': '#313539',
  '--text-tertiary': '#94989c',
  '--brand-blue': '#2dacf9',
  '@media (prefers-color-scheme: dark)': {
    '--surface-0': '#1e2226',
    '--surface-3': '#313539',
    '--surface-4': '#363a3e',
    '--text-primary': '#dee2e6',
    '--text-tertiary': '#94989c',
  },
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
  margin: 0,
  minHeight: '100vh',
  padding: '48px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '24px',
  background: 'var(--surface-0)',
  color: 'var(--text-primary)',
  fontFamily: FONT_STACK,
  fontSize: '16px',
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

export const titleStyle = css({
  margin: 0,
  fontSize: '28px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textAlign: 'center',
})

export const linkStyle = css({
  color: 'var(--brand-blue)',
  fontSize: '14px',
  fontWeight: 700,
  textDecoration: 'none',
  '&:hover, &:focus-visible': {
    textDecoration: 'underline',
    outline: 'none',
  },
})

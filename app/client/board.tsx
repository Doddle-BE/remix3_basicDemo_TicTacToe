import { clientEntry, css, on, type Handle } from 'remix/component'

import { place, start, view, type Cell } from './game/tic-tac-toe.ts'

export const Board = clientEntry(import.meta.url, function Board(handle: Handle) {
  let game = start()

  function handlePlace(index: Cell): void {
    const next = place(game, index)
    if (next === game) {
      return
    }
    game = next
    handle.update()
  }

  function handleNewGame(): void {
    game = start()
    handle.update()
  }

  return () => {
    const picture = view(game)

    return (
      <section mix={sectionStyle}>
        <p role="status" aria-live="polite" mix={statusStyle}>
          {picture.announcement}
        </p>
        <div mix={gridStyle}>
          {picture.cells.map((cell) => (
            <button
              key={cell.index}
              type="button"
              aria-label={cell.mark ?? 'Empty'}
              style={
                cell.mark !== null && cell.winning ? { color: 'var(--brand-blue)' } : undefined
              }
              mix={[
                cellStyle,
                on('click', () => {
                  handlePlace(cell.index)
                }),
              ]}
            >
              {cell.mark ?? ''}
            </button>
          ))}
        </div>
        <button
          type="button"
          mix={[
            newGameStyle,
            on('click', () => {
              handleNewGame()
            }),
          ]}
        >
          New game
        </button>
      </section>
    )
  }
})

const sectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  width: 'min(100%, 420px)',
})

const statusStyle = css({
  margin: 0,
  minHeight: '1.5em',
  fontSize: '20px',
  fontWeight: 700,
  textAlign: 'center',
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '12px',
  width: '100%',
})

const cellStyle = css({
  appearance: 'none',
  aspectRatio: '1',
  margin: 0,
  border: 0,
  borderRadius: '16px',
  background: 'var(--surface-3)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '40px',
  fontWeight: 700,
  lineHeight: 1,
  '&:hover, &:focus-visible': {
    background: 'var(--surface-4)',
    outline: '2px solid var(--brand-blue)',
    outlineOffset: '2px',
  },
})

const newGameStyle = css({
  appearance: 'none',
  width: '100%',
  margin: 0,
  padding: '14px 16px',
  border: 0,
  borderRadius: '12px',
  background: 'var(--surface-4)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  font: 'inherit',
  fontWeight: 700,
  '&:hover, &:focus-visible': {
    color: 'var(--brand-blue)',
    outline: '2px solid var(--brand-blue)',
    outlineOffset: '2px',
  },
})

import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'

import { place, start, view, type Cell, type Game } from './tic-tac-toe.ts'

function play(cells: readonly Cell[]): Game {
  return cells.reduce((game, cell) => place(game, cell), start())
}

describe('tic-tac-toe', () => {
  it('starts on X with nine empty cells', () => {
    const picture = view(start())

    assert.equal(picture.announcement, "X's turn")
    assert.deepEqual(picture.cells, [
      { index: 0, mark: null },
      { index: 1, mark: null },
      { index: 2, mark: null },
      { index: 3, mark: null },
      { index: 4, mark: null },
      { index: 5, mark: null },
      { index: 6, mark: null },
      { index: 7, mark: null },
      { index: 8, mark: null },
    ])
  })

  it('places X in cell 0 and gives the turn to O', () => {
    const opened = start()
    const game = place(opened, 0)
    const picture = view(game)

    assert.notEqual(game, opened)
    assert.equal(view(opened).announcement, "X's turn")
    assert.equal(picture.announcement, "O's turn")
    assert.deepEqual(picture.cells[0], { index: 0, mark: 'X', winning: false })
    assert.deepEqual(picture.cells[1], { index: 1, mark: null })
  })

  it('returns the same game when the cell is taken', () => {
    const once = place(start(), 0)
    const replayed = place(once, 0)
    const picture = view(replayed)

    assert.equal(replayed, once)
    assert.equal(picture.announcement, "O's turn")
    assert.deepEqual(picture.cells[0], { index: 0, mark: 'X', winning: false })
  })

  it('wins the middle row for O', () => {
    const picture = view(play([0, 3, 1, 4, 8, 5]))

    assert.equal(picture.announcement, 'O wins')
    assert.deepEqual(picture.cells, [
      { index: 0, mark: 'X', winning: false },
      { index: 1, mark: 'X', winning: false },
      { index: 2, mark: null },
      { index: 3, mark: 'O', winning: true },
      { index: 4, mark: 'O', winning: true },
      { index: 5, mark: 'O', winning: true },
      { index: 6, mark: null },
      { index: 7, mark: null },
      { index: 8, mark: 'X', winning: false },
    ])
  })

  it('wins a column for X', () => {
    const picture = view(play([0, 1, 3, 2, 6]))

    assert.equal(picture.announcement, 'X wins')
    assert.deepEqual(picture.cells, [
      { index: 0, mark: 'X', winning: true },
      { index: 1, mark: 'O', winning: false },
      { index: 2, mark: 'O', winning: false },
      { index: 3, mark: 'X', winning: true },
      { index: 4, mark: null },
      { index: 5, mark: null },
      { index: 6, mark: 'X', winning: true },
      { index: 7, mark: null },
      { index: 8, mark: null },
    ])
  })

  it('wins the diagonal for X and ignores a later click', () => {
    const game = play([0, 1, 4, 2, 8])
    const stuck = place(game, 7)
    const picture = view(stuck)

    assert.equal(stuck, game)
    assert.equal(picture.announcement, 'X wins')
    assert.deepEqual(picture.cells[0], { index: 0, mark: 'X', winning: true })
    assert.deepEqual(picture.cells[4], { index: 4, mark: 'X', winning: true })
    assert.deepEqual(picture.cells[8], { index: 8, mark: 'X', winning: true })
    assert.deepEqual(picture.cells[7], { index: 7, mark: null })
  })

  it('draws when the tape is full and no line is winning', () => {
    const game = play([0, 1, 2, 4, 3, 5, 7, 6, 8])
    const picture = view(game)

    assert.equal(place(game, 0), game)
    assert.equal(picture.announcement, 'Draw')
    assert.deepEqual(picture.cells, [
      { index: 0, mark: 'X', winning: false },
      { index: 1, mark: 'O', winning: false },
      { index: 2, mark: 'X', winning: false },
      { index: 3, mark: 'X', winning: false },
      { index: 4, mark: 'O', winning: false },
      { index: 5, mark: 'O', winning: false },
      { index: 6, mark: 'O', winning: false },
      { index: 7, mark: 'X', winning: false },
      { index: 8, mark: 'X', winning: false },
    ])
  })

  it('marks both lines when the last move finishes them', () => {
    const picture = view(play([0, 1, 2, 3, 8, 5, 6, 7, 4]))

    assert.equal(picture.announcement, 'X wins')
    assert.deepEqual(picture.cells, [
      { index: 0, mark: 'X', winning: true },
      { index: 1, mark: 'O', winning: false },
      { index: 2, mark: 'X', winning: true },
      { index: 3, mark: 'O', winning: false },
      { index: 4, mark: 'X', winning: true },
      { index: 5, mark: 'O', winning: false },
      { index: 6, mark: 'X', winning: true },
      { index: 7, mark: 'O', winning: false },
      { index: 8, mark: 'X', winning: true },
    ])
  })
})

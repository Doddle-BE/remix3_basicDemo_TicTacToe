const tape: unique symbol = Symbol('tic-tac-toe')

const GRID: readonly [
  readonly [Cell, Cell, Cell],
  readonly [Cell, Cell, Cell],
  readonly [Cell, Cell, Cell],
] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

const LINES: readonly (readonly [Cell, Cell, Cell])[] = [
  GRID[0],
  GRID[1],
  GRID[2],
  [GRID[0][0], GRID[1][0], GRID[2][0]],
  [GRID[0][1], GRID[1][1], GRID[2][1]],
  [GRID[0][2], GRID[1][2], GRID[2][2]],
  [GRID[0][0], GRID[1][1], GRID[2][2]],
  [GRID[0][2], GRID[1][1], GRID[2][0]],
]

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Mark = 'X' | 'O'

export type CellView =
  | { readonly index: Cell; readonly mark: null }
  | { readonly index: Cell; readonly mark: Mark; readonly winning: boolean }

export interface BoardView {
  readonly cells: readonly [
    CellView,
    CellView,
    CellView,
    CellView,
    CellView,
    CellView,
    CellView,
    CellView,
    CellView,
  ]
  readonly announcement: string
}

export type Game = { readonly [tape]: readonly Cell[] }

type Marks = readonly [
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
  Mark | null,
]

interface Reading {
  readonly marks: Marks
  readonly winningCells: ReadonlySet<Cell>
  readonly announcement: string
  readonly isOver: boolean
}

export function start(): Game {
  return seal([])
}

export function place(game: Game, cell: Cell): Game {
  const reading = replay(game[tape])
  if (reading.isOver) {
    return game
  }
  if (reading.marks[cell] !== null) {
    return game
  }
  return seal([...game[tape], cell])
}

export function view(game: Game): BoardView {
  const reading = replay(game[tape])
  return {
    cells: [
      cellAt(0, reading),
      cellAt(1, reading),
      cellAt(2, reading),
      cellAt(3, reading),
      cellAt(4, reading),
      cellAt(5, reading),
      cellAt(6, reading),
      cellAt(7, reading),
      cellAt(8, reading),
    ],
    announcement: reading.announcement,
  }
}

function replay(moves: readonly Cell[]): Reading {
  const marks = marksFor(moves)
  const winningCells = winningCellsFor(moves, marks)
  if (winningCells.size > 0) {
    return {
      marks,
      winningCells,
      announcement: `${markAt(moves.length - 1)} wins`,
      isOver: true,
    }
  }
  if (moves.length === 9) {
    return {
      marks,
      winningCells,
      announcement: 'Draw',
      isOver: true,
    }
  }
  return {
    marks,
    winningCells,
    announcement: `${markAt(moves.length)}'s turn`,
    isOver: false,
  }
}

function marksFor(moves: readonly Cell[]): Marks {
  return moves.reduce(applyMove, emptyMarks())
}

function applyMove(marks: Marks, cell: Cell, moveIndex: number): Marks {
  return withMark(marks, cell, markAt(moveIndex))
}

function withMark(marks: Marks, index: Cell, mark: Mark): Marks {
  const next: [
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
    Mark | null,
  ] = [
    marks[0],
    marks[1],
    marks[2],
    marks[3],
    marks[4],
    marks[5],
    marks[6],
    marks[7],
    marks[8],
  ]
  next[index] = mark
  return next
}

function emptyMarks(): Marks {
  return [null, null, null, null, null, null, null, null, null]
}

function winningCellsFor(moves: readonly Cell[], marks: Marks): ReadonlySet<Cell> {
  const winning = new Set<Cell>()
  if (moves.length < 5) {
    return winning
  }
  const lastCell = moves[moves.length - 1]
  const lastMark = markAt(moves.length - 1)
  for (const line of LINES) {
    if (!line.includes(lastCell)) {
      continue
    }
    if (!line.every((cell) => marks[cell] === lastMark)) {
      continue
    }
    for (const cell of line) {
      winning.add(cell)
    }
  }
  return winning
}

function cellAt(index: Cell, reading: Reading): CellView {
  const mark = reading.marks[index]
  if (mark === null) {
    return { index, mark: null }
  }
  return { index, mark, winning: reading.winningCells.has(index) }
}

function seal(moves: readonly Cell[]): Game {
  return { [tape]: moves }
}

function markAt(moveIndex: number): Mark {
  if (moveIndex % 2 === 0) {
    return 'X'
  }
  return 'O'
}

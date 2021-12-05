import fs from 'fs'

const TXT = fs.readFileSync('Day_4/input.txt', { encoding: 'utf8' })

const INPUT = TXT.split('\n\n').map(str => str.split('\n'))

let boardRows = []

for (const ting of INPUT) {
  const rows = ting.map(str =>
    str
      .split(' ')
      .filter(s => s !== '')
      .map(s => +s)
  )
  boardRows.push(rows)
}

let boardColumns = []

for (const rows of boardRows) {
  const columns = convertToColumns(rows)
  boardColumns.push(columns)
}

let boards = boardRows.map((rows, i) => ({
  rows,
  columns: boardColumns[i]
}))

const NUMS_TO_BE_DRAWN = [
  37, 60, 87, 13, 34, 72, 45, 49, 61, 27, 97, 88, 50, 30, 76, 40, 63, 9, 38, 67, 82, 6, 59, 90, 99,
  54, 11, 66, 98, 23, 64, 14, 18, 4, 10, 89, 46, 32, 19, 5, 1, 53, 25, 96, 2, 12, 86, 58, 41, 68,
  95, 8, 7, 3, 85, 70, 35, 55, 77, 44, 36, 51, 15, 52, 56, 57, 91, 16, 71, 92, 84, 17, 33, 29, 47,
  75, 80, 39, 83, 74, 73, 65, 78, 69, 21, 42, 31, 93, 22, 62, 24, 48, 81, 0, 26, 43, 20, 28, 94, 79
]
const BOARD_SIZE = 5

let lastNumDrawn
let winningBoard

for (const number of NUMS_TO_BE_DRAWN) {
  boards.forEach(board => {
    board.rows = board.rows.map(row => row.map(num => (num === number ? 'x' : num)))
    board.columns = board.columns.map(column => column.map(num => (num === number ? 'x' : num)))
  })

  for (let i = 0; i < BOARD_SIZE; i++) {
    winningBoard = boards.find(
      board =>
        board.rows[i].filter(num => num === 'x').length === BOARD_SIZE ||
        board.columns[i].filter(num => num === 'x').length === BOARD_SIZE
    )
    if (winningBoard) {
      break
    }
  }

  if (winningBoard) {
    lastNumDrawn = number
    break
  }
}

const unmarkedNums = winningBoard.rows.map(row => row.filter(num => num !== 'x')).flat()
const sumOfUnmarkedNums = unmarkedNums.reduce((prev, curr) => prev + curr)

const finalScore = sumOfUnmarkedNums * lastNumDrawn

console.log('Part 1: ', finalScore)

function convertToColumns(array) {
  return array[0].map((col, i) => array.map(row => row[i]))
}

for (const number of NUMS_TO_BE_DRAWN) {
  boards.forEach(board => {
    board.rows = board.rows.map(row => row.map(num => (num === number ? 'x' : num)))
    board.columns = board.columns.map(column => column.map(num => (num === number ? 'x' : num)))
  })

  if (boards.length > 1) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      boards = boards.filter(
        board =>
          !(
            board.rows[i].filter(num => num === 'x').length === BOARD_SIZE ||
            board.columns[i].filter(num => num === 'x').length === BOARD_SIZE
          )
      )
    }
  } else {
    break
  }

  lastNumDrawn = number
}

const lastBoard = boards[0]

let loser

for (const number of NUMS_TO_BE_DRAWN) {
  lastBoard.rows = lastBoard.rows.map(row => row.map(num => (num === number ? 'x' : num)))
  lastBoard.columns = lastBoard.columns.map(column =>
    column.map(num => (num === number ? 'x' : num))
  )

  for (let i = 0; i < BOARD_SIZE; i++) {
    loser =
      lastBoard.rows[i].filter(num => num === 'x').length === BOARD_SIZE ||
      lastBoard.columns[i].filter(num => num === 'x').length === BOARD_SIZE
    if (loser) {
      break
    }
  }

  if (loser) {
    lastNumDrawn = number
    break
  }
}

const unmarkedNumsL = lastBoard.rows.map(row => row.filter(num => num !== 'x')).flat()
const sumOfUnmarkedNumsL = unmarkedNumsL.reduce((prev, curr) => prev + curr)

const finalScoreL = sumOfUnmarkedNumsL * lastNumDrawn

console.log('Part 2: ', finalScoreL)

// That was horrible

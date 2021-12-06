import fs from 'fs'

const TXT = fs.readFileSync('Day_5/input.txt', { encoding: 'utf8' })

const lines = TXT.split('\n')
  .map(str => str.split(' -> '))
  .map(arr => ({
    from: arr[0].split(',').map(str => +str),
    to: arr[1].split(',').map(str => +str)
  }))

function removeObliqueLines(lines) {
  return lines.filter(line => line.from[0] === line.to[0] || line.from[1] === line.to[1])
}

function createGrid(lines) {
  const xValues = lines.map(line => [line.from[0], line.to[0]]).flat()
  const yValues = lines.map(line => [line.from[1], line.to[1]]).flat()
  const width = Math.max(...xValues) + 1
  const height = Math.max(...yValues) + 1

  let x = new Array(height)
  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(width).fill(0)
  }
  return x
}

function getStraightLineArray(line, axis) {
  const start = Math.min(line.from[axis], line.to[axis])
  const end = Math.max(line.from[axis], line.to[axis])

  let flatLine = []
  for (let i = start; i <= end; i++) {
    flatLine.push(i)
  }
  return flatLine
}

function fillGrid(grid, lines) {
  let newGrid = grid.map(row => row.slice())
  for (const line of lines) {
    const isHorizontal = line.from[1] === line.to[1]
    const isVertical = line.from[0] === line.to[0]

    if (isHorizontal) {
      const rowIndex = line.from[1]
      const columnIndeces = getStraightLineArray(line, 0)

      for (const col of columnIndeces) {
        newGrid[rowIndex][col] += 1
      }
    } else if (isVertical) {
      const colIndex = line.from[0]
      const rowIndeces = getStraightLineArray(line, 1)

      for (const row of rowIndeces) {
        newGrid[row][colIndex] += 1
      }
    } else {
      const coordinatesArr = getObliqueLineArray(line)
      for (const pos of coordinatesArr) {
        newGrid[pos.y][pos.x] += 1
      }
    }
  }
  return newGrid
}

function getObliqueLineArray(line = { from: [8, 0], to: [0, 8] }) {
  const xRising = line.from[0] < line.to[0]
  const yRising = line.from[1] < line.to[1]
  let newLine = []
  if (xRising && !yRising) {
    let j = 0
    for (let i = line.from[0]; i <= line.to[0]; i++) {
      newLine.push({
        x: i,
        y: line.from[1] - j
      })
      j++
    }
  } else if (!xRising && yRising) {
    let j = 0
    for (let i = line.from[1]; i <= line.to[1]; i++) {
      newLine.push({
        x: line.from[0] - j,
        y: i
      })
      j++
    }
  } else if (xRising && yRising) {
    let j = 0
    for (let i = line.from[0]; i <= line.to[0]; i++) {
      newLine.push({
        x: i,
        y: line.from[1] + j
      })
      j++
    }
  } else if (!xRising && !yRising) {
    let j = 0
    for (let i = line.from[0]; i >= line.to[0]; i--) {
      newLine.push({
        x: i,
        y: line.from[1] - j
      })
      j++
    }
  }
  return newLine
}

const straightLines = removeObliqueLines(lines)
const grid = createGrid(straightLines)
const filledGrid = fillGrid(grid, straightLines)

const overlaps = filledGrid.flat().filter(num => num > 1).length

console.log('Part 1: ', overlaps)

const grid2 = createGrid(lines)
const filledGrid2 = fillGrid(grid2, lines)
const overlaps2 = filledGrid2.flat().filter(num => num > 1).length

console.log('Part 2: ', overlaps2)

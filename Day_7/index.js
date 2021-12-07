import fs from 'fs'

const TXT = fs.readFileSync('Day_7/test.txt', { encoding: 'utf8' })
const initialState = TXT.split(',').map(s => +s)

function findMedian(arr = []) {
  const sorted = arr.slice().sort((a, b) => {
    return a - b
  })
  if (sorted.length % 2 === 0) {
    const first = sorted[sorted.length / 2 - 1]
    const second = sorted[sorted.length / 2]
    return (first + second) / 2
  } else {
    const mid = Math.floor(sorted.length / 2)
    return sorted[mid]
  }
}

const bestPosition1 = findMedian(initialState)

const fuelConsumption1 = initialState.reduce((prev, curr, i) => {
  return i === 1
    ? Math.abs(prev - bestPosition1) + Math.abs(curr - bestPosition1)
    : prev + Math.abs(curr - bestPosition1)
})

console.log('Part 1: ', fuelConsumption1)

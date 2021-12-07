import fs from 'fs'

const TXT = fs.readFileSync('Day_7/input.txt', { encoding: 'utf8' })
const initialState = TXT.split(',').map(s => +s)

function findMedian(arr) {
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

function findMeanIsh(arr) {
  return Math.floor(arr.reduce((a, b) => a + b) / arr.length)
}

const bestPosition2 = findMeanIsh(initialState)
const fuelConsumption2 = initialState.reduce((prev, curr, index) => {
  let prevFuelConsumption = 0
  if (index == 1) {
    const distancePrev = Math.abs(prev - bestPosition2)
    for (let i = 0; i < distancePrev; i++) {
      prevFuelConsumption += distancePrev - i
    }
  }
  const distance = Math.abs(curr - bestPosition2)
  let currFuelConsumption = 0
  for (let i = 0; i < distance; i++) {
    currFuelConsumption += distance - i
  }

  return index === 1 ? prevFuelConsumption + currFuelConsumption : prev + currFuelConsumption
})

console.log('Part 2: ', fuelConsumption2)

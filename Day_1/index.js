import fs from 'fs'

const TXT = fs.readFileSync('Day_1/input.txt', { encoding: 'utf8' })

const INPUT = TXT.split('\n').map(str => +str)

function getNumOfIncreases(array) {
  let numOfIncreases = 0
  for (const [i, num] of array.entries()) {
    if (num < array[i + 1]) {
      numOfIncreases++
    }
  }
  return numOfIncreases
}

console.log('Part 1: ', getNumOfIncreases(INPUT))

let sums = []
for (let i = 0; i < INPUT.length - 1; i++) {
  if (INPUT[i] && INPUT[i + 1] && INPUT[i + 2]) {
    const sum = INPUT[i] + INPUT[i + 1] + INPUT[i + 2]
    sums.push(sum)
  }
}

console.log('Part 2: ', getNumOfIncreases(sums))

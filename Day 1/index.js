import fs from 'fs'

const TXT = fs.readFileSync('input.txt', { encoding: 'utf8' })

const INPUT = TXT.split('\n').map(str => +str)

let numOfIncreases = 0

for (const [i, num] of INPUT.entries()) {
  if (num < INPUT[i + 1]) {
    numOfIncreases++
  }
}

console.log('result: ', numOfIncreases)

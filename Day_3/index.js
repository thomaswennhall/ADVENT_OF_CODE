import fs from 'fs'

const TXT = fs.readFileSync('Day_3/input.txt', { encoding: 'utf8' })

const INPUT = TXT.split('\n').map(str => str.split(''))

function oneBinaryDigit(columnArray) {
  let num1s = 0
  let num0s = 0

  for (const num of columnArray) {
    if (num === '1') {
      num1s++
    } else {
      num0s++
    }
  }
  return num1s > num0s ? '1' : '0'
}

function oneBinaryNumber(arrayOfColumns) {
  let binaryNumber = []

  for (const column of arrayOfColumns) {
    binaryNumber.push(oneBinaryDigit(column))
  }
  return binaryNumber.join('')
}

function convertToColumns(array) {
  return array[0].map((col, i) => array.map(row => row[i]))
}

function getAnswer(array) {
  const columns = convertToColumns(array)
  const gammaBinary = oneBinaryNumber(columns)
  const epsilonBinary = gammaBinary
    .split('')
    .map(d => (d === '0' ? '1' : '0'))
    .join('')
  return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2)
}

const answer = getAnswer(INPUT)

console.log('Part 1: ', answer)

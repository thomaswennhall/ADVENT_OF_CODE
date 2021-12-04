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
  return num1s >= num0s ? '1' : '0'
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

function getPC(array) {
  const columns = convertToColumns(array)
  const gammaBinary = oneBinaryNumber(columns)
  const epsilonBinary = gammaBinary
    .split('')
    .map(d => (d === '0' ? '1' : '0'))
    .join('')
  return parseInt(gammaBinary, 2) * parseInt(epsilonBinary, 2)
}

const powerConsumption = getPC(INPUT)

console.log('Part 1: ', powerConsumption)

function getOG(rows) {
  let columns = convertToColumns(rows)

  for (let i = 0; i < columns.length; i++) {
    let mostCommon = oneBinaryDigit(columns[i])

    rows = rows.filter(row => row[i] === mostCommon)
    columns = convertToColumns(rows)
    if (rows.length === 1) break
  }

  const binary = rows[0].join('')
  const oxygen_generator = parseInt(binary, 2)
  return oxygen_generator
}

function getC02SR(rows) {
  let columns = convertToColumns(rows)

  for (let i = 0; i < columns.length; i++) {
    let leastCommon = oneBinaryDigit(columns[i]) === '1' ? '0' : '1'

    rows = rows.filter(row => row[i] === leastCommon)
    columns = convertToColumns(rows)
    if (rows.length === 1) break
  }

  const binary = rows[0].join('')
  const CO2_scrubber_rating = parseInt(binary, 2)
  return CO2_scrubber_rating
}

const OG = getOG(INPUT)
const C02 = getC02SR(INPUT)
const lifeSupportRating = OG * C02

console.log('Part 2: ', lifeSupportRating)

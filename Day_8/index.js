import fs from 'fs'

const TXT = fs.readFileSync('Day_8/input.txt', { encoding: 'utf8' })
const data = TXT.split('\n').map(row => row.split(' | ').map(str => str.split(' ')))

//const input = data.map(row => row[0])
const output = data.map(row => row[1])

// 1: 2
// 4: 4
// 7: 3
// 8: 7

function is147or8(str) {
  return str.length === 2 || str.length === 4 || str.length === 3 || str.length === 7
}

function find1478or8(array) {
  const allDigits = array.flat()
  const only147or8 = allDigits.filter(str => is147or8(str))
  return only147or8.length
}

console.log('Part 1: ', find1478or8(output))

import fs from 'fs'

const TXT = fs.readFileSync('Day_8/input.txt', { encoding: 'utf8' })
const data = TXT.split('\n').map(row => row.split(' | ').map(str => str.split(' ')))

const output = data.map(row => row[1])

function is147or8(str) {
  return str.length === 2 || str.length === 4 || str.length === 3 || str.length === 7
}

function find1478or8(array) {
  const allDigits = array.flat()
  const only147or8 = allDigits.filter(str => is147or8(str))
  return only147or8.length
}

console.log('Part 1: ', find1478or8(output))

function decryptInput(array) {
  let inputArray = [...array]
  const display = {
    top: '',
    top_left: '',
    top_right: '',
    middle: '',
    bottom_left: '',
    bottom_right: '',
    bottom: ''
  }

  // UNIQUE LENGTHS = (2, 3, 4, 7)
  const letters_1 = inputArray.find(str => str.length === 2).split('')
  inputArray = inputArray.filter(str => str !== letters_1.join(''))

  const letters_4 = inputArray.find(str => str.length === 4).split('')
  inputArray = inputArray.filter(str => str !== letters_4.join(''))

  const letters_7 = inputArray.find(str => str.length === 3).split('')
  inputArray = inputArray.filter(str => str !== letters_7.join(''))

  const letters_8 = inputArray.find(str => str.length === 7).split('')
  inputArray = inputArray.filter(str => str !== letters_8.join(''))

  // LENGTH = 5
  const letters_3 = inputArray
    .find(str => str.length === 5 && str.includes(letters_1[0]) && str.includes(letters_1[1]))
    .split('')
  inputArray = inputArray.filter(str => str !== letters_3.join(''))

  const letters_5 = inputArray
    .find(str => str.length === 5 && letters_4.filter(s => str.split('').includes(s)).length === 3)
    .split('')

  inputArray = inputArray.filter(str => str !== letters_5.join(''))

  const letters_2 = inputArray.find(str => str.length === 5).split('')
  inputArray = inputArray.filter(str => str !== letters_2.join(''))

  display.top = letters_7.find(str => !letters_1.includes(str))
  display.top_right = letters_2.find(str => letters_1.find(s => s === str))

  // LENGTH = 6
  const letters_6 = inputArray.find(str => !str.split('').includes(display.top_right)).split('')
  inputArray = inputArray.filter(str => str !== letters_6.join(''))

  const letters_9 = inputArray
    .find(str => letters_3.filter(s => str.split('').includes(s)).length === 5)
    .split('')
  inputArray = inputArray.filter(str => str !== letters_9.join(''))

  const letters_0 = inputArray[0].split('')

  return [
    letters_0.sort().join(''),
    letters_1.sort().join(''),
    letters_2.sort().join(''),
    letters_3.sort().join(''),
    letters_4.sort().join(''),
    letters_5.sort().join(''),
    letters_6.sort().join(''),
    letters_7.sort().join(''),
    letters_8.sort().join(''),
    letters_9.sort().join('')
  ]
}

function decryptDigit(string, config) {
  const digitString = string.split('').sort().join('')
  return config.indexOf(digitString)
}

function decryptOutput(output, config) {
  let digits = ''
  output.forEach(op => {
    digits += decryptDigit(op, config)
  })
  return +digits
}

let sumOfDigits = 0
for (let i = 0; i < data.length; i++) {
  const [input, output] = data[i]
  const config = decryptInput(input)
  const digits = decryptOutput(output, config)
  sumOfDigits += digits
}

console.log('Part 2: ', sumOfDigits)

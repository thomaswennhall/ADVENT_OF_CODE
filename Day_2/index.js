import fs from 'fs'

const TXT = fs.readFileSync('Day_2/input.txt', { encoding: 'utf8' })

const INPUT = TXT.split('\n').map(str => ({
  direction: str.split(' ')[0],
  value: +str.split(' ')[1]
}))

const configArr = {
  up: ['depth', -1],
  down: ['depth', 1],
  forward: ['horizontal', 1]
}

function getTotalPerDirection(array) {
  const position = {
    depth: 0,
    horizontal: 0
  }

  for (const obj of array) {
    const operatorArr = configArr[obj.direction] //=> [depth: 1]
    position[operatorArr[0]] += operatorArr[1] * obj.value
  }
  return position
}

const positionObj = getTotalPerDirection(INPUT)
const answer = positionObj.depth * positionObj.horizontal

console.log('Part 1: ', answer)

const configWithAim = {
  up: ['aim', -1],
  down: ['aim', 1],
  forward: ['horizontal', 1]
}

function getTotalWithAim(array) {
  const position = {
    depth: 0,
    horizontal: 0,
    aim: 0
  }

  for (const obj of array) {
    const operatorArr = configWithAim[obj.direction] //=> ['aim': 1]
    if (operatorArr[0] === 'aim') {
      position[operatorArr[0]] += operatorArr[1] * obj.value
    } else {
      position.horizontal += obj.value
      position.depth += obj.value * position.aim * operatorArr[1]
    }
  }
  return position
}

const position2 = getTotalWithAim(INPUT)
const answer2 = position2.horizontal * position2.depth
console.log('Part 2: ', answer2)

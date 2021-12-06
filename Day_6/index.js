import fs from 'fs'

const TXT = fs.readFileSync('Day_6/input.txt', { encoding: 'utf8' })
const initialState = TXT.split(',').map(s => +s)

function reproduce1(days) {
  let result = [...initialState]
  for (let i = 0; i < days; i++) {
    const givingBirth = result.filter(num => num === 0)

    result = result.map(num => (num === 0 ? 6 : num - 1))

    for (let j = 0; j < givingBirth.length; j++) {
      result.push(8)
    }
  }
  return result.length
}

function reproduce2(days) {
  let fishMap = new Array(9).fill(0)
  initialState.forEach(fish => {
    fishMap[fish] += 1
  })
  for (let i = 0; i < days; i++) {
    const dueDateFishes = fishMap[0]
    fishMap[0] = fishMap[1]
    fishMap[1] = fishMap[2]
    fishMap[2] = fishMap[3]
    fishMap[3] = fishMap[4]
    fishMap[4] = fishMap[5]
    fishMap[5] = fishMap[6]
    fishMap[6] = fishMap[7] + dueDateFishes
    fishMap[7] = fishMap[8]
    fishMap[8] = dueDateFishes
  }
  return fishMap.reduce((tot, curr) => tot + curr)
}

console.log('Part 1: ', reproduce1(80))
console.log('Part 2: ', reproduce2(256))

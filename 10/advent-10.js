const fs = require('fs')

function solution(data) {
  // *** Part 1
  // data.sort((a, b) => a - b)
  // let count1j = 1
  // let count3j = 1
  // for (let i = 1; i < data.length; i++) {
  //   if (data[i] - data[i - 1] === 1) {
  //     count1j++
  //   } else if (data[i] - data[i - 1] === 3) {
  //     count3j++
  //   }
  // }
  // return count1j * count3j

  // *** Part 2
  data.push(0)
  data.sort((a, b) => a - b)
  const variantsMap = new Map()
  variantsMap.set(0, 1)
  variantsMap.set(1, 1)
  let val = 1
  for (let i = 2; i < data.length; i++) {
    for (let j = 1; j <= Math.min(3, i); j++) {
      if (data[i] - data[i - j] < 3 && data[i] - data[i - j - 1] <= 3) {
        val += variantsMap.get(i - j - 1)
      }
    }
    variantsMap.set(i, val)
  }

  return val
}

const data = fs
  .readFileSync('advent-10-input.txt', 'utf8')
  .split('\n')
  .map((x) => +x)

console.log(solution(data))

const fs = require('fs')

function solution(data) {
  for (let i = 0; i < data.length - 2; i++) {
    for (let j = 1; j < data.length - 1; j++) {
      for (let k = 2; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          return data[i] * data[j] * data[k]
        }
      }
    }
  }
  return 0
}

const data = fs
  .readFileSync('advent-01-input.txt', 'utf8')
  .split('\n')
  .map((el) => parseInt(el))

console.log(solution(data))

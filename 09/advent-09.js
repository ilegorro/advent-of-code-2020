const fs = require('fs')

function solution(data) {
  const matrix = []
  const countNumbers = 25
  let invalidNumber = -1

  // *** Part 1
  for (let i = 0; i < countNumbers - 1; i++) {
    const rowSums = []
    for (let j = i + 1; j < countNumbers; j++) {
      rowSums.push(data[i] + data[j])
    }
    matrix.push(rowSums)
  }

  let allSums = matrix.flat()

  for (let i = countNumbers; i < data.length; i++) {
    if (allSums.indexOf(data[i]) === -1) {
      invalidNumber = data[i]
      break
    }
    // remove first sums row
    matrix.shift()
    // add last sum to each row
    for (let j = 0; j < countNumbers - 2; j++) {
      matrix[j].push(data[i] + data[i - countNumbers + j + 1])
    }
    //add last row
    matrix.push([data[i] + data[i - 1]])
    allSums = matrix.flat()
  }
  //return invalidNumber

  // *** Part 2
  for (let i = 0; i < data.length - 1; i++) {
    let sum = data[i]
    let minNumber = data[i]
    let maxNumber = data[i]
    let result = -1
    for (let j = i + 1; j < data.length - 1; j++) {
      minNumber = Math.min(minNumber, data[j])
      maxNumber = Math.max(maxNumber, data[j])
      sum += data[j]
      if (sum === invalidNumber) {
        result = minNumber + maxNumber
        break
      } else if (sum > invalidNumber) {
        break
      }
    }
    if (result !== -1) {
      return result
    }
  }

  return -1
}

const data = fs
  .readFileSync('advent-09-input.txt', 'utf8')
  .split('\n')
  .map((x) => +x)

console.log(solution(data))

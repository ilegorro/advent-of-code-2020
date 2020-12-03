const fs = require('fs')

function solution(data, downShift, rightShift) {
  const rows = data.length
  const columns = data[0].length
  let currentColumn = 1
  let trees = 0

  for (let i = downShift + 1; i <= rows; i += downShift) {
    currentColumn += rightShift
    currentColumn =
      currentColumn > columns ? currentColumn - columns : currentColumn
    currentSymbol = data[i - 1][currentColumn - 1]
    if (currentSymbol === '#') {
      trees++
    }
    // console.log(`row: ${i}, col: ${currentColumn}, symb: ${currentSymbol}`)
  }

  return trees
}

const data = fs
  .readFileSync('advent-03-input.txt', 'utf8')
  .split('\n')
  .map((el) => {
    return el.split('')
  })

const dataParams = [
  { rightShift: 1, downShift: 1 },
  { rightShift: 3, downShift: 1 },
  { rightShift: 5, downShift: 1 },
  { rightShift: 7, downShift: 1 },
  { rightShift: 1, downShift: 2 }
]

let answer = 1
for (const param of dataParams) {
  const result = solution(data, param.downShift, param.rightShift)
  console.log(`down=${param.downShift}, right=${param.rightShift} : ${result}`)
  answer *= result
}

console.log(answer)

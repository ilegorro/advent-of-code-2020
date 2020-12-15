const fs = require('fs')

function solution(data) {
  let highestId = 0
  let lowestId = 1000
  let ids = []
  let mySeatId = 0

  for (const seatCode of data) {
    // find row
    let rowLow = 0
    let rowHigh = 127
    for (let index = 0; index < 7; index++) {
      const halfRow = (rowHigh - rowLow + 1) / 2
      if (seatCode[index] === 'F') {
        rowHigh = rowHigh - halfRow
      } else {
        rowLow = rowLow + halfRow
      }
    }

    // find column
    let colLow = 0
    let colHigh = 7
    for (let index = 7; index < 10; index++) {
      const halfCol = (colHigh - colLow + 1) / 2
      if (seatCode[index] === 'L') {
        colHigh = colHigh - halfCol
      } else {
        colLow = colLow + halfCol
      }
    }

    // calculate id
    const seatId = rowLow * 8 + colLow
    ids.push(seatId)
    highestId = Math.max(seatId, highestId)
    lowestId = Math.min(seatId, lowestId)
  }

  // find my seat
  for (let index = lowestId + 1; index < highestId; index++) {
    if (ids.indexOf(index) === -1) {
      mySeatId = index
      break
    }
  }
  //return highestId // *** Part 1
  return mySeatId // *** Part 2
}

const data = fs.readFileSync('advent-05-input.txt', 'utf8').split('\n')
console.log(solution(data))

const fs = require('fs')

function solution(data) {
  let noChanges = false
  let dataNext
  const dataLength = data.length
  let iterations = 0

  while (!noChanges) {
    iterations++
    noChanges = true
    dataNext = []
    for (let i = 0; i < dataLength; i++) {
      const dataLine = []
      const strLength = data[i].length

      for (let j = 0; j < strLength; j++) {
        let occupied = false
        let occupations = 0

        for (let x = j + 1; x < strLength; x++) {
          //right
          if (data[i][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[i][x] !== '.') {
            break
          }
        }
        for (let x = j + 1; x < strLength; x++) {
          //right and up
          const newIU = i - (x - j)
          if (newIU < 0) {
            break
          }
          if (data[newIU][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[newIU][x] !== '.') {
            break
          }
        }
        for (let x = j + 1; x < strLength; x++) {
          //right and down
          const newID = i + (x - j)
          if (newID >= dataLength) {
            break
          }
          if (data[newID][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[newID][x] !== '.') {
            break
          }
        }

        for (let x = j - 1; x >= 0; x--) {
          //left
          if (data[i][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[i][x] !== '.') {
            break
          }
        }
        for (let x = j - 1; x >= 0; x--) {
          //left and up
          const newIU = i - (j - x)
          if (newIU < 0) {
            break
          }
          if (data[newIU][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[newIU][x] !== '.') {
            break
          }
        }

        for (let x = j - 1; x >= 0; x--) {
          //left and down
          const newID = i + (j - x)
          if (newID >= dataLength) {
            break
          }
          if (data[newID][x] === '#') {
            occupied = true
            occupations++
          }
          if (data[newID][x] !== '.') {
            break
          }
        }

        // down
        for (let x = i + 1; x < dataLength; x++) {
          if (data[x][j] === '#') {
            occupied = true
            occupations++
          }
          if (data[x][j] !== '.') {
            break
          }
        }

        //up
        for (let x = i - 1; x >= 0; x--) {
          if (data[x][j] === '#') {
            occupied = true
            occupations++
          }
          if (data[x][j] !== '.') {
            break
          }
        }

        if (data[i][j] === 'L') {
          // *** Part 1
          // const noOccupations =
          //   (i === 0 || data[i - 1][j] !== '#') &&
          //   (i === 0 || j === 0 || data[i - 1][j - 1] !== '#') &&
          //   (i === 0 || j === strLength - 1 || data[i - 1][j + 1] !== '#') &&
          //   (j === 0 || data[i][j - 1] !== '#') &&
          //   (j === strLength - 1 || data[i][j + 1] !== '#') &&
          //   (i === dataLength - 1 || data[i + 1][j] !== '#') &&
          //   (i === dataLength - 1 || j === 0 || data[i + 1][j - 1] !== '#') &&
          //   (i === dataLength - 1 ||
          //     j === strLength - 1 ||
          //     data[i + 1][j + 1] !== '#')
          // if (noOccupations) {
          //   dataLine.push('#')
          //   noChanges = false
          // } else {
          //   dataLine.push('L')
          // }

          // *** Part 2

          if (!occupied) {
            dataLine.push('#')
            noChanges = false
          } else {
            dataLine.push('L')
          }
        } else if (data[i][j] === '#') {
          // *** Part 1
          // const numberOfOccupations =
          //   +(i > 0 && data[i - 1][j] === '#') +
          //   (i > 0 && j > 0 && data[i - 1][j - 1] === '#') +
          //   (i > 0 && j < strLength - 1 && data[i - 1][j + 1] === '#') +
          //   (j > 0 && data[i][j - 1] === '#') +
          //   (j < strLength - 1 && data[i][j + 1] === '#') +
          //   (i < dataLength - 1 && data[i + 1][j] === '#') +
          //   (i < dataLength - 1 && j > 0 && data[i + 1][j - 1] === '#') +
          //   (i < dataLength - 1 &&
          //     j < strLength - 1 &&
          //     data[i + 1][j + 1] === '#')
          // if (numberOfOccupations >= 4) { // *** Part 1

          // *** Part 2
          if (occupations >= 5) {
            dataLine.push('L')
            noChanges = false
          } else {
            dataLine.push('#')
          }
        } else {
          dataLine.push('.')
        }
      }
      dataNext.push(dataLine)
    }
    data = dataNext.map((x) => {
      return [...x]
    })
  }

  let occCounter = 0
  data.forEach((row) => {
    row.forEach((el) => {
      if (el === '#') {
        occCounter++
      }
    })
  })

  console.log(iterations)
  return occCounter
}

const data = fs
  .readFileSync('advent-11-input.txt', 'utf8')
  .split('\n')
  .map((el) => {
    return el.split('')
  })

console.log(solution(data))

const fs = require('fs')

function solution(data) {
  // *** Part 1
  // const timestamp = +data[0]
  // let timeDeparture, result
  // const busses = data[1]
  //   .split(',')
  //   .filter((el) => el !== 'x')
  //   .map((el) => +el)

  // for (let i = 1; i <= busses[0]; i++) {
  //   timeDeparture = timestamp + i
  //   for (const busId of busses) {
  //     if (timeDeparture % busId === 0) {
  //       result = i * busId
  //       break
  //     }
  //   }
  //   if (result) {
  //     break
  //   }
  // }
  // return result

  // *** Part 2
  let result
  const busses = data[1].split(',').map((el) => (el === 'x' ? 'x' : +el))
  let gap = busses[0]
  let bussesInRow = 1

  for (let i = busses[0]; i < Number.MAX_SAFE_INTEGER; i += gap) {
    failCombination = false
    for (let j = bussesInRow; j < busses.length; j++) {
      if (busses[j] !== 'x') {
        if ((i + j) % busses[j] !== 0) {
          failCombination = true
          break
        } else {
          gap = i
          bussesInRow = j + 1
        }
      }
    }

    if (!failCombination) {
      result = i
      break
    }
    // if (i % 100000000 === 0) {
    //   console.log(i)
    // }
  }

  return result
}

const data = fs.readFileSync('advent-13-input-tmp.txt', 'utf8').split('\n')

console.log(solution(data))

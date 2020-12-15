const fs = require('fs')

function solution(data) {
  // *** Part 1
  // const idxs = []
  // let acc = 0
  // for (let index = 0; index < data.length; index++) {
  //   if (idxs.indexOf(index) !== -1) {
  //     break
  //   } else {
  //     idxs.push(index)
  //     switch (data[index].instruction) {
  //       case 'acc':
  //         acc += data[index].parameter
  //         break
  //       case 'jmp':
  //         index += data[index].parameter - 1
  //         break
  //       default:
  //         break
  //     }
  //   }
  // }
  // return acc

  // *** Part 2
  const idxsToChange = data.reduce((acc, value, idx) => {
    if (
      value.parameter !== 0 &&
      (value.instruction === 'jmp' || value.instruction === 'nop')
    ) {
      acc.push(idx)
    }
    return acc
  }, [])

  let acc = 0
  for (const idx of idxsToChange) {
    const dataTry = data.map((x) => {
      return { instruction: x.instruction, parameter: x.parameter }
    })
    dataTry[idx].instruction =
      dataTry[idx].instruction === 'jmp' ? 'nop' : 'jmp'

    acc = 0
    const idxs = []
    let isLoop = false
    for (let index = 0; index < dataTry.length; index++) {
      if (idxs.indexOf(index) !== -1) {
        isLoop = true
        break
      } else {
        idxs.push(index)
        switch (dataTry[index].instruction) {
          case 'acc':
            acc += dataTry[index].parameter
            break
          case 'jmp':
            index += dataTry[index].parameter - 1
            break
          default:
            break
        }
      }
    }
    if (!isLoop) {
      break
    }
  }

  return acc
}

const data = fs
  .readFileSync('advent-08-input.txt', 'utf8')
  .split('\n')
  .map((el) => {
    const delimiterPosition = el.indexOf(' ')
    const instruction = el.slice(0, delimiterPosition)
    const parameter = +el.slice(delimiterPosition + 1)
    return { instruction, parameter }
  })

console.log(solution(data))

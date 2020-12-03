const fs = require('fs')

function solution(data) {
  let validPasswordsCount = 0
  for (const dataEl of data) {
    //*** part one
    // let symbolCount = 0
    // for (const passwordSymbol of dataEl.password) {
    //   if (passwordSymbol === dataEl.symbol) {
    //     symbolCount++
    //   }
    // }
    // if (symbolCount >= dataEl.minCount && symbolCount <= dataEl.maxCount) {
    //   validPasswordsCount++
    // }

    //*** part two
    if (
      (dataEl.password[dataEl.minCount - 1] === dataEl.symbol ||
        dataEl.password[dataEl.maxCount - 1] === dataEl.symbol) &&
      !(
        dataEl.password[dataEl.minCount - 1] === dataEl.symbol &&
        dataEl.password[dataEl.maxCount - 1] === dataEl.symbol
      )
    ) {
      validPasswordsCount++
    }
  }
  return validPasswordsCount
}

const data = fs
  .readFileSync('advent-02-input.txt', 'utf8')
  .split('\n')
  .map((el) => {
    const posMinus = el.indexOf('-')
    const posColon = el.indexOf(':')
    const posFirstSpace = el.indexOf(' ')
    return {
      minCount: parseInt(el.slice(0, posMinus)),
      maxCount: parseInt(el.slice(posMinus + 1, posFirstSpace)),
      symbol: el.slice(posFirstSpace + 1, posColon),
      password: el.slice(posColon + 2)
    }
  })

console.log(solution(data))

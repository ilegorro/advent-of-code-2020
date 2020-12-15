const fs = require('fs')

function solution(data) {
  let sumOfQuestions = 0
  // *** Part 1
  // for (const group of data) {
  //   let yesQuestions = []
  //   for (const person of group) {
  //     yesQuestions = [...yesQuestions, ...person.split('')]
  //   }
  //   const uniqAnswers = new Set(yesQuestions)
  //   sumOfQuestions += uniqAnswers.size
  // }

  // *** Part 2
  for (const group of data) {
    const yesQuestions = new Map()
    for (const person of group) {
      for (const yesAnswer of person.split('')) {
        if (yesQuestions.has(yesAnswer)) {
          yesQuestions.set(yesAnswer, yesQuestions.get(yesAnswer) + 1)
        } else {
          yesQuestions.set(yesAnswer, 1)
        }
      }
    }
    let groupYesQuestions = 0
    yesQuestions.forEach((value) => {
      if (value === group.length) {
        groupYesQuestions++
      }
    })
    sumOfQuestions += groupYesQuestions
  }

  return sumOfQuestions
}

const data = fs
  .readFileSync('advent-06-input.txt', 'utf8')
  .split('\n\n')
  .map((el) => {
    return el.split('\n')
  })

console.log(solution(data))

const fs = require('fs')

function solution(data) {
  const myBag = 'shiny gold'
  // *** Part 1
  // let containers = new Set()
  // searchBag = function (goal) {
  //   for (const rule of data) {
  //     for (const containEl of rule.bagContain) {
  //       if (containEl.name === goal && !containers.has(rule.bagName)) {
  //         containers.add(rule.bagName)
  //         searchBag(rule.bagName)
  //       }
  //     }
  //   }
  // }
  // searchBag(myBag)
  // return containers.size

  // *** Part 2
  let quantity = 0
  const countBags = function (goal, factor) {
    for (const rule of data) {
      if (rule.bagName === goal) {
        quantity += factor
        for (const el of rule.bagContain) {
          countBags(el.name, el.quantity * factor)
        }
      }
    }
  }
  countBags(myBag, 1)
  return quantity - 1
}

const data = fs
  .readFileSync('advent-07-input.txt', 'utf8')
  .split('\n')
  .map((el) => {
    const delimiterPosition = el.indexOf('contain')
    const key = el
      .slice(0, delimiterPosition - 1)
      .replace('bags', '')
      .trim()

    const value = []
    const valuesAll = el.slice(delimiterPosition + 8).split(',')
    valuesAll.forEach((elValue) => {
      const elValueTmp = elValue
        .replace('bags', '')
        .replace('bag', '')
        .replace('.', '')
        .trim()
      const quantityDelimiter = elValueTmp.indexOf(' ')
      const quantityString = elValueTmp.slice(0, quantityDelimiter)
      const quantity = quantityString === 'no' ? 0 : +quantityString
      const name = elValueTmp.slice(quantityDelimiter + 1)
      value.push({ name, quantity })
    })
    return { bagName: key, bagContain: value }
  })

console.log(solution(data))

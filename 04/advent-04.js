const fs = require('fs')

function solution(data) {
  let validCount = 0
  const validKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  data.forEach((el) => {
    elKeys = Object.keys(el)
    // *** Part 1
    // let isValid = true
    // for (const validKey of validKeys) {
    //   if (elKeys.indexOf(validKey) === -1) {
    //     isValid = false
    //     break
    //   }
    // }
    // *** Part 2
    const hgt_cm = el.hgt ? el.hgt.indexOf('cm') : -1
    const hgt_in = el.hgt ? el.hgt.indexOf('in') : -1
    const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    isValid =
      parseInt(el.byr) >= 1920 &&
      parseInt(el.byr) <= 2002 &&
      parseInt(el.iyr) >= 2010 &&
      parseInt(el.iyr) <= 2020 &&
      parseInt(el.eyr) >= 2020 &&
      parseInt(el.eyr) <= 2030 &&
      ((hgt_cm != -1 &&
        parseInt(el.hgt.slice(0, hgt_cm)) >= 150 &&
        parseInt(el.hgt.slice(0, hgt_cm)) <= 193) ||
        (hgt_in != -1 &&
          parseInt(el.hgt.slice(0, hgt_in)) >= 59 &&
          parseInt(el.hgt.slice(0, hgt_in)) <= 76)) &&
      el.hcl &&
      el.hcl.match(/^#[0-9a-f]{6}$/) != null &&
      eyeColors.indexOf(el.ecl) != -1 &&
      el.pid &&
      el.pid.match(/^[0-9]{9}$/)

    isValid && validCount++
  })
  return validCount
}

const data = fs
  .readFileSync('advent-04-input.txt', 'utf8')
  .split('\n\n')
  .map((el) => {
    let elementFields = []
    const strings = el.split('\n')
    strings.forEach((elString) => {
      elementFields = [...elementFields, ...elString.split(' ')]
    })

    const resultObj = {}
    elementFields.forEach((elField) => {
      const objArr = elField.split(':')
      resultObj[objArr[0]] = objArr[1]
    })

    return resultObj
  })

console.log(solution(data))

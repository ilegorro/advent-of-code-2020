const fs = require('fs')

function solution(data) {
  let direction = 90
  let positionX = 0
  let positionY = 0
  let wpX = 10
  let wpY = 1
  let positionX2 = 0
  let positionY2 = 0
  let tmpwpX
  for (const command of data) {
    const action = command.slice(0, 1)
    const param = +command.slice(1)
    switch (action) {
      case 'N':
        positionY += param
        wpY += param
        break
      case 'S':
        positionY -= param
        wpY -= param
        break
      case 'E':
        positionX += param
        wpX += param
        break
      case 'W':
        positionX -= param
        wpX -= param
        break
      case 'F':
        positionX2 += wpX * param
        positionY2 += wpY * param
        switch (direction) {
          case 0:
            positionY += param
            break
          case 90:
            positionX += param
            break
          case 180:
            positionY -= param
            break
          case 270:
            positionX -= param
            break
          default:
            break
        }
        break
      case 'L':
        direction -= param
        direction = direction < 0 ? direction + 360 : direction
        tmpwpX = wpX
        switch (param) {
          case 90:
            wpX = -wpY
            wpY = tmpwpX
            break
          case 180:
            wpX = -wpX
            wpY = -wpY
            break
          case 270:
            wpX = wpY
            wpY = -tmpwpX
            break
          default:
            break
        }
        break
      case 'R':
        direction += param
        direction = direction >= 360 ? direction - 360 : direction
        tmpwpX = wpX
        switch (param) {
          case 90:
            wpX = wpY
            wpY = -tmpwpX
            break
          case 180:
            wpX = -wpX
            wpY = -wpY
            break
          case 270:
            wpX = -wpY
            wpY = tmpwpX
            break
          default:
            break
        }
        break
      default:
        break
    }
  }

  // return Math.abs(positionX) + Math.abs(positionY) // *** Part 1
  return Math.abs(positionX2) + Math.abs(positionY2) // *** Part 2
}

const data = fs.readFileSync('advent-12-input.txt', 'utf8').split('\n')

console.log(solution(data))

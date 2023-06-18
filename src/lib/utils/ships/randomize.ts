import { getDefaultShips } from '@lib/constants/game/getDefaultShips'
import { isNormalPosition } from './isNormalPosition'

// Функция выставляет корабли случайным образом.
export const randomize = () => {
  const ships = getDefaultShips()

  for (let i = 0; i < 100000; i++) {
    for (const ship of ships) {
      ship.x = Math.floor(Math.random() * 10)
      ship.y = Math.floor(Math.random() * 10)
      ship.direction = ['row', 'column'][Math.floor(Math.random() * 2)] as
        | 'row'
        | 'column'
    }

    if (isNormalPosition(ships)) {
      for (const ship of ships) {
        for (let i = 0; i < ship.length; i++) {
          if (ship.direction === 'row') {
            ship.range.push({
              x: ship.x + i,
              y: ship.y,
              isHitted: false,
            })
          } else {
            ship.range.push({
              x: ship.x,
              y: ship.y + i,
              isHitted: false,
            })
          }
        }
      }
      return ships
    }
  }

  return getDefaultShips()
}

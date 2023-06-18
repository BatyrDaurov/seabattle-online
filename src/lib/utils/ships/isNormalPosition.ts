import { ShipType } from 'types/game-types'
import { isValidCoordinates } from './isValidCoordinates'

/*
	Функция определяет допустимо ли принятое расположение кораблей.
	Принимает массив кораблей.
*/
export const isNormalPosition = (ships: ShipType[]) => {
  const matrix = Array(10)
    .fill(null)
    .map(() => Array(10).fill(0))

  for (const ship of ships) {
    const { direction, length } = ship

    const dx = direction === 'row' ? 1 : 0
    const dy = direction === 'column' ? 1 : 0

    for (let i = 0; i < length; i++) {
      const x = ship.x + i * dx
      const y = ship.y + i * dy

      if (!isValidCoordinates(x, y) || matrix[y][x]) {
        return false
      }
    }

    if (direction === 'row') {
      for (let y = ship.y - 1; y <= ship.y + 1; y++) {
        for (let x = ship.x - 1; x <= ship.x + length; x++) {
          if (isValidCoordinates(x, y)) {
            matrix[y][x] = 1
          }
        }
      }
    } else {
      for (let y = ship.y - 1; y <= ship.y + length; y++) {
        for (let x = ship.x - 1; x <= ship.x + 1; x++) {
          if (isValidCoordinates(x, y)) {
            matrix[y][x] = 1
          }
        }
      }
    }
  }

  return true
}

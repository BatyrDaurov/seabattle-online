import { ShipType } from 'types/game-types'

export const shipCount = (
  ships: ShipType[],
  shipLength: number,
  maxCount: number,
  isEnemyShips?: boolean
) => {
  if (!isEnemyShips) {
    const count = ships
      .filter((ship) => ship.range.every((shot) => shot.isHitted))
      .filter((ship) => ship.length === shipLength).length
    if (count < 1) return maxCount
    const shipCount = maxCount - count

    return count === maxCount ? null : shipCount
  } else {
    const count = ships.filter((ship) => ship.length === shipLength).length
    if (count < 1) return maxCount
    const shipCount = maxCount - count

    return count === maxCount ? null : shipCount
  }
}

import React from 'react'
import useCellSize from '@lib/context/TableCellContext'
import classNames from 'classnames'
import s from './Ship.module.scss'

type Props = {
  x: number
  y: number
  length: number
  direction: 'row' | 'column'
  killed?: boolean
  enemyShips?: boolean
}

export const Ship: React.FC<Props> = (props) => {
  const { x, y, length, direction, killed = false, enemyShips = false } = props
  const { cellSize } = useCellSize()

  const style = React.useMemo(() => {
    const style: React.CSSProperties = {}

    // Длина корабля.
    const along = length * cellSize + length - 1
    // Ширина корабля.
    const across = cellSize

    if (direction === 'row') {
      style.width = `${along}px`
      style.height = `${across}px`
    } else {
      style.width = `${across}px`
      style.height = `${along}px`
    }

    const offsetX = x * cellSize
    const offsetY = y * cellSize

    style.left = `${offsetX}px`
    style.top = `${offsetY}px`

    return style
  }, [cellSize, direction, length, x, y])

  return (
    <div
      className={classNames(s.ship, {
        [s['ship-killed']]: killed,
        [s['ship-enemy']]: enemyShips,
      })}
      style={style}
    />
  )
}

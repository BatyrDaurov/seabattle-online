import React from 'react'
import useCellSize from '@lib/context/TableCellContext'
import s from './Shot.module.scss'
import classNames from 'classnames'

type Props = {
  x: number
  y: number
  isHitted: boolean
}

export const Shot: React.FC<Props> = (props) => {
  const { x, y, isHitted } = props
  const { cellSize } = useCellSize()

  const style = React.useMemo(() => {
    const style: React.CSSProperties = {}

    const offsetX = x * cellSize
    const offsetY = y * cellSize

    style.left = `${offsetX}px`
    style.top = `${offsetY}px`
    style.width = cellSize
    style.height = cellSize

    return style
  }, [cellSize, x, y])

  return (
    <div
      className={classNames({ [s.shot]: true, [s.shot__hitted]: isHitted })}
      style={style}
    ></div>
  )
}

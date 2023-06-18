import React from 'react'
import useCellSize from '@lib/context/TableCellContext'
import classNames from 'classnames'
import { createMatrix } from '@lib/utils'
import { useCustomSelector } from '@lib/hooks'
import { useRouter } from 'next/router'
import s from './BoardTable.module.scss'

type Props = {
  isEnemy?: boolean
  isHover?: boolean
  ws?: WebSocket | null
}

export const BoardTable: React.FC<Props> = (props) => {
  const { isHover, isEnemy, ws } = props
  const { cellSize } = useCellSize()
  const roomId = useRouter().query.id
  const myname = useCustomSelector((state) => state.party.me.name)

  const matrix = createMatrix()

  const shot = (coordinates: { x: number; y: number }) => {
    ws?.send(
      JSON.stringify({
        event: 'register-the-shoot',
        payload: {
          roomId,
          name: myname,
          coordinates,
        },
      })
    )
  }

  return (
    <table
      style={{ minWidth: cellSize * 10 }}
      className={classNames({
        [s['board-table']]: true,
        [s['board-my']]: isEnemy,
      })}
    >
      <tbody>
        {matrix.map((rows, y) => (
          <tr key={y}>
            {rows.map((coordinates: { x: number; y: number }, x: number) => (
              <td
                key={x}
                onClick={() => isEnemy && shot(coordinates)}
                className={classNames({
                  [s['board-table__cell']]: true,
                })}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                <div
                  className={classNames({
                    [s['board-table__hover']]: isHover,
                  })}
                ></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

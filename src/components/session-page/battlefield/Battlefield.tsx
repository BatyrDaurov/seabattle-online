import React from 'react'
import { useCustomSelector } from '@lib/hooks/useCustomSelector'
import { alphabet } from '@lib/constants/game/alphabet'
import { CellSize } from '@lib/providers/CellSize'
import classNames from 'classnames'
import s from './Battlefield.module.scss'

export type BattlefieldProps = {
  cellSize: { cellSize: number }
  children: React.ReactNode
  disabled?: boolean
  isEnemy?: boolean
  isMobile?: boolean
}

export const Battlefield: React.FC<BattlefieldProps> = (props) => {
  const { children, cellSize, isEnemy, disabled, isMobile } = props
  const party = useCustomSelector((state) => state.party)
  const globalConditon = disabled || (!party.started && isEnemy)
  const turn = (isEnemy && party.enemy.move) || (!isEnemy && party.me.move)

  const style = {
    color: isEnemy ? 'var(--enemyboard-text-color)' : 'var(--board-text-color)',
    width: `${cellSize.cellSize}px`,
    height: `${cellSize.cellSize}px`,
  }

  return (
    <CellSize.Provider value={cellSize}>
      <div
        className={classNames({
          [s.battlefield]: true,
          [s.battlefield__disabled]: globalConditon || turn,
          [s.battlefield__hidden]: isEnemy && isMobile && !party.enemy.name,
        })}
      >
        {/* Рендерим алфавит */}
        <ul className={s.alhabet} style={{ left: cellSize.cellSize }}>
          {alphabet.map((char) => (
            <li key={char} style={style}>
              {char}
            </li>
          ))}
        </ul>
        {/* Рендерим цифры */}
        <ul className={s.numbers}>
          {alphabet.map((_, index) => (
            <li key={index} style={style}>
              {index + 1}
            </li>
          ))}
        </ul>
        {/* Рендерим само поле */}
        <div className={s.battlefield__wrapper}>{children}</div>
      </div>
    </CellSize.Provider>
  )
}

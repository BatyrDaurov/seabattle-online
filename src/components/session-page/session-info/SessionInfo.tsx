import React from 'react'
import { ButtonYellow } from '@components/@UI/buttons/button-yellow/ButtonYellow'
import { useRouter } from 'next/router'
import { useCustomSelector } from '@lib/hooks/useCustomSelector'
import { shipCount } from '@lib/utils/ships/shipCount'
import classNames from 'classnames'
import s from './SessionInfo.module.scss'

export const SessionInfo: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const roomId = useRouter()
  const partyState = useCustomSelector((state) => state.party)
  const ships = useCustomSelector((state) => state.editor.ships)
  const [isClicked, setIsClicked] = React.useState(false)

  ws?.addEventListener('message', (e: MessageEvent) => {
    if (typeof e.data !== 'string') return
    const { type } = JSON.parse(e.data.toString())
    if (type === 'gameStarted') {
      setIsClicked(false)
    }
  })

  return (
    <div className={s.session}>
      <ShipsInfo />
      {!partyState.started && (
        <ButtonYellow
          disabled={!partyState.enemy.name || isClicked}
          onClick={() => {
            if (ws) {
              setIsClicked(true)
              ws.send(
                JSON.stringify({
                  event: partyState.isFirstGame
                    ? 'ready-to-play'
                    : 'revenge-the-game',
                  payload: {
                    roomId: Number(roomId.query.id),
                    name: partyState.me.name,
                    ships,
                  },
                })
              )
            }
          }}
        >
          {partyState.isFirstGame ? 'приготовиться' : 'реванш'}
        </ButtonYellow>
      )}
    </div>
  )
}
const ShipsInfo: React.FC = React.memo(() => {
  const partyState = useCustomSelector((state) => state.party)
  const shipsCount = {
    big: shipCount(partyState.me.ships, 4, 1),
    large: shipCount(partyState.me.ships, 3, 2),
    small: shipCount(partyState.me.ships, 2, 3),
    one: shipCount(partyState.me.ships, 1, 4),
  }
  const enemyShipsCount = {
    big: shipCount(partyState.enemy.ships, 4, 1, true),
    large: shipCount(partyState.enemy.ships, 3, 2, true),
    small: shipCount(partyState.enemy.ships, 2, 3, true),
    one: shipCount(partyState.enemy.ships, 1, 4, true),
  }

  return (
    <div
      className={classNames({
        [s['ships-info']]: true,
      })}
    >
      <div>
        <p>Ваши корабли:</p>
        <ul className={s.ships}>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__big]: true,
              [s.ship__destroy]: !shipsCount.big,
            })}
          >
            {shipsCount.big}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__large]: true,
              [s.ship__destroy]: !shipsCount.large,
            })}
          >
            {shipsCount.large}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__small]: true,
              [s.ship__destroy]: !shipsCount.small,
            })}
          >
            {shipsCount.small}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__one]: true,
              [s.ship__destroy]: !shipsCount.one,
            })}
          >
            {shipsCount.one}
          </li>
        </ul>
      </div>
      <div>
        <p>Корабли врага:</p>
        <ul className={s.ships}>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__big]: true,
              [s.ship__destroy]: !enemyShipsCount.big,
            })}
          >
            {enemyShipsCount.big}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__large]: true,
              [s.ship__destroy]: !enemyShipsCount.large,
            })}
          >
            {enemyShipsCount.large}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__small]: true,
              [s.ship__destroy]: !enemyShipsCount.small,
            })}
          >
            {enemyShipsCount.small}
          </li>
          <li
            className={classNames({
              [s.ship]: true,
              [s.ship__one]: true,
              [s.ship__destroy]: !enemyShipsCount.one,
            })}
          >
            {enemyShipsCount.one}
          </li>
        </ul>
      </div>
    </div>
  )
})

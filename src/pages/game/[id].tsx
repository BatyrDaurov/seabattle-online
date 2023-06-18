import React from 'react'
import dynamic from 'next/dynamic'
import { ShipType, ShotType } from 'types/game-types'
import {
  PlaceShips,
  BoardTable,
  SessionInfo,
  Ship,
  Shot,
  BattlefieldProps,
} from '@components/session-page'
import { handleMessages, connectToRoom } from '@lib/utils'
import { useCustomSelector, useCustomDispatch } from '@lib/hooks'
import { GameWrapper } from '@components/game-page/game-wrapper/GameWrapper'
import { random } from '@store/slices/editor'
import { useRouter } from 'next/router'
import { MainLayout } from '@components/@layout'
import { resetParty } from '@store/slices/party'

const Battlefield = dynamic<BattlefieldProps>(
  () => import('@components/session-page').then((mod) => mod.Battlefield),
  {
    ssr: false,
  }
)

const SessionPage: React.FC = () => {
  const cellSize = { cellSize: 40 }
  const state = useCustomSelector((state) => state)
  const dispatch = useCustomDispatch()
  const socket = React.useRef<WebSocket | null>(null)
  const navigator = useRouter()

  React.useEffect(() => {
    if (!navigator.isReady) return
    // Расставляем корабли случайно
    dispatch(random())

    // Подключаемся к серверу и слушаем его
    socket.current = new WebSocket(
      process.env.NEXT_PUBLIC_API_URL || 'ws://localhost:9999/ws/seabattle'
    )
    socket.current.onopen = connectToRoom(socket, navigator.query.id)
    socket.current.onmessage = handleMessages(dispatch, navigator)

    // При выходе с страницы обнуляем состояние партии
    return () => {
      dispatch(resetParty())
    }
  }, [navigator])

  // Оптимизация для мобильных устройств
  if (typeof window !== 'undefined' && window.innerWidth < 767) {
    cellSize.cellSize = 30
  }

  return (
    <MainLayout title={`Сессия №${navigator.query.id || '...'} || Морской бой`}>
      <GameWrapper isSession>
        <Battlefield cellSize={cellSize}>
          {state.editor.ships.map((ship: ShipType, index: number) => (
            <Ship key={index} {...ship} />
          ))}
          {state.party.enemy.shots.map((shot: ShotType, index: number) => (
            <Shot key={index} {...shot} />
          ))}
          <BoardTable />
          <PlaceShips isMe username={state.party.me.name} />
        </Battlefield>
        <SessionInfo ws={socket.current} />
        <Battlefield
          cellSize={cellSize}
          isMobile={cellSize.cellSize === 30}
          isEnemy
        >
          {state.party.enemy.ships.map((ship: ShipType, index: number) => (
            <Ship enemyShips key={index} {...ship} />
          ))}
          {state.party.me.shots.map((shot: ShotType, index: number) => (
            <Shot key={index} {...shot} />
          ))}
          <BoardTable ws={socket.current} isHover isEnemy />
          <PlaceShips username={state.party.enemy.name || 'Противника нет.'} />
        </Battlefield>
      </GameWrapper>
    </MainLayout>
  )
}

export default SessionPage

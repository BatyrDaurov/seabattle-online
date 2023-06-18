import React from 'react'
import dynamic from 'next/dynamic'
import { BattlefieldProps, BoardTable } from '@components/session-page'
import { GameWrapper, ConnectWindow } from '@components/game-page'
import { MainLayout } from '@components/@layout'

const Battlefield = dynamic<BattlefieldProps>(
  () =>
    import('@components/session-page/battlefield/Battlefield').then(
      (mod) => mod.Battlefield
    ),
  {
    ssr: false,
  }
)

const GamePage: React.FC = () => {
  const cellSize = { cellSize: 40 }

  if (typeof window !== 'undefined' && window.innerWidth < 767) {
    cellSize.cellSize = 30
  }

  return (
    <MainLayout title="Найти соперника || Морской бой">
      <GameWrapper>
        <Battlefield disabled cellSize={cellSize}>
          <BoardTable />
        </Battlefield>
        <ConnectWindow />
        {cellSize.cellSize === 40 && (
          <Battlefield disabled isEnemy cellSize={cellSize}>
            <BoardTable isEnemy />
          </Battlefield>
        )}
      </GameWrapper>
    </MainLayout>
  )
}

export default GamePage

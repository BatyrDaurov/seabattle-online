import { NextRouter } from 'next/router'
import { random } from '@store/slices/editor'
import {
  setGameOver,
  setGameStarted,
  setMyName,
  setNextMove,
  setReady,
  setRivalName,
  updateBoard,
} from '@store/slices/party'

export const handleMessages = (
  dispatch: AppDispatch,
  navigator: NextRouter
) => (e: MessageEvent) => {
  if (typeof e.data !== 'string') return

  const { type, payload } = JSON.parse(e.data.toString())

  switch (type) {
    case 'connectToRoom':
      dispatch(setMyName(payload.name))
      dispatch(setRivalName(payload.rivalName))
      break
    case 'stopGame':
      alert('Соединение оборвано. Противник отключился.')
      navigator.push('/game')
      break
    case 'canStart':
      dispatch(setReady(payload.userCanStart))
      break
    case 'gameStarted':
      dispatch(setReady(payload.userCanStart))
      dispatch(setGameStarted(payload.turn))
      break
    case 'afterShoot':
      dispatch(setNextMove(payload.turn))
      dispatch(
        updateBoard({
          name: payload.name,
          shots: payload.shots,
          ships: payload.ships,
          floodedShip: payload.floodedShips,
        })
      )
      break
    case 'gameOver':
      dispatch(setNextMove(payload.turn))
      dispatch(
        updateBoard({
          name: payload.name,
          shots: payload.shots,
          ships: payload.ships,
          floodedShip: payload.floodedShip,
        })
      )
      setTimeout(() => {
        alert(`Игра окончена, игрок: ${payload.won} - выиграл 👏👏👏`)
        dispatch(setGameOver())
        dispatch(random())
      }, 1000)
      break
    default:
      break
  }
}

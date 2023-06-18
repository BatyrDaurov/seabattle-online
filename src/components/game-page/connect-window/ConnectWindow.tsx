import React from 'react'
import { ButtonYellow } from '@components/@UI/buttons/button-yellow/ButtonYellow'
import { useRouter } from 'next/router'
import { findGame } from '@lib/utils'
import classNames from 'classnames'
import s from './ConnectWindow.module.scss'

export const ConnectWindow: React.FC = () => {
  const socket = React.useRef<WebSocket | null>(null)
  const [choose, setChoose] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const navigate = useRouter()

  React.useEffect(() => {
    socket.current = new WebSocket(
      process.env.NEXT_PUBLIC_API_URL || 'ws://localhost:9999/ws/seabattle'
    )
    socket.current.onmessage = findGame(navigate) // Слушаем сервер
    socket.current.onopen = () => {
      setIsLoading(false) // Когда подключение установлено, разрешаем искать игру
    }
    return () => {
      // При переключении страницы, отключаемся от канала
      socket.current?.close()
    }
  }, [])

  const onClick = () => {
    if (choose) {
      if (socket.current === null) return
      socket.current?.send(
        JSON.stringify({
          event: 'find-the-game',
        })
      )
    } else {
      navigate.push(`/game/${Date.now()}`)
    }
    setIsLoading(true)
  }

  return (
    <div className={s.connect}>
      <ul className={s.connect__variants}>
        <li>
          <button
            className={classNames({
              [s.connect__variant]: true,
              [s.connect__variant_active]: !choose,
            })}
            onClick={() => setChoose(0)}
          >
            игра с другом
          </button>
        </li>
        <li>
          <button
            className={classNames({
              [s.connect__variant]: true,
              [s.connect__variant_active]: choose,
            })}
            onClick={() => setChoose(1)}
          >
            найти игру
          </button>
        </li>
      </ul>
      <ButtonYellow disabled={isLoading} onClick={onClick}>
        играть
      </ButtonYellow>
    </div>
  )
}

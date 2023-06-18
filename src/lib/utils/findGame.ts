import { NextRouter } from 'next/router'

export const findGame = (navigate: NextRouter) => (e: MessageEvent) => {
  if (typeof e.data !== 'string') return

  const { type, payload } = JSON.parse(e.data.toString())
  if (type === 'gameFound') navigate.push(`/game/${payload.roomId}`)
}

import React from 'react'
import { MainLayout } from '@components/@layout'
import { setSessionsEvent, getSessions } from '@lib/utils'
import { Room } from 'types/rooms'
import { PlayersTable } from '@components/rooms-page'

const RoomsPage = () => {
  const socket = React.useRef<WebSocket | null>(null)
  const [sessions, setSessions] = React.useState<Room[]>([])

  React.useEffect(() => {
    socket.current = new WebSocket(
      process.env.NEXT_PUBLIC_API_URL || 'ws://localhost:9999/ws/seabattle'
    )
    socket.current.onopen = getSessions(socket)
    socket.current.onmessage = setSessionsEvent(setSessions)
  }, [])

  return (
    <MainLayout title="Список всех игр || Морской бой">
      <br />
      <PlayersTable sessions={sessions} />
    </MainLayout>
  )
}

export default RoomsPage

export const connectToRoom = (
  socket: React.MutableRefObject<WebSocket | null>,
  roomId: string | string[] | undefined
) => () => {
  // Подключаемся к комнате
  socket.current?.send(
    JSON.stringify({
      event: 'connect-to-room',
      payload: {
        roomId,
      },
    })
  )
}

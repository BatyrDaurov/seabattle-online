export const getSessions = (
  socket: React.MutableRefObject<WebSocket | null>
) => () => {
  socket.current?.send(
    JSON.stringify({
      event: 'get-all-sessions',
    })
  )
}

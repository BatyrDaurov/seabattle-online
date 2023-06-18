import { Room } from 'types/rooms'

export const setSessionsEvent = (setSessions: (args: Room[]) => void) => (
  e: MessageEvent
) => {
  if (typeof e.data !== 'string') return
  const { type, payload } = JSON.parse(e.data.toString())
  if (type === 'takeSessions') setSessions(payload.sessionsData)
}

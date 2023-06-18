import { WsClient } from './game-types/user'

export type Room = {
  roomId: string
  players: WsClient[]
}

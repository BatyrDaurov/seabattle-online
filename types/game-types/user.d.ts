import WebSocket from 'ws'

type WsUserData = {
  userData: {
    turn?: boolean
    ready?: boolean
    matrix?: any[]
    roomId?: number
    name?: string
    shots?: any[]
    wonPrevGame?: boolean
  }
}

export type WsClient = WsUserData & WebSocket

export type ShotType = {
  x: number
  y: number
  isHitted: boolean
}

export type ShipType = {
  id: number
  x: number
  y: number
  length: number
  direction: 'row' | 'column'
  placed: boolean
  destructure: number
  range: ShotType[]
}

export type PartyStateType = {
  me: {
    name: string
    ships: ShipType[]
    shots: ShotType[]
    ready: boolean
    move: boolean
  }
  enemy: {
    name: string
    shots: ShotType[]
    ships: ShipType[]
    ready: boolean
    move: boolean
  }
  started: boolean
  isFirstGame: boolean
}

import { filterShots } from '@lib/utils'
import { createSlice } from '@reduxjs/toolkit'
import { PartyStateType } from 'types/game-types'

const initialState: PartyStateType = {
  me: {
    name: '',
    ships: [],
    shots: [],
    ready: false,
    move: false,
  },
  enemy: {
    name: '',
    ships: [],
    shots: [],
    ready: false,
    move: false,
  },
  started: false,
  isFirstGame: true,
}

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    setMyName(state, action) {
      state.me.name = action.payload
    },
    setRivalName(state, action) {
      state.enemy.name = action.payload
    },
    setReady(state, action) {
      if (state.me.name === action.payload) {
        state.me.ready = true
      } else {
        state.enemy.ready = true
      }
    },
    setGameStarted(state, action) {
      state.started = true
      if (state.me.name.replace(' ', '') === action.payload.replace(' ', '')) {
        state.me.move = true
      } else {
        state.enemy.move = true
      }
    },
    setNextMove(state, action) {
      if (state.me.name.replace(' ', '') === action.payload.replace(' ', '')) {
        state.me.move = true
        state.enemy.move = false
      } else {
        state.me.move = false
        state.enemy.move = true
      }
    },
    setGameOver(state) {
      state.started = false
      state.isFirstGame = false
      state.me = {
        ...state.me,
        shots: [],
        ships: [],
        ready: false,
        move: false,
      }
      state.enemy = {
        ...state.enemy,
        shots: [],
        ships: [],
        ready: false,
        move: false,
      }
    },
    resetParty(state) {
      state.me.name = ''
      state.me.ships = []
      state.me.shots = []
      state.me.ready = false
      state.me.move = false

      state.enemy.name = ''
      state.enemy.ships = []
      state.enemy.shots = []
      state.enemy.ready = false
      state.enemy.move = false

      state.started = false
      state.isFirstGame = true
    },
    updateBoard(state, action) {
      state.me.ships = action.payload.ships
      if (
        state.me.name.replace(' ', '') === action.payload.name.replace(' ', '')
      ) {
        state.me.shots = filterShots(state.me.shots, action.payload.shots)
        if (action.payload.floodedShip)
          state.enemy.ships = action.payload.floodedShip
      } else {
        state.enemy.shots = filterShots(state.enemy.shots, action.payload.shots)
      }
    },
  },
})

export const {
  setMyName,
  setRivalName,
  setReady,
  setGameStarted,
  resetParty,
  setNextMove,
  updateBoard,
  setGameOver,
} = partySlice.actions
export const partyReducer = partySlice.reducer

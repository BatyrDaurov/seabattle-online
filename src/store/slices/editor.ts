import { createSlice } from '@reduxjs/toolkit'
import { getDefaultShips } from '@lib/constants/game/getDefaultShips'
import { randomize } from '@lib/utils'

const initialState = {
  ships: getDefaultShips(),
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // Функция принимает массив кораблей и выставляет на поле.
    setShips(state, action) {
      state.ships = action.payload
    },

    // Функция расставляет корабли случайным образом.
    random(state) {
      state.ships = randomize()
      for (const ship of state.ships) {
        ship.placed = true
      }
    },

    // Функция возвращает корабли в док.
    reset(state) {
      state.ships = getDefaultShips()
    },
  },
})

export const { random, reset, setShips } = editorSlice.actions
export const editorReducer = editorSlice.reducer

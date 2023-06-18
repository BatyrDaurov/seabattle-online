import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { editorReducer } from './slices/editor'
import { partyReducer } from './slices/party'

export const rootReducer = combineReducers({
  editor: editorReducer,
  party: partyReducer,
})

// Создание и экспорт хранилища
export const store = configureStore({
  reducer: rootReducer,
})

// Создание и экспорт обертки для next-redux-wrapper
export const wrapper = createWrapper(() => store)

import { configureStore } from '@reduxjs/toolkit'
import teamsReducer from './slices/teamsSlice'
import challengesReducer from './slices/challengesSlice'
import roundsReducer from './slices/roundsSlice'
import socketReducer from './slices/socketSlice'

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    challenges: challengesReducer,
    rounds: roundsReducer,
    socket: socketReducer,
  },
})
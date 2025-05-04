import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connected: false,
  sessionId: null,
  error: null,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { 
  setConnected,
  setSessionId,
  setError,
} = socketSlice.actions

export default socketSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentRound: 0,
  totalRounds: 4,
  timePerRound: 10 * 60, // 10 minutes in seconds
  timeRemaining: 10 * 60,
  isActive: false,
  isPaused: false,
  submissions: {},
}

export const roundsSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    startRound: (state) => {
      state.isActive = true
      state.isPaused = false
    },
    pauseRound: (state) => {
      state.isPaused = true
    },
    resumeRound: (state) => {
      state.isPaused = false
    },
    endRound: (state) => {
      state.isActive = false
      state.timeRemaining = state.timePerRound
    },
    nextRound: (state) => {
      if (state.currentRound < state.totalRounds - 1) {
        state.currentRound += 1
        state.timeRemaining = state.timePerRound
        state.isActive = false
        state.isPaused = false
      }
    },
    previousRound: (state) => {
      if (state.currentRound > 0) {
        state.currentRound -= 1
        state.timeRemaining = state.timePerRound
        state.isActive = false
        state.isPaused = false
      }
    },
    setTimePerRound: (state, action) => {
      state.timePerRound = action.payload
      state.timeRemaining = action.payload
    },
    decrementTime: (state) => {
      if (state.isActive && !state.isPaused && state.timeRemaining > 0) {
        state.timeRemaining -= 1
      }
    },
    resetTime: (state) => {
      state.timeRemaining = state.timePerRound
    },
    setTotalRounds: (state, action) => {
      state.totalRounds = action.payload
    },
    addSubmission: (state, action) => {
      const { roundId, teamId, submission } = action.payload
      if (!state.submissions[roundId]) {
        state.submissions[roundId] = {}
      }
      state.submissions[roundId][teamId] = submission
    },
    setSubmissions: (state, action) => {
      state.submissions = action.payload
    },
  },
})

export const { 
  startRound,
  pauseRound,
  resumeRound,
  endRound,
  nextRound,
  previousRound,
  setTimePerRound,
  decrementTime,
  resetTime,
  setTotalRounds,
  addSubmission,
  setSubmissions
} = roundsSlice.actions

export default roundsSlice.reducer
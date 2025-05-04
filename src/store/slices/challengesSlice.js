import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  challenges: [],
  currentChallenge: null,
  loading: false,
  error: null,
}

export const challengesSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setChallenges: (state, action) => {
      state.challenges = action.payload
    },
    addChallenge: (state, action) => {
      state.challenges.push(action.payload)
    },
    updateChallenge: (state, action) => {
      const index = state.challenges.findIndex(challenge => challenge.id === action.payload.id)
      if (index !== -1) {
        state.challenges[index] = action.payload
      }
    },
    removeChallenge: (state, action) => {
      state.challenges = state.challenges.filter(challenge => challenge.id !== action.payload)
    },
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { 
  setChallenges, 
  addChallenge, 
  updateChallenge, 
  removeChallenge, 
  setCurrentChallenge,
  setLoading,
  setError
} = challengesSlice.actions

export default challengesSlice.reducer
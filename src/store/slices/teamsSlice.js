import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teams: [],
  currentTeam: null,
  loading: false,
  error: null,
}

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload
    },
    addTeam: (state, action) => {
      state.teams.push(action.payload)
    },
    updateTeam: (state, action) => {
      const index = state.teams.findIndex(team => team.id === action.payload.id)
      if (index !== -1) {
        state.teams[index] = action.payload
      }
    },
    removeTeam: (state, action) => {
      state.teams = state.teams.filter(team => team.id !== action.payload)
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload
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
  setTeams, 
  addTeam, 
  updateTeam, 
  removeTeam, 
  setCurrentTeam,
  setLoading,
  setError
} = teamsSlice.actions

export default teamsSlice.reducer
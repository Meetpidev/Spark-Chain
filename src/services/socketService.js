import io from 'socket.io-client'
import { 
  setConnected, 
  setSessionId, 
  setError 
} from '../store/slices/socketSlice'
import { 
  setTeams 
} from '../store/slices/teamsSlice'
import { 
  setSubmissions 
} from '../store/slices/roundsSlice'

let socket = null
let store = null

export const initializeSocket = (dispatch) => {
  if (typeof dispatch !== 'function') {
    throw new Error('dispatch must be a function')
  }
  
  // Store reference for later use
  store = dispatch.getState ? dispatch : null
  
  // This is a mock implementation for the current dummy version
  console.log('Initializing socket connection (mock)')
  
  // Simulate connection established
  setTimeout(() => {
    if (typeof dispatch === 'function') {
      dispatch(setConnected(true))
      dispatch(setSessionId('mock-session-' + Math.floor(Math.random() * 10000)))
      
      // Simulate receiving initial data
      const mockTeams = [
        { id: 'team1', name: 'Innovators', members: ['Alice', 'Bob', 'Charlie'] },
        { id: 'team2', name: 'Disruptors', members: ['Dave', 'Eve', 'Frank'] },
        { id: 'team3', name: 'Visionaries', members: ['Grace', 'Heidi', 'Ivan'] },
        { id: 'team4', name: 'Creators', members: ['Jack', 'Kelly', 'Liam'] }
      ]
      
      dispatch(setTeams(mockTeams))
    }
  }, 1000)
  
  return {
    disconnect: () => {
      console.log('Disconnecting socket (mock)')
      if (typeof dispatch === 'function') {
        dispatch(setConnected(false))
      }
    },
    
    emit: (event, data) => {
      console.log(`Mock emitting ${event}:`, data)
      
      // Simulate some responses based on events
      if (event === 'submit_idea' && typeof dispatch === 'function' && store) {
        const { roundId, teamId, content } = data
        setTimeout(() => {
          // Mock updating submissions in the store
          const currentSubmissions = { ...store.getState().rounds.submissions }
          if (!currentSubmissions[roundId]) {
            currentSubmissions[roundId] = {}
          }
          currentSubmissions[roundId][teamId] = content
          dispatch(setSubmissions(currentSubmissions))
        }, 500)
      }
    }
  }
}

export const getSocket = () => socket

export const connectSocket = (dispatch) => {
  if (!socket) {
    if (typeof dispatch !== 'function') {
      throw new Error('dispatch must be a function')
    }
    socket = initializeSocket(dispatch)
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    store = null
  }
}
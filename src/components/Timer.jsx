import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  startRound, 
  pauseRound, 
  resumeRound, 
  endRound, 
  nextRound,
  decrementTime
} from '../store/slices/roundsSlice'

const Timer = () => {
  const dispatch = useDispatch()
  const { 
    timeRemaining, 
    isActive, 
    isPaused, 
    currentRound,
    totalRounds 
  } = useSelector(state => state.rounds)
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Calculate progress percentage
  const timePerRound = useSelector(state => state.rounds.timePerRound)
  const progressPercentage = (timeRemaining / timePerRound) * 100
  
  useEffect(() => {
    let interval = null
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        dispatch(decrementTime())
      }, 1000)
    } else {
      clearInterval(interval)
    }
    
    return () => clearInterval(interval)
  }, [isActive, isPaused, dispatch])
  
  // Auto end round when time is up
  useEffect(() => {
    if (timeRemaining === 0 && isActive) {
      dispatch(endRound())
      
      // Show alert that time is up and teams should pass their work
      if (currentRound < totalRounds - 1) {
        alert('Time is up! Teams, please prepare to pass your work to the next team.')
      } else {
        alert('Final round complete! Please submit your final versions.')
      }
    }
  }, [timeRemaining, isActive, dispatch, currentRound, totalRounds])
  
  // Get appropriate button based on timer state
  const renderButton = () => {
    if (!isActive) {
      return (
        <button 
          onClick={() => dispatch(startRound())}
          className="px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          Start Round
        </button>
      )
    }
    
    if (isPaused) {
      return (
        <button 
          onClick={() => dispatch(resumeRound())}
          className="px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          Resume
        </button>
      )
    }
    
    return (
      <button 
        onClick={() => dispatch(pauseRound())}
        className="px-4 py-2 rounded-md bg-warning-500 text-white hover:bg-warning-600 transition-colors"
      >
        Pause
      </button>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Round {currentRound + 1} of {totalRounds}</h2>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${
              progressPercentage > 50 
                ? 'bg-success-500' 
                : progressPercentage > 20 
                  ? 'bg-warning-500' 
                  : 'bg-error-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="text-4xl font-bold mb-4">
          {formatTime(timeRemaining)}
        </div>
        
        <div className="flex space-x-3">
          {renderButton()}
          
          {(isActive || timeRemaining < timePerRound) && (
            <button 
              onClick={() => dispatch(endRound())}
              className="px-4 py-2 rounded-md bg-error-500 text-white hover:bg-error-600 transition-colors"
            >
              End Round
            </button>
          )}
          
          {!isActive && currentRound < totalRounds - 1 && (
            <button 
              onClick={() => {
                if (window.confirm('Ready to move to the next round? Teams should have passed their work.')) {
                  dispatch(nextRound())
                }
              }}
              className="px-4 py-2 rounded-md bg-secondary-500 text-white hover:bg-secondary-600 transition-colors"
            >
              Next Round
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Timer
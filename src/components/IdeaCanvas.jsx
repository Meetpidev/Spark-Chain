import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSocket } from '../services/socketService'
import { addSubmission } from '../store/slices/roundsSlice'

const IdeaCanvas = ({ teamId, roundId, previousSubmission = null }) => {
  const [content, setContent] = useState(previousSubmission || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  const dispatch = useDispatch()
  const isActive = useSelector(state => state.rounds.isActive)
  const currentRound = useSelector(state => state.rounds.currentRound)
  
  const handleSave = () => {
    if (!content.trim()) return
    
    setIsSaving(true)
    
    // Dispatch to store and emit to socket
    dispatch(addSubmission({ roundId, teamId, submission: content }))
    
    const socket = getSocket()
    if (socket) {
      socket.emit('submit_idea', { roundId, teamId, content })
    }
    
    // Simulate save completion
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      
      // Reset saved indicator after a while
      setTimeout(() => {
        setIsSaved(false)
      }, 2000)
    }, 800)
  }
  
  // Get remix rules based on current round
  const getRemixPrompt = () => {
    if (currentRound === 0) return 'Initial brainstorming - create your first idea!'
    
    const prompts = [
      'Initial brainstorming - create your first idea!',
      'Mashup: Combine this idea with something completely unrelated',
      'Flip It: Reverse a core assumption or intended user',
      'Shrink & Stretch: Adapt this idea for a radically different scale'
    ]
    
    return prompts[currentRound] || 'Add your creative remix to this idea!'
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Idea Canvas</h3>
        <p className="text-sm text-gray-500 mt-1">{getRemixPrompt()}</p>
      </div>
      
      {previousSubmission && currentRound > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Team's Submission:</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">{previousSubmission}</p>
        </div>
      )}
      
      <div className="flex-grow">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Develop your idea here... Be creative!"
          className="w-full h-full min-h-[200px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          disabled={!isActive}
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {!isActive && 'Waiting for round to start...'}
          {isActive && isSaved && (
            <span className="text-success-500 flex items-center">
              <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Saved!
            </span>
          )}
        </div>
        
        <button
          onClick={handleSave}
          disabled={!isActive || isSaving || !content.trim()}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !isActive || !content.trim()
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isSaving
                ? 'bg-primary-300 text-white cursor-wait'
                : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {isSaving ? 'Saving...' : 'Save Progress'}
        </button>
      </div>
    </div>
  )
}

export default IdeaCanvas
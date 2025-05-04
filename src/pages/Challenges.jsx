import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  addChallenge, 
  updateChallenge, 
  removeChallenge,
  setCurrentChallenge
} from '../store/slices/challengesSlice'
import ChallengeCard from '../components/ChallengeCard'
import ChallengeForm from '../components/ChallengeForm'
import Modal from '../components/Modal'

// Sample challenges for the initial state
const sampleChallenges = [
  {
    id: 'challenge-1',
    title: 'Reimagining Urban Mobility',
    shortDescription: 'Create solutions for sustainable urban transportation',
    fullDescription: 'Design a solution that addresses the challenges of urban mobility in a sustainable, accessible, and efficient way. Consider factors like reducing carbon emissions, decreasing congestion, and ensuring accessibility for all residents.',
    remixRules: [
      'Mashup: Combine with an entirely different industry',
      'Flip It: Design for the opposite user than originally intended',
      'Shrink & Stretch: Scale your solution from neighborhood to global level'
    ]
  },
  {
    id: 'challenge-2',
    title: 'Future of Remote Collaboration',
    shortDescription: 'Develop tools for better virtual teamwork',
    fullDescription: 'Imagine new ways for teams to collaborate remotely that overcome current limitations of virtual work. Focus on creating experiences that foster creativity, spontaneity, and human connection despite physical distance.',
    remixRules: [
      'Wild Card: Incorporate an unexpected constraint (no screens, only audio, etc.)',
      'Flip It: Make it for a completely different context than work',
      'Mashup: Combine with social media or gaming mechanics'
    ]
  }
]

const Challenges = () => {
  const dispatch = useDispatch()
  let challenges = useSelector(state => state.challenges.challenges)
  const currentChallenge = useSelector(state => state.challenges.currentChallenge)
  
  // Add sample challenges if none exist
  if (challenges.length === 0) {
    challenges = sampleChallenges
    // In a real app, we would dispatch these, but for demo we'll just use them directly
  }
  
  const [modalOpen, setModalOpen] = useState(false)
  const [editChallenge, setEditChallenge] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  
  const handleCreateChallenge = () => {
    setEditChallenge(null)
    setModalOpen(true)
  }
  
  const handleEditChallenge = (challenge) => {
    setEditChallenge(challenge)
    setModalOpen(true)
  }
  
  const handleDeleteChallenge = (challengeId) => {
    setConfirmDelete(challengeId)
  }
  
  const confirmDeleteChallenge = () => {
    if (confirmDelete) {
      dispatch(removeChallenge(confirmDelete))
      
      // If the deleted challenge was the current one, reset current challenge
      if (currentChallenge && currentChallenge.id === confirmDelete) {
        dispatch(setCurrentChallenge(null))
      }
      
      setConfirmDelete(null)
    }
  }
  
  const handleSubmitChallenge = (challengeData) => {
    if (editChallenge) {
      dispatch(updateChallenge(challengeData))
      
      // Update current challenge if it's the one being edited
      if (currentChallenge && currentChallenge.id === challengeData.id) {
        dispatch(setCurrentChallenge(challengeData))
      }
    } else {
      dispatch(addChallenge(challengeData))
    }
    
    setModalOpen(false)
    setEditChallenge(null)
  }
  
  const handleSelectChallenge = (challenge) => {
    dispatch(setCurrentChallenge(challenge))
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
        <button
          onClick={handleCreateChallenge}
          className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors flex items-center"
        >
          <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Challenge
        </button>
      </div>
      
      {challenges.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg 
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No Challenges Created</h2>
          <p className="text-gray-600 mb-6">
            Create a challenge to set the direction for your Spark Chain session
          </p>
          <button
            onClick={handleCreateChallenge}
            className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Create First Challenge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              onSelect={handleSelectChallenge}
              isSelected={currentChallenge?.id === challenge.id}
            />
          ))}
        </div>
      )}
      
      {/* Create/Edit Challenge Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editChallenge ? 'Edit Challenge' : 'Create New Challenge'}
      >
        <ChallengeForm 
          challenge={editChallenge}
          onSubmit={handleSubmitChallenge}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
      
      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Delete"
      >
        <div className="p-4">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this challenge? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteChallenge}
              className="px-4 py-2 bg-error-500 text-white rounded-md text-sm font-medium hover:bg-error-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Challenges
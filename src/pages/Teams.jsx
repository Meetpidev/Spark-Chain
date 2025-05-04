import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTeam, updateTeam, removeTeam } from '../store/slices/teamsSlice'
import TeamCard from '../components/TeamCard'
import TeamForm from '../components/TeamForm'
import Modal from '../components/Modal'

const Teams = () => {
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams.teams)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentTeam, setCurrentTeam] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  
  const handleCreateTeam = () => {
    setCurrentTeam(null)
    setModalOpen(true)
  }
  
  const handleEditTeam = (team) => {
    setCurrentTeam(team)
    setModalOpen(true)
  }
  
  const handleDeleteTeam = (teamId) => {
    setConfirmDelete(teamId)
  }
  
  const confirmDeleteTeam = () => {
    if (confirmDelete) {
      dispatch(removeTeam(confirmDelete))
      setConfirmDelete(null)
    }
  }
  
  const handleSubmitTeam = (teamData) => {
    if (currentTeam) {
      dispatch(updateTeam(teamData))
    } else {
      dispatch(addTeam(teamData))
    }
    
    setModalOpen(false)
    setCurrentTeam(null)
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
        <button
          onClick={handleCreateTeam}
          className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors flex items-center"
        >
          <svg className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Team
        </button>
      </div>
      
      {teams.length === 0 ? (
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No Teams Created</h2>
          <p className="text-gray-600 mb-6">
            Create a team to get started with your Spark Chain session
          </p>
          <button
            onClick={handleCreateTeam}
            className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Create First Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard 
              key={team.id}
              team={team}
              onEdit={handleEditTeam}
              onDelete={handleDeleteTeam}
            />
          ))}
        </div>
      )}
      
      {/* Create/Edit Team Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentTeam ? 'Edit Team' : 'Create New Team'}
      >
        <TeamForm 
          team={currentTeam}
          onSubmit={handleSubmitTeam}
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
            Are you sure you want to delete this team? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteTeam}
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

export default Teams
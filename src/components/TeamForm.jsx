import { useState, useEffect } from 'react'

const TeamForm = ({ team = null, onSubmit, onCancel }) => {
  const [name, setName] = useState('')
  const [members, setMembers] = useState(['', '', ''])
  const [errors, setErrors] = useState({})
  
  // Initialize form values when editing an existing team
  useEffect(() => {
    if (team) {
      setName(team.name)
      setMembers(team.members.length > 0 ? [...team.members] : ['', '', ''])
    }
  }, [team])
  
  const handleMemberChange = (index, value) => {
    const newMembers = [...members]
    newMembers[index] = value
    setMembers(newMembers)
  }
  
  const addMemberField = () => {
    setMembers([...members, ''])
  }
  
  const removeMemberField = (index) => {
    const newMembers = [...members]
    newMembers.splice(index, 1)
    setMembers(newMembers)
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Team name is required'
    }
    
    // Check if at least one member is entered
    const hasMembers = members.some(member => member.trim() !== '')
    if (!hasMembers) {
      newErrors.members = 'At least one team member is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Filter out empty member inputs
      const validMembers = members.filter(member => member.trim() !== '')
      
      // Prepare team object
      const teamData = {
        id: team?.id || `team-${Date.now()}`,
        name: name.trim(),
        members: validMembers
      }
      
      onSubmit(teamData)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {team ? 'Edit Team' : 'Create New Team'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-1">
          Team Name
        </label>
        <input
          id="team-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.name ? 'border-error-500' : 'border-gray-300'
          }`}
          placeholder="Enter team name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error-600">{errors.name}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Members
        </label>
        
        {errors.members && (
          <p className="mb-2 text-sm text-error-600">{errors.members}</p>
        )}
        
        {members.map((member, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={member}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={`Member ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeMemberField(index)}
              className="ml-2 p-2 text-error-500 hover:text-error-700 transition-colors"
              disabled={members.length <= 1}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addMemberField}
          className="mt-2 text-sm text-primary-600 hover:text-primary-800 flex items-center"
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Team Member
        </button>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          {team ? 'Update Team' : 'Create Team'}
        </button>
      </div>
    </form>
  )
}

export default TeamForm
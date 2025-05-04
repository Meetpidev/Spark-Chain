import { useState } from 'react'

const TeamCard = ({ team, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(team)}
              className="p-1 text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button 
              onClick={() => onDelete(team.id)}
              className="p-1 text-error-500 hover:text-error-700 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg 
                className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Team Members</h4>
            <ul className="space-y-1">
              {team.members.map((member, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamCard
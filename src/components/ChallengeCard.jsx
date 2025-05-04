import { useState } from 'react'

const ChallengeCard = ({ challenge, onSelect, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
        ${isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-lg'}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => onSelect(challenge)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isSelected 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
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
        
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            {challenge.shortDescription || 'No description provided'}
          </p>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {challenge.fullDescription || 'No detailed description available'}
            </p>
            
            {challenge.remixRules && challenge.remixRules.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Remix Rules</h4>
                <ul className="space-y-1">
                  {challenge.remixRules.map((rule, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-accent-500 mr-2">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChallengeCard
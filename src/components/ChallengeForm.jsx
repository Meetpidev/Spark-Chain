import { useState, useEffect } from 'react'

const ChallengeForm = ({ challenge = null, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullDescription, setFullDescription] = useState('')
  const [remixRules, setRemixRules] = useState(['', '', ''])
  const [errors, setErrors] = useState({})
  
  // Initialize form values when editing an existing challenge
  useEffect(() => {
    if (challenge) {
      setTitle(challenge.title)
      setShortDescription(challenge.shortDescription || '')
      setFullDescription(challenge.fullDescription || '')
      setRemixRules(challenge.remixRules?.length > 0 ? [...challenge.remixRules] : ['', '', ''])
    }
  }, [challenge])
  
  const handleRuleChange = (index, value) => {
    const newRules = [...remixRules]
    newRules[index] = value
    setRemixRules(newRules)
  }
  
  const addRuleField = () => {
    setRemixRules([...remixRules, ''])
  }
  
  const removeRuleField = (index) => {
    const newRules = [...remixRules]
    newRules.splice(index, 1)
    setRemixRules(newRules)
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = 'Challenge title is required'
    }
    
    if (!shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Filter out empty rule inputs
      const validRules = remixRules.filter(rule => rule.trim() !== '')
      
      // Prepare challenge object
      const challengeData = {
        id: challenge?.id || `challenge-${Date.now()}`,
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        remixRules: validRules
      }
      
      onSubmit(challengeData)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        {challenge ? 'Edit Challenge' : 'Create New Challenge'}
      </h2>
      
      <div className="mb-4">
        <label htmlFor="challenge-title" className="block text-sm font-medium text-gray-700 mb-1">
          Challenge Title
        </label>
        <input
          id="challenge-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.title ? 'border-error-500' : 'border-gray-300'
          }`}
          placeholder="Enter challenge title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-error-600">{errors.title}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="short-description" className="block text-sm font-medium text-gray-700 mb-1">
          Short Description
        </label>
        <input
          id="short-description"
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            errors.shortDescription ? 'border-error-500' : 'border-gray-300'
          }`}
          placeholder="Brief overview of the challenge"
        />
        {errors.shortDescription && (
          <p className="mt-1 text-sm text-error-600">{errors.shortDescription}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="full-description" className="block text-sm font-medium text-gray-700 mb-1">
          Full Description
        </label>
        <textarea
          id="full-description"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
          placeholder="Detailed description of the challenge"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Remix Rules
        </label>
        
        {remixRules.map((rule, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={`Rule ${index + 1} (e.g., "Flip It: Reverse the core assumption")`}
            />
            <button
              type="button"
              onClick={() => removeRuleField(index)}
              className="ml-2 p-2 text-error-500 hover:text-error-700 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addRuleField}
          className="mt-2 text-sm text-primary-600 hover:text-primary-800 flex items-center"
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Remix Rule
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
          {challenge ? 'Update Challenge' : 'Create Challenge'}
        </button>
      </div>
    </form>
  )
}

export default ChallengeForm
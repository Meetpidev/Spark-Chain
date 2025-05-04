import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Submissions = () => {
  const submissions = useSelector(state => state.rounds.submissions)
  const teams = useSelector(state => state.teams.teams)
  const currentChallenge = useSelector(state => state.challenges.currentChallenge)
  const totalRounds = useSelector(state => state.rounds.totalRounds)
  
  // Get final round submissions
  const finalRoundSubmissions = submissions[totalRounds - 1] || {}
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Submissions</h1>
        <p className="text-gray-600">
          Challenge: {currentChallenge?.title || 'No challenge selected'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map(team => {
          const finalSubmission = finalRoundSubmissions[team.id]
          
          return (
            <div key={team.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{team.name}</h2>
                <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                  Final Version
                </span>
              </div>
              
              {finalSubmission ? (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{finalSubmission}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No submission available</p>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Team Members</h3>
                <ul className="space-y-1">
                  {team.members.map((member, index) => (
                    <li key={index} className="text-sm text-gray-700">{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Link
          to="/workspace"
          className="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Back to Workspace
        </Link>
      </div>
    </div>
  )
}

export default Submissions
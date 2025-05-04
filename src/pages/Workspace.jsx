import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import IdeaCanvas from '../components/IdeaCanvas'
import { nextRound } from '../store/slices/roundsSlice'

const Workspace = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const teams = useSelector(state => state.teams.teams)
  const currentChallenge = useSelector(state => state.challenges.currentChallenge)
  const currentRound = useSelector(state => state.rounds.currentRound)
  const totalRounds = useSelector(state => state.rounds.totalRounds)
  const submissions = useSelector(state => state.rounds.submissions)
  const [selectedTeam, setSelectedTeam] = useState(null)
  
  // Check if we need to redirect
  useEffect(() => {
    if (teams.length === 0) {
      navigate('/teams')
    } else if (!currentChallenge) {
      navigate('/challenges')
    } else if (!selectedTeam && teams.length > 0) {
      // Auto-select the first team if none is selected
      setSelectedTeam(teams[0].id)
    }
  }, [teams, currentChallenge, navigate, selectedTeam])
  
  // Find previous submission for the current team
  const findPreviousSubmission = () => {
    if (currentRound === 0) return null
    
    // Get the previous round's submissions
    const prevRoundSubmissions = submissions[currentRound - 1]
    if (!prevRoundSubmissions) return null
    
    // Find the team whose work should be passed to the current team
    const teamIndex = teams.findIndex(team => team.id === selectedTeam)
    const previousTeamIndex = (teamIndex - 1 + teams.length) % teams.length
    const previousTeamId = teams[previousTeamIndex]?.id
    
    return prevRoundSubmissions[previousTeamId]
  }
  
  const handleFinalSubmit = () => {
    navigate('/submissions')
  }
  
  if (!teams.length || !currentChallenge || !selectedTeam) {
    return <div className="py-8 px-4 text-center">Loading...</div>
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
            <p className="text-gray-600">
              {currentChallenge.title}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="team-select" className="text-sm font-medium text-gray-700">
              Working as:
            </label>
            <select
              id="team-select"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-secondary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-secondary-800">
                Round {currentRound + 1} Instructions
              </h3>
              <div className="mt-2 text-sm text-secondary-700">
                {currentRound === 0 ? (
                  <p>
                    This is the initial brainstorming round. Create your first idea in response to the challenge.
                  </p>
                ) : currentRound === totalRounds - 1 ? (
                  <p>
                    Final round! Review and enhance the idea you've received. When finished, submit your final version.
                  </p>
                ) : (
                  <p>
                    Remix the idea you've received based on this rule: <br />
                    <strong className="text-secondary-900">
                      {currentChallenge.remixRules && currentChallenge.remixRules[currentRound - 1] 
                        ? currentChallenge.remixRules[currentRound - 1]
                        : "Add your creative twist to the previous team's idea!"}
                    </strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <IdeaCanvas 
            teamId={selectedTeam}
            roundId={currentRound}
            previousSubmission={findPreviousSubmission()}
          />
          
          {currentRound === totalRounds - 1 && submissions[currentRound]?.[selectedTeam] && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleFinalSubmit}
                className="px-6 py-3 bg-success-500 text-white rounded-md font-medium hover:bg-success-600 transition-colors flex items-center"
              >
                Submit Final Version
                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <div>
          <Timer />
          
          <div className="bg-white rounded-lg shadow-md p-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Details</h3>
            <p className="text-gray-700 mb-4">
              {currentChallenge.shortDescription}
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Original Challenge</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {currentChallenge.fullDescription || 'No detailed description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
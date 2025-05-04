import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket } from '../services/socketService'

const Home = () => {
  const dispatch = useDispatch()
  const isConnected = useSelector(state => state.socket.connected)
  const teams = useSelector(state => state.teams.teams)
  
  useEffect(() => {
    // Initialize socket connection when component mounts
    if (!isConnected) {
      connectSocket(dispatch)
    }
  }, [dispatch, isConnected])
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Spark Chain</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A dynamic, playful engagement format that fuses creative remix culture 
          with collaborative problem-solving.
        </p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 mb-4 mx-auto">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Initial Challenge</h3>
            <p className="text-gray-600 text-center">
              All teams receive the same challenge and develop an initial solution in a short, focused sprint.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-secondary-100 text-secondary-600 mb-4 mx-auto">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Pass & Remix</h3>
            <p className="text-gray-600 text-center">
              At the buzzer, teams pass their work to another team who remixes and evolves the idea further.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-accent-100 text-accent-600 mb-4 mx-auto">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Multiple Rounds</h3>
            <p className="text-gray-600 text-center">
              The relay continues for several rounds, with each team building on a different team's evolving idea.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-center items-center h-12 w-12 rounded-full bg-success-100 text-success-600 mb-4 mx-auto">
              <span className="text-lg font-bold">4</span>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">Final Showcase</h3>
            <p className="text-gray-600 text-center">
              Teams present the latest version of the idea they inherited, explaining both the evolution and their remix choices.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">
            Ready to run a Spark Chain session? Follow these steps to begin:
          </p>
          <ol className="space-y-4 mb-6">
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3">
                <span className="text-sm font-medium">1</span>
              </div>
              <p className="text-gray-600">Create or select teams for your session</p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3">
                <span className="text-sm font-medium">2</span>
              </div>
              <p className="text-gray-600">Set up a challenge with clear remix rules</p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3">
                <span className="text-sm font-medium">3</span>
              </div>
              <p className="text-gray-600">Start the session and guide teams through each round</p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary-100 text-primary-600 mr-3">
                <span className="text-sm font-medium">4</span>
              </div>
              <p className="text-gray-600">Facilitate the final presentations and discussion</p>
            </li>
          </ol>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link 
              to="/teams" 
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              Manage Teams
            </Link>
            <Link 
              to="/challenges" 
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-500 hover:bg-secondary-600 transition-colors"
            >
              Create Challenge
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Remix Rules</h2>
          <p className="text-gray-600 mb-6">
            Keep it playful and challenging with these remix rule ideas:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex">
              <span className="text-accent-500 mr-2">•</span>
              <div>
                <p className="font-medium text-gray-900">Mashup</p>
                <p className="text-gray-600 text-sm">Combine the idea with an unrelated concept (e.g., "What if this solution was also a dating app?")</p>
              </div>
            </li>
            <li className="flex">
              <span className="text-accent-500 mr-2">•</span>
              <div>
                <p className="font-medium text-gray-900">Flip It</p>
                <p className="text-gray-600 text-sm">Reverse the core assumption or intended user</p>
              </div>
            </li>
            <li className="flex">
              <span className="text-accent-500 mr-2">•</span>
              <div>
                <p className="font-medium text-gray-900">Shrink & Stretch</p>
                <p className="text-gray-600 text-sm">Adapt the idea for a radically different scale (e.g., from local to global, or vice versa)</p>
              </div>
            </li>
            <li className="flex">
              <span className="text-accent-500 mr-2">•</span>
              <div>
                <p className="font-medium text-gray-900">Wild Card</p>
                <p className="text-gray-600 text-sm">Add a random constraint or ingredient to push creativity further</p>
              </div>
            </li>
          </ul>
          <Link 
            to="/workspace" 
            className={`inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors ${
              teams.length > 0 
                ? 'text-white bg-accent-500 hover:bg-accent-600' 
                : 'text-gray-500 bg-gray-200 cursor-not-allowed'
            }`}
            onClick={(e) => teams.length === 0 && e.preventDefault()}
          >
            {teams.length > 0 ? 'Enter Workspace' : 'Create Teams First'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
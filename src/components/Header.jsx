import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const currentRound = useSelector(state => state.rounds.currentRound)
  const totalRounds = useSelector(state => state.rounds.totalRounds)
  const isConnected = useSelector(state => state.socket.connected)
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  return (
    <header className="bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 9L15 15M15 9L9 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-900">Spark Chain</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isConnected && (
              <div className="flex items-center px-3 py-1 rounded-full bg-success-100 text-success-800">
                <div className="h-2 w-2 rounded-full bg-success-500 mr-2"></div>
                <span className="text-sm">Connected</span>
              </div>
            )}
            
            {location.pathname !== '/' && (
              <div className="ml-4 px-3 py-1 rounded-full bg-secondary-100 text-secondary-800">
                <span className="text-sm">Round {currentRound + 1}/{totalRounds}</span>
              </div>
            )}
            
            <nav className="ml-6 flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/challenges" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/challenges' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Challenges
              </Link>
              <Link 
                to="/teams" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/teams' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Teams
              </Link>
              <Link 
                to="/workspace" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/workspace' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Workspace
              </Link>

                  <Link 
                to="/submissions" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/teams' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                submissions
              </Link>
            </nav>
          </div>
          
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'text-white bg-primary-500' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/challenges" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/challenges' 
                  ? 'text-white bg-primary-500' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/teams" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/teams' 
                  ? 'text-white bg-primary-500' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/workspace" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/workspace' 
                  ? 'text-white bg-primary-500' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Workspace
            </Link>
              <Link 
                to="/submissions" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/teams' 
                    ? 'text-white bg-primary-500' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                submissions
              </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
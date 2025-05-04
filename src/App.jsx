import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Home from './pages/Home'
import Teams from './pages/Teams'
import Challenges from './pages/Challenges'
import Workspace from './pages/Workspace'
import Submissions from './pages/Submissions'
import { connectSocket, disconnectSocket } from './services/socketService'

function App() {
  const dispatch = useDispatch()

  // Initialize socket connection when app loads
  useEffect(() => {
    const socket = connectSocket(dispatch)
    
    // Cleanup on unmount
    return () => {
      disconnectSocket()
    }
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Spark Chain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
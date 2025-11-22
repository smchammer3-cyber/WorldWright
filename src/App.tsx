import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { GeneratorScreen } from './screens/GeneratorScreen'
import { EditorScreen } from './screens/EditorScreen'
import { restoreFromLocalStorage } from './core/worldStorage'

function AppRoutes() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            onCreateNewWorld={() => navigate('/generate')}
            onOpenWorld={() => navigate('/editor')}
          />
        }
      />
      <Route
        path="/generate"
        element={
          <GeneratorScreen
            onBack={() => navigate('/')}
            onWorldGenerated={() => {
              // Later: navigate to /editor/:id and load that world.
              navigate('/editor')
            }}
          />
        }
      />
      <Route
        path="/editor"
        element={<EditorScreen onBack={() => navigate('/')} />}
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  useEffect(() => {
    restoreFromLocalStorage()
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
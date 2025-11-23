import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { GeneratorScreen } from './screens/GeneratorScreen'
import { EditorScreen } from './screens/EditorScreen'
import { restoreFromLocalStorage } from './core/worldStorage'

function AppRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    // Load any saved worlds once on app start
    restoreFromLocalStorage()
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            onCreateNewWorld={() => navigate('/generate')}
            onOpenWorld={(id) => navigate(`/edit/${id}`)}
          />
        }
      />
      <Route
        path="/generate"
        element={
          <GeneratorScreen
            onBack={() => navigate('/')}
            onWorldGenerated={(worldId) => navigate(`/edit/${worldId}`)}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={<EditorScreen onBack={() => navigate('/')} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 6A – Mode routing cleanup.
// Purpose:
// - Keep Home as the landing screen.
// - Route /generate through GenerateModeApp.
// - Route "open world" flows through CreateModeApp.
// - Expose SimModeApp route for future use.
// - Stop using legacy GeneratorScreen / EditorScreen.

import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import { HomeScreen } from './screens/HomeScreen'
import { restoreFromLocalStorage } from './core/worldStorage'

import GenerateModeApp from './modes/generate/GenerateModeApp'
import CreateModeApp from './modes/create/CreateModeApp'
import SimModeApp from './modes/sim/SimModeApp'

function AppRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    // Make sure saved worlds are available before any screen/mode renders.
    restoreFromLocalStorage()
  }, [])

  return (
    <Routes>
      {/* Home: list of worlds + "New World" */}
      <Route
        path="/"
        element={
          <HomeScreen
            onCreateNewWorld={() => navigate('/generate')}
            onOpenWorld={id => navigate(`/modes/create/${id}`)}
          />
        }
      />

      {/* Generate Mode: main generator mini-app */}
      <Route path="/generate" element={<GenerateModeApp />} />

      {/* Create Mode: edit / paint a specific world */}
      <Route path="/modes/create/:id" element={<CreateModeApp />} />

      {/* Sim Mode: simulate a specific world (placeholder for now) */}
      <Route path="/modes/sim/:id" element={<SimModeApp />} />

      {/* Fallback: anything unknown goes home */}
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
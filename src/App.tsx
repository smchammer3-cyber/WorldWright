// JARVIS_CHANGE
// Date: 2025-12-03
// Step: 6A-6 -- Legacy screen cleanup, modes-first routing.
//
// Purpose:
// - Keep Home as the landing screen.
// - Route /generate through GenerateModeApp.
// - Route "open world" flows through CreateModeApp.
// - Expose SimModeApp route for future use.
// - Do NOT use GeneratorScreen or EditorScreen anymore.

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
    // Ensure saved worlds are loaded before UI relies on them.
    restoreFromLocalStorage()
  }, [])

  return (
    <Routes>
      {/* Home: world list + "New World" entry */}
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

      {/* Create Mode: edit a specific world */}
      <Route path="/modes/create/:id" element={<CreateModeApp />} />

      {/* Sim Mode: simulate a specific world (currently placeholder) */}
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
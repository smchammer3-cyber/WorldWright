// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 6A – AppShell + Mode routing scaffolding.
// Purpose:
// - Keep existing Home + Editor flows working.
// - Route /generate through the new GenerateModeApp mini-app.
// - Expose explicit routes for Create/Sim mode placeholders.

import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import { HomeScreen } from './screens/HomeScreen'
import { EditorScreen } from './screens/EditorScreen'
import { restoreFromLocalStorage } from './core/worldStorage'

import GenerateModeApp from './modes/generate/GenerateModeApp'
import CreateModeApp from './modes/create/CreateModeApp'
import SimModeApp from './modes/sim/SimModeApp'

function AppRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    // Restore any saved worlds from localStorage on startup so the
    // Home screen and mode apps can see existing worlds immediately.
    restoreFromLocalStorage()
  }, [])

  return (
    <Routes>
      {/* Home screen */}
      <Route
        path="/"
        element={
          <HomeScreen
            onCreateNewWorld={() => navigate('/generate')}
            onOpenWorld={(id) => navigate(`/edit/${id}`)}
          />
        }
      />

      {/* Generate Mode: main generator entry point */}
      <Route path="/generate" element={<GenerateModeApp />} />

      {/* Create/Sim modes (currently placeholder shells) */}
      <Route path="/modes/create/:id" element={<CreateModeApp />} />
      <Route path="/modes/sim/:id" element={<SimModeApp />} />

      {/* Legacy Editor stub (still used after saving from generator for now) */}
      <Route
        path="/edit/:id"
        element={<EditorScreen onBack={() => navigate('/')} />}
      />

      {/* Fallback */}
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
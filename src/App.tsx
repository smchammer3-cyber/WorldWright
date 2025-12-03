// ===============================================
// JARVIS CHANGE HEADER (6A-1)
// File: src/App.tsx
// Purpose:
// - Keep existing screens working (Home, Generator, Editor).
// - Add initial mode mini-app routes for Generate/Create/Sim.
// - Prepare for future migration from screens -> modes without
//   breaking current functionality.
// ===============================================

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

// New mode mini-apps (placeholders for now)
import GenerateModeApp from './modes/generate/GenerateModeApp'
import CreateModeApp from './modes/create/CreateModeApp'
import SimModeApp from './modes/sim/SimModeApp'

function AppRoutes() {
  const navigate = useNavigate()

  useEffect(() => {
    // Restore any saved worlds from LocalStorage on startup
    restoreFromLocalStorage()
  }, [])

  return (
    <Routes>
      {/* Home screen (unchanged behavior) */}
      <Route
        path="/"
        element={
          <HomeScreen
            onCreateNewWorld={() => navigate('/generate')}
            onOpenWorld={id => navigate(`/edit/${id}`)}
          />
        }
      />

      {/* Existing Generator screen (still the main generator for now) */}
      <Route
        path="/generate"
        element={<GeneratorScreen onBack={() => navigate('/')} />}
      />

      {/* Existing Editor screen (stub UI for now) */}
      <Route
        path="/edit/:id"
        element={<EditorScreen onBack={() => navigate('/')} />}
      />

      {/* NEW: mode-based mini-app routes (6A scaffolding) */}
      <Route path="/modes/generate" element={<GenerateModeApp />} />
      <Route path="/modes/create/:id" element={<CreateModeApp />} />
      <Route path="/modes/sim/:id" element={<SimModeApp />} />

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
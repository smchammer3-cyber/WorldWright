import React from 'react'
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
            onSaveWorld={() => {
              // Later: actually create a world, then open its editor.
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
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
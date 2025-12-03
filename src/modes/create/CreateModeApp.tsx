// ===============================================
// JARVIS CHANGE HEADER (6A placeholder)
// Create Mode placeholder, with correct AppShell import.
// ===============================================

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  return (
    <AppShell
      title="Create Mode"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-mode-placeholder-toolbar">
          <p>Create Mode tools will go here.</p>
        </div>
      }
      main={
        <div className="ww-mode-placeholder-main">
          <h2>Create Mode</h2>
          <p>World ID: {id ?? '(none)'}</p>
        </div>
      }
      minimapOverlay={
        <div className="ww-mode-placeholder-minimap">
          <p>Minimap placeholder</p>
        </div>
      }
      rightPanel={
        <div className="ww-mode-placeholder-right">
          <h3>Selection Info</h3>
        </div>
      }
    />
  )
}
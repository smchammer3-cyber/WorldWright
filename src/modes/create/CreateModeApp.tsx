// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 6A – Mode scaffolding (Create Mode placeholder).
// Purpose: Minimal Create Mode mini-app mounted inside AppShell.
//          This is a placeholder shell and does not yet edit world data.

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

export function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const leftToolbar = (
    <div className="ww-mode-placeholder-toolbar">
      <p>Create Mode tools will live here (brushes, painting, editing, etc.).</p>
    </div>
  )

  const mainContent = (
    <div className="ww-mode-placeholder-main">
      <h2>Create Mode</h2>
      <p>
        World ID: <strong>{id ?? 'none'}</strong>
      </p>
      <p>
        This is a temporary placeholder. Later, this mode will load the selected world
        and allow editing terrain, biomes, cities, and other details.
      </p>
    </div>
  )

  const minimapOverlay = (
    <div className="ww-mode-placeholder-minimap">
      <p>Minimap (placeholder)</p>
    </div>
  )

  const rightPanel = (
    <div className="ww-mode-placeholder-right">
      <h3>Selection Info</h3>
      <p>
        In the final version, this panel will show details about whatever you have
        selected in the world.
      </p>
    </div>
  )

  return (
    <AppShell
      title="Create Mode"
      onBack={() => navigate('/')}
      leftToolbar={leftToolbar}
      main={mainContent}
      minimapOverlay={minimapOverlay}
      rightPanel={rightPanel}
    />
  )
}

export default CreateModeApp
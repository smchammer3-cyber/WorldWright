// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 6A – Mode scaffolding (Sim Mode placeholder).
// Purpose: Minimal Sim Mode mini-app mounted inside AppShell.
//          This is a placeholder shell and does not yet simulate world data.

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'

export function SimModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const leftToolbar = (
    <div className="ww-mode-placeholder-toolbar">
      <p>Simulation controls will live here (time, layers, history playback).</p>
    </div>
  )

  const mainContent = (
    <div className="ww-mode-placeholder-main">
      <h2>Sim Mode</h2>
      <p>
        World ID: <strong>{id ?? 'none'}</strong>
      </p>
      <p>
        This is a temporary placeholder. Later, this mode will simulate climate,
        societies, and history over time.
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
      <h3>Simulation Info</h3>
      <p>
        In the final version, this panel will show stats, charts, and summaries
        about the simulation state.
      </p>
    </div>
  )

  return (
    <AppShell
      title="Sim Mode"
      onBack={() => navigate('/')}
      leftToolbar={leftToolbar}
      main={mainContent}
      minimapOverlay={minimapOverlay}
      rightPanel={rightPanel}
    />
  )
}

export default SimModeApp
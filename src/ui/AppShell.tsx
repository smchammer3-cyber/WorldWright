// JARVIS_CHANGE
// Date: 2025-12-02
// Step: 6A-1 – Implement AppShell layout structure.
// This sets up the shared layout used later by Generate/Create/Sim.
// No logic yet, just the skeleton layout.

import React from 'react'

interface AppShellProps {
  title: string
  onBack?: () => void
  leftToolbar?: React.ReactNode
  main?: React.ReactNode
  minimapOverlay?: React.ReactNode
  rightPanel?: React.ReactNode
}

export function AppShell({
  title,
  onBack,
  leftToolbar,
  main,
  minimapOverlay,
  rightPanel,
}: AppShellProps) {
  return (
    <div className="ww-screen">
      {/* Header */}
      <header className="ww-screen-header">
        <div className="ww-screen-header-left">
          {onBack && (
            <button className="ww-secondary-btn" onClick={onBack}>
              Back
            </button>
          )}
          <h1 className="ww-screen-title">{title}</h1>
        </div>
        <div className="ww-screen-header-right" />
      </header>

      {/* Three-panel layout */}
      <div className="ww-generator-layout">
        {/* Left toolbar */}
        <aside className="ww-left-toolbar">
          {leftToolbar}
        </aside>

        {/* Center viewport */}
        <main className="ww-main-panel">
          <div className="ww-main-viewport">
            {main}

            {/* Minimap overlay (bottom-left) */}
            {minimapOverlay && (
              <div className="ww-minimap-overlay">
                {minimapOverlay}
              </div>
            )}
          </div>
        </main>

        {/* Right info panel */}
        <aside className="ww-right-panel">
          {rightPanel}
        </aside>
      </div>
    </div>
  )
}
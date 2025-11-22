import React, { useState } from 'react'

type EditorMode = 'create' | 'sim'
type EditorView = 'globe' | 'map'

interface EditorScreenProps {
  onBack: () => void
}

export function EditorScreen(props: EditorScreenProps) {
  const { onBack } = props
  const [mode, setMode] = useState<EditorMode>('create')
  const [view, setView] = useState<EditorView>('map')

  return (
    <div className="ww-editor-root">
      <header className="ww-screen-header">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <div className="ww-breadcrumb">World Editor</div>
      </header>

      <div className="ww-editor-main">
        <aside className="ww-sidebar">
          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">Mode</div>
            <div className="ww-segmented">
              <button
                className={mode === 'create' ? 'active' : ''}
                onClick={() => setMode('create')}
              >
                Create
              </button>
              <button
                className={mode === 'sim' ? 'active' : ''}
                onClick={() => setMode('sim')}
              >
                Sim
              </button>
            </div>
          </div>

          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">View</div>
            <div className="ww-segmented">
              <button
                className={view === 'map' ? 'active' : ''}
                onClick={() => setView('map')}
              >
                Map
              </button>
              <button
                className={view === 'globe' ? 'active' : ''}
                onClick={() => setView('globe')}
              >
                Globe
              </button>
            </div>
          </div>

          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">Tools</div>
            <ul className="ww-tool-list">
              <li>Terrain</li>
              <li>Biomes</li>
              <li>Water</li>
              <li>Nations</li>
              <li>Cities &amp; Cultures</li>
            </ul>
          </div>
        </aside>

        <main className="ww-canvas-area">
          <div className="ww-canvas-placeholder">
            <p>
              {mode === 'create' ? 'Create Mode' : 'Sim Mode'} –{' '}
              {view.toUpperCase()} view will appear here in later steps.
            </p>
          </div>
        </main>

        <aside className="ww-right-panel">
          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">Info</div>
            <p>
              Object details will appear here when selecting countries, cities,
              cultures, or terrain.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
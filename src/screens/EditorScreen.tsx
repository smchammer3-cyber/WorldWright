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
      <header className="ww-editor-topbar">
        <button className="ww-secondary-btn" onClick={onBack}>
          ← Worlds
        </button>
        <div className="ww-breadcrumb">World Editor – (placeholder world)</div>
        <div className="ww-topbar-actions">
          <button className="ww-secondary-btn">Export</button>
          <button className="ww-secondary-btn">Save</button>
        </div>
      </header>

      <div className="ww-editor-main">
        <aside className="ww-sidebar">
          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">Mode</div>
            <div className="ww-toggle-group">
              <button
                className={mode === 'create' ? 'ww-toggle-active' : 'ww-toggle'}
                onClick={() => setMode('create')}
              >
                Create
              </button>
              <button
                className={mode === 'sim' ? 'ww-toggle-active' : 'ww-toggle'}
                onClick={() => setMode('sim')}
              >
                Sim
              </button>
            </div>
          </div>

          <div className="ww-sidebar-section">
            <div className="ww-sidebar-label">View</div>
            <div className="ww-toggle-group">
              <button
                className={view === 'globe' ? 'ww-toggle-active' : 'ww-toggle'}
                onClick={() => setView('globe')}
              >
                Globe
              </button>
              <button
                className={view === 'map' ? 'ww-toggle-active' : 'ww-toggle'}
                onClick={() => setView('map')}
              >
                Map
              </button>
            </div>
          </div>

          {mode === 'create' ? (
            <div className="ww-sidebar-section">
              <div className="ww-sidebar-label">Create Tools</div>
              <ul className="ww-tool-list">
                <li>Terrain Stickers</li>
                <li>Biome Brush</li>
                <li>Lakes & Rivers</li>
                <li>Countries & Borders</li>
                <li>Cities & Cultures</li>
              </ul>
            </div>
          ) : (
            <div className="ww-sidebar-section">
              <div className="ww-sidebar-label">Sim Tools</div>
              <ul className="ww-tool-list">
                <li>Time Controls</li>
                <li>World Stats</li>
                <li>Decision Inbox</li>
              </ul>
            </div>
          )}
        </aside>

        <main className="ww-editor-canvas">
          <div className="ww-canvas-header">
            <span>
              {mode === 'create' ? 'Create Mode' : 'Sim Mode'} –{' '}
              {view === 'map' ? 'Map View' : 'Globe View'}
            </span>
          </div>
          <div className="ww-canvas-body">
            <p>
              The {view} canvas will render the world grid here. For now this is a
              placeholder matching the blueprint layout.
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
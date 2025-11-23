import React, { useState } from 'react'

type EditorMode = 'create' | 'sim'
type EditorView = 'globe' | 'map'

interface EditorScreenProps {
  onBack: () => void
}

export function EditorScreen({ onBack }: EditorScreenProps) {
  const [mode, setMode] = useState<EditorMode>('create')
  const [view, setView] = useState<EditorView>('map')

  return (
    <div className="ww-screen">
      <header className="ww-screen-header">
        <button className="ww-secondary-button" onClick={onBack}>
          ← Back
        </button>
        <div>
          <h1 className="ww-title">World Editor</h1>
          <p className="ww-subtitle">
            Political borders, cultures, and history layers will live here.
          </p>
        </div>
      </header>

      <div className="ww-editor-layout">
        <aside className="ww-left-toolbar">
          <div className="ww-toolbar-group">
            <div className="ww-toolbar-label">Mode</div>
            <button
              className={
                'ww-toolbar-button' +
                (mode === 'create' ? ' ww-toolbar-button--active' : '')
              }
              onClick={() => setMode('create')}
            >
              Create
            </button>
            <button
              className={
                'ww-toolbar-button' +
                (mode === 'sim' ? ' ww-toolbar-button--active' : '')
              }
              onClick={() => setMode('sim')}
            >
              Sim
            </button>
          </div>

          <div className="ww-toolbar-group">
            <div className="ww-toolbar-label">View</div>
            <button
              className={
                'ww-toolbar-button' +
                (view === 'map' ? ' ww-toolbar-button--active' : '')
              }
              onClick={() => setView('map')}
            >
              Map
            </button>
            <button
              className={
                'ww-toolbar-button' +
                (view === 'globe' ? ' ww-toolbar-button--active' : '')
              }
              onClick={() => setView('globe')}
            >
              Globe
            </button>
          </div>
        </aside>

        <main className="ww-main-panel">
          <div className="ww-main-canvas-placeholder">
            <p>
              Editor tools for <strong>{mode}</strong> mode and{' '}
              <strong>{view}</strong> view will appear here in the next steps.
            </p>
          </div>
        </main>

        <aside className="ww-right-panel">
          <div className="ww-info-panel">
            <div className="ww-info-title">Selection Info</div>
            <p>
              When you select countries, cities, or regions, detailed info will
              appear here.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
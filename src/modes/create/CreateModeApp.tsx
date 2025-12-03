// ===============================================
// JARVIS CHANGE HEADER (6A-5)
// File: src/modes/create/CreateModeApp.tsx
//
// Purpose:
// - Make Create Mode use the same overall layout pattern
//   as Generate Mode (AppShell main viewport + minimap).
// - Load the world by id, render a 2D map as the main view,
//   and show a smaller minimap in the bottom-left overlay.
// - Keep tools and editing behavior as future work.
// ===============================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { getWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas } from '../../core/planetRenderer'

type LoadedWorld = any // flexible for now; we only read a few fields

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)

  const mainMapCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Load world by id
  useEffect(() => {
    if (!id) {
      setWorld(null)
      setNotFound(true)
      return
    }

    const loaded = getWorld(id)
    if (!loaded) {
      setWorld(null)
      setNotFound(true)
    } else {
      setWorld(loaded)
      setNotFound(false)
    }
  }, [id])

  // Render main map and minimap when world is ready
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainMapCanvasRef.current
    const miniCanvas = minimapCanvasRef.current
    if (!mainCanvas || !miniCanvas) return

    const mainCtx = mainCanvas.getContext('2d')
    const miniCtx = miniCanvas.getContext('2d')
    if (!mainCtx || !miniCtx) return

    const w = world as any
    const width: number = w.width
    const height: number = w.height
    const cells: { baseHeight: number }[] = w.cells
    const seaLevel: number = w.seaLevel ?? 0

    const preview = { width, height, cells, seaLevel }

    // Main map viewport (center of screen)
    mainCanvas.width = 512
    mainCanvas.height = 256
    renderPlanetToCanvas(mainCtx, preview)

    // Minimap overlay card (bottom-left)
    miniCanvas.width = 200
    miniCanvas.height = 100
    renderPlanetToCanvas(miniCtx, preview)
  }, [world])

  // ----- Left toolbar -----

  const leftToolbar = (
    <div className="ww-mode-placeholder-toolbar">
      {notFound ? (
        <>
          <p className="ww-panel-text">
            World could not be found. It may have been deleted or the id is invalid.
          </p>
          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      ) : !world ? (
        <p className="ww-panel-text">Loading world</p>
      ) : (
        <>
          <h3 className="ww-panel-title">World details</h3>
          <p className="ww-panel-text">
            Name:{' '}
            <strong>{(world as any).name || 'Unnamed world'}</strong>
          </p>
          <p className="ww-panel-text">
            Size:{' '}
            <strong>
              {(world as any).width} × {(world as any).height}
            </strong>
          </p>
          <p className="ww-panel-text">
            Seed:{' '}
            <strong>{String((world as any).seed ?? 'none')}</strong>
          </p>

          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      )}
    </div>
  )

  // ----- Main viewport -----

  let mainContent: React.ReactNode

  if (notFound) {
    mainContent = (
      <div className="ww-mode-placeholder-main">
        <h2>World not found</h2>
        <p>Use the Back button or the home screen to pick another world.</p>
      </div>
    )
  } else if (!world) {
    mainContent = (
      <div className="ww-mode-placeholder-main">
        <h2>Loading</h2>
        <p>Fetching world data from storage.</p>
      </div>
    )
  } else {
    // Unified pattern: main viewport is a single canvas, like Generate Mode
    mainContent = (
      <canvas
        ref={mainMapCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--map"
      />
    )
  }

  // ----- Minimap overlay -----

  const minimapOverlay =
    notFound || !world ? null : (
      <div className="ww-minimap-card">
        <canvas
          ref={minimapCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--minimap"
        />
      </div>
    )

  // ----- Right info panel -----

  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Create Mode</h2>
      {notFound ? (
        <p className="ww-panel-text">
          The requested world could not be loaded. This is a safe fallback state.
        </p>
      ) : !world ? (
        <p className="ww-panel-text">
          Waiting for world data to load. Once ready, the map will appear in the main view.
        </p>
      ) : (
        <p className="ww-panel-text">
          Create Mode is where you will paint, sculpt, and annotate this world.
          Right now this view confirms that the correct world is loaded and shows
          a flat map using the same renderer as the generator minimap. Tools and
          editing controls will be added in later steps.
        </p>
      )}
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
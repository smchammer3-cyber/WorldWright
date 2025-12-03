// ===============================================
// JARVIS CHANGE HEADER (6A-Create-1)
// File: src/modes/create/CreateModeApp.tsx
//
// Purpose:
// - Turn Create Mode into a *real* mode that actually
//   loads a world by id.
// - Show a flat map preview (main canvas) and a smaller
//   minimap overlay using the shared planet renderer.
// - Keep tools/painting as future work; this is a safe
//   first "world-loaded" Create Mode.
// ===============================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { getWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas } from '../../core/planetRenderer'

type LoadedWorld = any // keep types flexible; we only read width/height/cells/seaLevel

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)

  const mainMapCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Load the world when id changes
  useEffect(() => {
    if (!id) {
      setWorld(null)
      setNotFound(true)
      return
    }

    const w = getWorld(id)
    if (!w) {
      setWorld(null)
      setNotFound(true)
    } else {
      setWorld(w)
      setNotFound(false)
    }
  }, [id])

  // Render map + minimap whenever world changes
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

    // Main map: larger 2D view
    mainCanvas.width = 512
    mainCanvas.height = 256
    renderPlanetToCanvas(mainCtx, preview)

    // Minimap overlay: smaller card
    miniCanvas.width = 200
    miniCanvas.height = 100
    renderPlanetToCanvas(miniCtx, preview)
  }, [world])

  // ----- Left toolbar content -----

  const leftToolbar = (
    <div className="ww-mode-placeholder-toolbar">
      {notFound ? (
        <>
          <p className="ww-panel-text">
            World could not be found. It may have been deleted or the id is
            invalid.
          </p>
          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      ) : !world ? (
        <p className="ww-panel-text">Loading world…</p>
      ) : (
        <>
          <h3 className="ww-panel-title">World details</h3>
          <p className="ww-panel-text">
            Name:{' '}
            <strong>{(world as any).name || '(unnamed world)'}</strong>
          </p>
          <p className="ww-panel-text">
            Size:{' '}
            <strong>
              {(world as any).width} × {(world as any).height}
            </strong>
          </p>
          <p className="ww-panel-text">
            Seed: <strong>{String((world as any).seed ?? 'n/a')}</strong>
          </p>

          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      )}
    </div>
  )

  // ----- Main content area -----

  let mainContent: React.ReactNode

  if (notFound) {
    mainContent = (
      <div className="ww-mode-placeholder-main">
        <h2>World not found</h2>
        <p>Use the Back button to return to your world list.</p>
      </div>
    )
  } else if (!world) {
    mainContent = (
      <div className="ww-mode-placeholder-main">
        <h2>Loading…</h2>
        <p>Fetching world data from storage.</p>
      </div>
    )
  } else {
    mainContent = (
      <div className="ww-create-main">
        <h2 className="ww-panel-title">
          {(world as any).name || 'Untitled world'}
        </h2>
        <p className="ww-panel-text">
          This is a first-pass Create Mode view. The map below shows your
          generated world using the same renderer as the minimap. Painting and
          editing tools will be added in later steps.
        </p>
        <canvas
          ref={mainMapCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--map"
        />
      </div>
    )
  }

  // ----- Minimap overlay -----

  const minimapOverlay = notFound ? null : (
    <div className="ww-minimap-card">
      <canvas
        ref={minimapCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--minimap"
      />
    </div>
  )

  // ----- Right panel -----

  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Create Mode</h2>
      {notFound ? (
        <p className="ww-panel-text">
          The requested world could not be loaded. Check your world list on the
          home screen.
        </p>
      ) : (
        <p className="ww-panel-text">
          Create Mode is where you&apos;ll paint, sculpt, and annotate this
          world. For now, this view confirms that the correct world is loaded
          and shows a flat map preview using the shared renderer.
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
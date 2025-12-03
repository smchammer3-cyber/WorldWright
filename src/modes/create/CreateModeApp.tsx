// ========================================================
// JARVIS_CHANGE (6A-5 -- Unify Create Mode Layout)
// Date: 2025-12-03
//
// Purpose:
// - Make Create Mode visually match Generate Mode.
// - Center the main map in the viewport.
// - Place the minimap in the same bottom-left card position.
// - Keep all existing behavior: world loading + 2D render.
// ========================================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { getWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas } from '../../core/planetRenderer'

type LoadedWorld = any // we only read width/height/cells/seaLevel/name/seed

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)

  const mainMapCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Load the world by id
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

  // Render main map + minimap when world changes
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

    // Main map viewport (larger)
    mainCanvas.width = 512
    mainCanvas.height = 256
    renderPlanetToCanvas(mainCtx, preview)

    // Minimap overlay (smaller)
    miniCanvas.width = 200
    miniCanvas.height = 100
    renderPlanetToCanvas(miniCtx, preview)
  }, [world])

  // -------- Left toolbar (world info / navigation) --------

  const leftToolbar = (
    <div className="ww-left-panel-inner">
      {notFound ? (
        <>
          <h3 className="ww-panel-title">World not found</h3>
          <p className="ww-panel-text">
            The requested world could not be loaded. It may have been deleted or
            the link is invalid.
          </p>
          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      ) : !world ? (
        <>
          <h3 className="ww-panel-title">Loading…</h3>
          <p className="ww-panel-text">Fetching world data from storage.</p>
        </>
      ) : (
        <>
          <h3 className="ww-panel-title">World details</h3>
          <p className="ww-panel-text">
            Name:{' '}
            <strong>{(world as any).name || 'Untitled world'}</strong>
          </p>
          <p className="ww-panel-text">
            Size:{' '}
            <strong>
              {(world as any).width} × {(world as any).height}
            </strong>
          </p>
          <p className="ww-panel-text">
            Seed:{' '}
            <strong>{String((world as any).seed ?? 'seed')}</strong>
          </p>

          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      )}
    </div>
  )

  // -------- Main viewport content (center) --------

  let mainViewport: React.ReactNode

  if (notFound) {
    mainViewport = (
      <div className="ww-main-viewport-empty">
        <h2 className="ww-panel-title">World not found</h2>
        <p className="ww-panel-text">
          Use the Back button on the left to return to your world list.
        </p>
      </div>
    )
  } else if (!world) {
    mainViewport = (
      <div className="ww-main-viewport-empty">
        <h2 className="ww-panel-title">Loading world…</h2>
        <p className="ww-panel-text">
          The world data is being loaded from storage.
        </p>
      </div>
    )
  } else {
    mainViewport = (
      <div className="ww-main-viewport-content">
        <div className="ww-map-frame">
          <canvas
            ref={mainMapCanvasRef}
            className="ww-preview-canvas ww-preview-canvas--map"
          />
        </div>
      </div>
    )
  }

  // -------- Minimap overlay (bottom-left of viewport) --------

  const minimapOverlay =
    notFound || !world ? null : (
      <div className="ww-minimap-card">
        <canvas
          ref={minimapCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--minimap"
        />
      </div>
    )

  // -------- Right panel (mode description) --------

  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Create Mode</h2>
      {notFound ? (
        <p className="ww-panel-text">
          This mode couldn&apos;t load a world. Once you select a valid world
          from the home screen, this panel will show tips and details for
          editing it.
        </p>
      ) : (
        <p className="ww-panel-text">
          This preview confirms the world is loaded using the same renderer as
          the generator minimap. Painting, sculpting, and editing tools begin in
          Step 6B.
        </p>
      )}
    </div>
  )

  // -------- AppShell integration --------

  return (
      <AppShell
        title="Create Mode"
        onBack={() => navigate('/')}
        leftToolbar={leftToolbar}
        main={mainViewport}
        minimapOverlay={minimapOverlay}
        rightPanel={rightPanel}
      />
  )
}
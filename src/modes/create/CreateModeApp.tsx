// ========================================================
// JARVIS_CHANGE (6A-5 -- Unify Create Mode Layout)
// Date: 2025-12-03
//
// Purpose:
// - Make Create Mode visually match Generate Mode
// - Correct main viewport centering
// - Correct minimap placement inside AppShell
// - Maintain all functionality (world loading + 2D render)
// ========================================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { getWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas } from '../../core/planetRenderer'

type LoadedWorld = any

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // ------------------------
  // Load world
  // ------------------------
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

  // ------------------------
  // Render map + minimap
  // ------------------------
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainCanvasRef.current
    const miniCanvas = minimapCanvasRef.current
    if (!mainCanvas || !miniCanvas) return

    const mainCtx = mainCanvas.getContext('2d')
    const miniCtx = miniCanvas.getContext('2d')
    if (!mainCtx || !miniCtx) return

    const width = world.width
    const height = world.height
    const cells = world.cells
    const seaLevel = world.seaLevel ?? 0

    const preview = { width, height, cells, seaLevel }

    // Main map -- centered in viewport
    mainCanvas.width = 512
    mainCanvas.height = 256
    renderPlanetToCanvas(mainCtx, preview)

    // Minimap overlay
    miniCanvas.width = 200
    miniCanvas.height = 100
    renderPlanetToCanvas(miniCtx, preview)
  }, [world])

  // ------------------------
  // Left Toolbar
  // ------------------------
  const leftToolbar = (
    <div className="ww-mode-toolbar">
      {notFound ? (
        <>
          <p className="ww-panel-text">
            World could not be found.
          </p>
          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      ) : !world ? (
        <p className="ww-panel-text">Loading…</p>
      ) : (
        <>
          <h3 className="ww-panel-title">World details</h3>
          <p className="ww-panel-text">
            <strong>Name:</strong> {world.name || '(unnamed world)'}
          </p>
          <p className="ww-panel-text">
            <strong>Size:</strong> {world.width} × {world.height}
          </p>
          <p className="ww-panel-text">
            <strong>Seed:</strong> {String(world.seed ?? 'n/a')}
          </p>

          <button className="ww-primary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      )}
    </div>
  )

  // ------------------------
  // Main Viewport (Unified Layout)
  // ------------------------
  const mainViewport = (
    <div className="ww-main-viewport">
      {/* Center the map exactly like the globe in Generate Mode */}
      <canvas
        ref={mainCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--map"
      />
    </div>
  )

  // ------------------------
  // Minimap Overlay (same position as Generate Mode)
  // ------------------------
  const minimapOverlay =
    notFound || !world ? null : (
      <div className="ww-minimap-card">
        <canvas
          ref={minimapCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--minimap"
        />
      </div>
    )

  // ------------------------
  // Right Panel
  // ------------------------
  const rightPanel = (
    <div className="ww-right-panel-inner">
      <h2 className="ww-panel-title">Create Mode</h2>
      {notFound ? (
        <p className="ww-panel-text">
          World not found. Return home and select another world.
        </p>
      ) : (
        <p className="ww-panel-text">
          This preview confirms the world is loaded.  
          Painting, sculpting, and editing tools begin in Step 6B.
        </p>
      )}
    </div>
  )

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
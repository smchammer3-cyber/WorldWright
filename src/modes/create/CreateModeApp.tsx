// ========================================================
// JARVIS_CHANGE (6B-1 – Create Mode Inspect Tool)
// Date: 2025-12-03
//
// Purpose:
// - Keep Create Mode loading a real world by id.
// - Use AppShell with unified layout (left tools, main viewport,
//   minimap bottom-left, right info panel).
// - Add a first real tool: "Inspect".
//   • Click on the main 2D map to inspect a location.
//   • Show basic info (lat / lon / height / land vs water) in the right panel.
// - NO editing yet (read-only), consistent with non-destructive rules.
// ========================================================

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { getWorld } from '../../core/worldStorage'
import { renderPlanetToCanvas } from '../../core/planetRenderer'

type LoadedWorld = any

type SelectedCellInfo = {
  x: number
  y: number
  lat: number
  lon: number
  baseHeight: number
  isLand: boolean
}

type ActiveTool = 'inspect'

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [activeTool, setActiveTool] = useState<ActiveTool>('inspect')
  const [selectedCell, setSelectedCell] = useState<SelectedCellInfo | null>(
    null,
  )

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

    const w = world as any
    const width: number = w.width
    const height: number = w.height
    const cells: { baseHeight: number }[] = w.cells
    const seaLevel: number = w.seaLevel ?? 0

    const preview = { width, height, cells, seaLevel }

    // Main map: centered 2D view
    mainCanvas.width = 512
    mainCanvas.height = 256
    renderPlanetToCanvas(mainCtx, preview)

    // Minimap overlay: smaller card using the same preview
    miniCanvas.width = 200
    miniCanvas.height = 100
    renderPlanetToCanvas(miniCtx, preview)
  }, [world])

  // ------------------------
  // Inspect tool: click handler
  // ------------------------
  function handleMainCanvasClick(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (!world) return
    if (activeTool !== 'inspect') return

    const w = world as any
    const width: number = w.width
    const height: number = w.height
    const cells: { baseHeight: number }[] = w.cells
    const seaLevel: number = w.seaLevel ?? 0

    const canvas = mainCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const px = event.clientX - rect.left
    const py = event.clientY - rect.top

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return
    }

    const u = px / rect.width
    const v = py / rect.height

    const ix = Math.floor(u * width)
    const iy = Math.floor(v * height)

    if (ix < 0 || iy < 0 || ix >= width || iy >= height) {
      return
    }

    const index = iy * width + ix
    const cell = cells[index]
    const baseHeight = cell?.baseHeight ?? 0
    const isLand = baseHeight >= seaLevel

    // Approximate lat/lon assuming equirectangular projection.
    const lat = 90 - v * 180 // 90 (north) → -90 (south)
    const lon = u * 360 - 180 // -180 → 180

    setSelectedCell({
      x: ix,
      y: iy,
      lat,
      lon,
      baseHeight,
      isLand,
    })
  }

  // ------------------------
  // Left toolbar (tools + world summary)
  // ------------------------
  const leftToolbar = (
    <div className="ww-mode-toolbar">
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
          <h3 className="ww-panel-title">Tools</h3>
          <div className="ww-tool-list">
            <button
              type="button"
              className={
                activeTool === 'inspect'
                  ? 'ww-tool-button ww-tool-button--active'
                  : 'ww-tool-button'
              }
              onClick={() => setActiveTool('inspect')}
            >
              Inspect
            </button>
          </div>

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
            Seed:{' '}
            <strong>{String((world as any).seed ?? 'n/a')}</strong>
          </p>

          <button className="ww-secondary-btn" onClick={() => navigate('/')}>
            Back to worlds
          </button>
        </>
      )}
    </div>
  )

  // ------------------------
  // Main viewport
  // ------------------------
  let mainViewport: React.ReactNode

  if (notFound) {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">World not found</h2>
        <p className="ww-panel-text">
          Use the Back button to return to your world list.
        </p>
      </div>
    )
  } else if (!world) {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">Loading…</h2>
        <p className="ww-panel-text">Fetching world data from storage.</p>
      </div>
    )
  } else {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">
          {(world as any).name || 'Untitled world'}
        </h2>
        <p className="ww-panel-text">
          Click on the map to inspect locations. This is a read-only view for
          now; editing tools will arrive in later 6B steps.
        </p>
        <canvas
          ref={mainCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--map"
          onClick={handleMainCanvasClick}
        />
      </div>
    )
  }

  // ------------------------
  // Minimap overlay
  // ------------------------
  const minimapOverlay = notFound ? null : (
    <div className="ww-minimap-card">
      <canvas
        ref={minimapCanvasRef}
        className="ww-preview-canvas ww-preview-canvas--minimap"
      />
    </div>
  )

  // ------------------------
  // Right info panel
  // ------------------------
  let rightPanelContent: React.ReactNode

  if (notFound) {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Create Mode</h2>
        <p className="ww-panel-text">
          The requested world could not be loaded. Check your world list on the
          home screen.
        </p>
      </>
    )
  } else if (!world) {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Create Mode</h2>
        <p className="ww-panel-text">
          Loading world data. This panel will show information about the
          selected location once the world is ready.
        </p>
      </>
    )
  } else if (!selectedCell) {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Inspect Tool</h2>
        <p className="ww-panel-text">
          Click anywhere on the map to inspect a location. You&apos;ll see
          approximate latitude/longitude, height, and whether the point is land
          or water.
        </p>
      </>
    )
  } else {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Location details</h2>
        <p className="ww-panel-text">
          Grid position:{' '}
          <strong>
            ({selectedCell.x}, {selectedCell.y})
          </strong>
        </p>
        <p className="ww-panel-text">
          Approx. lat / lon:{' '}
          <strong>
            {selectedCell.lat.toFixed(2)}°, {selectedCell.lon.toFixed(2)}°
          </strong>
        </p>
        <p className="ww-panel-text">
          Base height:{' '}
          <strong>{selectedCell.baseHeight.toFixed(3)}</strong>
        </p>
        <p className="ww-panel-text">
          Surface:{' '}
          <strong>{selectedCell.isLand ? 'Land' : 'Water'}</strong>
        </p>
      </>
    )
  }

  const rightPanel = (
    <div className="ww-right-panel-inner">{rightPanelContent}</div>
  )

  // ------------------------
  // AppShell integration
  // ------------------------
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
// ========================================================
// JARVIS_CHANGE (6B-1, 6B-2 – Create Mode Inspect Tool + Terrain Brush)
// Date: 2025-12-03
//
// Purpose:
// - Keep Create Mode loading a real world by id.
// - Use AppShell with unified layout (left tools, main viewport,
//   minimap bottom-left, right info panel).
// - Add a first real tool: "Inspect" (6B-1).
//   • Click on the main 2D map to inspect a location.
//   • Show basic info (lat / lon / height / land vs water) in the right panel.
// - Add the first terrain editing tool: "Terrain brush" (6B-2).
//   • Terrain brush ONLY edits baseHeight (heightmap), never biomes or stickers.
//   • Click or drag on the map to gently raise/lower terrain.
// - Still an early Create Mode: only Inspect + height brush are available.
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

type ActiveTool = 'inspect' | 'terrain-brush'
type BrushMode = 'raise' | 'lower'

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [activeTool, setActiveTool] = useState<ActiveTool>('inspect')
  const [selectedCell, setSelectedCell] = useState<SelectedCellInfo | null>(
    null,
  )

  const [brushMode, setBrushMode] = useState<BrushMode>('raise')
  const [brushRadius, setBrushRadius] = useState<number>(6)
  const [brushStrength, setBrushStrength] = useState<number>(0.05)
  const [isBrushing, setIsBrushing] = useState(false)

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

    if (!width || !height || !Array.isArray(cells) || cells.length === 0) {
      return
    }

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
  function handleInspectClick(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (!world) return

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
  // Terrain brush helper
  // ------------------------
  function applyTerrainBrushAtEvent(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (!world) return

    const w = world as any
    const width: number = w.width
    const height: number = w.height
    const cells: { baseHeight: number }[] = w.cells
    const seaLevel: number = w.seaLevel ?? 0

    if (!width || !height || !Array.isArray(cells) || cells.length === 0) {
      return
    }

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

    const centerX = Math.floor(u * width)
    const centerY = Math.floor(v * height)

    if (
      centerX < 0 ||
      centerY < 0 ||
      centerX >= width ||
      centerY >= height
    ) {
      return
    }

    const radius = Math.max(1, Math.round(brushRadius))
    const radiusSq = radius * radius
    const strength = brushStrength

    const newCells = [...cells]

    for (let y = centerY - radius; y <= centerY + radius; y++) {
      if (y < 0 || y >= height) continue
      for (let x = centerX - radius; x <= centerX + radius; x++) {
        if (x < 0 || x >= width) continue
        const dx = x - centerX
        const dy = y - centerY
        const distSq = dx * dx + dy * dy
        if (distSq > radiusSq) continue

        const index = y * width + x
        const cell = cells[index]
        if (!cell) continue

        const dist = Math.sqrt(distSq)
        const falloff = radius === 0 ? 1 : Math.max(0, 1 - dist / radius)

        let delta = strength * falloff
        if (brushMode === 'lower') {
          delta = -delta
        }

        const nextHeight = Math.max(-1, Math.min(1, cell.baseHeight + delta))

        newCells[index] = {
          ...cell,
          baseHeight: nextHeight,
        }
      }
    }

    const updatedWorld = {
      ...w,
      cells: newCells,
      // We leave updatedAt persistence to explicit saves in higher-level flows.
      seaLevel,
    }

    setWorld(updatedWorld)
  }

  // ------------------------
  // Canvas mouse handlers (tool router)
  // ------------------------
  function handleCanvasMouseDown(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (!world) return

    if (activeTool === 'inspect') {
      handleInspectClick(event)
      return
    }

    if (activeTool === 'terrain-brush') {
      setIsBrushing(true)
      applyTerrainBrushAtEvent(event)
    }
  }

  function handleCanvasMouseMove(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (!world) return
    if (!isBrushing) return
    if (activeTool !== 'terrain-brush') return

    applyTerrainBrushAtEvent(event)
  }

  function handleCanvasMouseUp() {
    if (isBrushing) {
      setIsBrushing(false)
    }
  }

  function handleCanvasMouseLeave() {
    if (isBrushing) {
      setIsBrushing(false)
    }
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
            <button
              type="button"
              className={
                activeTool === 'terrain-brush'
                  ? 'ww-tool-button ww-tool-button--active'
                  : 'ww-tool-button'
              }
              onClick={() => setActiveTool('terrain-brush')}
            >
              Terrain brush
            </button>
          </div>

          {activeTool === 'terrain-brush' && (
            <div className="ww-panel-section">
              <h4 className="ww-panel-subtitle">Terrain brush</h4>
              <p className="ww-panel-text">
                This brush gently adjusts terrain height. It never changes
                biomes or city/region stickers.
              </p>

              <div className="ww-panel-field">
                <span className="ww-panel-label">Mode</span>
                <div className="ww-button-group">
                  <button
                    type="button"
                    className={
                      brushMode === 'raise'
                        ? 'ww-chip-btn ww-chip-btn--active'
                        : 'ww-chip-btn'
                    }
                    onClick={() => setBrushMode('raise')}
                  >
                    Raise
                  </button>
                  <button
                    type="button"
                    className={
                      brushMode === 'lower'
                        ? 'ww-chip-btn ww-chip-btn--active'
                        : 'ww-chip-btn'
                    }
                    onClick={() => setBrushMode('lower')}
                  >
                    Lower
                  </button>
                </div>
              </div>

              <div className="ww-panel-field">
                <label className="ww-panel-label">
                  Size ({brushRadius.toFixed(0)})
                </label>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={brushRadius}
                  onChange={event => setBrushRadius(Number(event.target.value))}
                />
              </div>

              <div className="ww-panel-field">
                <label className="ww-panel-label">
                  Strength ({brushStrength.toFixed(2)})
                </label>
                <input
                  type="range"
                  min={0.01}
                  max={0.2}
                  step={0.01}
                  value={brushStrength}
                  onChange={event =>
                    setBrushStrength(Number(event.target.value))
                  }
                />
              </div>
            </div>
          )}

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
        </>
      )}
    </div>
  )

  // ------------------------
  // Main viewport
  // ------------------------
  let mainViewport: React.ReactNode = null

  if (notFound) {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">World not found</h2>
        <p className="ww-panel-text">
          The world you tried to open does not exist or has been removed.
        </p>
        <button className="ww-primary-btn" onClick={() => navigate('/')}>
          Back to worlds
        </button>
      </div>
    )
  } else if (!world) {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">Loading world…</h2>
        <p className="ww-panel-text">
          Loading world data so you can inspect and edit terrain.
        </p>
      </div>
    )
  } else {
    mainViewport = (
      <div className="ww-mode-main">
        <h2 className="ww-panel-title">
          {(world as any).name || 'Untitled world'}
        </h2>
        <p className="ww-panel-text">
          Use Inspect to click on cells and see data, or switch to the Terrain
          brush to gently sculpt the heightmap. Future 6B steps will introduce
          sticker-based editing for biomes, cities, and regions.
        </p>
        <canvas
          ref={mainCanvasRef}
          className="ww-preview-canvas ww-preview-canvas--map"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseLeave}
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
          currently selected cell and world.
        </p>
      </>
    )
  } else if (!selectedCell) {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Inspector</h2>
        <p className="ww-panel-text">
          Click anywhere on the map while the Inspect tool is active to see
          details about that cell.
        </p>
      </>
    )
  } else {
    rightPanelContent = (
      <>
        <h2 className="ww-panel-title">Cell details</h2>
        <p className="ww-panel-text">
          Grid: <strong>{selectedCell.x}</strong>,{' '}
          <strong>{selectedCell.y}</strong>
        </p>
        <p className="ww-panel-text">
          Lat/Lon:{' '}
          <strong>{selectedCell.lat.toFixed(2)}°</strong>,{' '}
          <strong>{selectedCell.lon.toFixed(2)}°</strong>
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
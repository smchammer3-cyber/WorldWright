// ========================================================
// JARVIS_CHANGE (6B-1, 6B-2 – Create Mode Inspect Tool + Terrain Brush)
// Date: 2025-12-05
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
import { StickerState, emptyStickerState } from '../../core/stickerEngine'
import type { World } from '../../core/world'

type LoadedWorld = World

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

  // Stickers are wired in later steps; we keep state ready but unused for now.
  const [stickerState, setStickerState] =
    useState<StickerState>(emptyStickerState())
  void stickerState
  void setStickerState

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // ------------------------
  // Load world by id
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
      setWorld(w as LoadedWorld)
      setNotFound(false)
    }
  }, [id])

  // ------------------------
  // Render world to canvases
  // ------------------------
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!mainCanvas || !minimapCanvas) return

    const mainCtx = mainCanvas.getContext('2d')
    const minimapCtx = minimapCanvas.getContext('2d')
    if (!mainCtx || !minimapCtx) return

    const { width, height, cells, seaLevel } = world

    const preview = {
      width,
      height,
      cells: cells as { baseHeight: number }[],
      seaLevel: seaLevel ?? 0.5,
    }

    // Use the same renderer as Generate Mode for both main view and minimap.
    renderPlanetToCanvas(mainCtx, preview)
    renderPlanetToCanvas(minimapCtx, preview)
  }, [world])

  // ------------------------
  // Inspect tool: click on main map to sample cell
  // ------------------------
  function handleInspectClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!world) return

    const { width, height, cells } = world
    const seaLevel: number = world.seaLevel ?? 0

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

    const x = Math.floor(u * width)
    const y = Math.floor(v * height)
    const index = y * width + x

    if (index < 0 || index >= cells.length) return

    const cell = cells[index]
    const baseHeight = cell.baseHeight ?? 0
    const isLand = baseHeight > seaLevel

    // Very simple lat/lon approximation for the 2D map:
    const lat = 90 - v * 180
    const lon = -180 + u * 360

    setSelectedCell({
      x,
      y,
      lat,
      lon,
      baseHeight,
      isLand,
    })
  }

  // ------------------------
  // Terrain brush helpers
  // ------------------------
  function applyBrushAt(
    event: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
  ) {
    if (!world) return

    const { width, height, cells } = world

    const canvas = mainCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const px = (event as MouseEvent).clientX - rect.left
    const py = (event as MouseEvent).clientY - rect.top

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return
    }

    const u = px / rect.width
    const v = py / rect.height

    const centerX = Math.floor(u * width)
    const centerY = Math.floor(v * height)

    const radius = brushRadius
    const strength = brushStrength
    const mode = brushMode

    const newCells = [...cells]

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = centerX + dx
        const y = centerY + dy
        if (x < 0 || y < 0 || x >= width || y >= height) continue

        const distSq = dx * dx + dy * dy
        if (distSq > radius * radius) continue

        const index = y * width + x
        const cell = newCells[index]
        if (!cell) continue

        const falloff = 1 - Math.sqrt(distSq) / radius
        const delta = strength * falloff

        let baseHeight = cell.baseHeight ?? 0
        if (mode === 'raise') {
          baseHeight += delta
        } else {
          baseHeight -= delta
        }

        // Clamp to a safe range for now (0..1, matching generator output).
        if (baseHeight < 0) baseHeight = 0
        if (baseHeight > 1) baseHeight = 1

        newCells[index] = {
          ...cell,
          baseHeight,
        }
      }
    }

    const updatedWorld: LoadedWorld = {
      ...world,
      cells: newCells,
    }

    setWorld(updatedWorld)
  }

  function handleBrushMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    applyBrushAt(event)
    setIsBrushing(true)

    const handleMove = (moveEvent: MouseEvent) => {
      applyBrushAt(moveEvent)
    }

    const handleUp = () => {
      setIsBrushing(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }

  // ------------------------
  // Event handler deciding which tool is active
  // ------------------------
  function handleMainCanvasMouseDown(
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    if (activeTool === 'terrain-brush') {
      handleBrushMouseDown(event)
    } else if (activeTool === 'inspect') {
      handleInspectClick(event)
    }
  }

  // ------------------------
  // UI render branches: missing id / not found / normal
  // ------------------------
  if (!id) {
    return (
      <AppShell
        title="Create Mode"
        onBack={() => navigate('/')}
        leftToolbar={
          <div className="ww-panel">
            <h2>No world selected</h2>
            <p>Select a world from the list to start editing.</p>
            <button onClick={() => navigate('/')}>Back to worlds</button>
          </div>
        }
        main={
          <div className="ww-main">
            <p>No world loaded.</p>
          </div>
        }
        minimapOverlay={
          <div className="ww-minimap-placeholder">No minimap</div>
        }
        rightPanel={
          <div className="ww-panel">
            <h2>Info</h2>
            <p>No world is loaded.</p>
          </div>
        }
      />
    )
  }

  if (notFound || !world) {
    return (
      <AppShell
        title="Create Mode"
        onBack={() => navigate('/')}
        leftToolbar={
          <div className="ww-panel">
            <h2>World not found</h2>
            <p>The requested world could not be found.</p>
            <button onClick={() => navigate('/')}>Back to worlds</button>
          </div>
        }
        main={
          <div className="ww-main">
            <p>Unable to load world.</p>
          </div>
        }
        minimapOverlay={
          <div className="ww-minimap-placeholder">No minimap</div>
        }
        rightPanel={
          <div className="ww-panel">
            <h2>Info</h2>
            <p>This world could not be loaded.</p>
          </div>
        }
      />
    )
  }

  // ------------------------
  // Normal render with active world
  // ------------------------
  return (
    <AppShell
      title="Create Mode"
      onBack={() => navigate('/')}
      leftToolbar={
        <div className="ww-panel ww-panel--left">
          <h2>Tools</h2>

          <div className="ww-tool-section">
            <h3>Active tool</h3>
            <div className="ww-tool-buttons">
              <button
                type="button"
                className={
                  activeTool === 'inspect'
                    ? 'ww-button ww-button--primary'
                    : 'ww-button'
                }
                onClick={() => setActiveTool('inspect')}
              >
                Inspect
              </button>
              <button
                type="button"
                className={
                  activeTool === 'terrain-brush'
                    ? 'ww-button ww-button--primary'
                    : 'ww-button'
                }
                onClick={() => setActiveTool('terrain-brush')}
              >
                Terrain brush
              </button>
            </div>
          </div>

          {activeTool === 'terrain-brush' && (
            <div className="ww-tool-section">
              <h3>Brush settings</h3>

              <label className="ww-field">
                <span>Mode</span>
                <select
                  value={brushMode}
                  onChange={(e) =>
                    setBrushMode(e.target.value as BrushMode)
                  }
                >
                  <option value="raise">Raise</option>
                  <option value="lower">Lower</option>
                </select>
              </label>

              <label className="ww-field">
                <span>Radius: {brushRadius}</span>
                <input
                  type="range"
                  min={1}
                  max={32}
                  value={brushRadius}
                  onChange={(e) =>
                    setBrushRadius(Number(e.target.value))
                  }
                />
              </label>

              <label className="ww-field">
                <span>Strength: {brushStrength.toFixed(2)}</span>
                <input
                  type="range"
                  min={0.01}
                  max={0.2}
                  step={0.01}
                  value={brushStrength}
                  onChange={(e) =>
                    setBrushStrength(Number(e.target.value))
                  }
                />
              </label>
            </div>
          )}
        </div>
      }
      main={
        <div className="ww-main">
          <canvas
            ref={mainCanvasRef}
            className="ww-main-canvas"
            onMouseDown={handleMainCanvasMouseDown}
          />
        </div>
      }
      minimapOverlay={
        <div className="ww-minimap-container">
          <canvas
            ref={minimapCanvasRef}
            className="ww-minimap-canvas"
          />
        </div>
      }
      rightPanel={
        <div className="ww-panel ww-panel--right">
          <h2>Location info</h2>
          {selectedCell ? (
            <div className="ww-inspect-info">
              <p>
                <strong>Grid:</strong> ({selectedCell.x},{' '}
                {selectedCell.y})
              </p>
              <p>
                <strong>Lat/Lon:</strong>{' '}
                {selectedCell.lat.toFixed(2)}°,{' '}
                {selectedCell.lon.toFixed(2)}°
              </p>
              <p>
                <strong>Height:</strong>{' '}
                {selectedCell.baseHeight.toFixed(3)}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {selectedCell.isLand ? 'Land' : 'Water'}
              </p>
            </div>
          ) : (
            <p>Click on the map to inspect a location.</p>
          )}
        </div>
      }
    />
  )
}
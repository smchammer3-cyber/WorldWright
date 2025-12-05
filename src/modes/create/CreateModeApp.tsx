// ========================================================
// JARVIS_CHANGE (6B-1, 6B-2, 6B-3B – Create Mode)
// Date: 2025-12-05
//
// Purpose:
// - Keep Create Mode loading a real world by id.
// - Use AppShell with unified layout (left tools, main viewport,
//   minimap bottom-left, right info panel).
// - Provide two core tools:
//   • "Inspect" (6B-1)
//   • "Terrain brush" (6B-2)
// - (6B-3B) Begin integrating stickers at the world level:
//   • Read `world.stickers` into `StickerState`.
//   • Ensure future sticker tools have a stable data path.
//   • No visible sticker UI yet; that comes in later substeps.
// ========================================================

import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import { renderPlanetToCanvas } from '../../core/planetRenderer'
import { getWorld } from '../../core/worldStorage'
import type { World, WorldCell } from '../../core/world'
import { StickerState, emptyStickerState } from '../../core/stickerEngine'

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
  const [brushRadius, setBrushRadius] = useState<number>(3)
  const [brushStrength, setBrushStrength] = useState<number>(0.05)
  const [isBrushing, setIsBrushing] = useState(false)

  // (6B-3B) Sticker state mirrored from world.stickers
  const [stickerState, setStickerState] =
    useState<StickerState>(emptyStickerState())

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
      // Treat missing stickers as []
      const stickers =
        Array.isArray((w as any).stickers) ? (w as any).stickers : []
      setWorld({ ...w, stickers })
      // Initialize StickerState from world.stickers
      setStickerState({ stickers } as StickerState)
      setNotFound(false)
    }
  }, [id])

  // ------------------------
  // Render map + minimap when world changes
  // ------------------------
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!mainCanvas || !minimapCanvas) return

    renderPlanetToCanvas({
      canvas: mainCanvas,
      world,
      mode: 'map',
    })

    renderPlanetToCanvas({
      canvas: minimapCanvas,
      world,
      mode: 'minimap',
    })

    // (6B-3B) Future hook: render sticker overlays here.
    // For now, we keep stickers non-visual to avoid scope creep.
    // In a later substep we can draw simple markers based on
    // `stickerState.stickers` on top of the terrain.
  }, [world, stickerState])

  // ------------------------
  // Coordinate helpers
  // ------------------------
  function getCellFromEvent(
    ev: ReactMouseEvent<HTMLCanvasElement>,
  ): { cell: WorldCell | null; lat: number; lon: number } {
    if (!world) return { cell: null, lat: 0, lon: 0 }

    const canvas = ev.currentTarget
    const rect = canvas.getBoundingClientRect()
    const px = ev.clientX - rect.left
    const py = ev.clientY - rect.top

    const u = px / rect.width
    const v = py / rect.height

    const x = Math.floor(u * world.width)
    const y = Math.floor(v * world.height)

    if (x < 0 || x >= world.width || y < 0 || y >= world.height) {
      return { cell: null, lat: 0, lon: 0 }
    }

    const index = y * world.width + x
    const cell = world.cells[index]

    // Simple equirectangular mapping approximation
    const lon = (u - 0.5) * 360
    const lat = (0.5 - v) * 180

    return { cell, lat, lon }
  }

  // ------------------------
  // Inspect tool
  // ------------------------
  function handleInspectClick(ev: ReactMouseEvent<HTMLCanvasElement>) {
    const { cell, lat, lon } = getCellFromEvent(ev)
    if (!world || !cell) return

    const isLand = cell.baseHeight >= world.seaLevel

    setSelectedCell({
      x: cell.x,
      y: cell.y,
      lat,
      lon,
      baseHeight: cell.baseHeight,
      isLand,
    })
  }

  // ------------------------
  // Terrain brush
  // ------------------------
  function applyBrushAt(ev: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return

    const canvas = ev.currentTarget
    const rect = canvas.getBoundingClientRect()
    const px = ev.clientX - rect.left
    const py = ev.clientY - rect.top

    const u = px / rect.width
    const v = py / rect.height

    const centerX = Math.floor(u * world.width)
    const centerY = Math.floor(v * world.height)

    const radius = brushRadius

    // Build new cells array with gentle height changes
    const newCells = world.cells.slice()
    const width = world.width
    const height = world.height

    const strength = brushStrength // 0..1
    const isRaise = brushMode === 'raise'

    for (let dy = -radius; dy <= radius; dy++) {
      const yy = centerY + dy
      if (yy < 0 || yy >= height) continue

      for (let dx = -radius; dx <= radius; dx++) {
        const xx = centerX + dx
        if (xx < 0 || xx >= width) continue

        const distSq = dx * dx + dy * dy
        const maxDistSq = radius * radius
        if (distSq > maxDistSq) continue

        const index = yy * width + xx
        const cell = newCells[index]
        if (!cell) continue

        const falloff = 1 - distSq / (maxDistSq || 1)
        const delta = strength * falloff * (isRaise ? 1 : -1)

        let newHeight = cell.baseHeight + delta
        if (newHeight < 0) newHeight = 0
        if (newHeight > 1) newHeight = 1

        newCells[index] = {
          ...cell,
          baseHeight: newHeight,
        }
      }
    }

    setWorld(prev => {
      if (!prev) return prev
      return {
        ...prev,
        cells: newCells,
      }
    })
  }

  function handleMainCanvasMouseDown(ev: ReactMouseEvent<HTMLCanvasElement>) {
    if (activeTool === 'inspect') {
      handleInspectClick(ev)
      return
    }

    if (activeTool === 'terrain-brush') {
      setIsBrushing(true)
      applyBrushAt(ev)
    }
  }

  function handleMainCanvasMouseMove(ev: ReactMouseEvent<HTMLCanvasElement>) {
    if (!isBrushing) return
    if (activeTool === 'terrain-brush') {
      applyBrushAt(ev)
    }
  }

  function handleMainCanvasMouseUp() {
    if (isBrushing) {
      setIsBrushing(false)
    }
  }

  function handleMainCanvasMouseLeave() {
    if (isBrushing) {
      setIsBrushing(false)
    }
  }

  // ------------------------
  // Render: loading / not found
  // ------------------------
  if (notFound) {
    return (
      <AppShell
        title="Create Mode"
        onBack={() => navigate('/')}
        leftToolbar={<div />}
        main={<div style={{ padding: '1rem' }}>World not found.</div>}
        minimapOverlay={null}
        rightPanel={null}
      />
    )
  }

  if (!world) {
    return (
      <AppShell
        title="Create Mode"
        onBack={() => navigate('/')}
        leftToolbar={<div />}
        main={<div style={{ padding: '1rem' }}>Loading world…</div>}
        minimapOverlay={null}
        rightPanel={null}
      />
    )
  }

  // ------------------------
  // Render: main UI
  // ------------------------
  const leftToolbar = (
    <div className="ww-tools-panel">
      <h3>Tools</h3>

      <button
        className={activeTool === 'inspect' ? 'active' : ''}
        onClick={() => setActiveTool('inspect')}
      >
        Inspect
      </button>

      <button
        className={activeTool === 'terrain-brush' ? 'active' : ''}
        onClick={() => setActiveTool('terrain-brush')}
      >
        Terrain brush
      </button>

      {activeTool === 'terrain-brush' && (
        <div className="ww-tool-section">
          <h4>Brush settings</h4>

          <div className="ww-control-row">
            <label>Mode</label>
            <select
              value={brushMode}
              onChange={e => setBrushMode(e.target.value as BrushMode)}
            >
              <option value="raise">Raise</option>
              <option value="lower">Lower</option>
            </select>
          </div>

          <div className="ww-control-row">
            <label>Radius</label>
            <input
              type="range"
              min={1}
              max={16}
              value={brushRadius}
              onChange={e => setBrushRadius(Number(e.target.value))}
            />
            <span>{brushRadius}</span>
          </div>

          <div className="ww-control-row">
            <label>Strength</label>
            <input
              type="range"
              min={1}
              max={100}
              value={Math.round(brushStrength * 100)}
              onChange={e => setBrushStrength(Number(e.target.value) / 100)}
            />
            <span>{Math.round(brushStrength * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  )

  const mainView = (
    <div className="ww-main-canvas-wrapper">
      <canvas
        ref={mainCanvasRef}
        width={1024}
        height={512}
        onMouseDown={handleMainCanvasMouseDown}
        onMouseMove={handleMainCanvasMouseMove}
        onMouseUp={handleMainCanvasMouseUp}
        onMouseLeave={handleMainCanvasMouseLeave}
      />
    </div>
  )

  const minimapView = (
    <canvas ref={minimapCanvasRef} width={256} height={128} />
  )

  const rightPanel = (
    <div className="ww-info-panel">
      <h3>Location info</h3>
      {!selectedCell && (
        <p>Use the Inspect tool, then click on the map to sample a location.</p>
      )}
      {selectedCell && (
        <div className="ww-info-grid">
          <div>
            <strong>Grid</strong>
            <div>
              x: {selectedCell.x}, y: {selectedCell.y}
            </div>
          </div>
          <div>
            <strong>Lat / Lon</strong>
            <div>
              {selectedCell.lat.toFixed(2)}°, {selectedCell.lon.toFixed(2)}°
            </div>
          </div>
          <div>
            <strong>Height</strong>
            <div>{selectedCell.baseHeight.toFixed(3)}</div>
          </div>
          <div>
            <strong>Surface</strong>
            <div>{selectedCell.isLand ? 'Land' : 'Water'}</div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <AppShell
      title={`Create: ${world.name || 'World'}`}
      onBack={() => navigate('/')}
      leftToolbar={leftToolbar}
      main={mainView}
      minimapOverlay={minimapView}
      rightPanel={rightPanel}
    />
  )
}
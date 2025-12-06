// ========================================================
// JARVIS_CHANGE (6B-1, 6B-2, 6B-3B – Create Mode)
// Date: 2025-12-05
//
// Purpose:
// - Load a real world by id.
// - Use AppShell with unified layout (left tools, main viewport,
//   minimap bottom-left, right info panel).
// - Provide tools:
//   • "Inspect" – sample location info from the map.
//   • "Terrain brush" – paint terrain height by click + drag.
//   • "Sticker" – place and manage simple rectangular stickers.
// - Stickers integration:
//   • Read `world.stickers` into a StickerState.
//   • Render simple visual overlays for stickers on map + minimap.
//   • Allow placing new stickers (REGION type).
//   • Allow selecting an existing sticker by clicking it.
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
import { getWorld, saveWorld } from '../../core/worldStorage'
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

type ActiveTool = 'inspect' | 'terrain-brush' | 'sticker'
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

  // Stickers: editor state mirrored from world.stickers
  const [stickerState, setStickerState] =
    useState<StickerState>(emptyStickerState())

  // Id of currently selected sticker (if any)
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null,
  )

  const [isSaving, setIsSaving] = useState(false)
  const [lastSavedMessage, setLastSavedMessage] = useState<string | null>(null)

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
      const stickersRaw = (w as any).stickers
      const stickers = Array.isArray(stickersRaw) ? stickersRaw : []

      const normalizedWorld: World = {
        ...w,
        stickers,
      }

      setWorld(normalizedWorld)

      setStickerState({
        stickers,
      })

      setNotFound(false)
    }
  }, [id])

  // ------------------------
  // Helper: render world onto a canvas
  // ------------------------
  function renderWorldToCanvas(
    canvas: HTMLCanvasElement,
    currentWorld: LoadedWorld,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const preview = {
      width: currentWorld.width,
      height: currentWorld.height,
      baseHeight: currentWorld.cells.map(c => c.baseHeight),
      seaLevel: currentWorld.seaLevel,
      temperature: currentWorld.cells.map(c => c.temperature ?? 0.5),
      moisture: currentWorld.cells.map(c => c.moisture ?? 0.5),
    }

    renderPlanetToCanvas(ctx, preview)
  }

  // ------------------------
  // Helper: draw sticker overlays on a canvas
  // ------------------------
  function drawStickerOverlays(
    canvas: HTMLCanvasElement,
    currentWorld: LoadedWorld,
    state: StickerState,
    selectedId: string | null,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stickers: any[] = (state.stickers ?? []) as any[]
    if (!stickers.length) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    ctx.save()

    for (const s of stickers) {
      const x = s.x ?? 0
      const y = s.y ?? 0
      const width = s.width ?? 1
      const height = s.height ?? 1

      const nx = x / currentWorld.width
      const ny = y / currentWorld.height
      const nw = width / currentWorld.width
      const nh = height / currentWorld.height

      const px = nx * canvasWidth
      const py = ny * canvasHeight
      const pw = nw * canvasWidth
      const ph = nh * canvasHeight

      ctx.beginPath()
      ctx.rect(px, py, pw, ph)

      if (s.id === selectedId) {
        ctx.strokeStyle = '#ffcc33'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.95
        ctx.stroke()

        ctx.fillStyle = '#ffcc33'
        ctx.globalAlpha = 0.25
        ctx.fill()
      } else {
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.9
        ctx.stroke()

        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.15
        ctx.fill()
      }
    }

    ctx.restore()
  }

  // ------------------------
  // Render world into canvases on change
  // ------------------------
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!mainCanvas || !minimapCanvas) return

    renderWorldToCanvas(mainCanvas, world)
    renderWorldToCanvas(minimapCanvas, world)
    drawStickerOverlays(mainCanvas, world, stickerState, selectedStickerId)
    drawStickerOverlays(minimapCanvas, world, stickerState, selectedStickerId)
  }, [world, stickerState, selectedStickerId])

  // ------------------------
  // Coordinate helpers
  // ------------------------
  function canvasToWorldCoords(
    canvas: HTMLCanvasElement,
    evt: ReactMouseEvent<HTMLCanvasElement>,
  ): { x: number; y: number } | null {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (evt.clientX - rect.left) * scaleX
    const y = (evt.clientY - rect.top) * scaleY

    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
      return null
    }

    return { x, y }
  }

  function pickCellFromCanvas(
    canvas: HTMLCanvasElement,
    evt: ReactMouseEvent<HTMLCanvasElement>,
  ): { x: number; y: number; cell: WorldCell } | null {
    if (!world) return null

    const coords = canvasToWorldCoords(canvas, evt)
    if (!coords) return null

    const gridX = Math.floor((coords.x / canvas.width) * world.width)
    const gridY = Math.floor((coords.y / canvas.height) * world.height)

    if (gridX < 0 || gridY < 0 || gridX >= world.width || gridY >= world.height)
      return null

    const index = gridY * world.width + gridX
    const cell = world.cells[index]
    if (!cell) return null

    return { x: gridX, y: gridY, cell }
  }

  function cellToLatLon(x: number, y: number, w: LoadedWorld) {
    const lon = (x / (w.width - 1)) * 360 - 180
    const lat = 90 - (y / (w.height - 1)) * 180
    return { lat, lon }
  }

  // ------------------------
  // Inspect tool logic
  // ------------------------
  function handleInspectClick(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    const canvas = mainCanvasRef.current
    if (!canvas) return

    const result = pickCellFromCanvas(canvas, evt)
    if (!result) {
      setSelectedCell(null)
      return
    }

    const { x, y, cell } = result
    const { lat, lon } = cellToLatLon(x, y, world)

    setSelectedCell({
      x,
      y,
      lat,
      lon,
      baseHeight: cell.baseHeight,
      isLand: cell.baseHeight >= world.seaLevel,
    })
  }

  // ------------------------
  // Terrain brush logic
  // ------------------------
  function applyBrushAt(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    const canvas = mainCanvasRef.current
    if (!canvas) return

    const coords = canvasToWorldCoords(canvas, evt)
    if (!coords) return

    const cx = (coords.x / canvas.width) * world.width
    const cy = (coords.y / canvas.height) * world.height

    const radius = brushRadius
    const strength = brushStrength * (brushMode === 'raise' ? 1 : -1)

    const newCells = [...world.cells]

    const minX = Math.max(0, Math.floor(cx - radius))
    const maxX = Math.min(world.width - 1, Math.ceil(cx + radius))
    const minY = Math.max(0, Math.floor(cy - radius))
    const maxY = Math.min(world.height - 1, Math.ceil(cy + radius))

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx
        const dy = y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > radius) continue

        const t = 1 - dist / radius
        const falloff = t * t

        const idx = y * world.width + x
        const cell = newCells[idx]
        if (!cell) continue

        const updatedHeight = cell.baseHeight + strength * falloff
        newCells[idx] = {
          ...cell,
          baseHeight: Math.max(0, Math.min(1, updatedHeight)),
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

  function handleMainCanvasMouseDown(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    if (activeTool === 'inspect') {
      handleInspectClick(evt)
      return
    }

    if (activeTool === 'terrain-brush') {
      setIsBrushing(true)
      applyBrushAt(evt)
      return
    }

    if (activeTool === 'sticker') {
      // Sticker creation when clicking in sticker mode
      const canvas = mainCanvasRef.current
      if (!canvas) return

      const coords = canvasToWorldCoords(canvas, evt)
      if (!coords) return

      const gridX = Math.floor((coords.x / canvas.width) * world.width)
      const gridY = Math.floor((coords.y / canvas.height) * world.height)

      const newId = `sticker-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2)}`

      const sticker = {
        id: newId,
        worldId: world.id,
        type: 'REGION',
        x: gridX,
        y: gridY,
        width: 8,
        height: 6,
        metadata: {
          kind: 'REGION',
        },
      }

      const nextStickers = [...(stickerState.stickers ?? []), sticker]

      setStickerState({
        stickers: nextStickers,
      })

      setWorld(prev => {
        if (!prev) return prev
        return {
          ...prev,
          stickers: nextStickers,
        }
      })

      setSelectedStickerId(newId)
    }
  }

  function handleMainCanvasMouseMove(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!isBrushing) return
    if (activeTool !== 'terrain-brush') return
    applyBrushAt(evt)
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
  // Sticker selection via click
  // ------------------------
  function handleMinimapClick(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return

    const canvas = minimapCanvasRef.current
    if (!canvas) return

    const coords = canvasToWorldCoords(canvas, evt)
    if (!coords) return

    const stickers: any[] = (stickerState.stickers ?? []) as any[]
    if (!stickers.length) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    let clickedId: string | null = null

    for (const s of stickers) {
      const x = s.x ?? 0
      const y = s.y ?? 0
      const width = s.width ?? 1
      const height = s.height ?? 1

      const nx = x / world.width
      const ny = y / world.height
      const nw = width / world.width
      const nh = height / world.height

      const px = nx * canvasWidth
      const py = ny * canvasHeight
      const pw = nw * canvasWidth
      const ph = nh * canvasHeight

      if (
        coords.x >= px &&
        coords.x <= px + pw &&
        coords.y >= py &&
        coords.y <= py + ph
      ) {
        clickedId = s.id ?? null
        break
      }
    }

    setSelectedStickerId(clickedId)
  }

  function deleteSelectedSticker() {
    if (!selectedStickerId) return

    const stickers: any[] = (stickerState.stickers ?? []) as any[]
    const remaining = stickers.filter(s => s.id !== selectedStickerId)

    setStickerState({
      stickers: remaining,
    })

    setWorld(prev => {
      if (!prev) return prev
      return {
        ...prev,
        stickers: remaining,
      }
    })

    setSelectedStickerId(null)
  }

  // ------------------------
  // Helpers: find selected sticker details
  // ------------------------
  function getSelectedSticker(): any | null {
    if (!selectedStickerId) return null
    const arr: any[] = (stickerState.stickers ?? []) as any[]
    return arr.find(s => s.id === selectedStickerId) || null
  }

  const selectedSticker = getSelectedSticker()

  // ------------------------
  // Actions: save world
  // ------------------------
  function handleSaveWorld() {
    if (!world) return
    try {
      setIsSaving(true)
      setLastSavedMessage(null)
      saveWorld(world)
      setLastSavedMessage('Saved')
      // Soft feedback only; no navigation needed here.
    } catch (error) {
      console.error('Failed to save world in Create Mode:', error)
      setLastSavedMessage('Save failed')
    } finally {
      setIsSaving(false)
    }
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

      <button
        className={activeTool === 'sticker' ? 'active' : ''}
        onClick={() => setActiveTool('sticker')}
      >
        Sticker
      </button>

      {activeTool === 'terrain-brush' && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Brush settings</h3>

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
    <div className="ww-minimap-card">
      <canvas
        ref={minimapCanvasRef}
        width={256}
        height={128}
        onClick={handleMinimapClick}
      />
    </div>
  )

  const rightPanel = (
    <div className="ww-info-panel">
      <div className="ww-save-row" style={{ marginBottom: '0.75rem' }}>
        <button
          onClick={handleSaveWorld}
          disabled={!world || isSaving}
        >
          {isSaving ? 'Saving…' : 'Save world'}
        </button>
        {lastSavedMessage && (
          <span
            className="ww-save-message"
            style={{ marginLeft: '0.5rem', fontSize: '0.85rem' }}
          >
            {lastSavedMessage}
          </span>
        )}
      </div>

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

      {activeTool === 'sticker' && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Sticker info</h3>
          {!selectedSticker && (
            <p>
              Click on the map to create a sticker, or click an existing one to
              select it.
            </p>
          )}
          {selectedSticker && (
            <>
              <div className="ww-info-grid">
                <div>
                  <strong>Type</strong>
                  <div>{selectedSticker.type ?? 'REGION'}</div>
                </div>
                <div>
                  <strong>Grid region</strong>
                  <div>
                    x: {selectedSticker.x}, y: {selectedSticker.y}
                  </div>
                  <div>
                    w: {selectedSticker.width}, h: {selectedSticker.height}
                  </div>
                </div>
              </div>
              <button
                style={{ marginTop: '0.75rem' }}
                onClick={deleteSelectedSticker}
              >
                Delete sticker
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )

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
  // Final shell
  // ------------------------
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
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
//   • Allow deleting the selected sticker.
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
        stickers: stickers as any,
      }

      setWorld(normalizedWorld)
      setStickerState({ stickers } as StickerState)
      setSelectedStickerId(null)
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
      cells: currentWorld.cells.map((c: WorldCell) => ({
        baseHeight: c.baseHeight,
      })),
      seaLevel: currentWorld.seaLevel,
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
      const enabled = s.isEnabled !== false
      if (!enabled) continue

      const tx = typeof s.x === 'number' ? s.x : s.transform?.x
      const ty = typeof s.y === 'number' ? s.y : s.transform?.y
      const tw =
        typeof s.width === 'number' ? s.width : s.transform?.width ?? 1
      const th =
        typeof s.height === 'number' ? s.height : s.transform?.height ?? 1

      if (
        typeof tx !== 'number' ||
        typeof ty !== 'number' ||
        typeof tw !== 'number' ||
        typeof th !== 'number'
      ) {
        continue
      }

      const x0 = (tx / currentWorld.width) * canvasWidth
      const y0 = (ty / currentWorld.height) * canvasHeight
      const w = (tw / currentWorld.width) * canvasWidth
      const h = (th / currentWorld.height) * canvasHeight

      const isSelected = selectedId != null && s.id === selectedId

      ctx.beginPath()
      ctx.rect(x0, y0, w, h)

      if (isSelected) {
        // Stronger, more visible outline + fill for selected sticker
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.globalAlpha = 1
        ctx.stroke()

        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.25
        ctx.fill()
      } else {
        // Default soft style
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
  // Render main/minimap when world or stickers change
  // ------------------------
  useEffect(() => {
    if (!world) return

    const mainCanvas = mainCanvasRef.current
    const minimapCanvas = minimapCanvasRef.current
    if (!mainCanvas || !minimapCanvas) return

    // First, draw the terrain
    renderWorldToCanvas(mainCanvas, world)
    renderWorldToCanvas(minimapCanvas, world)

    // Then, overlay any stickers
    drawStickerOverlays(mainCanvas, world, stickerState, selectedStickerId)
    drawStickerOverlays(minimapCanvas, world, stickerState, selectedStickerId)
  }, [world, stickerState, selectedStickerId])

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

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return { cell: null, lat: 0, lon: 0 }
    }

    const u = px / rect.width
    const v = py / rect.height

    const x = Math.floor(u * world.width)
    const y = Math.floor(v * world.height)

    if (x < 0 || x >= world.width || y < 0 || y >= world.height) {
      return { cell: null, lat: 0, lon: 0 }
    }

    const index = y * world.width + x
    const cell = world.cells[index]

    const lon = (u - 0.5) * 360
    const lat = (0.5 - v) * 180

    return { cell, lat, lon }
  }

  // ------------------------
  // Sticker hit testing
  // ------------------------
  function hitTestStickerAtEvent(
    ev: ReactMouseEvent<HTMLCanvasElement>,
  ): any | null {
    if (!world) return null

    const canvas = ev.currentTarget
    const rect = canvas.getBoundingClientRect()
    const px = ev.clientX - rect.left
    const py = ev.clientY - rect.top

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return null
    }

    const u = px / rect.width
    const v = py / rect.height

    const gx = Math.floor(u * world.width)
    const gy = Math.floor(v * world.height)

    const stickers: any[] = (stickerState.stickers ?? []) as any[]
    if (!stickers.length) return null

    // Check from top-most (last) to bottom-most
    for (let i = stickers.length - 1; i >= 0; i--) {
      const s = stickers[i]
      const tx = typeof s.x === 'number' ? s.x : s.transform?.x
      const ty = typeof s.y === 'number' ? s.y : s.transform?.y
      const tw =
        typeof s.width === 'number' ? s.width : s.transform?.width ?? 1
      const th =
        typeof s.height === 'number' ? s.height : s.transform?.height ?? 1

      if (
        typeof tx !== 'number' ||
        typeof ty !== 'number' ||
        typeof tw !== 'number' ||
        typeof th !== 'number'
      ) {
        continue
      }

      if (
        gx >= tx &&
        gx < tx + tw &&
        gy >= ty &&
        gy < ty + th
      ) {
        return s
      }
    }

    return null
  }

  // ------------------------
  // Sticker creation
  // ------------------------
  function createStickerAt(ev: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return

    const canvas = ev.currentTarget
    const rect = canvas.getBoundingClientRect()
    const px = ev.clientX - rect.left
    const py = ev.clientY - rect.top

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return
    }

    const u = px / rect.width
    const v = py / rect.height

    const centerX = Math.floor(u * world.width)
    const centerY = Math.floor(v * world.height)

    const baseSize = Math.max(
      4,
      Math.round(Math.min(world.width, world.height) / 16),
    )
    let widthCells = baseSize
    let heightCells = baseSize

    let x0 = centerX - Math.floor(widthCells / 2)
    let y0 = centerY - Math.floor(heightCells / 2)

    if (x0 < 0) x0 = 0
    if (y0 < 0) y0 = 0
    if (x0 + widthCells > world.width) {
      widthCells = world.width - x0
    }
    if (y0 + heightCells > world.height) {
      heightCells = world.height - y0
    }
    if (widthCells <= 0 || heightCells <= 0) return

    const id = `sticker_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`
    const type = 'REGION'

    const newSticker: any = {
      id,
      worldId: world.id,
      type,
      x: x0,
      y: y0,
      width: widthCells,
      height: heightCells,
      transform: {
        x: x0,
        y: y0,
        width: widthCells,
        height: heightCells,
      },
      metadata: { kind: 'REGION' },
      isEnabled: true,
    }

    setWorld(prev => {
      if (!prev) return prev
      const existing = Array.isArray((prev as any).stickers)
        ? (prev as any).stickers
        : []
      const updated = [...existing, newSticker]
      return { ...prev, stickers: updated as any }
    })

    setStickerState(prev => {
      const existing = Array.isArray(prev.stickers) ? prev.stickers : []
      const updated = [...(existing as any[]), newSticker]
      return { stickers: updated } as StickerState
    })

    setSelectedStickerId(id)
  }

  // ------------------------
  // Sticker deletion
  // ------------------------
  function deleteSelectedSticker() {
    if (!selectedStickerId) return
    if (!world) return

    const idToDelete = selectedStickerId

    setWorld(prev => {
      if (!prev) return prev
      const existing = Array.isArray((prev as any).stickers)
        ? (prev as any).stickers
        : []
      const updated = existing.filter((s: any) => s.id !== idToDelete)
      return { ...prev, stickers: updated as any }
    })

    setStickerState(prev => {
      const existing = Array.isArray(prev.stickers) ? prev.stickers : []
      const updated = (existing as any[]).filter(s => s.id !== idToDelete)
      return { stickers: updated } as StickerState
    })

    setSelectedStickerId(null)
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

    if (px < 0 || py < 0 || px >= rect.width || py >= rect.height) {
      return
    }

    const u = px / rect.width
    const v = py / rect.height

    const centerX = Math.floor(u * world.width)
    const centerY = Math.floor(v * world.height)

    const radius = brushRadius
    const width = world.width
    const height = world.height

    const strength = brushStrength
    const isRaise = brushMode === 'raise'

    const newCells = world.cells.slice()

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
        const cell = newCells[index] as WorldCell
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
      const updated = {
        ...prev,
        cells: newCells,
      }
      return updated
    })
  }

  // ------------------------
  // Main canvas mouse handlers
  // ------------------------
  function handleMainCanvasMouseDown(ev: ReactMouseEvent<HTMLCanvasElement>) {
    if (activeTool === 'inspect') {
      handleInspectClick(ev)
      return
    }

    if (activeTool === 'terrain-brush') {
      setIsBrushing(true)
      applyBrushAt(ev)
      return
    }

    if (activeTool === 'sticker') {
      const hit = hitTestStickerAtEvent(ev)
      if (hit) {
        setSelectedStickerId(hit.id)
      } else {
        createStickerAt(ev)
      }
      return
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
  // Helpers: find selected sticker details
  // ------------------------
  function getSelectedSticker(): any | null {
    if (!selectedStickerId) return null
    const arr: any[] = (stickerState.stickers ?? []) as any[]
    return arr.find(s => s.id === selectedStickerId) || null
  }

  const selectedSticker = getSelectedSticker()

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
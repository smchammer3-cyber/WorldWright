// ========================================================
// JARVIS_CHANGE (6B-1, 6B-2, 6B-3B, 6B-4-2 – Create Mode)
// Date: 2025-12-06
//
// Purpose (current state):
// - Load a real world by id.
// - Use AppShell with unified layout:
//   • Left: view mode + tools
//   • Center: main viewport (map or globe)
//   • Bottom-left: minimap (globe view only)
//   • Right: info panel + save controls
// - Provide tools (in Map view):
//   • "Inspect" – sample location info from the map.
//   • "Terrain brush" – paint terrain height by click + drag.
//   • "Sticker" – place and manage simple rectangular stickers.
// - Stickers:
//   • Read `world.stickers` into a StickerState.
//   • Render simple overlays on map + minimap.
//   • Allow creation on Map, selection via minimap in Globe, deletion.
// - Persistence:
//   • "Save world" button persists edited world via saveWorld(world).
// - View modes (6B-4, part 1):
//   • Map view: flat map editor, no minimap.
//   • Globe view: shaded globe preview + minimap.
// - Editor camera & viewport (6B-4-2):
//   • Map view uses a camera (center + zoom) for the edit view.
//   • Minimap (in Globe view) shows a viewport rectangle indicating
//     the Map view camera region.
//   • Clicking the minimap outside a sticker recenters the Map camera
//     to that position.
// ========================================================

import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  WheelEvent as ReactWheelEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../../ui/AppShell'
import {
  renderPlanetToCanvas,
  sampleColorForHeight,
} from '../../core/planetRenderer'
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
type ViewMode = 'map' | 'globe'

type MapCamera = {
  centerX: number // in world grid coordinates
  centerY: number
  zoom: number // 1 = whole world, >1 = zoom in
}

export default function CreateModeApp() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [world, setWorld] = useState<LoadedWorld | null>(null)
  const [notFound, setNotFound] = useState(false)

  const [activeTool, setActiveTool] = useState<ActiveTool>('inspect')
  const [viewMode, setViewMode] = useState<ViewMode>('map')

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

  // Editor camera for Map view
  const [mapCamera, setMapCamera] = useState<MapCamera | null>(null)

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

  // Initialize camera when world loads
  useEffect(() => {
    if (!world) {
      setMapCamera(null)
      return
    }

    setMapCamera(prev => {
      if (prev) return prev
      return {
        centerX: world.width / 2,
        centerY: world.height / 2,
        zoom: 1,
      }
    })
  }, [world])

  // ------------------------
  // Camera helpers
  // ------------------------
  function clampCamera(w: LoadedWorld, camera: MapCamera): MapCamera {
    const minZoom = 1
    const maxZoom = 8
    const zoom = Math.max(minZoom, Math.min(maxZoom, camera.zoom))

    const viewportWorldWidth = w.width / zoom
    const viewportWorldHeight = w.height / zoom

    const halfW = viewportWorldWidth / 2
    const halfH = viewportWorldHeight / 2

    const centerX = Math.max(halfW, Math.min(w.width - halfW, camera.centerX))
    const centerY = Math.max(halfH, Math.min(w.height - halfH, camera.centerY))

    return { centerX, centerY, zoom }
  }

  function getViewport(w: LoadedWorld, camera: MapCamera) {
    const clamped = clampCamera(w, camera)
    const viewportWorldWidth = w.width / clamped.zoom
    const viewportWorldHeight = w.height / clamped.zoom
    const vx0 = clamped.centerX - viewportWorldWidth / 2
    const vy0 = clamped.centerY - viewportWorldHeight / 2

    return {
      ...clamped,
      x: vx0,
      y: vy0,
      width: viewportWorldWidth,
      height: viewportWorldHeight,
    }
  }

  // ------------------------
  // Helper: render world as flat map with camera (Map view)
  // ------------------------
  function renderWorldMapToCanvas(
    canvas: HTMLCanvasElement,
    currentWorld: LoadedWorld,
    camera: MapCamera | null,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const worldWidth = currentWorld.width
    const worldHeight = currentWorld.height
    if (worldWidth <= 0 || worldHeight <= 0) return

    // Offscreen full-world render
    const offscreen = document.createElement('canvas')
    offscreen.width = worldWidth
    offscreen.height = worldHeight
    const offCtx = offscreen.getContext('2d')
    if (!offCtx) return

    const preview = {
      width: worldWidth,
      height: worldHeight,
      cells: currentWorld.cells.map((c: WorldCell) => ({
        baseHeight: c.baseHeight,
      })),
      seaLevel: currentWorld.seaLevel,
    }
    renderPlanetToCanvas(offCtx, preview)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // If camera isn't ready yet, just show whole world
    if (!camera) {
      ctx.drawImage(
        offscreen,
        0,
        0,
        worldWidth,
        worldHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      )
      return
    }

    const viewport = getViewport(currentWorld, camera)

    ctx.drawImage(
      offscreen,
      viewport.x,
      viewport.y,
      viewport.width,
      viewport.height,
      0,
      0,
      canvas.width,
      canvas.height,
    )
  }

  // ------------------------
  // Helper: render world as a shaded globe (Globe view)
  // ------------------------
  function renderWorldGlobeToCanvas(
    canvas: HTMLCanvasElement,
    currentWorld: LoadedWorld,
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = currentWorld.width
    const height = currentWorld.height
    if (width <= 0 || height <= 0) return

    const seaLevel = currentWorld.seaLevel
    const cells = currentWorld.cells

    const baseSize = Math.min(canvas.width || 1, canvas.height || 1)
    const globeSize = baseSize > 0 ? baseSize : 512
    canvas.width = globeSize
    canvas.height = globeSize

    const imageData = ctx.createImageData(globeSize, globeSize)
    const data = imageData.data

    function sampleHeight(u: number, v: number): number {
      if (!Number.isFinite(u) || !Number.isFinite(v)) return seaLevel

      const uu = ((u % 1) + 1) % 1
      const vv = Math.min(1, Math.max(0, v))

      const x = uu * (width - 1)
      const y = vv * (height - 1)

      const x0 = Math.floor(x)
      const y0 = Math.floor(y)
      const x1 = Math.min(width - 1, x0 + 1)
      const y1 = Math.min(height - 1, y0 + 1)

      const tx = x - x0
      const ty = y - y0

      const idxAt = (ix: number, iy: number) => iy * width + ix

      const h00 = cells[idxAt(x0, y0)]?.baseHeight ?? seaLevel
      const h10 = cells[idxAt(x1, y0)]?.baseHeight ?? seaLevel
      const h01 = cells[idxAt(x0, y1)]?.baseHeight ?? seaLevel
      const h11 = cells[idxAt(x1, y1)]?.baseHeight ?? seaLevel

      const hx0 = h00 * (1 - tx) + h10 * tx
      const hx1 = h01 * (1 - tx) + h11 * tx
      return hx0 * (1 - ty) + hx1 * ty
    }

    const lightDir = { x: 0.4, y: -0.6, z: 0.7 }
    {
      const len =
        Math.sqrt(
          lightDir.x * lightDir.x +
            lightDir.y * lightDir.y +
            lightDir.z * lightDir.z,
        ) || 1
      lightDir.x /= len
      lightDir.y /= len
      lightDir.z /= len
    }

    const radius = globeSize / 2
    const cx = radius
    const cy = radius
    const rMax = radius * radius

    for (let py = 0; py < globeSize; py++) {
      for (let px = 0; px < globeSize; px++) {
        const dx = px - cx
        const dy = py - cy
        const r2 = dx * dx + dy * dy
        const idx = (py * globeSize + px) * 4

        if (r2 > rMax) {
          data[idx] = 0
          data[idx + 1] = 0
          data[idx + 2] = 0
          data[idx + 3] = 0
          continue
        }

        const nx = dx / radius
        const ny = dy / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        const u = (Math.atan2(nx, nz) / (2 * Math.PI) + 0.5) % 1
        const v = ny * 0.5 + 0.5

        const h = sampleHeight(u, v)
        const baseColor = sampleColorForHeight(h, seaLevel)

        const nDotL =
          nx * lightDir.x + ny * lightDir.y + nz * lightDir.z
        const light = 0.25 + Math.max(0, nDotL) * 0.75

        const r = Math.max(
          0,
          Math.min(255, Math.round(baseColor.r * light)),
        )
        const g = Math.max(
          0,
          Math.min(255, Math.round(baseColor.g * light)),
        )
        const b = Math.max(
          0,
          Math.min(255, Math.round(baseColor.b * light)),
        )

        data[idx] = r
        data[idx + 1] = g
        data[idx + 2] = b
        data[idx + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }

  // ------------------------
  // Helper: draw sticker overlays on a canvas (with optional camera)
  // ------------------------
  function drawStickerOverlays(
    canvas: HTMLCanvasElement,
    currentWorld: LoadedWorld,
    state: StickerState,
    selectedId: string | null,
    camera: MapCamera | null,
    mode: 'full' | 'viewport',
  ) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stickers: any[] = (state.stickers ?? []) as any[]
    if (!stickers.length) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const w = currentWorld.width
    const h = currentWorld.height

    let vx0 = 0
    let vy0 = 0
    let vw = w
    let vh = h

    if (camera && mode === 'viewport') {
      const vp = getViewport(currentWorld, camera)
      vx0 = vp.x
      vy0 = vp.y
      vw = vp.width
      vh = vp.height
    }

    ctx.save()

    for (const s of stickers) {
      const sx = s.x ?? 0
      const sy = s.y ?? 0
      const sw = s.width ?? 1
      const sh = s.height ?? 1

      const nx0 = (sx - vx0) / vw
      const ny0 = (sy - vy0) / vh
      const nx1 = (sx + sw - vx0) / vw
      const ny1 = (sy + sh - vy0) / vh

      if (nx1 < 0 || ny1 < 0 || nx0 > 1 || ny0 > 1) {
        continue
      }

      const px = nx0 * canvasWidth
      const py = ny0 * canvasHeight
      const pw = (nx1 - nx0) * canvasWidth
      const ph = (ny1 - ny0) * canvasHeight

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
    if (!mainCanvas) return

    if (viewMode === 'map') {
      renderWorldMapToCanvas(mainCanvas, world, mapCamera)
      drawStickerOverlays(
        mainCanvas,
        world,
        stickerState,
        selectedStickerId,
        mapCamera,
        'viewport',
      )
    } else {
      renderWorldGlobeToCanvas(mainCanvas, world)
    }

    if (minimapCanvas) {
      const ctx = minimapCanvas.getContext('2d')
      if (!ctx) return

      if (viewMode === 'globe') {
        renderWorldMapToCanvas(minimapCanvas, world, null)
        drawStickerOverlays(
          minimapCanvas,
          world,
          stickerState,
          selectedStickerId,
          null,
          'full',
        )

        // Draw viewport rectangle for Map camera
        if (mapCamera) {
          const vp = getViewport(world, mapCamera)
          const nx = vp.x / world.width
          const ny = vp.y / world.height
          const nw = vp.width / world.width
          const nh = vp.height / world.height

          const rx = nx * minimapCanvas.width
          const ry = ny * minimapCanvas.height
          const rw = nw * minimapCanvas.width
          const rh = nh * minimapCanvas.height

          ctx.save()
          ctx.strokeStyle = '#00ffcc'
          ctx.lineWidth = 2
          ctx.globalAlpha = 0.9
          ctx.strokeRect(rx, ry, rw, rh)
          ctx.restore()
        }
      } else {
        ctx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height)
      }
    }
  }, [world, stickerState, selectedStickerId, viewMode, mapCamera])

  // ------------------------
  // Coordinate helpers: canvas → world (with camera)
  // ------------------------
  function canvasToWorldCoords(
    canvas: HTMLCanvasElement,
    evt: ReactMouseEvent<HTMLCanvasElement>,
    w: LoadedWorld,
    camera: MapCamera | null,
  ): { x: number; y: number } | null {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const px = (evt.clientX - rect.left) * scaleX
    const py = (evt.clientY - rect.top) * scaleY

    if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) {
      return null
    }

    if (!camera) {
      const wx = (px / canvas.width) * w.width
      const wy = (py / canvas.height) * w.height
      return { x: wx, y: wy }
    }

    const vp = getViewport(w, camera)

    const wx = vp.x + (px / canvas.width) * vp.width
    const wy = vp.y + (py / canvas.height) * vp.height

    return { x: wx, y: wy }
  }

  function pickCellFromCanvas(
    canvas: HTMLCanvasElement,
    evt: ReactMouseEvent<HTMLCanvasElement>,
    w: LoadedWorld,
    camera: MapCamera | null,
  ): { x: number; y: number; cell: WorldCell } | null {
    const coords = canvasToWorldCoords(canvas, evt, w, camera)
    if (!coords) return null

    const gridX = Math.floor(coords.x)
    const gridY = Math.floor(coords.y)

    if (gridX < 0 || gridY < 0 || gridX >= w.width || gridY >= w.height) {
      return null
    }

    const index = gridY * w.width + gridX
    const cell = w.cells[index]
    if (!cell) return null

    return { x: gridX, y: gridY, cell }
  }

  function cellToLatLon(x: number, y: number, w: LoadedWorld) {
    const lon = (x / (w.width - 1)) * 360 - 180
    const lat = 90 - (y / (w.height - 1)) * 180
    return { lat, lon }
  }

  // ------------------------
  // Inspect tool logic (map view only)
  // ------------------------
  function handleInspectClick(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    if (viewMode !== 'map') {
      setSelectedCell(null)
      return
    }

    const canvas = mainCanvasRef.current
    if (!canvas) return

    const result = pickCellFromCanvas(canvas, evt, world, mapCamera)
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
  // Terrain brush logic (map view only)
  // ------------------------
  function applyBrushAt(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    if (viewMode !== 'map') return

    const canvas = mainCanvasRef.current
    if (!canvas) return

    const coords = canvasToWorldCoords(canvas, evt, world, mapCamera)
    if (!coords) return

    const cx = coords.x
    const cy = coords.y

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

    if (viewMode !== 'map') return

    if (activeTool === 'terrain-brush') {
      setIsBrushing(true)
      applyBrushAt(evt)
      return
    }

    if (activeTool === 'sticker') {
      const canvas = mainCanvasRef.current
      if (!canvas) return

      const coords = canvasToWorldCoords(canvas, evt, world, mapCamera)
      if (!coords) return

      const gridX = Math.floor(coords.x)
      const gridY = Math.floor(coords.y)

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
    if (viewMode !== 'map') return
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

  // Zoom with mouse wheel in Map view
  function handleMainCanvasWheel(evt: ReactWheelEvent<HTMLCanvasElement>) {
    if (!world) return
    if (viewMode !== 'map') return

    evt.preventDefault()

    setMapCamera(prev => {
      if (!prev) return prev
      const zoomDelta = evt.deltaY > 0 ? -0.5 : 0.5
      const nextZoom = prev.zoom + zoomDelta
      const clamped = clampCamera(world, { ...prev, zoom: nextZoom })
      return clamped
    })
  }

  // ------------------------
  // Sticker selection & camera recentre via minimap (globe view)
  // ------------------------
  function handleMinimapClick(evt: ReactMouseEvent<HTMLCanvasElement>) {
    if (!world) return
    if (viewMode !== 'globe') return

    const canvas = minimapCanvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const px = (evt.clientX - rect.left) * scaleX
    const py = (evt.clientY - rect.top) * scaleY

    if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) {
      return
    }

    const stickers: any[] = (stickerState.stickers ?? []) as any[]
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    let clickedId: string | null = null

    for (const s of stickers) {
      const sx = s.x ?? 0
      const sy = s.y ?? 0
      const sw = s.width ?? 1
      const sh = s.height ?? 1

      const nx = sx / world.width
      const ny = sy / world.height
      const nw = sw / world.width
      const nh = sh / world.height

      const rx = nx * canvasWidth
      const ry = ny * canvasHeight
      const rw = nw * canvasWidth
      const rh = nh * canvasHeight

      if (
        px >= rx &&
        px <= rx + rw &&
        py >= ry &&
        py <= ry + rh
      ) {
        clickedId = s.id ?? null
        break
      }
    }

    if (clickedId) {
      setSelectedStickerId(clickedId)
      return
    }

    // No sticker hit: recenter map camera to this minimap point.
    setMapCamera(prev => {
      if (!prev || !world) {
        return {
          centerX: (px / canvasWidth) * world.width,
          centerY: (py / canvasHeight) * world.height,
          zoom: 2,
        }
      }
      const newCenterX = (px / canvasWidth) * world.width
      const newCenterY = (py / canvasHeight) * world.height
      const candidate: MapCamera = {
        ...prev,
        centerX: newCenterX,
        centerY: newCenterY,
      }
      return clampCamera(world, candidate)
    })
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
      <h3>View</h3>
      <div className="ww-control-row">
        <button
          className={viewMode === 'map' ? 'active' : ''}
          onClick={() => setViewMode('map')}
        >
          Map
        </button>
        <button
          className={viewMode === 'globe' ? 'active' : ''}
          onClick={() => setViewMode('globe')}
        >
          Globe
        </button>
      </div>

      <h3 style={{ marginTop: '1rem' }}>Tools</h3>

      <button
        className={activeTool === 'inspect' ? 'active' : ''}
        onClick={() => setActiveTool('inspect')}
      >
        Inspect
      </button>

      <button
        className={activeTool === 'terrain-brush' ? 'active' : ''}
        onClick={() => setActiveTool('terrain-brush')}
        disabled={viewMode !== 'map'}
      >
        Terrain brush
      </button>

      <button
        className={activeTool === 'sticker' ? 'active' : ''}
        onClick={() => setActiveTool('sticker')}
        disabled={viewMode !== 'map'}
      >
        Sticker
      </button>

      {viewMode === 'map' && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Camera</h3>
          <div className="ww-control-row">
            <label>Zoom</label>
            <input
              type="range"
              min={1}
              max={8}
              value={mapCamera?.zoom ?? 1}
              onChange={e => {
                if (!world) return
                const nextZoom = Number(e.target.value)
                setMapCamera(prev =>
                  prev
                    ? clampCamera(world, { ...prev, zoom: nextZoom })
                    : {
                        centerX: world.width / 2,
                        centerY: world.height / 2,
                        zoom: nextZoom,
                      },
                )
              }}
            />
            <span>{mapCamera?.zoom.toFixed(1) ?? '1.0'}</span>
          </div>
          <button
            style={{ marginTop: '0.25rem' }}
            onClick={() => {
              if (!world) return
              setMapCamera({
                centerX: world.width / 2,
                centerY: world.height / 2,
                zoom: 1,
              })
            }}
          >
            Reset view
          </button>
        </div>
      )}

      {activeTool === 'terrain-brush' && viewMode === 'map' && (
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
        onWheel={handleMainCanvasWheel}
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
      {viewMode !== 'map' && (
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          Switch to <strong>Map</strong> view to inspect and edit terrain.
        </p>
      )}
      {viewMode === 'map' && !selectedCell && (
        <p>Use the Inspect tool, then click on the map to sample a location.</p>
      )}
      {viewMode === 'map' && selectedCell && (
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
              In Map view, click on the map to create a sticker. In Globe view,
              click the minimap to select stickers or recenter the editor view.
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
      minimapOverlay={viewMode === 'globe' ? minimapView : null}
      rightPanel={rightPanel}
    />
  )
}
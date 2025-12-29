// ========================================================
// JARVIS CHANGE HEADER -- RENDER SPINE COMPAT LAYER
// File: src/core/planetRenderer.ts
//
// Goals:
// - Provide a stable, shared CPU-preview renderer for both Generate + Create.
// - Export names used across the codebase (compat aliases).
// - Keep this module pure-view: read WorldBrain, render pixels.
//
// Notes:
// - This is NOT the final "Google Earth-like" renderer.
// - This is a spine-safe preview renderer to validate world data + params.
// ========================================================

import { WorldBrain } from './worldSchema'

// -------------------------------
// Types
// -------------------------------

export type PlanetPreview = {
  width: number
  height: number
  seaLevel: number
  getCellIndex: (x: number, y: number) => number
  sample: (u: number, v: number) => {
    h: number
    t: number
    r: number
    biomeId?: number
  }
}

// -------------------------------
// World -> Preview
// -------------------------------

function getWorldDims(world: WorldBrain): { w: number; h: number } {
  // Prefer explicit metadata if present
  const mw = (world as any).metadata?.width
  const mh = (world as any).metadata?.height
  if (Number.isFinite(mw) && Number.isFinite(mh) && mw > 0 && mh > 0) {
    return { w: mw, h: mh }
  }

  // Fallback: infer square-ish from cell count
  const n = world.cells?.length ?? 0
  const s = Math.max(1, Math.floor(Math.sqrt(n)))
  return { w: s, h: Math.max(1, Math.floor(n / s)) }
}

function getSeaLevel(world: WorldBrain): number {
  const m = (world as any).metadata
  const v = m?.seaLevel
  if (Number.isFinite(v)) return v
  // Safe default: 0 means "sea at 0 height"
  return 0
}

function combinedHeight(cell: any): number {
  const base = Number(cell?.baseHeight ?? 0)
  const edit = Number(cell?.editHeightDelta ?? 0)
  const sim = Number(cell?.simHeightDelta ?? 0)
  return base + edit + sim
}

function pickBiomeId(cell: any): number | undefined {
  // Prefer editBiomeId if present, else baseBiomeId, else biomeId
  const e = cell?.editBiomeId
  if (Number.isFinite(e)) return e
  const b = cell?.baseBiomeId
  if (Number.isFinite(b)) return b
  const legacy = cell?.biomeId
  if (Number.isFinite(legacy)) return legacy
  return undefined
}

export function makePlanetPreviewFromWorldBrain(world: WorldBrain): PlanetPreview {
  const { w, h } = getWorldDims(world)
  const seaLevel = getSeaLevel(world)

  const getCellIndex = (x: number, y: number) => {
    const xx = Math.max(0, Math.min(w - 1, x))
    const yy = Math.max(0, Math.min(h - 1, y))
    return yy * w + xx
  }

  const sample = (u: number, v: number) => {
    // u,v in [0..1]
    const x = Math.max(0, Math.min(w - 1, Math.floor(u * w)))
    const y = Math.max(0, Math.min(h - 1, Math.floor(v * h)))
    const idx = getCellIndex(x, y)
    const cell = world.cells[idx] as any

    const hgt = combinedHeight(cell)
    const t = Number(cell?.temperature ?? 0)
    const r = Number(cell?.rainfall ?? cell?.moisture ?? 0)
    const biomeId = pickBiomeId(cell)

    return { h: hgt, t, r, biomeId }
  }

  return { width: w, height: h, seaLevel, getCellIndex, sample }
}

/**
 * COMPAT EXPORT:
 * Some parts of the app import makePlanetPreviewFromWorld.
 * Provide it as an alias to the canonical WorldBrain function.
 */
export function makePlanetPreviewFromWorld(world: WorldBrain): PlanetPreview {
  return makePlanetPreviewFromWorldBrain(world)
}

// -------------------------------
// Color mapping (preview)
// -------------------------------

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x))
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function mixRGB(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: lerp(a.r, b.r, t),
    g: lerp(a.g, b.g, t),
    b: lerp(a.b, b.b, t),
  }
}

function rgb(r: number, g: number, b: number) {
  return { r, g, b }
}

export function samplePlanetColor(preview: PlanetPreview, u: number, v: number, seaLevelOverride?: number) {
  const sea = Number.isFinite(seaLevelOverride as any) ? (seaLevelOverride as number) : preview.seaLevel
  const s = preview.sample(u, v)

  // Normalize some values (these are preview heuristics, not final world physics)
  const height = s.h
  const temp = s.t
  const rain = s.r

  // Height relative to sea
  const above = height - sea

  // Ocean
  if (above < 0) {
    const depth = clamp01(Math.abs(above) * 0.8)
    // Deep ocean -> shallow ocean
    const deep = rgb(18, 55, 120)
    const shallow = rgb(30, 120, 180)
    // Subtle shelf brightening near coast
    const t = clamp01(1 - depth)
    const c = mixRGB(deep, shallow, t)
    return { r: c.r, g: c.g, b: c.b }
  }

  // Land baseline: use temp/rain to pick dry/green/snow
  // Snowline heuristic: colder temps trend snow
  const cold = clamp01((0.25 - temp) * 2.2) // temp below ~0.25 becomes snowy
  const wet = clamp01(rain)
  const elev = clamp01(above * 0.9)

  const sand = rgb(190, 175, 120)
  const grass = rgb(70, 140, 90)
  const rock = rgb(120, 120, 120)
  const snow = rgb(230, 235, 240)

  // Dry -> green based on rainfall
  let land = mixRGB(sand, grass, wet)

  // Higher elevation trends rocky
  land = mixRGB(land, rock, elev * 0.55)

  // Cold trends snow (stronger at elevation)
  const snowMix = clamp01(cold * (0.6 + elev * 0.7))
  land = mixRGB(land, snow, snowMix)

  // Beach band near sea (thin light strip)
  if (above >= 0 && above < 0.03) {
    land = mixRGB(land, rgb(215, 205, 170), 0.65)
  }

  return { r: land.r, g: land.g, b: land.b }
}

// -------------------------------
// Rendering helpers
// -------------------------------

export function renderMinimap(ctx: CanvasRenderingContext2D, preview: PlanetPreview, outW = 180, outH = 120) {
  const w = outW
  const h = outH
  const img = ctx.createImageData(w, h)
  const data = img.data

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / (w - 1)
      const v = y / (h - 1)
      const c = samplePlanetColor(preview, u, v)
      const p = (y * w + x) * 4
      data[p + 0] = Math.max(0, Math.min(255, Math.round(c.r)))
      data[p + 1] = Math.max(0, Math.min(255, Math.round(c.g)))
      data[p + 2] = Math.max(0, Math.min(255, Math.round(c.b)))
      data[p + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}

/**
 * Convenience for GenerateMode: render a full "planet disk" onto a canvas.
 * This is a CPU preview disk, not the final globe renderer.
 */
export function renderPlanetToCanvas(
  ctx: CanvasRenderingContext2D,
  preview: PlanetPreview,
  size = 360,
  seaLevelOverride?: number
) {
  const canvas = ctx.canvas
  canvas.width = size
  canvas.height = size

  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.45

  const img = ctx.createImageData(size, size)
  const data = img.data

  // Directional light
  const L = { x: -0.35, y: 0.35, z: 0.87 }
  const len = Math.sqrt(L.x * L.x + L.y * L.y + L.z * L.z) || 1
  L.x /= len
  L.y /= len
  L.z /= len

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const dx = px - cx
      const dy = py - cy
      const d2 = dx * dx + dy * dy
      const p = (py * size + px) * 4

      if (d2 > radius * radius) {
        data[p + 3] = 0
        continue
      }

      // Sphere normal
      const nx = dx / radius
      const ny = dy / radius
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

      // lon/lat to u/v
      const lon = Math.atan2(nx, nz)
      const lat = Math.asin(ny)
      const u = (lon + Math.PI) / (Math.PI * 2)
      const v = 1 - (lat + Math.PI / 2) / Math.PI

      const col = samplePlanetColor(preview, u, v, seaLevelOverride)

      const ndotl = clamp01(nx * L.x + ny * L.y + nz * L.z)
      const rim = Math.pow(1 - nz, 2) * 0.35
      const light = 0.62 + 0.48 * ndotl + rim

      data[p + 0] = Math.max(0, Math.min(255, Math.round(col.r * light)))
      data[p + 1] = Math.max(0, Math.min(255, Math.round(col.g * light)))
      data[p + 2] = Math.max(0, Math.min(255, Math.round(col.b * light)))
      data[p + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
}
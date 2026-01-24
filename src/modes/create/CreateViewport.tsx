import React, { useEffect, useRef, useState } from "react";

import type { WorldBrain } from "../../core/worldSchema";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { TerrainBrushController, TerrainBrushState } from "./TerrainBrushController";

type Props = {
  world: WorldBrain;
  activeTerrainTool?: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH' | null;
  onWorldChange: (w: WorldBrain) => void;
};

interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

function draw(canvas: HTMLCanvasElement, world: WorldBrain) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const preview = makePlanetPreviewFromWorldBrain(world);
  const w = preview.width;
  const h = preview.height;

  const maxW = 1100;
  const scale = Math.max(1, Math.floor(maxW / w));
  canvas.width = w * scale;
  canvas.height = h * scale;

  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const rgba = preview.minimapColorAt(x, y);
      const idx = (y * w + x) * 4;
      d[idx + 0] = rgba[0];
      d[idx + 1] = rgba[1];
      d[idx + 2] = rgba[2];
      d[idx + 3] = rgba[3];
    }
  }

  const tmp = document.createElement("canvas");
  tmp.width = w;
  tmp.height = h;
  const tctx = tmp.getContext("2d");
  if (!tctx) return;
  tctx.putImageData(img, 0, 0);

  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tmp, 0, 0, w * scale, h * scale);
}

/**
 * Convert screen coordinates to grid cell coordinates.
 * FIXED: Proper scaling calculation for accurate coordinate mapping.
 */
function screenToGridCoords(
  screenX: number,
  screenY: number,
  canvas: HTMLCanvasElement,
  world: WorldBrain
): { row: number; col: number } | null {
  if (!canvas) return null;

  const rect = canvas.getBoundingClientRect();
  const x = screenX - rect.left;
  const y = screenY - rect.top;

  // Normalize to 0..1 based on displayed canvas size
  const normX = x / rect.width;
  const normY = y / rect.height;

  // Map to grid coordinates
  const col = Math.floor(normX * world.gridWidth);
  const row = Math.floor(normY * world.gridHeight);

  if (row < 0 || row >= world.gridHeight || col < 0 || col >= world.gridWidth) {
    return null;
  }

  return { row, col };
}

export default function CreateViewport({ world, activeTerrainTool, onWorldChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const brushControllerRef = useRef<TerrainBrushController | null>(null);
  const [brushState, setBrushState] = useState<TerrainBrushState | null>(null);
  const labelsOverlayRef = useRef<HTMLDivElement | null>(null);

  // Initialize brush controller
  useEffect(() => {
    brushControllerRef.current = new TerrainBrushController(
      world,
      setBrushState,
      onWorldChange
    );
    if (activeTerrainTool) {
      brushControllerRef.current.setTool(activeTerrainTool);
    }
  }, [world, onWorldChange]);

  // Update brush tool when activeTerrainTool changes
  useEffect(() => {
    if (activeTerrainTool && brushControllerRef.current) {
      brushControllerRef.current.setTool(activeTerrainTool);
    } else if (!activeTerrainTool && brushControllerRef.current) {
      brushControllerRef.current.disable();
    }
  }, [activeTerrainTool]);

  // Redraw canvas when world changes
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    try {
      draw(c, world);
    } catch (e) {
      console.error("Create viewport draw failed:", e);
    }
    // Also refresh labels overlay
    try {
      updateLabelsOverlay();
    } catch (e) {}
  }, [world]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !brushControllerRef.current) return;

    const coords = screenToGridCoords(e.clientX, e.clientY, canvas, world);
    if (coords) {
      brushControllerRef.current.startStroke(coords.row, coords.col);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !brushControllerRef.current) return;

    const coords = screenToGridCoords(e.clientX, e.clientY, canvas, world);
    if (coords) {
      brushControllerRef.current.continueStroke(coords.row, coords.col);
    }
  };

  const handleCanvasMouseUp = () => {
    if (brushControllerRef.current) {
      brushControllerRef.current.endStroke();
    }
  };

  const handleCanvasMouseLeave = () => {
    if (brushControllerRef.current) {
      brushControllerRef.current.endStroke();
    }
  };

  // ------------------------------
  // Country labels overlay (MAP)
  // ------------------------------
  type Label = { name: string; lat: number; lon: number; el: HTMLDivElement };
  const labels: Label[] = [];

  function computeCentroid(poly: { lat: number; lon: number }[]): { lat: number; lon: number } {
    if (!poly || poly.length === 0) return { lat: 0, lon: 0 };
    let lat = 0, lon = 0;
    for (const p of poly) { lat += p.lat; lon += p.lon; }
    lat /= poly.length; lon /= poly.length;
    return { lat, lon };
  }

  function initLabels() {
    const overlay = labelsOverlayRef.current;
    if (!overlay) return;
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
    labels.length = 0;

    const maxLabels = 12;
    const countries = Array.isArray(world.countries) ? world.countries.slice(0, maxLabels) : [];
    for (const c of countries) {
      const poly = c.polygons?.[0] || [];
      const { lat, lon } = computeCentroid(poly);
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.padding = '3px 6px';
      el.style.borderRadius = '6px';
      el.style.border = '1px solid rgba(0,0,0,0.35)';
      el.style.background = 'rgba(0,0,0,0.6)';
      el.style.color = 'rgba(255,255,255,0.95)';
      el.style.fontSize = '11px';
      el.style.whiteSpace = 'nowrap';
      el.textContent = c.name;
      overlay.appendChild(el);
      labels.push({ name: c.name, lat, lon, el });
    }
  }

  function latLonToCanvasXY(lat: number, lon: number): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const w = canvas.width;
    const h = canvas.height;
    const x = ((lon + 180) / 360) * w;
    const y = (((90 - lat) / 180)) * h;
    return { x, y };
  }

  function updateLabelsOverlay() {
    const overlay = labelsOverlayRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !canvas) return;
    if (labels.length === 0) initLabels();
    for (const lbl of labels) {
      const p = latLonToCanvasXY(lbl.lat, lbl.lon);
      lbl.el.style.left = `${p.x}px`;
      lbl.el.style.top = `${p.y}px`;
      lbl.el.style.display = 'block';
    }
  }

  useEffect(() => {
    initLabels();
    updateLabelsOverlay();
    const onResize = () => updateLabelsOverlay();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "auto" }}>
      <div style={{ padding: 12, fontWeight: 900 }}>
        Create View
        {brushState?.enabled && (
          <span style={{ marginLeft: 12, fontSize: 12, opacity: 0.7 }}>
            Tool: {brushState.tool} | Radius: {brushState.brushParams.radius}
          </span>
        )}
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ position: 'relative' }}>
          <canvas
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseLeave}
          style={{
            width: "100%",
            maxWidth: 1200,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#111",
            display: "block",
            cursor: brushState?.enabled ? "crosshair" : "default",
          }}
          />
          <div
            ref={labelsOverlayRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
            }}
          />
        </div>
        <div style={{ fontSize: 11, opacity: 0.65, marginTop: 8 }}>
          {brushState?.enabled
            ? `Terrain brush active: ${brushState.tool.toUpperCase()} - click and drag to paint.`
            : "Select a terrain tool above to start editing."}
        </div>
      </div>
    </div>
  );
}
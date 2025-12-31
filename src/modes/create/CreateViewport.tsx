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
        <div style={{ fontSize: 11, opacity: 0.65, marginTop: 8 }}>
          {brushState?.enabled
            ? `Terrain brush active: ${brushState.tool.toUpperCase()} - click and drag to paint.`
            : "Select a terrain tool above to start editing."}
        </div>
      </div>
    </div>
  );
}
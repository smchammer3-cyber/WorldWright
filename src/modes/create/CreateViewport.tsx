import React, { useEffect, useMemo, useRef, useState } from "react";

import type {
  WorldBrain,
  Cell,
  Plate,
  River,
  Country,
  Culture,
  CultureRegion,
  City,
  Location,
  Sticker,
} from "../../core/worldSchema";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { TerrainBrushController, TerrainBrushState } from "./TerrainBrushController";

type Props = {
  world: WorldBrain;
  activeTerrainTool?: 'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH' | null;
  onWorldChange: (w: WorldBrain) => void;
};

function cloneCell(cell: Cell): Cell {
  return {
    ...cell,
    prevailingWind: [...cell.prevailingWind] as [number, number],
    cultureMix: cell.cultureMix
      ? cell.cultureMix.map((entry) => ({ ...entry }))
      : cell.cultureMix,
  };
}

function clonePlate(plate: Plate): Plate {
  return {
    ...plate,
    velocity: [...plate.velocity] as [number, number],
    polygons: plate.polygons
      ? plate.polygons.map((ring) => ring.map((point) => ({ ...point })))
      : plate.polygons,
  };
}

function cloneRiver(river: River): River {
  return {
    ...river,
    path: [...river.path],
  };
}

function cloneCountry(country: Country): Country {
  return {
    ...country,
    polygons: country.polygons.map((ring) => ring.map((point) => ({ ...point }))),
  };
}

function cloneCulture(culture: Culture): Culture {
  return { ...culture };
}

function cloneCultureRegion(region: CultureRegion): CultureRegion {
  return {
    ...region,
    polygon: region.polygon.map((point) => ({ ...point })),
  };
}

function cloneCity(city: City): City {
  return {
    ...city,
    economicRoles: city.economicRoles ? [...city.economicRoles] : city.economicRoles,
    tags: city.tags ? [...city.tags] : city.tags,
  };
}

function cloneLocation(location: Location): Location {
  return { ...location };
}

function cloneSticker(sticker: Sticker): Sticker {
  return {
    ...sticker,
    polygon: sticker.polygon.map((point) => ({ ...point })),
    payload: { ...sticker.payload },
  };
}

function cloneWorldForRender(source: WorldBrain): WorldBrain {
  return {
    ...source,
    metadata: { ...source.metadata },
    parameters: source.parameters ? { ...source.parameters } : source.parameters,
    cells: source.cells.map(cloneCell),
    plates: source.plates.map(clonePlate),
    rivers: source.rivers.map(cloneRiver),
    countries: source.countries.map(cloneCountry),
    cultures: source.cultures.map(cloneCulture),
    cultureRegions: source.cultureRegions.map(cloneCultureRegion),
    cities: source.cities.map(cloneCity),
    locations: source.locations ? source.locations.map(cloneLocation) : source.locations,
    stickers: source.stickers ? source.stickers.map(cloneSticker) : source.stickers,
  };
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

  const normX = x / rect.width;
  const normY = y / rect.height;

  const col = Math.floor(normX * world.gridWidth);
  const row = Math.floor(normY * world.gridHeight);

  if (row < 0 || row >= world.gridHeight || col < 0 || col >= world.gridWidth) {
    return null;
  }

  return { row, col };
}

type Label = { name: string; lat: number; lon: number; el: HTMLDivElement };

export default function CreateViewport({ world, activeTerrainTool, onWorldChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const borderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const brushControllerRef = useRef<TerrainBrushController | null>(null);
  const labelsOverlayRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<Label[]>([]);

  const [brushState, setBrushState] = useState<TerrainBrushState | null>(null);
  const [draftWorld, setDraftWorld] = useState<WorldBrain>(() => cloneWorldForRender(world));

  const isDrawing = brushState?.isDrawing ?? false;

  useEffect(() => {
    if (!isDrawing) {
      const fresh = cloneWorldForRender(world);
      setDraftWorld(fresh);
      brushControllerRef.current?.setWorld(fresh);
    }
  }, [world, isDrawing]);

  useEffect(() => {
    if (!brushControllerRef.current) {
      const initialDraft = cloneWorldForRender(world);
      brushControllerRef.current = new TerrainBrushController(
        initialDraft,
        setBrushState,
        (previewWorld) => {
          const previewClone = cloneWorldForRender(previewWorld);
          setDraftWorld(previewClone);
          brushControllerRef.current?.setWorld(previewClone);
        },
        (committedWorld) => {
          const committedClone = cloneWorldForRender(committedWorld);
          setDraftWorld(committedClone);
          brushControllerRef.current?.setWorld(committedClone);
          onWorldChange(committedClone);
        }
      );
    }
  }, [onWorldChange, world]);

  useEffect(() => {
    if (activeTerrainTool && brushControllerRef.current) {
      brushControllerRef.current.setTool(activeTerrainTool);
    } else if (!activeTerrainTool && brushControllerRef.current) {
      brushControllerRef.current.disable();
    }
  }, [activeTerrainTool]);

  useEffect(() => {
    const c = canvasRef.current;
    const bc = borderCanvasRef.current;
    if (!c) return;

    try {
      draw(c, draftWorld);
      if (bc) drawBorders(bc, draftWorld, c);
    } catch (e) {
      console.error("Create viewport draw failed:", e);
    }

    try {
      updateLabelsOverlay();
    } catch (e) {
      // ignore overlay refresh issues
    }
  }, [draftWorld]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !brushControllerRef.current) return;

    const coords = screenToGridCoords(e.clientX, e.clientY, canvas, draftWorld);
    if (coords) {
      brushControllerRef.current.startStroke(coords.row, coords.col);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !brushControllerRef.current) return;

    const coords = screenToGridCoords(e.clientX, e.clientY, canvas, draftWorld);
    if (coords) {
      brushControllerRef.current.continueStroke(coords.row, coords.col);
    }
  };

  const handleCanvasMouseUp = () => {
    brushControllerRef.current?.endStroke();
  };

  const handleCanvasMouseLeave = () => {
    brushControllerRef.current?.endStroke();
  };

  function drawBorders(overlay: HTMLCanvasElement, worldToDraw: WorldBrain, baseCanvas: HTMLCanvasElement) {
    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    const rect = baseCanvas.getBoundingClientRect();
    overlay.width = Math.max(1, Math.floor(rect.width));
    overlay.height = Math.max(1, Math.floor(rect.height));
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    const w = worldToDraw.gridWidth;
    const h = worldToDraw.gridHeight;

    const sx = overlay.width / w;
    const sy = overlay.height / h;

    ctx.strokeStyle = 'rgba(10,10,15,0.95)';
    ctx.lineWidth = Math.max(1, Math.floor(Math.min(sx, sy)));

    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const idx = r * w + c;
        const cell = worldToDraw.cells[idx];
        if (!cell || cell.isWater || !cell.countryId) continue;

        const myId = cell.countryId;
        const neighbors = [
          [r - 1, c],
          [r + 1, c],
          [r, (c - 1 + w) % w],
          [r, (c + 1) % w],
        ];

        let isBorder = false;

        for (const [nr, nc] of neighbors) {
          if (nr < 0 || nr >= h) continue;
          const nIdx = nr * w + nc;
          const nCell = worldToDraw.cells[nIdx];
          if (nCell && !nCell.isWater && nCell.countryId && nCell.countryId !== myId) {
            isBorder = true;
            break;
          }
        }

        if (isBorder) {
          const x = c * sx;
          const y = r * sy;
          ctx.fillStyle = 'rgba(20,20,30,0.95)';
          ctx.fillRect(x, y, Math.ceil(sx), Math.ceil(sy));
        }
      }
    }
  }

  function computeCentroid(poly: { lat: number; lon: number }[]): { lat: number; lon: number } {
    if (!poly || poly.length === 0) return { lat: 0, lon: 0 };
    let lat = 0;
    let lon = 0;
    for (const p of poly) {
      lat += p.lat;
      lon += p.lon;
    }
    lat /= poly.length;
    lon /= poly.length;
    return { lat, lon };
  }

  function initLabels() {
    const overlay = labelsOverlayRef.current;
    if (!overlay) return;

    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
    labelsRef.current = [];

    const maxLabels = 12;
    const countries = Array.isArray(draftWorld.countries) ? draftWorld.countries.slice(0, maxLabels) : [];

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
      labelsRef.current.push({ name: c.name, lat, lon, el });
    }
  }

  function latLonToCanvasXY(lat: number, lon: number): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const x = ((lon + 180) / 360) * w;
    const y = ((90 - lat) / 180) * h;

    return { x, y };
  }

  function updateLabelsOverlay() {
    const overlay = labelsOverlayRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !canvas) return;

    if (labelsRef.current.length === 0) initLabels();

    for (const lbl of labelsRef.current) {
      const p = latLonToCanvasXY(lbl.lat, lbl.lon);
      lbl.el.style.left = `${p.x}px`;
      lbl.el.style.top = `${p.y}px`;
      lbl.el.style.display = 'block';
    }
  }

  useEffect(() => {
    initLabels();
    updateLabelsOverlay();

    const onResize = () => {
      updateLabelsOverlay();
      const c = canvasRef.current;
      const bc = borderCanvasRef.current;
      if (c && bc) drawBorders(bc, draftWorld, c);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draftWorld]);

  const helperText = useMemo(() => {
    if (!brushState?.enabled) return "Select a terrain tool above to start editing.";
    return `Terrain brush active: ${brushState.tool.toUpperCase()} - click and drag to paint.`;
  }, [brushState]);

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
          <canvas
            ref={borderCanvasRef}
            style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, pointerEvents: 'none' }}
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
          {helperText}
        </div>
      </div>
    </div>
  );
}
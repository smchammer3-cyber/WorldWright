// ========================================================
// WORLDWRIGHT -- STICKER DRAWING OVERLAY (V1.3 SELECTION BOX)
// File: src/modes/create/StickerDrawingOverlay.tsx
//
// Primitive palette + visible selection handles + bounding box feel.
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { WorldBrain } from '../../core/worldSchema';
import { createRandomIdentity } from '../../core/worldEntropy';
import {
  applyStickerToWorld,
  createPrimitive,
  createSticker,
  findNearestEdgeMidpointScreen,
  findNearestVertexScreen,
  getBoundingHandlePoints,
  getPolygonCentroid,
  insertMidpoint,
  latLonToScreen,
  movePolygon,
  scalePolygonFromCenter,
  screenToLatLon,
  type LatLonPoint,
  type StickerPrimitive,
  type StickerToolType,
} from './StickerPolygonEditor';
import BiomeValidationModal, { validateBiomePlacement } from './BiomeValidationModal';

type Props = {
  world: WorldBrain | null;
  activeStickerTool?: StickerToolType | null;
  onStickerCreated?: (world: WorldBrain) => void;
  onCancel?: () => void;
};

type DragMode =
  | { kind: 'vertex'; index: number }
  | { kind: 'move'; start: LatLonPoint; original: LatLonPoint[] }
  | {
      kind: 'scale';
      handle: 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w';
      start: LatLonPoint;
      original: LatLonPoint[];
      center: LatLonPoint;
    }
  | null;

const BIOME_OPTIONS = [
  { id: 1, label: 'Polar / Tundra', color: 'rgba(210,230,255,0.34)' },
  { id: 3, label: 'Temperate Grassland', color: 'rgba(175,215,120,0.34)' },
  { id: 4, label: 'Desert', color: 'rgba(235,205,120,0.34)' },
  { id: 5, label: 'Rainforest / Lush', color: 'rgba(70,185,95,0.34)' },
  { id: 6, label: 'Mountain / Alpine', color: 'rgba(175,175,185,0.34)' },
];

const PRIMITIVE_OPTIONS: Array<{ id: StickerPrimitive; label: string }> = [
  { id: 'circle', label: 'Circle' },
  { id: 'square', label: 'Square' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'polygon', label: 'Polygon' },
];

function getStickerTitle(tool: StickerToolType | null | undefined): string {
  if (tool === 'BIOME') return 'Biome Sticker';
  if (tool === 'CULTURE') return 'Culture Sticker';
  if (tool === 'HEIGHT') return 'Terrain Sticker';
  return 'Sticker';
}

function getOverlayFillColor(
  tool: StickerToolType | null | undefined,
  biomeId: number
): string {
  if (tool === 'BIOME') {
    return BIOME_OPTIONS.find((b) => b.id === biomeId)?.color ?? 'rgba(70,185,95,0.34)';
  }
  if (tool === 'CULTURE') return 'rgba(180,120,220,0.26)';
  if (tool === 'HEIGHT') return 'rgba(220,145,85,0.26)';
  return 'rgba(100,200,255,0.22)';
}

export default function StickerDrawingOverlay({
  world,
  activeStickerTool,
  onStickerCreated,
  onCancel,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [polygon, setPolygon] = useState<LatLonPoint[]>([]);
  const [dragMode, setDragMode] = useState<DragMode>(null);

  const [selectedPrimitive, setSelectedPrimitive] = useState<StickerPrimitive>('rectangle');
  const [selectedBiomeId, setSelectedBiomeId] = useState<number>(5);
  const [selectedMode, setSelectedMode] = useState<'WORLD_RULES' | 'OVERRIDE'>('OVERRIDE');
  const [selectedFalloff, setSelectedFalloff] = useState<number>(0.15);

  const [pendingSticker, setPendingSticker] = useState<any>(null);
  const [showValidation, setShowValidation] = useState(false);

  const hasShape = polygon.length >= 3;
  const fillColor = useMemo(
    () => getOverlayFillColor(activeStickerTool, selectedBiomeId),
    [activeStickerTool, selectedBiomeId]
  );

  useEffect(() => {
    if (!activeStickerTool) {
      setPolygon([]);
      setDragMode(null);
      setPendingSticker(null);
      setShowValidation(false);
    }
  }, [activeStickerTool]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!hasShape) return;

    const toLocal = (p: LatLonPoint) => {
      const s = latLonToScreen(p.lat, p.lon, rect);
      return { x: s.x - rect.left, y: s.y - rect.top };
    };

    // shape fill
    ctx.beginPath();
    const first = toLocal(polygon[0]);
    ctx.moveTo(first.x, first.y);
    for (let i = 1; i < polygon.length; i++) {
      const p = toLocal(polygon[i]);
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = 'rgba(110,210,255,0.98)';
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // dashed selection boundary feel
    ctx.save();
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = 'rgba(255,255,255,0.78)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // midpoint handles
    for (let i = 0; i < polygon.length; i++) {
      const a = toLocal(polygon[i]);
      const b = toLocal(polygon[(i + 1) % polygon.length]);
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;

      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.strokeStyle = 'rgba(20,20,30,0.75)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.rect(midX - 4, midY - 4, 8, 8);
      ctx.fill();
      ctx.stroke();
    }

    // vertex handles
    for (let i = 0; i < polygon.length; i++) {
      const p = toLocal(polygon[i]);
      ctx.fillStyle = 'rgba(255,120,120,0.98)';
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // bounding handles
    const handles = getBoundingHandlePoints(polygon);
    const drawSquareHandle = (
      point: LatLonPoint,
      size = 10,
      fill = 'rgba(255,255,255,0.96)'
    ) => {
      const p = toLocal(point);
      ctx.fillStyle = fill;
      ctx.strokeStyle = 'rgba(20,20,30,0.78)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.rect(p.x - size / 2, p.y - size / 2, size, size);
      ctx.fill();
      ctx.stroke();
    };

    drawSquareHandle(handles.nw);
    drawSquareHandle(handles.ne);
    drawSquareHandle(handles.se);
    drawSquareHandle(handles.sw);
    drawSquareHandle(handles.n, 8, 'rgba(215,245,255,0.96)');
    drawSquareHandle(handles.e, 8, 'rgba(215,245,255,0.96)');
    drawSquareHandle(handles.s, 8, 'rgba(215,245,255,0.96)');
    drawSquareHandle(handles.w, 8, 'rgba(215,245,255,0.96)');

    // center move handle
    const c = toLocal(handles.center);
    ctx.fillStyle = 'rgba(90,255,145,0.98)';
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(20,20,30,0.8)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(c.x - 5, c.y);
    ctx.lineTo(c.x + 5, c.y);
    ctx.moveTo(c.x, c.y - 5);
    ctx.lineTo(c.x, c.y + 5);
    ctx.stroke();
  }, [polygon, hasShape, fillColor]);

  const spawnShapeAt = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const center = screenToLatLon(clientX, clientY, rect);
    setPolygon(createPrimitive(selectedPrimitive, center));
  };

  const findScaleHandle = (
    clientX: number,
    clientY: number
  ): 'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w' | null => {
    if (!containerRef.current || !hasShape) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const handles = getBoundingHandlePoints(polygon);
    const order: Array<'nw' | 'ne' | 'se' | 'sw' | 'n' | 'e' | 's' | 'w'> = [
      'nw', 'ne', 'se', 'sw', 'n', 'e', 's', 'w'
    ];

    for (const key of order) {
      const p = latLonToScreen(handles[key].lat, handles[key].lon, rect);
      const dist = Math.hypot(clientX - p.x, clientY - p.y);
      if (dist <= (key.length === 1 ? 8 : 10)) return key;
    }

    return null;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!world || !activeStickerTool || !containerRef.current) return;
    if (!hasShape) {
      spawnShapeAt(e.clientX, e.clientY);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const edgeIndex = findNearestEdgeMidpointScreen(e.clientX, e.clientY, polygon, rect, 10);
    if (edgeIndex != null) {
      setPolygon((prev) => insertMidpoint(prev, edgeIndex));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current || !hasShape) return;
    const rect = containerRef.current.getBoundingClientRect();

    const scaleHandle = findScaleHandle(e.clientX, e.clientY);
    if (scaleHandle) {
      setDragMode({
        kind: 'scale',
        handle: scaleHandle,
        start: screenToLatLon(e.clientX, e.clientY, rect),
        original: polygon,
        center: getPolygonCentroid(polygon),
      });
      return;
    }

    const handles = getBoundingHandlePoints(polygon);
    const centerScreen = latLonToScreen(handles.center.lat, handles.center.lon, rect);
    const centerDist = Math.hypot(e.clientX - centerScreen.x, e.clientY - centerScreen.y);
    if (centerDist <= 12) {
      setDragMode({
        kind: 'move',
        start: screenToLatLon(e.clientX, e.clientY, rect),
        original: polygon,
      });
      return;
    }

    const vertexIndex = findNearestVertexScreen(e.clientX, e.clientY, polygon, rect, 14);
    if (vertexIndex != null) {
      setDragMode({ kind: 'vertex', index: vertexIndex });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current || !dragMode) return;
    const rect = containerRef.current.getBoundingClientRect();
    const latLon = screenToLatLon(e.clientX, e.clientY, rect);

    if (dragMode.kind === 'vertex') {
      setPolygon((prev) => {
        const next = prev.slice();
        next[dragMode.index] = latLon;
        return next;
      });
      return;
    }

    if (dragMode.kind === 'move') {
      const deltaLat = latLon.lat - dragMode.start.lat;
      const deltaLon = latLon.lon - dragMode.start.lon;
      setPolygon(movePolygon(dragMode.original, deltaLat, deltaLon));
      return;
    }

    if (dragMode.kind === 'scale') {
      const startDx = dragMode.start.lon - dragMode.center.lon;
      const startDy = dragMode.start.lat - dragMode.center.lat;
      const curDx = latLon.lon - dragMode.center.lon;
      const curDy = latLon.lat - dragMode.center.lat;

      const sx = Math.abs(startDx) < 0.001 ? 1 : Math.max(0.15, Math.abs(curDx / startDx));
      const sy = Math.abs(startDy) < 0.001 ? 1 : Math.max(0.15, Math.abs(curDy / startDy));

      let scaleX = sx;
      let scaleY = sy;

      if (dragMode.handle === 'n' || dragMode.handle === 's') scaleX = 1;
      if (dragMode.handle === 'e' || dragMode.handle === 'w') scaleY = 1;

      setPolygon(scalePolygonFromCenter(dragMode.original, dragMode.center, scaleX, scaleY));
    }
  };

  const handleMouseUp = () => {
    setDragMode(null);
  };

  const handleApply = () => {
    if (!world || !activeStickerTool || polygon.length < 3) return;

    const stickerId = `sticker_${createRandomIdentity()}`;
    let payload: any = {};

    if (activeStickerTool === 'BIOME') {
      payload.biomeId = selectedBiomeId;

      const center = getPolygonCentroid(polygon);
      const gridRow = Math.floor(((90 - center.lat) / 180) * world.gridHeight);
      const gridCol = Math.floor(((center.lon + 180) / 360) * world.gridWidth);
      const cellIdx = gridRow * world.gridWidth + gridCol;

      if (world.cells[cellIdx]) {
        const cell = world.cells[cellIdx];
        const validation = validateBiomePlacement(
          payload.biomeId,
          cell.temperature,
          cell.rainfall
        );

        setPendingSticker({
          stickerId,
          payload,
          validation,
          temperature: cell.temperature,
          rainfall: cell.rainfall,
        });
        setShowValidation(true);
        return;
      }
    } else if (activeStickerTool === 'CULTURE') {
      payload.cultureId = 'culture_0';
    } else if (activeStickerTool === 'HEIGHT') {
      payload.heightDelta = 0.3;
    }

    const sticker = createSticker(
      stickerId,
      activeStickerTool,
      polygon,
      selectedMode,
      payload,
      selectedFalloff
    );

    applyStickerToWorld(world, sticker);
    setPolygon([]);
    onStickerCreated?.(world);
  };

  const resetAndCancel = () => {
    setPolygon([]);
    setDragMode(null);
    setPendingSticker(null);
    setShowValidation(false);
    onCancel?.();
  };

  if (!activeStickerTool) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1000,
        cursor: dragMode ? 'grabbing' : 'crosshair',
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(8,10,16,0.93)',
          color: 'rgba(255,255,255,0.96)',
          padding: '14px 16px',
          borderRadius: 10,
          fontSize: 12,
          zIndex: 1001,
          width: 360,
          border: '1px solid rgba(110,210,255,0.28)',
          boxShadow: '0 14px 28px rgba(0,0,0,0.28)',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 8, color: 'rgba(110,210,255,0.98)' }}>
          {getStickerTitle(activeStickerTool)}
        </div>

        <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 6 }}>Primitive</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {PRIMITIVE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPrimitive(option.id)}
              style={{
                padding: '7px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.14)',
                background:
                  selectedPrimitive === option.id
                    ? 'rgba(110,210,255,0.16)'
                    : 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.96)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {!hasShape ? (
          <div style={{ opacity: 0.86, lineHeight: 1.5, marginBottom: 12 }}>
            Click once on the map to spawn a {selectedPrimitive}. Then drag the selection handles to resize,
            drag red points to reshape, or drag the green center handle to move it.
          </div>
        ) : (
          <div style={{ opacity: 0.86, lineHeight: 1.5, marginBottom: 12 }}>
            Selected shape is active. Resize with the white handles, refine using edge/vertex handles, then apply.
          </div>
        )}

        {activeStickerTool === 'BIOME' && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, opacity: 0.78, marginBottom: 6 }}>Biome</div>
            <select
              value={selectedBiomeId}
              onChange={(e) => setSelectedBiomeId(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.96)',
              }}
            >
              {BIOME_OPTIONS.map((option) => (
                <option key={option.id} value={option.id} style={{ color: '#111' }}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.78, marginBottom: 6 }}>Mode</div>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value as 'WORLD_RULES' | 'OVERRIDE')}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.96)',
              }}
            >
              <option value="WORLD_RULES" style={{ color: '#111' }}>World-Rules</option>
              <option value="OVERRIDE" style={{ color: '#111' }}>Override</option>
            </select>
          </div>

          <div>
            <div style={{ fontSize: 11, opacity: 0.78, marginBottom: 6 }}>
              Falloff: {selectedFalloff.toFixed(2)}
            </div>
            <input
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={selectedFalloff}
              onChange={(e) => setSelectedFalloff(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ fontSize: 11, opacity: 0.68, marginBottom: 12 }}>
          Points: {polygon.length}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={resetAndCancel}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(255,110,110,0.28)',
              background: 'rgba(255,110,110,0.10)',
              color: 'rgba(255,170,170,0.98)',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Cancel
          </button>

          {hasShape && (
            <button
              onClick={() => setPolygon([])}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,220,110,0.28)',
                background: 'rgba(255,220,110,0.10)',
                color: 'rgba(255,240,170,0.98)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              Reset Shape
            </button>
          )}

          <button
            onClick={handleApply}
            disabled={!hasShape}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(110,220,150,0.28)',
              background: hasShape ? 'rgba(110,220,150,0.12)' : 'rgba(255,255,255,0.05)',
              color: hasShape ? 'rgba(180,255,205,0.98)' : 'rgba(255,255,255,0.45)',
              cursor: hasShape ? 'pointer' : 'not-allowed',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Apply Sticker
          </button>
        </div>
      </div>

      {showValidation && pendingSticker && activeStickerTool === 'BIOME' && (
        <BiomeValidationModal
          biomeType="Biome"
          temperature={pendingSticker.temperature}
          rainfall={pendingSticker.rainfall}
          warnings={pendingSticker.validation.warnings}
          onApply={() => {
            const sticker = createSticker(
              pendingSticker.stickerId,
              activeStickerTool,
              polygon,
              selectedMode,
              pendingSticker.payload,
              selectedFalloff
            );
            if (world) {
              applyStickerToWorld(world, sticker);
              setPolygon([]);
              setPendingSticker(null);
              setShowValidation(false);
              onStickerCreated?.(world);
            }
          }}
          onCancel={() => {
            setPendingSticker(null);
            setShowValidation(false);
          }}
        />
      )}
    </div>
  );
}
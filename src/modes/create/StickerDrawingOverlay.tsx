// ========================================================
// WORLDWRIGHT -- STICKER DRAWING OVERLAY (V1.3 FIXED)
// File: src/modes/create/StickerDrawingOverlay.tsx
//
// Canvas overlay for polygon drawing and sticker creation.
// Fixed: Properly applies stickers to world.
// ========================================================

import React, { useEffect, useRef, useState } from 'react';
import type { WorldBrain } from '../../core/worldSchema';
import { screenToLatLon, latLonToScreen, findNearestVertex, applyStickerToWorld, createSticker } from './StickerPolygonEditor';
import BiomeValidationModal, { validateBiomePlacement } from './BiomeValidationModal';

type Props = {
  world: WorldBrain | null;
  activeStickerTool?: 'BIOME' | 'CULTURE' | 'HEIGHT' | null;
  onStickerCreated?: (world: WorldBrain) => void;
  onCancel?: () => void;
};

export default function StickerDrawingOverlay({
  world,
  activeStickerTool,
  onStickerCreated,
  onCancel,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPolygon, setCurrentPolygon] = useState<Array<{ lat: number; lon: number }>>([]);
  const [draggedVertex, setDraggedVertex] = useState<number | null>(null);
  const [pendingSticker, setPendingSticker] = useState<any>(null);
  const [showValidation, setShowValidation] = useState(false);

  // Redraw canvas when polygon changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw background
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw polygon
    if (currentPolygon.length > 0) {
      // Draw lines
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.8)';
      ctx.fillStyle = 'rgba(100, 200, 255, 0.15)';
      ctx.lineWidth = 3;

      ctx.beginPath();
      const firstPt = currentPolygon[0];
      const firstScreen = latLonToScreen(firstPt.lat, firstPt.lon, rect);
      ctx.moveTo(firstScreen.x - rect.left, firstScreen.y - rect.top);

      for (let i = 1; i < currentPolygon.length; i++) {
        const pt = currentPolygon[i];
        const screenPt = latLonToScreen(pt.lat, pt.lon, rect);
        ctx.lineTo(screenPt.x - rect.left, screenPt.y - rect.top);
      }

      // Close polygon if it has 3+ points
      if (currentPolygon.length > 2) {
        ctx.lineTo(firstScreen.x - rect.left, firstScreen.y - rect.top);
      }

      ctx.fill();
      ctx.stroke();

      // Draw vertices
      for (let i = 0; i < currentPolygon.length; i++) {
        const pt = currentPolygon[i];
        const screenPt = latLonToScreen(pt.lat, pt.lon, rect);
        
        // First vertex = close point (green)
        ctx.fillStyle = i === 0 ? 'rgba(100, 255, 100, 0.95)' : 'rgba(255, 100, 100, 0.95)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(screenPt.x - rect.left, screenPt.y - rect.top, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [currentPolygon]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!world || !activeStickerTool || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const latLon = screenToLatLon(e.clientX, e.clientY, rect, world.gridWidth, world.gridHeight);

    // Check if clicking on first vertex to close polygon
    if (currentPolygon.length >= 3) {
      const vertexIdx = findNearestVertex(latLon, currentPolygon, 8.0);
      if (vertexIdx === 0) {
        // Complete polygon and prepare sticker
        const stickerId = `sticker_${Date.now()}`;
        let payload: any = {};
        
        if (activeStickerTool === 'BIOME') {
          payload.biomeId = 5; // Example biome
          
          // Calculate average climate in the region for validation
          const centerLat = currentPolygon.reduce((s, p) => s + p.lat, 0) / currentPolygon.length;
          const centerLon = currentPolygon.reduce((s, p) => s + p.lon, 0) / currentPolygon.length;
          
          // Convert lat/lon to grid indices
          const gridRow = Math.floor(((90 - centerLat) / 180) * (world?.gridHeight || 128));
          const gridCol = Math.floor(((centerLon + 180) / 360) * (world?.gridWidth || 256));
          const cellIdx = gridRow * (world?.gridWidth || 256) + gridCol;
          
          if (world && world.cells[cellIdx]) {
            const cell = world.cells[cellIdx];
            const validation = validateBiomePlacement(payload.biomeId, cell.temperature, cell.rainfall);
            
            // Store pending sticker and show validation modal
            setPendingSticker({
              stickerId,
              payload,
              temperature: cell.temperature,
              rainfall: cell.rainfall,
              validation,
            });
            setShowValidation(true);
            return;
          }
        } else if (activeStickerTool === 'CULTURE') {
          payload.cultureId = 'culture_0';
        } else if (activeStickerTool === 'HEIGHT') {
          payload.heightDelta = 0.3;
        }
        
        const sticker = createSticker(stickerId, activeStickerTool, currentPolygon, 'OVERRIDE', payload);
        
        // Apply sticker to world properly via mutation then notify
        if (world) {
          applyStickerToWorld(world, sticker);
          // Trigger worldSession update to ensure rendering
          onStickerCreated?.(world);
        }
        
        // Reset
        setCurrentPolygon([]);
        return;
      }
    }

    // Add vertex
    setCurrentPolygon([...currentPolygon, latLon]);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedVertex === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const latLon = screenToLatLon(e.clientX, e.clientY, rect, world?.gridWidth || 256, world?.gridHeight || 128);
    
    const newPolygon = [...currentPolygon];
    newPolygon[draggedVertex] = latLon;
    setCurrentPolygon(newPolygon);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const latLon = screenToLatLon(e.clientX, e.clientY, rect, world?.gridWidth || 256, world?.gridHeight || 128);

    const vertexIdx = findNearestVertex(latLon, currentPolygon, 8.0);
    if (vertexIdx !== null) {
      setDraggedVertex(vertexIdx);
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggedVertex(null);
  };

  if (!activeStickerTool) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1000,
        cursor: 'crosshair',
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseDown={handleCanvasMouseDown}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
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
          background: 'rgba(0,0,0,0.85)',
          color: 'rgba(255,255,255,0.95)',
          padding: '14px 16px',
          borderRadius: 8,
          fontSize: 12,
          zIndex: 1001,
          maxWidth: 320,
          border: '1px solid rgba(100,200,255,0.3)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8, color: 'rgba(100,200,255,0.95)' }}>
          {activeStickerTool === 'BIOME' && '🌍 Biome Sticker'}
          {activeStickerTool === 'CULTURE' && '👥 Culture Zone'}
          {activeStickerTool === 'HEIGHT' && '⛏️ Terrain Sticker'}
        </div>
        <div style={{ opacity: 0.85, marginBottom: 10, lineHeight: 1.5 }}>
          Click to place vertices. Close polygon by clicking first vertex (green dot).
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 10 }}>
          Vertices: {currentPolygon.length}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              setCurrentPolygon([]);
              onCancel?.();
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid rgba(255,100,100,0.3)',
              background: 'rgba(255,100,100,0.1)',
              color: 'rgba(255,150,150,0.95)',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          {currentPolygon.length > 0 && (
            <button
              onClick={() => {
                setCurrentPolygon(currentPolygon.slice(0, -1));
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid rgba(200,200,100,0.3)',
                background: 'rgba(200,200,100,0.1)',
                color: 'rgba(255,255,150,0.95)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Undo Vertex
            </button>
          )}
        </div>
      </div>

      {/* Biome validation modal */}
      {showValidation && pendingSticker && (
        <BiomeValidationModal
          biomeType={activeStickerTool === 'BIOME' ? 'Biome' : activeStickerTool || ''}
          temperature={pendingSticker.temperature}
          rainfall={pendingSticker.rainfall}
          warnings={pendingSticker.validation.warnings}
          onApply={() => {
            const sticker = createSticker(
              pendingSticker.stickerId,
              activeStickerTool,
              currentPolygon,
              'OVERRIDE',
              pendingSticker.payload
            );
            if (world) {
              applyStickerToWorld(world, sticker);
              setCurrentPolygon([]);
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

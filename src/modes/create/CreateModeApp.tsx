// src/modes/create/CreateModeApp.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../../ui/AppShell';
import { worldSession } from '../../core/worldSession';
import { makePlanetPreviewFromWorldBrain } from '../../core/planetRenderer';
import { WorldAction, TerrainStrokeAction } from '../../core/worldActions';

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams();

  // Load world by ID when component mounts
  useEffect(() => {
    if (worldId) worldSession.loadWorld(worldId);
  }, [worldId]);

  // Subscribe to world changes
  const [world, setWorld] = useState(worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  // Build preview from current world
  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  // Example: apply a terrain raise stroke at center of grid
  const handleRaiseCenter = () => {
    if (!world) return;
    const action: TerrainStrokeAction = {
      type: 'TERRAIN_STROKE',
      tool: 'RAISE',
      center: { row: world.gridHeight / 2, col: world.gridWidth / 2 },
      radius: Math.min(world.gridWidth, world.gridHeight) / 8,
      strength: 0.5,
    };
    worldSession.apply(action);
  };

  const handleSave = async () => {
    const id = await worldSession.save();
    if (id) navigate(`/create/${id}`);
  };

  if (!world) {
    return (
      <AppShell
        mode="create"
        title="Create"
        rightPanel={<div style={{ padding: 12 }}>Loading…</div>}
      />
    );
  }

  return (
    <AppShell
      mode="create"
      title="Create"
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12 }}>
          {/* Example UI: raise terrain button, save, undo, redo */}
          <button onClick={handleRaiseCenter}>Raise Center</button>
          <button onClick={() => worldSession.undo()}>Undo</button>
          <button onClick={() => worldSession.redo()}>Redo</button>
          <button onClick={handleSave}>Save</button>
        </div>
      }
    />
  );
}
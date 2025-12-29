// src/modes/sim/SimModeApp.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../../ui/AppShell';
import { worldSession } from '../../core/worldSession';
import { makePlanetPreviewFromWorldBrain } from '../../core/planetRenderer';

export default function SimModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  // Load the world once when the component mounts
  useEffect(() => {
    if (worldId) worldSession.loadWorld(worldId);
  }, [worldId]);

  // Subscribe to world updates
  const [world, setWorld] = useState(worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  // Build a preview from the current world
  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  // Simulation state
  const [running, setRunning] = useState(false);
  const [tickSpeed, setTickSpeed] = useState(250);

  // Run simulation ticks when running is true
  useEffect(() => {
    let timer: number | null = null;
    if (running) {
      timer = window.setInterval(() => {
        worldSession.simulateTick();
      }, Math.max(50, tickSpeed));
    }
    return () => {
      if (timer !== null) window.clearInterval(timer);
    };
  }, [running, tickSpeed]);

  const handleStep = () => {
    worldSession.simulateTick();
  };

  const handleSave = async () => {
    const id = await worldSession.save();
    if (id) navigate(`/create/${id}`);
  };

  if (!world) {
    return (
      <AppShell
        mode="sim"
        title="Sim"
        rightPanel={<div style={{ padding: 12 }}>Loading…</div>}
      />
    );
  }

  return (
    <AppShell
      mode="sim"
      title="Sim"
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 'bold' }}>Simulation Controls</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setRunning((v) => !v)} style={{ flex: 1 }}>
              {running ? 'Pause' : 'Run'}
            </button>
            <button onClick={handleStep} disabled={running} style={{ flex: 1 }}>
              Step
            </button>
          </div>
          <div>
            Tick Speed (ms):
            <input
              type="number"
              min={50}
              value={tickSpeed}
              onChange={(e) => setTickSpeed(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={handleSave} style={{ padding: 8 }}>
            Save
          </button>
        </div>
      }
    />
  );
}
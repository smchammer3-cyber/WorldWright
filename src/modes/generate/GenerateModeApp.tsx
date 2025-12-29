// src/modes/generate/GenerateModeApp.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../ui/AppShell';
import { GeneratorParams, generateWorldFromParams } from '../../core/worldGenerator';
import { worldSession } from '../../core/worldSession';
import { makePlanetPreviewFromWorldBrain } from '../../core/planetRenderer';

export default function GenerateModeApp() {
  const navigate = useNavigate();

  // UI state only (generator knobs)
  const [params, setParams] = useState<GeneratorParams>(() => ({
    width: 256,
    height: 128,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 45,
    planetAge: 50,
    climateVar: 35,
    seed: Math.floor(Math.random() * 1e9),
    styleMode: 'EARTHLIKE',
  }));

  const updateParam = (key: keyof GeneratorParams, value: number | string) => {
    setParams((p) => ({ ...p, [key]: value }));
  };

  // Whenever params change, create a new world in session
  useEffect(() => {
    worldSession.createWorld(params);
  }, [
    params.width,
    params.height,
    params.seaLevel,
    params.plateActivity,
    params.axisTilt,
    params.planetAge,
    params.climateVar,
    params.seed,
    params.styleMode,
  ]);

  // Subscribe to session world updates
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

  // Save and navigate to create mode
  const handleSave = async () => {
    const id = await worldSession.save();
    if (id) navigate(`/create/${id}`);
  };

  return (
    <AppShell
      mode="generate"
      title="Generate"
      // Left tool UI omitted for brevity: adjust according to your existing controls
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12 }}>
          {/* ...existing parameter sliders here... */}
          <button onClick={handleSave}>Save &amp; Open Create</button>
        </div>
      }
    />
  );
}
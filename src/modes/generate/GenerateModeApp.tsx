// src/modes/generate/GenerateModeApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../../ui/AppShell";
import { GeneratorParams } from "../../core/worldGenerator";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

function SliderRow(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  const { label, value, min, max, step = 1, onChange } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.85 }}>
        {label}: {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
}

export default function GenerateModeApp() {
  const navigate = useNavigate();

  const [params, setParams] = useState<GeneratorParams>(() => ({
    width: 256,
    height: 128,
    seaLevel: 50,
    plateActivity: 50,
    axisTilt: 45,
    planetAge: 50,
    climateVar: 35,
    seed: Math.floor(Math.random() * 1e9),
    styleMode: "EARTHLIKE",
  }));

  const updateNumber = (key: keyof GeneratorParams, v: number) => {
    setParams((p) => ({ ...p, [key]: v } as GeneratorParams));
  };

  // Generate into session whenever params change
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

  const [world, setWorld] = useState(worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const handleSave = async () => {
    const id = await worldSession.save();
    if (id) navigate(`/create/${id}`);
  };

  return (
    <AppShell
      mode="generate"
      title="Generate"
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 14 }}>
          <SliderRow label="Width" value={params.width} min={64} max={1024} step={32} onChange={(v) => updateNumber("width", v)} />
          <SliderRow label="Height" value={params.height} min={32} max={512} step={16} onChange={(v) => updateNumber("height", v)} />
          <SliderRow label="Sea Level" value={params.seaLevel} min={0} max={100} step={1} onChange={(v) => updateNumber("seaLevel", v)} />
          <SliderRow label="Plate Activity" value={params.plateActivity} min={0} max={100} step={1} onChange={(v) => updateNumber("plateActivity", v)} />
          <SliderRow label="Axis Tilt" value={params.axisTilt} min={0} max={100} step={1} onChange={(v) => updateNumber("axisTilt", v)} />
          <SliderRow label="Planet Age" value={params.planetAge} min={0} max={100} step={1} onChange={(v) => updateNumber("planetAge", v)} />
          <SliderRow label="Climate Var" value={params.climateVar} min={0} max={100} step={1} onChange={(v) => updateNumber("climateVar", v)} />

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.85 }}>Seed</div>
            <input
              type="number"
              value={params.seed}
              onChange={(e) => updateNumber("seed", parseInt(e.target.value, 10) || 0)}
              style={{ padding: 10, borderRadius: 10, fontWeight: 800 }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.85 }}>Style Mode</div>
            <select
              value={params.styleMode}
              onChange={(e) => setParams((p) => ({ ...p, styleMode: e.target.value as any }))}
              style={{ padding: 10, borderRadius: 10, fontWeight: 900 }}
            >
              <option value="EARTHLIKE">EARTHLIKE</option>
              <option value="FANTASY">FANTASY</option>
              <option value="STYLIZED">STYLIZED</option>
              <option value="ALIEN">ALIEN</option>
            </select>
          </div>

          <button onClick={handleSave} style={{ padding: "12px 12px", borderRadius: 12, fontWeight: 950 }}>
            Save &amp; Open Create
          </button>
        </div>
      }
    />
  );
}
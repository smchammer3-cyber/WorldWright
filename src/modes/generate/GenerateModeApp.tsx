// ========================================================
// WORLDWRIGHT -- GENERATE MODE (V1.3)
// File: src/modes/generate/GenerateModeApp.tsx
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { generateWorldFromParams, GeneratorParams } from "../../core/worldGenerator";
import { saveWorld } from "../../core/worldStorage";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function GenerateModeApp() {
  const nav = useNavigate();

  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const [name, setName] = useState("New World");

  const [gridWidth, setGridWidth] = useState(256);
  const [gridHeight, setGridHeight] = useState(128);

  const [oceanCoverage, setOceanCoverage] = useState(0.55);
  const [plateActivity, setPlateActivity] = useState(0.55);
  const [axialTilt, setAxialTilt] = useState(23);
  const [planetAge, setPlanetAge] = useState(0.55);
  const [temperatureBias, setTemperatureBias] = useState(0.5);
  const [humidityBias, setHumidityBias] = useState(0.55);

  const [styleMode, setStyleMode] = useState<GeneratorParams["styleMode"]>("EARTHLIKE");

  const params: GeneratorParams = useMemo(() => ({
    seed,
    gridWidth: Math.floor(clamp(gridWidth, 32, 512)),
    gridHeight: Math.floor(clamp(gridHeight, 32, 512)),
    oceanCoverage: clamp(oceanCoverage, 0.05, 0.95),
    plateActivity: clamp(plateActivity, 0, 1),
    axialTilt: clamp(axialTilt, 0, 60),
    planetAge: clamp(planetAge, 0, 1),
    temperatureBias: clamp(temperatureBias, 0, 1),
    humidityBias: clamp(humidityBias, 0, 1),
    styleMode,
  }), [
    seed, gridWidth, gridHeight, oceanCoverage, plateActivity, axialTilt,
    planetAge, temperatureBias, humidityBias, styleMode,
  ]);

  const [world, setWorld] = useState(() => generateWorldFromParams(params));
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const w = generateWorldFromParams(params);
    w.metadata.name = name;
    setWorld(w);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.seed, params.gridWidth, params.gridHeight, params.oceanCoverage, params.plateActivity, params.axialTilt, params.planetAge, params.temperatureBias, params.humidityBias, params.styleMode]);

  useEffect(() => {
    setWorld((prev) => {
      const n = structuredClone(prev);
      n.metadata.name = name;
      return n;
    });
  }, [name]);

  const preview = useMemo(() => makePlanetPreviewFromWorldBrain(world), [world]);

  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 1e9));

  const saveAndOpen = async () => {
    setSaveError(null);
    setSaving(true);
    try {
      const w = structuredClone(world);
      w.metadata.name = name;
      const id = await saveWorld(w);
      nav(`/create/${id}`);
    } catch (e: any) {
      setSaveError(e?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell
      mode="generate"
      title="Generate"
      leftTools={[
        { id: "seed", label: "Seed" },
        { id: "size", label: "Size" },
        { id: "ocean", label: "Ocean" },
        { id: "plates", label: "Plates" },
        { id: "climate", label: "Climate" },
        { id: "style", label: "Style" },
      ]}
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>World Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 10 }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Seed</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={seed} onChange={(e) => setSeed(Math.floor(Number(e.target.value) || 0))} style={{ flex: 1, padding: 8, borderRadius: 10 }} />
              <button onClick={randomizeSeed} style={{ padding: "8px 10px", borderRadius: 10, fontWeight: 800 }}>Random</button>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Grid (W×H)</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="number" value={gridWidth} min={32} max={512} step={16} onChange={(e) => setGridWidth(Number(e.target.value))} style={{ flex: 1, padding: 8, borderRadius: 10 }} />
              <input type="number" value={gridHeight} min={32} max={512} step={16} onChange={(e) => setGridHeight(Number(e.target.value))} style={{ flex: 1, padding: 8, borderRadius: 10 }} />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Ocean Coverage: {oceanCoverage.toFixed(2)}</div>
            <input type="range" min={0.05} max={0.95} step={0.01} value={oceanCoverage} onChange={(e) => setOceanCoverage(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Plate Activity: {plateActivity.toFixed(2)}</div>
            <input type="range" min={0} max={1} step={0.01} value={plateActivity} onChange={(e) => setPlateActivity(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Axial Tilt: {axialTilt.toFixed(0)}°</div>
            <input type="range" min={0} max={60} step={1} value={axialTilt} onChange={(e) => setAxialTilt(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Planet Age: {planetAge.toFixed(2)}</div>
            <input type="range" min={0} max={1} step={0.01} value={planetAge} onChange={(e) => setPlanetAge(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Temperature Bias: {temperatureBias.toFixed(2)}</div>
            <input type="range" min={0} max={1} step={0.01} value={temperatureBias} onChange={(e) => setTemperatureBias(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Humidity Bias: {humidityBias.toFixed(2)}</div>
            <input type="range" min={0} max={1} step={0.01} value={humidityBias} onChange={(e) => setHumidityBias(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Style</div>
            <select value={styleMode} onChange={(e) => setStyleMode(e.target.value as any)} style={{ width: "100%", padding: 8, borderRadius: 10 }}>
              <option value="EARTHLIKE">Earthlike</option>
              <option value="FANTASY">Fantasy</option>
              <option value="STYLIZED">Stylized</option>
              <option value="ALIEN">Alien</option>
            </select>
          </div>

          <button onClick={saveAndOpen} disabled={saving} style={{ padding: 12, borderRadius: 12, fontWeight: 900 }}>
            {saving ? "Saving…" : "Save & Open Create"}
          </button>

          {saveError ? <div style={{ color: "#c33", fontSize: 13 }}>{saveError}</div> : null}
        </div>
      }
    />
  );
}
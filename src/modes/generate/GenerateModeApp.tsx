// ========================================================
// JARVIS CHANGE HEADER -- GENERATE MODE PARAM ALIGNMENT (V1.3)
// File: src/modes/generate/GenerateModeApp.tsx
//
// Fixes:
// - UI sliders now map 1:1 to GeneratorParams used by generateWorldFromParams().
// - Preview uses makePlanetPreviewFromWorldBrain(world).
// - saveWorld() return value treated as string id.
// - No archive usage; blueprint-aligned generate flow.
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

function int(v: number) {
  return Math.round(v);
}

export function GenerateModeApp() {
  const nav = useNavigate();

  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1e9));

  // "Safe knobs" (V1.3 starter set)
  const [gridWidth, setGridWidth] = useState(128);
  const [gridHeight, setGridHeight] = useState(128);

  const [oceanCoverage, setOceanCoverage] = useState(0.55); // higher = more water
  const [plateActivity, setPlateActivity] = useState(0.55);
  const [axialTilt, setAxialTilt] = useState(23);
  const [planetAge, setPlanetAge] = useState(0.55);

  const [temperatureBias, setTemperatureBias] = useState(0.5);
  const [humidityBias, setHumidityBias] = useState(0.55);

  const [styleMode, setStyleMode] = useState<GeneratorParams["styleMode"]>("EARTHLIKE");

  const [worldName, setWorldName] = useState("New World");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const params: GeneratorParams = useMemo(
    () => ({
      seed,
      gridWidth: int(gridWidth),
      gridHeight: int(gridHeight),
      oceanCoverage: clamp(oceanCoverage, 0.05, 0.95),
      plateActivity: clamp(plateActivity, 0, 1),
      axialTilt: clamp(axialTilt, 0, 60),
      planetAge: clamp(planetAge, 0, 1),
      temperatureBias: clamp(temperatureBias, 0, 1),
      humidityBias: clamp(humidityBias, 0, 1),
      styleMode,
    }),
    [
      seed,
      gridWidth,
      gridHeight,
      oceanCoverage,
      plateActivity,
      axialTilt,
      planetAge,
      temperatureBias,
      humidityBias,
      styleMode,
    ],
  );

  const [world, setWorld] = useState(() => generateWorldFromParams(params));

  // Regenerate world when params change
  useEffect(() => {
    const w = generateWorldFromParams(params);
    w.metadata.name = worldName;
    setWorld(w);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.seed, params.gridWidth, params.gridHeight, params.oceanCoverage, params.plateActivity, params.axialTilt, params.planetAge, params.temperatureBias, params.humidityBias, params.styleMode]);

  // Keep name synced without regenerating
  useEffect(() => {
    setWorld((prev) => {
      const next = structuredClone(prev);
      next.metadata.name = worldName;
      return next;
    });
  }, [worldName]);

  const preview = useMemo(() => makePlanetPreviewFromWorldBrain(world), [world]);

  const handleRandomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 1e9));
  };

  const handleSave = async () => {
    setSaveError(null);
    setIsSaving(true);

    try {
      // ensure name
      const w = structuredClone(world);
      w.metadata.name = worldName;

      const id = await saveWorld(w);
      if (!id) throw new Error("Save failed: no id returned.");

      nav(`/create/${id}`);
    } catch (e: any) {
      setSaveError(e?.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
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
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>World Name</div>
            <input
              value={worldName}
              onChange={(e) => setWorldName(e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 8 }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Seed</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={seed}
                onChange={(e) => setSeed(int(Number(e.target.value || 0)))}
                style={{ flex: 1, padding: 8, borderRadius: 8 }}
              />
              <button onClick={handleRandomizeSeed} style={{ padding: "8px 10px", borderRadius: 8 }}>
                Random
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Grid Size (W×H)
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="number"
                value={gridWidth}
                min={32}
                max={512}
                step={16}
                onChange={(e) => setGridWidth(int(Number(e.target.value)))}
                style={{ flex: 1, padding: 8, borderRadius: 8 }}
              />
              <input
                type="number"
                value={gridHeight}
                min={32}
                max={512}
                step={16}
                onChange={(e) => setGridHeight(int(Number(e.target.value)))}
                style={{ flex: 1, padding: 8, borderRadius: 8 }}
              />
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Ocean Coverage: {oceanCoverage.toFixed(2)}
            </div>
            <input
              type="range"
              min={0.05}
              max={0.95}
              step={0.01}
              value={oceanCoverage}
              onChange={(e) => setOceanCoverage(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ opacity: 0.75, fontSize: 12 }}>
              Higher means more water. Sea level is derived from this.
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Plate Activity: {plateActivity.toFixed(2)}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={plateActivity}
              onChange={(e) => setPlateActivity(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Axial Tilt: {axialTilt.toFixed(0)}°
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={1}
              value={axialTilt}
              onChange={(e) => setAxialTilt(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Planet Age: {planetAge.toFixed(2)}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={planetAge}
              onChange={(e) => setPlanetAge(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Temperature Bias: {temperatureBias.toFixed(2)}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={temperatureBias}
              onChange={(e) => setTemperatureBias(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              Humidity Bias: {humidityBias.toFixed(2)}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={humidityBias}
              onChange={(e) => setHumidityBias(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Style Mode</div>
            <select
              value={styleMode}
              onChange={(e) => setStyleMode(e.target.value as any)}
              style={{ width: "100%", padding: 8, borderRadius: 8 }}
            >
              <option value="EARTHLIKE">Earthlike</option>
              <option value="FANTASY">Fantasy</option>
              <option value="STYLIZED">Stylized</option>
              <option value="ALIEN">Alien</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 700 }}
            >
              {isSaving ? "Saving..." : "Save & Open in Create"}
            </button>
          </div>

          {saveError && (
            <div style={{ color: "#c33", fontSize: 13 }}>
              {saveError}
            </div>
          )}

          <div style={{ opacity: 0.75, fontSize: 12, marginTop: 6 }}>
            Preview Sea Level: {preview.seaLevel.toFixed(3)}
          </div>
        </div>
      }
      // The AppShell is responsible for rendering the globe/minimap using preview callbacks.
      planetPreview={preview}
    />
  );
}

export default GenerateModeApp;
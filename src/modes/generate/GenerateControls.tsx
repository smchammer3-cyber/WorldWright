import React, { useEffect, useMemo, useState } from "react";

import type { GeneratorParams } from "../../core/worldGenerator";

type Props = {
  onGenerate: (params: GeneratorParams) => void;
  onSave: () => void;
  saving: boolean;
  disabled: boolean; // disables Save (world missing)
};

function clampInt(n: number, lo: number, hi: number) {
  const x = Math.round(Number.isFinite(n) ? n : lo);
  return x < lo ? lo : x > hi ? hi : x;
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
      <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.75 }}>{label}</div>
      {children}
    </div>
  );
}

export default function GenerateControls({ onGenerate, onSave, saving, disabled }: Props) {
  const defaults: GeneratorParams = useMemo(
    () => ({
      width: 256,
      height: 128,
      seaLevel: 50,
      plateActivity: 55,
      axisTilt: 23,
      planetAge: 50,
      climateVar: 35,
      seed: Math.floor(Math.random() * 1_000_000_000),
      styleMode: "EARTHLIKE",
    }),
    []
  );

  const [params, setParams] = useState<GeneratorParams>(defaults);

  // Generate once on first mount (so the preview is never empty).
  useEffect(() => {
    onGenerate(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof GeneratorParams>(key: K, value: GeneratorParams[K]) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 12 }}>Generate</div>

      <Row label="Seed">
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={params.seed}
            onChange={(e) => set("seed", clampInt(parseInt(e.target.value || "0", 10), 0, 2_147_483_647))}
            style={{ flex: 1, padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
            inputMode="numeric"
          />
          <button
            onClick={() => set("seed", Math.floor(Math.random() * 1_000_000_000))}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
          >
            Random
          </button>
        </div>
      </Row>

      <Row label="Style Mode">
        <select
          value={params.styleMode}
          onChange={(e) => set("styleMode", e.target.value as any)}
          style={{ padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
        >
          <option value="EARTHLIKE">Earthlike</option>
          <option value="FANTASY">Fantasy</option>
          <option value="STYLIZED">Stylized</option>
          <option value="ALIEN">Alien</option>
        </select>
      </Row>

      <Row label={`Resolution: ${params.width}×${params.height}`}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>Width</div>
            <input
              value={params.width}
              onChange={(e) => set("width", clampInt(parseInt(e.target.value || "0", 10), 64, 1024))}
              style={{ width: "100%", padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
              inputMode="numeric"
            />
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>Height</div>
            <input
              value={params.height}
              onChange={(e) => set("height", clampInt(parseInt(e.target.value || "0", 10), 32, 1024))}
              style={{ width: "100%", padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
              inputMode="numeric"
            />
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.65, marginTop: 6 }}>
          Note: larger resolutions generate slower (CPU preview).
        </div>
      </Row>

      <Row label={`Sea Level (0–100): ${params.seaLevel}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={params.seaLevel}
          onChange={(e) => set("seaLevel", clampInt(parseInt(e.target.value, 10), 0, 100))}
        />
      </Row>

      <Row label={`Plate Activity (0–100): ${params.plateActivity}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={params.plateActivity}
          onChange={(e) => set("plateActivity", clampInt(parseInt(e.target.value, 10), 0, 100))}
        />
      </Row>

      <Row label={`Axis Tilt (0–100): ${params.axisTilt}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={params.axisTilt}
          onChange={(e) => set("axisTilt", clampInt(parseInt(e.target.value, 10), 0, 100))}
        />
      </Row>

      <Row label={`Planet Age (0–100): ${params.planetAge}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={params.planetAge}
          onChange={(e) => set("planetAge", clampInt(parseInt(e.target.value, 10), 0, 100))}
        />
      </Row>

      <Row label={`Climate Variability (0–100): ${params.climateVar}`}>
        <input
          type="range"
          min={0}
          max={100}
          value={params.climateVar}
          onChange={(e) => set("climateVar", clampInt(parseInt(e.target.value, 10), 0, 100))}
        />
      </Row>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={() =>
            onGenerate({
              ...params,
              width: clampInt(params.width, 64, 1024),
              height: clampInt(params.height, 32, 1024),
              seaLevel: clampInt(params.seaLevel, 0, 100),
              plateActivity: clampInt(params.plateActivity, 0, 100),
              axisTilt: clampInt(params.axisTilt, 0, 100),
              planetAge: clampInt(params.planetAge, 0, 100),
              climateVar: clampInt(params.climateVar, 0, 100),
              seed: clampInt(params.seed, 0, 2_147_483_647),
              styleMode: params.styleMode,
            })
          }
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            fontWeight: 900,
          }}
        >
          Generate
        </button>

        <button
          onClick={onSave}
          disabled={disabled || saving}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            fontWeight: 900,
            opacity: disabled || saving ? 0.5 : 1,
            cursor: disabled || saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving…" : "Save → Create"}
        </button>
      </div>

      <div style={{ fontSize: 11, opacity: 0.65, marginTop: 10, lineHeight: 1.35 }}>
        Seed + parameters determine the generated world. After Save, Create opens the saved snapshot.
      </div>
    </div>
  );
}
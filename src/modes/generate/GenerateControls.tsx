import React, { useEffect, useMemo, useRef, useState } from "react";

import { createDefaultGeneratorParams, type GeneratorParams } from "../../core/worldGenerator";

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

function normalizeWidthToHeight(width: number): { width: number; height: number } {
  const safeWidth = clampInt(width, 64, 1024);
  const safeHeight = Math.floor(safeWidth / 2);
  return { width: safeWidth, height: safeHeight };
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
  const defaults: GeneratorParams = useMemo(() => {
    const base = createDefaultGeneratorParams();
    const resolution = normalizeWidthToHeight(base.width);

    return {
      ...base,
      width: resolution.width,
      height: resolution.height,
    };
  }, []);

  const [params, setParams] = useState<GeneratorParams>(defaults);
  const didSkipInitialRealtimeGenerate = useRef(false);

  // Generate once on first mount (so the preview is never empty).
  useEffect(() => {
    onGenerate(buildClampedParams(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real-time updates: regenerate world only after the user stops changing parameters.
  // This keeps sliders responsive and avoids repeatedly running the whole generator
  // plus preview/diagnostic work while a range input is still moving.
  useEffect(() => {
    if (!didSkipInitialRealtimeGenerate.current) {
      didSkipInitialRealtimeGenerate.current = true;
      return;
    }

    const timer = setTimeout(() => {
      onGenerate(buildClampedParams(params));
    }, 650);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function set<K extends keyof GeneratorParams>(key: K, value: GeneratorParams[K]) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  function setWidthAndDerivedHeight(widthValue: number) {
    const resolution = normalizeWidthToHeight(widthValue);
    setParams((p) => ({
      ...p,
      width: resolution.width,
      height: resolution.height,
    }));
  }

  function buildClampedParams(p: GeneratorParams): GeneratorParams {
    const resolution = normalizeWidthToHeight(p.width);

    return {
      ...p,
      width: resolution.width,
      height: resolution.height,
      seaLevel: clampInt(p.seaLevel, 0, 100),
      plateActivity: clampInt(p.plateActivity, 0, 100),
      axisTilt: clampInt(p.axisTilt, 0, 100),
      planetAge: clampInt(p.planetAge, 0, 100),
      climateVar: clampInt(p.climateVar, 0, 100),
      moistureLevel: clampInt(p.moistureLevel, 0, 100),
      temperatureOffset: clampInt(p.temperatureOffset, -50, 50),
      erosionIntensity: clampInt(p.erosionIntensity, 0, 100),
      continentCount: clampInt(p.continentCount, 1, 12),
      seed: typeof p.seed === "string" ? p.seed : clampInt(p.seed, 0, 2_147_483_647),
      styleMode: p.styleMode,
    };
  }

  function numberFromRange(value: string, min: number, max: number): number {
    return clampInt(parseInt(value, 10), min, max);
  }

  function rangeHandlers<K extends keyof GeneratorParams>(key: K, min: number, max: number) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(key, numberFromRange(e.currentTarget.value, min, max) as GeneratorParams[K]),
    };
  }

  return (
    <div
      style={{ padding: 14 }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 12 }}>Generate</div>

      <Row label="Seed">
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={params.seed}
            onChange={(e) =>
              set("seed", clampInt(parseInt(e.target.value || "0", 10), 0, 2_147_483_647))
            }
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
          style={{ padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)", width: "100%" }}
        >
          <option value="EARTHLIKE">Earthlike</option>
          <option value="FANTASY">Fantasy</option>
          <option value="STYLIZED">Stylized</option>
          <option value="ALIEN">Alien</option>
        </select>
      </Row>

      <Row label={`Resolution: ${params.width}×${params.height}`}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>Width</div>
          <input
            value={params.width}
            onChange={(e) => setWidthAndDerivedHeight(parseInt(e.target.value || "0", 10))}
            style={{ width: "100%", padding: 8, borderRadius: 10, border: "1px solid rgba(0,0,0,0.15)" }}
            inputMode="numeric"
          />
        </div>

        <div
          style={{
            marginTop: 8,
            padding: 8,
            borderRadius: 10,
            background: "rgba(0,0,0,0.04)",
            fontSize: 12,
            opacity: 0.8,
          }}
        >
          Height is automatically derived at 2:1 equirectangular ratio: <strong>{params.height}</strong>
        </div>

        <div style={{ fontSize: 11, opacity: 0.65, marginTop: 6 }}>
          Resolution is locked to a 2:1 world grid to preserve correct equirectangular geometry.
        </div>
      </Row>

      <Row label={`Sea Level (0–100): ${params.seaLevel}`}>
        <input type="range" min={0} max={100} value={params.seaLevel} style={rangeStyle} {...rangeHandlers("seaLevel", 0, 100)} />
      </Row>

      <Row label={`Plate Activity (0–100): ${params.plateActivity}`}>
        <input type="range" min={0} max={100} value={params.plateActivity} style={rangeStyle} {...rangeHandlers("plateActivity", 0, 100)} />
      </Row>

      <Row label={`Axis Tilt (0–100): ${params.axisTilt}`}>
        <input type="range" min={0} max={100} value={params.axisTilt} style={rangeStyle} {...rangeHandlers("axisTilt", 0, 100)} />
      </Row>

      <Row label={`Planet Age (0–100): ${params.planetAge}`}>
        <input type="range" min={0} max={100} value={params.planetAge} style={rangeStyle} {...rangeHandlers("planetAge", 0, 100)} />
      </Row>

      <Row label={`Climate Variability (0–100): ${params.climateVar}`}>
        <input type="range" min={0} max={100} value={params.climateVar} style={rangeStyle} {...rangeHandlers("climateVar", 0, 100)} />
      </Row>

      <Row label={`Moisture Level (0–100): ${params.moistureLevel}`}>
        <input type="range" min={0} max={100} value={params.moistureLevel} style={rangeStyle} {...rangeHandlers("moistureLevel", 0, 100)} />
      </Row>

      <Row label={`Temperature Offset (-50 to +50): ${params.temperatureOffset > 0 ? "+" : ""}${params.temperatureOffset}`}>
        <input type="range" min={-50} max={50} value={params.temperatureOffset} style={rangeStyle} {...rangeHandlers("temperatureOffset", -50, 50)} />
      </Row>

      <Row label={`Erosion Intensity (0–100): ${params.erosionIntensity}`}>
        <input type="range" min={0} max={100} value={params.erosionIntensity} style={rangeStyle} {...rangeHandlers("erosionIntensity", 0, 100)} />
      </Row>

      <Row label={`Continent Count (1–12): ${params.continentCount}`}>
        <input type="range" min={1} max={12} value={params.continentCount} style={rangeStyle} {...rangeHandlers("continentCount", 1, 12)} />
      </Row>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={() => onGenerate(buildClampedParams(params))}
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
        Slider changes regenerate after you pause. Use Generate for an immediate rebuild.
      </div>
    </div>
  );
}

const rangeStyle: React.CSSProperties = {
  width: "100%",
  display: "block",
  cursor: "pointer",
};

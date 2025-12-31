// ========================================================
// WORLDWRIGHT -- CREATE MODE (V1.3 STABILIZE + LAYOUT SPINE)
// File: src/modes/create/CreateModeApp.tsx
//
// Fixes:
// - Correct AppShell import (default export).
// - Await worldSession.loadWorld and show errors (no infinite loading).
// - Add Create view toggle (Globe/Map).
// - Enforce minimap rule: ONLY Create + Globe shows minimap.
// - Provide blueprint tool category scaffold (disabled placeholders for now).
//
// Additional Stability Fix (Critical):
// - Guard canvas preview writes so undefined rgba cannot crash the app.
// - Prevents "Cannot convert undefined or null to object" from Uint8ClampedArray.set.
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell, { ToolGroup, ViewMode } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
<<<<<<< Updated upstream
import Globe3D from "../../render/Globe3D";
import MiniMap from "../../ui/MiniMap";
=======
import Globe3D from "../../render/Globe3D";
import MiniMap from "../../ui/MiniMap";
>>>>>>> Stashed changes

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");

  // Keep world reactive
  const [world, setWorld] = useState(worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  // Load world with await + error handling
  useEffect(() => {
    let alive = true;

    (async () => {
      if (!worldId) {
        if (alive) {
          setError("Missing worldId in route.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      try {
        await worldSession.loadWorld(worldId);
      } catch (e: any) {
        console.error(e);
        if (alive) setError(e?.message || "Failed to load world.");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [worldId]);

  const preview = useMemo(() => {
    // Compute the CPU preview only when a world is loaded. The preview is used
    // for 2D map view and minimap generation. Globe view uses the WebGL
    // renderer instead of this raster texture.
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  async function handleSave() {
    setSaveError(null);
    setSaving(true);
    try {
      await worldSession.save();
    } catch (e: any) {
      console.error(e);
      setSaveError(e?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const toolGroups: ToolGroup[] = [
    {
      id: "terrain",
      title: "Terrain",
      tools: [
        { id: "raise", label: "Raise", disabled: true },
        { id: "lower", label: "Lower", disabled: true },
        { id: "smooth", label: "Smooth", disabled: true },
        { id: "flatten", label: "Flatten", disabled: true },
      ],
    },
    {
      id: "biomes",
      title: "Biomes",
      tools: [
        { id: "paint_biome", label: "Paint Biome", disabled: true },
        { id: "erase_biome", label: "Erase Biome", disabled: true },
      ],
    },
    {
      id: "water",
      title: "Water",
      tools: [
        { id: "river_add", label: "Add River", disabled: true },
        { id: "river_edit", label: "Edit River", disabled: true },
        { id: "lake_add", label: "Add Lake", disabled: true },
      ],
    },
    {
      id: "volcano",
      title: "Volcano",
      tools: [{ id: "add_volcano", label: "Add Volcano", disabled: true }],
    },
    {
      id: "countries",
      title: "Countries & Borders",
      tools: [
        { id: "add_country", label: "Add Country", disabled: true },
        { id: "edit_border", label: "Edit Border", disabled: true },
      ],
    },
    {
      id: "culture",
      title: "Culture",
      tools: [
        { id: "add_settlement", label: "Add Settlement", disabled: true },
        { id: "culture_zone", label: "Culture Zone", disabled: true },
      ],
    },
    {
      id: "cities",
      title: "Cities",
      tools: [{ id: "add_city", label: "Add City", disabled: true }],
    },
  ];

  const rightPanel = (
    <div style={{ padding: 14, color: "rgba(255,255,255,0.88)" }}>
      <h3 style={{ margin: "6px 0 10px 0" }}>Create</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          onClick={handleSave}
          disabled={!world || loading || saving}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            cursor: !world || loading || saving ? "not-allowed" : "pointer",
            opacity: !world || loading || saving ? 0.5 : 1,
          }}
        >
          {saving ? "Saving…" : "Save"}
        </button>

        <button
          onClick={() => navigate(`/sim/${worldId}`)}
          disabled={!worldId}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            cursor: !worldId ? "not-allowed" : "pointer",
            opacity: !worldId ? 0.5 : 1,
          }}
        >
          Go to Sim
        </button>
      </div>

      {saveError && (
        <div
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 10,
            border: "1px solid rgba(255,90,90,0.35)",
            background: "rgba(255,90,90,0.08)",
            color: "rgba(255,255,255,0.92)",
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          <b>Save failed:</b> {saveError}
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.4 }}>
        Tool implementations come after Phase 1 stability. For now these are blueprint-accurate categories.
      </div>
    </div>
  );

  // ---------------------------
  // SAFE preview canvas renderer
  // ---------------------------
  function renderPreviewCanvas(p: any, mode: "main" | "minimap") {
    const w = p?.width;
    const h = p?.height;
    const rgba = p?.rgba;

    // If a raw RGBA buffer exists, use it (compat path)
    if (w && h && rgba && rgba instanceof Uint8ClampedArray) {
      return (
        <canvas
          width={w}
          height={h}
          ref={(c) => {
            if (!c) return;
            const ctx = c.getContext("2d");
            if (!ctx) return;

            try {
              const imgData = ctx.createImageData(w, h);
              imgData.data.set(rgba);
              ctx.putImageData(imgData, 0, 0);
            } catch (e) {
              console.error("Preview render failed:", e);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            imageRendering: "pixelated",
          }}
        />
      );
    }

    // Otherwise, try the PlanetPreview API (colorAt / minimapColorAt / sampleGlobeColor)
    if (w && h && (typeof p.minimapColorAt === 'function' || typeof p.sampleGlobeColor === 'function')) {
      return (
        <canvas
          width={w}
          height={h}
          ref={(c) => {
            if (!c) return;
            const ctx = c.getContext('2d');
            if (!ctx) return;

            try {
              const imgData = ctx.createImageData(w, h);
              const d = imgData.data;
              for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                  const rgbaPixel = mode === 'minimap' && typeof p.minimapColorAt === 'function'
                    ? p.minimapColorAt(x, y)
                    : typeof p.sampleGlobeColor === 'function'
                    ? p.sampleGlobeColor(y * w + x)
                    : p.colorAt(x, y);

                  const idx = (y * w + x) * 4;
                  d[idx + 0] = rgbaPixel[0];
                  d[idx + 1] = rgbaPixel[1];
                  d[idx + 2] = rgbaPixel[2];
                  d[idx + 3] = rgbaPixel[3] ?? 255;
                }
              }
              ctx.putImageData(imgData, 0, 0);
            } catch (e) {
              console.error('Preview render failed (planet API):', e);
            }
          }}
          style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
        />
      );
    }

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 13,
        }}
      >
        {mode === 'main' ? 'Generating preview…' : 'Minimap…'}
      </div>
    );
  }

  // Loading / error states (NO infinite loading)
  if (loading) {
    return (
      <AppShell
        mode="create"
        onGoHome={() => navigate("/")}
        worldName={world?.metadata?.name || "Loading…"}
        isDirty={worldSession.isDirty()}
        onModeToggle={() => navigate(`/sim/${worldId}`)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        rightPanel={rightPanel}
        toolGroups={toolGroups}
      >
        <div style={{ padding: 20, color: "rgba(255,255,255,0.85)" }}>Loading world…</div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell
        mode="create"
        onGoHome={() => navigate("/")}
        worldName="Load Error"
        isDirty={false}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        rightPanel={
          <div style={{ padding: 14, color: "rgba(255,255,255,0.9)" }}>
            <h3 style={{ margin: "6px 0 10px 0" }}>Could not load world</h3>
            <div style={{ opacity: 0.85, marginBottom: 12 }}>{error}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                }}
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate("/generate")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                }}
              >
                Go to Generate
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.92)",
                  cursor: "pointer",
                }}
              >
                Reload
              </button>
            </div>
          </div>
        }
      >
        <div style={{ padding: 20 }} />
      </AppShell>
    );
  }

  // Main viewport + minimap (Create + Globe only)
  const showMinimap = viewMode === "GLOBE";

  return (
    <AppShell
      mode="create"
      onGoHome={() => navigate("/")}
      worldName={world?.metadata?.name || "Create"}
      isDirty={worldSession.isDirty()}
      onModeToggle={() => navigate(`/sim/${worldId}`)}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      rightPanel={rightPanel}
      toolGroups={toolGroups}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Main viewport: Globe (3D) when selected, otherwise CPU preview map */}
        {viewMode === "GLOBE" && world ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Globe3D world={world} preview={preview} />
          </div>
        ) : (
          renderPreviewCanvas(preview, "main")
        )}

        {/* Minimap: only appears in Globe view. Uses the MiniMap component for a safe CPU raster */}
        {world && showMinimap && (
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              width: 220,
              height: 140,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.35)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            }}
            title="Minimap (Create + Globe only)"
          >
            <MiniMap world={world} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
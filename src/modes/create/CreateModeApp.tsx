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

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell, { ToolGroup, ViewMode } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import Globe3D from "../../render/Globe3D";
import MiniMap from "../../ui/MiniMap";
import CreateViewport from "./CreateViewport";
import StickerDrawingOverlay from "./StickerDrawingOverlay";
import { recomputeWorld } from "../../core/worldRecompute";
import { generateCountries } from "../../core/countryGenerator";

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const lastCountryCountRef = useRef<number>(0);

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
  const [activeTerrainTool, setActiveTerrainTool] = useState<'RAISE' | 'LOWER' | 'FLATTEN' | 'SMOOTH' | null>(null);
  const [activeStickerTool, setActiveStickerTool] = useState<'BIOME' | 'CULTURE' | 'HEIGHT' | null>(null);
  const [activeWaterTool, setActiveWaterTool] = useState<'ADD_RIVER' | 'EDIT_RIVER' | 'ADD_LAKE' | null>(null);

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

  // Lightweight toast when countries are (newly) generated
  useEffect(() => {
    const count = world?.countries?.length || 0;
    if (count > 0 && count !== lastCountryCountRef.current) {
      lastCountryCountRef.current = count;
      setToastMessage(`Generated ${count} countries`);
      const t = window.setTimeout(() => setToastMessage(null), 2500);
      return () => window.clearTimeout(t);
    }
  }, [world?.countries]);

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

  const handleWorldChange = (w: any) => {
    worldSession.applyLocalEdit(w);
  };

  const handleGenerateCountries = () => {
    if (!world) return;
    try {
      const countryCount = Math.floor(Math.random() * 4) + 5; // 5-8 countries
      const generatedCountries = generateCountries(world, countryCount);
      
      if (!generatedCountries || generatedCountries.length === 0) {
        console.error('[Generate Countries] No countries generated - check world has land cells');
        alert('Failed to generate countries. Ensure the world has sufficient land mass.');
        return;
      }
      
      // Properly update world with new countries
      const updatedWorld = { ...world, countries: generatedCountries };
      worldSession.applyLocalEdit(updatedWorld);
      
      console.log(`[Generate Countries] Successfully generated ${generatedCountries.length} countries`);
    } catch (error) {
      console.error('[Generate Countries] Error:', error);
      alert(`Failed to generate countries: ${error}`);
    }
  };

  const handleAddCity = () => {
    if (!world) return;
    // Place a city at a random land cell
    const landCells = world.cells.filter((c) => !c.isWater);
    if (landCells.length === 0) return;
    
    const randomCell = landCells[Math.floor(Math.random() * landCells.length)];
    const row = Math.floor(randomCell.index / world.gridWidth);
    const col = randomCell.index % world.gridWidth;
    
    // Determine city type based on location
    let type: 'VILLAGE' | 'TOWN' | 'CITY' | 'METROPOLIS' | 'FORT' | 'PORT' = 'TOWN';
    const nearCoast = landCells.find(c => {
      const idx = c.index;
      const r = Math.floor(idx / world.gridWidth);
      const c1 = idx % world.gridWidth;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = ((c1 + dc) % world.gridWidth + world.gridWidth) % world.gridWidth;
          const nidx = nr * world.gridWidth + nc;
          if (world.cells[nidx]?.isWater) return true;
        }
      }
      return false;
    });
    if (nearCoast) type = 'PORT';
    
    const newCity: any = {
      id: `city_${Date.now()}`,
      name: `City`,
      cellIndex: randomCell.index,
      population: 1000,
      type,
      populationTier: 2,
      isCapital: false,
      economicRoles: ['TRADE'],
      tags: [],
      description: '',
      countryId: world.countries?.[0]?.id,
      cultureId: world.cultures?.[0]?.id,
    };
    
    world.cities = world.cities || [];
    world.cities.push(newCity);
    recomputeWorld(world, ['TERRAIN_EDIT']);
    handleWorldChange(world);
  };

  const toolGroups: ToolGroup[] = [
    {
      id: "terrain",
      title: "Terrain",
      tools: [
        {
          id: "raise",
          label: "Raise",
          disabled: !world,
          active: activeTerrainTool === 'RAISE',
          onClick: () => setActiveTerrainTool(activeTerrainTool === 'RAISE' ? null : 'RAISE'),
        },
        {
          id: "lower",
          label: "Lower",
          disabled: !world,
          active: activeTerrainTool === 'LOWER',
          onClick: () => setActiveTerrainTool(activeTerrainTool === 'LOWER' ? null : 'LOWER'),
        },
        {
          id: "smooth",
          label: "Smooth",
          disabled: !world,
          active: activeTerrainTool === 'SMOOTH',
          onClick: () => setActiveTerrainTool(activeTerrainTool === 'SMOOTH' ? null : 'SMOOTH'),
        },
        {
          id: "flatten",
          label: "Flatten",
          disabled: !world,
          active: activeTerrainTool === 'FLATTEN',
          onClick: () => setActiveTerrainTool(activeTerrainTool === 'FLATTEN' ? null : 'FLATTEN'),
        },
      ],
    },
    {
      id: "biomes",
      title: "Biomes",
      tools: [
        {
          id: "paint_biome",
          label: "Paint Biome",
          disabled: !world,
          active: activeStickerTool === 'BIOME',
          onClick: () => setActiveStickerTool(activeStickerTool === 'BIOME' ? null : 'BIOME'),
        },
        {
          id: "paint_height",
          label: "Raise/Lower",
          disabled: !world,
          active: activeStickerTool === 'HEIGHT',
          onClick: () => setActiveStickerTool(activeStickerTool === 'HEIGHT' ? null : 'HEIGHT'),
        },
      ],
    },
    {
      id: "water",
      title: "Water",
      tools: [
        {
          id: "river_add",
          label: "Add River",
          disabled: !world,
          active: activeWaterTool === 'ADD_RIVER',
          onClick: () => setActiveWaterTool(activeWaterTool === 'ADD_RIVER' ? null : 'ADD_RIVER'),
        },
        {
          id: "river_edit",
          label: "Edit River",
          disabled: !world,
          active: activeWaterTool === 'EDIT_RIVER',
          onClick: () => setActiveWaterTool(activeWaterTool === 'EDIT_RIVER' ? null : 'EDIT_RIVER'),
        },
        {
          id: "lake_add",
          label: "Set Lake Level",
          disabled: !world,
          active: activeWaterTool === 'ADD_LAKE',
          onClick: () => setActiveWaterTool(activeWaterTool === 'ADD_LAKE' ? null : 'ADD_LAKE'),
        },
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
        {
          id: "gen_countries",
          label: "Generate Countries",
          disabled: !world,
          onClick: () => handleGenerateCountries(),
        },
        { id: "edit_border", label: "Edit Border", disabled: true },
      ],
    },
    {
      id: "culture",
      title: "Culture",
      tools: [
        {
          id: "add_culture",
          label: "Add Culture Zone",
          disabled: !world,
          active: activeStickerTool === 'CULTURE',
          onClick: () => setActiveStickerTool(activeStickerTool === 'CULTURE' ? null : 'CULTURE'),
        },
      ],
    },
    {
      id: "cities",
      title: "Cities",
      tools: [
        {
          id: "add_city",
          label: "Add City",
          disabled: !world,
          onClick: () => handleAddCity(),
        },
      ],
    },
  ];

  const rightPanel = (
    <div style={{ padding: 16, color: "rgba(255,255,255,0.92)" }}>
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
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,90,90,0.35)",
            background: "linear-gradient(180deg, rgba(255,90,90,0.12), rgba(255,90,90,0.06))",
            color: "rgba(255,255,255,0.95)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <b>Save failed:</b> {saveError}
        </div>
      )}

      {/* Countries quick status */}
      {world?.countries && world.countries.length > 0 && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Countries Generated</div>
          <div style={{ opacity: 0.85, marginBottom: 6 }}>Total: {world.countries.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {world.countries.slice(0, 5).map((c) => (
              <div key={c.id} style={{ opacity: 0.8 }}>• {c.name}</div>
            ))}
            {world.countries.length > 5 && (
              <div style={{ opacity: 0.6 }}>(+ {world.countries.length - 5} more)</div>
            )}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5, marginTop: 12 }}>
        Tools are blueprint-accurate categories; implementation continues in Phase 2.
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

    if (!w || !h) {
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

    // Use the pre-rasterized RGBA buffer (always available from planetRenderer)
    if (rgba && rgba instanceof Uint8ClampedArray) {
      return (
        <canvas
          width={w}
          height={h}
          ref={(c) => {
            if (!c) return;
            const ctx = c.getContext("2d");
            if (!ctx) return;

            try {
              // ImageData ctor expects proper Uint8ClampedArray
              const imgData = new ImageData(rgba as any, w, h);
              ctx.putImageData(imgData, 0, 0);
            } catch (e) {
              console.error("Preview render failed:", e);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            imageRendering: "auto", // Smooth scaling instead of pixelated
          }}
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
        No preview available
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
        {toastMessage && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(100,200,255,0.35)',
              background: 'rgba(100,200,255,0.12)',
              color: 'rgba(255,255,255,0.95)',
              fontSize: 12,
              zIndex: 1002,
              boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
            }}
            role="alert"
          >
            {toastMessage}
          </div>
        )}
        {/* Main viewport: Globe (3D) when selected, otherwise CPU preview map with terrain tools */}
        {viewMode === "GLOBE" && world ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Globe3D world={world} preview={preview} />
          </div>
        ) : world ? (
          <CreateViewport
            world={world}
            activeTerrainTool={activeTerrainTool}
            onWorldChange={handleWorldChange}
          />
        ) : (
          renderPreviewCanvas(preview, "main")
        )}

        {/* Sticker drawing overlay */}
        {activeStickerTool && (
          <StickerDrawingOverlay
            world={world}
            activeStickerTool={activeStickerTool}
            onStickerCreated={() => {
              setActiveStickerTool(null);
              handleWorldChange(world);
            }}
            onCancel={() => setActiveStickerTool(null)}
          />
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
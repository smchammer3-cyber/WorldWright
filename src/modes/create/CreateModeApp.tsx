// ========================================================
// WORLDWRIGHT -- CREATE MODE (V1.3 INTEGRATION CLEANUP)
// File: src/modes/create/CreateModeApp.tsx
//
// Goals:
// - cleaner mode orchestration
// - sticker-first naming
// - safer world update handoff
// - less stale closure behavior
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
import type { WorldBrain } from "../../core/worldSchema";

type TerrainTool = "RAISE" | "LOWER" | "FLATTEN" | "SMOOTH";
type StickerTool = "BIOME" | "CULTURE" | "HEIGHT";
type WaterTool = "ADD_RIVER" | "EDIT_RIVER" | "ADD_LAKE";

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
  const [activeTerrainTool, setActiveTerrainTool] = useState<TerrainTool | null>(null);
  const [activeStickerTool, setActiveStickerTool] = useState<StickerTool | null>(null);
  const [activeWaterTool, setActiveWaterTool] = useState<WaterTool | null>(null);

  const [world, setWorld] = useState<WorldBrain | null>(worldSession.getWorld());

  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

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
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

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

  function clearOtherToolFamilies(family: "terrain" | "sticker" | "water") {
    if (family !== "terrain") setActiveTerrainTool(null);
    if (family !== "sticker") setActiveStickerTool(null);
    if (family !== "water") setActiveWaterTool(null);
  }

  function handlePreviewWorldChange(nextWorld: WorldBrain) {
    worldSession.applyPreviewEdit(nextWorld);
  }

  function handleCommittedWorldChange(nextWorld: WorldBrain) {
    worldSession.applyCommittedLocalEdit(nextWorld);
  }

  function handleStickerCreated(nextWorld: WorldBrain) {
    setActiveStickerTool(null);
    worldSession.applyCommittedLocalEdit(nextWorld);
  }

  function handleGenerateCountries() {
    if (!world) return;

    try {
      const countryCount = Math.floor(Math.random() * 4) + 5;
      const workingWorld: WorldBrain = structuredCloneSafe(world);

      const generatedCountries = generateCountries(workingWorld, countryCount);

      if (!generatedCountries || generatedCountries.length === 0) {
        console.error("[Generate Countries] No countries generated - check world has land cells");
        alert("Failed to generate countries. Ensure the world has sufficient land mass.");
        return;
      }

      workingWorld.countries = generatedCountries;
      recomputeWorld(workingWorld, ["TERRAIN_EDIT"]);
      worldSession.applyCommittedLocalEdit(workingWorld);

      console.log(`[Generate Countries] Successfully generated ${generatedCountries.length} countries`);
    } catch (error) {
      console.error("[Generate Countries] Error:", error);
      alert(`Failed to generate countries: ${error}`);
    }
  }

  function handleAddCity() {
    if (!world) return;

    const landCells = world.cells.filter((c) => !c.isWater);
    if (landCells.length === 0) return;

    const randomCell = landCells[Math.floor(Math.random() * landCells.length)];
    const workingWorld: WorldBrain = structuredCloneSafe(world);

    const newCity: any = {
      id: `city_${Date.now()}`,
      name: "City",
      cellIndex: randomCell.index,
      population: 1000,
      type: "TOWN",
      populationTier: 2,
      isCapital: false,
      economicRoles: ["TRADE"],
      tags: [],
      description: "",
      countryId: workingWorld.countries?.[0]?.id,
      cultureId: workingWorld.cultures?.[0]?.id,
    };

    const row = Math.floor(randomCell.index / workingWorld.gridWidth);
    const col = randomCell.index % workingWorld.gridWidth;

    let nearCoast = false;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        if (nr < 0 || nr >= workingWorld.gridHeight) continue;
        const nc = ((col + dc) % workingWorld.gridWidth + workingWorld.gridWidth) % workingWorld.gridWidth;
        const nidx = nr * workingWorld.gridWidth + nc;
        if (workingWorld.cells[nidx]?.isWater) {
          nearCoast = true;
        }
      }
    }

    if (nearCoast) {
      newCity.type = "PORT";
    }

    workingWorld.cities = workingWorld.cities || [];
    workingWorld.cities.push(newCity);

    recomputeWorld(workingWorld, ["TERRAIN_EDIT"]);
    worldSession.applyCommittedLocalEdit(workingWorld);
  }

  const toolGroups: ToolGroup[] = [
    {
      id: "terrain",
      title: "Terrain",
      tools: [
        {
          id: "raise",
          label: "Raise",
          disabled: !world,
          active: activeTerrainTool === "RAISE",
          onClick: () => {
            clearOtherToolFamilies("terrain");
            setActiveTerrainTool(activeTerrainTool === "RAISE" ? null : "RAISE");
          },
        },
        {
          id: "lower",
          label: "Lower",
          disabled: !world,
          active: activeTerrainTool === "LOWER",
          onClick: () => {
            clearOtherToolFamilies("terrain");
            setActiveTerrainTool(activeTerrainTool === "LOWER" ? null : "LOWER");
          },
        },
        {
          id: "smooth",
          label: "Smooth",
          disabled: !world,
          active: activeTerrainTool === "SMOOTH",
          onClick: () => {
            clearOtherToolFamilies("terrain");
            setActiveTerrainTool(activeTerrainTool === "SMOOTH" ? null : "SMOOTH");
          },
        },
        {
          id: "flatten",
          label: "Flatten",
          disabled: !world,
          active: activeTerrainTool === "FLATTEN",
          onClick: () => {
            clearOtherToolFamilies("terrain");
            setActiveTerrainTool(activeTerrainTool === "FLATTEN" ? null : "FLATTEN");
          },
        },
      ],
    },
    {
      id: "biomes",
      title: "Stickers",
      tools: [
        {
          id: "biome_sticker",
          label: "Biome Sticker",
          disabled: !world,
          active: activeStickerTool === "BIOME",
          onClick: () => {
            clearOtherToolFamilies("sticker");
            setActiveStickerTool(activeStickerTool === "BIOME" ? null : "BIOME");
          },
        },
        {
          id: "terrain_sticker",
          label: "Terrain Sticker",
          disabled: !world,
          active: activeStickerTool === "HEIGHT",
          onClick: () => {
            clearOtherToolFamilies("sticker");
            setActiveStickerTool(activeStickerTool === "HEIGHT" ? null : "HEIGHT");
          },
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
          active: activeWaterTool === "ADD_RIVER",
          onClick: () => {
            clearOtherToolFamilies("water");
            setActiveWaterTool(activeWaterTool === "ADD_RIVER" ? null : "ADD_RIVER");
          },
        },
        {
          id: "river_edit",
          label: "Edit River",
          disabled: !world,
          active: activeWaterTool === "EDIT_RIVER",
          onClick: () => {
            clearOtherToolFamilies("water");
            setActiveWaterTool(activeWaterTool === "EDIT_RIVER" ? null : "EDIT_RIVER");
          },
        },
        {
          id: "lake_add",
          label: "Set Lake Level",
          disabled: !world,
          active: activeWaterTool === "ADD_LAKE",
          onClick: () => {
            clearOtherToolFamilies("water");
            setActiveWaterTool(activeWaterTool === "ADD_LAKE" ? null : "ADD_LAKE");
          },
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
          id: "culture_sticker",
          label: "Culture Sticker",
          disabled: !world,
          active: activeStickerTool === "CULTURE",
          onClick: () => {
            clearOtherToolFamilies("sticker");
            setActiveStickerTool(activeStickerTool === "CULTURE" ? null : "CULTURE");
          },
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
          style={buttonStyle(!world || loading || saving)}
        >
          {saving ? "Saving…" : "Save"}
        </button>

        <button
          onClick={() => navigate(`/sim/${worldId}`)}
          disabled={!worldId}
          style={buttonStyle(!worldId)}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {world.countries.slice(0, 5).map((c) => (
              <div key={c.id} style={{ opacity: 0.8 }}>
                • {c.name}
              </div>
            ))}
            {world.countries.length > 5 && (
              <div style={{ opacity: 0.6 }}>(+ {world.countries.length - 5} more)</div>
            )}
          </div>
        </div>
      )}

      {activeStickerTool && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(110,210,255,0.22)",
            background: "rgba(110,210,255,0.08)",
            color: "rgba(255,255,255,0.92)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Sticker Tool Active</div>
          <div style={{ opacity: 0.82 }}>
            {activeStickerTool === "BIOME" && "Biome Sticker"}
            {activeStickerTool === "CULTURE" && "Culture Sticker"}
            {activeStickerTool === "HEIGHT" && "Terrain Sticker"}
          </div>
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5, marginTop: 12 }}>
        Create Mode is now aligned around sticker-first authoring for biome, culture, and terrain regions.
      </div>
    </div>
  );

  function renderPreviewCanvas(p: any, mode: "main" | "minimap") {
    const w = p?.width;
    const h = p?.height;
    const rgba = p?.rgba;

    if (!w || !h) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
          }}
        >
          {mode === "main" ? "Generating preview…" : "Minimap…"}
        </div>
      );
    }

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
              const imgData = new ImageData(rgba as any, w, h);
              ctx.putImageData(imgData, 0, 0);
            } catch (e) {
              console.error("Preview render failed:", e);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            imageRendering: "auto",
          }}
        />
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          color: "rgba(255,255,255,0.85)",
          fontSize: 13,
        }}
      >
        No preview available
      </div>
    );
  }

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
              <button onClick={() => navigate("/")} style={buttonStyle(false)}>
                Back to Home
              </button>
              <button onClick={() => navigate("/generate")} style={buttonStyle(false)}>
                Go to Generate
              </button>
              <button onClick={() => window.location.reload()} style={buttonStyle(false)}>
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
              position: "absolute",
              top: 12,
              right: 12,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(100,200,255,0.35)",
              background: "rgba(100,200,255,0.12)",
              color: "rgba(255,255,255,0.95)",
              fontSize: 12,
              zIndex: 1002,
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            }}
            role="alert"
          >
            {toastMessage}
          </div>
        )}

        {viewMode === "GLOBE" && world ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Globe3D world={world} preview={preview} />
          </div>
        ) : world ? (
          <CreateViewport
            world={world}
            activeTerrainTool={activeTerrainTool}
            onWorldChange={(nextWorld) => handleCommittedWorldChange(nextWorld)}
          />
        ) : (
          renderPreviewCanvas(preview, "main")
        )}

        {activeStickerTool && world && (
          <StickerDrawingOverlay
            world={world}
            activeStickerTool={activeStickerTool}
            onStickerCreated={handleStickerCreated}
            onCancel={() => setActiveStickerTool(null)}
          />
        )}

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

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function buttonStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };
}
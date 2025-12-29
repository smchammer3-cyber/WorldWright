// ========================================================
// JARVIS CHANGE HEADER -- CREATE MODE SAVE/LOAD FIX (V1.3)
// File: src/modes/create/CreateModeApp.tsx
//
// Fixes:
// - getWorld() returns normalized WorldBrain with global seaLevel.
// - validateWorld() returns WorldValidationError[]; display cleanly.
// - saveWorld() returns string id (not object).
// - Preview uses makePlanetPreviewFromWorldBrain(world).
// - No archive references; blueprint-aligned.
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { getWorld, saveWorld } from "../../core/worldStorage";
import { validateWorld, WorldValidationError } from "../../core/worldValidation";

import type { WorldBrain } from "../../core/worldSchema";

type ViewMode = "GLOBE" | "MAP";

export function CreateModeApp() {
  const nav = useNavigate();
  const params = useParams();
  const worldId = params.worldId || params.id || "";

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
  const [errors, setErrors] = useState<WorldValidationError[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setSaveError(null);
      try {
        const w = await getWorld(worldId);
        if (!alive) return;
        if (!w) {
          setWorld(null);
          setErrors([{ path: "world", message: "World not found." }]);
          return;
        }

        setWorld(w);
        const v = validateWorld(w);
        setErrors(v);
      } catch (e: any) {
        setWorld(null);
        setErrors([{ path: "world", message: e?.message ?? "Failed to load world." }]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    if (worldId) load();
    else {
      setLoading(false);
      setWorld(null);
      setErrors([{ path: "route", message: "No world id provided." }]);
    }

    return () => {
      alive = false;
    };
  }, [worldId]);

  // Preview is safe even if world is null (AppShell will show empty)
  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const handleSave = async () => {
    if (!world) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const id = await saveWorld(world);
      // Re-load fresh copy after save (ensures storage normalization stays true)
      const refreshed = await getWorld(id);
      if (refreshed) {
        setWorld(refreshed);
        setErrors(validateWorld(refreshed));
      }
    } catch (e: any) {
      setSaveError(e?.message ?? "Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackHome = () => nav("/");

  // Placeholder tool list for now (real Create tools come next steps)
  const leftTools = useMemo(
    () => [
      { id: "view_globe", label: "Globe View" },
      { id: "view_map", label: "Map View" },
      { id: "terrain", label: "Terrain (soon)" },
      { id: "stickers", label: "Stickers (soon)" },
      { id: "cultures", label: "Cultures (soon)" },
      { id: "countries", label: "Countries (soon)" },
    ],
    [],
  );

  const rightPanel = (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>
          {world?.metadata?.name ?? "Create"}
        </div>
        <button onClick={handleBackHome} style={{ padding: "6px 10px", borderRadius: 10 }}>
          Home
        </button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setViewMode("GLOBE")}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 10,
            fontWeight: 700,
            opacity: viewMode === "GLOBE" ? 1 : 0.6,
          }}
        >
          Globe
        </button>
        <button
          onClick={() => setViewMode("MAP")}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 10,
            fontWeight: 700,
            opacity: viewMode === "MAP" ? 1 : 0.6,
          }}
        >
          Map
        </button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleSave}
          disabled={isSaving || !world}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            fontWeight: 800,
          }}
        >
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>

      {saveError && (
        <div style={{ color: "#c33", fontSize: 13 }}>
          {saveError}
        </div>
      )}

      <div style={{ opacity: 0.8, fontSize: 12 }}>
        <div><b>ID:</b> {world?.metadata?.id ?? "--"}</div>
        <div><b>Version:</b> {world?.metadata?.version ?? "--"}</div>
        <div><b>Sea Level:</b> {world ? world.seaLevel.toFixed(3) : "--"}</div>
        <div><b>Grid:</b> {world ? `${world.gridWidth}×${world.gridHeight}` : "--"}</div>
      </div>

      <div>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>
          Validation
        </div>
        {errors.length === 0 ? (
          <div style={{ color: "#2a7", fontSize: 13 }}>No structural errors.</div>
        ) : (
          <div style={{ fontSize: 12, lineHeight: 1.35 }}>
            {errors.slice(0, 12).map((e, i) => (
              <div key={i} style={{ color: "#c33" }}>
                <b>{e.path}:</b> {e.message}
              </div>
            ))}
            {errors.length > 12 && (
              <div style={{ opacity: 0.7, marginTop: 6 }}>
                (+{errors.length - 12} more)
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ opacity: 0.7, fontSize: 12 }}>
        Editing tools are the next step (terrain brushes + sticker UI + undo/redo).
        This file ensures Create loads/saves cleanly with the V1.3 world contract.
      </div>
    </div>
  );

  if (loading) {
    return (
      <AppShell
        mode="create"
        title="Create"
        leftTools={leftTools}
        rightPanel={<div style={{ padding: 12 }}>Loading…</div>}
      />
    );
  }

  if (!world || !preview) {
    return (
      <AppShell
        mode="create"
        title="Create"
        leftTools={leftTools}
        rightPanel={
          <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 800 }}>Create Mode</div>
            <div style={{ marginTop: 8, color: "#c33" }}>
              Failed to load world.
            </div>
            <button onClick={handleBackHome} style={{ marginTop: 12, padding: 10, borderRadius: 10 }}>
              Back Home
            </button>
          </div>
        }
      />
    );
  }

  return (
    <AppShell
      mode="create"
      title="Create"
      leftTools={leftTools}
      rightPanel={rightPanel}
      planetPreview={preview}
      // Let AppShell decide minimap visibility based on viewMode.
      // If your AppShell expects a prop, wire it here:
      viewMode={viewMode}
    />
  );
}

export default CreateModeApp;
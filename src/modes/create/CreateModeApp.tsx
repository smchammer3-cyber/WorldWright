// ========================================================
// WORLDWRIGHT -- CREATE MODE (V1.3)
// File: src/modes/create/CreateModeApp.tsx
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { getWorld, saveWorld } from "../../core/worldStorage";
import { validateWorld } from "../../core/worldValidation";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

import type { WorldBrain } from "../../core/worldSchema";

type ViewMode = "GLOBE" | "MAP";

export default function CreateModeApp() {
  const nav = useNavigate();
  const { worldId } = useParams();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setSaveError(null);
      try {
        const w = await getWorld(worldId || "");
        if (!alive) return;

        if (!w) {
          setWorld(null);
          setErrors([{ path: "world", message: "World not found." }]);
          return;
        }

        setWorld(w);
        setErrors(validateWorld(w));
      } catch (e: any) {
        setWorld(null);
        setErrors([{ path: "world", message: e?.message ?? "Failed to load world." }]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [worldId]);

  const preview = useMemo(() => (world ? makePlanetPreviewFromWorldBrain(world) : null), [world]);

  const save = async () => {
    if (!world) return;
    setSaving(true);
    setSaveError(null);
    try {
      const id = await saveWorld(world);
      const refreshed = await getWorld(id);
      if (refreshed) {
        setWorld(refreshed);
        setErrors(validateWorld(refreshed));
      }
    } catch (e: any) {
      setSaveError(e?.message ?? "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <AppShell mode="create" title="Create" rightPanel={<div style={{ padding: 12 }}>Loading…</div>} />;
  }

  if (!world || !preview) {
    return (
      <AppShell
        mode="create"
        title="Create"
        rightPanel={
          <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 900 }}>Create</div>
            <div style={{ color: "#c33", marginTop: 8 }}>Failed to load world.</div>
            <button onClick={() => nav("/")} style={{ marginTop: 12, padding: 10, borderRadius: 10, fontWeight: 900 }}>
              Home
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
      viewMode={viewMode}
      planetPreview={preview}
      leftTools={[
        { id: "view_globe", label: "Globe" },
        { id: "view_map", label: "Map" },
        { id: "terrain", label: "Terrain (soon)" },
        { id: "stickers", label: "Stickers (soon)" },
      ]}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{world.metadata.name}</div>
            <button onClick={() => nav("/")} style={{ padding: "6px 10px", borderRadius: 10, fontWeight: 800 }}>
              Home
            </button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setViewMode("GLOBE")} style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900, opacity: viewMode === "GLOBE" ? 1 : 0.65 }}>
              Globe View
            </button>
            <button onClick={() => setViewMode("MAP")} style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900, opacity: viewMode === "MAP" ? 1 : 0.65 }}>
              Map View
            </button>
          </div>

          <button onClick={save} disabled={saving} style={{ padding: 12, borderRadius: 12, fontWeight: 900 }}>
            {saving ? "Saving…" : "Save"}
          </button>

          {saveError ? <div style={{ color: "#c33", fontSize: 13 }}>{saveError}</div> : null}

          <div style={{ opacity: 0.8, fontSize: 12 }}>
            <div><b>ID:</b> {world.metadata.id}</div>
            <div><b>Sea Level:</b> {world.seaLevel.toFixed(3)}</div>
            <div><b>Grid:</b> {world.gridWidth}×{world.gridHeight}</div>
          </div>

          <div>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Validation</div>
            {errors.length === 0 ? (
              <div style={{ color: "#2a7", fontSize: 13 }}>No structural errors.</div>
            ) : (
              <div style={{ fontSize: 12, lineHeight: 1.35 }}>
                {errors.slice(0, 10).map((e: any, i: number) => (
                  <div key={i} style={{ color: "#c33" }}>
                    <b>{e.path}:</b> {e.message}
                  </div>
                ))}
                {errors.length > 10 ? <div style={{ opacity: 0.7, marginTop: 6 }}>+{errors.length - 10} more</div> : null}
              </div>
            )}
          </div>

          <div style={{ opacity: 0.7, fontSize: 12 }}>
            Next blueprint step after stability: terrain brushes + sticker UI + undo/redo.
          </div>
        </div>
      }
    />
  );
}
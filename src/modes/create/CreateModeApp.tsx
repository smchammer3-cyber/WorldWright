// ========================================================
// JARVIS CHANGE HEADER -- CREATE MODE LOAD ERROR HARDENING
// File: src/modes/create/CreateModeApp.tsx
//
// Fixes:
// - Await worldSession.loadWorld() and show visible errors (no unhandled rejections).
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import type { TerrainStrokeAction } from "../../core/worldActions";

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams();

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!worldId);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!worldId) return;
      setErr(null);
      setLoading(true);
      try {
        await worldSession.loadWorld(worldId);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Failed to load world.");
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, [worldId]);

  const [world, setWorld] = useState(() => worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const handleRaiseCenter = () => {
    if (!world) return;
    const action: TerrainStrokeAction = {
      type: "TERRAIN_STROKE",
      tool: "RAISE",
      center: { row: world.gridHeight / 2, col: world.gridWidth / 2 },
      radius: Math.min(world.gridWidth, world.gridHeight) / 8,
      strength: 0.5,
    };
    worldSession.apply(action);
  };

  const handleLowerCenter = () => {
    if (!world) return;
    const action: TerrainStrokeAction = {
      type: "TERRAIN_STROKE",
      tool: "LOWER",
      center: { row: world.gridHeight / 2, col: world.gridWidth / 2 },
      radius: Math.min(world.gridWidth, world.gridHeight) / 8,
      strength: 0.5,
    };
    worldSession.apply(action);
  };

  const handleSave = async () => {
    try {
      const id = await worldSession.save();
      if (!id) setErr("Save failed (storage unavailable).");
    } catch (e: any) {
      setErr(e?.message ?? "Save failed.");
    }
  };

  return (
    <AppShell
      mode="create"
      title="Create"
      viewMode="GLOBE"
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 950 }}>Create Tools</div>

          {loading ? <div style={{ opacity: 0.8, fontWeight: 800 }}>Loading...</div> : null}

          {err ? (
            <div
              style={{
                padding: 10,
                borderRadius: 12,
                background: "rgba(200,40,40,0.10)",
                border: "1px solid rgba(200,40,40,0.25)",
                fontWeight: 800,
                lineHeight: 1.3,
              }}
            >
              {err}
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <button onClick={() => navigate("/")} style={{ padding: 8 }}>
                  Back Home
                </button>
              </div>
            </div>
          ) : null}

          <button onClick={handleRaiseCenter} style={{ padding: 8 }}>
            Raise Center
          </button>
          <button onClick={handleLowerCenter} style={{ padding: 8 }}>
            Lower Center
          </button>

          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <button onClick={() => worldSession.undo()} style={{ padding: 8 }}>
              Undo
            </button>
            <button onClick={() => worldSession.redo()} style={{ padding: 8 }}>
              Redo
            </button>
          </div>

          <button onClick={handleSave} style={{ padding: 8 }}>
            Save
          </button>

          <button onClick={() => navigate(`/sim/${worldId ?? ""}`)} style={{ padding: 8 }}>
            Go to Sim
          </button>
        </div>
      }
    />
  );
}
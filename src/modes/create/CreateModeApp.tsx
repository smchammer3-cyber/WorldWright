// src/modes/create/CreateModeApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell, LeftTool } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { TerrainStrokeAction } from "../../core/worldActions";

type ViewMode = "GLOBE" | "MAP";

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams();

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");

  const [world, setWorld] = useState(worldSession.getWorld());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep local state synced with session
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return () => unsub();
  }, []);

  // Load world by ID (await + error state)
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setError(null);
      setLoading(true);

      if (!worldId) {
        setError("No worldId in route. Return to Home.");
        setLoading(false);
        return;
      }

      try {
        await worldSession.loadWorld(worldId);
        if (!cancelled) setLoading(false);
      } catch (e: any) {
        const msg = e?.message ? String(e.message) : String(e);
        if (!cancelled) {
          setError(msg);
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [worldId]);

  const planetPreview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const leftTools: LeftTool[] = useMemo(
    () => [
      { id: "home", label: "Home", isEnabled: true, onClick: () => navigate("/") },
      { id: "terrain", label: "Terrain", isEnabled: true },
      { id: "stickers", label: "Stickers", isEnabled: false },
      { id: "countries", label: "Countries", isEnabled: false },
      { id: "cities", label: "Cities", isEnabled: false },
      { id: "culture", label: "Culture", isEnabled: false },
    ],
    [navigate]
  );

  async function handleSave() {
    const id = await worldSession.save();
    if (!id) {
      setError("Save failed. Storage may be blocked/unavailable. Try closing other tabs and refresh.");
      return;
    }
    // Stay in Create, but ensure route is correct for reloads/bookmarks
    navigate(`/create/${id}`, { replace: true });
  }

  const rightPanel = (() => {
    if (loading) {
      return <div style={{ padding: 12 }}>Loading…</div>;
    }
    if (error) {
      return (
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Create Mode</div>
          <div style={{ opacity: 0.9, marginBottom: 10 }}>{error}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")}>Back to Home</button>
            <button onClick={() => navigate("/generate")}>Go to Generate</button>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
            Tip: If this says IndexedDB is blocked, close other WorldWright tabs/windows and reload.
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 900 }}>Create</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setViewMode("GLOBE")}
            style={{ fontWeight: viewMode === "GLOBE" ? 900 : 600 }}
          >
            Globe View
          </button>
          <button
            onClick={() => setViewMode("MAP")}
            style={{ fontWeight: viewMode === "MAP" ? 900 : 600 }}
          >
            Map View
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => {
              // Minimal, non-destructive proof action: a tiny flatten stroke at world center.
              const action: TerrainStrokeAction = {
                kind: "TERRAIN_STROKE",
                centerLat: 0,
                centerLon: 0,
                radiusKm: 200,
                delta: -0.05,
                strength: 0.5,
              };
              worldSession.apply(action);
            }}
          >
            Flatten Center
          </button>
          <button onClick={() => worldSession.undo()}>Undo</button>
          <button onClick={() => worldSession.redo()}>Redo</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  })();

  return (
    <AppShell
      title={`WorldWright -- Create`}
      mode="create"
      viewMode={viewMode}
      leftTools={leftTools}
      planetPreview={planetPreview}
      rightPanel={rightPanel}
    />
  );
}
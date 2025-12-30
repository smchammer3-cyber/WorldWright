// ========================================================
// JARVIS CHANGE HEADER -- SIM MODE LOAD ERROR HARDENING
// File: src/modes/sim/SimModeApp.tsx
//
// Fixes:
// - Await worldSession.loadWorld() and show visible errors (no unhandled rejections).
// ========================================================

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

export default function SimModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!worldId);

  // Load the world once when the component mounts
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

  const [tickSpeed, setTickSpeed] = useState(250);

  useEffect(() => {
    if (!worldId) return;
    const handle = window.setInterval(() => {
      worldSession.simulateTick();
    }, Math.max(50, tickSpeed));
    return () => window.clearInterval(handle);
  }, [worldId, tickSpeed]);

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
      mode="sim"
      title="Sim"
      planetPreview={preview}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontWeight: 950 }}>Sim Controls</div>

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
                {worldId ? (
                  <button onClick={() => navigate(`/create/${worldId}`)} style={{ padding: 8 }}>
                    Back Create
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          <button onClick={() => navigate(`/create/${worldId ?? ""}`)} style={{ padding: 8 }}>
            Back to Create
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.85 }}>Tick speed (ms)</div>
            <input
              type="number"
              min={50}
              value={tickSpeed}
              onChange={(e) => setTickSpeed(Number(e.target.value))}
              style={{ width: "100%", padding: 8, borderRadius: 10 }}
            />
          </div>

          <button onClick={handleSave} style={{ padding: 8 }}>
            Save
          </button>
        </div>
      }
    />
  );
}
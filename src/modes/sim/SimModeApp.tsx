// src/modes/sim/SimModeApp.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppShell, LeftTool } from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

export default function SimModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [world, setWorld] = useState(worldSession.getWorld());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [running, setRunning] = useState(false);
  const [tickSpeed, setTickSpeed] = useState(250);

  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return () => unsub();
  }, []);

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

  // Run simulation ticks when running is true
  useEffect(() => {
    let timer: number | null = null;
    if (running) {
      timer = window.setInterval(() => worldSession.simulateTick(), Math.max(50, tickSpeed));
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [running, tickSpeed]);

  const planetPreview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  const leftTools: LeftTool[] = useMemo(
    () => [
      { id: "home", label: "Home", isEnabled: true, onClick: () => navigate("/") },
      { id: "overview", label: "Overview", isEnabled: true },
      { id: "culture", label: "Culture", isEnabled: false },
      { id: "trade", label: "Trade", isEnabled: false },
      { id: "routes", label: "Routes", isEnabled: false },
    ],
    [navigate]
  );

  async function handleSave() {
    const id = await worldSession.save();
    if (!id) {
      setError("Save failed. Storage may be blocked/unavailable. Try closing other tabs and refresh.");
      return;
    }
    navigate(`/sim/${id}`, { replace: true });
  }

  const rightPanel = (() => {
    if (loading) {
      return <div style={{ padding: 12 }}>Loading…</div>;
    }
    if (error) {
      return (
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Sim Mode</div>
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
        <div style={{ fontWeight: 900 }}>Sim</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Run"}</button>
          <button onClick={() => worldSession.simulateTick()}>Tick</button>
          <button onClick={handleSave}>Save</button>
        </div>

        <div>
          <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>Tick Speed (ms)</div>
          <input
            type="number"
            min={50}
            value={tickSpeed}
            onChange={(e) => setTickSpeed(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  })();

  return (
    <AppShell
      title={`WorldWright -- Sim`}
      mode="sim"
      viewMode="GLOBE"
      leftTools={leftTools}
      planetPreview={planetPreview}
      rightPanel={rightPanel}
    />
  );
}
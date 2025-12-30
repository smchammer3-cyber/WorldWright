// src/modes/sim/SimModeApp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import Globe3D from "../../render/Globe3D";

export default function SimModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to world updates
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

  // In Sim Mode we render the 3D globe directly; no CPU preview is used.

  const rightPanel = (
    <div style={{ padding: 14, color: "rgba(255,255,255,0.88)" }}>
      <h3 style={{ margin: "6px 0 10px 0" }}>Sim</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          onClick={() => worldSession.simulateTick()}
          disabled={!world || loading}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
            cursor: !world || loading ? "not-allowed" : "pointer",
            opacity: !world || loading ? 0.5 : 1,
          }}
        >
          Tick
        </button>

        <button
          onClick={() => navigate(`/create/${worldId}`)}
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
          Back to Create
        </button>
      </div>

      <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.4 }}>
        Sim overlays (Culture/Trade/Routes) will be added after stability.
      </div>
    </div>
  );

  if (loading) {
    return (
      <AppShell
        mode="sim"
        onGoHome={() => navigate("/")}
        worldName={world?.metadata?.name || "Loading…"}
        isDirty={worldSession.isDirty()}
        onModeToggle={() => navigate(`/create/${worldId}`)}
        rightPanel={rightPanel}
        leftTools={[
          { id: "overview", label: "Overview", disabled: true },
          { id: "culture", label: "Culture", disabled: true },
          { id: "trade", label: "Trade", disabled: true },
          { id: "routes", label: "Routes", disabled: true },
        ]}
      >
        <div style={{ padding: 20, color: "rgba(255,255,255,0.85)" }}>Loading world…</div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell
        mode="sim"
        onGoHome={() => navigate("/")}
        worldName="Load Error"
        isDirty={false}
        rightPanel={
          <div style={{ padding: 14, color: "rgba(255,255,255,0.9)" }}>
            <h3 style={{ margin: "6px 0 10px 0" }}>Could not load world</h3>
            <div style={{ opacity: 0.85, marginBottom: 12 }}>{error}</div>
            <div style={{ display: "flex", gap: 10 }}>
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
        <div style={{ padding: 20, color: "rgba(255,255,255,0.85)" }} />
      </AppShell>
    );
  }

  return (
    <AppShell
      mode="sim"
      onGoHome={() => navigate("/")}
      worldName={world?.metadata?.name || "Sim"}
      isDirty={worldSession.isDirty()}
      onModeToggle={() => navigate(`/create/${worldId}`)}
      rightPanel={rightPanel}
      toolGroups={[
        {
          id: "sim",
          title: "Sim Tools",
          tools: [
            { id: "overview", label: "Overview", disabled: true },
            { id: "culture", label: "Culture", disabled: true },
            { id: "trade", label: "Trade", disabled: true },
            { id: "routes", label: "Routes", disabled: true },
          ],
        },
      ]}
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {/* Main viewport: render the real 3D globe when a world is loaded */}
        {world ? (
          <Globe3D world={world} className="" />
        ) : (
          <div style={{ padding: 20, color: 'rgba(255,255,255,0.85)' }}>No world loaded.</div>
        )}
      </div>
    </AppShell>
  );
}
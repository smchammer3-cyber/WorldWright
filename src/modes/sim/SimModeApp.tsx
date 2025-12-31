// src/modes/sim/SimModeApp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import Globe3D from "../../render/Globe3D";
import { generateSimEvents, resolveEvent, createSimBranch, type SimEvent, type SimBranch } from "../../core/simEvents";
import { DecisionInbox } from "./DecisionInbox";
import { EventHistoryPanel } from "./EventHistoryPanel";

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

  // Simulation state
  const [currentYear, setCurrentYear] = useState(0);
  const [pendingEvents, setPendingEvents] = useState<SimEvent[]>([]);
  const [branches, setBranches] = useState<SimBranch[]>([]);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [eventHistory, setEventHistory] = useState<Array<{
    event: SimEvent;
    chosenOption: number;
    resolvedYear: number;
  }>>([]);
  const [showHistory, setShowHistory] = useState(false);

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

  // Sim tick handler
  const handleSimTick = () => {
    if (!world) return;
    const newYear = currentYear + 1;
    setCurrentYear(newYear);

    // Generate new events
    const events = generateSimEvents(world, newYear);
    setPendingEvents((prev) => [...prev, ...events]);
  };

  // Handle event resolution
  const handleResolveEvent = (eventId: string, optionIndex: number) => {
    const event = pendingEvents.find((e) => e.id === eventId);
    if (!event || !world) return;

    resolveEvent(event, optionIndex, world);
    worldSession.applyLocalEdit(world);
    setPendingEvents((prev) => prev.filter((e) => e.id !== eventId));
    
    // Add to history
    setEventHistory((prev) => [
      ...prev,
      { event, chosenOption: optionIndex, resolvedYear: currentYear },
    ]);
  };

  // Auto-resolve all events
  const handleAutoResolveAll = () => {
    if (!world) return;
    for (const event of pendingEvents) {
      if (event.automaticallyResolve && event.options.length > 0) {
        resolveEvent(event, 0, world);
      }
    }
    worldSession.applyLocalEdit(world);
    setPendingEvents((prev) =>
      prev.filter((e) => !e.automaticallyResolve || e.options.length === 0)
    );
  };

  // Create branch
  const handleCreateBranch = (branchName: string) => {
    if (!world) return;
    const branch = createSimBranch(world, currentYear, branchName);
    setBranches((prev) => [...prev, branch]);
    setShowBranchMenu(false);
  };

  // In Sim Mode we render the 3D globe directly; no CPU preview is used.

  const rightPanel = (
    <div style={{ padding: 14, color: "rgba(255,255,255,0.88)" }}>
      <h3 style={{ margin: "6px 0 10px 0" }}>Sim Year {currentYear}</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          onClick={handleSimTick}
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

      <div style={{ marginBottom: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(100,150,255,0.15)",
            color: "rgba(150,200,255,0.9)",
            cursor: "pointer",
            fontSize: 12,
            width: "100%",
            marginBottom: 8,
          }}
        >
          {showHistory ? "Hide" : "Show"} History ({eventHistory.length})
        </button>

        <button
          onClick={() => setShowBranchMenu(!showBranchMenu)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(100,150,255,0.15)",
            color: "rgba(150,200,255,0.9)",
            cursor: "pointer",
            fontSize: 12,
            width: "100%",
            marginBottom: 8,
          }}
        >
          Branches ({branches.length})
        </button>
        {showBranchMenu && (
          <div style={{ fontSize: 11, backgroundColor: "rgba(0,0,0,0.3)", padding: 8, borderRadius: 6, marginBottom: 8 }}>
            {branches.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: 4,
                  marginBottom: 4,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  borderLeft: b.isPromoted ? "2px solid #88ff88" : "2px solid #888",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{b.name}</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Y{b.currentYear}</div>
              </div>
            ))}
            <input
              type="text"
              placeholder="Branch name…"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  handleCreateBranch(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
              style={{
                width: "100%",
                padding: "4px 6px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "rgba(255,255,255,0.9)",
                fontSize: 11,
              }}
            />
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.4 }}>
        Culture, Trade, and Route overlays coming soon.
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
          <>
            <Globe3D world={world} className="" />
            {/* Decision Inbox */}
            <DecisionInbox
              events={pendingEvents}
              onResolveEvent={handleResolveEvent}
              onAutoResolveAll={handleAutoResolveAll}
            />
            {/* Event History Panel */}
            {showHistory && <EventHistoryPanel history={eventHistory} />}
          </>
        ) : (
          <div style={{ padding: 20, color: 'rgba(255,255,255,0.85)' }}>No world loaded.</div>
        )}
      </div>
    </AppShell>
  );
}
// src/modes/sim/SimModeApp.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../ui/AppShell";
import { worldSession } from "../../core/worldSession";
import Globe3D from "../../render/Globe3D";
import { generateSimEvents, resolveEvent, type SimEvent } from "../../core/simEvents";
import {
  createSimBranchRecordFromWorld,
  listSimBranchRecords,
  saveSimBranchRecord,
  type SimBranchRecord,
  type StoredSimEventDecision,
} from "../../core/worldStorage";
import type { WorldBrain } from "../../core/worldSchema";
import { DecisionInbox } from "./DecisionInbox";
import { EventHistoryPanel } from "./EventHistoryPanel";

function cloneBranchWorld(world: WorldBrain): WorldBrain {
  return JSON.parse(JSON.stringify(world)) as WorldBrain;
}

function serializeDecision(event: SimEvent, chosenOption: number): StoredSimEventDecision {
  return {
    eventId: event.id,
    eventType: event.type,
    year: event.year,
    title: event.title,
    chosenOption,
    resolvedAt: new Date().toISOString(),
  };
}

export default function SimModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to canonical world updates. Sim branch exploration must not
  // mutate this canonical world until an explicit promotion workflow exists.
  const [world, setWorld] = useState(worldSession.getWorld());
  useEffect(() => {
    const unsub = worldSession.subscribe((w) => setWorld(w));
    return unsub;
  }, []);

  // Simulation state. Sim branches are persisted separately from the
  // canonical Create world; event effects only touch branch snapshots.
  const [currentYear, setCurrentYear] = useState(0);
  const [pendingEvents, setPendingEvents] = useState<SimEvent[]>([]);
  const [branches, setBranches] = useState<SimBranchRecord[]>([]);
  const [activeBranch, setActiveBranch] = useState<SimBranchRecord | null>(null);
  const [showBranchMenu, setShowBranchMenu] = useState(false);
  const [eventHistory, setEventHistory] = useState<Array<{
    event: SimEvent;
    chosenOption: number;
    resolvedYear: number;
  }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  function upsertBranch(nextBranch: SimBranchRecord): void {
    setActiveBranch(nextBranch);
    setBranches((prev) => {
      const exists = prev.some((branch) => branch.id === nextBranch.id);
      if (exists) {
        return prev.map((branch) => (branch.id === nextBranch.id ? nextBranch : branch));
      }
      return [...prev, nextBranch];
    });
  }

  async function getOrCreateActiveBranch(): Promise<SimBranchRecord | null> {
    if (activeBranch) return activeBranch;
    if (!world) return null;

    const branch = createSimBranchRecordFromWorld(world, "Active Sim Branch", currentYear);
    const savedBranch = await saveSimBranchRecord(branch);
    upsertBranch(savedBranch);
    return savedBranch;
  }

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
        const storedBranches = await listSimBranchRecords(worldId);
        if (alive) {
          setActiveBranch(null);
          setBranches(storedBranches);
          setPendingEvents([]);
          setEventHistory([]);
          setCurrentYear(0);
        }
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
  const handleSimTick = async () => {
    const branch = await getOrCreateActiveBranch();
    if (!branch) return;

    const newYear = branch.currentYear + 1;
    const nextBranch = await saveSimBranchRecord({ ...branch, currentYear: newYear });
    upsertBranch(nextBranch);
    setCurrentYear(newYear);

    // Generate new events from branch-local state, not canonical Create state.
    const events = generateSimEvents(nextBranch.worldSnapshot, newYear);
    setPendingEvents((prev) => [...prev, ...events]);
  };

  // Handle event resolution
  const handleResolveEvent = async (eventId: string, optionIndex: number) => {
    const event = pendingEvents.find((e) => e.id === eventId);
    const branch = await getOrCreateActiveBranch();
    if (!event || !branch) return;

    const branchWorld = cloneBranchWorld(branch.worldSnapshot);
    const resolved = resolveEvent(event, optionIndex, branchWorld);
    if (!resolved) return;

    const nextBranch = await saveSimBranchRecord({
      ...branch,
      worldSnapshot: branchWorld,
      currentYear,
      eventHistory: [...branch.eventHistory, serializeDecision(event, optionIndex)],
    });

    upsertBranch(nextBranch);
    setPendingEvents((prev) => prev.filter((e) => e.id !== eventId));
    setEventHistory((prev) => [
      ...prev,
      { event, chosenOption: optionIndex, resolvedYear: currentYear },
    ]);
  };

  // Auto-resolve all events
  const handleAutoResolveAll = async () => {
    const branch = await getOrCreateActiveBranch();
    if (!branch) return;

    const branchWorld = cloneBranchWorld(branch.worldSnapshot);
    const resolvedHistory: Array<{ event: SimEvent; chosenOption: number; resolvedYear: number }> = [];

    for (const event of pendingEvents) {
      if (event.automaticallyResolve && event.options.length > 0) {
        const resolved = resolveEvent(event, 0, branchWorld);
        if (resolved) {
          resolvedHistory.push({ event, chosenOption: 0, resolvedYear: currentYear });
        }
      }
    }

    if (resolvedHistory.length > 0) {
      const nextBranch = await saveSimBranchRecord({
        ...branch,
        worldSnapshot: branchWorld,
        currentYear,
        eventHistory: [
          ...branch.eventHistory,
          ...resolvedHistory.map(({ event, chosenOption }) => serializeDecision(event, chosenOption)),
        ],
      });
      upsertBranch(nextBranch);
      setEventHistory((prev) => [...prev, ...resolvedHistory]);
    }

    setPendingEvents((prev) =>
      prev.filter((e) => !e.automaticallyResolve || e.options.length === 0)
    );
  };

  // Create branch
  const handleCreateBranch = async (branchName: string) => {
    if (!world) return;
    const branch = createSimBranchRecordFromWorld(world, branchName, currentYear);
    const savedBranch = await saveSimBranchRecord(branch);
    upsertBranch(savedBranch);
    setCurrentYear(savedBranch.currentYear);
    setShowBranchMenu(false);
  };

  const handleSelectBranch = (branch: SimBranchRecord) => {
    setActiveBranch(branch);
    setCurrentYear(branch.currentYear);
    setPendingEvents([]);
    setEventHistory([]);
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
                  backgroundColor: activeBranch?.id === b.id ? "rgba(120,170,255,0.15)" : "rgba(255,255,255,0.05)",
                  borderRadius: 4,
                  borderLeft: b.status === "PROMOTED" ? "2px solid #88ff88" : "2px solid #888",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectBranch(b)}
              >
                <div style={{ fontWeight: "bold" }}>{b.name}</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>Y{b.currentYear} · {b.eventHistory.length} decisions</div>
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
        {/* Main viewport: render the canonical 3D globe until branch-view rendering exists. */}
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
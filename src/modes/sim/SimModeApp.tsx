// ========================================================
// JARVIS CHANGE HEADER -- SIM MODE SAFE SHELL (V1.3)
// File: src/modes/sim/SimModeApp.tsx
//
// Fixes:
// - Loads/saves WorldBrain using V1.3 storage + validation.
// - Runs a basic simulation tick loop safely (no schema drift).
// - Uses makePlanetPreviewFromWorldBrain() for rendering.
// - No archive references.
//
// Non-goals:
// - Full Hybrid Realism sim (climate drift, tectonics, culture drift) -- next milestones.
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { getWorld, saveWorld } from "../../core/worldStorage";
import { validateWorld } from "../../core/worldValidation";
import type { WorldBrain } from "../../core/worldSchema";

// If your sim module path differs, update this import to match your repo.
import { simulateTick } from "../../core/worldSim";

export function SimModeApp() {
  const nav = useNavigate();
  const params = useParams();
  const worldId = params.worldId || params.id || "";

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [loading, setLoading] = useState(true);

  const [isRunning, setIsRunning] = useState(false);
  const [tickMs, setTickMs] = useState(250);
  const [tickCount, setTickCount] = useState(0);

  const [errors, setErrors] = useState<any[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const intervalRef = useRef<number | null>(null);

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
        setErrors(validateWorld(w));
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

  // Preview
  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  // Stop loop on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Start/stop loop when isRunning changes
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = window.setInterval(() => {
      setWorld((prev) => {
        if (!prev) return prev;

        // simulateTick should return a new world OR mutate safely.
        // We treat it as returning a new object when possible.
        const next = simulateTick(structuredClone(prev));
        return next ?? prev;
      });

      setTickCount((t) => t + 1);
    }, Math.max(50, tickMs));

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, tickMs]);

  // Re-validate periodically (lightweight)
  useEffect(() => {
    if (!world) return;
    const v = validateWorld(world);
    setErrors(v);
  }, [world, tickCount]);

  const handleSave = async () => {
    if (!world) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const w = structuredClone(world);
      w.metadata.updatedAt = new Date().toISOString();

      const id = await saveWorld(w);
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

  const handleHome = () => nav("/");
  const handleBackToCreate = () => {
    if (!worldId) return;
    nav(`/create/${worldId}`);
  };

  const leftTools = [
    { id: "run", label: "Run" },
    { id: "pause", label: "Pause" },
    { id: "tick", label: "Tick" },
    { id: "save", label: "Save" },
  ];

  const rightPanel = (
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 16 }}>
          {world?.metadata?.name ?? "Sim"}
        </div>
        <button onClick={handleHome} style={{ padding: "6px 10px", borderRadius: 10 }}>
          Home
        </button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setIsRunning(true)}
          disabled={!world || isRunning}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            fontWeight: 800,
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          Run
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!world || !isRunning}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            fontWeight: 800,
            opacity: !isRunning ? 0.6 : 1,
          }}
        >
          Pause
        </button>
      </div>

      <div>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Tick Speed</div>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={tickMs}
          onChange={(e) => setTickMs(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={{ opacity: 0.75, fontSize: 12 }}>{tickMs} ms</div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => {
            if (!world) return;
            setWorld((prev) => (prev ? simulateTick(structuredClone(prev)) ?? prev : prev));
            setTickCount((t) => t + 1);
          }}
          disabled={!world}
          style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 800 }}
        >
          Step Tick
        </button>

        <button
          onClick={handleSave}
          disabled={!world || isSaving}
          style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 800 }}
        >
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>

      <button
        onClick={handleBackToCreate}
        disabled={!worldId}
        style={{ padding: 10, borderRadius: 10, fontWeight: 800 }}
      >
        Back to Create
      </button>

      {saveError && <div style={{ color: "#c33", fontSize: 13 }}>{saveError}</div>}

      <div style={{ opacity: 0.8, fontSize: 12 }}>
        <div><b>Ticks:</b> {tickCount}</div>
        <div><b>Sea Level:</b> {world ? world.seaLevel.toFixed(3) : "--"}</div>
        <div><b>Grid:</b> {world ? `${world.gridWidth}×${world.gridHeight}` : "--"}</div>
      </div>

      <div>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>Validation</div>
        {errors.length === 0 ? (
          <div style={{ color: "#2a7", fontSize: 13 }}>No structural errors.</div>
        ) : (
          <div style={{ fontSize: 12, lineHeight: 1.35 }}>
            {errors.slice(0, 10).map((e: any, i: number) => (
              <div key={i} style={{ color: "#c33" }}>
                <b>{e.path}:</b> {e.message}
              </div>
            ))}
            {errors.length > 10 && (
              <div style={{ opacity: 0.7, marginTop: 6 }}>
                (+{errors.length - 10} more)
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ opacity: 0.7, fontSize: 12 }}>
        Sim Mode is scaffolded. Next milestone: Hybrid Realism sim layers (climate circulation,
        hydrology flow networks, erosion, culture drift) per V1.3.
      </div>
    </div>
  );

  if (loading) {
    return (
      <AppShell
        mode="sim"
        title="Sim"
        leftTools={leftTools}
        rightPanel={<div style={{ padding: 12 }}>Loading…</div>}
      />
    );
  }

  if (!world || !preview) {
    return (
      <AppShell
        mode="sim"
        title="Sim"
        leftTools={leftTools}
        rightPanel={
          <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 800 }}>Sim Mode</div>
            <div style={{ marginTop: 8, color: "#c33" }}>Failed to load world.</div>
            <button onClick={handleHome} style={{ marginTop: 12, padding: 10, borderRadius: 10 }}>
              Back Home
            </button>
          </div>
        }
      />
    );
  }

  return (
    <AppShell
      mode="sim"
      title="Sim"
      leftTools={leftTools}
      rightPanel={rightPanel}
      planetPreview={preview}
    />
  );
}

export default SimModeApp;
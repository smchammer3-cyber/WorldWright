// ========================================================
// WORLDWRIGHT -- SIM MODE (V1.3 scaffold)
// File: src/modes/sim/SimModeApp.tsx
// ========================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AppShell } from "../../ui/AppShell";
import { getWorld, saveWorld } from "../../core/worldStorage";
import { validateWorld } from "../../core/worldValidation";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";

import type { WorldBrain } from "../../core/worldSchema";
import { simulateTick } from "../../core/worldSim";

export default function SimModeApp() {
  const nav = useNavigate();
  const { worldId } = useParams();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<any[]>([]);

  const [running, setRunning] = useState(false);
  const [tickMs, setTickMs] = useState(250);
  const [ticks, setTicks] = useState(0);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
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

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setWorld((prev) => (prev ? (simulateTick(structuredClone(prev)) ?? prev) : prev));
      setTicks((t) => t + 1);
    }, Math.max(50, tickMs));

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, tickMs]);

  useEffect(() => {
    if (!world) return;
    setErrors(validateWorld(world));
  }, [world, ticks]);

  const save = async () => {
    if (!world) return;
    const id = await saveWorld(world);
    const refreshed = await getWorld(id);
    if (refreshed) {
      setWorld(refreshed);
      setErrors(validateWorld(refreshed));
    }
  };

  if (loading) return <AppShell mode="sim" title="Sim" rightPanel={<div style={{ padding: 12 }}>Loading…</div>} />;

  if (!world || !preview) {
    return (
      <AppShell
        mode="sim"
        title="Sim"
        rightPanel={
          <div style={{ padding: 12 }}>
            <div style={{ fontWeight: 900 }}>Sim</div>
            <div style={{ color: "#c33", marginTop: 8 }}>Failed to load world.</div>
            <button onClick={() => nav("/")} style={{ marginTop: 12, padding: 10, borderRadius: 10, fontWeight: 900 }}>Home</button>
          </div>
        }
      />
    );
  }

  return (
    <AppShell
      mode="sim"
      title="Sim"
      planetPreview={preview}
      leftTools={[
        { id: "run", label: "Run" },
        { id: "pause", label: "Pause" },
        { id: "step", label: "Step" },
      ]}
      rightPanel={
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 900 }}>{world.metadata.name}</div>
            <button onClick={() => nav("/")} style={{ padding: "6px 10px", borderRadius: 10, fontWeight: 800 }}>Home</button>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setRunning(true)} disabled={running} style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900, opacity: running ? 0.6 : 1 }}>Run</button>
            <button onClick={() => setRunning(false)} disabled={!running} style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900, opacity: !running ? 0.6 : 1 }}>Pause</button>
          </div>

          <div>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Tick Speed: {tickMs}ms</div>
            <input type="range" min={50} max={1000} step={50} value={tickMs} onChange={(e) => setTickMs(Number(e.target.value))} style={{ width: "100%" }} />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                setWorld((prev) => (prev ? (simulateTick(structuredClone(prev)) ?? prev) : prev));
                setTicks((t) => t + 1);
              }}
              style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900 }}
            >
              Step Tick
            </button>
            <button onClick={save} style={{ flex: 1, padding: 10, borderRadius: 10, fontWeight: 900 }}>
              Save
            </button>
          </div>

          <div style={{ opacity: 0.8, fontSize: 12 }}>
            <div><b>Ticks:</b> {ticks}</div>
            <div><b>Sea Level:</b> {world.seaLevel.toFixed(3)}</div>
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
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
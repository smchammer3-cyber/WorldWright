import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell from "../../ui/AppShell";

import { getWorldById, saveWorld } from "../../core/worldStorage";
import type { WorldBrain } from "../../core/worldSchema";

import CreateToolbar from "./CreateToolbar";
import CreateViewport from "./CreateViewport";

export default function CreateModeApp() {
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------
  // Load world
  // --------------------------------------------
  useEffect(() => {
    if (!worldId) {
      setError("No world id provided.");
      setLoading(false);
      return;
    }

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const w = await getWorldById(worldId);
        if (!alive) return;

        if (!w) {
          setError("World not found.");
          setWorld(null);
        } else {
          setWorld(w);
          setError(null);
        }
      } catch (e: any) {
        console.error("Load world failed:", e);
        setError(String(e?.message ?? e));
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [worldId]);

  // --------------------------------------------
  // Save
  // --------------------------------------------
  const handleSave = async () => {
    if (!world) return;

    try {
      const saved = await saveWorld(world);
      setWorld(saved);
    } catch (e: any) {
      console.error("Save failed:", e);
      setError("Save failed. See console for details.");
    }
  };

  // --------------------------------------------
  // Left toolbar
  // --------------------------------------------
  const leftTools = useMemo(
    () => [
      { id: "home", label: "Home", onClick: () => navigate("/") },
      {
        id: "generate",
        label: "Generate",
        onClick: () => navigate("/generate"),
      },
      { id: "create", label: "Create", active: true },
      {
        id: "sim",
        label: "Sim",
        onClick: () => navigate(`/sim/${worldId}`),
        disabled: !worldId,
      },
    ],
    [navigate, worldId]
  );

  if (loading) {
    return (
      <AppShell leftTools={leftTools}>
        <div style={{ padding: 20 }}>Loading world…</div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell leftTools={leftTools}>
        <div style={{ padding: 20, color: "red" }}>{error}</div>
      </AppShell>
    );
  }

  if (!world) {
    return (
      <AppShell leftTools={leftTools}>
        <div style={{ padding: 20 }}>No world loaded.</div>
      </AppShell>
    );
  }

  return (
    <AppShell
      leftTools={leftTools}
      rightPanel={<CreateToolbar world={world} onSave={handleSave} />}
    >
      <CreateViewport world={world} onWorldChange={setWorld} />
    </AppShell>
  );
}
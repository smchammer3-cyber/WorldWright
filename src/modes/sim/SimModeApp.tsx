import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell from "../../ui/AppShell";

import { getWorldById } from "../../core/worldStorage";
import type { WorldBrain } from "../../core/worldSchema";

import SimToolbar from "./SimToolbar";
import SimViewport from "./SimViewport";

export default function SimModeApp() {
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
      {
        id: "create",
        label: "Create",
        onClick: () => navigate(`/create/${worldId}`),
        disabled: !worldId,
      },
      { id: "sim", label: "Sim", active: true },
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
      rightPanel={<SimToolbar world={world} />}
    >
      <SimViewport world={world} />
    </AppShell>
  );
}
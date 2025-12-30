import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppShell, { ToolGroup } from "../../ui/AppShell";
import SimToolbar from "./SimToolbar";
import SimViewport from "./SimViewport";

import type { WorldBrain } from "../../core/worldSchema";
import { getWorldById } from "../../core/worldStorage";

export default function SimModeApp() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!id) return;
      setError(null);
      try {
        const w = await getWorldById(id);
        if (!cancelled) setWorld(w);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Failed to load world.");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toolGroups: ToolGroup[] = useMemo(
    () => [
      {
        id: "nav",
        title: "Navigation",
        items: [
          { id: "home", label: "Home", onClick: () => nav("/") },
          { id: "generate", label: "Generate", onClick: () => nav("/generate") },
          { id: "create", label: "Create", onClick: () => (id ? nav(`/create/${id}`) : null), disabled: !id },
          { id: "sim", label: "Sim", disabled: true },
        ],
      },
      {
        id: "simtools",
        title: "Sim Tools",
        items: [
          { id: "cultures", label: "Cultures", disabled: true },
          { id: "settlements", label: "Settlements", disabled: true },
          { id: "trade", label: "Trade Routes", disabled: true },
          { id: "time", label: "Time", disabled: true },
        ],
      },
    ],
    [nav, id]
  );

  if (error && !world) {
    return (
      <AppShell mode="sim" title="Sim" subtitle={error} onGoHome={() => nav("/")}>
        <div style={{ padding: 18 }}>{error}</div>
      </AppShell>
    );
  }

  if (!world) {
    return (
      <AppShell mode="sim" title="Sim" subtitle="Loading…" onGoHome={() => nav("/")}>
        <div style={{ padding: 18 }}>Loading…</div>
      </AppShell>
    );
  }

  return (
    <AppShell
      mode="sim"
      title={world.metadata.name || "Untitled World"}
      subtitle={`Sim • seed ${world.metadata.seed}`}
      onGoHome={() => nav("/")}
      onToggleMode={(m) => nav(`/${m}/${world.metadata.id}`)}
      toolGroups={toolGroups}
      rightPanel={<SimToolbar world={world} />}
    >
      <SimViewport world={world} />
    </AppShell>
  );
}
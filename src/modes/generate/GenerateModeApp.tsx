import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell, { ToolGroup } from "../../ui/AppShell";
import GenerateControls from "./GenerateControls";
import GeneratePreview from "./GeneratePreview";

import type { WorldBrain } from "../../core/worldSchema";
import type { GeneratorParams } from "../../core/worldGenerator";
import { generateWorldFromParams } from "../../core/worldGenerator";
import { saveWorld } from "../../core/worldStorage";

export default function GenerateModeApp() {
  const nav = useNavigate();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toolGroups: ToolGroup[] = useMemo(
    () => [
      {
        id: "nav",
        title: "Navigation",
        items: [
          { id: "home", label: "Home", onClick: () => nav("/") },
          { id: "generate", label: "Generate", disabled: true },
          {
            id: "create",
            label: "Create",
            onClick: () => (currentId ? nav(`/create/${currentId}`) : null),
            disabled: !currentId,
          },
          { id: "sim", label: "Sim", onClick: () => (currentId ? nav(`/sim/${currentId}`) : null), disabled: !currentId },
        ],
      },
    ],
    [nav, currentId]
  );

  function handleGenerate(params: GeneratorParams) {
    setError(null);
    try {
      const w = generateWorldFromParams(params);
      setWorld(w);
      setCurrentId(null);
    } catch (e) {
      console.error(e);
      setError("Generate failed. See console for details.");
    }
  }

  async function handleSave() {
    if (!world) return;

    setSaving(true);
    setError(null);
    try {
      const saved = await saveWorld(world);
      setCurrentId(saved.metadata.id);
      nav(`/create/${saved.metadata.id}`);
    } catch (e) {
      console.error(e);
      setError("Save failed. See console for details.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell
      mode="generate"
      title="Generate"
      subtitle={
        world
          ? `seed ${world.metadata.seed} • ${world.metadata.gridWidth}×${world.metadata.gridHeight}`
          : "Choose parameters and generate a world"
      }
      onGoHome={() => nav("/")}
      toolGroups={toolGroups}
      rightPanel={<GenerateControls onGenerate={handleGenerate} onSave={handleSave} saving={saving} disabled={!world} />}
    >
      <GeneratePreview world={world} error={error} />
    </AppShell>
  );
}
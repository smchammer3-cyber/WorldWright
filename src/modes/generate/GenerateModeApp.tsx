import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell, { ToolGroup } from "../../ui/AppShell";
import { GeneratorParams } from "../../core/worldGenerator";
import { worldSession } from "../../core/worldSession";
import { makePlanetPreviewFromWorldBrain } from "../../core/planetRenderer";
import { saveWorld } from "../../core/worldStorage";

import GenerateControls from "./GenerateControls";
import GeneratePreview from "./GeneratePreview";

export default function GenerateModeApp() {
  const nav = useNavigate();

  const [world, setWorld] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!world) return null;
    return makePlanetPreviewFromWorldBrain(world);
  }, [world]);

  async function handleGenerate(params: GeneratorParams) {
    setError(null);
    try {
      // Create a new world via worldSession. Awaiting ensures the world has
      // been generated, normalized, recomputed and validated before we read
      // it. worldSession will notify subscribers automatically.
      await worldSession.createWorld(params);
      const w = worldSession.getWorld();
      setWorld(w);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Generate failed.");
    }
  }

  async function handleSave() {
    if (!world) return;

    setSaving(true);
    setError(null);
    try {
      const saved = await saveWorld(world);
      nav(`/create/${saved.metadata.id}`);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const toolGroups: ToolGroup[] = [
    {
      id: "generate",
      title: "Generate",
      tools: [
        { id: "gen", label: "Generate", disabled: true },
        { id: "save", label: saving ? "Saving…" : "Save → Create", disabled: !world || saving, onClick: handleSave },
      ],
    },
  ];

  const rightPanel = (
    <GenerateControls onGenerate={handleGenerate} onSave={handleSave} saving={saving} disabled={!world} />
  );

  return (
    <AppShell
      mode="generate"
      onGoHome={() => nav("/")}
      worldName={world?.metadata?.name || "Generate"}
      isDirty={true}
      rightPanel={rightPanel}
      toolGroups={toolGroups}
    >
      <GeneratePreview world={world} error={error} />
    </AppShell>
  );
}
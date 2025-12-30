import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "../../ui/AppShell";

import { generateWorldFromParams } from "../../core/worldGenerator";
import { saveWorld } from "../../core/worldStorage";
import type { WorldBrain } from "../../core/worldSchema";

import GenerateControls from "./GenerateControls";
import GeneratePreview from "./GeneratePreview";

export default function GenerateModeApp() {
  const navigate = useNavigate();

  const [world, setWorld] = useState<WorldBrain | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------
  // Generation
  // --------------------------------------------
  const handleGenerate = useCallback((params: any) => {
    try {
      const w = generateWorldFromParams(params);
      setWorld(w);
      setError(null);
    } catch (e: any) {
      console.error("Generate failed:", e);
      setError(String(e?.message ?? e));
    }
  }, []);

  // --------------------------------------------
  // Save & open Create
  // --------------------------------------------
  const handleSave = useCallback(async () => {
    if (!world) return;

    try {
      setSaving(true);
      const saved = await saveWorld(world);
      navigate(`/create/${saved.metadata.id}`);
    } catch (e: any) {
      console.error("Save failed:", e);
      setError("Save failed. See console for details.");
    } finally {
      setSaving(false);
    }
  }, [world, navigate]);

  const currentId = world?.metadata?.id ?? null;

  // --------------------------------------------
  // Left toolbar
  // --------------------------------------------
  const leftTools = [
    { id: "home", label: "Home", onClick: () => navigate("/") },
    { id: "generate", label: "Generate", active: true },
    {
      id: "create",
      label: "Create",
      onClick: () => currentId && navigate(`/create/${currentId}`),
      disabled: !currentId,
    },
    {
      id: "sim",
      label: "Sim",
      onClick: () => currentId && navigate(`/sim/${currentId}`),
      disabled: !currentId,
    },
  ];

  return (
    <AppShell
      leftTools={leftTools}
      rightPanel={
        <GenerateControls
          onGenerate={handleGenerate}
          onSave={handleSave}
          saving={saving}
          disabled={!world}
        />
      }
    >
      <GeneratePreview world={world} error={error} />
    </AppShell>
  );
}
import React, { useMemo } from "react";
import type { WorldBrain } from "../../core/worldSchema";

type Props = {
  world: WorldBrain;
};

export default function SimToolbar({ world }: Props) {
  const meta = world.metadata;

  const info = useMemo(() => {
    return `${meta.styleMode} • ${meta.gridWidth}×${meta.gridHeight} • seed ${meta.seed}`;
  }, [meta]);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 10 }}>Sim</div>

      <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 10 }}>{info}</div>

      <div style={{ fontSize: 11, opacity: 0.6, lineHeight: 1.35 }}>
        Sim mode overlays will be mounted here per blueprint (cultures, settlements, drift).
        This build keeps Sim stable as a viewer while the spine and storage stay deterministic.
      </div>
    </div>
  );
}
import React, { useMemo, useState } from 'react';
import Globe3D from '../render/Globe3D';
import { createDefaultGeneratorParams, generateWorldFromParams, type GeneratorParams } from '../core/worldGenerator';
import { recomputeWorld } from '../core/worldRecompute';
import { applyGeneratedGeographyPipeline } from '../core/worldGeographyPipeline';
import { makePlanetPreviewFromWorldBrain, type PlanetPreviewMode } from '../core/planetRenderer';

const SNAPSHOT_CASES = {
  'earthlike-baseline-01': {
    label: 'Earthlike baseline',
    params: {
      planetProfile: 'EARTHLIKE_ROCKY',
      seed: 'earthlike-baseline-01',
      waterInventory: 0.54,
      seaLevelOffset: 50,
      continentCount: 4,
    },
  },
  'wet-high-sea-01': {
    label: 'Wet high sea',
    params: {
      planetProfile: 'EARTHLIKE_ROCKY',
      seed: 'wet-high-sea-01',
      waterInventory: 0.86,
      seaLevelOffset: 68,
      continentCount: 5,
    },
  },
  'dry-rocky-01': {
    label: 'Dry rocky',
    params: {
      planetProfile: 'ROCKY_ALIEN',
      seed: 'dry-rocky-01',
      waterInventory: 0.04,
      seaLevelOffset: 24,
      continentCount: 4,
      greenhouseStrength: 0.18,
    },
  },
  'stagnant-lid-01': {
    label: 'Stagnant lid',
    params: {
      planetProfile: 'ROCKY_ALIEN',
      seed: 'stagnant-lid-01',
      waterInventory: 0.20,
      coreHeatIntent: 0.04,
      compositionRadioactivity: 0.05,
      tidalHeatingIntent: 0,
      stagnantLidBias: 0.95,
      planetAge: 98,
      plateActivity: 5,
    },
  },
  'ice-shell-01': {
    label: 'Ice shell',
    params: {
      planetProfile: 'ICE_SHELL_OCEAN_WORLD',
      seed: 'ice-shell-01',
      waterInventory: 0.90,
      tidalHeatingIntent: 0.80,
      orbitalDistanceAU: 2.0,
    },
  },
} as const;

const SNAPSHOT_VIEWS = {
  front: { label: 'Front', rotation: { x: 0, y: 0 } },
  east: { label: 'East', rotation: { x: 0, y: Math.PI / 2 } },
  west: { label: 'West', rotation: { x: 0, y: -Math.PI / 2 } },
  north: { label: 'North tilt', rotation: { x: -0.62, y: 0 } },
  south: { label: 'South tilt', rotation: { x: 0.62, y: 0 } },
} as const;

const SNAPSHOT_MODES: PlanetPreviewMode[] = [
  'FINAL',
  'HEIGHT',
  'LAND_WATER',
  'OCEAN_DEPTH',
  'CRUST_PROVINCE',
  'CONTINENTS',
  'PLATES',
];

export default function VisualSnapshotHarness() {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get('case') ?? 'earthlike-baseline-01';
  const mode = parseMode(params.get('mode'));
  const viewId = parseView(params.get('view'));
  const testCase = SNAPSHOT_CASES[caseId as keyof typeof SNAPSHOT_CASES] ?? SNAPSHOT_CASES['earthlike-baseline-01'];
  const view = SNAPSHOT_VIEWS[viewId];
  const [ready, setReady] = useState(false);

  const world = useMemo(() => {
    const generated = generateWorldFromParams({
      ...createDefaultGeneratorParams(),
      width: 128,
      height: 64,
      ...testCase.params,
    } as GeneratorParams);
    recomputeWorld(generated, ['GENERATED']);
    applyGeneratedGeographyPipeline(generated);
    return generated;
  }, [caseId]);

  const preview = useMemo(() => makePlanetPreviewFromWorldBrain(world, mode), [world, mode]);
  const snapshotKey = `${caseId}:${mode}:${viewId}`;

  return (
    <main
      data-testid="globe-snapshot-page"
      data-snapshot-ready={ready ? 'true' : 'false'}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        background: '#02040a',
        color: '#e8eefc',
        display: 'grid',
        gridTemplateRows: '56px 1fr',
        overflow: 'hidden',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '10px 16px',
          background: 'rgba(7, 12, 24, 0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 14 }}>{testCase.label}</div>
          <div style={{ opacity: 0.66, fontSize: 11 }}>{caseId}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 800 }}>
          <div>{mode}</div>
          <div style={{ opacity: 0.66 }}>{view.label}</div>
        </div>
      </header>
      <section data-testid="globe-snapshot-stage" style={{ position: 'relative', minHeight: 0 }}>
        <Globe3D
          world={world}
          preview={preview}
          initialRotation={view.rotation}
          snapshotKey={snapshotKey}
          hideControls
          onSnapshotReady={() => setReady(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </section>
    </main>
  );
}

export function listVisualSnapshotCases(): string[] {
  return Object.keys(SNAPSHOT_CASES);
}

export function listVisualSnapshotModes(): PlanetPreviewMode[] {
  return [...SNAPSHOT_MODES];
}

export function listVisualSnapshotViews(): string[] {
  return Object.keys(SNAPSHOT_VIEWS);
}

function parseMode(value: string | null): PlanetPreviewMode {
  return SNAPSHOT_MODES.includes(value as PlanetPreviewMode) ? (value as PlanetPreviewMode) : 'FINAL';
}

function parseView(value: string | null): keyof typeof SNAPSHOT_VIEWS {
  return value != null && value in SNAPSHOT_VIEWS ? (value as keyof typeof SNAPSHOT_VIEWS) : 'front';
}

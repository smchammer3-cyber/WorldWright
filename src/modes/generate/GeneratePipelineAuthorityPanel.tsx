import React from 'react';
import {
  pipelineFieldGroupLabel,
  type GeneratePipelineAuthorityLedger,
  type PipelineAuthorityLevel,
  type PipelineFieldChange,
  type PipelineFieldGroup,
} from '../../core/worldGeneratePipelineLedger';

type Props = {
  ledger: GeneratePipelineAuthorityLedger;
};

const LEVEL_COLOR: Record<PipelineAuthorityLevel, string> = {
  ok: '#8dffba',
  watch: '#ffe38a',
  bad: '#ff9a9a',
};

export default function GeneratePipelineAuthorityPanel({ ledger }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>{ledger.grid} • seed {ledger.seed}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.64)' }}>
          {ledger.summary.badCount} bad • {ledger.summary.watchCount} watch
        </div>
      </div>

      {ledger.summary.firstFailedGate && (
        <div
          style={{
            marginBottom: 8,
            padding: '6px 8px',
            borderRadius: 8,
            border: '1px solid rgba(255,227,138,0.28)',
            background: 'rgba(255,227,138,0.10)',
            color: 'rgba(255,255,255,0.74)',
            fontSize: 10,
            lineHeight: 1.35,
          }}
        >
          <div style={{ color: LEVEL_COLOR[ledger.summary.firstFailedGate.level], fontWeight: 900 }}>
            First failed gate: {ledger.summary.firstFailedGate.firstFailedLayer} ({ledger.summary.firstFailedGate.authorityCategory})
          </div>
          <div>{ledger.summary.firstFailedGate.failedConsequence}</div>
          <div style={{ color: 'rgba(255,255,255,0.58)' }}>{ledger.summary.firstFailedGate.recommendedNextFix}</div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.72fr 1.35fr 1.25fr 1.25fr 0.72fr 0.72fr 1.45fr',
          gap: '5px 8px',
          fontSize: 10,
          alignItems: 'baseline',
          minWidth: 1040,
        }}
      >
        <Header label="Stage" />
        <Header label="Phase" />
        <Header label="Expected reads" />
        <Header label="Allowed writes" />
        <Header label="Actual writes" />
        <Header label="Terrain" />
        <Header label="Flip" />
        <Header label="Warnings" />

        {ledger.stages.map((stage) => (
          <React.Fragment key={stage.id}>
            <div title={stage.authority} style={{ color: LEVEL_COLOR[stage.level], fontWeight: 900 }}>{stage.label}</div>
            <div style={{ color: 'rgba(255,255,255,0.62)' }}>{phaseLabel(stage.phase)}</div>
            <GroupList groups={stage.expectedReads} />
            <GroupList groups={stage.allowedWrites} />
            <ActualWrites changes={stage.actualWrites} unexpected={stage.unexpectedWrites} />
            <div style={{ color: stage.terrainWriteShare > 0 ? '#ffe38a' : 'rgba(255,255,255,0.42)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {stage.terrainWriteShare > 0 ? `${percent(stage.terrainWriteShare)} / Δ${fixed(stage.heightDeltaMean)}` : '—'}
            </div>
            <div style={{ color: stage.topologyFlipShare > 0 ? '#ffe38a' : 'rgba(255,255,255,0.42)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {stage.topologyFlipShare > 0 ? percent(stage.topologyFlipShare) : '—'}
            </div>
            <WarningList warnings={stage.warnings} collections={stage.collectionChanges} />
          </React.Fragment>
        ))}
      </div>

      <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.54)', fontSize: 10, lineHeight: 1.35 }}>
        Read/write columns are the blueprint contract. Actual writes are measured by replaying Generate Mode and diffing fields after every fired stage. Terrain shows share of cells whose total height changed plus mean absolute height delta. Flip shows land/water topology changes.
      </div>
      <div style={{ marginTop: 5, color: 'rgba(255,255,255,0.54)', fontSize: 10, lineHeight: 1.35 }}>
        First terrain writer: {ledger.summary.firstTerrainWriter ?? 'none'} • First derived writer: {ledger.summary.firstDerivedWriter ?? 'none'} • First backward-risk stage: {ledger.summary.firstBackwardRisk ?? 'none'} • First unexpected writer: {ledger.summary.firstUnexpectedWriter ?? 'none'}
      </div>
    </div>
  );
}

function Header({ label }: { label: string }) {
  return <div style={{ color: 'rgba(255,255,255,0.48)', fontWeight: 900 }}>{label}</div>;
}

function GroupList({ groups }: { groups: PipelineFieldGroup[] }) {
  if (groups.length === 0) return <div style={{ color: 'rgba(255,255,255,0.38)' }}>source</div>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {groups.map((group) => <GroupPill key={group} group={group} />)}
    </div>
  );
}

function GroupPill({ group }: { group: PipelineFieldGroup }) {
  return (
    <span
      title={pipelineFieldGroupLabel(group)}
      style={{
        display: 'inline-flex',
        borderRadius: 999,
        padding: '1px 5px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.07)',
        color: 'rgba(255,255,255,0.70)',
        whiteSpace: 'nowrap',
      }}
    >
      {shortGroup(group)}
    </span>
  );
}

function ActualWrites({ changes, unexpected }: { changes: PipelineFieldChange[]; unexpected: PipelineFieldChange[] }) {
  if (changes.length === 0) return <div style={{ color: 'rgba(255,255,255,0.38)' }}>none</div>;
  const unexpectedKeys = new Set(unexpected.map((change) => `${change.group}:${change.field}`));
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {changes.slice(0, 5).map((change) => {
        const bad = unexpectedKeys.has(`${change.group}:${change.field}`);
        return (
          <span
            key={`${change.group}:${change.field}`}
            title={`${pipelineFieldGroupLabel(change.group)}.${change.field}: ${percent(change.changedShare)} of cells${change.maxDelta ? `, max Δ ${fixed(change.maxDelta)}` : ''}`}
            style={{
              display: 'inline-flex',
              borderRadius: 999,
              padding: '1px 5px',
              border: bad ? '1px solid rgba(255,120,120,0.42)' : '1px solid rgba(255,255,255,0.12)',
              background: bad ? 'rgba(255,80,80,0.16)' : 'rgba(255,255,255,0.07)',
              color: bad ? '#ff9a9a' : 'rgba(255,255,255,0.72)',
              whiteSpace: 'nowrap',
            }}
          >
            {change.field} {percent(change.changedShare)}
          </span>
        );
      })}
      {changes.length > 5 && <span style={{ color: 'rgba(255,255,255,0.45)' }}>+{changes.length - 5}</span>}
    </div>
  );
}

function WarningList({ warnings, collections }: { warnings: string[]; collections: string[] }) {
  const items = warnings.length > 0 ? warnings : collections;
  if (items.length === 0) return <div style={{ color: 'rgba(255,255,255,0.38)' }}>—</div>;
  return (
    <div style={{ color: warnings.length > 0 ? '#ffe38a' : 'rgba(255,255,255,0.55)', lineHeight: 1.25 }}>
      {items.slice(0, 2).map((warning, index) => <div key={index}>{warning}</div>)}
      {items.length > 2 && <div>+{items.length - 2} more</div>}
    </div>
  );
}

function shortGroup(group: PipelineFieldGroup): string {
  switch (group) {
    case 'terrain': return 'terrain';
    case 'derivedSurface': return 'surface';
    case 'plateCause': return 'plate';
    case 'skeletonCause': return 'skeleton';
    case 'crustCause': return 'crust';
    case 'featureCause': return 'feature';
    case 'climateDerived': return 'climate';
    case 'biomeDerived': return 'biome';
    case 'hydrologyDerived': return 'water';
    case 'worldCollections': return 'collections';
  }
}

function phaseLabel(phase: string): string {
  return phase.replace(/-/g, ' ');
}

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function fixed(value: number): string {
  return value.toFixed(3);
}

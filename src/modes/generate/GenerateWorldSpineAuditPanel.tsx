import React from 'react';
import type { WorldSpineAuthorityAudit, WorldSpineRiskLevel } from '../../core/worldSpineAuthorityAudit';

type Props = {
  audit: WorldSpineAuthorityAudit;
};

export default function GenerateWorldSpineAuditPanel({ audit }: Props) {
  return (
    <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 12 }}>World Spine authority audit</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
            Layer stack snapshots from source identity → causes → terrain → final explanation labels.
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{audit.grid} • seed {audit.seed}</div>
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Authority contract</div>
          <ul style={{ margin: '5px 0 0 16px', padding: 0, color: 'rgba(255,255,255,0.70)', fontSize: 10, lineHeight: 1.35 }}>
            {audit.contract.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </section>

        <section style={sectionStyle}>
          <div style={sectionTitleStyle}>Top findings</div>
          <div style={{ display: 'grid', gap: 4, marginTop: 5 }}>
            {audit.topFindings.map((finding) => (
              <div key={finding} style={{ color: 'rgba(255,255,255,0.76)', fontSize: 10, lineHeight: 1.35 }}>• {finding}</div>
            ))}
          </div>
        </section>

        <section style={{ ...sectionStyle, overflowX: 'auto' }}>
          <div style={sectionTitleStyle}>Stage snapshots</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.75fr 0.75fr 0.75fr 0.9fr 2.4fr', gap: '5px 8px', minWidth: 850, marginTop: 6, fontSize: 10, alignItems: 'baseline' }}>
            <Header label="Stage" />
            <Header label="Terrain" />
            <Header label="Flip" />
            <Header label="Risk" />
            <Header label="Layers" />
            <Header label="Finding" />
            {audit.stages.map((stage) => (
              <React.Fragment key={stage.id}>
                <div title={stage.summary} style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 900 }}>{stage.label}</div>
                <div style={cellStyle}>{stage.terrainChanged ? 'changed' : '—'}</div>
                <div style={cellStyle}>{stage.topologyFlipped ? 'yes' : '—'}</div>
                <RiskBadge level={stage.risk} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {stage.layers.map((layer) => <LayerChip key={layer.id} label={layer.label} level={layer.risk} />)}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.70)', lineHeight: 1.35 }}>{stage.findings[0]}</div>
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Header({ label }: { label: string }) {
  return <div style={{ color: 'rgba(255,255,255,0.48)', fontWeight: 900 }}>{label}</div>;
}

function RiskBadge({ level }: { level: WorldSpineRiskLevel }) {
  const colors = riskColors(level);
  return <span style={{ ...cellStyle, ...colors, borderRadius: 999, padding: '1px 6px', fontWeight: 900, textTransform: 'uppercase', justifySelf: 'start' }}>{level === 'problem' ? 'bad' : level}</span>;
}

function LayerChip({ label, level }: { label: string; level: WorldSpineRiskLevel }) {
  const colors = riskColors(level);
  return <span title={label} style={{ ...colors, borderRadius: 999, padding: '1px 6px', fontWeight: 800, whiteSpace: 'nowrap' }}>{label}</span>;
}

function riskColors(level: WorldSpineRiskLevel) {
  if (level === 'problem') return { background: 'rgba(255, 107, 107, 0.18)', color: '#ffaaaa' };
  if (level === 'watch') return { background: 'rgba(255, 206, 86, 0.18)', color: '#ffe38a' };
  return { background: 'rgba(87, 217, 143, 0.16)', color: '#8dffba' };
}

const sectionStyle: React.CSSProperties = {
  padding: '7px 8px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.10)',
};

const sectionTitleStyle: React.CSSProperties = {
  color: '#fff',
  fontWeight: 900,
  fontSize: 11,
};

const cellStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.76)',
  fontVariantNumeric: 'tabular-nums',
};

import { GEOLOGY_AUDIT_SCHEMA_VERSION, type GeologyRule, type RegistrySnapshot } from './contracts';

export const DEFAULT_GEOLOGY_RULES: GeologyRule[] = [
  {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    ruleId: 'tectonics.collision.continent-continent.young-orogen',
    title: 'Young continental collision belt',
    domain: 'tectonics',
    summary: 'Continental convergence should express terrain through a causally connected orogenic system rather than an isolated radial influence field.',
    appliesWhen: {
      boundaryTypes: ['convergent'],
      crustPairs: [['continental', 'continental']],
      featureTypesAny: ['young-orogen', 'continental-collision'],
    },
    expectedMorphology: [
      'Relief is organized as a connected or segmented belt associated with the convergent system.',
      'The belt may curve or branch, but should not reduce to an unexplained continent-scale circular dome.',
      'Drainage and adjacent basins should respond to the principal relief system.',
    ],
    metricExpectations: [],
    thresholdExpectations: [
      {
        parameter: 'surfaceAgeNormalized',
        metricId: 'localReliefSharpness',
        relation: 'nonincreasing',
        rationale: 'All else equal, aging and denudation should not systematically sharpen a formerly young orogen.',
      },
      {
        parameter: 'erosionStrength',
        metricId: 'drainageIntegration',
        relation: 'nondecreasing',
        rationale: 'Within an applicable regime, stronger fluvial processing should not systematically destroy drainage integration.',
      },
    ],
    warningPatterns: ['isolated-round-dome', 'uniform-boundary-distance-ridge', 'repeated-radial-kernel', 'plate-mask-visible-in-height'],
    validExceptions: ['impact-overprint', 'caldera-complex', 'intraplate-dome-with-explicit-cause'],
    evidenceStatus: 'research-required',
    evidenceNotes: ['Quantitative ranges must be populated from curated observational and controlled references before gating CI.'],
    version: '1.0.0',
  },
  {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    ruleId: 'oceans.margin.passive.continental-shelf',
    title: 'Passive continental margin and shelf',
    domain: 'oceans',
    summary: 'Passive margins should express a terrain-connected transition from continent to shelf to basin rather than a detached submerged copy of continental authority.',
    appliesWhen: {
      featureTypesAny: ['passive-margin', 'continental-shelf'],
    },
    expectedMorphology: [
      'Shelf geometry follows the regional elevation transition and varies along the margin.',
      'Shallow submerged terrain remains connected to plausible continental support.',
      'Deep ocean basins do not retain broad continent-core silhouettes without an explicit cause.',
    ],
    metricExpectations: [],
    thresholdExpectations: [
      {
        parameter: 'seaLevelNormalized',
        metricId: 'inundatedConnectedLowlandArea',
        relation: 'nondecreasing',
        rationale: 'Rising sea level should expand inundation through connected low terrain rather than reveal a separate authority mask.',
      },
    ],
    warningPatterns: ['submerged-continent-ghost', 'uniform-shelf-ring', 'detached-shallow-copy', 'continent-core-visible-in-bathymetry'],
    validExceptions: ['microcontinent', 'flooded-rifted-fragment', 'large-igneous-province-with-explicit-cause'],
    evidenceStatus: 'research-required',
    evidenceNotes: ['Reference families must distinguish valid microcontinents from WorldWright authority ghosts.'],
    version: '1.0.0',
  },
  {
    schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
    ruleId: 'authority.derived-terrain.no-direct-mask-leakage',
    title: 'Derived terrain must not expose implementation masks',
    domain: 'causal-authority',
    summary: 'Internal plate, province, skeleton, and influence fields may cause geological features, but their raw categorical shapes must not be directly legible in final terrain without a geological intermediary.',
    appliesWhen: {},
    expectedMorphology: [
      'Final terrain preserves causal relationships without exposing categorical storage boundaries.',
      'Sharp terrain transitions require a geological feature or material transition that explains them.',
      'Changing a detail seed may alter local form without revealing or relocating the authority graph itself.',
    ],
    metricExpectations: [],
    thresholdExpectations: [],
    warningPatterns: ['plate-cell-imprint', 'province-seam', 'skeleton-stamp', 'radial-falloff-kernel', 'projection-seam'],
    validExceptions: ['explicit-fault-scarp', 'lithologic-contact-with-differential-erosion', 'coastline-crossing-supported-by-elevation'],
    evidenceStatus: 'provisional',
    evidenceNotes: ['This rule is an architectural invariant; numeric leakage thresholds remain provisional until calibrated against approved and rejected cases.'],
    version: '1.0.0',
  },
];

export const EMPTY_DEFAULT_REFERENCE_REGISTRY: RegistrySnapshot = {
  schemaVersion: GEOLOGY_AUDIT_SCHEMA_VERSION,
  registryVersion: 'foundation-1',
  rules: DEFAULT_GEOLOGY_RULES,
  references: [],
};

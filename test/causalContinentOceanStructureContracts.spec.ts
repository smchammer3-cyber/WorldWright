import { describe, expect, it } from 'vitest';
import {
  C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
  C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1,
  createContinentOceanStructureState,
  createScientificRange,
  createSphericalAnchor,
  createSphericalExtent,
  hashCausalPayload,
  validateContinentOceanStructureState,
  type ContinentOceanStructuralRegionV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess, validateAuthorityProcessRegistry } from '../src/core/worldAuthority';

const premiseHash = hashCausalPayload('WorldWright/test/c1-premise/v1', { premise: 'controlled' });
const spineHash = hashCausalPayload('WorldWright/test/c1-spine/v1', { spine: 'controlled' });
const projectionHash = hashCausalPayload('WorldWright/test/c1-projection/v1', { projection: 'controlled' });

const regions: readonly ContinentOceanStructuralRegionV1[] = [
  {
    schemaVersion: 1,
    regionId: 'region-a-continental-interior',
    anchor: createSphericalAnchor(25, -40),
    extent: createSphericalExtent(28, 35, 0.45),
    interpretationStatus: 'CANDIDATE_SET',
    dominantCandidateRoleId: 'CONTINENTAL_INTERIOR',
    candidates: [
      {
        schemaVersion: 1,
        roleId: 'CONTINENTAL_INTERIOR',
        supportRange: createScientificRange(0.72, 0.9, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-a.continental-interior'),
        sourceReferences: [
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'continentalKernelInfluence',
            evidenceIds: ['evidence.c1.continental-field'],
          },
          {
            schemaVersion: 1,
            sourceKind: 'SPINE_NODE',
            sourceId: 'continental-kernel-01',
            spineNodeFamily: 'CONTINENTAL_KERNEL',
            evidenceIds: ['evidence.c1.continental-node'],
          },
        ],
        evidenceIds: ['evidence.c1.region-a'],
        contradictionIds: [],
        limitations: ['Candidate structural identity is not land, elevation, or terrain authority.'],
      },
    ],
    ambiguity: {
      schemaVersion: 1,
      ambiguityStatus: 'NONE',
      competingRoleIds: ['CONTINENTAL_INTERIOR'],
      reasonIds: [],
      blockingReasonIds: [],
    },
    ghostAssessment: {
      schemaVersion: 1,
      riskLevel: 'NONE',
      disposition: 'NOT_APPLICABLE',
      signalIds: [],
      relatedSourceIds: [],
      physicallySuppressesOutput: false,
      limitations: ['No ghost-risk signal is asserted for this controlled contract fixture.'],
    },
    evidenceIds: ['evidence.c1.region-a'],
    contradictionIds: [],
    limitations: ['C1 region is a detached interpretation envelope only.'],
  },
  {
    schemaVersion: 1,
    regionId: 'region-b-margin-ambiguity',
    anchor: createSphericalAnchor(-12, 80),
    extent: createSphericalExtent(18, 110, 0.7),
    interpretationStatus: 'AMBIGUOUS',
    candidates: [
      {
        schemaVersion: 1,
        roleId: 'CONTINENTAL_SHELF',
        supportRange: createScientificRange(0.45, 0.68, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-b.shelf'),
        sourceReferences: [
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'continentalKernelInfluence',
            evidenceIds: ['evidence.c1.margin-fields'],
          },
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'oceanBasinInfluence',
            evidenceIds: ['evidence.c1.margin-fields'],
          },
        ],
        evidenceIds: ['evidence.c1.region-b'],
        contradictionIds: [],
        limitations: ['Shelf candidacy is not a water-depth or inundation conclusion.'],
      },
      {
        schemaVersion: 1,
        roleId: 'CONTINENTAL_SLOPE',
        supportRange: createScientificRange(0.42, 0.7, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-b.slope'),
        sourceReferences: [
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'continentalKernelInfluence',
            evidenceIds: ['evidence.c1.margin-fields'],
          },
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'oceanBasinInfluence',
            evidenceIds: ['evidence.c1.margin-fields'],
          },
        ],
        evidenceIds: ['evidence.c1.region-b'],
        contradictionIds: [],
        limitations: ['Slope candidacy is not solved bathymetry.'],
      },
    ],
    ambiguity: {
      schemaVersion: 1,
      ambiguityStatus: 'OPEN',
      competingRoleIds: ['CONTINENTAL_SHELF', 'CONTINENTAL_SLOPE'],
      reasonIds: ['c1.overlapping-margin-support'],
      blockingReasonIds: [],
    },
    ghostAssessment: {
      schemaVersion: 1,
      riskLevel: 'LOW',
      disposition: 'REVIEW_REQUIRED',
      signalIds: ['c1.radial-kernel-boundary-softness'],
      relatedSourceIds: ['continentalKernelInfluence', 'oceanBasinInfluence'],
      physicallySuppressesOutput: false,
      limitations: ['Ghost review may change diagnostic candidacy only; it cannot alter physical output.'],
    },
    evidenceIds: ['evidence.c1.region-b'],
    contradictionIds: [],
    limitations: ['Competing structural roles remain explicit.'],
  },
  {
    schemaVersion: 1,
    regionId: 'region-c-unresolved',
    anchor: createSphericalAnchor(70, 15),
    extent: createSphericalExtent(12),
    interpretationStatus: 'UNRESOLVED',
    candidates: [
      {
        schemaVersion: 1,
        roleId: 'UNRESOLVED',
        supportRange: createScientificRange(0.6, 1, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-c.unresolved'),
        sourceReferences: [
          {
            schemaVersion: 1,
            sourceKind: 'PROCESS_FIELD',
            sourceId: 'projectionConfidence',
            evidenceIds: ['evidence.c1.low-confidence'],
          },
        ],
        evidenceIds: ['evidence.c1.region-c'],
        contradictionIds: [],
        limitations: ['Unresolved is an explicit result, not a silent default to continent or ocean.'],
      },
    ],
    ambiguity: {
      schemaVersion: 1,
      ambiguityStatus: 'NONE',
      competingRoleIds: ['UNRESOLVED'],
      reasonIds: ['c1.insufficient-structural-evidence'],
      blockingReasonIds: [],
    },
    ghostAssessment: {
      schemaVersion: 1,
      riskLevel: 'HIGH',
      disposition: 'REVIEW_REQUIRED',
      signalIds: ['c1.low-projection-confidence'],
      relatedSourceIds: ['projectionConfidence'],
      physicallySuppressesOutput: false,
      limitations: ['High ghost risk blocks interpretation confidence but does not suppress terrain or rendering.'],
    },
    evidenceIds: ['evidence.c1.region-c'],
    contradictionIds: [],
    limitations: ['C1 preserves insufficient evidence as unresolved.'],
  },
];

describe('C1 detached continent-ocean structural-role contracts', () => {
  it('creates deterministic immutable candidate roles without physical authority', () => {
    const state = createState(regions);
    const replay = createState(regions);

    validateContinentOceanStructureState(state);
    expect(state).toEqual(replay);
    expect(state.contentHash).toEqual(replay.contentHash);
    expect(state.definitions).toEqual(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1);
    expect(state.regions).toHaveLength(3);
    expect(state.authorityMode).toBe('CAUSAL_SHADOW');
    expect(state.physicalGeneratorAuthority).toBe('LEGACY');
    expect(state.interpretationMode).toBe('DETACHED_DIAGNOSTIC');
    expect(state.scientificStatus).toBe('PARTIAL');
    expect(state.physicalAuthority).toBe(false);
    expect(state.structuralRoleAuthority).toBe(false);
    expect(state.terrainAuthority).toBe(false);
    expect(state.landWaterAuthority).toBe(false);
    expect(state.definitions.every((definition) =>
      definition.physicalAuthority === false
      && definition.structuralRoleAuthority === false
      && definition.terrainAuthority === false
      && definition.landAuthority === false
      && definition.waterAuthority === false
      && definition.materialAuthority === false)).toBe(true);
    expect(state.regions.find((region) => region.regionId === 'region-b-margin-ambiguity')?.ambiguity.ambiguityStatus).toBe('OPEN');
    expect(state.regions.find((region) => region.regionId === 'region-c-unresolved')?.candidates[0].roleId).toBe('UNRESOLVED');
    expect(Object.isFrozen(state)).toBe(true);
    expect(Object.isFrozen(state.regions)).toBe(true);
    expect(Buffer.byteLength(JSON.stringify(state), 'utf8')).toBeLessThanOrEqual(C1_CONTINENT_OCEAN_STRUCTURE_LIMITS_V1.maximumSerializedBytes);
    expect(JSON.stringify(state)).not.toContain('baseHeight');
    expect(JSON.stringify(state)).not.toContain('landMask');
    expect(JSON.stringify(state)).not.toContain('waterMask');
    expect(JSON.stringify(state)).not.toContain('seaLevel');
    expect(JSON.stringify(state)).not.toContain('bathymetry');
    expect(JSON.stringify(state)).not.toContain('rendererColor');
    expect(JSON.stringify(state)).not.toContain('WorldBrain');
  });

  it('changes identity when an authoritative source hash changes', () => {
    const first = createState(regions);
    const second = createContinentOceanStructureState({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: hashCausalPayload('WorldWright/test/c1-projection/v1', { projection: 'changed' }),
      regions,
      limitations: ['C1 source-hash sensitivity fixture.'],
    });
    expect(first.contentHash.value).not.toBe(second.contentHash.value);
  });

  it('rejects hidden ambiguity, unsupported role sources, physical ghost suppression, and forged hashes', () => {
    const hiddenAmbiguity = cloneRegions();
    hiddenAmbiguity[1] = {
      ...hiddenAmbiguity[1],
      ambiguity: {
        ...hiddenAmbiguity[1].ambiguity,
        ambiguityStatus: 'NONE',
      },
    };
    expect(() => createState(hiddenAmbiguity)).toThrow(/cannot hide competing roles/i);

    const unsupportedSource = cloneRegions();
    unsupportedSource[0] = {
      ...unsupportedSource[0],
      candidates: [{
        ...unsupportedSource[0].candidates[0],
        sourceReferences: [{
          schemaVersion: 1,
          sourceKind: 'PROCESS_FIELD',
          sourceId: 'oceanBasinInfluence',
          evidenceIds: ['evidence.c1.invalid-source'],
        }],
      }],
    };
    expect(() => createState(unsupportedSource)).toThrow(/unsupported process field/i);

    const invalidSuppression = cloneRegions();
    invalidSuppression[1] = {
      ...invalidSuppression[1],
      ghostAssessment: {
        ...invalidSuppression[1].ghostAssessment,
        riskLevel: 'MODERATE',
        disposition: 'SUPPRESS_CANDIDATE',
      },
    };
    expect(() => createState(invalidSuppression)).toThrow(/suppression requires HIGH ghost risk/i);

    const valid = createState(regions);
    const forged = JSON.parse(JSON.stringify(valid)) as typeof valid;
    (forged as { contentHash: { algorithm: string; value: string } }).contentHash.value = '0000000000000000';
    expect(() => validateContinentOceanStructureState(forged)).toThrow(/content hash does not match/i);
  });

  it('registers C1 as shadow-only diagnostics and forbids structural authority writes', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    const process = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
    expect(process.reads).toEqual(['causalRecord', 'diagnostics']);
    expect(process.writes).toEqual(['diagnostics']);
    expect(process.prerequisites).toEqual(['CAUSAL_PROCESS_FIELD_PROJECTION']);
    expect(process.writes).not.toContain('structuralRoleAuthority');
    expect(process.writes).not.toContain('processFieldAuthority');
    expect(process.writes).not.toContain('terrain');
  });
});

function createState(value: readonly ContinentOceanStructuralRegionV1[]) {
  return createContinentOceanStructureState({
    sourcePremiseHash: premiseHash,
    sourceGeologicSpineHash: spineHash,
    sourceProcessFieldProjectionHash: projectionHash,
    regions: value,
    evidenceIds: ['evidence.c1.contract-review'],
    limitations: ['C1 defines detached structural-role contracts only; no resolver or physical authority is implemented.'],
  });
}

function cloneRegions(): ContinentOceanStructuralRegionV1[] {
  return JSON.parse(JSON.stringify(regions)) as ContinentOceanStructuralRegionV1[];
}

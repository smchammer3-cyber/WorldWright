import { describe, expect, it } from 'vitest';
import {
  C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1,
  createContinentOceanStructureInterpretation,
  createScientificRange,
  createSphericalAnchor,
  createSphericalExtent,
  hashCausalPayload,
  validateContinentOceanStructureInterpretation,
  type ContinentOceanStructuralRegionV1,
} from '../src/core/causalGeology';
import {
  CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';

const premiseHash = hashCausalPayload('WorldWright/test/c1-premise/v1', { premise: 'controlled' });
const spineHash = hashCausalPayload('WorldWright/test/c1-spine/v1', { spine: 'controlled' });
const projectionHash = hashCausalPayload('WorldWright/test/c1-projection/v1', { projection: 'controlled' });

const regions: readonly ContinentOceanStructuralRegionV1[] = [
  {
    schemaVersion: 1,
    regionId: 'region-continental-interior',
    anchor: createSphericalAnchor(24, 42),
    extent: createSphericalExtent(28, 65, 0.35),
    resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
    leadingRole: 'CONTINENTAL_INTERIOR',
    roleCandidates: [
      {
        schemaVersion: 1,
        role: 'CONTINENTAL_INTERIOR',
        supportRange: createScientificRange(0.72, 0.88, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-continental-interior.role'),
        sourceFieldIds: ['continentalKernelInfluence', 'formationAgeSummary', 'persistenceSummary'],
        sourceNodeIds: ['continental-kernel-01'],
        rationaleIds: ['c1.long-lived-kernel-context'],
        evidenceIds: ['evidence.c1.continental-interior'],
      },
    ],
    ghostRiskCandidates: [
      {
        schemaVersion: 1,
        risk: 'CONTINENTAL_GHOST',
        supportRange: createScientificRange(0.05, 0.18, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-continental-interior.ghost'),
        sourceFieldIds: ['continentalKernelInfluence', 'projectionConfidence'],
        rationaleIds: ['c1.low-ghost-risk-with-source-lineage'],
        evidenceIds: ['evidence.c1.continental-ghost'],
      },
    ],
    suppressionRecommendations: ['NO_SUPPRESSION_RECOMMENDATION'],
    unresolvedReasonIds: [],
    confidenceAssessmentSubject: 'c1.region-continental-interior',
    evidenceIds: ['evidence.c1.region-continental-interior'],
    contradictionIds: [],
    limitations: ['C1 structural identity is detached and does not decide land, water, bathymetry, or terrain.'],
  },
  {
    schemaVersion: 1,
    regionId: 'region-transition-ambiguous',
    anchor: createSphericalAnchor(-12, -138),
    extent: createSphericalExtent(18, 310, 0.7),
    resolutionStatus: 'AMBIGUOUS_CANDIDATES',
    roleCandidates: [
      {
        schemaVersion: 1,
        role: 'CONTINENTAL_MARGIN',
        supportRange: createScientificRange(0.42, 0.68, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-transition-ambiguous.margin'),
        sourceFieldIds: ['continentalKernelInfluence', 'riftInfluence'],
        sourceNodeIds: ['continental-kernel-02', 'rift-system-02'],
        rationaleIds: ['c1.mixed-kernel-rift-context'],
        evidenceIds: ['evidence.c1.margin-candidate'],
      },
      {
        schemaVersion: 1,
        role: 'TRANSITIONAL_CRUST',
        supportRange: createScientificRange(0.48, 0.74, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-transition-ambiguous.transition'),
        sourceFieldIds: ['continentalKernelInfluence', 'oceanBasinInfluence', 'riftInfluence'],
        sourceNodeIds: ['continental-kernel-02', 'ocean-basin-02', 'rift-system-02'],
        rationaleIds: ['c1.mixed-continent-basin-rift-context'],
        evidenceIds: ['evidence.c1.transition-candidate'],
      },
    ],
    ghostRiskCandidates: [
      {
        schemaVersion: 1,
        risk: 'DROWNED_FRAGMENT_CONFUSION',
        supportRange: createScientificRange(0.3, 0.62, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-transition-ambiguous.drowned-risk'),
        sourceFieldIds: ['continentalKernelInfluence', 'oceanBasinInfluence'],
        rationaleIds: ['c1.fragment-versus-transition-ambiguity'],
        evidenceIds: ['evidence.c1.drowned-fragment-risk'],
      },
      {
        schemaVersion: 1,
        risk: 'SHELF_GHOST',
        supportRange: createScientificRange(0.22, 0.5, 'normalized-0-1', 'normalized-0-1-v1', 'c1.region-transition-ambiguous.shelf-risk'),
        sourceFieldIds: ['continentalKernelInfluence', 'oceanBasinInfluence'],
        rationaleIds: ['c1.shelf-versus-transition-ambiguity'],
        evidenceIds: ['evidence.c1.shelf-ghost-risk'],
      },
    ],
    suppressionRecommendations: ['DEFER_TO_STRUCTURE_MATERIAL_GENESIS', 'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE'],
    unresolvedReasonIds: [],
    confidenceAssessmentSubject: 'c1.region-transition-ambiguous',
    evidenceIds: ['evidence.c1.region-transition-ambiguous'],
    contradictionIds: [],
    limitations: ['C1 preserves the margin, transition, and drowned-fragment alternatives without selecting land or water.'],
  },
];

describe('C1 detached continent/ocean structural-role contracts', () => {
  it('creates deterministic immutable structural candidates with explicit ambiguity and no physical authority', () => {
    const interpretation = createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions,
      evidenceIds: ['evidence.c1.contract-review'],
      limitations: ['C1 defines detached structural-role candidates only; structural authority and physical output remain unimplemented.'],
    });
    const replay = createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions,
      evidenceIds: ['evidence.c1.contract-review'],
      limitations: ['C1 defines detached structural-role candidates only; structural authority and physical output remain unimplemented.'],
    });

    validateContinentOceanStructureInterpretation(interpretation);
    expect(interpretation).toEqual(replay);
    expect(interpretation.contentHash).toEqual(replay.contentHash);
    expect(interpretation.roleDefinitions).toEqual(C1_CONTINENT_OCEAN_ROLE_DEFINITIONS_V1);
    expect(interpretation.roleDefinitions.map((entry) => entry.role)).toEqual([
      'CONTINENTAL_INTERIOR',
      'CONTINENTAL_MARGIN',
      'CONTINENTAL_SHELF',
      'CONTINENTAL_SLOPE',
      'DEEP_OCEAN_BASIN',
      'OCEANIC_RIDGE_SYSTEM',
      'VOLCANIC_ARC_SYSTEM',
      'DROWNED_CONTINENTAL_FRAGMENT',
      'TRANSITIONAL_CRUST',
      'STRUCTURALLY_UNRESOLVED',
    ]);
    const ambiguous = interpretation.regions.find((entry) => entry.regionId === 'region-transition-ambiguous');
    expect(ambiguous).toMatchObject({
      resolutionStatus: 'AMBIGUOUS_CANDIDATES',
      suppressionRecommendations: ['DEFER_TO_STRUCTURE_MATERIAL_GENESIS', 'PRESERVE_DROWNED_FRAGMENT_ALTERNATIVE'],
    });
    expect(ambiguous).not.toHaveProperty('leadingRole');
    expect(interpretation.structuralRoleAuthority).toBe(false);
    expect(interpretation.finalLandAuthority).toBe(false);
    expect(interpretation.finalWaterAuthority).toBe(false);
    expect(interpretation.bathymetryAuthority).toBe(false);
    expect(interpretation.terrainAuthority).toBe(false);
    expect(interpretation.roleDefinitions.every((definition) =>
      !definition.finalLandAuthority
      && !definition.finalWaterAuthority
      && !definition.bathymetryAuthority
      && !definition.terrainAuthority)).toBe(true);
    expect(Object.isFrozen(interpretation)).toBe(true);
    expect(Object.isFrozen(interpretation.regions)).toBe(true);
    const serialized = JSON.stringify(interpretation);
    for (const forbidden of ['baseHeight', 'landMask', 'waterMask', 'seaLevel', 'bathymetryDepth', 'WorldBrain', 'rendererColor']) {
      expect(serialized).not.toContain(forbidden);
    }
  });

  it('changes identity when an authoritative detached source hash changes', () => {
    const first = createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions,
      limitations: ['C1 source-link sensitivity fixture.'],
    });
    const second = createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: hashCausalPayload('WorldWright/test/c1-projection/v1', { projection: 'changed' }),
      regions,
      limitations: ['C1 source-link sensitivity fixture.'],
    });
    expect(first.contentHash.value).not.toBe(second.contentHash.value);
  });

  it('rejects noncanonical regions, invalid support, unresolved records without unresolved roles, and forged hashes', () => {
    expect(() => createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions: [...regions].reverse(),
      limitations: ['C1 noncanonical region rejection fixture.'],
    })).toThrow(/canonically ordered/i);

    const invalidSupport = JSON.parse(JSON.stringify(regions)) as ContinentOceanStructuralRegionV1[];
    invalidSupport[0] = {
      ...invalidSupport[0],
      roleCandidates: [{
        ...invalidSupport[0].roleCandidates[0],
        supportRange: {
          ...invalidSupport[0].roleCandidates[0].supportRange,
          max: 1.2,
        },
      }],
    };
    expect(() => createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions: invalidSupport,
      limitations: ['C1 invalid support rejection fixture.'],
    })).toThrow(/above normalized-0-1-v1 maximum/i);

    const unresolved = JSON.parse(JSON.stringify(regions)) as ContinentOceanStructuralRegionV1[];
    unresolved[0] = {
      ...unresolved[0],
      resolutionStatus: 'UNRESOLVED',
      leadingRole: undefined,
      unresolvedReasonIds: ['c1.insufficient-evidence'],
    };
    expect(() => createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions: unresolved,
      limitations: ['C1 unresolved-role rejection fixture.'],
    })).toThrow(/must include STRUCTURALLY_UNRESOLVED/i);

    const valid = createContinentOceanStructureInterpretation({
      sourcePremiseHash: premiseHash,
      sourceGeologicSpineHash: spineHash,
      sourceProcessFieldProjectionHash: projectionHash,
      regions,
      limitations: ['C1 hash rejection fixture.'],
    });
    const forged = JSON.parse(JSON.stringify(valid)) as typeof valid;
    (forged as { contentHash: { algorithm: string; value: string } }).contentHash.value = '0000000000000000';
    expect(() => validateContinentOceanStructureInterpretation(forged)).toThrow(/content hash does not match/i);
  });

  it('registers C1 and its downstream M1A contract owner as exact shadow-only diagnostics', () => {
    expect(validateAuthorityProcessRegistry()).toEqual([]);
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toEqual([
      'CAUSAL_PROCESS_FIELD_PROJECTION',
      'CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION',
      'CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION',
      'CAUSAL_SHADOW_AUDIT',
    ]);
    const process = getAuthorityProcess('CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION');
    expect(process.modes).toEqual(['CAUSAL_SHADOW']);
    expect(process.reads).toEqual(['causalRecord', 'diagnostics']);
    expect(process.writes).toEqual(['diagnostics']);
    expect(process.prerequisites).toEqual(['CAUSAL_PROCESS_FIELD_PROJECTION']);
    expect(process.writes).not.toContain('structuralRoleAuthority');
    expect(process.writes).not.toContain('terrain');
    expect(process.writes).not.toContain('presentation');

    const material = getAuthorityProcess('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION');
    expect(material.modes).toEqual(['CAUSAL_SHADOW']);
    expect(material.reads).toEqual(['causalRecord', 'diagnostics']);
    expect(material.writes).toEqual(['diagnostics']);
    expect(material.prerequisites).toEqual(['CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION']);
    expect(material.writes).not.toContain('structureMaterialCause');
    expect(material.writes).not.toContain('landformPotentialAuthority');
    expect(material.writes).not.toContain('terrain');
    expect(material.writes).not.toContain('presentation');
  });
});

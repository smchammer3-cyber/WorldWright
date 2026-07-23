import { describe, expect, it } from 'vitest';
import {
  createCausalProcessFieldProjectionSet,
  createContinentOceanStructureInterpretation,
  createScientificQuantity,
  createScientificRange,
  createSphericalAnchor,
  createSphericalExtent,
  hashCausalPayload,
  hashRecordWithoutContentHash,
  validateCausalProcessFieldProjectionSet,
  validateContinentOceanStructureInterpretation,
  validateScientificQuantity,
  validateScientificRange,
  validateSphericalAnchor,
  validateSphericalExtent,
  type CausalProcessFieldProjectionSetV1,
  type ContinentOceanStructuralRegionV1,
  type ContinentOceanStructureInterpretationV1,
} from '../src/core/causalGeology';

const historyHash = hashCausalPayload('WorldWright/test/detached-ownership/history/v1', { source: 'history' });
const spineHash = hashCausalPayload('WorldWright/test/detached-ownership/spine/v1', { source: 'spine' });
const premiseHash = hashCausalPayload('WorldWright/test/detached-ownership/premise/v1', { source: 'premise' });
const projectionHash = hashCausalPayload('WorldWright/test/detached-ownership/projection/v1', { source: 'projection' });

const projectionContract = 'WorldWright/causal-process-field-projection/v1';
const interpretationContract = 'WorldWright/continent-ocean-structure-interpretation/v1';

describe('detached causal contract ownership regression', () => {
  it('rejects unowned scientific and spherical primitive fields', () => {
    const quantity = {
      ...createScientificQuantity(0.5, 'normalized-0-1', 'normalized-0-1-v1'),
      terrain: 1,
    };
    expect(() => validateScientificQuantity(quantity)).toThrow(/unowned field: terrain/i);

    const range = {
      ...createScientificRange(0.2, 0.8, 'normalized-0-1', 'normalized-0-1-v1', 'ownership.range'),
      rendererColor: '#00ff00',
    };
    expect(() => validateScientificRange(range)).toThrow(/unowned field: rendererColor/i);

    const anchor = {
      ...createSphericalAnchor(0, 0),
      landMask: [true],
    };
    expect(() => validateSphericalAnchor(anchor)).toThrow(/unowned field: landMask/i);

    const extent = {
      ...createSphericalExtent(20),
      bathymetry: [-1],
    };
    expect(() => validateSphericalExtent(extent)).toThrow(/unowned field: bathymetry/i);
  });

  it('rejects D1 unowned payload fields even after a valid hash is recomputed', () => {
    const projection = createProjection();

    const topLevelLeak = structuredClone(projection);
    (topLevelLeak as unknown as Record<string, unknown>).terrain = { fabricated: true };
    rehashProjection(topLevelLeak);
    expect(() => validateCausalProcessFieldProjectionSet(topLevelLeak)).toThrow(/unowned field: terrain/i);

    const kernelLeak = structuredClone(projection);
    (kernelLeak.kernels[0] as unknown as Record<string, unknown>).rendererColor = '#00ff00';
    rehashProjection(kernelLeak);
    expect(() => validateCausalProcessFieldProjectionSet(kernelLeak)).toThrow(/unowned field: rendererColor/i);

    const anchorLeak = structuredClone(projection);
    (anchorLeak.kernels[0].anchor as unknown as Record<string, unknown>).landMask = [true];
    rehashProjection(anchorLeak);
    expect(() => validateCausalProcessFieldProjectionSet(anchorLeak)).toThrow(/Spherical anchor contains an unowned field: landMask/i);
  });

  it('rejects C1 unowned payload fields even after a valid hash is recomputed', () => {
    const interpretation = createInterpretation();

    const topLevelLeak = structuredClone(interpretation);
    (topLevelLeak as unknown as Record<string, unknown>).terrain = { fabricated: true };
    rehashInterpretation(topLevelLeak);
    expect(() => validateContinentOceanStructureInterpretation(topLevelLeak)).toThrow(/unowned field: terrain/i);

    const regionLeak = structuredClone(interpretation);
    (regionLeak.regions[0] as unknown as Record<string, unknown>).landMask = [true];
    rehashInterpretation(regionLeak);
    expect(() => validateContinentOceanStructureInterpretation(regionLeak)).toThrow(/unowned field: landMask/i);

    const roleLeak = structuredClone(interpretation);
    (roleLeak.regions[0].roleCandidates[0] as unknown as Record<string, unknown>).rendererColor = '#00ff00';
    rehashInterpretation(roleLeak);
    expect(() => validateContinentOceanStructureInterpretation(roleLeak)).toThrow(/unowned field: rendererColor/i);

    const ghostLeak = structuredClone(interpretation);
    (ghostLeak.regions[0].ghostRiskCandidates[0] as unknown as Record<string, unknown>).bathymetry = [-1];
    rehashInterpretation(ghostLeak);
    expect(() => validateContinentOceanStructureInterpretation(ghostLeak)).toThrow(/unowned field: bathymetry/i);
  });

  it('keeps C1 leading, ambiguous, and unresolved semantics mutually exclusive', () => {
    const ambiguous = ambiguousRegion();

    expect(() => createInterpretation({
      ...ambiguous,
      roleCandidates: [ambiguous.roleCandidates[0]],
    })).toThrow(/at least two affirmative role candidates/i);

    expect(() => createInterpretation({
      ...ambiguous,
      unresolvedReasonIds: ['c1.unresolved.not-allowed-on-ambiguity'],
    })).toThrow(/ambiguous.*cannot carry unresolved reasons/i);

    const unresolvedCandidate = structurallyUnresolvedCandidate();
    expect(() => createInterpretation({
      ...ambiguous,
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
      leadingRole: 'STRUCTURALLY_UNRESOLVED',
      roleCandidates: [unresolvedCandidate],
    })).toThrow(/cannot lead with STRUCTURALLY_UNRESOLVED/i);

    expect(() => createInterpretation({
      ...ambiguous,
      roleCandidates: [...ambiguous.roleCandidates, unresolvedCandidate]
        .sort((a, b) => a.role < b.role ? -1 : a.role > b.role ? 1 : 0),
    })).toThrow(/ambiguous.*cannot include STRUCTURALLY_UNRESOLVED/i);
  });
});

function createProjection(): CausalProcessFieldProjectionSetV1 {
  return createCausalProcessFieldProjectionSet({
    sourceRegimeHistoryHash: historyHash,
    sourceGeologicSpineHash: spineHash,
    kernels: [{
      schemaVersion: 1,
      kernelId: 'kernel.continental-01',
      fieldId: 'continentalKernelInfluence',
      sourceNodeId: 'node.continental-01',
      sourceNodeFamily: 'CONTINENTAL_KERNEL',
      anchor: createSphericalAnchor(10, 20),
      angularRadiusDegrees: 25,
      peakValue: 0.8,
      temporalWeight: 0.75,
      preservationWeight: 0.9,
      falloff: 'COSINE_COMPACT_SUPPORT_V1',
      evidenceIds: ['evidence.detached-ownership.projection'],
    }],
    limitations: ['Detached ownership regression projection has no physical authority.'],
  });
}

function createInterpretation(
  region: ContinentOceanStructuralRegionV1 = ambiguousRegion(),
): ContinentOceanStructureInterpretationV1 {
  return createContinentOceanStructureInterpretation({
    sourcePremiseHash: premiseHash,
    sourceGeologicSpineHash: spineHash,
    sourceProcessFieldProjectionHash: projectionHash,
    regions: [region],
    limitations: ['Detached ownership regression interpretation has no physical authority.'],
  });
}

function ambiguousRegion(): ContinentOceanStructuralRegionV1 {
  return {
    schemaVersion: 1,
    regionId: 'region.detached-ownership.ambiguous',
    anchor: createSphericalAnchor(-5, 45),
    extent: createSphericalExtent(18),
    resolutionStatus: 'AMBIGUOUS_CANDIDATES',
    roleCandidates: [
      {
        schemaVersion: 1,
        role: 'CONTINENTAL_MARGIN',
        supportRange: createScientificRange(0.45, 0.7, 'normalized-0-1', 'normalized-0-1-v1', 'ownership.margin'),
        sourceFieldIds: ['continentalKernelInfluence', 'riftInfluence'],
        sourceNodeIds: ['node.continental-01', 'node.rift-01'],
        rationaleIds: ['rationale.margin-transition'],
        evidenceIds: ['evidence.margin-transition'],
      },
      {
        schemaVersion: 1,
        role: 'TRANSITIONAL_CRUST',
        supportRange: createScientificRange(0.5, 0.75, 'normalized-0-1', 'normalized-0-1-v1', 'ownership.transition'),
        sourceFieldIds: ['continentalKernelInfluence', 'oceanBasinInfluence', 'riftInfluence'],
        sourceNodeIds: ['node.continental-01', 'node.ocean-01', 'node.rift-01'],
        rationaleIds: ['rationale.mixed-transition'],
        evidenceIds: ['evidence.mixed-transition'],
      },
    ],
    ghostRiskCandidates: [{
      schemaVersion: 1,
      risk: 'DROWNED_FRAGMENT_CONFUSION',
      supportRange: createScientificRange(0.2, 0.5, 'normalized-0-1', 'normalized-0-1-v1', 'ownership.ghost'),
      sourceFieldIds: ['continentalKernelInfluence', 'oceanBasinInfluence'],
      rationaleIds: ['rationale.drowned-fragment-confusion'],
      evidenceIds: ['evidence.drowned-fragment-confusion'],
    }],
    suppressionRecommendations: ['NO_SUPPRESSION_RECOMMENDATION'],
    unresolvedReasonIds: [],
    confidenceAssessmentSubject: 'ownership.region.ambiguous',
    evidenceIds: ['evidence.region.ambiguous'],
    contradictionIds: [],
    limitations: ['The regression region preserves ambiguity without selecting land or water.'],
  };
}

function structurallyUnresolvedCandidate(): ContinentOceanStructuralRegionV1['roleCandidates'][number] {
  return {
    schemaVersion: 1,
    role: 'STRUCTURALLY_UNRESOLVED',
    supportRange: createScientificRange(0.6, 0.9, 'normalized-0-1', 'normalized-0-1-v1', 'ownership.unresolved'),
    sourceFieldIds: ['projectionConfidence'],
    sourceNodeIds: [],
    rationaleIds: ['rationale.insufficient-structural-evidence'],
    evidenceIds: [],
  };
}

function rehashProjection(projection: CausalProcessFieldProjectionSetV1): void {
  (projection as unknown as { contentHash: CausalProcessFieldProjectionSetV1['contentHash'] }).contentHash =
    hashRecordWithoutContentHash(projectionContract, projection as object);
}

function rehashInterpretation(interpretation: ContinentOceanStructureInterpretationV1): void {
  (interpretation as unknown as { contentHash: ContinentOceanStructureInterpretationV1['contentHash'] }).contentHash =
    hashRecordWithoutContentHash(interpretationContract, interpretation as object);
}

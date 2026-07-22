import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1,
  M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalAnchor,
  createSphericalExtent,
  createStructureMaterialState,
  hashCausalPayload,
  validateStructureMaterialResearchReview,
  validateStructureMaterialState,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type StructureMaterialProvinceCandidateV1,
  type StructureMaterialRegionV1,
  type StructureMaterialResearchReviewV1,
} from '../src/core/causalGeology';
import { getAuthorityProcess } from '../src/core/worldAuthority';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const sources = readResearchJson<ScientificSourceV1[]>('structure-material-source-registry.json');
const claimRules = readResearchJson<ScientificClaimRuleV1[]>('structure-material-claim-rules.json');
const correlationGroups = readResearchJson<string[]>('structure-material-correlation-groups.json');
const knownLimitations = readResearchJson<string[]>('structure-material-known-limitations.json');
const review = readResearchJson<StructureMaterialResearchReviewV1>('structure-material-review-record.json');
const researchBundle = createScientificResearchBundle({
  bundleVersion: review.bundleVersion,
  sources,
  claimRules,
  correlationGroups,
  knownLimitations,
});

const forbiddenPhysicalPayloadKeys = new Set([
  'baseHeight',
  'baseTerrain',
  'bathymetry',
  'bathymetryDepth',
  'bathymetryGrid',
  'depthMap',
  'finalTerrain',
  'landMask',
  'rendererColor',
  'rendererColors',
  'seaLevel',
  'terrain',
  'waterMask',
  'WorldBrain',
]);

describe('M1A detached structure/material contracts', () => {
  it('creates a deterministic ambiguous state with exact upstream lineage and no physical authority', () => {
    const regions = [ambiguousContinentalRegion()];
    const state = createState(regions);
    const replay = createState(regions);

    expect(state).toEqual(replay);
    expect(state).toMatchObject({
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      stateMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      classification: 'DETACHED_STAGE_ARTIFACT',
      structureMaterialCauseAuthority: false,
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      terrainAuthority: false,
    });
    expect(state.regions[0]).toMatchObject({
      resolutionStatus: 'AMBIGUOUS_CANDIDATES',
    });
    expect(state.regions[0].leadingProvinceClass).toBeUndefined();
    expect(state.regions[0].provinceCandidates.map((entry) => entry.provinceClass)).toEqual([
      'STABLE_CONTINENTAL_ROOT',
      'TECTONICALLY_THICKENED_CRUST',
    ]);
    expect(Object.isFrozen(state)).toBe(true);
    expect(Object.isFrozen(state.regions)).toBe(true);
    expect(Object.isFrozen(state.provinceDefinitions)).toBe(true);
    expect(findForbiddenPhysicalPayloadKeys(state)).toEqual([]);
    validateStructureMaterialState(state);
  });

  it('keeps deep material separate from surface exposure and rejects incompatible dimensions', () => {
    expect(M1A_STRUCTURE_MATERIAL_ALLOWED_FIELD_IDS_V1).not.toContain('surfaceExposureSummary');
    expect(() => createState([
      ambiguousContinentalRegion([
        {
          ...stableCandidate(),
          sourceFieldIds: ['surfaceExposureSummary'],
        },
        tectonicallyThickenedCandidate(),
      ]),
    ])).toThrow(/surface-only process field/i);

    expect(() => createState([
      ambiguousContinentalRegion([
        {
          ...stableCandidate(),
          substrateAffinity: 'OCEANIC_MAFIC_AFFINITY',
        },
        tectonicallyThickenedCandidate(),
      ]),
    ])).toThrow(/incompatible substrate affinity/i);

    expect(() => createState([
      ambiguousContinentalRegion([
        {
          ...stableCandidate(),
          terrainTermPermissionCandidates: ['LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE'],
        },
        tectonicallyThickenedCandidate(),
      ]),
    ])).toThrow(/incompatible terrain-term permission/i);
  });

  it('requires canonical ordering and rejects duplicate or unresolved leading classifications', () => {
    expect(() => createState([
      ambiguousContinentalRegion([
        tectonicallyThickenedCandidate(),
        stableCandidate(),
      ]),
    ])).toThrow(/province candidates must be canonical/i);

    const duplicateRegion = ambiguousContinentalRegion();
    expect(() => createState([duplicateRegion, duplicateRegion])).toThrow(/duplicate structure\/material region/i);

    const unresolved = unresolvedRegion();
    const unresolvedState = createState([unresolved]);
    expect(unresolvedState.regions[0]).toMatchObject({
      resolutionStatus: 'UNRESOLVED',
      unresolvedReasonIds: ['m1a.unresolved.insufficient-material-evidence'],
    });
    expect(unresolvedState.regions[0].provinceCandidates[0].evidenceIds).toEqual([]);

    expect(() => createState([{
      ...unresolved,
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
      leadingProvinceClass: 'STRUCTURE_MATERIAL_UNRESOLVED',
    }])).toThrow(/cannot lead with the unresolved province/i);

    expect(() => createState([{
      ...unresolved,
      provinceCandidates: [{
        ...unresolved.provinceCandidates[0],
        evidenceIds: ['m1a.claim.fabricated-positive-evidence'],
      }],
    }])).toThrow(/cannot fabricate positive evidence/i);
  });

  it('rejects authority promotion even when the rest of a state is structurally valid', () => {
    const state = createState([ambiguousContinentalRegion()]);
    const leaked = {
      ...state,
      structureMaterialCauseAuthority: true,
    };
    expect(() => validateStructureMaterialState(leaked)).toThrow(/authority contract is invalid/i);

    const authority = getAuthorityProcess('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION');
    expect(authority).toMatchObject({
      owner: 'CAUSAL_STRUCTURE_MATERIAL_DIAGNOSTIC',
      prerequisites: ['CAUSAL_CONTINENT_OCEAN_STRUCTURE_INTERPRETATION'],
      modes: ['CAUSAL_SHADOW'],
      reads: ['causalRecord', 'diagnostics'],
      writes: ['diagnostics'],
    });
    expect(authority.forbiddenWrites).toContain('structureMaterialCause');
    expect(authority.forbiddenWrites).toContain('landformPotentialAuthority');
    expect(authority.forbiddenWrites).toContain('baseTerrain');
    expect(authority.forbiddenWrites).toContain('finalTerrain');
  });
});

describe('M1A source-backed research boundary', () => {
  it('covers every contract definition with independent evidence while authorizing contracts only', () => {
    validateStructureMaterialResearchReview(review, researchBundle);
    expect(review).toMatchObject({
      reviewStatus: 'APPROVED_FOR_DETACHED_CONTRACTS_ONLY',
      completeEligibleProvinceClasses: [],
      researchRequiredProvinceClasses: [
        'EXHUMED_MANTLE_TRANSITION',
        'MIXED_TRANSITIONAL_PROVINCE',
      ],
      resolverImplementationAuthorized: false,
      thresholdCalibrationAuthorized: false,
      structureMaterialCauseAuthorityAuthorized: false,
      landformPotentialAuthorityAuthorized: false,
      physicalOutputAuthorized: false,
      ordinaryGenerateInvocationAuthorized: false,
      legacyMorphologyInputAuthorized: false,
      surfaceExposureInputAuthorized: false,
    });
    expect(review.definitionRecords.map((entry) => entry.provinceClass)).toEqual(
      M1A_STRUCTURE_MATERIAL_PROVINCE_DEFINITIONS_V1.map((entry) => entry.provinceClass),
    );
    for (const record of review.definitionRecords.filter((entry) => entry.researchStatus === 'SUPPORTED_CANDIDATE_CLASS')) {
      expect(record.genericClaimRuleIds.length).toBeGreaterThanOrEqual(2);
      expect(record.independentCorrelationGroupIds.length).toBeGreaterThanOrEqual(2);
    }
    for (const rule of researchBundle.claimRules) {
      expect(rule.applicableInputIds).toEqual([]);
    }
    expect(JSON.stringify({ sources, claimRules, review })).not.toContain('surfaceExposureSummary');
  });

  it('fails when evidence independence or authority boundaries are weakened', () => {
    const weakenedIndependence = structuredClone(review);
    const stable = weakenedIndependence.definitionRecords.find((entry) => entry.provinceClass === 'STABLE_CONTINENTAL_ROOT');
    if (!stable) throw new Error('Missing stable continental research record.');
    (stable as { genericClaimRuleIds: string[] }).genericClaimRuleIds = [
      'm1a.claim.continental-crust-varies-with-tectonic-province-v1',
    ];
    (stable as { independentCorrelationGroupIds: string[] }).independentCorrelationGroupIds = [
      'm1a.continental-crust-global',
    ];
    expect(() => validateStructureMaterialResearchReview(weakenedIndependence, researchBundle)).toThrow(/two independent external evidence groups/i);

    const promoted = {
      ...review,
      resolverImplementationAuthorized: true,
    };
    expect(() => validateStructureMaterialResearchReview(promoted, researchBundle)).toThrow(/authority boundary is invalid/i);

    const directInputBypass = structuredClone(researchBundle);
    const firstRule = directInputBypass.claimRules[0] as ScientificClaimRuleV1 & { applicableInputIds: string[] };
    firstRule.applicableInputIds = ['thermal.age'];
    expect(() => validateStructureMaterialResearchReview(review, directInputBypass)).toThrow(/cannot bypass the upstream causal records/i);
  });
});

function createState(regions: readonly StructureMaterialRegionV1[]) {
  return createStructureMaterialState({
    sourcePremiseHash: sourceHash('premise'),
    sourceInteriorStateHash: sourceHash('interior'),
    sourceRegimeHistoryHash: sourceHash('history'),
    sourceGeologicSpineHash: sourceHash('spine'),
    sourceProcessFieldProjectionHash: sourceHash('projection'),
    sourceContinentOceanStructureHash: sourceHash('structure'),
    regions,
    evidenceIds: ['m1a.evidence.contract-test'],
    limitations: ['M1A test state is detached and non-authoritative.'],
  });
}

function ambiguousContinentalRegion(
  provinceCandidates: readonly StructureMaterialProvinceCandidateV1[] = [
    stableCandidate(),
    tectonicallyThickenedCandidate(),
  ],
): StructureMaterialRegionV1 {
  return {
    schemaVersion: 1,
    regionId: 'm1a.region.continental-ambiguous',
    sourceStructuralRegionId: 'c2b.region.continental-ambiguous',
    anchor: createSphericalAnchor(20, 30),
    extent: createSphericalExtent(15),
    resolutionStatus: 'AMBIGUOUS_CANDIDATES',
    provinceCandidates,
    unresolvedReasonIds: [],
    confidenceAssessmentSubject: 'm1a.region.continental-ambiguous.material',
    evidenceIds: [
      'm1a.claim.continental-crust-varies-with-tectonic-province-v1',
      'm1a.claim.tectonic-thickening-produces-thick-crustal-provinces-v1',
    ],
    contradictionIds: [],
    limitations: ['Current evidence cannot distinguish stable root from tectonically thickened crust.'],
  };
}

function stableCandidate(): StructureMaterialProvinceCandidateV1 {
  return {
    schemaVersion: 1,
    provinceClass: 'STABLE_CONTINENTAL_ROOT',
    substrateAffinity: 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
    thicknessTendency: 'THICK',
    buoyancyTendency: 'RELATIVELY_POSITIVE',
    resistanceTendencies: ['ANISOTROPIC_OR_INHERITED', 'STRONG'],
    grainTendencies: ['INHERITED_ANISOTROPY_ORIENTATION_UNRESOLVED'],
    terrainTermPermissionCandidates: [
      'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE',
      'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE',
      'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE',
    ],
    supportRange: createScientificRange(0.55, 0.7, 'normalized-0-1', 'normalized-0-1-v1', 'm1a.stable-root-support'),
    sourceStructuralRoles: ['CONTINENTAL_INTERIOR'],
    sourceFieldIds: ['continentalKernelInfluence', 'persistenceSummary', 'preservationSummary'],
    sourceNodeIds: ['node.continental-kernel'],
    rationaleIds: ['m1a.rationale.stable-root-candidate'],
    evidenceIds: [
      'm1a.claim.continental-crust-varies-with-tectonic-province-v1',
      'm1a.claim.inherited-lithosphere-controls-strength-and-grain-v1',
    ],
  };
}

function tectonicallyThickenedCandidate(): StructureMaterialProvinceCandidateV1 {
  return {
    schemaVersion: 1,
    provinceClass: 'TECTONICALLY_THICKENED_CRUST',
    substrateAffinity: 'CONTINENTAL_FELSIC_INTERMEDIATE_AFFINITY',
    thicknessTendency: 'THICK',
    buoyancyTendency: 'CONTEXT_DEPENDENT',
    resistanceTendencies: ['INTERMEDIATE_RESISTANCE'],
    grainTendencies: ['CONVERGENCE_ASSOCIATED_ORIENTATION_UNRESOLVED'],
    terrainTermPermissionCandidates: [
      'LATER_GRAIN_ANISOTROPY_TERM_CANDIDATE',
      'LATER_ISOSTATIC_SUPPORT_TERM_CANDIDATE',
      'LATER_RESISTANCE_CONTRAST_TERM_CANDIDATE',
      'LATER_THICKENING_RESPONSE_TERM_CANDIDATE',
    ],
    supportRange: createScientificRange(0.5, 0.68, 'normalized-0-1', 'normalized-0-1-v1', 'm1a.thickened-crust-support'),
    sourceStructuralRoles: ['CONTINENTAL_MARGIN'],
    sourceFieldIds: ['continentalKernelInfluence', 'convergenceInfluence', 'persistenceSummary'],
    sourceNodeIds: ['node.convergent-corridor'],
    rationaleIds: ['m1a.rationale.tectonically-thickened-candidate'],
    evidenceIds: [
      'm1a.claim.layered-lithosphere-is-laterally-heterogeneous-v1',
      'm1a.claim.tectonic-thickening-produces-thick-crustal-provinces-v1',
    ],
  };
}

function unresolvedRegion(): StructureMaterialRegionV1 {
  return {
    schemaVersion: 1,
    regionId: 'm1a.region.unresolved',
    sourceStructuralRegionId: 'c2b.region.unresolved',
    anchor: createSphericalAnchor(-10, -40),
    extent: createSphericalExtent(18),
    resolutionStatus: 'UNRESOLVED',
    provinceCandidates: [{
      schemaVersion: 1,
      provinceClass: 'STRUCTURE_MATERIAL_UNRESOLVED',
      substrateAffinity: 'SUBSTRATE_AFFINITY_UNRESOLVED',
      thicknessTendency: 'THICKNESS_UNRESOLVED',
      buoyancyTendency: 'BUOYANCY_UNRESOLVED',
      resistanceTendencies: ['RESISTANCE_UNRESOLVED'],
      grainTendencies: ['NO_DIRECTIONAL_GRAIN_CLAIM'],
      terrainTermPermissionCandidates: ['NO_TERRAIN_TERM_CANDIDATE'],
      supportRange: createScientificRange(0.6, 0.9, 'normalized-0-1', 'normalized-0-1-v1', 'm1a.unresolved-support'),
      sourceStructuralRoles: ['STRUCTURALLY_UNRESOLVED'],
      sourceFieldIds: [],
      sourceNodeIds: ['node.unresolved'],
      rationaleIds: ['m1a.rationale.fail-closed'],
      evidenceIds: [],
    }],
    unresolvedReasonIds: ['m1a.unresolved.insufficient-material-evidence'],
    confidenceAssessmentSubject: 'm1a.region.unresolved.material',
    evidenceIds: [],
    contradictionIds: [],
    limitations: ['No affirmative structure/material class is justified.'],
  };
}

function sourceHash(kind: string) {
  return hashCausalPayload(`WorldWright/test/m1a-${kind}/v1`, { kind });
}

function findForbiddenPhysicalPayloadKeys(value: unknown, path = 'state'): string[] {
  if (Array.isArray(value)) return value.flatMap((entry, index) => findForbiddenPhysicalPayloadKeys(entry, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, nested]) => {
    const nestedPath = `${path}.${key}`;
    return [
      ...(forbiddenPhysicalPayloadKeys.has(key) ? [nestedPath] : []),
      ...findForbiddenPhysicalPayloadKeys(nested, nestedPath),
    ];
  });
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

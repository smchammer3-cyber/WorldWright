import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1,
  createLandformPotentialState,
  createScientificRange,
  createSphericalAnchor,
  createSphericalExtent,
  hashCausalPayload,
  validateLandformPotentialState,
  type LandformPotentialRegionV1,
} from '../src/core/causalGeology';
import {
  CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER,
  getAuthorityProcess,
  validateAuthorityProcessRegistry,
} from '../src/core/worldAuthority';

const repositoryRoot = process.cwd();
const resolverPath = resolve(repositoryRoot, 'src/core/causalGeology/landformPotentialResolver.ts');
const forbiddenPhysicalKeys = new Set([
  'baseHeight',
  'baseTerrain',
  'bathymetry',
  'bathymetryDepth',
  'coastline',
  'elevation',
  'finalTerrain',
  'height',
  'landMask',
  'rendererColor',
  'seaLevel',
  'surfaceMaterial',
  'terrain',
  'waterMask',
  'WorldBrain',
]);

const sourceProcessFieldProjectionHash = hashCausalPayload('WorldWright/test/l1a-projection/v1', { seed: 'l1a' });
const sourceContinentOceanStructureHash = hashCausalPayload('WorldWright/test/l1a-structure/v1', { seed: 'l1a' });
const sourceStructureMaterialStateHash = hashCausalPayload('WorldWright/test/l1a-material/v1', { seed: 'l1a' });

const thickeningRegion: LandformPotentialRegionV1 = {
  schemaVersion: 1,
  regionId: 'a-thickening-region',
  sourceStructuralRegionId: 'structural-region-a',
  sourceStructureMaterialRegionId: 'material-region-a',
  anchor: createSphericalAnchor(24, 36),
  extent: createSphericalExtent(14),
  resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
  leadingPotentialClass: 'THICKENING_RESPONSE_POTENTIAL',
  potentialCandidates: [{
    schemaVersion: 1,
    potentialClass: 'THICKENING_RESPONSE_POTENTIAL',
    responseModes: ['THICKENING_RESPONSE'],
    spatialExpressionCandidates: ['BELT_OR_ZONE_FAMILY', 'REGIONAL_SUPPORT_RESPONSE_FAMILY'],
    supportRange: createScientificRange(0.58, 0.81, 'normalized-0-1', 'normalized-0-1-v1', 'l1a.test.thickening.support'),
    sourceProvinceClasses: ['TECTONICALLY_THICKENED_CRUST'],
    sourceStructuralRoles: ['CONTINENTAL_MARGIN'],
    sourceFieldIds: ['convergenceInfluence', 'projectionConfidence'],
    sourceTerrainTermPermissions: ['LATER_THICKENING_RESPONSE_TERM_CANDIDATE'],
    rationaleIds: ['l1a.test.thickening-rationale'],
    evidenceIds: ['evidence.l1a.thickening'],
  }],
  suppressionCandidates: [{
    schemaVersion: 1,
    suppressionClass: 'NO_SUPPRESSION_CLAIM',
    supportRange: createScientificRange(0, 0, 'normalized-0-1', 'normalized-0-1-v1', 'l1a.test.no-suppression'),
    sourceProvinceClasses: [],
    sourceStructuralRoles: [],
    sourceFieldIds: [],
    rationaleIds: ['l1a.test.no-suppression-rationale'],
    evidenceIds: [],
  }],
  unresolvedReasonIds: [],
  confidenceAssessmentSubject: 'l1a.test.thickening-region',
  evidenceIds: ['evidence.l1a.thickening'],
  contradictionIds: [],
  limitations: ['Diagnostic response potential only; no terrain or elevation authority.'],
};

const unresolvedRegion: LandformPotentialRegionV1 = {
  schemaVersion: 1,
  regionId: 'b-unresolved-region',
  sourceStructuralRegionId: 'structural-region-b',
  sourceStructureMaterialRegionId: 'material-region-b',
  anchor: createSphericalAnchor(-18, -72),
  extent: createSphericalExtent(18),
  resolutionStatus: 'UNRESOLVED',
  potentialCandidates: [{
    schemaVersion: 1,
    potentialClass: 'LANDFORM_POTENTIAL_UNRESOLVED',
    responseModes: ['RESPONSE_UNRESOLVED'],
    spatialExpressionCandidates: ['EXPRESSION_UNRESOLVED'],
    supportRange: createScientificRange(0, 0, 'normalized-0-1', 'normalized-0-1-v1', 'l1a.test.unresolved.support'),
    sourceProvinceClasses: ['STRUCTURE_MATERIAL_UNRESOLVED'],
    sourceStructuralRoles: ['STRUCTURALLY_UNRESOLVED'],
    sourceFieldIds: [],
    sourceTerrainTermPermissions: ['NO_TERRAIN_TERM_CANDIDATE'],
    rationaleIds: ['l1a.test.fail-closed-unresolved'],
    evidenceIds: [],
  }],
  suppressionCandidates: [{
    schemaVersion: 1,
    suppressionClass: 'SPATIAL_COVERAGE_UNRESOLVED',
    supportRange: createScientificRange(0.72, 0.96, 'normalized-0-1', 'normalized-0-1-v1', 'l1a.test.coverage-suppression'),
    sourceProvinceClasses: ['STRUCTURE_MATERIAL_UNRESOLVED'],
    sourceStructuralRoles: ['STRUCTURALLY_UNRESOLVED'],
    sourceFieldIds: ['projectionConfidence'],
    rationaleIds: ['l1a.test.sparse-upstream-coverage'],
    evidenceIds: ['evidence.l1a.coverage-gap'],
  }],
  unresolvedReasonIds: ['l1a.unresolved.sparse-upstream-coverage'],
  confidenceAssessmentSubject: 'l1a.test.unresolved-region',
  evidenceIds: ['evidence.l1a.coverage-gap'],
  contradictionIds: [],
  limitations: ['Unresolved regions remain explicit and cannot be filled by arbitrary interpolation.'],
};

describe('L1A detached landform-potential contracts', () => {
  it('defines six research-required response families plus an explicit unresolved class', () => {
    expect(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1).toHaveLength(7);
    expect(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.map((entry) => entry.potentialClass)).toEqual([
      'EXTENSIONAL_RESPONSE_POTENTIAL',
      'GRAIN_ANISOTROPY_RESPONSE_POTENTIAL',
      'ISOSTATIC_SUPPORT_RESPONSE_POTENTIAL',
      'LANDFORM_POTENTIAL_UNRESOLVED',
      'MAGMATIC_CONSTRUCTION_POTENTIAL',
      'RESISTANCE_CONTRAST_RESPONSE_POTENTIAL',
      'THICKENING_RESPONSE_POTENTIAL',
    ]);
    expect(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.filter((entry) => entry.researchStatus === 'RESEARCH_REQUIRED')).toHaveLength(6);
    expect(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1.find((entry) => entry.potentialClass === 'LANDFORM_POTENTIAL_UNRESOLVED')).toMatchObject({
      researchStatus: 'UNRESOLVED',
      requiredTerrainTermPermissions: ['NO_TERRAIN_TERM_CANDIDATE'],
      permittedResponseModes: ['RESPONSE_UNRESOLVED'],
      permittedSpatialExpressions: ['EXPRESSION_UNRESOLVED'],
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      finalTerrainAuthority: false,
      terrainAuthority: false,
    });
    expect(Object.isFrozen(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1)).toBe(true);
  });

  it('creates deterministic immutable diagnostic state while preserving sparse unresolved coverage', () => {
    const options = {
      sourceProcessFieldProjectionHash,
      sourceContinentOceanStructureHash,
      sourceStructureMaterialStateHash,
      regions: [thickeningRegion, unresolvedRegion],
      evidenceIds: ['evidence.l1a.contract'],
      contradictionIds: [],
      limitations: [
        'L1A defines candidate response and suppression vocabulary only.',
        'No candidate is an elevation, terrain, land/water, bathymetry, or surface-material claim.',
      ],
    } as const;
    const state = createLandformPotentialState(options);
    const replay = createLandformPotentialState(options);
    validateLandformPotentialState(state);
    expect(state).toEqual(replay);
    expect(state).toMatchObject({
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      stateMode: 'DETACHED_DIAGNOSTIC',
      scientificStatus: 'PARTIAL',
      landformPotentialAuthority: false,
      baseTerrainAuthority: false,
      surfaceMaterialAuthority: false,
      finalLandAuthority: false,
      finalWaterAuthority: false,
      bathymetryAuthority: false,
      finalTerrainAuthority: false,
      terrainAuthority: false,
    });
    expect(state.regions[0]).toMatchObject({
      regionId: 'a-thickening-region',
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE',
      leadingPotentialClass: 'THICKENING_RESPONSE_POTENTIAL',
    });
    expect(state.regions[1]).toMatchObject({
      regionId: 'b-unresolved-region',
      resolutionStatus: 'UNRESOLVED',
    });
    expect(Object.isFrozen(state)).toBe(true);
    expect(Object.isFrozen(state.regions)).toBe(true);
    expect(findForbiddenKeys(state)).toEqual([]);
  });

  it('registers a shadow-only diagnostics process after structure/material interpretation', () => {
    expect(CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER).toContain('CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION');
    const materialIndex = CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER.indexOf('CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION');
    const landformIndex = CAUSAL_SHADOW_DIAGNOSTIC_PROCESS_ORDER.indexOf('CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION');
    expect(landformIndex).toBe(materialIndex + 1);
    const process = getAuthorityProcess('CAUSAL_LANDFORM_POTENTIAL_INTERPRETATION');
    expect(process).toMatchObject({
      owner: 'CAUSAL_LANDFORM_POTENTIAL_DIAGNOSTIC',
      modes: ['CAUSAL_SHADOW'],
      prerequisites: ['CAUSAL_STRUCTURE_MATERIAL_INTERPRETATION'],
      reads: ['causalRecord', 'diagnostics'],
      writes: ['diagnostics'],
    });
    expect(process.forbiddenWrites).toContain('landformPotentialAuthority');
    expect(process.forbiddenWrites).toContain('baseTerrain');
    expect(process.forbiddenWrites).toContain('finalTerrain');
    expect(process.forbiddenWrites).toContain('terrain');
    expect(validateAuthorityProcessRegistry()).toEqual([]);
  });

  it('fails closed on physical payloads, incompatible permissions, invented support, and unresolved leadership', () => {
    const physicalBypass = {
      ...thickeningRegion,
      elevation: 0.8,
    } as unknown as LandformPotentialRegionV1;
    expect(() => createLandformPotentialState({
      sourceProcessFieldProjectionHash,
      sourceContinentOceanStructureHash,
      sourceStructureMaterialStateHash,
      regions: [physicalBypass],
      limitations: ['Hostile physical bypass fixture.'],
    })).toThrow(/unowned field.*elevation/i);

    const incompatiblePermission = structuredClone(thickeningRegion);
    (incompatiblePermission.potentialCandidates[0] as { sourceTerrainTermPermissions: string[] }).sourceTerrainTermPermissions = [
      'LATER_MAGMATIC_CONSTRUCTION_TERM_CANDIDATE',
    ];
    expect(() => createLandformPotentialState({
      sourceProcessFieldProjectionHash,
      sourceContinentOceanStructureHash,
      sourceStructureMaterialStateHash,
      regions: [incompatiblePermission],
      limitations: ['Hostile permission fixture.'],
    })).toThrow(/incompatible terrain-term permission/i);

    const unsupportedProvince = structuredClone(thickeningRegion);
    (unsupportedProvince.potentialCandidates[0] as { sourceProvinceClasses: string[] }).sourceProvinceClasses = ['NORMAL_OCEANIC_CRUST'];
    expect(() => createLandformPotentialState({
      sourceProcessFieldProjectionHash,
      sourceContinentOceanStructureHash,
      sourceStructureMaterialStateHash,
      regions: [unsupportedProvince],
      limitations: ['Hostile province fixture.'],
    })).toThrow(/incompatible province/i);

    const unresolvedLeader = {
      ...unresolvedRegion,
      resolutionStatus: 'SINGLE_LEADING_CANDIDATE' as const,
      leadingPotentialClass: 'LANDFORM_POTENTIAL_UNRESOLVED' as const,
      unresolvedReasonIds: [],
    };
    expect(() => createLandformPotentialState({
      sourceProcessFieldProjectionHash,
      sourceContinentOceanStructureHash,
      sourceStructureMaterialStateHash,
      regions: [unresolvedLeader],
      limitations: ['Hostile unresolved-lead fixture.'],
    })).toThrow(/cannot lead with unresolved potential/i);
  });

  it('contains no resolver, random stream use, or ordinary Generate integration in L1A', () => {
    expect(existsSync(resolverPath)).toBe(false);
    const serialized = JSON.stringify(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1);
    expect(serialized).not.toContain('CAUSAL_ACTIVE');
    expect(serialized).not.toContain('surfaceExposureSummary');
    expect(serialized).not.toContain('WorldBrain');
    expect(findForbiddenKeys(L1A_LANDFORM_POTENTIAL_DEFINITIONS_V1)).toEqual([]);
  });
});

function findForbiddenKeys(value: unknown, path = '$'): readonly string[] {
  if (Array.isArray(value)) return value.flatMap((entry, index) => findForbiddenKeys(entry, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenPhysicalKeys.has(key)) found.push(`${path}.${key}`);
    found.push(...findForbiddenKeys(child, `${path}.${key}`));
  }
  return found;
}

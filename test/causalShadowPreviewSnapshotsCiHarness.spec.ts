import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createCausalGeologyInput,
  createCausalStageResult,
  createContinentOceanStructureResolverResearchContext,
  createGeologicSpineResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  createSphericalAnchor,
  createSphericalExtent,
  freezeContinentOceanStructureRuleSet,
  hashCausalPayload,
  resolveCausalProcessFieldProjection,
  resolveContinentOceanStructureFromProjection,
  resolveGeologicSpine,
  runRegimeHistoryShadow,
  sampleCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionDiagnosticGrid,
  validateCausalProcessFieldProjectionSet,
  validateContinentOceanStructureInterpretation,
  type CausalGeologyInputV1,
  type CausalProcessFieldProjectionDiagnosticGridV1,
  type CausalProcessFieldProjectionIdV1,
  type ContinentOceanStructuralRegionV1,
  type ContinentOceanStructuralRoleV1,
  type ContinentOceanStructureResearchReviewV1,
  type ContinentOceanStructureRuleSetV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineResearchReviewV1,
  type GeologicSpineV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchFixtureV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
  type SphericalAnchorV1,
  type TectonicRegimeHistoryV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_SHADOW_PREVIEW_OUT ?? 'artifacts/causal-shadow-preview/causal',
);

const seeds = ['1040037', '860009786'] as const;
const views = [
  { id: 'front', label: 'Triad 0°', longitudeDegrees: 0 },
  { id: 'triad-120', label: 'Triad +120°', longitudeDegrees: 120 },
  { id: 'triad-240', label: 'Triad -120°', longitudeDegrees: -120 },
] as const;
const fieldGridSize = { width: 72, height: 36 } as const;
const regionGridSize = { width: 24, height: 12 } as const;

const familyFields = [
  'accretionInfluence',
  'continentalKernelInfluence',
  'convergenceInfluence',
  'oceanBasinInfluence',
  'plumeInfluence',
  'riftInfluence',
  'transformInfluence',
] as const satisfies readonly CausalProcessFieldProjectionIdV1[];

const fieldColors: Readonly<Record<(typeof familyFields)[number], string>> = Object.freeze({
  accretionInfluence: '#56b37b',
  continentalKernelInfluence: '#d1b77a',
  convergenceInfluence: '#dc6f5c',
  oceanBasinInfluence: '#3578b5',
  plumeInfluence: '#a86ad8',
  riftInfluence: '#e0bd52',
  transformInfluence: '#a8adb8',
});

const roleColors: Readonly<Record<ContinentOceanStructuralRoleV1, string>> = Object.freeze({
  CONTINENTAL_INTERIOR: '#f0cf82',
  CONTINENTAL_MARGIN: '#e9a95e',
  CONTINENTAL_SHELF: '#73c8c8',
  CONTINENTAL_SLOPE: '#4ca2a9',
  DEEP_OCEAN_BASIN: '#27649c',
  DROWNED_CONTINENTAL_FRAGMENT: '#8a6ab8',
  OCEANIC_RIDGE_SYSTEM: '#ef765d',
  STRUCTURALLY_UNRESOLVED: '#5f6572',
  TRANSITIONAL_CRUST: '#71ae78',
  VOLCANIC_ARC_SYSTEM: '#d468ad',
});

const regimeFixtures = readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json');
const primaryFixture = requireFixture('positive/earthlike-mixed-evolution-v1');

interface PreviewManifestCaseV1 {
  readonly seed: string;
  readonly inputModel: 'CONTROLLED_EARTHLIKE_CAUSAL_FIXTURE_WITH_SHARED_ROOT_SEED';
  readonly projectionHash: string;
  readonly interpretationHash: string;
  readonly spineHash: string;
  readonly nodeCount: number;
  readonly nodeFamilies: Readonly<Record<string, number>>;
  readonly fieldStatistics: Readonly<Record<string, FieldStatisticsV1>>;
  readonly structuralResolutionCounts: Readonly<Record<string, number>>;
  readonly leadingRoleCounts: Readonly<Record<string, number>>;
  readonly ghostRiskCounts: Readonly<Record<string, number>>;
  readonly views: Readonly<Record<string, string>>;
  readonly limitations: readonly string[];
}

interface FieldStatisticsV1 {
  readonly minimum: number;
  readonly maximum: number;
  readonly mean: number;
  readonly nonzeroFraction: number;
}

describe('causal shadow preview snapshot harness', () => {
  it('creates same-seed diagnostic globe views without granting physical authority', () => {
    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const structuralContext = createStructuralResearchContext();
    const cases: PreviewManifestCaseV1[] = [];

    for (const seed of seeds) {
      const upstream = resolveUpstream(seed, primaryFixture, historyContext);
      const spineResolution = resolveGeologicSpine(
        upstream.input,
        upstream.premise,
        upstream.interior,
        upstream.history,
        spineContext,
      );
      expect(spineResolution.status).toBe('PARTIAL');
      if (!spineResolution.spine) throw new Error(`Preview seed ${seed} did not produce a geologic spine.`);
      const spine = spineResolution.spine;
      const projection = resolveCausalProcessFieldProjection(upstream.history, spine);
      validateCausalProcessFieldProjectionSet(projection);
      const grid = sampleCausalProcessFieldProjectionDiagnosticGrid(
        projection,
        fieldGridSize.width,
        fieldGridSize.height,
      );
      validateCausalProcessFieldProjectionDiagnosticGrid(grid);

      const structuralRegions = createStructuralRegions(regionGridSize.width, regionGridSize.height);
      const anchorByRegionId = new Map(structuralRegions.map((entry) => [entry.regionId, entry.anchor]));
      const interpretation = resolveContinentOceanStructureFromProjection({
        sourcePremiseHash: upstream.premise.contentHash,
        sourceGeologicSpineHash: spine.contentHash,
        premiseBodyClassCandidates: upstream.premise.bodyClassCandidates,
        projection,
        regions: structuralRegions,
        researchContext: structuralContext,
      });
      validateContinentOceanStructureInterpretation(interpretation);
      expect(interpretation).toMatchObject({
        authorityMode: 'CAUSAL_SHADOW',
        physicalGeneratorAuthority: 'LEGACY',
        structuralRoleAuthority: false,
        finalLandAuthority: false,
        finalWaterAuthority: false,
        bathymetryAuthority: false,
        terrainAuthority: false,
      });

      const seedDirectory = resolve(artifactRoot, seed);
      mkdirSync(seedDirectory, { recursive: true });
      const viewFiles: Record<string, string> = {};
      for (const view of views) {
        const fileName = `causal-preview-${view.id}.svg`;
        writeFileSync(
          resolve(seedDirectory, fileName),
          renderCausalPreviewSvg({
            seed,
            viewLabel: view.label,
            centerLongitudeDegrees: view.longitudeDegrees,
            grid,
            spine,
            regions: interpretation.regions,
            anchorByRegionId,
          }),
          'utf8',
        );
        viewFiles[view.id] = `${seed}/${fileName}`;
      }

      const fieldStatistics = Object.fromEntries(
        familyFields.map((fieldId) => [fieldId, summarizeValues(grid.valuesByField[fieldId])]),
      );
      const structuralResolutionCounts = countBy(interpretation.regions.map((region) => region.resolutionStatus));
      const leadingRoleCounts = countBy(
        interpretation.regions.map((region) => region.leadingRole ?? displayRole(region)),
      );
      const ghostRiskCounts = countBy(
        interpretation.regions.flatMap((region) => region.ghostRiskCandidates.map((candidate) => candidate.risk)),
      );
      const nodeFamilies = countBy(spine.nodes.map((node) => node.family));

      const previewCase: PreviewManifestCaseV1 = {
        seed,
        inputModel: 'CONTROLLED_EARTHLIKE_CAUSAL_FIXTURE_WITH_SHARED_ROOT_SEED',
        projectionHash: projection.contentHash.value,
        interpretationHash: interpretation.contentHash.value,
        spineHash: spine.contentHash.value,
        nodeCount: spine.nodes.length,
        nodeFamilies,
        fieldStatistics,
        structuralResolutionCounts,
        leadingRoleCounts,
        ghostRiskCounts,
        views: viewFiles,
        limitations: [
          'The shared value is the deterministic root seed; the causal preview currently uses the reviewed controlled Earth-like causal fixture rather than all legacy Generate settings.',
          'The preview visualizes geologic-spine sources, detached process fields, and structural-role candidates only.',
          'Color does not mean elevation, terrain, exposed rock, land, water, sea level, bathymetry, climate, biome, or final material.',
          'Ambiguous and unresolved regions are preserved rather than visually forced into a physical world.',
        ],
      };
      cases.push(previewCase);
      writeJson(resolve(seedDirectory, 'causal-preview-summary.json'), previewCase);
      writeJson(resolve(seedDirectory, 'structural-regions.json'), interpretation.regions.map((region) => ({
        regionId: region.regionId,
        anchor: anchorByRegionId.get(region.regionId),
        resolutionStatus: region.resolutionStatus,
        leadingRole: region.leadingRole,
        roleCandidates: region.roleCandidates.map((candidate) => ({
          role: candidate.role,
          supportRange: candidate.supportRange,
        })),
        ghostRisks: region.ghostRiskCandidates.map((candidate) => candidate.risk),
      })));
    }

    expect(cases).toHaveLength(seeds.length);
    expect(new Set(cases.map((entry) => entry.projectionHash)).size).toBe(seeds.length);
    expect(cases.every((entry) => entry.nodeCount > 0)).toBe(true);
    expect(cases.every((entry) => Object.values(entry.views).length === views.length)).toBe(true);

    writeJson(resolve(artifactRoot, 'manifest.json'), {
      schemaVersion: 1,
      previewVersion: 'CAUSAL_SHADOW_VISUAL_PREVIEW_V1',
      authorityMode: 'CAUSAL_SHADOW',
      physicalGeneratorAuthority: 'LEGACY',
      previewClassification: 'DETACHED_DIAGNOSTIC_VISUALIZATION',
      sameSeedComparisonScope: 'ROOT_SEED_SHARED_INPUT_MODEL_NOT_YET_IDENTICAL',
      generatedAt: new Date().toISOString(),
      fieldGridSize,
      regionGridSize,
      views,
      cases,
      authority: {
        ordinaryGenerateChanged: false,
        physicalOutputChanged: false,
        resolverAuthorityChanged: false,
        terrainAuthority: false,
        landWaterAuthority: false,
        bathymetryAuthority: false,
      },
      interpretationGuide: {
        fieldColorMeaning: 'Dominant detached process-field influence at the sampled point.',
        structuralRingMeaning: 'C2B structural-role interpretation on a coarse diagnostic grid.',
        dashedWhiteRingMeaning: 'Ambiguous structural candidates.',
        grayRingMeaning: 'Structurally unresolved.',
        whiteNodeMarkerMeaning: 'Validated geologic-spine source anchor.',
      },
      limitations: [
        'This is not a rendering of a completed causal planet.',
        'No material-province resolver, landform resolver, elevation model, terrain model, sea-level model, or renderer authority is present.',
        'The preview must not be used for visual calibration against the legacy output.',
      ],
    });
  });
});

function createHistoryResearchContext() {
  const review = readResearchJson<RegimeHistoryResearchReviewV1>('regime-history-review-record.json');
  return createRegimeHistoryResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('regime-history-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('regime-history-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('regime-history-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('regime-history-known-limitations.json'),
    }),
    fixtureSet: regimeFixtures,
    review,
  });
}

function createSpineResearchContext() {
  const review = readResearchJson<GeologicSpineResearchReviewV1>('geologic-spine-review-record.json');
  return createGeologicSpineResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('geologic-spine-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('geologic-spine-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('geologic-spine-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('geologic-spine-known-limitations.json'),
    }),
    fixtureSet: readResearchJson<GeologicSpineFixtureSetV1>('geologic-spine-fixtures.json'),
    review,
  });
}

function createStructuralResearchContext() {
  const review = readResearchJson<ContinentOceanStructureResearchReviewV1>('continent-ocean-structure-review-record.json');
  return createContinentOceanStructureResolverResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('continent-ocean-structure-source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('continent-ocean-structure-claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('continent-ocean-structure-correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('continent-ocean-structure-known-limitations.json'),
    }),
    ruleSet: freezeContinentOceanStructureRuleSet(
      readResearchJson<ContinentOceanStructureRuleSetV1>('continent-ocean-structure-role-rules.json'),
    ),
    review,
  });
}

function resolveUpstream(
  seed: string,
  fixture: RegimeHistoryResearchFixtureV1,
  historyContext: ReturnType<typeof createHistoryResearchContext>,
): {
  readonly input: CausalGeologyInputV1;
  readonly premise: PlanetaryPremiseV1;
  readonly interior: InteriorStateV1;
  readonly history: TectonicRegimeHistoryV1;
} {
  const input = inputForFixture(seed, fixture);
  const premise = premiseForFixture(input, fixture);
  const interior = interiorForFixture(seed, fixture);
  const run = runRegimeHistoryShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags: resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true }),
    inputSnapshot: input,
    premise,
    interior,
    interiorStageResult: createCausalStageResult({
      stageId: 'CAUSAL_INTERIOR_RESOLUTION',
      stageVersion: 1,
      status: 'PARTIAL',
      input: { inputSnapshot: input, premise },
      record: interior,
      limitations: interior.limitations,
      missingDomains: ['controlled-preview-interior-fixture'],
      downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
    }),
    researchContext: historyContext,
  });
  if (!run.resolution.history) throw new Error(`Preview upstream fixture ${fixture.fixtureId} did not produce regime history.`);
  return { input, premise, interior, history: run.resolution.history };
}

function inputForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): CausalGeologyInputV1 {
  return createCausalGeologyInput(seed, [
    {
      schemaVersion: 1,
      inputId: 'thermal.age',
      quantity: createScientificQuantity(fixture.ageGyr, 'gigaannum', 'gigaannum-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `preview:${seed}:thermal-age`,
      confidenceSubject: `preview.${seed}.thermal-age`,
      evidenceIds: [],
    },
    {
      schemaVersion: 1,
      inputId: 'inventory.water',
      quantity: createScientificQuantity(fixture.waterInventory, 'earth-water-inventory', 'earth-water-inventory-v1'),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `preview:${seed}:water`,
      confidenceSubject: `preview.${seed}.water`,
      evidenceIds: [],
    },
  ], {
    initialConditionBundleHash: hashCausalPayload('WorldWright/preview/initial-condition-bundle/v1', {
      fixtureId: fixture.fixtureId,
      seed,
    }),
    limitations: ['Preview uses the controlled Earth-like causal input fixture and shared root seed only.'],
  });
}

function premiseForFixture(input: CausalGeologyInputV1, fixture: RegimeHistoryResearchFixtureV1): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: input.contentHash,
    bodyClassCandidates: fixture.premiseBodyClassCandidates,
    surfaceMediumCandidates: ['CONTROLLED_SOLID_SURFACE'],
    layerStackCandidates: ['CONTROLLED_SOLID_LAYER_STACK'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `preview.${input.rootSeed}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Preview uses a controlled validated premise fixture.'],
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload) };
}

function interiorForFixture(seed: string, fixture: RegimeHistoryResearchFixtureV1): InteriorStateV1 {
  const normalized = (center: number, subject: string) => createScientificRange(
    Math.max(0, center - 0.04),
    Math.min(1, center + 0.04),
    'normalized-0-1',
    'normalized-0-1-v1',
    subject,
  );
  const payload = {
    schemaVersion: 1 as const,
    status: 'PARTIAL' as const,
    interiorVersion: 1,
    thermalBudgetRange: normalized(fixture.interior.thermalBudgetCenter, `preview.${seed}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.primordial, `preview.${seed}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.radiogenic, `preview.${seed}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(fixture.interior.heatSourceFractions.tidal, `preview.${seed}.tidal`) },
    ],
    mantleConvectionRange: normalized(fixture.interior.convectionCenter, `preview.${seed}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: fixture.interior.lidRegimeCandidates,
    resolvedLidRegime: fixture.interior.resolvedLidRegime,
    meltAndVolcanismRange: normalized(fixture.interior.meltCenter, `preview.${seed}.melt`),
    riftTendencyRange: normalized(fixture.interior.riftCenter, `preview.${seed}.rift`),
    hotspotTendencyRange: normalized(fixture.interior.hotspotCenter, `preview.${seed}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `preview.${seed}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['Preview uses a controlled validated interior fixture.'],
  };
  return { ...payload, contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload) };
}

function createStructuralRegions(width: number, height: number) {
  return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
    const latitudeDegrees = 90 - ((y + 0.5) * 180) / height;
    const longitudeDegrees = -180 + ((x + 0.5) * 360) / width;
    return {
      regionId: `preview-cell-${String(y).padStart(2, '0')}-${String(x).padStart(2, '0')}`,
      anchor: createSphericalAnchor(latitudeDegrees, longitudeDegrees),
      extent: createSphericalExtent(180 / height / 2),
    };
  })).flat();
}

function renderCausalPreviewSvg(options: {
  readonly seed: string;
  readonly viewLabel: string;
  readonly centerLongitudeDegrees: number;
  readonly grid: CausalProcessFieldProjectionDiagnosticGridV1;
  readonly spine: GeologicSpineV1;
  readonly regions: readonly ContinentOceanStructuralRegionV1[];
  readonly anchorByRegionId: ReadonlyMap<string, SphericalAnchorV1>;
}): string {
  const width = 768;
  const height = 768;
  const centerX = width / 2;
  const centerY = 365;
  const radius = 300;
  const fieldDots: string[] = [];
  const roleRings: string[] = [];
  const nodeMarks: string[] = [];

  for (let y = 0; y < options.grid.height; y += 1) {
    const latitudeDegrees = 90 - ((y + 0.5) * 180) / options.grid.height;
    for (let x = 0; x < options.grid.width; x += 1) {
      const longitudeDegrees = -180 + ((x + 0.5) * 360) / options.grid.width;
      const projected = projectOrthographic(latitudeDegrees, longitudeDegrees, options.centerLongitudeDegrees, centerX, centerY, radius);
      if (!projected.visible) continue;
      const index = y * options.grid.width + x;
      const dominant = familyFields
        .map((fieldId) => ({ fieldId, value: options.grid.valuesByField[fieldId][index] ?? 0 }))
        .sort((a, b) => b.value - a.value)[0];
      if (!dominant || dominant.value < 0.025) continue;
      const opacity = Math.min(0.88, 0.18 + dominant.value * 0.72);
      fieldDots.push(`<circle cx="${projected.x.toFixed(2)}" cy="${projected.y.toFixed(2)}" r="5.1" fill="${fieldColors[dominant.fieldId]}" fill-opacity="${opacity.toFixed(3)}"/>`);
    }
  }

  for (const region of options.regions) {
    const anchor = options.anchorByRegionId.get(region.regionId);
    if (!anchor) continue;
    const projected = projectOrthographic(anchor.latitudeDegrees, anchor.longitudeDegrees, options.centerLongitudeDegrees, centerX, centerY, radius);
    if (!projected.visible) continue;
    const role = displayRole(region);
    const color = roleColors[role];
    if (region.resolutionStatus === 'AMBIGUOUS_CANDIDATES') {
      roleRings.push(`<circle cx="${projected.x.toFixed(2)}" cy="${projected.y.toFixed(2)}" r="7.4" fill="none" stroke="#f7f8fb" stroke-width="1.4" stroke-dasharray="3 3" opacity="0.78"/>`);
    } else {
      roleRings.push(`<circle cx="${projected.x.toFixed(2)}" cy="${projected.y.toFixed(2)}" r="6.2" fill="none" stroke="${color}" stroke-width="1.8" opacity="0.86"/>`);
    }
  }

  for (const node of options.spine.nodes) {
    const projected = projectOrthographic(node.anchor.latitudeDegrees, node.anchor.longitudeDegrees, options.centerLongitudeDegrees, centerX, centerY, radius);
    if (!projected.visible) continue;
    const fieldId = nodeFamilyField(node.family);
    nodeMarks.push(`<circle cx="${projected.x.toFixed(2)}" cy="${projected.y.toFixed(2)}" r="4.3" fill="${fieldColors[fieldId]}" stroke="#ffffff" stroke-width="1.8"/>`);
  }

  const legend = familyFields.map((fieldId, index) => {
    const x = 62 + (index % 4) * 176;
    const y = 696 + Math.floor(index / 4) * 25;
    return `<circle cx="${x}" cy="${y}" r="5" fill="${fieldColors[fieldId]}"/><text x="${x + 10}" y="${y + 4}" font-size="11" fill="#d7dbe4">${escapeXml(shortFieldLabel(fieldId))}</text>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="globeGlow" cx="42%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1c2a43"/>
      <stop offset="72%" stop-color="#0d1525"/>
      <stop offset="100%" stop-color="#070b13"/>
    </radialGradient>
    <clipPath id="globeClip"><circle cx="${centerX}" cy="${centerY}" r="${radius}"/></clipPath>
  </defs>
  <rect width="100%" height="100%" fill="#080c14"/>
  <text x="${centerX}" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#f3f5f8">Causal Shadow Preview · Seed ${escapeXml(options.seed)}</text>
  <text x="${centerX}" y="54" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" fill="#aeb7c7">${escapeXml(options.viewLabel)} · diagnostic fields and structural candidates only</text>
  <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="url(#globeGlow)" stroke="#53647f" stroke-width="2"/>
  <g clip-path="url(#globeClip)">${fieldDots.join('')}</g>
  <g clip-path="url(#globeClip)">${roleRings.join('')}</g>
  <g clip-path="url(#globeClip)">${nodeMarks.join('')}</g>
  <circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="#8290a7" stroke-width="1.2"/>
  <text x="${centerX}" y="674" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#f3c96b">DIAGNOSTIC ONLY — NO TERRAIN, LAND/WATER, BATHYMETRY, OR MATERIAL AUTHORITY</text>
  <g font-family="system-ui, sans-serif">${legend}</g>
  <text x="590" y="721" font-family="system-ui, sans-serif" font-size="11" fill="#d7dbe4">○ role candidate</text>
  <text x="590" y="746" font-family="system-ui, sans-serif" font-size="11" fill="#d7dbe4">◌ ambiguity · ● spine source</text>
</svg>`;
}

function projectOrthographic(
  latitudeDegrees: number,
  longitudeDegrees: number,
  centerLongitudeDegrees: number,
  centerX: number,
  centerY: number,
  radius: number,
) {
  const latitude = degreesToRadians(latitudeDegrees);
  const longitudeDelta = degreesToRadians(normalizeLongitude(longitudeDegrees - centerLongitudeDegrees));
  const visibility = Math.cos(latitude) * Math.cos(longitudeDelta);
  return {
    visible: visibility >= 0,
    x: centerX + radius * Math.cos(latitude) * Math.sin(longitudeDelta),
    y: centerY - radius * Math.sin(latitude),
  };
}

function displayRole(region: ContinentOceanStructuralRegionV1): ContinentOceanStructuralRoleV1 {
  if (region.leadingRole) return region.leadingRole;
  if (region.resolutionStatus === 'UNRESOLVED') return 'STRUCTURALLY_UNRESOLVED';
  return region.roleCandidates[0]?.role ?? 'STRUCTURALLY_UNRESOLVED';
}

function nodeFamilyField(family: GeologicSpineV1['nodes'][number]['family']): (typeof familyFields)[number] {
  const mapping = {
    ACCRETION_SYSTEM: 'accretionInfluence',
    CONTINENTAL_KERNEL: 'continentalKernelInfluence',
    CONVERGENCE_SYSTEM: 'convergenceInfluence',
    OCEAN_BASIN: 'oceanBasinInfluence',
    PLUME_SYSTEM: 'plumeInfluence',
    RIFT_SYSTEM: 'riftInfluence',
    TRANSFORM_SYSTEM: 'transformInfluence',
  } as const;
  return mapping[family];
}

function shortFieldLabel(fieldId: (typeof familyFields)[number]): string {
  return fieldId
    .replace('Influence', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

function summarizeValues(values: readonly number[]): FieldStatisticsV1 {
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const nonzeroFraction = values.filter((value) => value > 0.025).length / values.length;
  return {
    minimum: round6(minimum),
    maximum: round6(maximum),
    mean: round6(mean),
    nonzeroFraction: round6(nonzeroFraction),
  };
}

function countBy(values: readonly string[]): Readonly<Record<string, number>> {
  return Object.freeze(Object.fromEntries(
    [...new Set(values)].sort(compareStableText).map((value) => [value, values.filter((entry) => entry === value).length]),
  ));
}

function requireFixture(fixtureId: string): RegimeHistoryResearchFixtureV1 {
  const fixture = regimeFixtures.fixtures.find((entry) => entry.fixtureId === fixtureId);
  if (!fixture) throw new Error(`Missing preview regime-history fixture ${fixtureId}.`);
  return fixture;
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function normalizeLongitude(value: number): number {
  let normalized = value % 360;
  if (normalized > 180) normalized -= 360;
  if (normalized < -180) normalized += 360;
  return normalized;
}

function degreesToRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function round6(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  }[character] ?? character));
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

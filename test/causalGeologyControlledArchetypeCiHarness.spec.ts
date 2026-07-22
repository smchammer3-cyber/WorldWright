import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CAUSAL_INPUT_AUTHORITY_REGISTRY,
  W1_06_REQUIRED_ARCHETYPE_FAMILIES,
  createCausalControlledArchetypeCoverageReport,
  createCausalGeologyInput,
  createCausalStageResult,
  createGeologicSpineResearchContext,
  createPremiseResolutionInput,
  createPremiseResolverResearchContext,
  createRegimeHistoryResearchContext,
  createScientificQuantity,
  createScientificRange,
  createScientificResearchBundle,
  hashCausalPayload,
  normalizeRootSeedIdentity,
  resolvePlanetaryPremise,
  runGeologicSpineShadow,
  runRegimeHistoryShadow,
  validateCausalControlledArchetypeCoverageReport,
  validateGeologicSpineShadowRunnerResult,
  validateInteriorState,
  validatePlanetaryPremise,
  validatePlanetaryPremiseResolution,
  validateRegimeHistoryShadowRunnerResult,
  type CausalControlledArchetypeCriterionV1,
  type CausalControlledArchetypeEvidenceModeV1,
  type CausalControlledArchetypeExecutionV1,
  type CausalControlledArchetypeFamilyV1,
  type CausalGeologyInputId,
  type CausalGeologyInputV1,
  type CausalInputDeclarationV1,
  type CausalStageResultV1,
  type GeologicSpineFixtureSetV1,
  type GeologicSpineResearchReviewV1,
  type InteriorStateV1,
  type PlanetaryPremiseV1,
  type PremiseCompatibilityMatrixV1,
  type PremiseFixtureSetV1,
  type PremiseResearchReviewV1,
  type RegimeHistoryFixtureSetV1,
  type RegimeHistoryResearchReviewV1,
  type ScientificClaimRuleV1,
  type ScientificSourceV1,
} from '../src/core/causalGeology';
import { resolveWorldFeatureFlags } from '../src/core/worldFeatureFlags/resolve';

interface NaturalProfileInputsV1 {
  readonly radius: number;
  readonly density: number;
  readonly water: number;
  readonly volatiles: number;
  readonly ageGyr: number;
  readonly primordialHeat: number;
  readonly radiogenicHeat: number;
  readonly tidalHeating: number;
}

interface NaturalProfileInteriorV1 {
  readonly thermal: number;
  readonly convection: number;
  readonly melt: number;
  readonly rift: number;
  readonly hotspot: number;
  readonly lidCandidates: InteriorStateV1['lidRegimeCandidates'];
  readonly resolvedLid: NonNullable<InteriorStateV1['resolvedLidRegime']>;
}

interface NaturalArchetypeProfileV1 {
  readonly profileId: string;
  readonly archetypeFamily: CausalControlledArchetypeFamilyV1;
  readonly evidenceMode: 'CONTROLLED_NATURAL_CHAIN';
  readonly criterion: CausalControlledArchetypeCriterionV1;
  readonly bodyClassCandidates: PlanetaryPremiseV1['bodyClassCandidates'];
  readonly inputs: NaturalProfileInputsV1;
  readonly interior: NaturalProfileInteriorV1;
  readonly limitations: readonly string[];
}

interface ExceptionArchetypeProfileV1 {
  readonly profileId: string;
  readonly archetypeFamily: CausalControlledArchetypeFamilyV1;
  readonly evidenceMode: 'APPROVED_EXCEPTION_PREMISE';
  readonly criterion: 'APPROVED_EXCEPTION_PERMISSION';
  readonly premiseFixtureId: string;
  readonly limitations: readonly string[];
}

type ArchetypeProfileV1 = NaturalArchetypeProfileV1 | ExceptionArchetypeProfileV1;

interface ArchetypeCaseDefinitionV1 {
  readonly caseId: string;
  readonly rootSeed: string;
  readonly profileId: string;
}

interface ControlledArchetypeCorpusV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'W1_06B2_CONTROLLED_ARCHETYPE_CORPUS_V1';
  readonly authorityMode: 'CAUSAL_SHADOW';
  readonly physicalGeneratorAuthority: 'LEGACY';
  readonly upstreamMode: 'CONTROLLED_VALIDATED_W1_FIXTURES';
  readonly profiles: readonly ArchetypeProfileV1[];
  readonly cases: readonly ArchetypeCaseDefinitionV1[];
}

const repositoryRoot = process.cwd();
const researchRoot = resolve(repositoryRoot, 'src/core/causalGeology/research');
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures');
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_CONTROLLED_ARCHETYPE_CI_OUT ?? 'artifacts/causal-controlled-archetype-gate',
);
const corpus = readFixtureJson<ControlledArchetypeCorpusV1>('w1-06b2-controlled-archetype-corpus.json');
const premiseFixtureSet = readResearchJson<PremiseFixtureSetV1>('premise-fixtures.json');
const authorityById = new Map(CAUSAL_INPUT_AUTHORITY_REGISTRY.map((entry) => [entry.inputId, entry]));

function createPremiseResearchContext() {
  const review = readResearchJson<PremiseResearchReviewV1>('review-record.json');
  return createPremiseResolverResearchContext({
    researchBundle: createScientificResearchBundle({
      bundleVersion: review.bundleVersion,
      sources: readResearchJson<ScientificSourceV1[]>('source-registry.json'),
      claimRules: readResearchJson<ScientificClaimRuleV1[]>('claim-rules.json'),
      correlationGroups: readResearchJson<string[]>('correlation-groups.json'),
      knownLimitations: readResearchJson<string[]>('known-limitations.json'),
    }),
    compatibilityMatrix: readResearchJson<PremiseCompatibilityMatrixV1>('premise-compatibility-matrix.json'),
    fixtureSet: premiseFixtureSet,
    review,
  });
}

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
    fixtureSet: readResearchJson<RegimeHistoryFixtureSetV1>('regime-history-fixtures.json'),
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

describe('W1-06B2 controlled archetype CI harness', () => {
  it('executes three unique seeds for every required archetype without granting physical authority', () => {
    validateCorpus(corpus);
    const profileById = new Map(corpus.profiles.map((profile) => [profile.profileId, profile]));
    const premiseContext = createPremiseResearchContext();
    const historyContext = createHistoryResearchContext();
    const spineContext = createSpineResearchContext();
    const featureFlags = resolveWorldFeatureFlags('CAUSAL_SHADOW', { 'causal.shadow.enabled': true });

    rmSync(artifactRoot, { recursive: true, force: true });
    mkdirSync(artifactRoot, { recursive: true });

    const executions: CausalControlledArchetypeExecutionV1[] = [];
    for (const caseDefinition of corpus.cases) {
      const profile = profileById.get(caseDefinition.profileId);
      if (!profile) throw new Error(`Missing W1-06B2 profile ${caseDefinition.profileId}.`);
      const execution = profile.evidenceMode === 'CONTROLLED_NATURAL_CHAIN'
        ? executeNaturalCase(caseDefinition, profile, historyContext, spineContext, featureFlags)
        : executeExceptionCase(caseDefinition, profile, premiseContext);
      executions.push(execution);
      writeJson(resolve(artifactRoot, 'cases', `${caseDefinition.caseId}.json`), execution);
    }

    const report = createCausalControlledArchetypeCoverageReport(executions);
    validateCausalControlledArchetypeCoverageReport(report);

    expect(report.softwareGatePass).toBe(true);
    expect(report.scientificStatus).toBe('PARTIAL');
    expect(report.caseCount).toBe(30);
    expect(report.uniqueSeedCount).toBe(30);
    expect(report.coverage.coveredFamilies).toEqual(W1_06_REQUIRED_ARCHETYPE_FAMILIES);
    expect(report.coverage.missingFamilies).toEqual([]);
    expect(report.coverage.underrepresentedFamilies).toEqual([]);
    expect(Object.values(report.coverage.casesPerFamily)).toEqual(Array(10).fill(3));
    expect(report.determinism.replayFailureCaseIds).toEqual([]);
    expect(report.determinism.missingNaturalHashCaseIds).toEqual([]);
    expect(report.criteria.failureCaseIds).toEqual([]);
    expect(report.contradictions.openCount).toBe(0);
    expect(report.performance.overBudgetCaseIds).toEqual([]);
    expect(Object.isFrozen(report)).toBe(true);

    writeJson(resolve(artifactRoot, 'corpus-manifest.json'), {
      schemaVersion: 1,
      corpusVersion: corpus.corpusVersion,
      authorityMode: corpus.authorityMode,
      physicalGeneratorAuthority: corpus.physicalGeneratorAuthority,
      upstreamMode: corpus.upstreamMode,
      profileCount: corpus.profiles.length,
      caseCount: corpus.cases.length,
      uniqueSeedCount: new Set(corpus.cases.map((entry) => entry.rootSeed)).size,
      softwareGatePass: report.softwareGatePass,
      scientificStatus: report.scientificStatus,
    });
    writeJson(resolve(artifactRoot, 'controlled-archetype-report.json'), report);
    writeJson(resolve(artifactRoot, 'scientific-limitations.json'), {
      schemaVersion: 1,
      scientificStatus: report.scientificStatus,
      limitations: report.limitations,
      nextScope: 'W1-06B3 detached positive, threshold, negative, and approved-exception reference integration',
    });
  });
});

function executeNaturalCase(
  caseDefinition: ArchetypeCaseDefinitionV1,
  profile: NaturalArchetypeProfileV1,
  historyContext: ReturnType<typeof createHistoryResearchContext>,
  spineContext: ReturnType<typeof createSpineResearchContext>,
  featureFlags: ReturnType<typeof resolveWorldFeatureFlags>,
): CausalControlledArchetypeExecutionV1 {
  const startHeap = process.memoryUsage().heapUsed;
  const startTime = performance.now();
  const input = inputForNaturalCase(caseDefinition, profile);
  const premise = premiseForNaturalCase(caseDefinition, profile, input);
  const interior = interiorForNaturalCase(caseDefinition, profile);
  const stage = interiorStageResult(input, premise, interior);

  const history = runRegimeHistoryShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags,
    inputSnapshot: input,
    premise,
    interior,
    interiorStageResult: stage,
    researchContext: historyContext,
  });
  const historyReplay = runRegimeHistoryShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags,
    inputSnapshot: input,
    premise,
    interior,
    interiorStageResult: stage,
    researchContext: historyContext,
  });
  expect(history).toEqual(historyReplay);
  validateRegimeHistoryShadowRunnerResult(history);
  const historyRecord = history.resolution.history;
  if (!historyRecord) throw new Error(`Natural W1-06B2 case ${caseDefinition.caseId} did not produce regime history.`);

  const spine = runGeologicSpineShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags,
    inputSnapshot: input,
    premise,
    interior,
    regimeHistory: historyRecord,
    regimeHistoryStageResult: history.stageResult,
    researchContext: spineContext,
  });
  const spineReplay = runGeologicSpineShadow({
    authorityMode: 'CAUSAL_SHADOW',
    featureFlags,
    inputSnapshot: input,
    premise,
    interior,
    regimeHistory: historyRecord,
    regimeHistoryStageResult: history.stageResult,
    researchContext: spineContext,
  });
  expect(spine).toEqual(spineReplay);
  validateGeologicSpineShadowRunnerResult(spine);
  const spineRecord = spine.resolution.spine;
  if (!spineRecord) throw new Error(`Natural W1-06B2 case ${caseDefinition.caseId} did not produce a geologic spine.`);

  const familyCounts = countFeatureFamilies(spineRecord.nodes.map((node) => node.family));
  const contradictionIds = new Set([
    ...input.contradictionIds,
    ...premise.contradictionIds,
    ...interior.contradictionIds,
    ...historyRecord.contradictionIds,
    ...spineRecord.contradictionIds,
  ]);
  const payload = { input, premise, interior, history: historyRecord, spine: spineRecord };
  const execution: CausalControlledArchetypeExecutionV1 = {
    schemaVersion: 1,
    caseId: caseDefinition.caseId,
    rootSeed: caseDefinition.rootSeed,
    archetypeFamily: profile.archetypeFamily,
    evidenceMode: profile.evidenceMode,
    criterion: profile.criterion,
    observedStageStatus: spine.stageResult.status,
    criterionPass: naturalCriterionPass(profile, interior, familyCounts),
    replayStable: JSON.stringify(history) === JSON.stringify(historyReplay) && JSON.stringify(spine) === JSON.stringify(spineReplay),
    currentRegime: interior.resolvedLidRegime ?? 'UNRESOLVED',
    historyHash: historyRecord.contentHash.value,
    spineHash: spineRecord.contentHash.value,
    featureFamilyCounts: familyCounts,
    openContradictionCount: contradictionIds.size,
    durationMilliseconds: performance.now() - startTime,
    heapDeltaBytes: Math.max(0, process.memoryUsage().heapUsed - startHeap),
    serializedPayloadBytes: Buffer.byteLength(JSON.stringify(payload), 'utf8'),
    limitations: [
      ...profile.limitations,
      'Controlled upstream premise and interior states remain detached CAUSAL_SHADOW evidence only.',
    ],
  };
  expect(JSON.stringify(execution)).not.toContain('baseHeight');
  expect(JSON.stringify(execution)).not.toContain('WorldBrain');
  return execution;
}

function executeExceptionCase(
  caseDefinition: ArchetypeCaseDefinitionV1,
  profile: ExceptionArchetypeProfileV1,
  premiseContext: ReturnType<typeof createPremiseResearchContext>,
): CausalControlledArchetypeExecutionV1 {
  const startHeap = process.memoryUsage().heapUsed;
  const startTime = performance.now();
  const fixture = premiseFixtureSet.fixtures.find((entry) => entry.fixtureId === profile.premiseFixtureId);
  if (!fixture) throw new Error(`Missing approved premise fixture ${profile.premiseFixtureId}.`);
  expect(fixture.kind).toBe('EXCEPTION');
  expect(fixture.expected.status).toBe('COMPLETE');

  const inputSnapshotHash = hashCausalPayload('WorldWright/w1-06b2-approved-exception-input/v1', {
    caseId: caseDefinition.caseId,
    rootSeed: caseDefinition.rootSeed,
    fixtureId: fixture.fixtureId,
  });
  const resolutionInput = createPremiseResolutionInput({
    inputSnapshotHash,
    rootSeed: normalizeRootSeedIdentity(caseDefinition.rootSeed),
    quantities: fixture.input.quantities,
    exceptionPermissions: fixture.input.exceptionPermissions,
    declarationTags: fixture.input.scenarioTags,
  });
  const resolution = resolvePlanetaryPremise(resolutionInput, premiseContext);
  const replay = resolvePlanetaryPremise(resolutionInput, premiseContext);
  expect(resolution).toEqual(replay);
  validatePlanetaryPremiseResolution(resolution);
  if (!resolution.premise) throw new Error(`Approved exception ${caseDefinition.caseId} did not produce premise evidence.`);

  const criterionPass =
    resolution.status === 'COMPLETE'
    && resolution.premise.bodyClassCandidates.includes('ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')
    && fixture.input.exceptionPermissions.includes('ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL')
    && resolution.blockingReasons.length === 0;
  const execution: CausalControlledArchetypeExecutionV1 = {
    schemaVersion: 1,
    caseId: caseDefinition.caseId,
    rootSeed: caseDefinition.rootSeed,
    archetypeFamily: profile.archetypeFamily,
    evidenceMode: profile.evidenceMode,
    criterion: profile.criterion,
    observedStageStatus: resolution.status,
    criterionPass,
    replayStable: JSON.stringify(resolution) === JSON.stringify(replay),
    currentRegime: 'NOT_APPLICABLE_PERMISSIONED_EXCEPTION',
    premiseHash: resolution.premise.contentHash.value,
    featureFamilyCounts: {},
    openContradictionCount: resolution.contradictionIds.length,
    durationMilliseconds: performance.now() - startTime,
    heapDeltaBytes: Math.max(0, process.memoryUsage().heapUsed - startHeap),
    serializedPayloadBytes: Buffer.byteLength(JSON.stringify({ resolutionInput, resolution }), 'utf8'),
    limitations: [
      ...profile.limitations,
      'This evidence invokes the reviewed premise resolver directly because the artificial initial-condition prior is intentionally unimplemented and blocked.',
      'No regime-history, geologic-spine, terrain, or physical-world authority follows from the approved exception.',
    ],
  };
  expect(JSON.stringify(execution)).not.toContain('baseHeight');
  expect(JSON.stringify(execution)).not.toContain('WorldBrain');
  return execution;
}

function inputForNaturalCase(
  caseDefinition: ArchetypeCaseDefinitionV1,
  profile: NaturalArchetypeProfileV1,
): CausalGeologyInputV1 {
  const values: readonly [CausalGeologyInputId, number][] = [
    ['planet.radius', profile.inputs.radius],
    ['planet.density', profile.inputs.density],
    ['star.luminosity', 1],
    ['orbit.distance', 1],
    ['climate.declared-albedo', 0.3],
    ['climate.declared-greenhouse', 0.35],
    ['inventory.water', profile.inputs.water],
    ['inventory.volatiles', profile.inputs.volatiles],
    ['thermal.age', profile.inputs.ageGyr],
    ['thermal.primordial-heat', profile.inputs.primordialHeat],
    ['thermal.radiogenic-heat', profile.inputs.radiogenicHeat],
    ['thermal.tidal-heating', profile.inputs.tidalHeating],
  ];
  const declarations: CausalInputDeclarationV1[] = values.map(([inputId, value]) => {
    const authority = authorityById.get(inputId);
    if (!authority) throw new Error(`Missing W1-06B2 authority contract ${inputId}.`);
    return {
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(value, authority.requiredUnit, authority.requiredScaleId),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: `w1-06b2/${caseDefinition.caseId}/${inputId}`,
      confidenceSubject: `w1-06b2.${caseDefinition.caseId}.${inputId}`,
      evidenceIds: [],
    };
  });
  return createCausalGeologyInput(caseDefinition.rootSeed, declarations, {
    initialConditionBundleHash: hashCausalPayload('WorldWright/w1-06b2-controlled-input-bundle/v1', {
      caseId: caseDefinition.caseId,
      profileId: profile.profileId,
      values,
    }),
    limitations: ['W1-06B2 controlled validated direct-input profile.'],
  });
}

function premiseForNaturalCase(
  caseDefinition: ArchetypeCaseDefinitionV1,
  profile: NaturalArchetypeProfileV1,
  input: CausalGeologyInputV1,
): PlanetaryPremiseV1 {
  const payload = {
    schemaVersion: 1 as const,
    premiseVersion: 1,
    status: 'PARTIAL' as const,
    inputSnapshotHash: input.contentHash,
    bodyClassCandidates: profile.bodyClassCandidates,
    surfaceMediumCandidates: ['CONTROLLED_SOLID_SURFACE'],
    layerStackCandidates: ['CONTROLLED_SOLID_LAYER_STACK'],
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-06b2.${caseDefinition.caseId}.premise`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-06B2 uses a controlled validated premise to test downstream detached archetype behavior.'],
  };
  const premise = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planetary-premise/v1', payload),
  };
  validatePlanetaryPremise(premise);
  return premise;
}

function interiorForNaturalCase(
  caseDefinition: ArchetypeCaseDefinitionV1,
  profile: NaturalArchetypeProfileV1,
): InteriorStateV1 {
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
    thermalBudgetRange: normalized(profile.interior.thermal, `w1-06b2.${caseDefinition.caseId}.thermal`),
    heatSourceFractions: [
      { sourceId: 'PRIMORDIAL' as const, fractionRange: normalized(profile.inputs.primordialHeat, `w1-06b2.${caseDefinition.caseId}.primordial`) },
      { sourceId: 'RADIOGENIC' as const, fractionRange: normalized(profile.inputs.radiogenicHeat, `w1-06b2.${caseDefinition.caseId}.radiogenic`) },
      { sourceId: 'TIDAL' as const, fractionRange: normalized(profile.inputs.tidalHeating, `w1-06b2.${caseDefinition.caseId}.tidal`) },
    ],
    mantleConvectionRange: normalized(profile.interior.convection, `w1-06b2.${caseDefinition.caseId}.convection`),
    rheologyCandidates: ['TEMPERATURE_DEPENDENT_SOLID_STATE'],
    lithosphereBehaviorCandidates: ['RIGID_SINGLE_LID'],
    lidRegimeCandidates: profile.interior.lidCandidates,
    resolvedLidRegime: profile.interior.resolvedLid,
    meltAndVolcanismRange: normalized(profile.interior.melt, `w1-06b2.${caseDefinition.caseId}.melt`),
    riftTendencyRange: normalized(profile.interior.rift, `w1-06b2.${caseDefinition.caseId}.rift`),
    hotspotTendencyRange: normalized(profile.interior.hotspot, `w1-06b2.${caseDefinition.caseId}.hotspot`),
    assumptions: [] as readonly string[],
    branchResolutionIds: [] as readonly string[],
    confidenceAssessmentSubject: `w1-06b2.${caseDefinition.caseId}.interior`,
    evidenceIds: [] as readonly string[],
    contradictionIds: [] as readonly string[],
    limitations: ['W1-06B2 uses a controlled validated interior state; no final physical state is claimed.'],
  };
  const interior = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/interior-state/v1', payload),
  };
  validateInteriorState(interior);
  return interior;
}

function interiorStageResult(
  input: CausalGeologyInputV1,
  premise: PlanetaryPremiseV1,
  interior: InteriorStateV1,
): CausalStageResultV1<InteriorStateV1> {
  return createCausalStageResult({
    stageId: 'CAUSAL_INTERIOR_RESOLUTION',
    stageVersion: 1,
    status: 'PARTIAL',
    input: { inputSnapshot: input, premise },
    record: interior,
    limitations: interior.limitations,
    missingDomains: ['controlled-fixture-interior-resolution'],
    downstreamCompatibleStageIds: ['CAUSAL_REGIME_HISTORY'],
  });
}

function naturalCriterionPass(
  profile: NaturalArchetypeProfileV1,
  interior: InteriorStateV1,
  familyCounts: Readonly<Record<string, number>>,
): boolean {
  const riftCount = familyCounts.RIFT_SYSTEM ?? 0;
  const plumeCount = familyCounts.PLUME_SYSTEM ?? 0;
  switch (profile.criterion) {
    case 'MOBILE_CURRENT_REGIME':
      return interior.resolvedLidRegime === 'MOBILE_LID_HYPOTHESIS';
    case 'STAGNANT_CURRENT_REGIME':
      return interior.resolvedLidRegime === 'STAGNANT_LID';
    case 'RIFT_NOT_LESS_THAN_PLUME':
      return riftCount > 0 && riftCount >= plumeCount;
    case 'PLUME_NOT_LESS_THAN_RIFT':
      return plumeCount > 0 && plumeCount >= riftCount;
    case 'LOW_HEAT_OLD_INPUT':
      return profile.inputs.ageGyr >= 7 && profile.interior.thermal <= 0.25 && interior.resolvedLidRegime === 'STAGNANT_LID';
    case 'HIGH_HEAT_YOUNG_SUPER_EARTH_INPUT':
      return profile.inputs.radius >= 1.3
        && profile.inputs.ageGyr <= 2.5
        && profile.interior.thermal >= 0.75
        && profile.bodyClassCandidates.includes('ROCKY_SUPER_EARTH');
    case 'WATER_RICH_INPUT':
      return profile.inputs.water >= 2;
    case 'DRY_INPUT':
      return profile.inputs.water <= 0.05;
    case 'SUPER_EARTH_INPUT_RANGE':
      return profile.inputs.radius >= 1.3
        && profile.inputs.radius <= 2
        && profile.inputs.density >= 1.05
        && profile.bodyClassCandidates.includes('ROCKY_SUPER_EARTH');
    default:
      return false;
  }
}

function countFeatureFamilies(families: readonly string[]): Readonly<Record<string, number>> {
  const counts = new Map<string, number>();
  for (const family of families) counts.set(family, (counts.get(family) ?? 0) + 1);
  return Object.fromEntries([...counts.entries()].sort(([a], [b]) => compareStableText(a, b)));
}

function validateCorpus(value: ControlledArchetypeCorpusV1): void {
  expect(value.schemaVersion).toBe(1);
  expect(value.corpusVersion).toBe('W1_06B2_CONTROLLED_ARCHETYPE_CORPUS_V1');
  expect(value.authorityMode).toBe('CAUSAL_SHADOW');
  expect(value.physicalGeneratorAuthority).toBe('LEGACY');
  expect(value.upstreamMode).toBe('CONTROLLED_VALIDATED_W1_FIXTURES');
  expect(value.profiles).toHaveLength(W1_06_REQUIRED_ARCHETYPE_FAMILIES.length);
  expect(value.cases).toHaveLength(W1_06_REQUIRED_ARCHETYPE_FAMILIES.length * 3);

  const profileIds = new Set<string>();
  const profileFamilies = new Set<CausalControlledArchetypeFamilyV1>();
  for (const profile of value.profiles) {
    expect(profile.profileId.trim().length).toBeGreaterThan(0);
    expect(profileIds.has(profile.profileId)).toBe(false);
    expect(profileFamilies.has(profile.archetypeFamily)).toBe(false);
    expect(profile.limitations.length).toBeGreaterThan(0);
    profileIds.add(profile.profileId);
    profileFamilies.add(profile.archetypeFamily);
  }
  expect([...profileFamilies].sort(compareStableText)).toEqual([...W1_06_REQUIRED_ARCHETYPE_FAMILIES].sort(compareStableText));

  const caseIds = new Set<string>();
  const rootSeeds = new Set<string>();
  const casesByProfile = new Map<string, number>();
  for (const entry of value.cases) {
    expect(profileIds.has(entry.profileId)).toBe(true);
    expect(caseIds.has(entry.caseId)).toBe(false);
    expect(rootSeeds.has(entry.rootSeed)).toBe(false);
    caseIds.add(entry.caseId);
    rootSeeds.add(entry.rootSeed);
    casesByProfile.set(entry.profileId, (casesByProfile.get(entry.profileId) ?? 0) + 1);
  }
  expect([...casesByProfile.values()]).toEqual(Array(10).fill(3));
}

function readResearchJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(researchRoot, fileName), 'utf8')) as T;
}

function readFixtureJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(resolve(fixtureRoot, fileName), 'utf8')) as T;
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

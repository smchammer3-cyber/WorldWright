import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import type { GeneratorAuthorityMode } from '../causalWorld/schema';
import { createWorldRandomOracle } from '../worldRandom/oracle';
import { cloneAndDeepFreeze } from './immutable';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload } from './hashes';
import { createCausalGeologyInput, normalizeRootSeedIdentity, validateCausalInputDeclaration } from './inputAuthority';
import { createScientificQuantity } from './quantities';
import {
  getGenerationRequestResolutionBasisHash,
  getInitialConditionControlScope,
  INITIAL_CONDITION_DIRECT_INPUT_IDS,
  INITIAL_CONDITION_EXCEPTION_PERMISSIONS,
  isInitialConditionControlId,
  isInitialConditionDirectInputId,
  validateGenerationRequest,
} from './initialConditionRequest';
import {
  INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1,
  validateInitialConditionPriorConstraintBundle,
} from './initialConditionPriors';
import type {
  GenerationRequestControlV1,
  GenerationRequestV1,
  InitialConditionConflictV1,
  InitialConditionControlId,
  InitialConditionCorrelatedSelectionV1,
  InitialConditionDirectInputId,
  InitialConditionPriorFamilyV1,
  InitialConditionPriorQuantityRangeV1,
  InitialConditionResolutionTraceEntryV1,
  InitialConditionResolverMetricsV1,
  PlanetInitialConditionBundleV1,
} from './initialConditionTypes';
import type { CausalGeologyInputV1, CausalInputDeclarationV1 } from './types';

export const INITIAL_CONDITION_PERFORMANCE_BUDGET_V1 = Object.freeze({
  maxWallClockMilliseconds: 1_000,
  maxHeapDeltaBytes: 128 * 1024 * 1024,
  maxCandidateFamilies: 32,
  maxRetries: 8,
  maxBacktracks: 8,
  maxResolutionTraceEntries: 256,
  maxSerializedArtifactBytes: 256 * 1024,
});

export interface ResolvePlanetInitialConditionOptionsV1 {
  readonly authorityMode: GeneratorAuthorityMode;
}

const BUNDLE_KEYS = [
  'schemaVersion',
  'bundleContractVersion',
  'status',
  'requestHash',
  'rootSeed',
  'priorConstraintBundleId',
  'priorConstraintBundleVersion',
  'priorConstraintBundleHash',
  'resolvedDeclarations',
  'resolvedCorrelatedSelections',
  'approvedDerivations',
  'hardConstraints',
  'softPreferences',
  'exceptionPermissions',
  'resolutionTrace',
  'conflicts',
  'limitations',
  'retrySummary',
  'contentHash',
] as const;
const SELECTION_KEYS = ['schemaVersion', 'selectionId', 'familyId', 'candidateFamilyIds', 'selectionBasisHash', 'randomAddress'] as const;
const TRACE_KEYS = ['schemaVersion', 'traceId', 'phase', 'outcome', 'controlId', 'inputId', 'detailCode'] as const;
const CONFLICT_KEYS = ['schemaVersion', 'conflictId', 'severity', 'controlIds', 'constraintIds', 'detailCode'] as const;
const RETRY_KEYS = ['schemaVersion', 'candidateFamiliesExamined', 'retryCount', 'backtrackCount', 'boundedBy'] as const;

export function resolvePlanetInitialConditionBundle(
  request: GenerationRequestV1,
  options: ResolvePlanetInitialConditionOptionsV1,
): PlanetInitialConditionBundleV1 {
  validateGenerationRequest(request);
  if (options.authorityMode !== 'CAUSAL_SHADOW') throw new Error('W1-02A initial-condition resolution is allowed only in CAUSAL_SHADOW mode.');
  const priorBundle = INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1;
  validateInitialConditionPriorConstraintBundle(priorBundle);
  if (priorBundle.families.length > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxCandidateFamilies) throw new Error('Initial-condition prior family count exceeds the frozen budget.');

  const controlsById = new Map(request.controls.map((control) => [control.controlId, control]));
  const hardControls = request.controls.filter((control) => control.intent === 'HARD_CONSTRAINT');
  const softControls = request.controls.filter((control) => control.intent === 'SOFT_PREFERENCE');
  const profileHint = enumHint(controlsById.get('legacy.planet-profile-hint'));
  if (profileHint === 'ARTIFICIAL_OR_FANTASY_SHELL') {
    const permission = request.exceptionPermissions.includes('ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL');
    return createBlockedBundle(request, priorBundle, [{
      schemaVersion: 1,
      conflictId: permission ? 'conflict/artificial-prior-not-implemented-v1' : 'conflict/artificial-permission-required-v1',
      severity: 'BLOCKING',
      controlIds: ['legacy.planet-profile-hint'],
      constraintIds: [permission ? 'initial-condition/artificial-prior-unavailable-v1' : 'initial-condition/artificial-exception-permission-v1'],
      detailCode: permission ? 'ARTIFICIAL_INITIAL_CONDITION_PRIOR_NOT_IMPLEMENTED' : 'ARTIFICIAL_INITIAL_CONDITION_PERMISSION_REQUIRED',
    }]);
  }

  const compatibleFamilies = priorBundle.families.filter((family) => hardControls.every((control) => familyAcceptsHardControl(family, control)));
  if (compatibleFamilies.length === 0) {
    const controlIds = hardControls.map((control) => control.controlId).sort(compareStableText);
    return createBlockedBundle(request, priorBundle, [{
      schemaVersion: 1,
      conflictId: `conflict/no-compatible-prior-family/${controlIds.join('+') || 'none'}`,
      severity: 'BLOCKING',
      controlIds,
      constraintIds: ['initial-condition/family-correlated-ranges-v1', 'initial-condition/hard-lock-precedence-v1'],
      detailCode: 'NO_PRIOR_FAMILY_SATISFIES_HARD_CONSTRAINTS',
    }]);
  }

  const selectionBasisHash = getGenerationRequestResolutionBasisHash(request);
  const oracle = createWorldRandomOracle(request.rootSeed, { authorityMode: 'CAUSAL_SHADOW' });
  const selectedFamily = selectFamily(oracle, compatibleFamilies, softControls, selectionBasisHash.value);
  const trace: InitialConditionResolutionTraceEntryV1[] = [];
  trace.push(traceEntry(1, 'FAMILY_SELECTION', 'ACCEPTED', 'CORRELATED_PRIOR_FAMILY_SELECTED'));
  const declarations: CausalInputDeclarationV1[] = [];
  let departedFromPreference = false;

  for (const inputId of INITIAL_CONDITION_DIRECT_INPUT_IDS) {
    const quantityRange = getFamilyRange(selectedFamily, inputId);
    const control = controlsById.get(inputId);
    const resolution = resolveQuantity(request, selectedFamily, quantityRange, control, oracle);
    declarations.push({
      schemaVersion: 1,
      inputId,
      quantity: createScientificQuantity(resolution.value, quantityRange.unit, quantityRange.scaleId),
      sourceClass: 'DIRECT_DECLARATION',
      sourceRecordId: resolution.sourceRecordId,
      confidenceSubject: `initial-condition.${inputId}`,
      evidenceIds: [],
    });
    if (resolution.departedFromPreference) departedFromPreference = true;
    trace.push({
      ...traceEntry(trace.length + 1, 'QUANTITY_RESOLUTION', resolution.departedFromPreference ? 'DEPARTED_FROM_PREFERENCE' : 'ACCEPTED', resolution.detailCode),
      ...(control ? { controlId: control.controlId } : {}),
      inputId,
    });
  }
  trace.push(traceEntry(trace.length + 1, 'FINAL_VALIDATION', 'ACCEPTED', 'INITIAL_CONDITION_BUNDLE_VALIDATED'));
  if (trace.length > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxResolutionTraceEntries) throw new Error('Initial-condition resolution trace exceeds the frozen budget.');

  const candidateFamilyIds = compatibleFamilies.map((family) => family.familyId).sort(compareStableText);
  const selection: InitialConditionCorrelatedSelectionV1 = {
    schemaVersion: 1,
    selectionId: `selection/${selectedFamily.familyId}`,
    familyId: selectedFamily.familyId,
    candidateFamilyIds,
    selectionBasisHash,
    randomAddress: `causal.initial-conditions|family-selection|${selectionBasisHash.value}`,
  };
  const limitations = sortedUniqueText([...priorBundle.knownLimitations, ...request.limitations], 'Initial-condition bundle limitations');
  const payload = {
    schemaVersion: 1 as const,
    bundleContractVersion: 1 as const,
    status: (departedFromPreference || request.limitations.length > 0 ? 'PARTIAL' : 'COMPLETE') as PlanetInitialConditionBundleV1['status'],
    requestHash: request.contentHash,
    rootSeed: normalizeRootSeedIdentity(request.rootSeed),
    priorConstraintBundleId: priorBundle.bundleId,
    priorConstraintBundleVersion: priorBundle.bundleVersion,
    priorConstraintBundleHash: priorBundle.contentHash,
    resolvedDeclarations: declarations.sort((a, b) => compareStableText(a.inputId, b.inputId)),
    resolvedCorrelatedSelections: [selection],
    approvedDerivations: [] as readonly CausalInputDeclarationV1[],
    hardConstraints: hardControls.map((control) => control.controlId).sort(compareStableText),
    softPreferences: softControls.map((control) => control.controlId).sort(compareStableText),
    exceptionPermissions: [...request.exceptionPermissions],
    resolutionTrace: trace,
    conflicts: [] as readonly InitialConditionConflictV1[],
    limitations,
    retrySummary: {
      schemaVersion: 1 as const,
      candidateFamiliesExamined: priorBundle.families.length,
      retryCount: 0,
      backtrackCount: 0,
      boundedBy: 'INITIAL_CONDITION_PERFORMANCE_BUDGET_V1',
    },
  };
  const bundle: PlanetInitialConditionBundleV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planet-initial-condition-bundle/v1', payload),
  };
  validatePlanetInitialConditionBundle(bundle, request);
  return cloneAndDeepFreeze(bundle);
}

export function validatePlanetInitialConditionBundle(value: unknown, request?: GenerationRequestV1): asserts value is PlanetInitialConditionBundleV1 {
  assertExactKeys(value, BUNDLE_KEYS, 'Planet initial-condition bundle');
  const bundle = value as Partial<PlanetInitialConditionBundleV1>;
  if (bundle.schemaVersion !== 1 || bundle.bundleContractVersion !== 1) throw new Error('Unsupported planet initial-condition bundle contract.');
  if (!['COMPLETE', 'PARTIAL', 'BLOCKED'].includes(String(bundle.status))) throw new Error('Planet initial-condition bundle status is invalid.');
  assertDeterministicHash(bundle.requestHash, 'Generation request');
  const rootSeed = normalizeRootSeedIdentity(bundle.rootSeed as PlanetInitialConditionBundleV1['rootSeed']);
  if (bundle.priorConstraintBundleId !== 'WORLDWRIGHT_INITIAL_CONDITION_PRIORS_V1' || bundle.priorConstraintBundleVersion !== 1) throw new Error('Planet initial-condition bundle prior identity is invalid.');
  assertDeterministicHash(bundle.priorConstraintBundleHash, 'Initial-condition prior bundle');
  if (!deterministicHashEquals(bundle.priorConstraintBundleHash, INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1.contentHash)) throw new Error('Planet initial-condition bundle prior hash is not approved.');
  if (!Array.isArray(bundle.resolvedDeclarations) || !Array.isArray(bundle.approvedDerivations)) throw new Error('Planet initial-condition declarations are invalid.');
  if (bundle.approvedDerivations.length !== 0) throw new Error('W1-02A approved derivations must remain inactive.');
  const declarationIds: string[] = [];
  for (const declaration of bundle.resolvedDeclarations) {
    validateCausalInputDeclaration(declaration);
    if (declaration.sourceClass !== 'DIRECT_DECLARATION' || !INITIAL_CONDITION_DIRECT_INPUT_IDS.includes(declaration.inputId as InitialConditionDirectInputId)) throw new Error(`Planet initial-condition declaration ${declaration.inputId} is outside W1-02A authority.`);
    declarationIds.push(declaration.inputId);
  }
  if (!arraysEqual(declarationIds, [...declarationIds].sort(compareStableText)) || new Set(declarationIds).size !== declarationIds.length) throw new Error('Planet initial-condition declarations are not canonical and unique.');
  if (bundle.status === 'BLOCKED') {
    if (bundle.resolvedDeclarations.length !== 0) throw new Error('Blocked planet initial-condition bundle cannot contain declarations.');
  } else if (!arraysEqual(declarationIds, INITIAL_CONDITION_DIRECT_INPUT_IDS)) {
    throw new Error('Planet initial-condition bundle has incomplete direct-input coverage.');
  }
  if (!Array.isArray(bundle.resolvedCorrelatedSelections)) throw new Error('Planet initial-condition correlated selections are invalid.');
  if (bundle.status === 'BLOCKED' ? bundle.resolvedCorrelatedSelections.length !== 0 : bundle.resolvedCorrelatedSelections.length !== 1) throw new Error('Planet initial-condition correlated selection count is invalid.');
  for (const selection of bundle.resolvedCorrelatedSelections) validateSelection(selection);
  const hardConstraints = validateSortedUniqueControlIds(bundle.hardConstraints, 'Planet initial-condition hard constraints');
  const softPreferences = validateSortedUniqueControlIds(bundle.softPreferences, 'Planet initial-condition soft preferences');
  if (hardConstraints.some((id) => softPreferences.includes(id))) throw new Error('Planet initial-condition control cannot be both hard and soft.');
  const exceptionPermissions = validateSortedUniqueText(bundle.exceptionPermissions, 'Planet initial-condition exception permissions');
  if (exceptionPermissions.some((permission) => !INITIAL_CONDITION_EXCEPTION_PERMISSIONS.includes(permission as never))) throw new Error('Planet initial-condition bundle contains an unsupported exception permission.');
  if (!Array.isArray(bundle.resolutionTrace) || bundle.resolutionTrace.length > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxResolutionTraceEntries) throw new Error('Planet initial-condition resolution trace is invalid.');
  bundle.resolutionTrace.forEach(validateTraceEntry);
  const traceIds = bundle.resolutionTrace.map((entry) => entry.traceId);
  if (new Set(traceIds).size !== traceIds.length || !arraysEqual(traceIds, [...traceIds].sort(compareStableText))) throw new Error('Planet initial-condition resolution trace IDs must be sorted and unique.');
  if (!Array.isArray(bundle.conflicts)) throw new Error('Planet initial-condition conflicts are invalid.');
  bundle.conflicts.forEach(validateConflict);
  const conflictIds = bundle.conflicts.map((conflict) => conflict.conflictId);
  if (new Set(conflictIds).size !== conflictIds.length || !arraysEqual(conflictIds, [...conflictIds].sort(compareStableText))) throw new Error('Planet initial-condition conflict IDs must be sorted and unique.');
  if (bundle.status === 'BLOCKED' && !bundle.conflicts.some((conflict) => conflict.severity === 'BLOCKING')) throw new Error('Blocked planet initial-condition bundle requires a blocking conflict.');
  if (bundle.status !== 'BLOCKED' && bundle.conflicts.some((conflict) => conflict.severity === 'BLOCKING')) throw new Error('Non-blocked planet initial-condition bundle cannot contain a blocking conflict.');
  const limitations = validateSortedUniqueText(bundle.limitations, 'Planet initial-condition limitations');
  validateRetrySummary(bundle.retrySummary);
  assertDeterministicHash(bundle.contentHash, 'Planet initial-condition bundle');
  const expected = hashCausalPayload('WorldWright/planet-initial-condition-bundle/v1', {
    schemaVersion: bundle.schemaVersion,
    bundleContractVersion: bundle.bundleContractVersion,
    status: bundle.status,
    requestHash: bundle.requestHash,
    rootSeed,
    priorConstraintBundleId: bundle.priorConstraintBundleId,
    priorConstraintBundleVersion: bundle.priorConstraintBundleVersion,
    priorConstraintBundleHash: bundle.priorConstraintBundleHash,
    resolvedDeclarations: bundle.resolvedDeclarations,
    resolvedCorrelatedSelections: bundle.resolvedCorrelatedSelections,
    approvedDerivations: bundle.approvedDerivations,
    hardConstraints,
    softPreferences,
    exceptionPermissions,
    resolutionTrace: bundle.resolutionTrace,
    conflicts: bundle.conflicts,
    limitations,
    retrySummary: bundle.retrySummary,
  });
  if (!deterministicHashEquals(bundle.contentHash, expected)) throw new Error('Planet initial-condition bundle content hash mismatch.');
  if (request) {
    validateGenerationRequest(request);
    if (!deterministicHashEquals(bundle.requestHash, request.contentHash)) throw new Error('Planet initial-condition bundle request hash mismatch.');
    if (canonicalJsonStringify(bundle.rootSeed) !== canonicalJsonStringify(request.rootSeed)) throw new Error('Planet initial-condition bundle root seed mismatch.');
  }
}

export function createCausalGeologyInputFromInitialConditionBundle(bundle: PlanetInitialConditionBundleV1): CausalGeologyInputV1 {
  validatePlanetInitialConditionBundle(bundle);
  if (bundle.status === 'BLOCKED') throw new Error('Blocked planet initial-condition bundle cannot create causal geology input.');
  return createCausalGeologyInput(bundle.rootSeed, bundle.resolvedDeclarations, {
    initialConditionBundleHash: bundle.contentHash,
    limitations: bundle.limitations,
  });
}

export function measureInitialConditionBundle(bundle: PlanetInitialConditionBundleV1): InitialConditionResolverMetricsV1 {
  validatePlanetInitialConditionBundle(bundle);
  const metrics: InitialConditionResolverMetricsV1 = {
    schemaVersion: 1,
    candidateFamilyCount: INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1.families.length,
    candidateFamiliesExamined: bundle.retrySummary.candidateFamiliesExamined,
    resolvedDeclarationCount: bundle.resolvedDeclarations.length,
    resolutionTraceCount: bundle.resolutionTrace.length,
    conflictCount: bundle.conflicts.length,
    serializedArtifactBytes: new TextEncoder().encode(canonicalJsonStringify(bundle)).byteLength,
  };
  if (metrics.serializedArtifactBytes > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxSerializedArtifactBytes) throw new Error('Planet initial-condition bundle exceeds the frozen artifact-size budget.');
  return cloneAndDeepFreeze(metrics);
}

function createBlockedBundle(
  request: GenerationRequestV1,
  priorBundle: typeof INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1,
  conflicts: readonly InitialConditionConflictV1[],
): PlanetInitialConditionBundleV1 {
  const trace = conflicts.map((conflict, index) => ({
    ...traceEntry(index + 1, 'VALIDATION', 'BLOCKED', conflict.detailCode),
    controlId: conflict.controlIds[0],
  }));
  const payload = {
    schemaVersion: 1 as const,
    bundleContractVersion: 1 as const,
    status: 'BLOCKED' as const,
    requestHash: request.contentHash,
    rootSeed: normalizeRootSeedIdentity(request.rootSeed),
    priorConstraintBundleId: priorBundle.bundleId,
    priorConstraintBundleVersion: priorBundle.bundleVersion,
    priorConstraintBundleHash: priorBundle.contentHash,
    resolvedDeclarations: [] as readonly CausalInputDeclarationV1[],
    resolvedCorrelatedSelections: [] as readonly InitialConditionCorrelatedSelectionV1[],
    approvedDerivations: [] as readonly CausalInputDeclarationV1[],
    hardConstraints: request.controls.filter((control) => control.intent === 'HARD_CONSTRAINT').map((control) => control.controlId).sort(compareStableText),
    softPreferences: request.controls.filter((control) => control.intent === 'SOFT_PREFERENCE').map((control) => control.controlId).sort(compareStableText),
    exceptionPermissions: [...request.exceptionPermissions],
    resolutionTrace: trace,
    conflicts: [...conflicts].sort((a, b) => compareStableText(a.conflictId, b.conflictId)),
    limitations: sortedUniqueText([...priorBundle.knownLimitations, ...request.limitations], 'Initial-condition bundle limitations'),
    retrySummary: {
      schemaVersion: 1 as const,
      candidateFamiliesExamined: priorBundle.families.length,
      retryCount: 0,
      backtrackCount: 0,
      boundedBy: 'INITIAL_CONDITION_PERFORMANCE_BUDGET_V1',
    },
  };
  const bundle: PlanetInitialConditionBundleV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planet-initial-condition-bundle/v1', payload),
  };
  validatePlanetInitialConditionBundle(bundle, request);
  return cloneAndDeepFreeze(bundle);
}

function selectFamily(
  oracle: ReturnType<typeof createWorldRandomOracle>,
  families: readonly InitialConditionPriorFamilyV1[],
  softControls: readonly GenerationRequestControlV1[],
  selectionBasisHash: string,
): InitialConditionPriorFamilyV1 {
  const weighted = families.map((family) => ({ family, weight: family.weight + Math.max(0, scoreFamily(family, softControls)) }));
  const totalWeight = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  const ticket = oracle.integer({
    stream: 'causal.initial-conditions',
    scope: ['family-selection', 'all', 0, 'none', selectionBasisHash],
    draw: 'family',
  }, 0, totalWeight);
  let cursor = ticket;
  for (const entry of weighted) {
    if (cursor < entry.weight) return entry.family;
    cursor -= entry.weight;
  }
  return weighted[weighted.length - 1].family;
}

function scoreFamily(family: InitialConditionPriorFamilyV1, controls: readonly GenerationRequestControlV1[]): number {
  let score = 0;
  for (const control of controls) {
    const sourceWeight = control.source === 'USER' ? 4 : control.source === 'TEMPLATE' ? 2 : 1;
    if (control.value?.kind === 'ENUM') {
      if (control.controlId === 'legacy.planet-profile-hint' && family.profileHints.includes(control.value.value)) score += 3 * sourceWeight;
      if (control.controlId === 'legacy.style-mode-hint' && family.styleHints.includes(control.value.value)) score += 2 * sourceWeight;
    } else if (control.value?.kind === 'QUANTITY') {
      const range = getFamilyRange(family, control.controlId as InitialConditionDirectInputId);
      const value = control.value.quantity.value;
      if (value >= range.min && value <= range.max) score += 2 * sourceWeight;
    }
  }
  return score;
}

function familyAcceptsHardControl(family: InitialConditionPriorFamilyV1, control: GenerationRequestControlV1): boolean {
  if (control.intent !== 'HARD_CONSTRAINT' || control.value?.kind !== 'QUANTITY') return true;
  const range = getFamilyRange(family, control.controlId as InitialConditionDirectInputId);
  return control.value.quantity.unit === range.unit
    && control.value.quantity.scaleId === range.scaleId
    && control.value.quantity.value >= range.min
    && control.value.quantity.value <= range.max;
}

function resolveQuantity(
  request: GenerationRequestV1,
  family: InitialConditionPriorFamilyV1,
  range: InitialConditionPriorQuantityRangeV1,
  control: GenerationRequestControlV1 | undefined,
  oracle: ReturnType<typeof createWorldRandomOracle>,
): { readonly value: number; readonly sourceRecordId: string; readonly departedFromPreference: boolean; readonly detailCode: string } {
  if (control?.intent === 'HARD_CONSTRAINT' && control.value?.kind === 'QUANTITY') {
    return {
      value: control.value.quantity.value,
      sourceRecordId: `generation-request:${control.controlId}`,
      departedFromPreference: false,
      detailCode: 'HARD_CONSTRAINT_PRESERVED',
    };
  }
  const scope = getInitialConditionControlScope(range.inputId);
  const rerollOrdinal = request.rerollScopes.includes(scope) ? request.rerollOrdinal : 0;
  const sample = oracle.float01({
    stream: 'causal.initial-conditions',
    scope: ['quantity-resolution', family.familyId, scope, rerollOrdinal, range.inputId],
    draw: 'value',
  });
  const priorValue = range.min + sample * (range.max - range.min);
  if (control?.intent === 'SOFT_PREFERENCE' && control.value?.kind === 'QUANTITY') {
    const preferred = control.value.quantity.value;
    const blended = priorValue * 0.35 + preferred * 0.65;
    const resolved = clamp(blended, range.min, range.max);
    const departed = resolved !== preferred;
    return {
      value: canonicalNumber(resolved),
      sourceRecordId: `generation-request-preference:${control.controlId}`,
      departedFromPreference: departed,
      detailCode: departed ? 'SOFT_PREFERENCE_BOUNDED_BY_CORRELATED_PRIOR' : 'SOFT_PREFERENCE_PRESERVED',
    };
  }
  return {
    value: canonicalNumber(priorValue),
    sourceRecordId: `initial-condition-prior:${family.familyId}:${range.inputId}`,
    departedFromPreference: false,
    detailCode: 'SEEDED_CORRELATED_PRIOR_RESOLVED',
  };
}

function getFamilyRange(family: InitialConditionPriorFamilyV1, inputId: InitialConditionDirectInputId): InitialConditionPriorQuantityRangeV1 {
  const range = family.quantityRanges.find((candidate) => candidate.inputId === inputId);
  if (!range) throw new Error(`Initial-condition prior family ${family.familyId} is missing ${inputId}.`);
  return range;
}

function enumHint(control: GenerationRequestControlV1 | undefined): string | undefined {
  return control?.value?.kind === 'ENUM' ? control.value.value : undefined;
}

function traceEntry(
  index: number,
  phase: InitialConditionResolutionTraceEntryV1['phase'],
  outcome: InitialConditionResolutionTraceEntryV1['outcome'],
  detailCode: string,
): InitialConditionResolutionTraceEntryV1 {
  return { schemaVersion: 1, traceId: `trace/${String(index).padStart(4, '0')}`, phase, outcome, detailCode };
}

function validateSelection(value: unknown): asserts value is InitialConditionCorrelatedSelectionV1 {
  assertExactKeys(value, SELECTION_KEYS, 'Initial-condition correlated selection');
  const selection = value as Partial<InitialConditionCorrelatedSelectionV1>;
  if (selection.schemaVersion !== 1 || !isNonEmptyText(selection.selectionId) || !isNonEmptyText(selection.familyId) || !isNonEmptyText(selection.randomAddress)) throw new Error('Initial-condition correlated selection identity is invalid.');
  validateSortedUniqueText(selection.candidateFamilyIds, 'Initial-condition candidate family IDs');
  assertDeterministicHash(selection.selectionBasisHash, 'Initial-condition selection basis');
}

function validateTraceEntry(value: unknown): asserts value is InitialConditionResolutionTraceEntryV1 {
  assertExactKeys(value, TRACE_KEYS, 'Initial-condition resolution trace entry');
  const entry = value as Partial<InitialConditionResolutionTraceEntryV1>;
  if (entry.schemaVersion !== 1 || !isNonEmptyText(entry.traceId) || !['VALIDATION', 'FAMILY_SELECTION', 'QUANTITY_RESOLUTION', 'FINAL_VALIDATION'].includes(String(entry.phase)) || !['ACCEPTED', 'DEPARTED_FROM_PREFERENCE', 'REJECTED', 'BLOCKED'].includes(String(entry.outcome)) || !isNonEmptyText(entry.detailCode)) throw new Error('Initial-condition resolution trace entry is invalid.');
  if (entry.controlId !== undefined && !isInitialConditionControlId(entry.controlId)) throw new Error('Initial-condition resolution trace control ID is invalid.');
  if (entry.inputId !== undefined && !isInitialConditionDirectInputId(entry.inputId)) throw new Error('Initial-condition resolution trace input ID is invalid.');
}

function validateConflict(value: unknown): asserts value is InitialConditionConflictV1 {
  assertExactKeys(value, CONFLICT_KEYS, 'Initial-condition conflict');
  const conflict = value as Partial<InitialConditionConflictV1>;
  if (conflict.schemaVersion !== 1 || !isNonEmptyText(conflict.conflictId) || !['BLOCKING', 'LIMITING'].includes(String(conflict.severity)) || !isNonEmptyText(conflict.detailCode)) throw new Error('Initial-condition conflict identity is invalid.');
  validateSortedUniqueControlIds(conflict.controlIds, `Initial-condition conflict ${conflict.conflictId} control IDs`);
  validateSortedUniqueText(conflict.constraintIds, `Initial-condition conflict ${conflict.conflictId} constraint IDs`);
}

function validateRetrySummary(value: unknown): asserts value is PlanetInitialConditionBundleV1['retrySummary'] {
  assertExactKeys(value, RETRY_KEYS, 'Initial-condition retry summary');
  const summary = value as Partial<PlanetInitialConditionBundleV1['retrySummary']>;
  if (summary.schemaVersion !== 1 || !Number.isSafeInteger(summary.candidateFamiliesExamined) || (summary.candidateFamiliesExamined as number) < 0 || (summary.candidateFamiliesExamined as number) > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxCandidateFamilies) throw new Error('Initial-condition candidate evaluation count is invalid.');
  if (!Number.isSafeInteger(summary.retryCount) || (summary.retryCount as number) < 0 || (summary.retryCount as number) > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxRetries) throw new Error('Initial-condition retry count is invalid.');
  if (!Number.isSafeInteger(summary.backtrackCount) || (summary.backtrackCount as number) < 0 || (summary.backtrackCount as number) > INITIAL_CONDITION_PERFORMANCE_BUDGET_V1.maxBacktracks) throw new Error('Initial-condition backtrack count is invalid.');
  if (summary.boundedBy !== 'INITIAL_CONDITION_PERFORMANCE_BUDGET_V1') throw new Error('Initial-condition retry summary budget identity is invalid.');
}

function validateSortedUniqueControlIds(value: unknown, label: string): readonly InitialConditionControlId[] {
  const values = validateSortedUniqueText(value, label);
  if (values.some((entry) => !isInitialConditionControlId(entry))) throw new Error(`${label} contain unsupported control IDs.`);
  return values as readonly InitialConditionControlId[];
}

function sortedUniqueText(values: readonly string[], label: string): readonly string[] {
  const normalized = [...values].sort(compareStableText);
  validateSortedUniqueText(normalized, label);
  return normalized;
}

function validateSortedUniqueText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => !isNonEmptyText(entry))) throw new Error(`${label} must contain non-empty text.`);
  const normalized = [...value].sort(compareStableText);
  if (!arraysEqual(value, normalized) || new Set(value).size !== value.length) throw new Error(`${label} must be sorted and unique.`);
  return value;
}

function assertExactKeys(value: unknown, allowedKeys: readonly string[], label: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
  const keys = Object.keys(value).sort(compareStableText);
  const allowed = [...allowedKeys].sort(compareStableText);
  const unknown = keys.filter((key) => !allowed.includes(key));
  if (unknown.length > 0) throw new Error(`${label} contains unowned fields: ${unknown.join(', ')}`);
}

function canonicalNumber(value: number): number {
  const normalized = Number(value.toPrecision(15));
  return Object.is(normalized, -0) ? 0 : normalized;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return value < minimum ? minimum : value > maximum ? maximum : value;
}

function arraysEqual(a: readonly unknown[], b: readonly unknown[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

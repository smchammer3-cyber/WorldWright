import { canonicalJsonStringify } from '../worldProvenance/canonicalJson';
import { cloneAndDeepFreeze } from './immutable';
import { hashCausalPayload } from './hashes';
import {
  createGenerationRequest,
  getEffectiveGenerationRequestControls,
  validateGenerationRequest,
} from './initialConditionRequest';
import {
  INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1,
  validateInitialConditionPriorConstraintBundle,
} from './initialConditionPriors';
import {
  resolvePlanetInitialConditionBundle as resolveBasePlanetInitialConditionBundle,
  validatePlanetInitialConditionBundle,
  type ResolvePlanetInitialConditionOptionsV1,
} from './initialConditionResolver';
import type {
  GenerationRequestControlV1,
  GenerationRequestV1,
  InitialConditionConflictV1,
  InitialConditionControlId,
  InitialConditionPriorFamilyV1,
  PlanetInitialConditionBundleV1,
} from './initialConditionTypes';
import type { CausalInputDeclarationV1 } from './types';

export function resolvePlanetInitialConditionBundle(
  request: GenerationRequestV1,
  options: ResolvePlanetInitialConditionOptionsV1,
): PlanetInitialConditionBundleV1 {
  validateGenerationRequest(request);
  if (options.authorityMode !== 'CAUSAL_SHADOW') {
    throw new Error('W1-02A initial-condition resolution is allowed only in CAUSAL_SHADOW mode.');
  }
  const priorBundle = INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1;
  validateInitialConditionPriorConstraintBundle(priorBundle);
  const effectiveControls = getEffectiveGenerationRequestControls(request);
  const directConflicts = findDirectHardDeclarationConflicts(request.controls);
  if (directConflicts.length > 0) return createBlockedBundle(request, directConflicts);

  const hardControls = effectiveControls.filter((control) => control.intent === 'HARD_CONSTRAINT');
  const compatibleFamilies = priorBundle.families.filter((family) => hardControls.every((control) => familyAcceptsHardControl(family, control)));
  if (compatibleFamilies.length === 0) {
    const controlIds = findSmallestConflictingControlIds(priorBundle.families, hardControls);
    return createBlockedBundle(request, [{
      schemaVersion: 1,
      conflictId: `conflict/no-compatible-prior-family/${controlIds.join('+') || 'none'}`,
      severity: 'BLOCKING',
      controlIds,
      constraintIds: ['initial-condition/family-correlated-ranges-v1', 'initial-condition/hard-lock-precedence-v1'],
      detailCode: 'NO_PRIOR_FAMILY_SATISFIES_HARD_CONSTRAINTS',
    }]);
  }

  const effectiveRequest = createGenerationRequest(request.rootSeed, effectiveControls, {
    exceptionPermissions: request.exceptionPermissions,
    rerollScopes: request.rerollScopes,
    rerollOrdinal: request.rerollOrdinal,
    sourceTemplateId: request.sourceTemplateId,
    sourceTemplateVersion: request.sourceTemplateVersion,
    limitations: request.limitations,
  });
  const resolved = resolveBasePlanetInitialConditionBundle(effectiveRequest, options);
  return rebindBundleToOriginalRequest(resolved, request, effectiveControls);
}

function rebindBundleToOriginalRequest(
  bundle: PlanetInitialConditionBundleV1,
  request: GenerationRequestV1,
  effectiveControls: readonly GenerationRequestControlV1[],
): PlanetInitialConditionBundleV1 {
  const hardConstraints = effectiveControls
    .filter((control) => control.intent === 'HARD_CONSTRAINT')
    .map((control) => control.controlId)
    .sort(compareStableText);
  const softPreferences = effectiveControls
    .filter((control) => control.intent === 'SOFT_PREFERENCE')
    .map((control) => control.controlId)
    .sort(compareStableText);
  const payload = {
    schemaVersion: bundle.schemaVersion,
    bundleContractVersion: bundle.bundleContractVersion,
    status: bundle.status,
    requestHash: request.contentHash,
    rootSeed: bundle.rootSeed,
    priorConstraintBundleId: bundle.priorConstraintBundleId,
    priorConstraintBundleVersion: bundle.priorConstraintBundleVersion,
    priorConstraintBundleHash: bundle.priorConstraintBundleHash,
    resolvedDeclarations: bundle.resolvedDeclarations,
    resolvedCorrelatedSelections: bundle.resolvedCorrelatedSelections,
    approvedDerivations: bundle.approvedDerivations,
    hardConstraints,
    softPreferences,
    exceptionPermissions: bundle.exceptionPermissions,
    resolutionTrace: bundle.resolutionTrace,
    conflicts: bundle.conflicts,
    limitations: bundle.limitations,
    retrySummary: bundle.retrySummary,
  };
  const rebound: PlanetInitialConditionBundleV1 = {
    ...payload,
    contentHash: hashCausalPayload('WorldWright/planet-initial-condition-bundle/v1', payload),
  };
  validatePlanetInitialConditionBundle(rebound, request);
  return cloneAndDeepFreeze(rebound);
}

function createBlockedBundle(
  request: GenerationRequestV1,
  conflicts: readonly InitialConditionConflictV1[],
): PlanetInitialConditionBundleV1 {
  const priorBundle = INITIAL_CONDITION_PRIOR_CONSTRAINT_BUNDLE_V1;
  const effectiveControls = getEffectiveGenerationRequestControls(request);
  const hardConstraints = effectiveControls
    .filter((control) => control.intent === 'HARD_CONSTRAINT')
    .map((control) => control.controlId)
    .sort(compareStableText);
  const softPreferences = effectiveControls
    .filter((control) => control.intent === 'SOFT_PREFERENCE')
    .map((control) => control.controlId)
    .sort(compareStableText);
  const sortedConflicts = [...conflicts].sort((a, b) => compareStableText(a.conflictId, b.conflictId));
  const resolutionTrace = sortedConflicts.map((conflict, index) => ({
    schemaVersion: 1 as const,
    traceId: `trace/${String(index + 1).padStart(4, '0')}`,
    phase: 'VALIDATION' as const,
    outcome: 'BLOCKED' as const,
    ...(conflict.controlIds[0] ? { controlId: conflict.controlIds[0] } : {}),
    detailCode: conflict.detailCode,
  }));
  const limitations = [...new Set([...priorBundle.knownLimitations, ...request.limitations])].sort(compareStableText);
  const payload = {
    schemaVersion: 1 as const,
    bundleContractVersion: 1 as const,
    status: 'BLOCKED' as const,
    requestHash: request.contentHash,
    rootSeed: request.rootSeed,
    priorConstraintBundleId: priorBundle.bundleId,
    priorConstraintBundleVersion: priorBundle.bundleVersion,
    priorConstraintBundleHash: priorBundle.contentHash,
    resolvedDeclarations: [] as readonly CausalInputDeclarationV1[],
    resolvedCorrelatedSelections: [],
    approvedDerivations: [] as readonly CausalInputDeclarationV1[],
    hardConstraints,
    softPreferences,
    exceptionPermissions: request.exceptionPermissions,
    resolutionTrace,
    conflicts: sortedConflicts,
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

function findDirectHardDeclarationConflicts(
  controls: readonly GenerationRequestControlV1[],
): readonly InitialConditionConflictV1[] {
  const grouped = new Map<InitialConditionControlId, GenerationRequestControlV1[]>();
  for (const control of controls) {
    if (control.intent !== 'HARD_CONSTRAINT') continue;
    const group = grouped.get(control.controlId) ?? [];
    group.push(control);
    grouped.set(control.controlId, group);
  }
  const conflicts: InitialConditionConflictV1[] = [];
  for (const controlId of [...grouped.keys()].sort(compareStableText)) {
    const group = grouped.get(controlId) as GenerationRequestControlV1[];
    const distinctValues = new Set(group.map((control) => canonicalJsonStringify(control.value)));
    if (distinctValues.size <= 1) continue;
    conflicts.push({
      schemaVersion: 1,
      conflictId: `conflict/incompatible-hard-declarations/${controlId}`,
      severity: 'BLOCKING',
      controlIds: [controlId],
      constraintIds: ['initial-condition/hard-lock-precedence-v1'],
      detailCode: 'INCOMPATIBLE_HARD_DECLARATIONS',
    });
  }
  return conflicts;
}

function findSmallestConflictingControlIds(
  families: readonly InitialConditionPriorFamilyV1[],
  hardControls: readonly GenerationRequestControlV1[],
): readonly InitialConditionControlId[] {
  if (hardControls.length === 0) return [];
  const violations = families.map((family) => hardControls
    .filter((control) => !familyAcceptsHardControl(family, control))
    .map((control) => control.controlId)
    .sort(compareStableText));
  let candidates: InitialConditionControlId[][] = [[]];
  for (const familyViolations of violations) {
    const next: InitialConditionControlId[][] = [];
    for (const candidate of candidates) {
      if (candidate.some((controlId) => familyViolations.includes(controlId))) {
        next.push(candidate);
        continue;
      }
      for (const controlId of familyViolations) next.push([...candidate, controlId].sort(compareStableText));
    }
    candidates = pruneConflictCandidates(next);
  }
  candidates.sort((a, b) => a.length - b.length || compareStableText(a.join('|'), b.join('|')));
  return candidates[0] ?? hardControls.map((control) => control.controlId).sort(compareStableText);
}

function pruneConflictCandidates(candidates: readonly InitialConditionControlId[][]): InitialConditionControlId[][] {
  const unique = new Map<string, InitialConditionControlId[]>();
  for (const candidate of candidates) {
    const normalized = [...new Set(candidate)].sort(compareStableText);
    unique.set(normalized.join('|'), normalized);
  }
  const ordered = [...unique.values()].sort((a, b) => a.length - b.length || compareStableText(a.join('|'), b.join('|')));
  return ordered.filter((candidate, index) => !ordered.slice(0, index).some((other) => other.every((controlId) => candidate.includes(controlId))));
}

function familyAcceptsHardControl(family: InitialConditionPriorFamilyV1, control: GenerationRequestControlV1): boolean {
  if (control.intent !== 'HARD_CONSTRAINT' || control.value?.kind !== 'QUANTITY') return true;
  const range = family.quantityRanges.find((candidate) => candidate.inputId === control.controlId);
  if (!range) return false;
  return control.value.quantity.unit === range.unit
    && control.value.quantity.scaleId === range.scaleId
    && control.value.quantity.value >= range.min
    && control.value.quantity.value <= range.max;
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

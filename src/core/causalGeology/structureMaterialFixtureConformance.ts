import type { ScientificClaimRuleV1 } from './types';
import {
  validateStructureMaterialCandidateRuleSet,
  validateStructureMaterialFixtureSet,
  type StructureMaterialCandidateRuleSetV1,
  type StructureMaterialCandidateRuleV1,
  type StructureMaterialResearchFixtureV1,
  type StructureMaterialFixtureSetV1,
} from './structureMaterialFixtureContracts';
import type { StructureMaterialProvinceClassV1 } from './structureMaterial';

export interface StructureMaterialConstraintEvaluationV1 {
  readonly schemaVersion: 1;
  readonly constraintId: string;
  readonly source: 'FIELD' | 'INTERIOR';
  readonly observedValue?: number;
  readonly minInclusive?: number;
  readonly maxInclusive?: number;
  readonly satisfied: boolean;
  readonly exactBoundary: boolean;
  readonly strictMargin: boolean;
}

export interface StructureMaterialFixtureRuleEvaluationV1 {
  readonly schemaVersion: 1;
  readonly fixtureId: string;
  readonly ruleId: string;
  readonly targetProvinceClass: StructureMaterialProvinceClassV1;
  readonly structuralRoleMatch: boolean;
  readonly requiredContextFlagsPresent: boolean;
  readonly forbiddenContextFlagsAbsent: boolean;
  readonly constraintEvaluations: readonly StructureMaterialConstraintEvaluationV1[];
  readonly exactBoundaryConstraintIds: readonly string[];
  readonly strictMarginConstraintIds: readonly string[];
  readonly satisfied: boolean;
}

export interface StructureMaterialFixtureCorpusConformanceV1 {
  readonly schemaVersion: 1;
  readonly corpusVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURE_CONFORMANCE_V1';
  readonly fixtureCount: number;
  readonly affirmativeEvaluationCount: number;
  readonly thresholdEvaluationCount: number;
  readonly positiveEvaluationCount: number;
  readonly evaluations: readonly StructureMaterialFixtureRuleEvaluationV1[];
}

export function evaluateStructureMaterialFixtureAgainstRule(
  fixture: StructureMaterialResearchFixtureV1,
  rule: StructureMaterialCandidateRuleV1,
): StructureMaterialFixtureRuleEvaluationV1 {
  const structuralRoleMatch = rule.requiredAnyStructuralRoles.length === 0
    || rule.requiredAnyStructuralRoles.some((role) => fixture.evidence.sourceStructuralRoles.includes(role));
  const requiredContextFlagsPresent = rule.requiredAllContextFlags
    .every((flag) => fixture.evidence.contextFlags.includes(flag));
  const forbiddenContextFlagsAbsent = rule.forbiddenContextFlags
    .every((flag) => !fixture.evidence.contextFlags.includes(flag));

  const fieldSignals = new Map(fixture.evidence.fieldSignals.map((signal) => [signal.fieldId, signal.value]));
  const interiorSignals = new Map(fixture.evidence.interiorSignals.map((signal) => [signal.signalId, signal.value]));
  const constraintEvaluations: StructureMaterialConstraintEvaluationV1[] = [];

  for (const constraint of rule.fieldConstraints) {
    constraintEvaluations.push(evaluateConstraint({
      constraintId: `field:${constraint.fieldId}`,
      source: 'FIELD',
      observedValue: fieldSignals.get(constraint.fieldId),
      minInclusive: constraint.minInclusive,
      maxInclusive: constraint.maxInclusive,
    }));
  }
  for (const constraint of rule.interiorConstraints) {
    constraintEvaluations.push(evaluateConstraint({
      constraintId: `interior:${constraint.signalId}`,
      source: 'INTERIOR',
      observedValue: interiorSignals.get(constraint.signalId),
      minInclusive: constraint.minInclusive,
      maxInclusive: constraint.maxInclusive,
    }));
  }

  const canonicalEvaluations = [...constraintEvaluations]
    .sort((a, b) => compareStableText(a.constraintId, b.constraintId));
  const exactBoundaryConstraintIds = canonicalEvaluations
    .filter((entry) => entry.exactBoundary)
    .map((entry) => entry.constraintId);
  const strictMarginConstraintIds = canonicalEvaluations
    .filter((entry) => entry.strictMargin)
    .map((entry) => entry.constraintId);

  return Object.freeze({
    schemaVersion: 1,
    fixtureId: fixture.fixtureId,
    ruleId: rule.ruleId,
    targetProvinceClass: rule.targetProvinceClass,
    structuralRoleMatch,
    requiredContextFlagsPresent,
    forbiddenContextFlagsAbsent,
    constraintEvaluations: Object.freeze(canonicalEvaluations.map((entry) => Object.freeze(entry))),
    exactBoundaryConstraintIds: Object.freeze(exactBoundaryConstraintIds),
    strictMarginConstraintIds: Object.freeze(strictMarginConstraintIds),
    satisfied: structuralRoleMatch
      && requiredContextFlagsPresent
      && forbiddenContextFlagsAbsent
      && canonicalEvaluations.every((entry) => entry.satisfied),
  });
}

export function validateStructureMaterialFixtureCorpusConformance(
  ruleSet: StructureMaterialCandidateRuleSetV1,
  fixtureSet: StructureMaterialFixtureSetV1,
  claimRules: readonly ScientificClaimRuleV1[],
): StructureMaterialFixtureCorpusConformanceV1 {
  validateStructureMaterialCandidateRuleSet(ruleSet, claimRules);
  validateStructureMaterialFixtureSet(fixtureSet, ruleSet, claimRules);

  const ruleByClass = new Map(ruleSet.rules.map((rule) => [rule.targetProvinceClass, rule]));
  const evaluations: StructureMaterialFixtureRuleEvaluationV1[] = [];
  let thresholdEvaluationCount = 0;
  let positiveEvaluationCount = 0;

  for (const fixture of fixtureSet.fixtures) {
    if (fixture.kind === 'HOLDOUT' && !fixture.withheldFromCalibration) {
      throw new Error(`M1B holdout ${fixture.fixtureId} is not withheld from calibration.`);
    }
    if (fixture.kind !== 'HOLDOUT' && fixture.withheldFromCalibration) {
      throw new Error(`M1B non-holdout ${fixture.fixtureId} cannot be withheld as a hidden calibration split.`);
    }

    for (const provinceClass of fixture.expected.requiredProvinceClasses) {
      if (provinceClass === 'STRUCTURE_MATERIAL_UNRESOLVED') continue;
      const rule = ruleByClass.get(provinceClass);
      if (!rule) throw new Error(`M1B fixture ${fixture.fixtureId} requires missing rule ${provinceClass}.`);
      const evaluation = evaluateStructureMaterialFixtureAgainstRule(fixture, rule);
      evaluations.push(evaluation);
      if (!evaluation.satisfied) {
        const failedParts = [
          !evaluation.structuralRoleMatch ? 'structural role' : undefined,
          !evaluation.requiredContextFlagsPresent ? 'required context' : undefined,
          !evaluation.forbiddenContextFlagsAbsent ? 'forbidden context' : undefined,
          ...evaluation.constraintEvaluations
            .filter((entry) => !entry.satisfied)
            .map((entry) => entry.constraintId),
        ].filter((entry): entry is string => Boolean(entry));
        throw new Error(`M1B fixture ${fixture.fixtureId} does not satisfy required rule ${rule.ruleId}: ${failedParts.join(', ')}.`);
      }

      if (fixture.kind === 'THRESHOLD') {
        thresholdEvaluationCount += 1;
        if (evaluation.exactBoundaryConstraintIds.length === 0) {
          throw new Error(`M1B threshold fixture ${fixture.fixtureId} is not exactly on a committed rule boundary for ${provinceClass}.`);
        }
        if (fixture.expected.allowedResolutionStatuses.includes('SINGLE_LEADING_CANDIDATE')) {
          throw new Error(`M1B threshold fixture ${fixture.fixtureId} cannot authorize a leading candidate.`);
        }
      }

      if (fixture.kind === 'POSITIVE') {
        positiveEvaluationCount += 1;
        if (evaluation.strictMarginConstraintIds.length === 0) {
          throw new Error(`M1B positive fixture ${fixture.fixtureId} is boundary-only for required class ${provinceClass}.`);
        }
      }

      if ((fixture.kind === 'EXCEPTION' || fixture.kind === 'HOLDOUT')
        && !fixture.expected.forbiddenLeadingProvinceClasses.includes(provinceClass)) {
        throw new Error(`M1B ${fixture.kind.toLowerCase()} fixture ${fixture.fixtureId} must forbid required class ${provinceClass} from leading.`);
      }
    }
  }

  const canonicalEvaluations = [...evaluations].sort((a, b) => {
    const fixtureOrder = compareStableText(a.fixtureId, b.fixtureId);
    return fixtureOrder !== 0 ? fixtureOrder : compareStableText(a.targetProvinceClass, b.targetProvinceClass);
  });

  return Object.freeze({
    schemaVersion: 1,
    corpusVersion: 'M1B_STRUCTURE_MATERIAL_FIXTURE_CONFORMANCE_V1',
    fixtureCount: fixtureSet.fixtures.length,
    affirmativeEvaluationCount: canonicalEvaluations.length,
    thresholdEvaluationCount,
    positiveEvaluationCount,
    evaluations: Object.freeze(canonicalEvaluations),
  });
}

function evaluateConstraint(options: {
  readonly constraintId: string;
  readonly source: 'FIELD' | 'INTERIOR';
  readonly observedValue?: number;
  readonly minInclusive?: number;
  readonly maxInclusive?: number;
}): StructureMaterialConstraintEvaluationV1 {
  const { observedValue, minInclusive, maxInclusive } = options;
  const hasObservedValue = observedValue !== undefined;
  const minSatisfied = minInclusive === undefined || (hasObservedValue && observedValue >= minInclusive);
  const maxSatisfied = maxInclusive === undefined || (hasObservedValue && observedValue <= maxInclusive);
  const exactBoundary = hasObservedValue
    && ((minInclusive !== undefined && observedValue === minInclusive)
      || (maxInclusive !== undefined && observedValue === maxInclusive));
  const strictMargin = hasObservedValue
    && (minInclusive === undefined || observedValue > minInclusive)
    && (maxInclusive === undefined || observedValue < maxInclusive);
  return {
    schemaVersion: 1,
    constraintId: options.constraintId,
    source: options.source,
    ...(observedValue !== undefined ? { observedValue } : {}),
    ...(minInclusive !== undefined ? { minInclusive } : {}),
    ...(maxInclusive !== undefined ? { maxInclusive } : {}),
    satisfied: Boolean(hasObservedValue && minSatisfied && maxSatisfied),
    exactBoundary: Boolean(exactBoundary),
    strictMargin: Boolean(strictMargin),
  };
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

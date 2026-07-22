import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = process.cwd();
const artifactRoot = resolve(
  repositoryRoot,
  process.env.CAUSAL_CONTINENT_OCEAN_C3_CI_OUT ?? 'artifacts/c3-phase-c-completion',
);
const policy = readJson(resolve(
  repositoryRoot,
  'docs/implementation/phase-c/c3-live-coverage-policy.json',
));
const report = readJson(resolve(artifactRoot, 'c3-completion-report.json'));
const caseDirectory = resolve(artifactRoot, 'cases');
const cases = readdirSync(caseDirectory)
  .filter((fileName) => fileName.endsWith('.json'))
  .sort()
  .map((fileName) => readJson(resolve(caseDirectory, fileName)));

assert(policy.schemaVersion === 1, 'C3 live-coverage policy schema version is invalid.');
assert(policy.policyVersion === 'C3_LIVE_ROUTE_ANTI_COLLAPSE_POLICY_V1', 'C3 live-coverage policy version is invalid.');
assert(policy.specificRoleFrequencyTarget === 'FORBIDDEN', 'C3 may not prescribe a specific role frequency.');
assert(policy.specificGhostFrequencyTarget === 'FORBIDDEN', 'C3 may not prescribe a specific ghost frequency.');
assert(policy.thresholdRetuningFromLiveDistribution === 'FORBIDDEN', 'C3 live output may not retune C2A thresholds.');
assert(policy.physicalOrVisibleOutputTarget === 'FORBIDDEN', 'C3 live output may not target physical or visible output.');

assert(report.softwareGatePass === true, 'C3 completion report did not record a passing software gate.');
assert(report.phaseCImplementationStatus === 'COMPLETE', 'C3 completion report did not record bounded Phase C software completion.');
assert(report.scientificStatus === 'PARTIAL', 'C3 completion report must remain scientifically PARTIAL.');
assert(report.physicalGeneratorAuthority === 'LEGACY', 'C3 completion report changed physical generator authority.');
assert(
  report.fixedStructuralFixtureCount === policy.requiredFixedStructuralFixtureCount,
  `C3 expected ${policy.requiredFixedStructuralFixtureCount} fixed structural fixtures, found ${report.fixedStructuralFixtureCount}.`,
);
assert(
  report.fixedStructuralHoldoutCount === policy.requiredFixedStructuralHoldoutCount,
  `C3 expected ${policy.requiredFixedStructuralHoldoutCount} fixed structural holdouts, found ${report.fixedStructuralHoldoutCount}.`,
);
assert(
  report.structuralHoldoutsUsedForRuntimeCalibration === policy.structuralHoldoutsUsedForRuntimeCalibration,
  'C3 structural holdout calibration boundary changed.',
);
assert(
  report.liveCaseCount >= policy.minimumLiveCaseCount,
  `C3 requires at least ${policy.minimumLiveCaseCount} live cases, found ${report.liveCaseCount}.`,
);
assert(cases.length === report.liveCaseCount, 'C3 live case artifact count does not match the completion report.');
assert(
  report.uniqueInterpretationHashCount >= policy.minimumUniqueInterpretationHashCount,
  `C3 requires at least ${policy.minimumUniqueInterpretationHashCount} unique interpretation hashes, found ${report.uniqueInterpretationHashCount}.`,
);

const affirmativeCases = cases.filter((entry) => Object.entries(entry.roleCounts ?? {})
  .some(([role, count]) => role !== 'STRUCTURALLY_UNRESOLVED' && Number(count) > 0));
const affirmativeRoleClasses = Object.entries(report.aggregateRoleCounts ?? {})
  .filter(([role, count]) => role !== 'STRUCTURALLY_UNRESOLVED' && Number(count) > 0)
  .map(([role]) => role);
const leadingRegionCount = Number(report.aggregateResolutionCounts?.SINGLE_LEADING_CANDIDATE ?? 0);
const unresolvedRegionCount = Number(report.aggregateResolutionCounts?.UNRESOLVED ?? 0);

assert(
  affirmativeCases.length >= policy.minimumAffirmativeFixtureCount,
  `C3 live route collapsed toward unresolved: expected at least ${policy.minimumAffirmativeFixtureCount} affirmative fixtures, found ${affirmativeCases.length}.`,
);
assert(
  affirmativeRoleClasses.length >= policy.minimumAffirmativeRoleClassCount,
  `C3 live route produced fewer than ${policy.minimumAffirmativeRoleClassCount} affirmative role classes.`,
);
assert(
  leadingRegionCount >= policy.minimumLeadingRegionCount,
  `C3 live route requires at least ${policy.minimumLeadingRegionCount} leading region, found ${leadingRegionCount}.`,
);
assert(
  unresolvedRegionCount >= policy.minimumUnresolvedRegionCount,
  `C3 live route requires at least ${policy.minimumUnresolvedRegionCount} unresolved region, found ${unresolvedRegionCount}.`,
);

const summary = {
  policyVersion: policy.policyVersion,
  liveCaseCount: report.liveCaseCount,
  uniqueInterpretationHashCount: report.uniqueInterpretationHashCount,
  affirmativeFixtureCount: affirmativeCases.length,
  affirmativeFixtureIds: affirmativeCases.map((entry) => entry.fixtureId).sort(),
  affirmativeRoleClasses: affirmativeRoleClasses.sort(),
  leadingRegionCount,
  unresolvedRegionCount,
  specificRoleFrequencyTarget: policy.specificRoleFrequencyTarget,
  thresholdRetuningFromLiveDistribution: policy.thresholdRetuningFromLiveDistribution,
};

process.stdout.write(`C3 live-route anti-collapse policy passed.\n${JSON.stringify(summary, null, 2)}\n`);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

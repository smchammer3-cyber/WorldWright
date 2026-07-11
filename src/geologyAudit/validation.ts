import {
  GEOLOGY_AUDIT_SCHEMA_VERSION,
  type GeologyRule,
  type NumericRange,
  type ReferenceCase,
  type RegistrySnapshot,
  type ValidationIssue,
  type WorldAuditManifest,
} from './contracts';

export class GeologyAuditValidationError extends Error {
  readonly issues: ValidationIssue[];

  constructor(message: string, issues: ValidationIssue[]) {
    super(message);
    this.name = 'GeologyAuditValidationError';
    this.issues = issues;
  }
}

export function validateRange(range: NumericRange | undefined, path: string): ValidationIssue[] {
  if (!range) return [];
  const issues: ValidationIssue[] = [];
  if (range.min !== undefined && !Number.isFinite(range.min)) issues.push({ path: `${path}.min`, message: 'must be finite' });
  if (range.max !== undefined && !Number.isFinite(range.max)) issues.push({ path: `${path}.max`, message: 'must be finite' });
  if (range.min !== undefined && range.max !== undefined && range.min > range.max) {
    issues.push({ path, message: 'min must be less than or equal to max' });
  }
  return issues;
}

export function validateRule(rule: GeologyRule): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  requireNonEmpty(rule.ruleId, 'ruleId', issues);
  requireNonEmpty(rule.title, 'title', issues);
  requireNonEmpty(rule.domain, 'domain', issues);
  requireNonEmpty(rule.summary, 'summary', issues);
  requireNonEmpty(rule.version, 'version', issues);
  if (rule.schemaVersion !== GEOLOGY_AUDIT_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', message: `must equal ${GEOLOGY_AUDIT_SCHEMA_VERSION}` });
  }
  for (const [key, range] of Object.entries(rule.appliesWhen.parameterRanges ?? {})) {
    issues.push(...validateRange(range, `appliesWhen.parameterRanges.${key}`));
  }
  rule.metricExpectations.forEach((expectation, index) => {
    requireNonEmpty(expectation.metricId, `metricExpectations[${index}].metricId`, issues);
    requireNonEmpty(expectation.rationale, `metricExpectations[${index}].rationale`, issues);
    issues.push(...validateRange(expectation.preferredRange, `metricExpectations[${index}].preferredRange`));
    issues.push(...validateRange(expectation.hardRange, `metricExpectations[${index}].hardRange`));
  });
  return issues;
}

export function validateReferenceCase(reference: ReferenceCase, knownRuleIds?: ReadonlySet<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  requireNonEmpty(reference.caseId, 'caseId', issues);
  requireNonEmpty(reference.familyId, 'familyId', issues);
  requireNonEmpty(reference.title, 'title', issues);
  requireNonEmpty(reference.version, 'version', issues);
  if (reference.schemaVersion !== GEOLOGY_AUDIT_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', message: `must equal ${GEOLOGY_AUDIT_SCHEMA_VERSION}` });
  }
  if (!reference.rulesDemonstrated.length) issues.push({ path: 'rulesDemonstrated', message: 'must contain at least one rule id' });
  if (knownRuleIds) {
    reference.rulesDemonstrated.forEach((ruleId, index) => {
      if (!knownRuleIds.has(ruleId)) issues.push({ path: `rulesDemonstrated[${index}]`, message: `unknown rule id: ${ruleId}` });
    });
  }
  if (reference.status === 'approved') {
    if (!reference.assets.length) issues.push({ path: 'assets', message: 'approved references must include at least one asset' });
    if (reference.review.geological !== 'approved') issues.push({ path: 'review.geological', message: 'approved references require geological approval' });
    if (reference.review.structural !== 'approved') issues.push({ path: 'review.structural', message: 'approved references require structural approval' });
    if (reference.review.visual !== 'approved') issues.push({ path: 'review.visual', message: 'approved references require visual approval' });
  }
  for (const [key, value] of Object.entries(reference.parameters)) {
    if (!Number.isFinite(value)) issues.push({ path: `parameters.${key}`, message: 'must be finite' });
  }
  for (const [key, value] of Object.entries(reference.metrics)) {
    if (!Number.isFinite(value)) issues.push({ path: `metrics.${key}`, message: 'must be finite' });
  }
  reference.assets.forEach((asset, index) => {
    requireNonEmpty(asset.assetId, `assets[${index}].assetId`, issues);
    requireNonEmpty(asset.uri, `assets[${index}].uri`, issues);
    requireNonEmpty(asset.mediaType, `assets[${index}].mediaType`, issues);
  });
  return issues;
}

export function validateWorldAuditManifest(manifest: WorldAuditManifest): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  requireNonEmpty(manifest.worldId, 'worldId', issues);
  requireNonEmpty(manifest.seed, 'seed', issues);
  requireNonEmpty(manifest.generatorCommit, 'generatorCommit', issues);
  if (manifest.schemaVersion !== GEOLOGY_AUDIT_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', message: `must equal ${GEOLOGY_AUDIT_SCHEMA_VERSION}` });
  }
  const regionIds = new Set<string>();
  manifest.regions.forEach((region, index) => {
    requireNonEmpty(region.regionId, `regions[${index}].regionId`, issues);
    if (regionIds.has(region.regionId)) issues.push({ path: `regions[${index}].regionId`, message: 'must be unique' });
    regionIds.add(region.regionId);
  });
  return issues;
}

export function validateRegistrySnapshot(snapshot: RegistrySnapshot): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  requireNonEmpty(snapshot.registryVersion, 'registryVersion', issues);
  if (snapshot.schemaVersion !== GEOLOGY_AUDIT_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', message: `must equal ${GEOLOGY_AUDIT_SCHEMA_VERSION}` });
  }

  const ruleIds = new Set<string>();
  snapshot.rules.forEach((rule, index) => {
    for (const issue of validateRule(rule)) issues.push({ path: `rules[${index}].${issue.path}`, message: issue.message });
    if (ruleIds.has(rule.ruleId)) issues.push({ path: `rules[${index}].ruleId`, message: 'must be unique' });
    ruleIds.add(rule.ruleId);
  });

  const caseIds = new Set<string>();
  snapshot.references.forEach((reference, index) => {
    for (const issue of validateReferenceCase(reference, ruleIds)) issues.push({ path: `references[${index}].${issue.path}`, message: issue.message });
    if (caseIds.has(reference.caseId)) issues.push({ path: `references[${index}].caseId`, message: 'must be unique' });
    caseIds.add(reference.caseId);
  });
  return issues;
}

export function assertValidRegistrySnapshot(snapshot: RegistrySnapshot): void {
  const issues = validateRegistrySnapshot(snapshot);
  if (issues.length) throw new GeologyAuditValidationError('Invalid geology reference registry', issues);
}

function requireNonEmpty(value: string, path: string, issues: ValidationIssue[]): void {
  if (!value.trim()) issues.push({ path, message: 'must not be empty' });
}

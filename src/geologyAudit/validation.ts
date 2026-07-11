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
  validateFiniteRecord(reference.parameters, 'parameters', issues);
  validateFiniteRecord(reference.metrics, 'metrics', issues);
  reference.assets.forEach((asset, index) => validateAsset(asset, `assets[${index}]`, issues));
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
  if (!Number.isFinite(Date.parse(manifest.generatedAt))) issues.push({ path: 'generatedAt', message: 'must be an ISO-compatible date-time' });
  if (manifest.gridWidth !== undefined && (!Number.isInteger(manifest.gridWidth) || manifest.gridWidth <= 0)) issues.push({ path: 'gridWidth', message: 'must be a positive integer' });
  if (manifest.gridHeight !== undefined && (!Number.isInteger(manifest.gridHeight) || manifest.gridHeight <= 0)) issues.push({ path: 'gridHeight', message: 'must be a positive integer' });
  validateFiniteRecord(manifest.parameters, 'parameters', issues);

  const assetIds = new Set<string>();
  manifest.assets.forEach((asset, index) => {
    validateAsset(asset, `assets[${index}]`, issues);
    if (assetIds.has(asset.assetId)) issues.push({ path: `assets[${index}].assetId`, message: 'must be unique' });
    assetIds.add(asset.assetId);
  });

  const regionIds = new Set<string>();
  manifest.regions.forEach((region, index) => {
    const path = `regions[${index}]`;
    requireNonEmpty(region.regionId, `${path}.regionId`, issues);
    if (regionIds.has(region.regionId)) issues.push({ path: `${path}.regionId`, message: 'must be unique' });
    regionIds.add(region.regionId);
    if (!region.featureTypes.length) issues.push({ path: `${path}.featureTypes`, message: 'must contain at least one feature type' });
    validateFiniteRecord(region.parameters ?? {}, `${path}.parameters`, issues);

    for (const assetId of region.assetIds ?? []) {
      if (!assetIds.has(assetId)) issues.push({ path: `${path}.assetIds`, message: `unknown asset id: ${assetId}` });
    }

    let runCellCount = 0;
    let previousEnd = -1;
    for (let runIndex = 0; runIndex < (region.cellIndexRuns ?? []).length; runIndex++) {
      const [start, length] = region.cellIndexRuns![runIndex];
      const runPath = `${path}.cellIndexRuns[${runIndex}]`;
      if (!Number.isInteger(start) || start < 0) issues.push({ path: `${runPath}[0]`, message: 'start must be a non-negative integer' });
      if (!Number.isInteger(length) || length <= 0) issues.push({ path: `${runPath}[1]`, message: 'length must be a positive integer' });
      if (start <= previousEnd) issues.push({ path: runPath, message: 'runs must be sorted, non-overlapping, and non-adjacent' });
      previousEnd = start + length - 1;
      runCellCount += length;
    }
    if (region.cellCount !== undefined && (!Number.isInteger(region.cellCount) || region.cellCount <= 0)) issues.push({ path: `${path}.cellCount`, message: 'must be a positive integer' });
    if (region.cellCount !== undefined && region.cellIndexRuns && runCellCount !== region.cellCount) issues.push({ path: `${path}.cellIndexRuns`, message: 'encoded run length must equal cellCount' });
    if (manifest.gridWidth && manifest.gridHeight && previousEnd >= manifest.gridWidth * manifest.gridHeight) issues.push({ path: `${path}.cellIndexRuns`, message: 'cell index exceeds manifest grid' });

    if (region.gridBounds) {
      const bounds = region.gridBounds;
      for (const [key, value] of Object.entries(bounds)) {
        if (key === 'wrapsLongitude') continue;
        if (!Number.isInteger(value) || value < 0) issues.push({ path: `${path}.gridBounds.${key}`, message: 'must be a non-negative integer' });
      }
      if (bounds.minRow > bounds.maxRow || bounds.minCol > bounds.maxCol) issues.push({ path: `${path}.gridBounds`, message: 'minimum bounds must not exceed maximum bounds' });
      if (manifest.gridHeight && bounds.maxRow >= manifest.gridHeight) issues.push({ path: `${path}.gridBounds.maxRow`, message: 'must be within gridHeight' });
      if (manifest.gridWidth && bounds.maxCol >= manifest.gridWidth) issues.push({ path: `${path}.gridBounds.maxCol`, message: 'must be within gridWidth' });
    }
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

function validateAsset(asset: { assetId: string; uri: string; mediaType: string; width?: number; height?: number }, path: string, issues: ValidationIssue[]): void {
  requireNonEmpty(asset.assetId, `${path}.assetId`, issues);
  requireNonEmpty(asset.uri, `${path}.uri`, issues);
  requireNonEmpty(asset.mediaType, `${path}.mediaType`, issues);
  if (asset.width !== undefined && (!Number.isInteger(asset.width) || asset.width <= 0)) issues.push({ path: `${path}.width`, message: 'must be a positive integer' });
  if (asset.height !== undefined && (!Number.isInteger(asset.height) || asset.height <= 0)) issues.push({ path: `${path}.height`, message: 'must be a positive integer' });
}

function validateFiniteRecord(record: Record<string, unknown>, path: string, issues: ValidationIssue[]): void {
  for (const [key, value] of Object.entries(record)) {
    if (!Number.isFinite(value)) issues.push({ path: `${path}.${key}`, message: 'must be finite' });
  }
}

function requireNonEmpty(value: string, path: string, issues: ValidationIssue[]): void {
  if (!value.trim()) issues.push({ path, message: 'must not be empty' });
}

export const GEOLOGY_AUDIT_SCHEMA_VERSION = '1.0.0' as const;

export type NumericRange = {
  min?: number;
  max?: number;
};

export type PlanetParameterKey =
  | 'gravityEarthG'
  | 'tectonicActivity'
  | 'erosionStrength'
  | 'surfaceAgeNormalized'
  | 'seaLevelNormalized'
  | 'precipitationNormalized'
  | 'heatFlowNormalized'
  | 'crustThicknessNormalized';

export type PlanetParameters = Partial<Record<PlanetParameterKey, number>>;

export type CrustType = 'continental' | 'oceanic' | 'transitional' | 'unknown';
export type BoundaryType = 'convergent' | 'divergent' | 'transform' | 'intraplate' | 'none' | 'unknown';
export type ClimateBand = 'arid' | 'temperate' | 'humid' | 'polar' | 'mixed' | 'unknown';
export type GeologicalRegionKind = 'feature' | 'continent' | 'ocean-basin' | 'custom';

export type GridBounds = {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
  wrapsLongitude: boolean;
};

export type CellIndexRun = [start: number, length: number];

export type GeologicalRegionManifest = {
  regionId: string;
  regionKind?: GeologicalRegionKind;
  primaryFeature?: string;
  crustA?: CrustType;
  crustB?: CrustType;
  boundaryType?: BoundaryType;
  featureTypes: string[];
  climate?: ClimateBand;
  parameters?: PlanetParameters;
  assetIds?: string[];
  cellCount?: number;
  cellIndexRuns?: CellIndexRun[];
  gridBounds?: GridBounds;
};

export type WorldAuditAsset = {
  assetId: string;
  role:
    | 'final-render'
    | 'elevation'
    | 'bathymetry'
    | 'crust-type'
    | 'crust-age'
    | 'plate-boundaries'
    | 'feature-authority'
    | 'drainage'
    | 'slope'
    | 'curvature'
    | 'annotation'
    | 'other';
  uri: string;
  mediaType: string;
  width?: number;
  height?: number;
  checksumSha256?: string;
};

export type WorldAuditManifest = {
  schemaVersion: typeof GEOLOGY_AUDIT_SCHEMA_VERSION;
  worldId: string;
  seed: string;
  generatorCommit: string;
  generatedAt: string;
  gridWidth?: number;
  gridHeight?: number;
  parameters: PlanetParameters;
  regions: GeologicalRegionManifest[];
  assets: WorldAuditAsset[];
};

export type MetricExpectation = {
  metricId: string;
  preferredRange?: NumericRange;
  hardRange?: NumericRange;
  rationale: string;
};

export type ThresholdRelation = 'increase' | 'decrease' | 'stable' | 'nondecreasing' | 'nonincreasing';

export type ThresholdExpectation = {
  parameter: PlanetParameterKey;
  metricId: string;
  relation: ThresholdRelation;
  rationale: string;
};

export type RuleApplicability = {
  boundaryTypes?: BoundaryType[];
  crustPairs?: Array<readonly [CrustType, CrustType]>;
  featureTypesAny?: string[];
  climateBands?: ClimateBand[];
  parameterRanges?: Partial<Record<PlanetParameterKey, NumericRange>>;
};

export type GeologyRule = {
  schemaVersion: typeof GEOLOGY_AUDIT_SCHEMA_VERSION;
  ruleId: string;
  title: string;
  domain: string;
  summary: string;
  appliesWhen: RuleApplicability;
  expectedMorphology: string[];
  metricExpectations: MetricExpectation[];
  thresholdExpectations: ThresholdExpectation[];
  warningPatterns: string[];
  validExceptions: string[];
  evidenceStatus: 'research-required' | 'provisional' | 'reviewed';
  evidenceNotes: string[];
  version: string;
};

export type ReferenceKind = 'positive' | 'negative' | 'exception' | 'threshold';
export type ReferenceStatus = 'candidate' | 'approved' | 'rejected' | 'retired';
export type ReferenceAuthority = 'observational' | 'controlled-archetype' | 'worldwright-approved' | 'worldwright-failure';

export type ReferenceReview = {
  geological: 'not-reviewed' | 'approved' | 'rejected';
  structural: 'not-reviewed' | 'approved' | 'rejected';
  visual: 'not-reviewed' | 'approved' | 'rejected';
  reviewedBy: string[];
  reviewedAt?: string;
  notes: string[];
};

export type ReferenceCase = {
  schemaVersion: typeof GEOLOGY_AUDIT_SCHEMA_VERSION;
  caseId: string;
  familyId: string;
  title: string;
  kind: ReferenceKind;
  status: ReferenceStatus;
  authority: ReferenceAuthority;
  rulesDemonstrated: string[];
  parameters: PlanetParameters;
  region?: Omit<GeologicalRegionManifest, 'regionId' | 'assetIds'>;
  metrics: Record<string, number>;
  assets: WorldAuditAsset[];
  sourceNotes: string[];
  license?: string;
  review: ReferenceReview;
  version: string;
};

export type ReferenceSearchQuery = {
  ruleIds: string[];
  parameters?: PlanetParameters;
  kinds?: ReferenceKind[];
  statuses?: ReferenceStatus[];
  authorities?: ReferenceAuthority[];
  limit?: number;
};

export type ReferenceSearchMatch = {
  reference: ReferenceCase;
  matchedRuleIds: string[];
  parameterDistance: number | null;
};

export type RegionAuditPlan = {
  regionId: string;
  applicableRuleIds: string[];
  positiveReferences: ReferenceSearchMatch[];
  thresholdReferences: ReferenceSearchMatch[];
  negativeReferences: ReferenceSearchMatch[];
  exceptionReferences: ReferenceSearchMatch[];
  missingReferenceRuleIds: string[];
};

export type WorldAuditPlan = {
  schemaVersion: typeof GEOLOGY_AUDIT_SCHEMA_VERSION;
  worldId: string;
  seed: string;
  generatorCommit: string;
  registryVersion: string;
  regions: RegionAuditPlan[];
  warnings: string[];
};

export type RegistrySnapshot = {
  schemaVersion: typeof GEOLOGY_AUDIT_SCHEMA_VERSION;
  registryVersion: string;
  rules: GeologyRule[];
  references: ReferenceCase[];
};

export type ValidationIssue = {
  path: string;
  message: string;
};

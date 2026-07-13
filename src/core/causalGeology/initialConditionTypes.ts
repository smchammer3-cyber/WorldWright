import type { DeterministicHash } from '../worldProvenance/hash';
import type { RootSeedIdentity } from '../worldRandom/types';
import type { CausalInputDeclarationV1, ScientificQuantityV1 } from './types';

export type InitialConditionControlIntent = 'HARD_CONSTRAINT' | 'SOFT_PREFERENCE' | 'UNSPECIFIED';
export type InitialConditionControlSource = 'USER' | 'TEMPLATE' | 'SEEDED_DEFAULT_REQUEST';
export type InitialConditionLockState = 'LOCKED' | 'UNLOCKED';
export type InitialConditionRerollScope =
  | 'BODY_AND_COMPOSITION'
  | 'ORBIT_AND_STELLAR_CONTEXT'
  | 'VOLATILE_AND_SURFACE_INVENTORY'
  | 'THERMAL_INITIAL_CONDITIONS';
export type InitialConditionExceptionPermission = 'ALLOW_ARTIFICIAL_OR_FICTIONAL_SOLID_SHELL';
export type InitialConditionResolutionStatus = 'COMPLETE' | 'PARTIAL' | 'BLOCKED';

export type InitialConditionDirectInputId =
  | 'planet.radius'
  | 'planet.density'
  | 'star.luminosity'
  | 'orbit.distance'
  | 'climate.declared-albedo'
  | 'climate.declared-greenhouse'
  | 'inventory.water'
  | 'inventory.volatiles'
  | 'thermal.age'
  | 'thermal.primordial-heat'
  | 'thermal.radiogenic-heat'
  | 'thermal.tidal-heating';

export type InitialConditionHintControlId = 'legacy.planet-profile-hint' | 'legacy.style-mode-hint';
export type InitialConditionControlId = InitialConditionDirectInputId | InitialConditionHintControlId;

export interface InitialConditionQuantityControlValueV1 {
  readonly schemaVersion: 1;
  readonly kind: 'QUANTITY';
  readonly quantity: ScientificQuantityV1;
}

export interface InitialConditionEnumControlValueV1 {
  readonly schemaVersion: 1;
  readonly kind: 'ENUM';
  readonly enumContract: 'LEGACY_PLANET_PROFILE_HINT_V1' | 'STYLE_MODE_HINT_V1';
  readonly value: string;
}

export type InitialConditionControlValueV1 = InitialConditionQuantityControlValueV1 | InitialConditionEnumControlValueV1;

export interface GenerationRequestControlV1 {
  readonly schemaVersion: 1;
  readonly controlId: InitialConditionControlId;
  readonly intent: InitialConditionControlIntent;
  readonly value?: InitialConditionControlValueV1;
  readonly source: InitialConditionControlSource;
  readonly lockState: InitialConditionLockState;
  readonly scope: InitialConditionRerollScope;
}

export interface GenerationRequestV1 {
  readonly schemaVersion: 1;
  readonly requestContractVersion: 1;
  readonly rootSeed: RootSeedIdentity;
  readonly controls: readonly GenerationRequestControlV1[];
  readonly exceptionPermissions: readonly InitialConditionExceptionPermission[];
  readonly rerollScopes: readonly InitialConditionRerollScope[];
  readonly rerollOrdinal: number;
  readonly sourceTemplateId?: string;
  readonly sourceTemplateVersion?: string;
  readonly limitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface InitialConditionPriorQuantityRangeV1 {
  readonly schemaVersion: 1;
  readonly inputId: InitialConditionDirectInputId;
  readonly min: number;
  readonly max: number;
  readonly unit: string;
  readonly scaleId: string;
}

export interface InitialConditionPriorFamilyV1 {
  readonly schemaVersion: 1;
  readonly familyId: string;
  readonly weight: number;
  readonly quantityRanges: readonly InitialConditionPriorQuantityRangeV1[];
  readonly profileHints: readonly string[];
  readonly styleHints: readonly string[];
  readonly provenanceClass: 'INTERNAL_MODELING_PRIOR';
  readonly limitations: readonly string[];
}

export interface InitialConditionPriorConstraintBundleV1 {
  readonly schemaVersion: 1;
  readonly bundleId: 'WORLDWRIGHT_INITIAL_CONDITION_PRIORS_V1';
  readonly bundleVersion: 1;
  readonly families: readonly InitialConditionPriorFamilyV1[];
  readonly hardConstraintRuleIds: readonly string[];
  readonly softCorrelationRuleIds: readonly string[];
  readonly holdoutIds: readonly string[];
  readonly knownLimitations: readonly string[];
  readonly contentHash: DeterministicHash;
}

export interface InitialConditionCorrelatedSelectionV1 {
  readonly schemaVersion: 1;
  readonly selectionId: string;
  readonly familyId: string;
  readonly candidateFamilyIds: readonly string[];
  readonly selectionBasisHash: DeterministicHash;
  readonly randomAddress: string;
}

export interface InitialConditionResolutionTraceEntryV1 {
  readonly schemaVersion: 1;
  readonly traceId: string;
  readonly phase: 'VALIDATION' | 'FAMILY_SELECTION' | 'QUANTITY_RESOLUTION' | 'FINAL_VALIDATION';
  readonly outcome: 'ACCEPTED' | 'DEPARTED_FROM_PREFERENCE' | 'REJECTED' | 'BLOCKED';
  readonly controlId?: InitialConditionControlId;
  readonly inputId?: InitialConditionDirectInputId;
  readonly detailCode: string;
}

export interface InitialConditionConflictV1 {
  readonly schemaVersion: 1;
  readonly conflictId: string;
  readonly severity: 'BLOCKING' | 'LIMITING';
  readonly controlIds: readonly InitialConditionControlId[];
  readonly constraintIds: readonly string[];
  readonly detailCode: string;
}

export interface InitialConditionRetrySummaryV1 {
  readonly schemaVersion: 1;
  readonly candidateFamiliesExamined: number;
  readonly retryCount: number;
  readonly backtrackCount: number;
  readonly boundedBy: string;
}

export interface PlanetInitialConditionBundleV1 {
  readonly schemaVersion: 1;
  readonly bundleContractVersion: 1;
  readonly status: InitialConditionResolutionStatus;
  readonly requestHash: DeterministicHash;
  readonly rootSeed: RootSeedIdentity;
  readonly priorConstraintBundleId: InitialConditionPriorConstraintBundleV1['bundleId'];
  readonly priorConstraintBundleVersion: InitialConditionPriorConstraintBundleV1['bundleVersion'];
  readonly priorConstraintBundleHash: DeterministicHash;
  readonly resolvedDeclarations: readonly CausalInputDeclarationV1[];
  readonly resolvedCorrelatedSelections: readonly InitialConditionCorrelatedSelectionV1[];
  readonly approvedDerivations: readonly CausalInputDeclarationV1[];
  readonly hardConstraints: readonly InitialConditionControlId[];
  readonly softPreferences: readonly InitialConditionControlId[];
  readonly exceptionPermissions: readonly InitialConditionExceptionPermission[];
  readonly resolutionTrace: readonly InitialConditionResolutionTraceEntryV1[];
  readonly conflicts: readonly InitialConditionConflictV1[];
  readonly limitations: readonly string[];
  readonly retrySummary: InitialConditionRetrySummaryV1;
  readonly contentHash: DeterministicHash;
}

export type LegacyGenerateFoundationField =
  | 'styleMode'
  | 'seaLevel'
  | 'seaLevelOffset'
  | 'waterInventory'
  | 'plateActivity'
  | 'planetAge'
  | 'erosionIntensity'
  | 'moistureLevel'
  | 'temperatureOffset'
  | 'planetProfile'
  | 'planetRadiusEarth'
  | 'planetDensityEarth'
  | 'starLuminositySun'
  | 'orbitalDistanceAU'
  | 'albedo'
  | 'greenhouseStrength'
  | 'volatileInventory'
  | 'coreHeatIntent'
  | 'tidalHeatingIntent'
  | 'stagnantLidBias'
  | 'compositionRadioactivity';

export type LegacyControlMigrationDisposition =
  | 'DIRECT_CONTROL'
  | 'SOFT_HINT'
  | 'DOWNSTREAM_ONLY'
  | 'COMPARISON_ONLY'
  | 'RESERVED_INACTIVE';

export interface LegacyControlMigrationDefinitionV1 {
  readonly field: LegacyGenerateFoundationField;
  readonly disposition: LegacyControlMigrationDisposition;
  readonly targetControlId?: InitialConditionControlId;
  readonly hardConstraintEligible: boolean;
  readonly detailCode: string;
}

export interface LegacyControlMigrationResultV1 {
  readonly request: GenerationRequestV1;
  readonly observedFields: readonly LegacyGenerateFoundationField[];
  readonly ignoredFields: readonly string[];
  readonly migrationDetailCodes: readonly string[];
}

export interface InitialConditionResolverMetricsV1 {
  readonly schemaVersion: 1;
  readonly candidateFamilyCount: number;
  readonly candidateFamiliesExamined: number;
  readonly resolvedDeclarationCount: number;
  readonly resolutionTraceCount: number;
  readonly conflictCount: number;
  readonly serializedArtifactBytes: number;
}

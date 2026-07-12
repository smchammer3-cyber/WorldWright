import type { CausalRandomStreamName, RandomScopePart, WorldRandomOracle } from '../worldRandom/types';

export type ConfidenceBand = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CERTAIN';
export type EvidenceKind = 'OBSERVATION' | 'DERIVATION' | 'CONSTRAINT' | 'ASSUMPTION' | 'LEGACY_COMPATIBILITY';
export type EvidencePolarity = 'SUPPORTS' | 'OPPOSES' | 'NEUTRAL';
export type ContradictionSeverity = 'LOW' | 'MEDIUM' | 'HIGH';
export type ContradictionStatus = 'OPEN' | 'RESOLVED' | 'DISMISSED';
export type ScientificClaimStatus = 'ACTIVE' | 'RETRACTED';

export type CausalBranchValue =
  | string
  | number
  | boolean
  | null
  | readonly CausalBranchValue[]
  | { readonly [key: string]: CausalBranchValue };

export interface ConfidenceEvidenceV1 {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly subject: string;
  readonly kind: EvidenceKind;
  readonly polarity: EvidencePolarity;
  readonly weight: number;
  readonly reliability: number;
  readonly source: string;
  readonly note?: string;
}

export interface ConfidenceAssessmentV1 {
  readonly schemaVersion: 1;
  readonly subject: string;
  readonly probability: number;
  readonly confidence: number;
  readonly band: ConfidenceBand;
  readonly supportStrength: number;
  readonly oppositionStrength: number;
  readonly neutralStrength: number;
  readonly evidenceIds: readonly string[];
  readonly contradictionIds: readonly string[];
  readonly rationale: string;
}

export interface WeightedBranchOptionV1<T extends CausalBranchValue = CausalBranchValue> {
  readonly id: string;
  readonly value: T;
  readonly weight: number;
  readonly evidenceIds: readonly string[];
  readonly rationale?: string;
}

export interface WeightedBranchResolutionV1<T extends CausalBranchValue = CausalBranchValue> {
  readonly schemaVersion: 1;
  readonly branchId: string;
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly draw: 'selection';
  readonly randomUnit: number;
  readonly totalWeight: number;
  readonly normalizedWeights: readonly Readonly<{ optionId: string; probability: number }>[];
  readonly chosenOptionId: string;
  readonly chosenValue: T;
  readonly evidenceIds: readonly string[];
}

export interface ResolveWeightedBranchRequest<T extends CausalBranchValue = CausalBranchValue> {
  readonly branchId: string;
  readonly stream: CausalRandomStreamName;
  readonly scope: readonly RandomScopePart[];
  readonly options: readonly WeightedBranchOptionV1<T>[];
  readonly oracle: WorldRandomOracle;
}

export interface ScientificClaimV1<T extends CausalBranchValue = CausalBranchValue> {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly subject: string;
  readonly value: T;
  readonly confidence: number;
  readonly evidenceIds: readonly string[];
  readonly source: string;
  readonly status: ScientificClaimStatus;
}

export interface ContradictionResolutionV1 {
  readonly selectedClaimId: string;
  readonly rationale: string;
}

export interface ContradictionDismissalV1 {
  readonly rationale: string;
}

export interface ContradictionRecordV1 {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly subject: string;
  readonly severity: ContradictionSeverity;
  readonly status: ContradictionStatus;
  readonly claimIds: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly observedValues: readonly CausalBranchValue[];
  readonly message: string;
  readonly resolution?: ContradictionResolutionV1;
  readonly dismissal?: ContradictionDismissalV1;
}

export interface CausalConfidenceLedgerV1 {
  readonly schemaVersion: 1;
  readonly evidence: readonly ConfidenceEvidenceV1[];
  readonly assessments: readonly ConfidenceAssessmentV1[];
  readonly branchResolutions: readonly WeightedBranchResolutionV1[];
  readonly contradictions: readonly ContradictionRecordV1[];
}

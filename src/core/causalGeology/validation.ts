import { isCausalConfidenceLedgerV1 } from '../worldConfidence/confidence';
import { isCausalProvenanceManifestV1 } from '../worldProvenance/schema';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { validateCausalGeologyInput } from './inputAuthority';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type {
  CausalDomainRecordBaseV1,
  CausalShadowRunV1,
  CausalStageResultV1,
  GeologicSpineV1,
  InteriorStateV1,
  PlanetaryPremiseV1,
  TectonicRegimeHistoryV1,
} from './types';

const STAGE_ORDER = [
  'CAUSAL_INPUT_SANITIZATION',
  'CAUSAL_PREMISE_RESOLUTION',
  'CAUSAL_INTERIOR_RESOLUTION',
  'CAUSAL_REGIME_HISTORY',
  'CAUSAL_GEOLOGIC_SPINE',
  'CAUSAL_SHADOW_AUDIT',
] as const;

export function validateCausalStageResult(value: unknown): asserts value is CausalStageResultV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal stage result must be an object.');
  const result = value as Partial<CausalStageResultV1>;
  if (result.schemaVersion !== 1 || !STAGE_ORDER.includes(result.stageId as never) || !Number.isSafeInteger(result.stageVersion) || (result.stageVersion as number) < 1) {
    throw new Error('Causal stage result identity is invalid.');
  }
  if (!['COMPLETE', 'PARTIAL', 'BLOCKED', 'FAILED'].includes(result.status as string)) throw new Error('Causal stage status is invalid.');
  assertDeterministicHash(result.inputHash, 'Causal stage input');
  const hasRecord = result.record !== undefined;
  const recordAllowed = result.status === 'COMPLETE' || result.status === 'PARTIAL';
  if (hasRecord !== recordAllowed) throw new Error(`${result.status} causal stage result has invalid record presence.`);
  if (hasRecord) assertDeterministicHash(result.outputHash, 'Causal stage output');
  else if (result.outputHash !== undefined) throw new Error('Blocked or failed stage cannot have an output hash.');
  const limitations = validateCanonicalText(result.limitations, 'Stage limitations');
  const blockers = validateCanonicalText(result.blockingReasons, 'Stage blocking reasons');
  const issues = validateCanonicalText(result.validationIssues, 'Stage validation issues');
  validateCanonicalText(result.evidenceIds, 'Stage evidence IDs');
  validateCanonicalText(result.contradictionIds, 'Stage contradiction IDs');
  if (result.status === 'PARTIAL' && limitations.length === 0) throw new Error('PARTIAL stage requires limitations.');
  if (result.status === 'BLOCKED' && blockers.length === 0) throw new Error('BLOCKED stage requires blocking reasons.');
  if (result.status === 'FAILED' && issues.length === 0) throw new Error('FAILED stage requires validation issues.');
}

export function validatePlanetaryPremise(value: unknown): asserts value is PlanetaryPremiseV1 {
  validateDomainBase(value, 'Planetary premise');
  const premise = value as PlanetaryPremiseV1;
  if (!Number.isSafeInteger(premise.premiseVersion) || premise.premiseVersion < 1) throw new Error('Planetary premise version is invalid.');
  assertDeterministicHash(premise.inputSnapshotHash, 'Planetary premise input');
  requireText(premise.planetProfile, 'Planetary premise profile');
  validateCanonicalText(premise.surfaceSupportCandidates, 'Surface support candidates');
  validateCanonicalText(premise.surfaceWaterCandidates, 'Surface water candidates');
  validateCanonicalText(premise.layerStackCandidates, 'Layer stack candidates');
  if (premise.resolvedLayerStack !== undefined) validateCanonicalText(premise.resolvedLayerStack, 'Resolved layer stack');
  validateCanonicalText(premise.branchResolutionIds, 'Premise branch IDs');
  requireText(premise.confidenceAssessmentSubject, 'Premise confidence subject');
  assertRecordHash('WorldWright/planetary-premise/v1', premise);
}

export function validateInteriorState(value: unknown): asserts value is InteriorStateV1 {
  validateDomainBase(value, 'Interior state');
  const interior = value as InteriorStateV1;
  if (!Number.isSafeInteger(interior.interiorVersion) || interior.interiorVersion < 1) throw new Error('Interior version is invalid.');
  validateScientificRange(interior.thermalBudgetRange);
  validateScientificRange(interior.mantleConvectionRange);
  validateCanonicalText(interior.rheologyCandidates, 'Interior rheology candidates');
  validateCanonicalText(interior.lidRegimeCandidates, 'Interior lid candidates');
  if (interior.resolvedLidRegime !== undefined) requireText(interior.resolvedLidRegime, 'Resolved lid regime');
  validateCanonicalText(interior.branchResolutionIds, 'Interior branch IDs');
  requireText(interior.confidenceAssessmentSubject, 'Interior confidence subject');
  assertRecordHash('WorldWright/interior-state/v1', interior);
}

export function validateTectonicRegimeHistory(value: unknown): asserts value is TectonicRegimeHistoryV1 {
  validateDomainBase(value, 'Tectonic regime history');
  const history = value as TectonicRegimeHistoryV1;
  if (!Number.isSafeInteger(history.historyVersion) || history.historyVersion < 1 || history.timeConvention !== 'FRACTION_OF_RESOLVED_GEOLOGIC_HISTORY_V1') throw new Error('Tectonic history contract is invalid.');
  if (!Array.isArray(history.epochs) || history.epochs.length === 0) throw new Error('Tectonic history epochs are missing.');
  const epochIds = new Set<string>();
  let expectedStart = 0;
  history.epochs.forEach((epoch, index) => {
    requireText(epoch.epochId, 'Epoch ID');
    if (epochIds.has(epoch.epochId)) throw new Error(`Duplicate epoch ID: ${epoch.epochId}`);
    epochIds.add(epoch.epochId);
    if (epoch.sequenceIndex !== index || !Number.isFinite(epoch.startTime) || !Number.isFinite(epoch.endTime) || epoch.startTime !== expectedStart || epoch.endTime <= epoch.startTime || epoch.endTime > 1) throw new Error(`Epoch ${epoch.epochId} interval is invalid.`);
    expectedStart = epoch.endTime;
    requireText(epoch.regimeFamily, 'Epoch regime family');
    requireText(epoch.confidenceSubject, 'Epoch confidence subject');
    validateCanonicalText(epoch.evidenceIds, 'Epoch evidence IDs');
  });
  if (expectedStart !== 1) throw new Error('Tectonic epochs must cover the full [0,1] history.');
  if (!Array.isArray(history.transitions) || history.transitions.length !== Math.max(0, history.epochs.length - 1)) throw new Error('Tectonic transition count is invalid.');
  history.transitions.forEach((transition, index) => {
    requireText(transition.transitionId, 'Transition ID');
    if (transition.fromEpochId !== history.epochs[index].epochId || transition.toEpochId !== history.epochs[index + 1].epochId) throw new Error(`Transition ${transition.transitionId} does not connect adjacent epochs.`);
    requireText(transition.triggerFamily, 'Transition trigger family');
    requireText(transition.confidenceSubject, 'Transition confidence subject');
    validateCanonicalText(transition.triggerEvidenceIds, 'Transition evidence IDs');
  });
  validateCanonicalText(history.branchResolutionIds, 'History branch IDs');
  assertRecordHash('WorldWright/tectonic-regime-history/v1', history);
}

export function validateGeologicSpine(value: unknown): asserts value is GeologicSpineV1 {
  validateDomainBase(value, 'Geologic spine');
  const spine = value as GeologicSpineV1;
  if (!Number.isSafeInteger(spine.spineVersion) || spine.spineVersion < 1 || spine.coordinateConvention !== 'SPHERICAL_LAT_LON_DEGREES_V1') throw new Error('Geologic spine contract is invalid.');
  if (!Array.isArray(spine.nodes) || !Array.isArray(spine.edges) || !Array.isArray(spine.events)) throw new Error('Geologic spine collections are invalid.');
  const nodeIds = new Set<string>();
  for (const node of spine.nodes) {
    requireText(node.nodeId, 'Spine node ID');
    if (nodeIds.has(node.nodeId)) throw new Error(`Duplicate spine node ID: ${node.nodeId}`);
    nodeIds.add(node.nodeId);
    validateSphericalAnchor(node.anchor);
    validateSphericalExtent(node.extent);
    validateCanonicalText(node.evidenceIds, 'Spine node evidence IDs');
  }
  const edgeIds = new Set<string>();
  for (const edge of spine.edges) {
    requireText(edge.edgeId, 'Spine edge ID');
    if (edgeIds.has(edge.edgeId)) throw new Error(`Duplicate spine edge ID: ${edge.edgeId}`);
    edgeIds.add(edge.edgeId);
    if (!nodeIds.has(edge.fromNodeId) || !nodeIds.has(edge.toNodeId) || edge.fromNodeId === edge.toNodeId) throw new Error(`Spine edge ${edge.edgeId} references invalid nodes.`);
    validateCanonicalText(edge.evidenceIds, 'Spine edge evidence IDs');
  }
  const eventIds = new Set<string>();
  for (const event of spine.events) {
    requireText(event.eventId, 'Spine event ID');
    if (eventIds.has(event.eventId)) throw new Error(`Duplicate spine event ID: ${event.eventId}`);
    eventIds.add(event.eventId);
    requireText(event.epochId, 'Spine event epoch ID');
    for (const nodeId of validateCanonicalText(event.relatedNodeIds, 'Spine event node IDs')) if (!nodeIds.has(nodeId)) throw new Error(`Spine event ${event.eventId} references missing node ${nodeId}.`);
    validateCanonicalText(event.parentEventIds, 'Spine parent event IDs');
    validateCanonicalText(event.evidenceIds, 'Spine event evidence IDs');
  }
  for (const event of spine.events) for (const parentId of event.parentEventIds) if (!eventIds.has(parentId)) throw new Error(`Spine event ${event.eventId} references missing parent ${parentId}.`);
  validateCanonicalText(spine.featureFamilies, 'Spine feature families');
  validateCanonicalText(spine.branchResolutionIds, 'Spine branch IDs');
  assertRecordHash('WorldWright/geologic-spine/v1', spine);
}

export function validateCausalShadowRun(value: unknown): asserts value is CausalShadowRunV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal shadow run must be an object.');
  const run = value as Partial<CausalShadowRunV1>;
  if (run.schemaVersion !== 1 || run.runContractVersion !== 1) throw new Error('Unsupported causal shadow run contract.');
  validateCausalGeologyInput(run.inputSnapshot);
  if (!Array.isArray(run.stageResults)) throw new Error('Causal shadow stage results are missing.');
  let previousIndex = -1;
  for (const result of run.stageResults) {
    validateCausalStageResult(result);
    const index = STAGE_ORDER.indexOf(result.stageId as never);
    if (index <= previousIndex) throw new Error('Causal shadow stage results are duplicated or out of order.');
    previousIndex = index;
  }
  if (run.premise !== undefined) validatePlanetaryPremise(run.premise);
  if (run.interior !== undefined) validateInteriorState(run.interior);
  if (run.regimeHistory !== undefined) validateTectonicRegimeHistory(run.regimeHistory);
  if (run.geologicSpine !== undefined) validateGeologicSpine(run.geologicSpine);
  if (!isCausalConfidenceLedgerV1(run.confidenceLedger)) throw new Error('Causal shadow confidence ledger is invalid.');
  validateCanonicalText(run.contradictionIds, 'Causal shadow contradiction IDs');
  if (!isCausalProvenanceManifestV1(run.provenance)) throw new Error('Causal shadow provenance is invalid.');
  assertDeterministicHash(run.contentHash, 'Causal shadow run');
  const expected = hashCausalPayload('WorldWright/causal-shadow-run/v1', {
    schemaVersion: 1,
    runContractVersion: 1,
    inputSnapshot: run.inputSnapshot,
    stageResults: run.stageResults,
    ...(run.premise !== undefined ? { premise: run.premise } : {}),
    ...(run.interior !== undefined ? { interior: run.interior } : {}),
    ...(run.regimeHistory !== undefined ? { regimeHistory: run.regimeHistory } : {}),
    ...(run.geologicSpine !== undefined ? { geologicSpine: run.geologicSpine } : {}),
    confidenceLedger: run.confidenceLedger,
    contradictionIds: run.contradictionIds,
    provenance: run.provenance,
  });
  if (!deterministicHashEquals(run.contentHash, expected)) throw new Error('Causal shadow run content hash mismatch.');
}

function validateDomainBase(value: unknown, label: string): asserts value is CausalDomainRecordBaseV1 {
  if (!value || typeof value !== 'object') throw new Error(`${label} must be an object.`);
  const record = value as Partial<CausalDomainRecordBaseV1>;
  if (record.schemaVersion !== 1 || !['COMPLETE', 'PARTIAL', 'BLOCKED'].includes(record.status as string)) throw new Error(`${label} status is invalid.`);
  validateCanonicalText(record.evidenceIds, `${label} evidence IDs`);
  validateCanonicalText(record.contradictionIds, `${label} contradiction IDs`);
  const limitations = validateCanonicalText(record.limitations, `${label} limitations`);
  if ((record.status === 'PARTIAL' || record.status === 'BLOCKED') && limitations.length === 0) throw new Error(`${label} ${record.status} status requires limitations.`);
  assertDeterministicHash(record.contentHash, label);
}

function assertRecordHash(contract: string, record: Readonly<Record<string, unknown>>): void {
  const expected = hashRecordWithoutContentHash(contract, record);
  if (!deterministicHashEquals(record.contentHash as never, expected)) throw new Error(`${contract} content hash mismatch.`);
}

function validateCanonicalText(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || !value.every((entry) => typeof entry === 'string' && entry.trim().length > 0)) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
  const sorted = [...value].sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  if (!value.every((entry, index) => entry === sorted[index])) throw new Error(`${label} are not canonically ordered.`);
  return value;
}

function requireText(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} is invalid.`);
}

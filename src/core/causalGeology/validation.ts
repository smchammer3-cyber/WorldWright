import { validateCausalConfidenceLedger } from '../worldConfidence/confidence';
import type { CausalConfidenceLedgerV1 } from '../worldConfidence/types';
import { getRandomStreamDefinition } from '../worldRandom/streamRegistry';
import { canonicalJsonStringify, canonicalizeJson } from '../worldProvenance/canonicalJson';
import { isCausalProvenanceManifestV1 } from '../worldProvenance/schema';
import { assertDeterministicHash, deterministicHashEquals, hashCausalPayload, hashRecordWithoutContentHash } from './hashes';
import { validateCausalGeologyInput } from './inputAuthority';
import { validateScientificRange } from './quantities';
import { validateSphericalAnchor, validateSphericalExtent } from './spatial';
import type {
  CausalDomainRecordBaseV1,
  CausalGeologyInputV1,
  CausalGeologyStageId,
  CausalShadowRunV1,
  CausalStageResultV1,
  GeologicSpineEdgeKind,
  GeologicSpineNodeFamily,
  GeologicSpineV1,
  InteriorStateV1,
  PlanetaryPremiseV1,
  ScientificRangeV1,
  TectonicRegimeHistoryV1,
} from './types';

export const CAUSAL_GEOLOGY_STAGE_ORDER: readonly CausalGeologyStageId[] = Object.freeze([
  'CAUSAL_INPUT_SANITIZATION',
  'CAUSAL_PREMISE_RESOLUTION',
  'CAUSAL_INTERIOR_RESOLUTION',
  'CAUSAL_REGIME_HISTORY',
  'CAUSAL_GEOLOGIC_SPINE',
  'CAUSAL_SHADOW_AUDIT',
]);

const NODE_FAMILIES: readonly GeologicSpineNodeFamily[] = Object.freeze([
  'ACCRETION_SYSTEM',
  'CONTINENTAL_KERNEL',
  'CONVERGENCE_SYSTEM',
  'OCEAN_BASIN',
  'PLUME_SYSTEM',
  'RIFT_SYSTEM',
  'TRANSFORM_SYSTEM',
]);

const EDGE_KINDS: readonly GeologicSpineEdgeKind[] = Object.freeze([
  'ACCRETES_TO',
  'CONVERGES_WITH',
  'INHERITS_FROM',
  'OVERPRINTS',
  'SEPARATED_FROM',
  'SUBDUCTS_BENEATH',
  'TRANSFORMS_AGAINST',
]);

export function validateCausalStageResult(value: unknown): asserts value is CausalStageResultV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal stage result must be an object.');
  const result = value as Partial<CausalStageResultV1>;
  if (result.schemaVersion !== 1 || !isStageId(result.stageId) || !Number.isSafeInteger(result.stageVersion) || (result.stageVersion as number) < 1) throw new Error('Causal stage result identity is invalid.');
  if (!['COMPLETE', 'PARTIAL', 'BLOCKED', 'FAILED'].includes(result.status as string)) throw new Error('Causal stage status is invalid.');
  assertDeterministicHash(result.inputHash, 'Causal stage input');
  const hasRecord = result.record !== undefined;
  const recordAllowed = result.status === 'COMPLETE' || result.status === 'PARTIAL';
  if (hasRecord !== recordAllowed) throw new Error(`${result.status} causal stage result has invalid record presence.`);
  if (hasRecord) {
    assertDeterministicHash(result.outputHash, 'Causal stage output');
    validateStageRecord(result.stageId, result.record);
    const expected = hashCausalPayload(`WorldWright/${result.stageId}/output/v${result.stageVersion}`, result.record);
    if (!deterministicHashEquals(result.outputHash, expected)) throw new Error(`${result.stageId} output hash does not match its record.`);
  } else if (result.outputHash !== undefined) throw new Error('Blocked or failed stage cannot have an output hash.');
  const limitations = validateCanonicalText(result.limitations, 'Stage limitations');
  const missingDomains = validateCanonicalText(result.missingDomains, 'Stage missing domains');
  const compatibleStages = validateCanonicalStageIds(result.downstreamCompatibleStageIds, result.stageId);
  const blockers = validateCanonicalText(result.blockingReasons, 'Stage blocking reasons');
  const issues = validateCanonicalText(result.validationIssues, 'Stage validation issues');
  validateCanonicalText(result.evidenceIds, 'Stage evidence IDs');
  validateCanonicalText(result.contradictionIds, 'Stage contradiction IDs');
  if (result.status === 'COMPLETE' && (limitations.length || missingDomains.length || compatibleStages.length)) throw new Error('COMPLETE stage cannot report partial-state fields.');
  if (result.status === 'PARTIAL' && (limitations.length === 0 || missingDomains.length === 0)) throw new Error('PARTIAL stage requires limitations and missing domains.');
  if (result.status !== 'PARTIAL' && compatibleStages.length) throw new Error('Only PARTIAL stages may declare downstream compatibility.');
  if (result.status === 'BLOCKED' && blockers.length === 0) throw new Error('BLOCKED stage requires blocking reasons.');
  if (result.status === 'FAILED' && issues.length === 0) throw new Error('FAILED stage requires validation issues.');
}

export function validatePlanetaryPremise(value: unknown): asserts value is PlanetaryPremiseV1 {
  validateDomainBase(value, 'Planetary premise');
  const premise = value as PlanetaryPremiseV1;
  if (!Number.isSafeInteger(premise.premiseVersion) || premise.premiseVersion < 1) throw new Error('Planetary premise version is invalid.');
  assertDeterministicHash(premise.inputSnapshotHash, 'Planetary premise input');
  requireText(premise.planetProfile, 'Planetary premise profile');
  validateCanonicalText(premise.surfaceSupportCandidates, 'Surface support candidates', 1);
  validateCanonicalText(premise.surfaceWaterCandidates, 'Surface water candidates', 1);
  validateCanonicalText(premise.layerStackCandidates, 'Layer stack candidates', 1);
  if (premise.status === 'COMPLETE' && premise.resolvedLayerStack === undefined) throw new Error('Complete planetary premise requires a resolved layer stack.');
  if (premise.resolvedLayerStack !== undefined) validateCanonicalText(premise.resolvedLayerStack, 'Resolved layer stack', 1);
  validateCanonicalText(premise.assumptions, 'Premise assumptions');
  validateCanonicalText(premise.branchResolutionIds, 'Premise branch IDs');
  requireText(premise.confidenceAssessmentSubject, 'Premise confidence subject');
  assertRecordHash('WorldWright/planetary-premise/v1', premise);
}

export function validateInteriorState(value: unknown): asserts value is InteriorStateV1 {
  validateDomainBase(value, 'Interior state');
  const interior = value as InteriorStateV1;
  if (!Number.isSafeInteger(interior.interiorVersion) || interior.interiorVersion < 1) throw new Error('Interior version is invalid.');
  validateScientificRange(interior.thermalBudgetRange);
  assertNormalizedRange(interior.mantleConvectionRange, 'Mantle convection range');
  assertNormalizedRange(interior.meltAndVolcanismRange, 'Melt and volcanism range');
  assertNormalizedRange(interior.riftTendencyRange, 'Rift tendency range');
  assertNormalizedRange(interior.hotspotTendencyRange, 'Hotspot tendency range');
  validateHeatSourceFractions(interior);
  validateCanonicalText(interior.rheologyCandidates, 'Interior rheology candidates', 1);
  validateCanonicalText(interior.lithosphereBehaviorCandidates, 'Interior lithosphere candidates', 1);
  validateCanonicalText(interior.lidRegimeCandidates, 'Interior lid candidates', 1);
  if (interior.status === 'COMPLETE' && interior.resolvedLidRegime === undefined) throw new Error('Complete interior state requires a resolved lid regime.');
  if (interior.resolvedLidRegime !== undefined) {
    requireText(interior.resolvedLidRegime, 'Resolved lid regime');
    if (!interior.lidRegimeCandidates.includes(interior.resolvedLidRegime)) throw new Error('Resolved lid regime is not one of the recorded candidates.');
  }
  validateCanonicalText(interior.assumptions, 'Interior assumptions');
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
    if (epoch.sequenceIndex !== index || !isCanonicalFinite(epoch.startTime) || !isCanonicalFinite(epoch.endTime) || epoch.startTime !== expectedStart || epoch.endTime <= epoch.startTime || epoch.endTime > 1) throw new Error(`Epoch ${epoch.epochId} interval is invalid.`);
    expectedStart = epoch.endTime;
    requireText(epoch.regimeFamily, 'Epoch regime family');
    for (const [label, range] of [
      ['mobility', epoch.mobilityRange], ['extension', epoch.extensionRange], ['convergence', epoch.convergenceRange],
      ['transform', epoch.transformRange], ['plume', epoch.plumeRange], ['crust production', epoch.crustProductionRange],
    ] as const) assertNormalizedRange(range, `Epoch ${epoch.epochId} ${label} range`);
    requireText(epoch.confidenceSubject, 'Epoch confidence subject');
    validateCanonicalText(epoch.evidenceIds, 'Epoch evidence IDs');
  });
  if (expectedStart !== 1) throw new Error('Tectonic epochs must cover the full [0,1] history.');
  if (!Array.isArray(history.transitions) || history.transitions.length !== Math.max(0, history.epochs.length - 1)) throw new Error('Tectonic transition count is invalid.');
  const transitionIds = new Set<string>();
  history.transitions.forEach((transition, index) => {
    requireText(transition.transitionId, 'Transition ID');
    if (transitionIds.has(transition.transitionId)) throw new Error(`Duplicate transition ID: ${transition.transitionId}`);
    transitionIds.add(transition.transitionId);
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
  if (spine.status === 'COMPLETE' && spine.nodes.length === 0) throw new Error('Complete geologic spine requires at least one node.');
  assertCanonicalObjectOrder(spine.nodes, 'nodeId', 'Spine nodes');
  assertCanonicalObjectOrder(spine.edges, 'edgeId', 'Spine edges');
  assertCanonicalObjectOrder(spine.events, 'eventId', 'Spine events');
  const nodeById = new Map<string, GeologicSpineV1['nodes'][number]>();
  for (const node of spine.nodes) {
    requireText(node.nodeId, 'Spine node ID');
    if (nodeById.has(node.nodeId)) throw new Error(`Duplicate spine node ID: ${node.nodeId}`);
    if (!NODE_FAMILIES.includes(node.family)) throw new Error(`Spine node ${node.nodeId} has invalid family ${String(node.family)}.`);
    nodeById.set(node.nodeId, node);
    validateSphericalAnchor(node.anchor);
    validateSphericalExtent(node.extent);
    validateCanonicalText(node.evidenceIds, 'Spine node evidence IDs');
  }
  const edgeIds = new Set<string>();
  for (const edge of spine.edges) {
    requireText(edge.edgeId, 'Spine edge ID');
    if (edgeIds.has(edge.edgeId)) throw new Error(`Duplicate spine edge ID: ${edge.edgeId}`);
    edgeIds.add(edge.edgeId);
    if (!EDGE_KINDS.includes(edge.kind)) throw new Error(`Spine edge ${edge.edgeId} has invalid kind ${String(edge.kind)}.`);
    const from = nodeById.get(edge.fromNodeId);
    const to = nodeById.get(edge.toNodeId);
    if (!from || !to || edge.fromNodeId === edge.toNodeId) throw new Error(`Spine edge ${edge.edgeId} references invalid nodes.`);
    if (!isCompatibleEdge(edge.kind, from.family, to.family)) throw new Error(`Spine edge ${edge.edgeId} is incompatible with ${from.family} → ${to.family}.`);
    validateCanonicalText(edge.evidenceIds, 'Spine edge evidence IDs');
  }
  const eventById = new Map<string, GeologicSpineV1['events'][number]>();
  for (const event of spine.events) {
    requireText(event.eventId, 'Spine event ID');
    if (eventById.has(event.eventId)) throw new Error(`Duplicate spine event ID: ${event.eventId}`);
    eventById.set(event.eventId, event);
    requireText(event.epochId, 'Spine event epoch ID');
    for (const nodeId of validateCanonicalText(event.relatedNodeIds, 'Spine event node IDs')) if (!nodeById.has(nodeId)) throw new Error(`Spine event ${event.eventId} references missing node ${nodeId}.`);
    validateCanonicalText(event.parentEventIds, 'Spine parent event IDs');
    validateCanonicalText(event.evidenceIds, 'Spine event evidence IDs');
  }
  for (const event of spine.events) for (const parentId of event.parentEventIds) {
    if (!eventById.has(parentId)) throw new Error(`Spine event ${event.eventId} references missing parent ${parentId}.`);
    if (parentId === event.eventId) throw new Error(`Spine event ${event.eventId} cannot parent itself.`);
  }
  assertAcyclicEventAncestry(eventById);
  const featureFamilies = validateCanonicalNodeFamilies(spine.featureFamilies);
  const usedFamilies = [...new Set(spine.nodes.map((node) => node.family))].sort(compareStableText);
  if (!arraysEqual(featureFamilies, usedFamilies)) throw new Error('Spine feature families do not match the recorded node families.');
  validateCanonicalText(spine.branchResolutionIds, 'Spine branch IDs');
  assertRecordHash('WorldWright/geologic-spine/v1', spine);
}

export function validateCausalShadowRun(value: unknown): asserts value is CausalShadowRunV1 {
  if (!value || typeof value !== 'object') throw new Error('Causal shadow run must be an object.');
  const run = value as Partial<CausalShadowRunV1>;
  if (run.schemaVersion !== 1 || run.runContractVersion !== 1) throw new Error('Unsupported causal shadow run contract.');
  validateCausalGeologyInput(run.inputSnapshot);
  if (!Array.isArray(run.stageResults) || run.stageResults.length === 0 || run.stageResults.length > CAUSAL_GEOLOGY_STAGE_ORDER.length) throw new Error('Causal shadow stage results are missing or invalid.');
  for (let index = 0; index < run.stageResults.length; index += 1) {
    const result = run.stageResults[index];
    validateCausalStageResult(result);
    if (result.stageId !== CAUSAL_GEOLOGY_STAGE_ORDER[index]) throw new Error('Causal shadow stage results must form a contiguous prefix of the canonical sequence.');
    if (index > 0) {
      const previous = run.stageResults[index - 1];
      if (previous.status === 'BLOCKED' || previous.status === 'FAILED') throw new Error(`${previous.stageId} cannot have downstream stage results.`);
      if (previous.status === 'PARTIAL' && !previous.downstreamCompatibleStageIds.includes(result.stageId)) throw new Error(`${previous.stageId} does not permit ${result.stageId} to proceed.`);
    }
  }
  const last = run.stageResults[run.stageResults.length - 1];
  if ((last.status === 'BLOCKED' || last.status === 'FAILED') && run.stageResults.length < 1) throw new Error('Invalid terminated run.');
  const first = run.stageResults[0];
  if (first.status !== 'COMPLETE' && first.status !== 'PARTIAL') throw new Error('A persisted shadow run requires a valid sanitized input snapshot.');
  assertCanonicalEqual(first.record, run.inputSnapshot, 'Input sanitization output does not match the run input snapshot.');

  if (run.premise !== undefined) validatePlanetaryPremise(run.premise);
  if (run.interior !== undefined) validateInteriorState(run.interior);
  if (run.regimeHistory !== undefined) validateTectonicRegimeHistory(run.regimeHistory);
  if (run.geologicSpine !== undefined) validateGeologicSpine(run.geologicSpine);
  assertStageDomainMatch(run.stageResults, 'CAUSAL_PREMISE_RESOLUTION', run.premise, 'premise');
  assertStageDomainMatch(run.stageResults, 'CAUSAL_INTERIOR_RESOLUTION', run.interior, 'interior');
  assertStageDomainMatch(run.stageResults, 'CAUSAL_REGIME_HISTORY', run.regimeHistory, 'regime history');
  assertStageDomainMatch(run.stageResults, 'CAUSAL_GEOLOGIC_SPINE', run.geologicSpine, 'geologic spine');
  assertExpectedStageInputHashes(run);

  validateCausalConfidenceLedger(run.confidenceLedger);
  const contradictionIds = validateCanonicalText(run.contradictionIds, 'Causal shadow contradiction IDs');
  const ledgerContradictionIds = run.confidenceLedger.contradictions.map((entry) => entry.id).sort(compareStableText);
  if (!arraysEqual(contradictionIds, ledgerContradictionIds)) throw new Error('Run contradiction IDs do not match the confidence ledger.');
  validateInputReferences(run.inputSnapshot, run.confidenceLedger);
  validateStageReferences(run.stageResults, run.confidenceLedger);
  validateCausalDomainReferences({ premise: run.premise, interior: run.interior, regimeHistory: run.regimeHistory, geologicSpine: run.geologicSpine }, run.confidenceLedger);
  if (run.geologicSpine && run.regimeHistory) {
    const epochIds = new Set(run.regimeHistory.epochs.map((epoch) => epoch.epochId));
    for (const event of run.geologicSpine.events) if (!epochIds.has(event.epochId)) throw new Error(`Spine event ${event.eventId} references missing epoch ${event.epochId}.`);
  }

  validateRunProvenance(run);
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

export function validateCausalDomainReferences(
  domains: Readonly<{ premise?: PlanetaryPremiseV1; interior?: InteriorStateV1; regimeHistory?: TectonicRegimeHistoryV1; geologicSpine?: GeologicSpineV1 }>,
  ledger: CausalConfidenceLedgerV1,
): void {
  validateCausalConfidenceLedger(ledger);
  const index = createLedgerIndex(ledger);
  for (const domain of [domains.premise, domains.interior, domains.regimeHistory, domains.geologicSpine]) if (domain) {
    assertIdsExist(domain.evidenceIds, index.evidence, 'Domain evidence');
    assertIdsExist(domain.contradictionIds, index.contradictions, 'Domain contradictions');
  }
  if (domains.premise) {
    assertIdsExist(domains.premise.branchResolutionIds, index.branches, 'Premise branch resolutions');
    assertIdsExist([domains.premise.confidenceAssessmentSubject], index.assessments, 'Premise confidence assessment');
  }
  if (domains.interior) {
    assertIdsExist(domains.interior.branchResolutionIds, index.branches, 'Interior branch resolutions');
    assertIdsExist([domains.interior.confidenceAssessmentSubject], index.assessments, 'Interior confidence assessment');
    for (const range of interiorRanges(domains.interior)) assertIdsExist([range.confidenceSubject], index.assessments, 'Interior range confidence assessment');
  }
  if (domains.regimeHistory) {
    assertIdsExist(domains.regimeHistory.branchResolutionIds, index.branches, 'History branch resolutions');
    for (const epoch of domains.regimeHistory.epochs) {
      assertIdsExist(epoch.evidenceIds, index.evidence, `Epoch ${epoch.epochId} evidence`);
      assertIdsExist([epoch.confidenceSubject], index.assessments, `Epoch ${epoch.epochId} confidence assessment`);
      for (const range of epochRanges(epoch)) assertIdsExist([range.confidenceSubject], index.assessments, `Epoch ${epoch.epochId} range confidence assessment`);
    }
    for (const transition of domains.regimeHistory.transitions) {
      assertIdsExist(transition.triggerEvidenceIds, index.evidence, `Transition ${transition.transitionId} evidence`);
      assertIdsExist([transition.confidenceSubject], index.assessments, `Transition ${transition.transitionId} confidence assessment`);
    }
  }
  if (domains.geologicSpine) {
    assertIdsExist(domains.geologicSpine.branchResolutionIds, index.branches, 'Spine branch resolutions');
    for (const node of domains.geologicSpine.nodes) assertIdsExist(node.evidenceIds, index.evidence, `Spine node ${node.nodeId} evidence`);
    for (const edge of domains.geologicSpine.edges) assertIdsExist(edge.evidenceIds, index.evidence, `Spine edge ${edge.edgeId} evidence`);
    for (const event of domains.geologicSpine.events) assertIdsExist(event.evidenceIds, index.evidence, `Spine event ${event.eventId} evidence`);
  }
}

function validateDomainBase(value: unknown, label: string): asserts value is CausalDomainRecordBaseV1 {
  if (!value || typeof value !== 'object') throw new Error(`${label} must be an object.`);
  const record = value as Partial<CausalDomainRecordBaseV1>;
  if (record.schemaVersion !== 1 || !['COMPLETE', 'PARTIAL'].includes(record.status as string)) throw new Error(`${label} status is invalid.`);
  validateCanonicalText(record.evidenceIds, `${label} evidence IDs`);
  validateCanonicalText(record.contradictionIds, `${label} contradiction IDs`);
  const limitations = validateCanonicalText(record.limitations, `${label} limitations`);
  if (record.status === 'PARTIAL' && limitations.length === 0) throw new Error(`${label} PARTIAL status requires limitations.`);
  if (record.status === 'COMPLETE' && limitations.length !== 0) throw new Error(`${label} COMPLETE status cannot retain limitations.`);
  assertDeterministicHash(record.contentHash, label);
}

function validateStageRecord(stageId: CausalGeologyStageId, record: unknown): void {
  if (stageId === 'CAUSAL_INPUT_SANITIZATION') validateCausalGeologyInput(record);
  else if (stageId === 'CAUSAL_PREMISE_RESOLUTION') validatePlanetaryPremise(record);
  else if (stageId === 'CAUSAL_INTERIOR_RESOLUTION') validateInteriorState(record);
  else if (stageId === 'CAUSAL_REGIME_HISTORY') validateTectonicRegimeHistory(record);
  else if (stageId === 'CAUSAL_GEOLOGIC_SPINE') validateGeologicSpine(record);
  else canonicalizeJson(record);
}

function assertStageDomainMatch(stageResults: readonly CausalStageResultV1[], stageId: CausalGeologyStageId, domain: unknown, label: string): void {
  const result = stageResults.find((entry) => entry.stageId === stageId);
  if (!result) {
    if (domain !== undefined) throw new Error(`Run contains ${label} without its stage result.`);
    return;
  }
  if (result.status === 'COMPLETE' || result.status === 'PARTIAL') {
    if (domain === undefined) throw new Error(`${stageId} produced a record but top-level ${label} is missing.`);
    assertCanonicalEqual(result.record, domain, `${stageId} record does not match top-level ${label}.`);
  } else if (domain !== undefined) throw new Error(`${stageId} did not produce an authoritative ${label} record.`);
}

function assertExpectedStageInputHashes(run: Partial<CausalShadowRunV1>): void {
  const byId = new Map((run.stageResults ?? []).map((result) => [result.stageId, result]));
  const expectedInputs: readonly [CausalGeologyStageId, unknown][] = [
    ['CAUSAL_PREMISE_RESOLUTION', run.inputSnapshot],
    ['CAUSAL_INTERIOR_RESOLUTION', { inputSnapshot: run.inputSnapshot, premise: run.premise }],
    ['CAUSAL_REGIME_HISTORY', { premise: run.premise, interior: run.interior }],
    ['CAUSAL_GEOLOGIC_SPINE', { premise: run.premise, interior: run.interior, regimeHistory: run.regimeHistory }],
  ];
  for (const [stageId, input] of expectedInputs) {
    const result = byId.get(stageId);
    if (!result) continue;
    const expected = hashCausalPayload(`WorldWright/${stageId}/input/v${result.stageVersion}`, input);
    if (!deterministicHashEquals(result.inputHash, expected)) throw new Error(`${stageId} input hash does not match its declared prerequisites.`);
  }
}

function validateRunProvenance(run: Partial<CausalShadowRunV1>): void {
  if (!isCausalProvenanceManifestV1(run.provenance)) throw new Error('Causal shadow provenance is invalid.');
  if (run.provenance.authorityMode !== 'CAUSAL_SHADOW') throw new Error('Causal shadow run provenance must use CAUSAL_SHADOW authority.');
  assertCanonicalEqual(run.provenance.rootSeed, run.inputSnapshot?.rootSeed, 'Run provenance root seed does not match sanitized input.');
  const geology = run.provenance.causalGeology;
  if (!geology || !run.inputSnapshot || !deterministicHashEquals(geology.inputHash, run.inputSnapshot.contentHash)) throw new Error('Run provenance causal-geology input hash is missing or inconsistent.');
  const stageProvenance = new Map<string, typeof run.provenance.stages[number]>();
  for (const entry of run.provenance.stages) {
    if (!isStageId(entry.stageId)) continue;
    if (stageProvenance.has(entry.stageId)) throw new Error(`Duplicate causal stage provenance: ${entry.stageId}`);
    stageProvenance.set(entry.stageId, entry);
  }
  for (const result of run.stageResults ?? []) {
    const provenance = stageProvenance.get(result.stageId);
    if (!provenance) throw new Error(`Missing provenance for ${result.stageId}.`);
    const expectedStatus = result.status === 'COMPLETE' ? 'RECORDED' : result.status;
    if (provenance.stageVersion !== result.stageVersion || provenance.status !== expectedStatus) throw new Error(`Provenance status/version mismatch for ${result.stageId}.`);
    if (!provenance.inputHash || !deterministicHashEquals(provenance.inputHash, result.inputHash)) throw new Error(`Provenance input hash mismatch for ${result.stageId}.`);
    if (result.outputHash === undefined ? provenance.outputHash !== undefined : !provenance.outputHash || !deterministicHashEquals(provenance.outputHash, result.outputHash)) throw new Error(`Provenance output hash mismatch for ${result.stageId}.`);
  }
  for (const branch of run.confidenceLedger?.branchResolutions ?? []) {
    const definition = getRandomStreamDefinition(branch.stream);
    if (!run.provenance.streams.some((entry) => entry.name === branch.stream && entry.version === definition.version)) throw new Error(`Missing stream provenance for branch ${branch.branchId}.`);
  }
}

function validateInputReferences(input: CausalGeologyInputV1, ledger: CausalConfidenceLedgerV1): void {
  const index = createLedgerIndex(ledger);
  assertIdsExist(input.contradictionIds, index.contradictions, 'Input contradictions');
  for (const declaration of input.sourceDeclarations) {
    assertIdsExist(declaration.evidenceIds, index.evidence, `Input ${declaration.inputId} evidence`);
    assertIdsExist([declaration.confidenceSubject], index.assessments, `Input ${declaration.inputId} confidence assessment`);
  }
}

function validateStageReferences(results: readonly CausalStageResultV1[], ledger: CausalConfidenceLedgerV1): void {
  const index = createLedgerIndex(ledger);
  for (const result of results) {
    assertIdsExist(result.evidenceIds, index.evidence, `${result.stageId} evidence`);
    assertIdsExist(result.contradictionIds, index.contradictions, `${result.stageId} contradictions`);
  }
}

function createLedgerIndex(ledger: CausalConfidenceLedgerV1): Readonly<{ evidence: Set<string>; contradictions: Set<string>; branches: Set<string>; assessments: Set<string> }> {
  return {
    evidence: new Set(ledger.evidence.map((entry) => entry.id)),
    contradictions: new Set(ledger.contradictions.map((entry) => entry.id)),
    branches: new Set(ledger.branchResolutions.map((entry) => entry.branchId)),
    assessments: new Set(ledger.assessments.map((entry) => entry.subject)),
  };
}

function assertIdsExist(ids: readonly string[], available: ReadonlySet<string>, label: string): void {
  for (const id of ids) if (!available.has(id)) throw new Error(`${label} references missing ID ${id}.`);
}

function validateHeatSourceFractions(interior: InteriorStateV1): void {
  if (!Array.isArray(interior.heatSourceFractions)) throw new Error('Interior heat-source fractions are invalid.');
  const ids = interior.heatSourceFractions.map((entry) => entry.sourceId);
  if (!arraysEqual(ids, [...ids].sort(compareStableText)) || new Set(ids).size !== ids.length) throw new Error('Interior heat-source fractions are not canonically ordered or unique.');
  const allowed = ['PRIMORDIAL', 'RADIOGENIC', 'TIDAL'];
  for (const entry of interior.heatSourceFractions) {
    if (!allowed.includes(entry.sourceId)) throw new Error(`Invalid interior heat source: ${String(entry.sourceId)}`);
    assertNormalizedRange(entry.fractionRange, `Interior ${entry.sourceId} heat fraction`);
  }
  if (interior.status === 'COMPLETE' && !arraysEqual(ids, allowed.slice().sort(compareStableText))) throw new Error('Complete interior state requires all declared heat-source fractions.');
}

function interiorRanges(interior: InteriorStateV1): readonly ScientificRangeV1[] {
  return [interior.thermalBudgetRange, ...interior.heatSourceFractions.map((entry) => entry.fractionRange), interior.mantleConvectionRange, interior.meltAndVolcanismRange, interior.riftTendencyRange, interior.hotspotTendencyRange];
}

function epochRanges(epoch: TectonicRegimeHistoryV1['epochs'][number]): readonly ScientificRangeV1[] {
  return [epoch.mobilityRange, epoch.extensionRange, epoch.convergenceRange, epoch.transformRange, epoch.plumeRange, epoch.crustProductionRange];
}

function assertNormalizedRange(range: ScientificRangeV1, label: string): void {
  validateScientificRange(range);
  if (range.unit !== 'normalized-0-1' || range.scaleId !== 'normalized-0-1-v1') throw new Error(`${label} must use normalized-0-1-v1.`);
}

function assertAcyclicEventAncestry(events: ReadonlyMap<string, GeologicSpineV1['events'][number]>): void {
  const state = new Map<string, 0 | 1 | 2>();
  const visit = (id: string): void => {
    const current = state.get(id) ?? 0;
    if (current === 1) throw new Error(`Geologic-spine event ancestry contains a cycle at ${id}.`);
    if (current === 2) return;
    state.set(id, 1);
    for (const parent of events.get(id)?.parentEventIds ?? []) visit(parent);
    state.set(id, 2);
  };
  for (const id of events.keys()) visit(id);
}

function isCompatibleEdge(kind: GeologicSpineEdgeKind, from: GeologicSpineNodeFamily, to: GeologicSpineNodeFamily): boolean {
  if (kind === 'SUBDUCTS_BENEATH') return ['OCEAN_BASIN', 'CONVERGENCE_SYSTEM'].includes(from) && ['CONTINENTAL_KERNEL', 'OCEAN_BASIN', 'CONVERGENCE_SYSTEM'].includes(to);
  if (kind === 'ACCRETES_TO') return ['ACCRETION_SYSTEM', 'CONTINENTAL_KERNEL'].includes(from) && ['ACCRETION_SYSTEM', 'CONTINENTAL_KERNEL'].includes(to);
  return true;
}

function validateCanonicalNodeFamilies(value: unknown): readonly GeologicSpineNodeFamily[] {
  const values = validateCanonicalText(value, 'Spine feature families') as readonly GeologicSpineNodeFamily[];
  for (const family of values) if (!NODE_FAMILIES.includes(family)) throw new Error(`Invalid spine feature family: ${String(family)}`);
  return values;
}

function assertCanonicalObjectOrder<T extends object>(values: readonly T[], idKey: keyof T, label: string): void {
  const ids = values.map((value) => String(value[idKey]));
  if (!arraysEqual(ids, [...ids].sort(compareStableText))) throw new Error(`${label} are not canonically ordered.`);
}

function assertRecordHash(contract: string, record: object): void {
  const candidate = record as Readonly<Record<string, unknown>>;
  const expected = hashRecordWithoutContentHash(contract, candidate);
  if (!deterministicHashEquals(candidate.contentHash as never, expected)) throw new Error(`${contract} content hash mismatch.`);
}

function validateCanonicalText(value: unknown, label: string, minimumLength = 0): readonly string[] {
  if (!Array.isArray(value) || !value.every((entry) => typeof entry === 'string' && entry.trim().length > 0) || value.length < minimumLength) throw new Error(`${label} are invalid.`);
  if (new Set(value).size !== value.length) throw new Error(`${label} contain duplicates.`);
  const sorted = [...value].sort(compareStableText);
  if (!value.every((entry, index) => entry === sorted[index])) throw new Error(`${label} are not canonically ordered.`);
  return value;
}

function validateCanonicalStageIds(value: unknown, currentStageId: CausalGeologyStageId): readonly CausalGeologyStageId[] {
  if (!Array.isArray(value) || !value.every(isStageId) || new Set(value).size !== value.length) throw new Error('Downstream-compatible stage IDs are invalid.');
  const currentIndex = CAUSAL_GEOLOGY_STAGE_ORDER.indexOf(currentStageId);
  const values = value as readonly CausalGeologyStageId[];
  if (values.some((entry) => CAUSAL_GEOLOGY_STAGE_ORDER.indexOf(entry) <= currentIndex)) throw new Error('Downstream-compatible stage IDs must follow the current stage.');
  const sorted = [...values].sort((a, b) => CAUSAL_GEOLOGY_STAGE_ORDER.indexOf(a) - CAUSAL_GEOLOGY_STAGE_ORDER.indexOf(b));
  if (!arraysEqual(values, sorted)) throw new Error('Downstream-compatible stage IDs are not canonically ordered.');
  return values;
}

function requireText(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`${label} is invalid.`);
}

function isStageId(value: unknown): value is CausalGeologyStageId {
  return typeof value === 'string' && CAUSAL_GEOLOGY_STAGE_ORDER.includes(value as CausalGeologyStageId);
}

function isCanonicalFinite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0);
}

function assertCanonicalEqual(a: unknown, b: unknown, message: string): void {
  if (canonicalJsonStringify(a) !== canonicalJsonStringify(b)) throw new Error(message);
}

function arraysEqual<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.length === b.length && a.every((entry, index) => entry === b[index]);
}

function compareStableText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

import { GENERATE_FIELD_OWNERSHIP } from './generateFieldOwnership';
import { GENERATE_LAYER_GATES, getGenerateLayerGate } from './generateLayerGates';
import { PLANET_PROFILE_CONTRACTS } from './generatePlanetProfileContract';
import { CURRENT_GENERATE_STAGE_CONTRACTS } from './generateCurrentStageRegistry';

export type GenerateFoundationValidationSeverity = 'problem' | 'watch';

export type GenerateFoundationValidationIssue = {
  readonly severity: GenerateFoundationValidationSeverity;
  readonly code: string;
  readonly subject: string;
  readonly message: string;
};

export type GenerateFoundationValidationReport = {
  readonly problems: readonly GenerateFoundationValidationIssue[];
  readonly watches: readonly GenerateFoundationValidationIssue[];
  readonly ok: boolean;
};

const KNOWN_PLANNED_EXTERNAL_LAYER_IDS = new Set([
  'ATMOSPHERE_RETENTION',
  'BIOME_ECOLOGY',
  'CLIMATE_FORCING',
  'CLOUD_GAS_SURFACE',
  'DIAGNOSTICS',
  'EARTHLIKE_PLATE_EXPECTATIONS',
  'FINAL_RENDER',
  'GEOLOGIC_FEATURE_AUTHORITY',
  'HYDROLOGY_SOIL',
  'ICE_SHELL_FEATURES',
  'ICE_SHELL_TERRAIN_ONLY',
  'LANDMASS_TERRAIN',
  'MATERIAL_FIELDS',
  'MATERIAL_FIELDS_OR_EQUIVALENT',
  'NORMAL_RIVER_HYDROLOGY',
  'SURFACE_PROCESS',
]);

const HARD_FORBIDDEN_OUTPUT_FIELDS = new Set(['plateId', 'crustProvince', 'continentId', 'oceanBasinId']);

export function validateGenerateFoundationRegistry(): GenerateFoundationValidationReport {
  const issues: GenerateFoundationValidationIssue[] = [];
  const layerIds = new Set<string>();

  for (const gate of GENERATE_LAYER_GATES) {
    if (layerIds.has(gate.id)) {
      issues.push(problem('duplicate-layer-id', gate.id, `Duplicate Generate layer gate id: ${gate.id}`));
    }
    layerIds.add(gate.id);
  }

  for (const gate of GENERATE_LAYER_GATES) {
    validateLayerReferences(gate.id, 'requires', gate.requires, layerIds, issues);
    validateLayerReferences(gate.id, 'runsAfter', gate.runsAfter, layerIds, issues);
    validateLayerReferences(gate.id, 'runsBefore', gate.runsBefore, layerIds, issues);

    const writesTerrain = gate.allowedWrites.includes('baseHeight') || gate.phase === 'terrain-response';
    if (writesTerrain && gate.forbiddenReadsWhileWritingTerrain.length === 0) {
      issues.push(problem('terrain-writer-without-forbidden-reads', gate.id, `${gate.id} writes terrain but does not declare forbidden terrain reads.`));
    }

    const writesFinalColor = gate.allowedWrites.includes('finalColor');
    if (writesFinalColor) {
      for (const fieldId of HARD_FORBIDDEN_OUTPUT_FIELDS) {
        if (!gate.forbiddenReadsWhileWritingColor.includes(fieldId)) {
          issues.push(problem('color-writer-missing-hidden-identity-ban', gate.id, `${gate.id} writes color but does not forbid ${fieldId}.`));
        }
      }
    }

    if (gate.terminal && gate.runsBefore.length > 0) {
      issues.push(problem('terminal-layer-runs-before-other-layers', gate.id, `${gate.id} is terminal but declares runsBefore entries.`));
    }
  }

  for (const stage of CURRENT_GENERATE_STAGE_CONTRACTS) {
    if (stage.registryLayerIds.length === 0) {
      issues.push(problem('current-stage-without-registry-layer', stage.id, `${stage.id} has no registry layer mapping.`));
    }
    for (const layerId of stage.registryLayerIds) {
      if (!getGenerateLayerGate(layerId)) {
        issues.push(problem('current-stage-missing-registry-layer', stage.id, `${stage.id} maps to missing Generate layer gate: ${layerId}`));
      }
    }
  }

  for (let i = 0; i < CURRENT_GENERATE_STAGE_CONTRACTS.length; i++) {
    const stage = CURRENT_GENERATE_STAGE_CONTRACTS[i];
    if (!stage.terminalCauseSync) continue;
    const laterTerrainWriter = CURRENT_GENERATE_STAGE_CONTRACTS.slice(i + 1).find((later) => later.mayShapeTerrain);
    if (laterTerrainWriter) {
      issues.push(problem('terminal-cause-sync-before-terrain-writer', stage.id, `${stage.id} is a terminal cause sync but is followed by terrain writer ${laterTerrainWriter.id}.`));
    }
  }

  for (const profile of PLANET_PROFILE_CONTRACTS) {
    for (const layerId of profile.requiredLayers) {
      if (!layerIds.has(layerId) && !KNOWN_PLANNED_EXTERNAL_LAYER_IDS.has(layerId)) {
        issues.push(watch('profile-requires-unregistered-layer', profile.id, `${profile.id} requires unregistered layer ${layerId}.`));
      }
    }
    for (const layerId of profile.forbiddenLayers) {
      if (!layerIds.has(layerId) && !KNOWN_PLANNED_EXTERNAL_LAYER_IDS.has(layerId)) {
        issues.push(watch('profile-forbids-unregistered-layer', profile.id, `${profile.id} forbids unregistered layer ${layerId}; this is acceptable if it is a planned external stack marker.`));
      }
    }
  }

  for (const field of GENERATE_FIELD_OWNERSHIP) {
    if (HARD_FORBIDDEN_OUTPUT_FIELDS.has(field.id)) {
      if (field.mayBeReadByTerrainWriters) {
        issues.push(problem('hard-field-readable-by-terrain', field.id, `${field.id} is a hard forbidden identity/debug field but is readable by terrain writers.`));
      }
      if (field.mayBeReadByColorWriters) {
        issues.push(problem('hard-field-readable-by-color', field.id, `${field.id} is a hard forbidden identity/debug field but is readable by color writers.`));
      }
    }
  }

  const problems = issues.filter((issue) => issue.severity === 'problem');
  const watches = issues.filter((issue) => issue.severity === 'watch');
  return { problems, watches, ok: problems.length === 0 };
}

function validateLayerReferences(
  layerId: string,
  relation: string,
  references: readonly string[],
  knownLayerIds: Set<string>,
  issues: GenerateFoundationValidationIssue[],
): void {
  for (const ref of references) {
    if (knownLayerIds.has(ref)) continue;
    if (KNOWN_PLANNED_EXTERNAL_LAYER_IDS.has(ref)) {
      issues.push(watch('planned-layer-reference-not-yet-registered', layerId, `${layerId}.${relation} references planned layer ${ref}.`));
      continue;
    }
    issues.push(problem('missing-layer-reference', layerId, `${layerId}.${relation} references missing layer ${ref}.`));
  }
}

function problem(code: string, subject: string, message: string): GenerateFoundationValidationIssue {
  return { severity: 'problem', code, subject, message };
}

function watch(code: string, subject: string, message: string): GenerateFoundationValidationIssue {
  return { severity: 'watch', code, subject, message };
}

import { CAUSAL_INPUT_AUTHORITY_REGISTRY } from './inputAuthority';
import { INITIAL_CONDITION_DIRECT_INPUT_IDS } from './initialConditionRequest';
import {
  PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1,
  validatePremiseFixtureSet,
  type PremiseFixtureSetV1,
} from './premiseResearchContracts';

export const PREMISE_FIXTURE_SCENARIO_TAGS = Object.freeze([
  'ATTEMPTED_SOLVED_TECTONIC_CONCLUSION',
  'DECLARED_ARTIFICIAL_LAYER_STACK',
  'DECLARED_ARTIFICIAL_SOLID_SHELL',
  'DECLARED_ARTIFICIAL_SOLID_SURFACE',
  'DECLARED_BROWN_DWARF',
  'DECLARED_COLD_SOLID_SURFACE',
  'DECLARED_DIFFERENTIATED_ROCKY',
  'DECLARED_FLUID_ONLY_NO_COHERENT_SHELL',
  'DECLARED_GAS_GIANT_NO_COHERENT_SHELL',
  'DECLARED_NO_H_HE_ENVELOPE',
  'DECLARED_NO_SUBSTANTIAL_GAS_ENVELOPE',
  'DECLARED_STAR_OR_STELLAR_REMNANT',
  'REQUIRE_ICE_SHELL_LAYER_STACK',
  'REQUIRE_ROCKY_TERRESTRIAL_BODY',
] as const);

const DIRECT_INPUT_SET = new Set<string>(INITIAL_CONDITION_DIRECT_INPUT_IDS);
const AUTHORITY_BY_INPUT = new Map(CAUSAL_INPUT_AUTHORITY_REGISTRY.map((entry) => [entry.inputId, entry]));
const SCENARIO_TAG_SET = new Set<string>(PREMISE_FIXTURE_SCENARIO_TAGS);

export function validatePremiseResearchFixtureSet(value: unknown, knownRuleIds: ReadonlySet<string>): asserts value is PremiseFixtureSetV1 {
  validatePremiseFixtureSet(value, knownRuleIds);
  for (const fixture of value.fixtures) {
    if (fixture.expected.requiredRuleIds.length > PREMISE_RESEARCH_PERFORMANCE_BUDGET_V1.maxRuleEvaluationsPerFixture) throw new Error(`Premise fixture ${fixture.fixtureId} exceeds the rule-evaluation budget.`);
    for (const tag of fixture.input.scenarioTags) if (!SCENARIO_TAG_SET.has(tag)) throw new Error(`Premise fixture ${fixture.fixtureId} uses unsupported scenario tag ${tag}.`);
    for (const quantity of fixture.input.quantities) {
      if (!DIRECT_INPUT_SET.has(quantity.inputId)) throw new Error(`Premise fixture ${fixture.fixtureId} references non-W1-02A input ${quantity.inputId}.`);
      const authority = AUTHORITY_BY_INPUT.get(quantity.inputId);
      if (!authority || quantity.unit !== authority.requiredUnit || quantity.scaleId !== authority.requiredScaleId) throw new Error(`Premise fixture ${fixture.fixtureId} uses the wrong quantity contract for ${quantity.inputId}.`);
    }
  }
}

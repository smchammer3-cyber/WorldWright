import {
  resolvePlanetaryPremise as resolvePlanetaryPremiseInternal,
  type PlanetaryPremiseResolutionV1,
  type PremiseResolutionInputV1,
  type PremiseResolverResearchContextV1,
} from './premiseResolver';

/**
 * Applies the reviewed declaration-strength policy before model selection.
 *
 * `DECLARED_NO_SUBSTANTIAL_GAS_ENVELOPE` removes unsupported gaseous routes but
 * does not distinguish rocky, rock-ice, dwarf, or super-Earth solid families.
 * It therefore must not exclude a reviewed solid-body archetype merely because
 * that broad constraint is absent from the archetype's descriptive tags.
 *
 * Class-defining declarations such as a cold solid surface, differentiated
 * rocky structure, or no H/He envelope remain available to the resolver.
 */
export function resolvePlanetaryPremise(
  input: PremiseResolutionInputV1,
  context: PremiseResolverResearchContextV1,
): PlanetaryPremiseResolutionV1 {
  const declarationTags = input.declarationTags.filter(
    (tag) => tag !== 'DECLARED_NO_SUBSTANTIAL_GAS_ENVELOPE',
  );
  if (declarationTags.length === input.declarationTags.length) {
    return resolvePlanetaryPremiseInternal(input, context);
  }
  return resolvePlanetaryPremiseInternal({ ...input, declarationTags }, context);
}

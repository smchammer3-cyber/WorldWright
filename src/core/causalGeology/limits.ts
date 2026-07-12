export const CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1 = Object.freeze({
  maxInputDeclarations: 64,
  maxResearchSources: 2048,
  maxResearchClaimRules: 4096,
  maxEpochs: 64,
  maxSpineNodes: 4096,
  maxSpineEdges: 16384,
  maxSpineEvents: 16384,
  maxSerializedPayloadBytes: 16 * 1024 * 1024,
});

export type CausalGeologyResourceLimitsV1 = typeof CAUSAL_GEOLOGY_RESOURCE_LIMITS_V1;

# W1-02A Implementation Status

## Scope

W1-02A implements the detached constraint-aware initial-condition layer authorized by merged PR #135.

```text
base: WorldWright-new at 7febf56742d1ba59b899477cfede575fef440dee
branch: agent/w1-02a-initial-condition-bundle
physical generator authority: LEGACY
CAUSAL_ACTIVE: forbidden and unimplemented
causal.premise: RESERVED and inactive
W1-02B: not started
PR #118: untouched
```

## Implemented

- versioned `GenerationRequestV1` and `PlanetInitialConditionBundleV1` contracts;
- strict canonical validation and deterministic hashing;
- hard constraints, soft preferences, explicit exception permissions, user locks, and scoped rerolls;
- active shadow-only `causal.initial-conditions` random stream;
- a committed internal correlated prior/constraint bundle with explicit limitations and holdout identities;
- deterministic COMPLETE, PARTIAL, and BLOCKED bundle resolution;
- stable conflict reporting for unsatisfiable requests;
- exact migration classification for the current `GenerateFoundationInput` surface;
- protection against legacy solved geology and morphology influencing bundle identity;
- direct bridge from a valid non-blocked bundle into `CausalGeologyInputV1` using the bundle content hash;
- frozen candidate, retry, backtrack, trace, artifact-size, runtime, and heap budgets;
- hostile, replay, migration, reroll, holdout, authority, tamper, and resource tests.

## Deliberately not implemented

- planetary premise resolution;
- activation of `causal.premise`;
- approved physical derivations such as mass, gravity, escape velocity, stellar flux, or total heat;
- artificial/fictional initial-condition priors;
- interior, rheology, tectonic history, impacts, spine, terrain, climate, hydrology, biome, material, or rendering authority;
- ordinary Generate-pipeline integration;
- physical-world writes or active-authority promotion.

Artificial or fictional profile requests remain BLOCKED even with permission because the corresponding reviewed prior is not implemented. Existing age, tidal-intent, radioactivity, core-heat, plate-activity, stagnant-lid, sea-level, erosion, moisture, and temperature controls remain reserved, comparison-only, or downstream-only as required by the readiness contract.

## Honest physical verdict

W1-02A is detached shadow infrastructure. It is not expected to change the rendered planet. The known legacy geological failure at `RAW_GENERATOR` must remain visible, and passing W1-02A software checks is not a geological-quality verdict.

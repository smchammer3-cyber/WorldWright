# C04 Confidence, Weighted Branches, and Contradictions — Implementation Status

## Boundaries

- direct base is merged C03 on `WorldWright-new`;
- generator authority remains `LEGACY`;
- causal random streams remain unusable under `LEGACY` authority;
- C04 records and resolves scientific uncertainty but is not wired into physical generation;
- no terrain, sea-level, climate, hydrology, biome, material, renderer, or visual formula changes;
- no C05 behavior is enabled;
- PR #118 remains untouched;
- implementation remains a separate draft until explicit merge approval.

## Implemented contracts

- typed evidence records with source, polarity, weight, and reliability;
- confidence assessments that separate estimated probability from evidential confidence;
- explicit `UNKNOWN` state when no evidence exists;
- open contradictions reduce confidence rather than being hidden;
- immutable confidence ledger schema attached as an optional typed C01 scaffold field;
- deterministic weighted branch resolver using C02 named streams and stable option ordering;
- branch identity and purpose included in the random address;
- duplicate, invalid, or weightless alternatives fail closed;
- generic scientific claims and deterministic contradiction detection;
- stable contradiction IDs derived from canonical claim content;
- immutable resolve and dismiss operations;
- retracted claims excluded from active contradiction detection.

## Verification target

- deterministic weighted resolution replays exactly;
- caller option ordering cannot change results;
- causal streams remain blocked in `LEGACY` mode;
- contradictory claims are stable under input reordering;
- no-evidence confidence remains unknown;
- invalid evidence, branches, claims, and resolutions fail closed;
- build, full tests, snapshot canary, and full-globe review pass;
- generated globe output remains identical to merged C03;
- geological authority failure remains visible at `RAW_GENERATOR`.

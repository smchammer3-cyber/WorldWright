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
- per-source contribution caps prevent duplicated records from manufacturing certainty;
- `CERTAIN` is reserved for exact confidence 1 rather than a loose threshold;
- explicit `UNKNOWN` state when no evidence exists;
- open contradictions reduce confidence rather than being hidden;
- immutable confidence ledger schema attached as an optional typed C01 scaffold field;
- strict nested ledger validation with unique IDs, canonical ordering, stable references, and recomputed assessment checks;
- malformed optional confidence ledgers make the causal scaffold invalid;
- deterministic weighted branch resolver using C02 named streams and stable code-unit option ordering;
- branch identity and purpose included in the random address;
- duplicate, invalid, non-canonical, or weightless alternatives fail closed;
- chosen branch values and contradiction values are cloned and deeply frozen;
- generic scientific claims and deterministic contradiction detection;
- stable contradiction IDs derived from canonical claim content and verified on load;
- duplicate scientific claim IDs fail closed;
- immutable resolve and dismiss operations with distinct resolution and dismissal records;
- retracted claims excluded from active contradiction detection.

## Audit corrections

The post-implementation audit found and corrected three blockers:

1. ledger validation previously accepted incomplete nested branch and contradiction records;
2. dismissal previously fabricated a selected claim even though no claim had been selected;
3. branch and contradiction payloads were compile-time typed but not fully runtime-validated or deeply immutable.

The audit also removed locale-sensitive ordering from deterministic branch and contradiction identity paths.

## Verification target

- deterministic weighted resolution replays exactly;
- caller option ordering cannot change results;
- serialized branch resolutions validate after round trip;
- causal streams remain blocked in `LEGACY` mode;
- contradictory claims are stable under input reordering;
- no-evidence confidence remains unknown;
- repeated evidence from one source cannot manufacture certainty;
- invalid evidence, branches, claims, ledgers, dispositions, and scaffold records fail closed;
- build, full tests, snapshot canary, and full-globe review pass;
- generated globe output remains identical to merged C03;
- geological authority failure remains visible at `RAW_GENERATOR`.

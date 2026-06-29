# WorldWright Blueprint: Settlement Suitability Field Name Corrections

Status: correction note / authoritative errata  
Owner: Iron Man  
Purpose: record typo-level field name corrections discovered after creating `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_DEEP_HABITABILITY_MODEL.md`.

---

## 1. Corrected Field Names

The following field names in the deep habitability model are typographical mistakes and must be interpreted as the corrected names below.

```text
diceSnowWaterSupport -> iceSnowWaterSupport

diceSnowFoundationPenalty -> iceSnowFoundationPenalty
```

---

## 2. Authority

```text
The corrected `iceSnow...` names are authoritative.
The `diceSnow...` spellings are invalid and must not be implemented.
```

---

## 3. Implementation Rule

When implementing Settlement Suitability, diagnostics, schema types, artifacts, tests, and Unreal/micro-tile handoffs must use:

```text
iceSnowWaterSupport
iceSnowFoundationPenalty
```

and must reject or migrate:

```text
diceSnowWaterSupport
diceSnowFoundationPenalty
```

---

## 4. Follow-Up Cleanup

On the next full edit of `WORLDWRIGHT_BLUEPRINT_GENERATE_MODE_SETTLEMENT_SUITABILITY_DEEP_HABITABILITY_MODEL.md`, replace the invalid spellings in-place.

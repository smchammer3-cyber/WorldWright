# Stage 1 licensing and reuse register

## Purpose

This register controls whether research sources may later be reused as Stage 2 reference assets, transformed into annotations, or cited only as scientific evidence.

A source's scientific usefulness and its reuse permission are separate questions.

## Status labels

- `UNREVIEWED` — rights and reuse terms not yet checked
- `CITATION ONLY` — may support research, but asset reuse has not been authorized
- `REUSE WITH ATTRIBUTION` — reusable under recorded attribution terms
- `PUBLIC DOMAIN CONFIRMED` — public-domain status confirmed from an authoritative rights statement
- `DATA LICENSE CONFIRMED` — dataset license confirmed and recorded
- `RESTRICTED` — cannot be copied into the reference library
- `CUSTOM PERMISSION REQUIRED` — permission must be obtained before asset use

## Rules

1. Stage 1 may cite a scientific source without assuming its figures can be copied.
2. Stage 2 may not ingest an image, map, figure, or dataset until this register records its reuse basis.
3. A general statement such as “government work” is not enough; the specific asset and source terms must be checked.
4. A paper's open-access status does not automatically grant unrestricted figure reuse.
5. Derived visualizations must preserve dataset attribution and license conditions.
6. When rights are unclear, the source remains `CITATION ONLY`.
7. WorldWright-generated failures may be stored as project-owned negative evidence with seed and commit provenance.

## Initial register

| Source ID | Source/asset class | Current status | Allowed Stage 1 use | Stage 2 asset use | Required follow-up |
|---|---|---|---|---|---|
| SRC-F-001 | USGS educational web page | CITATION ONLY | scientific orientation and citation | blocked | verify page-specific USGS rights and image credits |
| SRC-F-002 | USGS Himalaya page and credited photograph/diagrams | CITATION ONLY | collision research | blocked | evaluate each image separately; third-party photo credits may differ |
| SRC-F-003 | NASA InSight mission page | CITATION ONLY | interior-state research | blocked | verify NASA media usage and individual asset credits |
| SRC-F-004 | NASA GRAIL mission page/data descriptions | CITATION ONLY | gravity/crust research | blocked | identify reusable mission datasets and their archival terms |
| SRC-F-005 | NASA Venus facts page | CITATION ONLY | observational synthesis | blocked | verify each linked image/data product separately |
| SRC-F-006–021 | journal articles, preprints, and methods papers | CITATION ONLY | scientific research and source tracing | figures blocked | record publisher or repository license per item |
| SRC-C-001–016 | books, journal articles, preprints, mission data, and methods papers | CITATION ONLY | crustal-support research and source tracing | figures/data blocked | review each exact figure or dataset separately |
| SRC-T-001–021 | ridge, rift, subduction, transform, and plate-kinematic sources | CITATION ONLY | boundary-system research and source tracing | figures/data blocked | review each exact figure, map, and dataset separately |
| SRC-O-001–029 | collision, orogeny, plateau, collapse, delamination, and ancient-belt sources | CITATION ONLY | orogeny research and source tracing | figures/data blocked | review each exact map, photograph, figure, and dataset separately |
| WorldWright diagnostic outputs | project-generated files | REUSE WITH ATTRIBUTION | failure analysis | permitted after provenance capture | record seed, commit, stage, and review status |

## Required fields for every future asset decision

- source ID;
- exact asset title or dataset identifier;
- creator or institution;
- canonical source location;
- rights holder;
- license or public-domain statement;
- attribution text;
- permitted transformations;
- redistribution conditions;
- access date;
- reviewer;
- decision notes.

## Current conclusion

No external image, map, figure, or dataset is approved for insertion into the Stage 2 library. All collision and orogeny sources are citation-only until asset-specific rights review is complete.

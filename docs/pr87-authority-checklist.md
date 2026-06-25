# PR #87 Authority Checklist

- [ ] `plateId` does not directly write terrain or final color.
- [ ] `crustProvince` remains a derived label and does not directly write terrain or final color.
- [ ] Weak ocean plate/province seams are smoothed away unless feature authority is strong.
- [ ] Strong ocean features remain segmented/geologic, not continuous plate outlines.
- [ ] Terminal reseed stages remain terminal and are excluded from terrain-writer suspect rankings.
- [ ] Build, tests, and diagnostics pass before merge.

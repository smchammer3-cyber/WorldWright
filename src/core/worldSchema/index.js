// ========================================================
// WORLDWRIGHT -- WORLD SCHEMA (V1.3)
// File: src/core/worldSchema/index.ts
//
// Contract lock:
// - Global seaLevel lives on WorldBrain (and mirrored to metadata.seaLevel for storage/compat).
// - Cells DO NOT store seaLevel.
// - Cells only store editable + derived layers.
//
// This is a "spine contract" file. Change only with migration + validator updates.
// ========================================================
export var PlateType;
(function (PlateType) {
    PlateType["OCEANIC"] = "OCEANIC";
    PlateType["CONTINENTAL"] = "CONTINENTAL";
})(PlateType || (PlateType = {}));
export var BoundaryType;
(function (BoundaryType) {
    BoundaryType["NONE"] = "NONE";
    BoundaryType["DIVERGENT"] = "DIVERGENT";
    BoundaryType["CONVERGENT"] = "CONVERGENT";
    BoundaryType["TRANSFORM"] = "TRANSFORM";
})(BoundaryType || (BoundaryType = {}));
export var SurfaceType;
(function (SurfaceType) {
    SurfaceType["ROCK"] = "ROCK";
    SurfaceType["VOLCANIC"] = "VOLCANIC";
    SurfaceType["SAND"] = "SAND";
    SurfaceType["ALLUVIAL"] = "ALLUVIAL";
    SurfaceType["PEAT"] = "PEAT";
    SurfaceType["SALT"] = "SALT";
    SurfaceType["PERMAFROST"] = "PERMAFROST";
})(SurfaceType || (SurfaceType = {}));
export var OceanDepthClass;
(function (OceanDepthClass) {
    OceanDepthClass["TRENCH"] = "TRENCH";
    OceanDepthClass["ABYSSAL"] = "ABYSSAL";
    OceanDepthClass["RIDGE"] = "RIDGE";
    OceanDepthClass["SHELF"] = "SHELF";
    OceanDepthClass["SLOPE"] = "SLOPE";
})(OceanDepthClass || (OceanDepthClass = {}));
// -----------------------------
// Helpers
// -----------------------------
export function createEmptyCell(index) {
    return {
        index,
        baseHeight: 0,
        editHeightDelta: 0,
        simHeightDelta: 0,
        isWater: false,
        flowDirection: null,
        flowAccumulation: 0,
        basinId: null,
        temperature: 0.5,
        rainfall: 0.5,
        climateCellId: 0,
        prevailingWind: [0, 0],
        plateId: 0,
        plateType: PlateType.CONTINENTAL,
        boundaryType: BoundaryType.NONE,
        upliftRate: 0,
        surfaceAge: 0.5,
        volcanicActivity: 0,
        baseBiomeId: 0,
        editBiomeId: 0,
        surfaceType: SurfaceType.ROCK,
        snowCover: 0,
        oceanDepthClass: null,
    };
}

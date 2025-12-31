// ========================================================
// JARVIS_CHANGE
// Date: 2025-12-03
// Step: 6B-3A -- Sticker System Foundation (Types + Engine Scaffolding)
// File: src/core/stickerEngine.ts
//
// Purpose:
// - Define the core types and pure helper functions for the sticker system.
// - No imports from world.ts or other core files.
// - No side effects, no I/O, no direct world mutation.
// - This module is safe to exist in isolation and safe to delete without
//   breaking the rest of the app.
//
// Notes:
// - Future steps will wire stickers into worlds and editor tools.
// - For now, this file only defines data structures and pure operations.
// ========================================================
/**
 * Generate a simple sticker ID. This is intentionally not cryptographically
 * strong -- it only needs to be unique within a project and stable across
 * a single editing session.
 *
 * If a more robust ID scheme is required later, this implementation can be
 * swapped out without changing the external API.
 */
function generateStickerId() {
    return `stk_${Math.random().toString(36).slice(2, 10)}`;
}
/**
 * Create a new Sticker and return the updated StickerState.
 *
 * This function is pure: it does not mutate the input state.
 * The followWorldRules flag is accepted but not yet enforced in 6B-3A.
 */
export function createSticker(state, input, options = {}) {
    const { followWorldRules = true } = options;
    // 6B-3A: We do NOT enforce world rules yet. In future steps, this is where
    // height/climate suitability checks would occur when followWorldRules is true.
    void followWorldRules;
    const sticker = {
        id: generateStickerId(),
        worldId: input.worldId,
        type: input.type,
        transform: { ...input.transform },
        metadata: input.metadata,
        isEnabled: input.isEnabled ?? true,
    };
    const nextState = {
        stickers: [...state.stickers, sticker],
    };
    return { state: nextState, sticker };
}
/**
 * Update an existing sticker by ID.
 *
 * If the sticker cannot be found, the state is returned unchanged.
 * This function is pure and does not mutate the input state.
 */
export function updateSticker(state, stickerId, patch, options = {}) {
    const { followWorldRules = true } = options;
    // 6B-3A: World-rule enforcement will be implemented later. For now,
    // we simply apply the patch regardless of this flag.
    void followWorldRules;
    const updatedStickers = state.stickers.map((sticker) => {
        if (sticker.id !== stickerId)
            return sticker;
        const nextTransform = {
            ...sticker.transform,
            ...(patch.transform ?? {}),
        };
        return {
            ...sticker,
            type: patch.type ?? sticker.type,
            transform: nextTransform,
            metadata: patch.metadata ?? sticker.metadata,
            isEnabled: patch.isEnabled ?? sticker.isEnabled,
        };
    });
    return { stickers: updatedStickers };
}
/**
 * Remove a sticker by ID.
 * Returns a new StickerState without the specified sticker.
 */
export function removeSticker(state, stickerId, _options = {}) {
    // 6B-3A: followWorldRules is not relevant for deletion yet.
    void _options;
    const remaining = state.stickers.filter((sticker) => sticker.id !== stickerId);
    return { stickers: remaining };
}
/**
 * Convenience helper to create an empty StickerState.
 */
export function emptyStickerState() {
    return { stickers: [] };
}

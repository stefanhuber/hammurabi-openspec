## Context

The Hammurabi game UI currently uses a two-step input flow per turn:

1. **Trade phase**: The player sees buy/sell acre inputs and clicks "Trade". The land trade is validated and executed, updating the game state. Then the trade section hides.
2. **Allocate phase**: A second section appears with food allocation and acres-to-plant inputs. The player clicks "Confirm" to validate and process the turn.

This two-step flow splits related decisions across separate screens, making the experience feel clunky. The game state is mutated between steps (land trade updates grain/land before step 2), which couples the UI phases to intermediate state changes.

The current implementation involves:
- `index.html`: Two separate `<section>` elements (`land-trade-input` and `player-input`) shown/hidden alternately
- `src/ui.js`: Functions `showTradePhase()`, `showPlayerInputPhase()`, and `onTrade()` manage the two-phase toggling
- `src/main.js`: `handleTrade()` validates/executes the trade and transitions to phase 2; `handleSubmit()` handles food/planting

## Goals / Non-Goals

**Goals:**
- Present all four player inputs (buy acres, sell acres, food allocation, acres to plant) in a single form
- Use a single "Submit" button to validate and process everything at once
- Keep the underlying turn processing logic unchanged — land trade still executes before food/planting calculations
- Simplify the UI state management by removing the phase-switching logic

**Non-Goals:**
- Changing any game mechanics or validation rules
- Redesigning the visual layout / CSS beyond what's needed for the merged form
- Changing the turn results display or game-over flow
- Adding new features (e.g., input previews, resource calculators)

## Decisions

### 1. Merge HTML sections into a single form

Combine `land-trade-input` and `player-input` into one `<section id="player-input">` containing all four inputs and one submit button.

**Rationale**: Simplest structural change. One section to show/hide reduces DOM toggling logic.

**Alternative considered**: Keep two sections but show both simultaneously — rejected because it adds no benefit and keeps unnecessary structural complexity.

### 2. Single submit handler validates all inputs together

The combined handler will:
1. Read all four input values
2. Validate land trade inputs (via `validateLandTrade`)
3. Execute the land trade (via `executeLandTrade`) to get the post-trade state
4. Validate food allocation against post-trade state
5. Validate acres to plant against post-food state
6. Process the turn

**Rationale**: This matches the existing processing order but runs it all in one click. The state mutation from land trade still happens before food/planting validation, which is correct because planting constraints depend on post-trade resources.

**Alternative considered**: Validate everything before any state mutation — rejected because food/planting validation inherently depends on the post-trade grain/land amounts. The current sequential approach is correct.

### 3. Remove phase-switching UI functions

Remove `showTradePhase`, `showPlayerInputPhase`, and `onTrade` from `ui.js`. Replace with a single `showInputPhase` that resets all four inputs and shows the combined section.

**Rationale**: These functions only exist to support the two-step flow. Removing them simplifies the code.

### 4. Show single unified error message

Use one error message element for all validation errors (land trade, food, planting). Display the first validation error encountered.

**Rationale**: With a single form, a single error display is the natural pattern. The sequential validation already short-circuits on the first error.

## Risks / Trade-offs

- **[Risk] Land price display must still be visible in the combined form** → Ensure the land price info paragraph is included in the merged section so the player knows the cost before deciding.
- **[Risk] Acres-to-plant validation depends on post-trade, post-food grain** → The submit handler must execute land trade and subtract food before validating planting. This is already the logical order; just needs to be explicit in one function.
- **[Risk] Existing tests reference the two-step flow** → Turn processing and land-market unit tests should be unaffected since they test pure functions. Any UI-level test expectations for two phases would need updating, but currently there are no UI integration tests.

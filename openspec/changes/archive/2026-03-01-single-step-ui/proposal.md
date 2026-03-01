## Why

The current game UI uses a two-step input process: first the player enters land trade values (buy/sell acres) and clicks "Trade", then a second form appears for food allocation and planting. This creates unnecessary friction and a disjointed experience. All four inputs should be presented together in a single form with one submit button, so the player can make all decisions at once and submit them in one action.

## What Changes

- Merge the land trade inputs (buy acres, sell acres) and the allocation inputs (food, acres to plant) into a single form section
- Replace the separate "Trade" and "Confirm" buttons with a single "Submit" button
- Move all validation (land trade + food + planting) to happen on the single submit action
- Remove the two-phase show/hide logic (`showTradePhase` / `showPlayerInputPhase`) in favor of a single input phase
- The turn processing logic remains unchanged — land trade is still executed before food/planting

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `game-ui`: The input phase changes from a two-step process (trade → allocate) to a single form with all four inputs and one submit button
- `turn-actions`: Validation and submission flow changes to handle all inputs at once on a single button click

## Impact

- `index.html` — Merge `land-trade-input` and `player-input` sections into one section with all four fields and one button
- `src/ui.js` — Remove `showTradePhase`, `showPlayerInputPhase`, `onTrade`; simplify to a single input phase and single submit handler
- `src/main.js` — Combine `handleTrade` and `handleSubmit` into one handler that validates and processes all inputs together
- Existing unit tests for turn processing and land-market logic are unaffected; UI integration behavior changes

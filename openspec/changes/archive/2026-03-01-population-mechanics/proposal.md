## Why

The game currently has no population dynamics — people never starve and no new people arrive. Adding feeding requirements and immigration makes resource allocation meaningful and creates the core challenge of the game.

## What Changes

- Player must allocate bushels of grain to feed the population each turn
- One person requires 20 bushels per year to survive; people fed = floor(grain allocated as food / 20)
- Only fed people survive to the next turn — unfed people die (starvation)
- Immigration occurs when no one starves: immigrants = floor((20 × acres + grain in storage) / (100 × population)), where grain in storage is the remaining grain before harvest (after food and seed costs are deducted)
- The turn input phase now requires the player to decide how much grain to allocate as food, in addition to acres to plant
- UI updated to show feeding decisions, starvation results, and immigration

## Capabilities

### New Capabilities
- `feeding`: Population feeding mechanics — grain allocation for food, starvation calculation, survival
- `immigration`: Immigration mechanics — formula-based population growth when no one starves

### Modified Capabilities
- `turn-actions`: Player must now also decide how many bushels to allocate as food (new input alongside acres to plant)
- `game-ui`: UI must accept food allocation input, display starvation and immigration results in the turn report

## Impact

- `src/turn.js` — add food allocation input, feeding/starvation logic, immigration calculation
- `src/ui.js` — add food input field, display starvation/immigration in turn results
- `index.html` — add food allocation input element
- Existing turn processing tests need updating for the new input parameter
- New unit tests for feeding and immigration calculations

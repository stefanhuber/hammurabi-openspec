## Why

The game currently lacks unpredictability — every turn is fully deterministic based on player input. Adding random events (plague, rats) and a starvation loss threshold makes the game more challenging and interesting by introducing risk the player must account for.

## What Changes

- Add a **plague event** that has a 15% chance of occurring each turn; if it occurs, half the population dies
- Add a **rat infestation event** that has a 40% chance of occurring each turn; if it occurs, 10% to 30% of the harvested yield is destroyed (percentage chosen uniformly at random)
- Add a **starvation defeat rule**: if more than 45% of the population starves in a single turn, the game is immediately lost. When a plague occurs in the same turn, the 45% threshold is evaluated against the remaining population after plague deaths
- Both random events use uniform distribution for probability
- The turn results display is updated to show plague and rat event outcomes

## Capabilities

### New Capabilities

- `plague`: Plague event logic — 15% chance per turn, kills half the population
- `rats`: Rat infestation event logic — 40% chance per turn, destroys 10-30% of harvested yield

### Modified Capabilities

- `game-ui`: Turn results must display plague and rat event outcomes when they occur
- `turn-actions`: Turn processing must incorporate plague, rats, and the 45% starvation defeat rule

## Impact

- New source files: `src/plague.js`, `src/rats.js` with pure functions and unit tests
- `src/turn.js` — `processTurn` incorporates plague and rat events; `checkGameOver` adds starvation threshold check
- `src/ui.js` — `showTurnResults` displays plague deaths and grain lost to rats
- `index.html` — Add display elements for plague and rat event results in the turn results section
- `src/population.js` — No changes (starvation calculation stays the same; the 45% threshold is checked in turn logic)

## Context

The Hammurabi game currently processes turns deterministically: the player chooses food, planting, and trade amounts, then harvest yield is random (2-6 bushels/acre) and starvation/immigration are calculated. There are no random negative events that can disrupt the player's plans, making the game predictable once the player understands the mechanics.

This change introduces two random events (plague and rats) plus a starvation defeat threshold to add unpredictability and challenge.

## Goals / Non-Goals

**Goals:**
- Add plague event (15% chance, kills half the population) as a new pure-function module
- Add rat infestation event (40% chance, destroys 10-30% of harvest yield) as a new pure-function module
- Add a starvation defeat rule: if more than 45% of the population starves in one turn, the game is lost
- Display plague and rat outcomes in the turn results
- All random probabilities use uniform distribution (`Math.random()`)
- Unit-test all new logic with injectable random sources

**Non-Goals:**
- Changing any existing game mechanics (starvation, immigration, harvest yield, land trade)
- Adding player ability to prevent or mitigate random events
- Adding cumulative or multi-turn event effects
- Changing the UI layout or input form

## Decisions

### 1. Separate modules for each event

Create `src/plague.js` and `src/rats.js`, each exporting a pure function that takes a random value (0-1) and returns the event outcome.

**Rationale**: Keeps each event isolated, testable, and follows the existing modular pattern (like `harvest.js`, `population.js`). Injecting the random value enables deterministic testing.

**Alternative considered**: Single `random-events.js` module — rejected because the events are independent and may grow separately.

### 2. Event execution order in processTurn

The turn processing order will be:
1. Deduct food and seeds from grain
2. Apply plague event to population (before starvation)
3. Calculate starvation against the post-plague population
4. Check 45% starvation defeat threshold against the post-plague population
5. Calculate immigration (if no starvation)
6. Calculate harvest yield
7. Apply rat event to harvest (rats eat part of the yield)
8. Calculate final grain (grain after food/seeds + harvest after rats)

**Rationale**: Plague must be applied before starvation so the 45% threshold is evaluated against the surviving (post-plague) population. Rats affect the harvest, so they apply to the yield. This means plague kills people before the player's food allocation is evaluated — the same food amount now feeds fewer people.

**Alternative considered**: Plague after starvation with threshold against original population — rejected because the rule explicitly states the threshold applies to the remaining population after plague deaths.

### 3. Starvation threshold in checkGameOver

The 45% starvation rule will be checked during turn processing. `processTurn` will include a `starvationDefeat` flag in the turn result when peopleDied > 0.45 × postPlaguePopulation. When plague occurs, the population is halved first, then starvation is calculated against that reduced population. `checkGameOver` in `main.js` (or turn result handling) will use this flag to trigger game over.

**Rationale**: The threshold is a per-turn check at processing time, not a state-based check. Including it in the turn result keeps `processTurn` as the single source of turn outcomes. Using the post-plague population as the denominator means the plague makes the starvation threshold easier to hit (fewer people, same food allocation may or may not be enough).

### 4. Random value injection for testability

Each event function accepts an optional random value parameter. When not provided, it uses `Math.random()`. Tests pass deterministic values.

**Rationale**: Same pattern as could be applied to `calculateYield`. Keeps production code simple while enabling deterministic unit tests.

## Risks / Trade-offs

- **[Risk] Plague + starvation in same turn can devastate the player** → This is intentional per the game design. Plague reduces population before starvation is calculated, so the same food allocation now serves fewer people. The 45% threshold is evaluated against the post-plague population, which can make it easier or harder to trigger depending on the food amount. The 15% probability keeps it uncommon.
- **[Risk] Rat event applied to total harvest, not stored grain** → By design, rats eat from the current harvest yield only, not from grain stock. This is clear in the spec.
- **[Risk] Existing turn.test.js tests may need updating** → `processTurn` signature and return shape change. Tests will need to account for the new fields (plague, rats) and optional random injection.

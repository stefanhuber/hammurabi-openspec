## Context

The Hammurabi game currently has a single player action per turn (choose acres to plant). Population is static at 100 — no one ever dies or arrives. This change adds a second player action (allocate grain for food) and two automatic population adjustments (starvation and immigration) that occur after harvesting.

## Goals / Non-Goals

**Goals:**
- Add feeding as a player decision each turn
- Implement starvation: unfed people die
- Implement immigration when no one starves
- Keep feeding and immigration logic in pure functions for testability

**Non-Goals:**
- No other population events (plague, war, etc.)
- No partial feeding mechanics beyond the specified formula

## Decisions

### 1. Turn phase ordering

**Decision**: Each turn proceeds in this order:
1. Player allocates grain for food
2. Player chooses acres to plant
3. Feeding is resolved (starvation calculated, population updated)
4. Immigration is calculated (using grain remaining before harvest — after food and seed costs are deducted)
5. Harvest is resolved (grain added to stock)
6. Turn advances

**Rationale**: Food allocation must happen before planting so the player knows how much grain remains for seeds. Immigration uses the grain remaining in storage before harvest (the grain the player chose not to spend on food or seeds). This means the player has a three-way trade-off: food, seeds, and leftover grain that attracts immigrants. Starvation runs before immigration so the surviving population is used for the immigration formula.

**Alternatives considered**: Using post-harvest grain for immigration — rejected because the spec clarifies that immigration uses the grain stock from before harvesting is added.

### 2. New module: src/population.js

**Decision**: Create a new `src/population.js` module with pure functions for `calculateStarvation(population, grainForFood)` and `calculateImmigration(acres, grain, population)`.

**Rationale**: Keeps population logic separate from turn processing, matching the existing modular pattern (game-state.js, harvest.js, turn.js).

### 3. Food allocation validation

**Decision**: The player cannot allocate more grain for food than they currently have in stock. The remaining grain after food allocation is available for planting seeds.

**Rationale**: This follows naturally from the resource model — grain is a single pool used for both food and seeds.

## Risks / Trade-offs

- [Turn ordering affects game balance] → The specified formulas are deterministic; ordering follows logically from the spec description.
- [Immigration formula uses integer division (floor)] → Consistent with the starvation formula which also uses floor division.

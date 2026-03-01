## Context

The game currently has a fixed turn flow: food allocation → planting → starvation → immigration → harvest. Land is fixed at 1000 acres. This change adds a land trading phase at the start of each turn, before food/planting decisions.

## Goals / Non-Goals

**Goals:**
- Add land price generation (17–26 bushels, uniform distribution)
- Add buy/sell land as the first action each turn
- Ensure grain from selling is immediately available for food/seeds
- Ensure grain spent buying is unavailable for food/seeds
- Keep land market logic in a separate testable module

**Non-Goals:**
- No price history or market trends
- No land quality differences

## Decisions

### 1. New module: src/land-market.js

**Decision**: Create `src/land-market.js` with `generateLandPrice()` and `executeLandTrade(state, acresToBuy, acresToSell, price)`.

**Rationale**: Follows existing modular pattern (harvest.js, population.js). Pure functions for testability.

### 2. Turn phase ordering

**Decision**: Updated turn order:
1. Land price is generated
2. Player buys or sells land (grain and land updated immediately)
3. Player allocates grain for food
4. Player chooses acres to plant
5. Starvation resolved
6. Immigration calculated (using pre-harvest grain)
7. Harvest resolved
8. Turn advances

**Rationale**: The spec says selling land makes grain "immediately available" for food/seeds, and buying uses grain that "cannot be used as seeds or food." This requires land trading to happen first.

### 3. Buy/sell as a single action

**Decision**: The player enters acres to buy and acres to sell in the same input phase. Only one can be non-zero (buying and selling in the same turn is allowed if the player wants to, as no rule prohibits it).

**Rationale**: The spec says "the player has the option to sell or buy land." Providing both inputs keeps it simple. No rule prohibits doing both.

### 4. Land price display and state

**Decision**: The land price is generated at the start of each turn and displayed to the player. It is stored as part of the turn context (not persistent game state) since it changes each turn.

**Rationale**: The price is determined per turn. The player needs to see it to make informed decisions.

## Risks / Trade-offs

- [Player could sell all land] → Allowed by the spec; the game may become unwinnable but that's a valid strategic consequence.
- [Buying and selling in same turn] → No rule prohibits it; the math works correctly in both directions.

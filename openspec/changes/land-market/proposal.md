## Why

The game currently has a fixed amount of land (1000 acres). Adding a land market gives the player another strategic dimension — trading land for grain or vice versa each turn, affecting harvest capacity and grain reserves.

## What Changes

- Each turn, a land price is randomly determined between 17 and 26 bushels per acre (uniform distribution, 10% chance each)
- The player can buy or sell acres of land at the current price before allocating food and planting
- Buying land deducts grain from stock (price × acres bought); this grain is unavailable for food or seeds
- Selling land adds grain to stock (price × acres sold); this grain is immediately available for food or seeds
- Cannot sell more land than owned; cannot buy more than affordable (price × acres ≤ grain in stock)

## Capabilities

### New Capabilities
- `land-market`: Land price determination and buy/sell mechanics — random price generation, buying/selling validation, grain and land adjustments

### Modified Capabilities
- `turn-actions`: Land trading happens as the first action each turn, before food allocation and planting; grain available for food/seeds reflects any land trade
- `game-ui`: UI must display the current land price, accept buy/sell input, and show trade results

## Impact

- New `src/land-market.js` module for price generation and trade calculations
- `src/turn.js` — integrate land trading into turn processing (before food/seeds)
- `src/main.js` — add land trading step to the turn flow
- `src/ui.js` — add land price display, buy/sell input fields
- `index.html` — add land trading UI section
- New unit tests for land market logic

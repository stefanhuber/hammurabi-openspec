## 1. Merge HTML into single input form

- [x] 1.1 In `index.html`, merge the `land-trade-input` and `player-input` sections into a single `player-input` section containing land price display, buy input, sell input, food input, acres input, and one submit button
- [x] 1.2 Remove the separate `trade-btn` button and `trade-error-message` element; use the existing `error-message` element for all validation errors

## 2. Simplify UI module

- [x] 2.1 In `src/ui.js`, remove `showTradePhase`, `showPlayerInputPhase`, and `onTrade` functions
- [x] 2.2 In `src/ui.js`, remove `showTradeError`, `clearTradeError`, and the `tradeErrorMessage` element getter
- [x] 2.3 Update `showInputPhase` to reset all four inputs (buy, sell, food, acres) and show the single combined section
- [x] 2.4 Update `resetUI` to reflect the single-section structure (no separate trade section to show/hide)

## 3. Combine submit logic in main module

- [x] 3.1 In `src/main.js`, merge `handleTrade` and `handleSubmit` into a single `handleSubmit` function that validates land trade, executes the trade, validates food and planting, then processes the turn
- [x] 3.2 Remove the `onTrade` listener registration and `startTradePhase` function; update `startGame` and `handleNextTurn` to use the single input phase
- [x] 3.3 Remove unused imports (`showTradePhase`, `showPlayerInputPhase`, `onTrade`, `showTradeError`, `clearTradeError`) from `src/main.js`

## 4. Validate and test

- [x] 4.1 Run existing unit tests (`npm test`) to confirm turn processing and land-market logic are unaffected
- [x] 4.2 Manually verify the combined form displays all four inputs with land price and a single submit button
- [x] 4.3 Run linter (`npm run lint`) and fix any issues

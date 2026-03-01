## 1. Land Market Module

- [x] 1.1 Create `src/land-market.js` with `generateLandPrice()` — returns random integer 17–26 (uniform, 10% each)
- [x] 1.2 Add `validateLandTrade(acresToBuy, acresToSell, price, state)` — validates buy/sell constraints
- [x] 1.3 Add `executeLandTrade(state, acresToBuy, acresToSell, price)` — returns updated state with adjusted grain and land
- [x] 1.4 Write unit tests for `generateLandPrice` (range 17–26, integer values)
- [x] 1.5 Write unit tests for `validateLandTrade` (buy limits, sell limits, valid trades)
- [x] 1.6 Write unit tests for `executeLandTrade` (grain/land adjustments for buy, sell, and no trade)

## 2. Turn Processing Updates

- [x] 2.1 Update `processTurn` in `src/turn.js` to accept land trade parameters and apply trade before food/seeds
- [x] 2.2 Include land trade results in the turn result object
- [x] 2.3 Update existing turn processing tests for the new land trade parameters

## 3. UI Updates

- [x] 3.1 Add land price display and buy/sell input fields to `index.html`
- [x] 3.2 Update `src/ui.js` to display land price, read buy/sell inputs, and show trade results in turn report
- [x] 3.3 Update `src/main.js` to generate land price at turn start, validate and pass land trade to turn processing

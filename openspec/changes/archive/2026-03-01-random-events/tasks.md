## 1. Plague module

- [x] 1.1 Create `src/plague.js` with a `rollPlague(random)` function that returns `{ occurred: boolean, deaths: number }` given a population and an optional random value (defaults to `Math.random()`). Plague occurs when random < 0.15; deaths = floor(population / 2).
- [x] 1.2 Create `src/plague.test.js` with unit tests: plague occurs at random < 0.15, no plague at random >= 0.15, deaths are floor(population / 2) for even and odd populations.

## 2. Rats module

- [x] 2.1 Create `src/rats.js` with a `rollRats(totalHarvest, random, destructionRandom)` function that returns `{ occurred: boolean, grainDestroyed: number }`. Rats occur when random < 0.40; grainDestroyed = floor(totalHarvest * destructionRate) where destructionRate is uniform between 0.10 and 0.30 (derived from destructionRandom).
- [x] 2.2 Create `src/rats.test.js` with unit tests: rats occur at random < 0.40, no rats at random >= 0.40, destruction at 10%/20%/30% boundaries, destroyed amount is floored.

## 3. Integrate events into turn processing

- [x] 3.1 In `src/turn.js`, import `rollPlague` and `rollRats`; update `processTurn` to apply plague event first (halving population before starvation), then calculate starvation against post-plague population, then apply rat event to harvest (reducing totalHarvest), passing results into turnResult.
- [x] 3.2 Add `starvationDefeat` flag to `processTurn` return: set to `true` when peopleDied > 0.45 * postPlaguePopulation (the population after plague, before starvation).
- [x] 3.3 Update `src/turn.test.js` to test: plague halves population before starvation is calculated, rat event reduces harvest in grain calculation, starvationDefeat flag uses post-plague population as denominator (e.g., plague reduces 100→50, then 24 starve = 48% → defeat; 20 starve = 40% → no defeat).

## 4. Game over for starvation threshold

- [x] 4.1 In `src/main.js`, after `processTurn`, check `turnResult.starvationDefeat`; if true, call `showGameOver(false)` with an overthrow message instead of proceeding to turn results.
- [x] 4.2 In `src/ui.js`, update `showGameOver` to accept an optional message parameter so the starvation defeat can show a specific overthrow message.

## 5. Display plague and rat results in UI

- [x] 5.1 In `index.html`, add `<p id="plague-result"></p>` and `<p id="rats-result"></p>` elements in the turn results section.
- [x] 5.2 In `src/ui.js`, add `plagueResult` and `ratsResult` element getters; update `showTurnResults` to display plague deaths and grain destroyed by rats (or hide the elements when the events didn't occur).

## 6. Validate and test

- [x] 6.1 Run all unit tests (`npm test`) and confirm all pass.
- [x] 6.2 Run linter (`npm run lint`) and fix any issues.

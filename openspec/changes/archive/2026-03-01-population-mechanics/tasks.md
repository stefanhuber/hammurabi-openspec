## 1. Population Module

- [x] 1.1 Create `src/population.js` with `calculateStarvation(population, grainForFood)` — returns `{ peopleFed, peopleDied, survivingPopulation }`
- [x] 1.2 Create `calculateImmigration(acres, grain, population)` in `src/population.js` — returns number of immigrants using floor((20 × acres + grain) / (100 × population)), where grain is the remaining grain before harvest (after food and seed costs)
- [x] 1.3 Write unit tests for starvation calculation (exact food, slightly short, zero food, excess food)
- [x] 1.4 Write unit tests for immigration calculation (various inputs, no immigration when people starved)

## 2. Turn Processing Updates

- [x] 2.1 Update `processTurn` in `src/turn.js` to accept `grainForFood` parameter alongside `acresToPlant`
- [x] 2.2 Add food allocation validation in `src/turn.js` — cannot exceed grain stock, remaining grain available for seeds
- [x] 2.3 Integrate starvation into turn processing: deduct food grain, calculate survivors, update population before harvest
- [x] 2.4 Integrate immigration into turn processing: calculate before harvest using remaining grain (after food and seed deductions), add to population only if no one starved
- [x] 2.5 Update existing turn processing tests for the new `grainForFood` parameter
- [x] 2.6 Write new tests for food validation, starvation integration, and immigration integration in turn processing

## 3. UI Updates

- [x] 3.1 Add food allocation input field to `index.html` (before the acres input)
- [x] 3.2 Update `src/ui.js` to read food allocation input and pass it to turn processing
- [x] 3.3 Update `src/ui.js` turn results display to show starvation count and immigration count
- [x] 3.4 Update `src/main.js` to pass food allocation to `processTurn` and handle the updated turn result

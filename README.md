# Hammurabi

A web-based implementation of the classic 1968 text game Hammurabi. Rule the ancient city-state of Samaria for 10 years by allocating grain across feeding your people, planting crops, and trading land.

## Spec-Driven Development

This project demonstrates **spec-driven development** using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) approach.

The game was built through a series of structured iterations. Each iteration:

* Delivered a **potentially shippable product**
* Introduced a clearly defined feature
* Was guided by a written specification before implementation

All feature specifications live in the `/openspec` directory, where specs are grouped by domain. Archived change proposals are in `/openspec/changes/archive/`.

### Iteration Order

The project evolved in the following sequence:

1. `hammurabi-game` — core game loop, state management, harvest, and basic UI
2. `github-workflows` — CI pipeline and deploy pipeline
3. `population-mechanics` — feeding, starvation, and immigration
4. `land-market` — buying and selling land at randomised prices
5. `random-events` — plague and rat infestation
6. `single-step-ui` — consolidated single-step turn input
7. `input-grid-layout` — compact 2×2 grid layout for player inputs

Each step builds incrementally on the previous one, ensuring clarity of scope, maintainability, and steady product growth.

## Game Mechanics

### Overview

Each turn represents one year. You start with **100 people**, **1,000 acres** of land, and **2,800 bushels** of grain. After 10 years, if your city-state survives, you win.

Each year you make four decisions via a compact input grid:

1. **Buy land** — purchase acres at this year's market price
2. **Sell land** — sell acres you own at this year's market price
3. **Feed your people** — allocate bushels of grain to prevent starvation
4. **Plant crops** — choose how many acres to sow for this year's harvest

---

### Land Market

Land is bought and sold at a price randomly set each year between **17 and 26 bushels per acre**.

- You can buy acres if you have enough grain to cover the cost
- You can sell acres you currently own

---

### Planting & Harvest

Planting has two constraints:

- **Seeds:** each acre planted costs **0.5 bushels** of grain
- **Labour:** each person can work at most **10 acres**

So with 50 people you can plant at most 500 acres, and planting 200 acres costs 100 bushels of seed.

At harvest time, each planted acre yields a random **2–6 bushels** (uniform). Net grain from the harvest is:

```
harvest = acres planted × yield per acre
```

---

### Feeding the Population

Each person needs **20 bushels** of grain per year to survive. The number of survivors is:

```
survivors = min(floor(grain allocated ÷ 20), current population)
```

Anyone not fed starves. If more than **45% of the population starves in a single year**, the city collapses immediately and you lose.

---

### Immigration

If nobody starved this year, new settlers are attracted to your city. The number of immigrants depends on how prosperous and spacious your city-state appears:

```
immigrants = floor((20 × acres + grain in storage) ÷ (100 × survivors))
```

More land and more stored grain attract more people.

---

### Random Events

Two disasters can strike each year, each resolved independently:

| Event | Probability | Effect |
|-------|-------------|--------|
| **Rat infestation** | 40% | Rats eat **10–30%** of that year's harvest before it reaches storage |
| **Plague** | 15% | Half the population dies at year end |

Rats reduce the grain added to your stores this turn. Plague strikes before starvation is calculated, halving the population.

---

### Turn Order

Each year resolves in this sequence:

1. Land transaction (buy/sell)
2. Food and seed grain deducted
3. Plague check — if it strikes, half the population dies
4. Starvation calculated (against post-plague population)
5. Mass starvation check (>45% → instant defeat)
6. Immigration calculated (pre-harvest grain, only if no starvation)
7. Harvest calculated (yield randomised)
8. Rats check — if they strike, a fraction of harvest is lost

---

### Winning & Losing

| Condition | Result |
|-----------|--------|
| Survive all 10 years | **Victory** |
| Entire population starves (reaches 0) | **Defeat** |
| More than 45% of the population starves in one year | **Defeat** |
| Grain drops below 0.5 bushels (not enough for even one acre of seed) | **Defeat** |

---

### Starting State

| Resource | Starting value |
|----------|---------------|
| Year | 1 of 10 |
| Population | 100 |
| Grain | 2,800 bushels |
| Land | 1,000 acres |

---

## Development

### Tech Stack

- Vanilla JavaScript (ESM modules)
- [Vite](https://vite.dev/) (dev server & build)
- [Vitest](https://vitest.dev/) (test runner — 90 tests)
- ESLint + Prettier (linting & formatting)

### Commands

```bash
npm run dev     # Start Vite dev server
npm test        # Run all tests (Vitest, 90 tests)
npm run lint    # Lint src/
npm run build   # Production build
```

### Project Structure

```
src/
  game-state.js       # Initial state factory
  game-state.test.js
  harvest.js          # Harvest yield calculation
  harvest.test.js
  land-market.js      # Land price generation, trade validation & execution
  land-market.test.js
  plague.js           # Plague random event
  plague.test.js
  population.js       # Starvation & immigration
  population.test.js
  rats.js             # Rat infestation random event
  rats.test.js
  turn.js             # Turn processing, input validation, game-over check
  turn.test.js
  ui.js               # All DOM interactions
  main.js             # Entry point, wires UI callbacks to game logic
  styles.css          # Layout & theming
index.html
openspec/             # Specifications & archived change proposals
```

### Conventions

- **Pure functions** for all game logic — no side effects, easy to test
- **UI module** (`ui.js`) is the only module that touches the DOM
- **ESM imports** throughout (`import`/`export`)
- Tests use Vitest with `vi.spyOn` for mocking (e.g. randomness)
- No classes — plain functions and object literals

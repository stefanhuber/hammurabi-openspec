# Hammurabi

A web-based implementation of the classic 1968 text game Hammurabi. Rule the ancient city-state of Samaria for 10 years by allocating grain across feeding your people, planting crops, and trading land.

## Spec-Driven Development

This project demonstrates **spec-driven development** using the [OpenSpec](https://github.com/Fission-AI/OpenSpec) approach.

The game was built through a series of structured iterations. Each iteration:

* Delivered a **potentially shippable product**
* Introduced a clearly defined feature
* Was guided by a written specification before implementation

All feature specifications live in the `/openspec` directory, where specs are grouped by domain.

### Iteration Order

The project evolved in the following sequence:

1. `core game loop`
2. `food immigration dynamics`
3. `land market`
4. `random events`

Each step builds incrementally on the previous one, ensuring clarity of scope, maintainability, and steady product growth.

## Game Mechanics

### Overview

Each turn represents one year. You start with **100 people**, **1,000 acres** of land, and **2,800 bushels** of grain. After 10 years, if your city-state survives, you win.

Each year you make three decisions:

1. **Buy or sell land** — before the harvest, at this year's market price
2. **Feed your people** — allocate grain to prevent starvation
3. **Plant crops** — choose how many acres to sow for this year's harvest

---

### Land Market

Land is bought and sold at a price randomly set each year between **17 and 26 bushels per acre**.

- You can buy acres if you have enough grain to cover the cost
- You can sell acres you currently own
- You cannot buy and sell in the same turn

---

### Planting & Harvest

Planting has two constraints:

- **Seeds:** each acre planted costs **0.5 bushels** of grain
- **Labour:** each person can work at most **10 acres**

So with 50 people you can plant at most 500 acres, and planting 200 acres costs 100 bushels of seed.

At harvest time, each planted acre yields a random **2–6 bushels** (uniform). Net grain from the harvest is:

```
net harvest = (acres planted × yield per acre) − seed cost
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

Rats reduce the grain added to your stores this turn. Plague strikes after immigration, halving the final population count.

---

### Turn Order

Each year resolves in this sequence:

1. Land transaction (buy/sell at current price)
2. Harvest calculated (yield randomised)
3. Rats checked — if they strike, a fraction of the harvest is lost
4. Grain spent on food deducted; survivors counted
5. Mass starvation check (> 45% dead → instant loss)
6. Immigration calculated (only if no starvation occurred)
7. Plague checked — if it strikes, half the post-immigration population dies
8. New land price generated for next year

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

### Commands

```bash
npm run dev     # Start Vite dev server
npm test        # Run all tests (Vitest)
npm run lint    # Lint src/ and tests/
npm run build   # Production build
```

### Project Structure

```
src/
  config.js       # Game constants
  game.js         # Core loop: createGameState, playTurn, checkGameOver
  harvest.js      # Harvest calculation
  population.js   # Survivors, starvation, immigration
  events.js       # Plague and rat infestation
  validation.js   # Input validation
  ui.js           # DOM interactions
  main.js         # Entry point
tests/            # Vitest test suite (124 tests)
index.html
style.css
```

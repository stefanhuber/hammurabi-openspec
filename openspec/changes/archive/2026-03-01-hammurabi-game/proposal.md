## Why

The project needs its core game — Hammurabi, a turn-based single-player strategy game set in ancient Mesopotamia. This is the foundational feature that delivers the primary user experience.

## What Changes

- Create a turn-based strategy game where the player rules the city of Samaria as Hammurabi
- Player manages bushels of grain across 10 yearly turns
- Game tracks population (initially 100), land (initially 1000 acres), and grain stock (initially 2800 bushels)
- Each turn the player decides resource allocation: how many acres to plant with seeds
- 1 person can harvest 10 acres per year; planting costs 0.5 bushels of seed per acre
- Harvested acres yield 2–6 bushels of grain per acre (uniform distribution, 20% chance each)
- Game ends successfully after 10 completed years; game fails if the player cannot complete 10 years

## Capabilities

### New Capabilities
- `game-state`: Core game state management — population, land, grain stock, turn tracking, initial values, and win/loss conditions
- `turn-actions`: Player turn actions — deciding how many acres to plant, validating against available resources (people, seeds, land)
- `harvest`: Harvest calculation — computing grain yield per acre using uniform probability distribution (2–6 bushels, 20% each), updating grain stock
- `game-ui`: User interface — displaying game state, accepting player input, showing turn results, and end-game messages

### Modified Capabilities

## Impact

- New HTML page with game UI
- New JavaScript modules for game logic, turn processing, and harvest calculation
- New CSS for game styling
- Vite configuration for build and dev server

## Context

This is a greenfield project — no existing code. We are building a Hammurabi game as a standalone static web app using vanilla HTML, CSS, and JavaScript, bundled with Vite. The game is turn-based: each turn the player allocates grain resources, and the system computes the harvest outcome.

## Goals / Non-Goals

**Goals:**
- Implement the Hammurabi game with exactly the rules specified (no additions)
- Clean separation between game logic (testable) and UI (rendering/input)
- Unit-testable game logic modules
- Playable in a browser via Vite dev server or production build

**Non-Goals:**
- No AI opponents, multiplayer, or networking
- No save/load functionality
- No sound or animations
- No rules beyond what is explicitly specified

## Decisions

### 1. Module structure: Separate game logic from UI

**Decision**: Split code into pure game logic modules and a UI module.

- `src/game-state.js` — creates and manages game state (population, land, grain, turn)
- `src/turn.js` — processes player actions, validates inputs, advances turn
- `src/harvest.js` — computes harvest yield using random distribution
- `src/ui.js` — DOM rendering, input handling, event wiring
- `src/main.js` — entry point, wires modules together

**Rationale**: Pure logic modules can be unit tested without DOM. UI module handles all DOM interaction.

**Alternatives considered**: Single-file approach — rejected because it makes testing difficult and violates clean code principles.

### 2. Yield randomness: Use uniform discrete distribution

**Decision**: Harvest yield per acre is randomly selected from {2, 3, 4, 5, 6} with equal probability (20% each), using `Math.random()`.

**Rationale**: Directly implements the specified rule. No external RNG library needed.

### 3. State management: Plain JavaScript object

**Decision**: Game state is a plain object passed between functions. No state management library.

**Rationale**: The game state is simple (population, land, grain, turn number). A plain object is sufficient and keeps dependencies minimal.

## Risks / Trade-offs

- [Math.random() is not cryptographically secure] → Acceptable for a game; no security requirement exists.
- [No framework means manual DOM manipulation] → Trade-off for simplicity; the UI is small enough that this is manageable.

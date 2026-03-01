# CLAUDE.md

## Tech Stack

- Vanilla JavaScript (ESM modules)
- Vite (dev server & build)
- Vitest (test runner)
- ESLint + Prettier (linting & formatting)

## Commands

```bash
npm run dev     # Start Vite dev server
npm test        # Run all tests (Vitest, 90 tests)
npm run lint    # Lint src/
npm run build   # Production build
```

## Project Structure

All game logic and tests live in `src/` with co-located test files (`*.test.js` alongside source).

- `game-state.js` — initial state factory
- `harvest.js` — harvest yield calculation
- `land-market.js` — land price generation, trade validation & execution
- `plague.js` — plague random event
- `population.js` — starvation & immigration
- `rats.js` — rat infestation random event
- `turn.js` — turn processing, input validation, game-over check
- `ui.js` — all DOM interactions
- `main.js` — entry point, wires UI callbacks to game logic

## Conventions

- **Pure functions** for all game logic — no side effects, easy to test
- **UI module** (`ui.js`) is the only module that touches the DOM
- **ESM imports** throughout (`import`/`export`)
- Tests use `vitest` with `vi.spyOn` for mocking (e.g. randomness)
- No classes — plain functions and object literals

## OpenSpec Workflow

Changes are managed via the OpenSpec approach:

1. `/opsx:propose` — propose a new change (creates design, specs, tasks)
2. `/opsx:apply` — implement tasks from the change
3. `/opsx:archive` — archive completed change

Specs live in `/openspec`. Archived changes are in `/openspec/changes/archive/`.

## Game Rule Authoring

- **Never** generate game rules not explicitly specified by the user
- **Never** reference the original 1968 Hammurabi BASIC game as a source of rules

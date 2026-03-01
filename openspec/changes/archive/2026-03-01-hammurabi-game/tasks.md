## 1. Project Setup

- [x] 1.1 Initialize the project with Vite (vanilla JS template), configure package.json, and set up the dev server
- [x] 1.2 Configure ESLint and Prettier with 2-space indentation
- [x] 1.3 Set up Vitest for unit testing
- [x] 1.4 Create the basic project file structure: `index.html`, `src/main.js`, `src/styles.css`

## 2. Game State Module

- [x] 2.1 Create `src/game-state.js` with a function to create initial game state (grain: 2800, population: 100, land: 1000, turn: 1)
- [x] 2.2 Write unit tests for initial game state creation

## 3. Harvest Module

- [x] 3.1 Create `src/harvest.js` with a function that returns a random yield between 2 and 6 (uniform distribution, 20% each)
- [x] 3.2 Write unit tests for the harvest yield function (verifying output is always in range 2–6)

## 4. Turn Processing Module

- [x] 4.1 Create `src/turn.js` with validation: check acres to plant against grain (0.5 bushels/acre), population (10 acres/person), and available land
- [x] 4.2 Create turn processing function: deduct seed cost, compute harvest, update grain stock, advance turn number
- [x] 4.3 Add game-over detection: success after turn 10, failure if player cannot continue
- [x] 4.4 Write unit tests for input validation (grain limit, population limit, land limit)
- [x] 4.5 Write unit tests for turn processing (seed deduction, harvest addition, turn advancement)
- [x] 4.6 Write unit tests for game-over conditions

## 5. User Interface

- [x] 5.1 Build the HTML structure in `index.html` with sections for game state display, player input, turn results, and end-game message
- [x] 5.2 Style the game UI in `src/styles.css`
- [x] 5.3 Create `src/ui.js` with functions to render game state, show turn results, display errors, and show end-game messages
- [x] 5.4 Add input handling: accept acres to plant, validate, and display errors for invalid input

## 6. Integration

- [x] 6.1 Wire everything together in `src/main.js`: initialize state, handle turn loop, connect UI to game logic
- [x] 6.2 Manual end-to-end playtest to verify full 10-turn game flow

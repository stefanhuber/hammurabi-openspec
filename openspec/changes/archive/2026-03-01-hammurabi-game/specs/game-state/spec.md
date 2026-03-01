## ADDED Requirements

### Requirement: Initial game state
The system SHALL create an initial game state with 2800 bushels of grain in stock, 100 people, 1000 acres of land, and turn number 1.

#### Scenario: New game starts with correct initial values
- **WHEN** a new game is started
- **THEN** the grain stock SHALL be 2800 bushels
- **THEN** the population SHALL be 100 people
- **THEN** the land SHALL be 1000 acres
- **THEN** the turn number SHALL be 1

### Requirement: Game lasts 10 turns
The game SHALL last exactly 10 turns. Each turn represents one year of ruling.

#### Scenario: Game ends successfully after 10 turns
- **WHEN** the player completes turn 10
- **THEN** the game SHALL end with a success result

#### Scenario: Turn number advances each year
- **WHEN** a turn is completed
- **THEN** the turn number SHALL increment by 1

### Requirement: Game state tracks resources
The game state SHALL track the current grain stock, population, land acres, and turn number at all times.

#### Scenario: State reflects resource changes after a turn
- **WHEN** a turn is processed
- **THEN** the game state SHALL reflect the updated grain stock based on seeds spent and grain harvested

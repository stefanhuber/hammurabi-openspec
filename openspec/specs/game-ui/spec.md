### Requirement: Display current game state
The UI SHALL display the current turn number, population, land acres, and grain stock to the player at the start of each turn.

#### Scenario: Player sees resource summary
- **WHEN** a new turn begins
- **THEN** the UI SHALL show the current turn number, population count, land acres, and bushels of grain in stock

### Requirement: Accept player input for planting
The UI SHALL provide an input mechanism for the player to specify how many acres to plant.

#### Scenario: Player enters acres to plant
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for acres to plant

#### Scenario: Invalid input is rejected
- **WHEN** the player enters a value that violates resource constraints (grain, people, or land)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Display turn results
After processing a turn, the UI SHALL display the harvest results including yield per acre and total grain harvested.

#### Scenario: Player sees harvest outcome
- **WHEN** a turn is processed
- **THEN** the UI SHALL show the yield per acre and total bushels harvested

### Requirement: Display end-game message
The UI SHALL display a message when the game ends.

#### Scenario: Success message after 10 turns
- **WHEN** the player completes 10 turns
- **THEN** the UI SHALL display a success/victory message

#### Scenario: Failure message when game cannot continue
- **WHEN** the player cannot continue (cannot complete 10 years)
- **THEN** the UI SHALL display a failure message

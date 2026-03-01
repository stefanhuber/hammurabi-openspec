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

### Requirement: Accept food allocation input
The UI SHALL provide an input mechanism for the player to specify how many bushels of grain to allocate as food.

#### Scenario: Player enters food allocation
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for bushels to allocate as food

#### Scenario: Invalid food allocation is rejected
- **WHEN** the player enters a food allocation that exceeds the available grain
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Display starvation results
The UI SHALL display starvation information in the turn results when people have starved.

#### Scenario: Starvation reported in turn results
- **WHEN** a turn is processed and people have starved
- **THEN** the UI SHALL show the number of people who starved

#### Scenario: No starvation reported when all fed
- **WHEN** a turn is processed and no one starved
- **THEN** the UI SHALL indicate that no one starved

### Requirement: Display immigration results
The UI SHALL display immigration information in the turn results when immigration occurs.

#### Scenario: Immigration reported in turn results
- **WHEN** a turn is processed and immigrants arrive
- **THEN** the UI SHALL show the number of immigrants who arrived

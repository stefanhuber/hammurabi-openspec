## ADDED Requirements

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

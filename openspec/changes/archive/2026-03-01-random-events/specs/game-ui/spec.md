## ADDED Requirements

### Requirement: Display plague results
The UI SHALL display plague information in the turn results when a plague occurs.

#### Scenario: Plague reported in turn results
- **WHEN** a turn is processed and a plague occurred
- **THEN** the UI SHALL show the number of people who died from the plague

#### Scenario: No plague reported when none occurred
- **WHEN** a turn is processed and no plague occurred
- **THEN** the UI SHALL NOT display any plague-related message

### Requirement: Display rat infestation results
The UI SHALL display rat infestation information in the turn results when rats ate part of the harvest.

#### Scenario: Rat infestation reported in turn results
- **WHEN** a turn is processed and a rat infestation occurred
- **THEN** the UI SHALL show the amount of grain destroyed by rats

#### Scenario: No rat infestation reported when none occurred
- **WHEN** a turn is processed and no rat infestation occurred
- **THEN** the UI SHALL NOT display any rat-related message

### Requirement: Display starvation defeat message
The UI SHALL display a specific defeat message when the game is lost due to excessive starvation.

#### Scenario: Starvation defeat message
- **WHEN** more than 45% of the population starves in a single turn
- **THEN** the UI SHALL display a defeat message indicating the ruler was overthrown due to mass starvation

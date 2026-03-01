## ADDED Requirements

### Requirement: Plague applied during turn processing
The plague event SHALL be evaluated and applied during turn processing, before starvation is calculated. When a plague occurs, the population SHALL be halved first, and all subsequent calculations (starvation, immigration) SHALL use the post-plague population.

#### Scenario: Plague reduces population before starvation
- **WHEN** a turn is processed and a plague occurs with a population of 100
- **THEN** the population SHALL be halved to 50 before starvation is calculated against food allocation

#### Scenario: No plague leaves population unchanged before starvation
- **WHEN** a turn is processed and no plague occurs
- **THEN** the full population SHALL be used for starvation and immigration calculations

### Requirement: Rat infestation applied to harvest
The rat infestation event SHALL be evaluated and applied to the harvested grain yield during turn processing.

#### Scenario: Rats reduce harvest yield
- **WHEN** a turn is processed and a rat infestation occurs
- **THEN** the rat destruction amount SHALL be subtracted from the total harvest before adding it to the grain stock

#### Scenario: No rats leaves harvest unchanged
- **WHEN** a turn is processed and no rat infestation occurs
- **THEN** the total harvest SHALL be added to the grain stock without any reduction

### Requirement: Starvation defeat threshold
If more than 45% of the population starves in a single turn, the game SHALL be immediately lost. When a plague occurs in the same turn, the 45% threshold SHALL be evaluated against the post-plague population (the population remaining after plague deaths).

#### Scenario: Starvation exceeds 45% threshold without plague
- **WHEN** no plague occurs and 46 out of 100 people starve in a single turn (46%)
- **THEN** the game SHALL be lost

#### Scenario: Starvation at exactly 45% does not trigger defeat
- **WHEN** no plague occurs and 45 out of 100 people starve in a single turn (45%)
- **THEN** the game SHALL NOT be lost due to the starvation threshold

#### Scenario: Starvation threshold evaluated against post-plague population
- **WHEN** a plague occurs, reducing 100 people to 50, and then 24 of those 50 starve (48%)
- **THEN** the game SHALL be lost because 48% exceeds the 45% threshold applied to the post-plague population of 50

#### Scenario: Starvation below threshold after plague
- **WHEN** a plague occurs, reducing 100 people to 50, and then 20 of those 50 starve (40%)
- **THEN** the game SHALL NOT be lost due to the starvation threshold

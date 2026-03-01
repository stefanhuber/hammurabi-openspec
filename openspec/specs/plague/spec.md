### Requirement: Plague probability
Each turn, there SHALL be a 15% chance of a plague occurring, determined by a uniform random distribution.

#### Scenario: Plague occurs
- **WHEN** the random value is less than 0.15
- **THEN** a plague SHALL occur

#### Scenario: No plague
- **WHEN** the random value is 0.15 or greater
- **THEN** no plague SHALL occur

### Requirement: Plague effect
When a plague occurs, half of the population (rounded down) SHALL die.

#### Scenario: Plague kills half the population
- **WHEN** a plague occurs and the population is 100
- **THEN** 50 people SHALL die from the plague, leaving 50 survivors

#### Scenario: Plague with odd population
- **WHEN** a plague occurs and the population is 51
- **THEN** 25 people SHALL die from the plague (floor of 51/2), leaving 26 survivors

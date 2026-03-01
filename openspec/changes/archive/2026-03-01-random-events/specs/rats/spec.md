## ADDED Requirements

### Requirement: Rat infestation probability
Each turn, there SHALL be a 40% chance of a rat infestation occurring, determined by a uniform random distribution.

#### Scenario: Rats occur
- **WHEN** the random value is less than 0.40
- **THEN** a rat infestation SHALL occur

#### Scenario: No rats
- **WHEN** the random value is 0.40 or greater
- **THEN** no rat infestation SHALL occur

### Requirement: Rat infestation effect
When a rat infestation occurs, rats SHALL destroy between 10% and 30% (inclusive) of the harvested grain yield. The exact percentage SHALL be chosen uniformly at random. The destroyed amount SHALL be rounded down to a whole number.

#### Scenario: Rats destroy minimum percentage of harvest
- **WHEN** a rat infestation occurs with the minimum destruction rate (10%) and the harvest is 500 bushels
- **THEN** 50 bushels SHALL be destroyed, leaving 450 bushels of harvest

#### Scenario: Rats destroy maximum percentage of harvest
- **WHEN** a rat infestation occurs with the maximum destruction rate (30%) and the harvest is 500 bushels
- **THEN** 150 bushels SHALL be destroyed, leaving 350 bushels of harvest

#### Scenario: Rats destroy a mid-range percentage of harvest
- **WHEN** a rat infestation occurs with a 20% destruction rate and the harvest is 300 bushels
- **THEN** 60 bushels SHALL be destroyed, leaving 240 bushels of harvest

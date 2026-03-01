### Requirement: One person requires 20 bushels per year
Each person in the city SHALL require 20 bushels of grain per year to not starve.

#### Scenario: Exactly enough food for everyone
- **WHEN** the city has 100 inhabitants and 2000 bushels are allocated as food
- **THEN** all 100 people SHALL be fed and no one starves

#### Scenario: Slightly insufficient food
- **WHEN** the city has 100 inhabitants and 1999 bushels are allocated as food
- **THEN** only 99 people SHALL be fed (floor(1999 / 20) = 99) and 1 person dies

### Requirement: People fed formula
The number of people fed SHALL be calculated as floor(grain allocated as food / 20).

#### Scenario: People fed calculation
- **WHEN** 500 bushels are allocated as food
- **THEN** 25 people SHALL be fed (floor(500 / 20) = 25)

#### Scenario: Zero grain allocated
- **WHEN** 0 bushels are allocated as food
- **THEN** 0 people SHALL be fed

### Requirement: Only fed people survive
Only the number of people who were fed SHALL survive to the next turn. The population SHALL be updated to equal the number of people fed.

#### Scenario: Population reduced by starvation
- **WHEN** the city has 100 inhabitants and only 60 people are fed
- **THEN** the population SHALL become 60 for the next turn (40 people died)

#### Scenario: No starvation when all are fed
- **WHEN** the city has 100 inhabitants and 100 or more people are fed
- **THEN** the population SHALL remain 100

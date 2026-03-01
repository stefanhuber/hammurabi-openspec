## ADDED Requirements

### Requirement: Immigration only when no one starves
Immigration SHALL only occur when no one in the city has starved during the current turn.

#### Scenario: Immigration happens when all are fed
- **WHEN** all people are fed and no one starves
- **THEN** immigration SHALL be calculated and new people arrive

#### Scenario: No immigration when people starve
- **WHEN** one or more people starve during the turn
- **THEN** no immigration SHALL occur and the immigrant count SHALL be 0

### Requirement: Immigration formula
The number of immigrants SHALL be calculated as floor((20 × acres + grain in storage) / (100 × population)), where grain in storage is the remaining grain before harvest — the grain left after deducting food allocation and seed costs.

#### Scenario: Immigration calculation
- **WHEN** the city has 1000 acres, the player started with 2800 bushels, allocated 2000 for food and 250 for seeds (500 acres × 0.5), leaving 550 bushels in storage before harvest, and the population is 100
- **THEN** the number of immigrants SHALL be floor((20 × 1000 + 550) / (100 × 100)) = floor(20550 / 10000) = 2

#### Scenario: Immigration with small population
- **WHEN** the city has 1000 acres, 800 bushels remaining in storage before harvest, and 50 people
- **THEN** the number of immigrants SHALL be floor((20 × 1000 + 800) / (100 × 50)) = floor(20800 / 5000) = 4

### Requirement: Immigrants increase population
The immigrant count SHALL be added to the population after immigration is calculated.

#### Scenario: Population grows by immigrant count
- **WHEN** 2 immigrants arrive and the current population is 100
- **THEN** the population SHALL become 102

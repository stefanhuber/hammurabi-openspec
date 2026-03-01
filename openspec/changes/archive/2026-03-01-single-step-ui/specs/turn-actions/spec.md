## MODIFIED Requirements

### Requirement: Player allocates grain for food
Each turn, the player SHALL decide how many bushels of grain to allocate as food for the population. This input is provided simultaneously with land trade and planting inputs, and validated upon form submission.

#### Scenario: Player allocates grain for food
- **WHEN** the player submits the turn input form
- **THEN** the system SHALL use the specified food allocation value

#### Scenario: Food allocation cannot exceed grain stock after land trade
- **WHEN** the player has 2800 bushels of grain and buys 100 acres at 20 bushels each (spending 2000)
- **THEN** the player SHALL NOT be able to allocate more than 800 bushels as food

### Requirement: Remaining grain available for planting
After accounting for land trade costs and food allocation, the remaining grain SHALL be available for purchasing seeds to plant acres.

#### Scenario: Grain for seeds is reduced by trade and food allocation
- **WHEN** the player has 2800 bushels, buys 50 acres at 20 bushels each (spending 1000), and allocates 1000 as food
- **THEN** only 800 bushels SHALL be available for seeds (allowing up to 1600 acres to be planted)

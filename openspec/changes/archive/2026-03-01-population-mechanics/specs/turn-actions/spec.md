## ADDED Requirements

### Requirement: Player allocates grain for food
Each turn, the player SHALL decide how many bushels of grain to allocate as food for the population before choosing acres to plant.

#### Scenario: Player allocates grain for food
- **WHEN** the player is prompted for input
- **THEN** the player SHALL specify how many bushels of grain to allocate as food

#### Scenario: Food allocation cannot exceed grain stock
- **WHEN** the player has 2800 bushels of grain
- **THEN** the player SHALL NOT be able to allocate more than 2800 bushels as food

### Requirement: Remaining grain available for planting
After allocating grain for food, the remaining grain SHALL be available for purchasing seeds to plant acres.

#### Scenario: Grain for seeds is reduced by food allocation
- **WHEN** the player has 2800 bushels and allocates 2000 as food
- **THEN** only 800 bushels SHALL be available for seeds (allowing up to 1600 acres to be planted)

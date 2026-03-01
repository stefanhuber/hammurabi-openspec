### Requirement: Player decides acres to plant
Each turn, the player SHALL decide how many acres of land to plant with seeds.

#### Scenario: Player chooses to plant a valid number of acres
- **WHEN** the player chooses to plant a number of acres
- **THEN** the system SHALL accept the input if the player has enough grain for seeds, enough people to harvest, and enough land

### Requirement: Planting costs 0.5 bushels per acre
Planting an acre SHALL require 0.5 bushels of grain as seeds, which are deducted from the grain stock.

#### Scenario: Seed cost is deducted from grain stock
- **WHEN** the player plants 100 acres
- **THEN** 50 bushels of grain SHALL be deducted from the stock (100 x 0.5)

#### Scenario: Player cannot plant more acres than grain allows
- **WHEN** the player has 100 bushels of grain
- **THEN** the player SHALL NOT be able to plant more than 200 acres (100 / 0.5)

### Requirement: One person harvests 10 acres
One person SHALL be able to harvest 10 acres of land per year. The player SHALL NOT be able to plant more acres than the population can harvest.

#### Scenario: Population limits plantable acres
- **WHEN** the population is 100 people
- **THEN** the player SHALL NOT be able to plant more than 1000 acres (100 x 10)

#### Scenario: Workforce constraint with small population
- **WHEN** the population is 50 people
- **THEN** the player SHALL NOT be able to plant more than 500 acres (50 x 10)

### Requirement: Land limits planting
The player SHALL NOT be able to plant more acres than the city owns.

#### Scenario: Cannot plant more than available land
- **WHEN** the city has 1000 acres of land
- **THEN** the player SHALL NOT be able to plant more than 1000 acres

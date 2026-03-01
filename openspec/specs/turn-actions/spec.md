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

### Requirement: Land trading is the first action each turn
The player SHALL buy or sell land as the first action each turn, before allocating grain for food and choosing acres to plant.

#### Scenario: Turn order starts with land trading
- **WHEN** a new turn begins
- **THEN** the player SHALL first be presented with the land price and the option to buy or sell before any other decisions

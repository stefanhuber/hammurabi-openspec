## ADDED Requirements

### Requirement: Land price determination
Each turn, the price of an acre of land SHALL be determined by a uniform distribution between 17 and 26 bushels of grain, with a 10% chance for each value.

#### Scenario: Price is within valid range
- **WHEN** a new turn begins
- **THEN** the land price SHALL be between 17 and 26 bushels per acre

#### Scenario: Each price value has equal probability
- **WHEN** the land price is generated
- **THEN** each value from 17 to 26 SHALL have exactly a 10% chance of being selected

### Requirement: Buying land
The player SHALL be able to buy acres of land at the current price. Buying land SHALL deduct grain from stock (price × acres bought) and increase the city's land by the number of acres bought.

#### Scenario: Buying land deducts grain and adds land
- **WHEN** the player buys 50 acres at a price of 20 bushels per acre
- **THEN** 1000 bushels SHALL be deducted from the grain stock and 50 acres SHALL be added to the city's land

#### Scenario: Cannot buy more than affordable
- **WHEN** the player has 500 bushels and the price is 20 per acre
- **THEN** the player SHALL NOT be able to buy more than 25 acres (500 / 20 = 25)

### Requirement: Selling land
The player SHALL be able to sell acres of land at the current price. Selling land SHALL add grain to stock (price × acres sold) and decrease the city's land by the number of acres sold.

#### Scenario: Selling land adds grain and removes land
- **WHEN** the player sells 100 acres at a price of 22 bushels per acre
- **THEN** 2200 bushels SHALL be added to the grain stock and 100 acres SHALL be removed from the city's land

#### Scenario: Cannot sell more than owned
- **WHEN** the city has 1000 acres
- **THEN** the player SHALL NOT be able to sell more than 1000 acres

### Requirement: Grain from selling is immediately available
When selling land, the grain received SHALL be immediately available for use as food or seeds in the same turn.

#### Scenario: Sold grain available for food allocation
- **WHEN** the player has 100 bushels, sells 50 acres at 20 per acre
- **THEN** the player SHALL have 1100 bushels available for food and seed allocation

### Requirement: Grain spent buying is unavailable for food or seeds
When buying land, the grain spent SHALL NOT be available for food allocation or planting seeds.

#### Scenario: Bought grain unavailable for food
- **WHEN** the player has 2800 bushels and buys 50 acres at 20 per acre
- **THEN** only 1800 bushels SHALL be available for food and seed allocation

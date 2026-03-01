### Requirement: Harvest yield per acre
Each planted acre that is taken care of by a person SHALL yield between 2 and 6 bushels of grain.

#### Scenario: Minimum harvest yield
- **WHEN** acres are harvested
- **THEN** each acre SHALL yield at least 2 bushels of grain

#### Scenario: Maximum harvest yield
- **WHEN** acres are harvested
- **THEN** each acre SHALL yield at most 6 bushels of grain

### Requirement: Uniform probability distribution for yield
The yield per acre SHALL be determined by a uniform probability distribution where each value (2, 3, 4, 5, 6) has a 20% chance of being selected.

#### Scenario: Each yield value has equal probability
- **WHEN** the harvest yield is calculated
- **THEN** each value from 2 to 6 SHALL have exactly a 20% chance of being selected

### Requirement: Harvested grain added to stock
The total harvested grain (acres planted x yield per acre) SHALL be added to the grain stock.

#### Scenario: Grain stock increases by harvest amount
- **WHEN** 200 acres are planted and the yield is 4 bushels per acre
- **THEN** 800 bushels (200 x 4) SHALL be added to the grain stock

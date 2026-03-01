## ADDED Requirements

### Requirement: Display land price
The UI SHALL display the current land price per acre at the start of each turn.

#### Scenario: Player sees land price
- **WHEN** a new turn begins
- **THEN** the UI SHALL show the current price of land in bushels per acre

### Requirement: Accept land trade input
The UI SHALL provide input mechanisms for the player to specify acres to buy and acres to sell.

#### Scenario: Player enters acres to buy
- **WHEN** the player is prompted for land trading
- **THEN** the UI SHALL accept a numeric value for acres to buy

#### Scenario: Player enters acres to sell
- **WHEN** the player is prompted for land trading
- **THEN** the UI SHALL accept a numeric value for acres to sell

#### Scenario: Invalid land trade is rejected
- **WHEN** the player enters a trade that exceeds constraints (not enough grain to buy or not enough land to sell)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Display land trade results
The UI SHALL display the results of the land trade in the turn report.

#### Scenario: Buy trade shown in results
- **WHEN** the player bought land during the turn
- **THEN** the UI SHALL show how many acres were bought and the total cost

#### Scenario: Sell trade shown in results
- **WHEN** the player sold land during the turn
- **THEN** the UI SHALL show how many acres were sold and the total revenue

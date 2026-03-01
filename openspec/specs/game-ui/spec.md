### Requirement: Display current game state
The UI SHALL display the current turn number, population, land acres, and grain stock to the player at the start of each turn.

#### Scenario: Player sees resource summary
- **WHEN** a new turn begins
- **THEN** the UI SHALL show the current turn number, population count, land acres, and bushels of grain in stock

### Requirement: Accept player input for planting
The UI SHALL provide an input mechanism for the player to specify how many acres to plant as part of a single combined input form alongside land trade and food allocation inputs.

#### Scenario: Player enters acres to plant
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for acres to plant within the same form as all other turn inputs

#### Scenario: Invalid input is rejected
- **WHEN** the player enters a value that violates resource constraints (grain, people, or land)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Display turn results
After processing a turn, the UI SHALL display the harvest results including yield per acre and total grain harvested.

#### Scenario: Player sees harvest outcome
- **WHEN** a turn is processed
- **THEN** the UI SHALL show the yield per acre and total bushels harvested

### Requirement: Display end-game message
The UI SHALL display a message when the game ends.

#### Scenario: Success message after 10 turns
- **WHEN** the player completes 10 turns
- **THEN** the UI SHALL display a success/victory message

#### Scenario: Failure message when game cannot continue
- **WHEN** the player cannot continue (cannot complete 10 years)
- **THEN** the UI SHALL display a failure message

### Requirement: Accept food allocation input
The UI SHALL provide an input mechanism for the player to specify how many bushels of grain to allocate as food as part of a single combined input form.

#### Scenario: Player enters food allocation
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for bushels to allocate as food within the same form as all other turn inputs

#### Scenario: Invalid food allocation is rejected
- **WHEN** the player enters a food allocation that exceeds the available grain (after land trade)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Single combined input form
The UI SHALL present all four player inputs (acres to buy, acres to sell, food allocation, acres to plant) in a 2x2 grid layout within a single form section with one submit button. Each input SHALL be labelled with a short descriptive term instead of a full question. There SHALL be visible margin between the input grid and the submit button.

#### Scenario: All inputs visible at once
- **WHEN** a new turn begins and the input phase is shown
- **THEN** the UI SHALL display the land price, and a 2x2 grid containing the buy acres input, sell acres input, food allocation input, and acres to plant input together in one visible section

#### Scenario: Short labels on inputs
- **WHEN** the input phase is shown
- **THEN** each input field SHALL have a short descriptive label (not a full question sentence) visible above or beside it

#### Scenario: Grid layout
- **WHEN** the input phase is shown
- **THEN** the four input fields SHALL be arranged in a 2-column, 2-row grid

#### Scenario: Land price spacing
- **WHEN** the input phase is shown
- **THEN** there SHALL be visible margin between the land price display and the top of the input grid

#### Scenario: Submit button spacing
- **WHEN** the input phase is shown
- **THEN** there SHALL be visible margin between the bottom of the input grid and the submit button

#### Scenario: Default input values
- **WHEN** a new turn begins or the game is restarted
- **THEN** all four input fields SHALL default to 0

#### Scenario: Single submit action
- **WHEN** the player has filled in their desired values
- **THEN** the player SHALL click a single submit button to process all inputs at once

#### Scenario: Validation on submit
- **WHEN** the player clicks the submit button
- **THEN** the UI SHALL validate all inputs (land trade, food allocation, acres to plant) in sequence and display the first error encountered, if any

### Requirement: No multi-step input phases
The UI SHALL NOT use a multi-step process to collect player inputs within a single turn.

#### Scenario: No intermediate trade step
- **WHEN** the player is entering turn decisions
- **THEN** the UI SHALL NOT require a separate trade confirmation before showing food and planting inputs

### Requirement: Display starvation results
The UI SHALL display starvation information in the turn results when people have starved.

#### Scenario: Starvation reported in turn results
- **WHEN** a turn is processed and people have starved
- **THEN** the UI SHALL show the number of people who starved

#### Scenario: No starvation reported when all fed
- **WHEN** a turn is processed and no one starved
- **THEN** the UI SHALL indicate that no one starved

### Requirement: Display immigration results
The UI SHALL display immigration information in the turn results when immigration occurs.

#### Scenario: Immigration reported in turn results
- **WHEN** a turn is processed and immigrants arrive
- **THEN** the UI SHALL show the number of immigrants who arrived

### Requirement: Display plague results
The UI SHALL display plague information in the turn results when a plague occurs.

#### Scenario: Plague reported in turn results
- **WHEN** a turn is processed and a plague occurred
- **THEN** the UI SHALL show the number of people who died from the plague

#### Scenario: No plague reported when none occurred
- **WHEN** a turn is processed and no plague occurred
- **THEN** the UI SHALL NOT display any plague-related message

### Requirement: Display rat infestation results
The UI SHALL display rat infestation information in the turn results when rats ate part of the harvest.

#### Scenario: Rat infestation reported in turn results
- **WHEN** a turn is processed and a rat infestation occurred
- **THEN** the UI SHALL show the amount of grain destroyed by rats

#### Scenario: No rat infestation reported when none occurred
- **WHEN** a turn is processed and no rat infestation occurred
- **THEN** the UI SHALL NOT display any rat-related message

### Requirement: Display starvation defeat message
The UI SHALL display a specific defeat message when the game is lost due to excessive starvation.

#### Scenario: Starvation defeat message
- **WHEN** more than 45% of the population starves in a single turn
- **THEN** the UI SHALL display a defeat message indicating the ruler was overthrown due to mass starvation

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

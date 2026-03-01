## MODIFIED Requirements

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

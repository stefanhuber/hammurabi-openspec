## MODIFIED Requirements

### Requirement: Accept player input for planting
The UI SHALL provide an input mechanism for the player to specify how many acres to plant as part of a single combined input form alongside land trade and food allocation inputs.

#### Scenario: Player enters acres to plant
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for acres to plant within the same form as all other turn inputs

#### Scenario: Invalid input is rejected
- **WHEN** the player enters a value that violates resource constraints (grain, people, or land)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

### Requirement: Accept food allocation input
The UI SHALL provide an input mechanism for the player to specify how many bushels of grain to allocate as food as part of a single combined input form.

#### Scenario: Player enters food allocation
- **WHEN** the player is prompted for input
- **THEN** the UI SHALL accept a numeric value for bushels to allocate as food within the same form as all other turn inputs

#### Scenario: Invalid food allocation is rejected
- **WHEN** the player enters a food allocation that exceeds the available grain (after land trade)
- **THEN** the UI SHALL display an error message and allow the player to re-enter

## ADDED Requirements

### Requirement: Single combined input form
The UI SHALL present all four player inputs (acres to buy, acres to sell, food allocation, acres to plant) in a single form section with one submit button.

#### Scenario: All inputs visible at once
- **WHEN** a new turn begins and the input phase is shown
- **THEN** the UI SHALL display the land price, buy acres input, sell acres input, food allocation input, and acres to plant input together in one visible section

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

## REMOVED Requirements

### Requirement: Land trade has separate confirmation
**Reason**: Replaced by the single combined input form. The land trade inputs are now part of the unified form and validated together on the single submit action.
**Migration**: Land trade inputs are included in the combined form section; the separate "Trade" button and trade phase are removed.

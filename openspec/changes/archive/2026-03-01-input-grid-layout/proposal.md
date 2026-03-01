## Why

The player input section stacks four labelled fields vertically with no spacing before the submit button, making the form look cramped and unpolished. Reorganising the inputs into a compact 2x2 grid with short labels and adding margin before the button will make the turn-input area cleaner and easier to scan.

## What Changes

- Replace the four vertical `<label>` + `<input>` pairs with a 2x2 CSS grid of compact input fields
- Replace verbose question labels (e.g. "How many acres do you wish to buy?") with short inline labels (e.g. "Buy acres", "Sell acres", "Feed (bushels)", "Plant acres")
- Add visible margin/gap between the input grid and the submit button
- Add visible margin between the "Land price" display and the input grid
- Set default value of 0 on all four input fields

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `game-ui`: Input form layout changes from vertical stack to 2x2 grid with short labels and spacing before the submit button

## Impact

- `index.html` — restructure the `#player-input` section markup
- `src/styles.css` — add grid layout styles, update label/input styling, add button margin
- `src/ui.js` — update `resetUI`/`showInputPhase` to reset all inputs to `"0"` instead of `""`
- No element ID changes; selectors remain unaffected

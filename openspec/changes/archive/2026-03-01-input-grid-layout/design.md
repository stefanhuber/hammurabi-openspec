## Context

The player input section currently renders four full-width `<label>`/`<input>` pairs stacked vertically, followed immediately by the submit button with no spacing. The verbose question-style labels ("How many acres do you wish to buy?") take up visual space and make the form feel long. The layout is functional but visually cramped.

## Goals / Non-Goals

**Goals:**

- Arrange the four input fields in a 2x2 CSS grid layout
- Replace verbose question labels with short descriptive labels (e.g. "Buy acres")
- Add clear margin between the input grid and the submit button
- Add spacing between the "Land price" text and the input grid
- Default all four input fields to 0
- Preserve all existing element IDs so `ui.js` selectors remain unchanged

**Non-Goals:**

- Changing any game logic or validation behaviour
- Responsive/mobile-first redesign — the grid should simply work within the existing 600px max-width
- Adding new input types or controls

## Decisions

### 1. CSS Grid for layout

Use `display: grid; grid-template-columns: 1fr 1fr` on a wrapper div around the four input fields. This gives a clean 2x2 layout without extra markup complexity.

**Alternative considered:** Flexbox with `flex-wrap: wrap` — requires explicit width percentages and is less semantically clear for a fixed 2-column layout.

### 2. Short inline labels

Replace the standalone `<label>` elements with short text rendered above each input inside the same grid cell. Each input gets a wrapping `<div>` containing a short `<label>` and the `<input>`. Labels: "Buy acres", "Sell acres", "Feed (bushels)", "Plant acres".

### 3. Spacing via CSS only

Add `margin-top` to `#submit-btn` and `margin-top` on `.input-grid` to space the grid from the land price line and from the button. No structural HTML changes needed.

### 4. Default input values

Set `value="0"` on the food and plant inputs in `index.html` (buy and sell already have `value="0"`). Update `resetUI` and `showInputPhase` in `ui.js` to reset all four inputs to `"0"` instead of `""`.

## Risks / Trade-offs

- **[Narrow inputs on small screens]** → The 2-column grid keeps inputs narrow. Mitigated by the existing `max-width: 600px` container — at 300px per column the number inputs are still comfortable.
- **[Label brevity may reduce clarity for first-time players]** → Short labels like "Feed (bushels)" are less self-explanatory than the original questions. Mitigated by the fact that the game state section already shows resource names, and the land price line provides context.

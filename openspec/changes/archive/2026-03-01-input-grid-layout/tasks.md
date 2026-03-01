## 1. HTML Markup

- [x] 1.1 Replace the four `<label>` + `<div class="input-row">` pairs in `#player-input` with a `<div class="input-grid">` containing four cells, each with a short `<label>` and `<input>` (preserve existing input IDs)
- [x] 1.2 Add `margin-top` wrapper or class to `#submit-btn` so there is visible spacing between the grid and the button

## 2. CSS Styling

- [x] 2.1 Add `.input-grid` rule with `display: grid; grid-template-columns: 1fr 1fr` and appropriate gap
- [x] 2.2 Style the short labels (smaller, non-bold or lighter weight) and inputs within each grid cell
- [x] 2.3 Add `margin-top` to `#submit-btn` for spacing below the grid
- [x] 2.4 Remove or update now-unused label/input-row styles

## 3. Land Price Spacing

- [x] 3.1 Add `margin-bottom` to the land price `<p>` or `margin-top` to `.input-grid` to create visible space between them

## 4. Default Input Values

- [x] 4.1 Set `value="0"` on the food and plant `<input>` elements in `index.html`
- [x] 4.2 Update `resetUI` and `showInputPhase` in `src/ui.js` to reset food and plant inputs to `"0"` instead of `""`

## 5. Verification

- [x] 5.1 Run `npm test` to confirm no tests break
- [x] 5.2 Run `npm run lint` to confirm no lint errors
- [ ] 5.3 Visually verify the 2x2 grid layout, land price spacing, button spacing, and default values in the dev server

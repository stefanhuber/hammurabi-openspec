## ADDED Requirements

### Requirement: Deploy workflow triggers on pushes to main
The deploy workflow SHALL run on pushes to the `main` branch.

#### Scenario: Push to main triggers deployment
- **WHEN** code is pushed to the `main` branch
- **THEN** the deploy workflow SHALL execute

#### Scenario: Push to other branches does not trigger deployment
- **WHEN** code is pushed to a branch other than `main`
- **THEN** the deploy workflow SHALL NOT execute

### Requirement: Deploy workflow builds for production
The deploy workflow SHALL run a production build using Vite with the correct base path for GitHub Pages.

#### Scenario: Production build with correct base path
- **WHEN** the deploy workflow builds the project
- **THEN** it SHALL produce build output with asset URLs relative to `/hammurabi-openspec/`

### Requirement: Deploy workflow publishes to GitHub Pages
The deploy workflow SHALL deploy the production build output to GitHub Pages using the official GitHub Actions.

#### Scenario: Successful deployment
- **WHEN** the production build succeeds
- **THEN** the build output SHALL be uploaded as a Pages artifact and deployed to GitHub Pages

#### Scenario: Build failure prevents deployment
- **WHEN** the production build fails
- **THEN** the deploy workflow SHALL fail and NOT deploy to GitHub Pages

### Requirement: CI workflow triggers on PRs to main
The CI workflow SHALL run on pull requests targeting the `main` branch.

#### Scenario: PR opened to main triggers CI
- **WHEN** a pull request is opened or updated targeting the `main` branch
- **THEN** the CI workflow SHALL execute

#### Scenario: PR to other branches does not trigger CI
- **WHEN** a pull request is opened targeting a branch other than `main`
- **THEN** the CI workflow SHALL NOT execute

### Requirement: CI workflow runs build step
The CI workflow SHALL run `npm run build` to verify the project builds successfully.

#### Scenario: Build step succeeds
- **WHEN** the CI workflow executes
- **THEN** it SHALL run `npm run build` and pass if the build completes without errors

#### Scenario: Build step fails
- **WHEN** the CI workflow executes and the build fails
- **THEN** the workflow SHALL fail and report the build error

### Requirement: CI workflow runs test step
The CI workflow SHALL run `npm run test` to execute all unit tests.

#### Scenario: Tests pass
- **WHEN** the CI workflow executes
- **THEN** it SHALL run `npm run test` and pass if all tests succeed

#### Scenario: Tests fail
- **WHEN** the CI workflow executes and a test fails
- **THEN** the workflow SHALL fail and report the test failure

### Requirement: CI workflow runs lint step
The CI workflow SHALL run `npm run lint` to check code style and quality.

#### Scenario: Linting passes
- **WHEN** the CI workflow executes
- **THEN** it SHALL run `npm run lint` and pass if no lint errors are found

#### Scenario: Linting fails
- **WHEN** the CI workflow executes and lint errors are found
- **THEN** the workflow SHALL fail and report the lint errors

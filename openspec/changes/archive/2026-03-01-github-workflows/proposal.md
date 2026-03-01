## Why

The project has no CI/CD pipeline. Pull requests to `main` can introduce broken builds, failing tests, or code style violations without detection. Additionally, there is no automated deployment — the game should be publicly accessible via GitHub Pages.

## What Changes

- Add a GitHub Actions workflow (`ci.yml`) that runs on pull requests to `main`, executing build, test, and lint steps
- Add a GitHub Actions workflow (`deploy.yml`) that runs on pushes to `main`, building the project for production and deploying the result to GitHub Pages
- Add an npm `lint` script to `package.json` for running ESLint

## Capabilities

### New Capabilities
- `ci-pipeline`: GitHub Actions workflow that validates PRs to main by running build, test, and lint steps
- `deploy-pipeline`: GitHub Actions workflow that builds for production and deploys to GitHub Pages on pushes to main

### Modified Capabilities

## Impact

- New files: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
- Modified: `package.json` (add `lint` script)
- Requires GitHub Pages to be enabled on the repository (source: GitHub Actions)
- Repository: https://github.com/stefanhuber/hammurabi-openspec

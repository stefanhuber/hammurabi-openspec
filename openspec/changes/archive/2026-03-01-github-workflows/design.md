## Context

The project is a Vite-based static web app hosted at https://github.com/stefanhuber/hammurabi-openspec. It has `build`, `test` scripts and ESLint/Prettier installed, but no `lint` script and no CI/CD configuration. GitHub Pages needs to be enabled with "GitHub Actions" as the source.

## Goals / Non-Goals

**Goals:**
- Automate quality checks (build, test, lint) on every PR to `main`
- Automate production deployment to GitHub Pages on every push to `main`
- Use Vite's build output for the GitHub Pages deployment

**Non-Goals:**
- No custom domain configuration
- No caching or performance optimization of the workflows beyond standard practices
- No branch protection rules (that's a repository settings concern, not a workflow concern)

## Decisions

### 1. Two separate workflow files

**Decision**: Use two independent workflow files — `ci.yml` for PR checks and `deploy.yml` for deployment.

**Rationale**: Separation of concerns. The CI workflow runs on PRs and blocks merging. The deploy workflow runs on pushes to `main` and handles deployment. They have different triggers and different purposes.

**Alternatives considered**: Single workflow with conditional jobs — rejected because it combines unrelated triggers and is harder to maintain.

### 2. Use official GitHub Actions for Pages deployment

**Decision**: Use `actions/upload-pages-artifact` and `actions/deploy-pages` for the deployment workflow.

**Rationale**: These are the official GitHub-provided actions for Pages deployment via GitHub Actions. They handle artifact upload and deployment correctly without manual configuration.

### 3. Vite base path configuration

**Decision**: Configure Vite's `base` option to `"/hammurabi-openspec/"` for production builds, matching the GitHub Pages URL path.

**Rationale**: GitHub Pages serves project sites at `https://<user>.github.io/<repo>/`. Vite needs to know this base path so asset URLs resolve correctly.

### 4. Add lint script to package.json

**Decision**: Add `"lint": "eslint src/"` script to package.json so the CI workflow can run `npm run lint`.

**Rationale**: The project has ESLint configured but no npm script to invoke it. A dedicated script keeps the workflow simple and matches the existing `test` and `build` scripts pattern.

## Risks / Trade-offs

- [GitHub Pages must be configured in repo settings to use "GitHub Actions" as source] → Document this as a prerequisite in the workflow file comments.
- [Vite base path only needed for GitHub Pages, not local dev] → Use Vite config to set `base` only for production builds, keeping local dev unaffected.

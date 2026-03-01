## 1. Project Configuration

- [x] 1.1 Add `"lint": "eslint src/"` script to `package.json`
- [x] 1.2 Create `vite.config.js` with `base: "/hammurabi-openspec/"` for production builds

## 2. CI Workflow

- [x] 2.1 Create `.github/workflows/ci.yml` with trigger on pull requests to `main`
- [x] 2.2 Add job steps: checkout, Node.js setup, `npm ci`, `npm run lint`, `npm run test`, `npm run build`

## 3. Deploy Workflow

- [x] 3.1 Create `.github/workflows/deploy.yml` with trigger on pushes to `main`
- [x] 3.2 Add build job: checkout, Node.js setup, `npm ci`, `npm run build`
- [x] 3.3 Add deploy job: upload pages artifact from `dist/`, deploy to GitHub Pages using official actions
- [x] 3.4 Configure workflow permissions for `pages: write` and `id-token: write`

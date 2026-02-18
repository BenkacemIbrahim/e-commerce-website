# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] - 2026-02-18

### Added
- Full repository documentation set (`README`, architecture, API, LinkedIn portfolio copy)
- Community and governance files (`LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `SECURITY`)
- GitHub workflow and collaboration templates
- Root repository hygiene files (`.gitignore`, `.editorconfig`, `.gitattributes`)

### Changed
- Standardized frontend and backend package metadata and scripts
- Enabled strict frontend build type checking (removed `ignoreBuildErrors`)
- Fixed invalid JSX attribute in `frontend/components/hero.tsx`
- Updated footer copyright year to be dynamic

### Removed
- Tracked generated artifacts and local-only files from git history moving forward:
  - `backend/node_modules`
  - `backend/dist`
  - `backend/.env`
  - `frontend/pnpm-lock.yaml`

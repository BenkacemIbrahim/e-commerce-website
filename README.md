# AetherCart

AetherCart is a full-stack e-commerce project with a polished storefront UI, admin dashboard experience, and a production-style REST API.

This repository contains:
- `frontend`: Next.js 16 + React 19 storefront and admin interface
- `backend`: Express + TypeScript + MongoDB API with JWT authentication

## Features
- Multi-page storefront (home, category pages, product details, sale, cart, wishlist)
- Admin dashboard UX for products, orders, customers, categories, analytics, and settings
- Backend API modules for auth, catalog, cart, wishlist, orders, and admin analytics
- JWT access + refresh token workflow
- Zod validation and centralized API error handling
- Seed script for fast local setup

Note: the current admin UI in `frontend` uses mock data and local session logic for demo UX. The `backend` provides real API endpoints and can be integrated as the next step.

## Tech Stack
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Radix UI, shadcn/ui
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Zod
- Tooling: npm, TypeScript, GitHub Actions

## Repository Structure
```text
.
|- frontend/         # Next.js app
|- backend/          # Express API
|- docs/             # Architecture, API, and portfolio docs
|- .github/          # CI workflow and templates
```

## Quick Start

1. Install dependencies
```bash
cd backend && npm ci
cd ../frontend && npm ci
```

2. Configure environment
```bash
cd backend
cp .env.example .env
```

3. Run locally
```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

4. Open
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:4000/health`

## Environment Variables (Backend)

Use `backend/.env.example` as the source of truth.

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port (default: `4000`) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Access token signing secret |
| `JWT_REFRESH_SECRET` | Yes | Refresh token signing secret |
| `CORS_ORIGIN` | Yes | Allowed frontend origin |
| `RATE_LIMIT_WINDOW_MS` | No | Rate limit window in ms |
| `RATE_LIMIT_MAX` | No | Max requests per window |
| `UPLOAD_DIR` | No | Upload path for assets |
| `ADMIN_DEFAULT_EMAIL` | No | Seeded admin account email |
| `ADMIN_DEFAULT_PASSWORD` | No | Seeded admin account password |

## Scripts

### Frontend (`frontend`)
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run typecheck`
- `npm run lint` (mapped to typecheck)

### Backend (`backend`)
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run typecheck`
- `npm run seed`

## Documentation
- Architecture: `docs/ARCHITECTURE.md`
- API reference: `docs/API_REFERENCE.md`
- LinkedIn portfolio copy: `docs/LINKEDIN_FEATURE.md`

## Production Notes
- Never commit real secrets. Keep only `.env.example` in git.
- This repo is now configured to ignore generated folders and dependencies.
- CI validates both backend and frontend builds on push and pull request.

## License
MIT License. See `LICENSE`.

# E‑Commerce Website

Full‑stack e‑commerce application with a modern Next.js frontend and a TypeScript/Express/MongoDB backend. This repository contains two apps:

- `frontend`: Next.js 16 app with a customer storefront and admin UI
- `backend`: Express API in TypeScript with JWT auth and MongoDB via Mongoose

## Tech Stack
- Frontend: `Next.js 16`, `React 19`, `TypeScript`, `Tailwind CSS`, `Radix UI`, `shadcn/ui`
- Backend: `Node.js`, `Express`, `TypeScript`, `Mongoose`, `JWT`, `Zod`
- Tooling: `pnpm` or `npm`, `ESLint`, `PostCSS`

## Monorepo Structure
```
e-commerce-website-design-5/
  frontend/   # Next.js app
  backend/    # Express + TypeScript API
```

## Prerequisites
- Node.js 18+ recommended
- MongoDB running locally or a cloud URI
- `pnpm` or `npm` installed

## Quick Start

1. Install dependencies
   - `cd backend && npm install`
   - `cd ../frontend && npm install`

2. Configure environment (backend)
   - Copy `backend/.env.example` to `backend/.env`
   - Set values for your environment

3. Run the apps
   - Backend: `cd backend && npm run dev` (default `http://localhost:4000`)
   - Frontend: `cd frontend && npm run dev` (default `http://localhost:3000`)

## Backend Configuration

The API reads the following environment variables:

```
PORT=4000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=replace-with-strong-secret
JWT_REFRESH_SECRET=replace-with-strong-refresh-secret
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
UPLOAD_DIR=uploads
ADMIN_DEFAULT_EMAIL=admin@example.com
ADMIN_DEFAULT_PASSWORD=StrongPassword123!
```

- Health check: `GET /health` → `{ status: "ok" }`
- Main routes are under `/api/*` (auth, products, categories, brands, orders, cart, wishlist, analytics, settings, admin/customers)

### Seeding Data
Run `npm run seed` in `backend` to populate development data.

### Build and Start (Production)
- Build: `cd backend && npm run build`
- Start: `npm run start`

## Frontend Notes
- Next.js app runs at `http://localhost:3000`
- Uses Tailwind CSS and Radix UI components
- Admin pages are under `/admin/*`

### Scripts
- `npm run dev` → start dev server
- `npm run build` → production build
- `npm run start` → start production server
- `npm run lint` → lint workspace

## Development Tips
- Keep `backend/.env` secure; only commit `backend/.env.example`
- See `.gitignore` files in both apps for ignored paths
- When changing API base URL, update `CORS_ORIGIN` accordingly

## License
No license specified. Add one if you plan to distribute.

# Architecture Overview

## System Summary
AetherCart is split into two independent applications:
- `frontend`: Next.js app for storefront and admin UI
- `backend`: Express REST API using MongoDB

The frontend and backend are currently decoupled for faster UI iteration. The backend is production-oriented, while admin frontend screens currently use local mock data.

## Frontend Architecture
- Framework: Next.js App Router
- UI: Tailwind CSS + Radix UI + shadcn/ui
- Route groups:
  - Storefront pages (`/`, `/women`, `/men`, `/kids`, `/sports`, `/brands`, `/new`, `/sale`)
  - Customer utility pages (`/cart`, `/wishlist`, `/login`, `/register`)
  - Admin pages (`/admin/*`)
- Data strategy:
  - Storefront and admin are currently demo-driven
  - Admin pages consume `frontend/lib/mock-data.ts`
  - Admin auth uses client-side local storage (`frontend/lib/admin-auth.ts`)

## Backend Architecture
- Runtime: Node.js + Express + TypeScript
- Database: MongoDB via Mongoose models
- Security and middleware:
  - `helmet`
  - `cors`
  - `express-rate-limit`
  - JWT auth middleware
  - Centralized error handling
- Validation:
  - Zod schema validation in controllers

### Backend Layers
- Routes: request mapping and middleware composition
- Controllers: input parsing, business logic, response formatting
- Models: Mongoose schema definitions
- Utils: JWT signing and verification
- Seed script: initial admin, categories, brands, and products

## Auth Model
- Access token: short-lived JWT
- Refresh token: persisted in `RefreshToken` collection
- Protected routes require `Authorization: Bearer <token>`
- Role guard supports `admin` and `user` scopes

## Domain Model
- `User`: customer/admin identity and address data
- `Product`: catalog item, pricing, stock, tags, rating aggregates
- `Category`: catalog taxonomy
- `Brand`: brand registry
- `Order`: checkout snapshot + shipping + payment status
- `Cart`: user cart lines with selected size/color
- `Wishlist`: saved products
- `Review`: user feedback on products
- `StoreSettings`: admin-controlled store preferences

## Known Gaps
- Frontend is not yet integrated with backend API for live data
- Admin auth in frontend is currently mock-only
- No automated test suite yet (CI currently validates type/build quality)

## Recommended Next Milestones
1. Implement typed API client in frontend (`fetch` wrapper with auth refresh flow)
2. Replace mock admin state with backend endpoints
3. Add integration tests for auth, order creation, and role-restricted routes
4. Add observability (request IDs, structured logs, error monitoring)

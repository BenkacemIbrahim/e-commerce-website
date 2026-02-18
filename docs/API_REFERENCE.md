# API Reference

Base URL (local): `http://localhost:4000`

## Health
- `GET /health`
  - Response: `{ "status": "ok" }`

## Authentication
- `POST /api/auth/register`
  - Body: `firstName`, `lastName`, `email`, `password`
- `POST /api/auth/login`
  - Body: `email`, `password`
- `POST /api/auth/refresh`
  - Body: `refreshToken`
- `POST /api/auth/logout`
  - Body: `refreshToken`

## Products
- `GET /api/products`
  - Query: `q`, `category`, `brand`, `status`, `tag`, `featured`, `page`, `limit`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PATCH /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/products/:id/reviews` (authenticated user)
  - Body: `rating`, `title?`, `content?`

## Categories
- `GET /api/categories`
- `POST /api/categories` (admin)
- `PATCH /api/categories/:id` (admin)
- `DELETE /api/categories/:id` (admin)

## Brands
- `GET /api/brands`
  - Query: `letter`
- `POST /api/brands` (admin)
- `PATCH /api/brands/:id` (admin)
- `DELETE /api/brands/:id` (admin)

## Cart (Authenticated)
- `GET /api/cart`
- `POST /api/cart`
  - Body: `productId`, `quantity`, `size?`, `color?`
- `PATCH /api/cart/:productId`
  - Body: `quantity`
- `DELETE /api/cart/:productId`

## Wishlist (Authenticated)
- `GET /api/wishlist`
- `POST /api/wishlist`
  - Body: `productId`
- `DELETE /api/wishlist/:productId`

## Orders
- `POST /api/orders` (authenticated user)
  - Body:
    - `items[]`: `productId`, `quantity`, `size?`, `color?`
    - `shippingAddress`: `street`, `city`, `state`, `zip`, `country`
- `GET /api/orders/me` (authenticated user)
- `GET /api/orders` (admin)
  - Query: `status`, `page`, `limit`
- `PATCH /api/orders/:id/status` (admin)
  - Body: `status` in `pending|processing|shipped|delivered|cancelled`

## Admin Analytics and Settings
- `GET /api/analytics/metrics` (admin)
- `GET /api/settings` (admin)
- `PUT /api/settings` (admin)
- `GET /api/admin/customers` (admin)

## Auth Header
Protected endpoints require:
```http
Authorization: Bearer <access_token>
```

## Error Format
API errors use:
```json
{ "message": "Error description" }
```

import type { Request } from "express"

export type AuthUser = {
  id: string
  role: "user" | "admin"
  email: string
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser
  }
}

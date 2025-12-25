import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env"

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const token = header.slice(7)
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as any
    req.user = { id: decoded.id, role: decoded.role, email: decoded.email }
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export function requireRole(role: "admin" | "user") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" })
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" })
    next()
  }
}

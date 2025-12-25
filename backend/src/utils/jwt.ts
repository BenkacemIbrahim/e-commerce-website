import { sign, verify, type Secret, type SignOptions } from "jsonwebtoken"
import { env } from "../config/env"

export function signAccessToken(payload: Record<string, unknown>, expiresIn = "15m") {
  const options: SignOptions = { expiresIn: expiresIn as any }
  return sign(payload, env.jwtSecret as Secret, options)
}

export function signRefreshToken(payload: Record<string, unknown>, expiresIn = "7d") {
  const options: SignOptions = { expiresIn: expiresIn as any }
  return sign(payload, env.jwtRefreshSecret as Secret, options)
}

export function verifyAccessToken(token: string) {
  return verify(token, env.jwtSecret as Secret)
}

export function verifyRefreshToken(token: string) {
  return verify(token, env.jwtRefreshSecret as Secret)
}

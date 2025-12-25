import type { Request, Response } from "express"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { User } from "../models/User"
import { RefreshToken } from "../models/RefreshToken"
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt"

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = registerSchema.parse(req.body)
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ message: "Email already in use" })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ email, passwordHash, firstName, lastName, role: "user" })
  const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role })
  const refreshToken = signRefreshToken({ id: user.id, email: user.email, role: user.role })
  const decoded: any = verifyRefreshToken(refreshToken)
  await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: new Date(decoded.exp * 1000) })
  res.status(201).json({ user: { id: user.id, email: user.email, firstName, lastName, role: user.role }, accessToken, refreshToken })
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body)
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: "Invalid credentials" })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: "Invalid credentials" })
  const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role })
  const refreshToken = signRefreshToken({ id: user.id, email: user.email, role: user.role })
  const decoded: any = verifyRefreshToken(refreshToken)
  await RefreshToken.findOneAndUpdate(
    { user: user._id },
    { token: refreshToken, expiresAt: new Date(decoded.exp * 1000) },
    { upsert: true }
  )
  res.json({ user: { id: user.id, email: user.email, role: user.role }, accessToken, refreshToken })
}

export async function refresh(req: Request, res: Response) {
  const token = req.body.refreshToken as string
  if (!token) return res.status(400).json({ message: "Missing refresh token" })
  const stored = await RefreshToken.findOne({ token })
  if (!stored) return res.status(401).json({ message: "Invalid refresh token" })
  try {
    const decoded: any = verifyRefreshToken(token)
    const accessToken = signAccessToken({ id: decoded.id, email: decoded.email, role: decoded.role })
    res.json({ accessToken })
  } catch {
    res.status(401).json({ message: "Invalid refresh token" })
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.body.refreshToken as string
  if (token) await RefreshToken.deleteOne({ token })
  res.json({ success: true })
}

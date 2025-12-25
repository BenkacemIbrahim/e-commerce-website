import type { Request, Response } from "express"
import { z } from "zod"
import { Category } from "../models/Category"

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  parent: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional().default("active")
})

export async function list(req: Request, res: Response) {
  const categories = await Category.find({}).sort({ name: 1 })
  res.json(categories)
}

export async function create(req: Request, res: Response) {
  const body = schema.parse(req.body)
  const exists = await Category.findOne({ slug: body.slug })
  if (exists) return res.status(409).json({ message: "Slug already exists" })
  const category = await Category.create(body)
  res.status(201).json(category)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const body = schema.partial().parse(req.body)
  const category = await Category.findByIdAndUpdate(id, body, { new: true })
  if (!category) return res.status(404).json({ message: "Not found" })
  res.json(category)
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params
  const category = await Category.findByIdAndDelete(id)
  if (!category) return res.status(404).json({ message: "Not found" })
  res.json({ success: true })
}

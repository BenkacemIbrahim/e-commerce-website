import type { Request, Response } from "express"
import { z } from "zod"
import { Brand } from "../models/Brand"

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().optional(),
  category: z.string().optional(),
  letter: z.string().optional()
})

export async function list(req: Request, res: Response) {
  const { letter } = req.query as Record<string, string>
  const filter: any = {}
  if (letter) filter.letter = letter.toUpperCase()
  const brands = await Brand.find(filter).sort({ name: 1 })
  res.json(brands)
}

export async function create(req: Request, res: Response) {
  const body = schema.parse(req.body)
  const exists = await Brand.findOne({ slug: body.slug })
  if (exists) return res.status(409).json({ message: "Slug already exists" })
  const brand = await Brand.create({ ...body, letter: body.letter || body.name[0].toUpperCase() })
  res.status(201).json(brand)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const body = schema.partial().parse(req.body)
  const brand = await Brand.findByIdAndUpdate(id, body, { new: true })
  if (!brand) return res.status(404).json({ message: "Not found" })
  res.json(brand)
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params
  const brand = await Brand.findByIdAndDelete(id)
  if (!brand) return res.status(404).json({ message: "Not found" })
  res.json({ success: true })
}

import type { Request, Response } from "express"
import { z } from "zod"
import { Product } from "../models/Product"
import { Review } from "../models/Review"

const createSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  category: z.string().min(1),
  price: z.number().nonnegative(),
  salePrice: z.number().optional(),
  stock: z.number().int().nonnegative(),
  description: z.string().optional(),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  status: z.enum(["active", "draft", "archived"]).optional().default("active"),
  tags: z.array(z.string()).optional().default([])
})

export async function list(req: Request, res: Response) {
  const { q, category, brand, status, tag, featured, page = "1", limit = "20" } = req.query as Record<string, string>
  const filter: any = {}
  if (q) filter.$or = [{ name: new RegExp(q, "i") }, { brand: new RegExp(q, "i") }]
  if (category) filter.category = category
  if (brand) filter.brand = brand
  if (status) filter.status = status
  if (tag) filter.tags = tag
  if (featured) filter.featured = featured === "true"
  const pageNum = Number(page)
  const limitNum = Number(limit)
  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
    Product.countDocuments(filter)
  ])
  res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) })
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) return res.status(404).json({ message: "Not found" })
  res.json(product)
}

export async function create(req: Request, res: Response) {
  const body = createSchema.parse(req.body)
  const slug = body.name.toLowerCase().replace(/\s+/g, "-")
  const product = await Product.create({ ...body, slug })
  res.status(201).json(product)
}

export async function update(req: Request, res: Response) {
  const { id } = req.params
  const body = createSchema.partial().parse(req.body)
  const updateData: any = { ...body }
  if (body.name) updateData.slug = body.name.toLowerCase().replace(/\s+/g, "-")
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true })
  if (!product) return res.status(404).json({ message: "Not found" })
  res.json(product)
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params
  const product = await Product.findByIdAndDelete(id)
  if (!product) return res.status(404).json({ message: "Not found" })
  res.json({ success: true })
}

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().optional()
})

export async function addReview(req: Request, res: Response) {
  const { id } = req.params
  const body = reviewSchema.parse(req.body)
  const review = await Review.create({ product: id, user: req.user?.id, rating: body.rating, title: body.title, content: body.content })
  const stats = await Review.aggregate([
    { $match: { product: review.product } },
    { $group: { _id: "$product", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } }
  ])
  const s = stats[0]
  if (s) {
    await Product.findByIdAndUpdate(id, { avgRating: s.avgRating, reviewCount: s.reviewCount })
  }
  res.status(201).json(review)
}

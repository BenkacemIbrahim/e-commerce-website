import type { Request, Response } from "express"
import { z } from "zod"
import { Order } from "../models/Order"
import { Product } from "../models/Product"

const createSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        size: z.string().optional(),
        color: z.string().optional()
      })
    )
    .min(1),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1)
  })
})

export async function list(req: Request, res: Response) {
  const { status, page = "1", limit = "20" } = req.query as Record<string, string>
  const filter: any = {}
  if (status) filter.status = status
  const pageNum = Number(page)
  const limitNum = Number(limit)
  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
    Order.countDocuments(filter)
  ])
  res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) })
}

export async function listMy(req: Request, res: Response) {
  const orders = await Order.find({ customer: req.user?.id }).sort({ createdAt: -1 })
  res.json(orders)
}

export async function create(req: Request, res: Response) {
  const body = createSchema.parse(req.body)
  const products = await Product.find({ _id: { $in: body.items.map((i) => i.productId) } })
  const items = body.items.map((i) => {
    const p = products.find((pp) => pp.id === i.productId)!
    return {
      product: p._id,
      productName: p.name,
      quantity: i.quantity,
      price: p.salePrice ?? p.price,
      size: i.size,
      color: i.color
    }
  })
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const orderNumber = `ORD-${new Date().getFullYear()}-${Math.random().toString().slice(2, 6)}`
  const order = await Order.create({
    orderNumber,
    customer: req.user?.id,
    items,
    total,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: body.shippingAddress
  })
  res.status(201).json(order)
}

export async function updateStatus(req: Request, res: Response) {
  const { id } = req.params
  const { status } = req.body as { status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" }
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
  if (!order) return res.status(404).json({ message: "Not found" })
  res.json(order)
}

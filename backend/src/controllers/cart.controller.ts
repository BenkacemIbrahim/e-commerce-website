import type { Request, Response } from "express"
import { z } from "zod"
import { Cart } from "../models/Cart"
import { Product } from "../models/Product"

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().default(1),
  size: z.string().optional(),
  color: z.string().optional()
})

export async function getCart(req: Request, res: Response) {
  const cart = await Cart.findOne({ user: req.user?.id })
  res.json(cart || { user: req.user?.id, items: [] })
}

export async function addItem(req: Request, res: Response) {
  const body = itemSchema.parse(req.body)
  const product = await Product.findById(body.productId)
  if (!product) return res.status(404).json({ message: "Product not found" })
  let cart = await Cart.findOne({ user: req.user?.id })
  if (!cart) {
    cart = await Cart.create({ user: req.user?.id, items: [] })
  }
  const existing = cart.items.find(
    (i) => i.product.toString() === product._id.toString() && i.size === body.size && i.color === body.color
  )
  if (existing) {
    existing.quantity += body.quantity
  } else {
    cart.items.push({
      product: product._id,
      quantity: body.quantity,
      size: body.size,
      color: body.color,
      price: product.salePrice ?? product.price
    })
  }
  await cart.save()
  res.status(201).json(cart)
}

export async function updateItem(req: Request, res: Response) {
  const { productId } = req.params
  const { quantity } = req.body as { quantity: number }
  const cart = await Cart.findOne({ user: req.user?.id })
  if (!cart) return res.status(404).json({ message: "Cart not found" })
  const item = cart.items.find((i) => i.product.toString() === productId)
  if (!item) return res.status(404).json({ message: "Item not found" })
  item.quantity = Math.max(1, quantity)
  await cart.save()
  res.json(cart)
}

export async function removeItem(req: Request, res: Response) {
  const { productId } = req.params
  const cart = await Cart.findOne({ user: req.user?.id })
  if (!cart) return res.status(404).json({ message: "Cart not found" })
  cart.items = cart.items.filter((i) => i.product.toString() !== productId)
  await cart.save()
  res.json(cart)
}

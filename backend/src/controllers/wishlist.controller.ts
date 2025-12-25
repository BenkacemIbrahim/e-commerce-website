import type { Request, Response } from "express"
import { Wishlist } from "../models/Wishlist"

export async function getWishlist(req: Request, res: Response) {
  const wishlist = await Wishlist.findOne({ user: req.user?.id })
  res.json(wishlist || { user: req.user?.id, products: [] })
}

export async function addToWishlist(req: Request, res: Response) {
  const { productId } = req.body as { productId: string }
  let wishlist = await Wishlist.findOne({ user: req.user?.id })
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user?.id, products: [] })
  }
  if (!wishlist.products.find((p) => p.toString() === productId)) {
    wishlist.products.push(productId as any)
    await wishlist.save()
  }
  res.status(201).json(wishlist)
}

export async function removeFromWishlist(req: Request, res: Response) {
  const { productId } = req.params
  const wishlist = await Wishlist.findOne({ user: req.user?.id })
  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" })
  wishlist.products = wishlist.products.filter((p) => p.toString() !== productId)
  await wishlist.save()
  res.json(wishlist)
}

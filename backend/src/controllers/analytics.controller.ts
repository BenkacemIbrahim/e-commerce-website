import type { Request, Response } from "express"
import { Order } from "../models/Order"
import { Product } from "../models/Product"
import { User } from "../models/User"

export async function metrics(req: Request, res: Response) {
  const [orders, products, customers] = await Promise.all([
    Order.find({}),
    Product.find({}),
    User.countDocuments({ role: "user" })
  ])
  const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0)
  const averageOrderValue = orders.length ? totalRevenue / orders.length : 0
  const totalProductsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)
  const lowStockProductsCount = products.filter((p) => p.stock < 20).length
  res.json({
    totalRevenue,
    averageOrderValue,
    totalOrders: orders.length,
    totalProductsSold,
    totalProducts: products.length,
    totalCustomers: customers,
    lowStockProductsCount
  })
}

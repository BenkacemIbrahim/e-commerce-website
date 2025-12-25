import type { Request, Response } from "express"
import { User } from "../models/User"
import { Order } from "../models/Order"

export async function listCustomers(req: Request, res: Response) {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 })
  const orders = await Order.find({})
  const items = users.map((u) => {
    const userOrders = orders.filter((o) => o.customer.toString() === u._id.toString())
    const totalOrders = userOrders.length
    const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0)
    const lastOrderDate = userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]?.createdAt
    return {
      id: u.id,
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email,
      email: u.email,
      phone: u.phone,
      totalOrders,
      totalSpent,
      createdAt: u.createdAt,
      lastOrderDate
    }
  })
  res.json(items)
}

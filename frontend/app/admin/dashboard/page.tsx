"use client"

import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { mockOrders, mockProducts, mockCustomers } from "@/lib/mock-data"
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboardPage() {
  // Calculate stats
  const totalRevenue = mockOrders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0)
  const totalOrders = mockOrders.length
  const totalProducts = mockProducts.length
  const totalCustomers = mockCustomers.length
  const lowStockProductsCount = mockProducts.filter((p) => p.stock < 20).length

  const stats = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      name: "Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      value: totalProducts.toString(),
      change: `${lowStockProductsCount} low stock`,
      trend: "down",
      icon: Package,
    },
    {
      name: "Customers",
      value: totalCustomers.toString(),
      change: "+5.1%",
      trend: "up",
      icon: Users,
    },
  ]

  const recentOrders = mockOrders.slice(0, 5)
  const lowStockProducts = mockProducts.filter((p) => p.stock < 20)

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back to your store management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="bg-[#111] border-[#222] p-6 hover:border-[#333] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-gray-400" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    stat.trend === "up" ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.name}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Orders and Low Stock Alert Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-[#111] border-[#222]">
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/admin/orders">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-[#0a0a0a] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{order.orderNumber}</span>
                    <span className="text-sm font-semibold text-white">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{order.customer.name}</span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-500/10 text-green-400"
                          : order.status === "processing"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Low Stock Alert */}
          <Card className="bg-[#111] border-[#222]">
            <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Low Stock Alert</h2>
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Link href="/admin/products">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="p-4 hover:bg-[#0a0a0a] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{product.name}</span>
                    <span className="text-sm font-semibold text-orange-400">{product.stock} units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{product.brand}</span>
                    <span className="text-xs text-gray-400">{product.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ProtectedAdminLayout>
  )
}

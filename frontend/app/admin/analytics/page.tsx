"use client"

import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { mockOrders, mockProducts, mockCustomers } from "@/lib/mock-data"
import { TrendingUp, DollarSign, ShoppingCart, Package, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminAnalyticsPage() {
  // Calculate analytics
  const totalRevenue = mockOrders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0)
  const averageOrderValue = totalRevenue / mockOrders.length
  const totalProductsSold = mockOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)
  const conversionRate = 68.5 // Mock conversion rate

  const metrics = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      name: "Avg Order Value",
      value: `$${averageOrderValue.toFixed(2)}`,
      change: "+8.1%",
      trend: "up",
      icon: TrendingUp,
      color: "blue",
    },
    {
      name: "Total Orders",
      value: mockOrders.length.toString(),
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "purple",
    },
    {
      name: "Products Sold",
      value: totalProductsSold.toString(),
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "orange",
    },
  ]

  // Category performance
  const categoryPerformance = [
    { name: "Running", revenue: 2450, percentage: 35 },
    { name: "Lifestyle", revenue: 2100, percentage: 30 },
    { name: "Basketball", revenue: 1540, percentage: 22 },
    { name: "Training", revenue: 910, percentage: 13 },
  ]

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Analytics</h1>
          <p className="text-sm text-gray-400">Performance metrics and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.name} className="bg-[#111] border-[#222] p-6 hover:border-[#333] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`h-10 w-10 bg-${metric.color}-500/10 rounded-lg flex items-center justify-center`}
                  style={{
                    backgroundColor:
                      metric.color === "green"
                        ? "rgba(34, 197, 94, 0.1)"
                        : metric.color === "blue"
                          ? "rgba(59, 130, 246, 0.1)"
                          : metric.color === "purple"
                            ? "rgba(168, 85, 247, 0.1)"
                            : "rgba(249, 115, 22, 0.1)",
                  }}
                >
                  <metric.icon
                    className="h-5 w-5"
                    style={{
                      color:
                        metric.color === "green"
                          ? "rgb(34, 197, 94)"
                          : metric.color === "blue"
                            ? "rgb(59, 130, 246)"
                            : metric.color === "purple"
                              ? "rgb(168, 85, 247)"
                              : "rgb(249, 115, 22)",
                    }}
                  />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white mb-1">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.name}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Performance */}
          <Card className="bg-[#111] border-[#222]">
            <div className="p-6 border-b border-[#1a1a1a]">
              <h2 className="text-lg font-semibold text-white">Category Performance</h2>
              <p className="text-sm text-gray-400 mt-1">Revenue breakdown by category</p>
            </div>
            <div className="p-6 space-y-6">
              {categoryPerformance.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{category.name}</span>
                    <span className="text-sm text-gray-400">${category.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={category.percentage} className="flex-1 h-2 bg-[#1a1a1a]" />
                    <span className="text-xs text-gray-500 w-10 text-right">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Conversion Stats */}
          <Card className="bg-[#111] border-[#222]">
            <div className="p-6 border-b border-[#1a1a1a]">
              <h2 className="text-lg font-semibold text-white">Conversion Metrics</h2>
              <p className="text-sm text-gray-400 mt-1">Customer behavior insights</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-green-500/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">{conversionRate}%</p>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <div className="flex items-center justify-center gap-1 text-xs text-green-500 mt-2">
                  <ArrowUpRight className="h-3 w-3" />
                  +5.2% from last month
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-white mb-1">{mockCustomers.length}</p>
                  <p className="text-xs text-gray-400">Total Customers</p>
                </div>
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 text-center">
                  <p className="text-2xl font-semibold text-white mb-1">
                    {(mockOrders.length / mockCustomers.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-400">Orders/Customer</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="bg-[#111] border-[#222]">
          <div className="p-6 border-b border-[#1a1a1a]">
            <h2 className="text-lg font-semibold text-white">Top Selling Products</h2>
            <p className="text-sm text-gray-400 mt-1">Best performing products by revenue</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockProducts.slice(0, 5).map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between hover:bg-[#0a0a0a] p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-semibold w-8 ${
                        index === 0
                          ? "text-yellow-400"
                          : index === 1
                            ? "text-gray-300"
                            : index === 2
                              ? "text-orange-400"
                              : "text-gray-500"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${product.price}</p>
                    <p className="text-xs text-gray-500">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </ProtectedAdminLayout>
  )
}

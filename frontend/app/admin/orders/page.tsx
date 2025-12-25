"use client"

import { useState } from "react"
import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockOrders, type Order } from "@/lib/mock-data"
import { Search, Eye, Download } from "lucide-react"
import { OrderDetailsModal } from "@/components/admin/order-details-modal"
import { toast } from "sonner"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
      ),
    )
    toast.success(`Order status updated to ${newStatus}`)
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setDetailsModalOpen(true)
  }

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Orders</h1>
            <p className="text-sm text-gray-400">{filteredOrders.length} total orders</p>
          </div>
          <Button variant="outline" className="border-[#222] text-gray-300 hover:bg-[#1a1a1a] bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-[#111] border-[#222] p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0a0a0a] border-[#222] text-white placeholder:text-gray-600"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-[#0a0a0a] border-[#222] text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-[#222]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="bg-[#111] border-[#222]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a]">
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#0a0a0a]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{order.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">${order.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{order.paymentStatus}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order["status"])}
                      >
                        <SelectTrigger className="w-[140px] h-7 text-xs border-0 bg-transparent p-0">
                          <Badge
                            className={`${
                              order.status === "delivered"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : order.status === "processing"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : order.status === "shipped"
                                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                    : order.status === "cancelled"
                                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent className="bg-[#111] border-[#222]">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(order)}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <OrderDetailsModal open={detailsModalOpen} onOpenChange={setDetailsModalOpen} order={selectedOrder} />
    </ProtectedAdminLayout>
  )
}

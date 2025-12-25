"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/mock-data"
import { Package, MapPin, CreditCard, Calendar } from "lucide-react"

interface OrderDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function OrderDetailsModal({ open, onOpenChange, order }: OrderDetailsModalProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] border-[#222] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Order Number</p>
              <p className="text-white font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
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
            </div>
          </div>

          <Separator className="bg-[#222]" />

          {/* Customer Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-white">Customer Information</h3>
            </div>
            <div className="bg-[#111] border border-[#222] rounded-lg p-4 space-y-2">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{order.customer.email}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-white">Shipping Address</h3>
            </div>
            <div className="bg-[#111] border border-[#222] rounded-lg p-4">
              <p className="text-white">{order.shippingAddress.street}</p>
              <p className="text-white">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p className="text-white">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Order Items</h3>
            <div className="bg-[#111] border border-[#222] rounded-lg divide-y divide-[#222]">
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-400">
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between bg-[#111] border border-[#222] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Payment Status</span>
            </div>
            <Badge
              className={
                order.paymentStatus === "paid"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              }
            >
              {order.paymentStatus}
            </Badge>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-[#222]">
            <span className="text-lg font-medium text-white">Total</span>
            <span className="text-2xl font-bold text-white">${order.total.toFixed(2)}</span>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                Created
              </p>
              <p className="text-white">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                Updated
              </p>
              <p className="text-white">{new Date(order.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

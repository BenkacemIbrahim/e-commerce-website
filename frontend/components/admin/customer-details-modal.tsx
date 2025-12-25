"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Customer } from "@/lib/mock-data"
import { Mail, Phone, Calendar, ShoppingBag, DollarSign } from "lucide-react"

interface CustomerDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: Customer | null
}

export function CustomerDetailsModal({ open, onOpenChange, customer }: CustomerDetailsModalProps) {
  if (!customer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0a0a0a] border-[#222] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Customer Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 bg-[#1a1a1a] text-gray-300">
              <AvatarFallback className="bg-[#1a1a1a] text-gray-300 text-xl">
                {customer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-white">{customer.name}</h3>
              <p className="text-sm text-gray-400">Customer ID: {customer.id}</p>
            </div>
          </div>

          <Separator className="bg-[#222]" />

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Email</span>
              </div>
              <p className="text-white">{customer.email}</p>
            </div>

            {customer.phone && (
              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Phone</span>
                </div>
                <p className="text-white">{customer.phone}</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{customer.totalOrders}</p>
              <p className="text-xs text-gray-400">Total Orders</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">${customer.totalSpent}</p>
              <p className="text-xs text-gray-400">Total Spent</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-purple-400" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">
                ${customer.totalOrders > 0 ? (customer.totalSpent / customer.totalOrders).toFixed(0) : 0}
              </p>
              <p className="text-xs text-gray-400">Avg Order</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111] border border-[#222] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Joined</span>
              </div>
              <p className="text-white">{new Date(customer.createdAt).toLocaleDateString()}</p>
            </div>

            {customer.lastOrderDate && (
              <div className="bg-[#111] border border-[#222] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Last Order</span>
                </div>
                <p className="text-white">{new Date(customer.lastOrderDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex justify-center pt-4 border-t border-[#222]">
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active Customer</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

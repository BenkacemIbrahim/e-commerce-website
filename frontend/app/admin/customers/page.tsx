"use client"

import { useState } from "react"
import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCustomers, type Customer } from "@/lib/mock-data"
import { Search, Mail, Phone, Eye, Download } from "lucide-react"
import { CustomerDetailsModal } from "@/components/admin/customer-details-modal"

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer)
    setDetailsModalOpen(true)
  }

  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Customers</h1>
            <p className="text-sm text-gray-400">{filteredCustomers.length} total customers</p>
          </div>
          <Button variant="outline" className="border-[#222] text-gray-300 hover:bg-[#1a1a1a] bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-[#111] border-[#222] p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#0a0a0a] border-[#222] text-white placeholder:text-gray-600"
            />
          </div>
        </Card>

        {/* Customers Table */}
        <Card className="bg-[#111] border-[#222]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0a0a0a]">
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#0a0a0a] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-[#1a1a1a] text-gray-300">
                          <AvatarFallback className="bg-[#1a1a1a] text-gray-300">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-white">{customer.name}</div>
                          <div className="text-xs text-gray-500">ID: {customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="h-3 w-3 text-gray-500" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Phone className="h-3 w-3 text-gray-500" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {customer.totalOrders} orders
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">${customer.totalSpent.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(customer)}
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

      <CustomerDetailsModal open={detailsModalOpen} onOpenChange={setDetailsModalOpen} customer={selectedCustomer} />
    </ProtectedAdminLayout>
  )
}

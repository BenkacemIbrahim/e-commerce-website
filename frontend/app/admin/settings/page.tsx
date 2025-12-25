"use client"

import { ProtectedAdminLayout } from "@/components/admin/protected-admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Store, Bell, Shield } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <ProtectedAdminLayout>
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Settings</h1>
          <p className="text-sm text-gray-400">Manage your store configuration</p>
        </div>

        {/* Store Settings */}
        <Card className="bg-[#111] border-[#222]">
          <div className="p-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-3">
              <Store className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Store Information</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName" className="text-gray-200">
                Store Name
              </Label>
              <Input
                id="storeName"
                defaultValue="BR. Premium Sneakers"
                className="bg-[#0a0a0a] border-[#222] text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail" className="text-gray-200">
                Store Email
              </Label>
              <Input
                id="storeEmail"
                type="email"
                defaultValue="contact@br.com"
                className="bg-[#0a0a0a] border-[#222] text-white"
              />
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Save Changes</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="bg-[#111] border-[#222]">
          <div className="p-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">New Orders</p>
                <p className="text-xs text-gray-400">Get notified when new orders arrive</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-[#1a1a1a]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Low Stock Alerts</p>
                <p className="text-xs text-gray-400">Alert when products are running low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-[#1a1a1a]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Customer Messages</p>
                <p className="text-xs text-gray-400">Notifications for customer inquiries</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="bg-[#111] border-[#222]">
          <div className="p-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-200">
                Current Password
              </Label>
              <Input id="currentPassword" type="password" className="bg-[#0a0a0a] border-[#222] text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-200">
                New Password
              </Label>
              <Input id="newPassword" type="password" className="bg-[#0a0a0a] border-[#222] text-white" />
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Update Password</Button>
          </div>
        </Card>
      </div>
    </ProtectedAdminLayout>
  )
}

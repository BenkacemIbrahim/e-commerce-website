"use client"

import { useEffect, useState } from "react"
import { getAdminSession, type AdminUser } from "@/lib/admin-auth"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AdminHeader() {
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    setUser(getAdminSession())
  }, [])

  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-[#111] border-[#222] text-white placeholder:text-gray-600 focus:border-gray-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1a1a1a]">
          <Bell className="h-5 w-5" />
        </Button>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-[#1a1a1a]">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <Avatar className="h-8 w-8 bg-white text-black">
              <AvatarFallback className="bg-white text-black font-semibold">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  )
}

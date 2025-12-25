"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/mock-data"
import { toast } from "sonner"

interface CategoryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onSave: (category: Partial<Category>) => void
}

export function CategoryFormModal({ open, onOpenChange, category, onSave }: CategoryFormModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    status: "active",
    productCount: 0,
  })

  useEffect(() => {
    if (category) {
      setFormData(category)
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        status: "active",
        productCount: 0,
      })
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      toast.error("Please fill in all required fields")
      return
    }

    // Auto-generate slug from name
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-")
    onSave({ ...formData, slug })
    toast.success(category ? "Category updated successfully" : "Category created successfully")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#0a0a0a] border-[#222] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#111] border-[#222] text-white"
              placeholder="e.g., Running"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#111] border-[#222] text-white min-h-[100px]"
              placeholder="Describe this category..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Category["status"] })}
            >
              <SelectTrigger className="bg-[#111] border-[#222] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-[#222]">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#222] text-gray-300 hover:bg-[#1a1a1a]"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-white text-black hover:bg-gray-200">
              {category ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
